import { Router } from "express";
import { getPool } from "../lib/db.js";
import type { Logger } from "pino";

const router = Router();

function formatIcalDate(dateStr: string): string {
  return dateStr.replace(/-/g, "");
}

function escapeIcal(str: string): string {
  return str.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
}

// GET /ical/:propertyId.ics — serve Supabase-generated iCal feed for a property
router.get("/ical/:propertyId.ics", async (req, res) => {
  const pool = getPool();
  const propertyId = req.params.propertyId;

  const { rows: prop } = await pool.query(
    `SELECT name FROM properties WHERE id = $1 AND active = true`,
    [propertyId]
  );
  if (!prop[0]) return res.status(404).send("Property not found");

  const { rows: bookings } = await pool.query(
    `SELECT id, check_in, check_out, guest_name, channel, status, created_at
     FROM bookings
     WHERE property_id = $1
       AND status NOT IN ('cancelled')
     ORDER BY check_in ASC`,
    [propertyId]
  );

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Bougan Villa//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:Bougan Villa - ${escapeIcal(prop[0].name)}`,
    "X-WR-TIMEZONE:Europe/Lisbon",
  ];

  for (const b of bookings) {
    const summary = b.channel === "owner_block"
      ? "Owner Block"
      : b.channel === "direct"
        ? "Bougan Villa - Reserved"
        : "Bougan Villa - Reserved";

    lines.push(
      "BEGIN:VEVENT",
      `DTSTART;VALUE=DATE:${formatIcalDate(b.check_in.toISOString().slice(0, 10))}`,
      `DTEND;VALUE=DATE:${formatIcalDate(b.check_out.toISOString().slice(0, 10))}`,
      `SUMMARY:${escapeIcal(summary)}`,
      `UID:bv-${b.id}@bouganvilla.com`,
      `DTSTAMP:${new Date(b.created_at).toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");

  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="${propertyId}.ics"`);
  res.setHeader("Cache-Control", "no-cache");
  return res.send(lines.join("\r\n"));
});

// POST /sync-ical — pull all registered iCal feeds and upsert bookings
router.post("/sync-ical", async (req, res) => {
  const log = (req as unknown as { log: Logger }).log;

  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers["authorization"] ?? "";
    if (authHeader !== `Bearer ${cronSecret}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  const pool = getPool();
  const { rows: feeds } = await pool.query(
    `SELECT id, property_id, channel, ical_url, last_etag FROM ical_feeds`
  );

  const results: Array<{ feedId: number; channel: string; propertyId: string; synced: number; error?: string }> = [];

  for (const feed of feeds) {
    try {
      const headers: Record<string, string> = {
        "User-Agent": "BouganVilla-Sync/1.0",
      };
      if (feed.last_etag) headers["If-None-Match"] = feed.last_etag;

      const response = await fetch(feed.ical_url, { headers, signal: AbortSignal.timeout(15_000) });

      if (response.status === 304) {
        results.push({ feedId: feed.id, channel: feed.channel, propertyId: feed.property_id, synced: 0 });
        continue;
      }

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const text = await response.text();
      const events = parseIcal(text);
      let synced = 0;

      for (const event of events) {
        if (!event.dtstart || !event.dtend || !event.uid) continue;
        await pool.query(
          `INSERT INTO bookings (property_id, channel, channel_ref, guest_name, check_in, check_out, status)
           VALUES ($1, $2, $3, $4, $5, $6, 'confirmed')
           ON CONFLICT (channel, channel_ref) DO UPDATE SET
             check_in = EXCLUDED.check_in,
             check_out = EXCLUDED.check_out,
             updated_at = now()`,
          [
            feed.property_id,
            feed.channel,
            event.uid,
            event.summary ?? "External Booking",
            event.dtstart,
            event.dtend,
          ]
        );
        synced++;
      }

      const newEtag = response.headers.get("etag") ?? null;
      await pool.query(
        `UPDATE ical_feeds SET last_synced = now(), last_etag = $1, error_count = 0 WHERE id = $2`,
        [newEtag, feed.id]
      );

      results.push({ feedId: feed.id, channel: feed.channel, propertyId: feed.property_id, synced });
      log.info({ feedId: feed.id, synced }, "iCal sync completed");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await pool.query(
        `UPDATE ical_feeds SET error_count = error_count + 1 WHERE id = $1`,
        [feed.id]
      );
      results.push({ feedId: feed.id, channel: feed.channel, propertyId: feed.property_id, synced: 0, error: msg });
      log.warn({ feedId: feed.id, err }, "iCal sync failed");
    }
  }

  return res.json({ ok: true, results });
});

function parseIcal(text: string) {
  const events: Array<{ uid?: string; dtstart?: string; dtend?: string; summary?: string }> = [];
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

  let current: typeof events[0] | null = null;

  for (const raw of lines) {
    const line = raw.startsWith(" ") ? raw.slice(1) : raw;

    if (line === "BEGIN:VEVENT") {
      current = {};
    } else if (line === "END:VEVENT") {
      if (current) events.push(current);
      current = null;
    } else if (current) {
      if (line.startsWith("UID:")) current.uid = line.slice(4).trim();
      else if (line.startsWith("SUMMARY:")) current.summary = line.slice(8).trim();
      else if (line.startsWith("DTSTART")) current.dtstart = parseIcalDate(line);
      else if (line.startsWith("DTEND")) current.dtend = parseIcalDate(line);
    }
  }

  return events;
}

function parseIcalDate(line: string): string | undefined {
  const val = line.includes(":") ? line.split(":").slice(1).join(":").trim() : undefined;
  if (!val) return undefined;
  if (val.length === 8) {
    return `${val.slice(0, 4)}-${val.slice(4, 6)}-${val.slice(6, 8)}`;
  }
  return val.slice(0, 10);
}

export default router;
