import { Router } from "express";
import { getPool } from "../lib/db.js";
import { checkPassword, createSession, deleteSession, requireAdmin, SESSION_COOKIE } from "../lib/auth.js";

const router = Router();

// ── Auth ──────────────────────────────────────────────────────────────────────

router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: "Missing credentials" });

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || (!process.env.ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD_HASH)) {
    return res.status(503).json({ error: "Admin credentials not configured" });
  }

  if (email !== adminEmail || !checkPassword(password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const ip = (req.headers["x-forwarded-for"] as string) ?? req.socket.remoteAddress ?? "unknown";
  const sessionId = await createSession(ip);

  res.cookie(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.json({ ok: true });
});

router.post("/admin/logout", async (req, res) => {
  const sessionId = req.cookies?.[SESSION_COOKIE] ?? "";
  if (sessionId) await deleteSession(sessionId);
  res.clearCookie(SESSION_COOKIE);
  return res.json({ ok: true });
});

router.get("/admin/me", requireAdmin, (_req, res) => {
  return res.json({ ok: true, role: "manager" });
});

// ── Enquiries ─────────────────────────────────────────────────────────────────

router.get("/admin/enquiries", requireAdmin, async (_req, res) => {
  const pool = getPool();
  const { rows } = await pool.query(
    `SELECT id, property_id, name, email, phone, message, check_in, check_out, guests, status, created_at
     FROM enquiries ORDER BY created_at DESC`
  );
  return res.json(rows);
});

router.put("/admin/enquiries/:id", requireAdmin, async (req, res) => {
  const pool = getPool();
  const { status, notes } = req.body ?? {};
  const validStatuses = ["new", "replied", "converted", "closed"];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  const { rows } = await pool.query(
    `UPDATE enquiries SET status = COALESCE($1, status) WHERE id = $2 RETURNING *`,
    [status ?? null, parseInt(req.params.id, 10)]
  );
  if (!rows[0]) return res.status(404).json({ error: "Not found" });
  return res.json(rows[0]);
});

// ── Bookings ──────────────────────────────────────────────────────────────────

router.get("/admin/bookings", requireAdmin, async (req, res) => {
  const pool = getPool();
  const { property_id, status, from, to } = req.query as Record<string, string>;
  let query = `SELECT b.*, p.name as property_name
               FROM bookings b
               LEFT JOIN properties p ON b.property_id = p.id
               WHERE 1=1`;
  const params: unknown[] = [];
  if (property_id) { params.push(property_id); query += ` AND b.property_id = $${params.length}`; }
  if (status) { params.push(status); query += ` AND b.status = $${params.length}`; }
  if (from) { params.push(from); query += ` AND b.check_out >= $${params.length}`; }
  if (to) { params.push(to); query += ` AND b.check_in <= $${params.length}`; }
  query += ` ORDER BY b.check_in DESC`;

  const { rows } = await pool.query(query, params);
  return res.json(rows);
});

router.post("/admin/bookings", requireAdmin, async (req, res) => {
  const pool = getPool();
  const {
    property_id, channel, channel_ref, guest_name, guest_email,
    check_in, check_out, guests_count, nightly_rate, total_gross,
    channel_fee_pct, net_revenue, status, notes,
  } = req.body ?? {};

  if (!property_id || !channel || !check_in || !check_out) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { rows } = await pool.query(
    `INSERT INTO bookings (property_id, channel, channel_ref, guest_name, guest_email,
       check_in, check_out, guests_count, nightly_rate, total_gross,
       channel_fee_pct, net_revenue, status, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,COALESCE($13,'confirmed'),$14)
     RETURNING *`,
    [property_id, channel, channel_ref ?? null, guest_name ?? null, guest_email ?? null,
     check_in, check_out, guests_count ?? null, nightly_rate ?? null, total_gross ?? null,
     channel_fee_pct ?? null, net_revenue ?? null, status ?? null, notes ?? null]
  );
  return res.status(201).json(rows[0]);
});

router.put("/admin/bookings/:id", requireAdmin, async (req, res) => {
  const pool = getPool();
  const allowed = ["status", "notes", "guest_name", "guest_email", "guests_count",
    "nightly_rate", "total_gross", "channel_fee_pct", "net_revenue", "check_in", "check_out"];
  const updates: string[] = [];
  const params: unknown[] = [];

  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      params.push(req.body[key]);
      updates.push(`${key} = $${params.length}`);
    }
  }
  if (!updates.length) return res.status(400).json({ error: "Nothing to update" });
  params.push(parseInt(req.params.id, 10));
  updates.push(`updated_at = now()`);

  const { rows } = await pool.query(
    `UPDATE bookings SET ${updates.join(", ")} WHERE id = $${params.length} RETURNING *`,
    params
  );
  if (!rows[0]) return res.status(404).json({ error: "Not found" });
  return res.json(rows[0]);
});

router.delete("/admin/bookings/:id", requireAdmin, async (req, res) => {
  const pool = getPool();
  await pool.query(`DELETE FROM bookings WHERE id = $1`, [parseInt(req.params.id, 10)]);
  return res.json({ ok: true });
});

// ── Costs ─────────────────────────────────────────────────────────────────────

router.get("/admin/costs", requireAdmin, async (req, res) => {
  const pool = getPool();
  const { property_id } = req.query as Record<string, string>;
  const params: unknown[] = [];
  let query = `SELECT * FROM costs WHERE 1=1`;
  if (property_id) { params.push(property_id); query += ` AND property_id = $${params.length}`; }
  query += ` ORDER BY date DESC`;
  const { rows } = await pool.query(query, params);
  return res.json(rows);
});

router.delete("/admin/costs/:id", requireAdmin, async (req, res) => {
  const pool = getPool();
  await pool.query(`DELETE FROM costs WHERE id = $1`, [req.params.id]);
  return res.json({ ok: true });
});

router.post("/admin/costs", requireAdmin, async (req, res) => {
  const pool = getPool();
  const { property_id, category, description, amount, date, booking_id } = req.body ?? {};
  if (!category || !description || !amount || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const { rows } = await pool.query(
    `INSERT INTO costs (property_id, category, description, amount, date, booking_id)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [property_id ?? null, category, description, amount, date, booking_id ?? null]
  );
  return res.status(201).json(rows[0]);
});

// ── Revenue summary ───────────────────────────────────────────────────────────

router.get("/admin/revenue", requireAdmin, async (req, res) => {
  const pool = getPool();
  const { property_id, year, month } = req.query as Record<string, string>;

  const params: unknown[] = [];
  let bookingsWhere = `WHERE b.status NOT IN ('cancelled')`;
  if (property_id) { params.push(property_id); bookingsWhere += ` AND b.property_id = $${params.length}`; }
  if (year) { params.push(year); bookingsWhere += ` AND EXTRACT(YEAR FROM b.check_in) = $${params.length}`; }
  if (month) { params.push(month); bookingsWhere += ` AND EXTRACT(MONTH FROM b.check_in) = $${params.length}`; }

  const { rows: bookingSummary } = await pool.query(
    `SELECT
       b.property_id,
       p.name as property_name,
       b.channel,
       COUNT(*) as bookings,
       ROUND(SUM(b.total_gross)::numeric, 2) as total_gross,
       ROUND(SUM(b.net_revenue)::numeric, 2) as total_net,
       ROUND(SUM(b.check_out - b.check_in)::numeric, 0) as total_nights
     FROM bookings b
     LEFT JOIN properties p ON b.property_id = p.id
     ${bookingsWhere}
     GROUP BY b.property_id, p.name, b.channel
     ORDER BY b.property_id, b.channel`,
    params
  );

  return res.json({ bookings: bookingSummary });
});

// ── Properties (admin) ────────────────────────────────────────────────────────

router.get("/admin/properties", requireAdmin, async (_req, res) => {
  const pool = getPool();
  const { rows } = await pool.query(
    `SELECT id, name, type, area, region, bedrooms, guests, active, airbnb_url FROM properties ORDER BY created_at ASC`
  );
  return res.json(rows);
});

// ── iCal feeds (admin) ────────────────────────────────────────────────────────

router.get("/admin/ical-feeds", requireAdmin, async (_req, res) => {
  const pool = getPool();
  const { rows } = await pool.query(
    `SELECT id, property_id, channel, ical_url, last_synced, error_count FROM ical_feeds ORDER BY property_id, channel`
  );
  return res.json(rows);
});

router.post("/admin/ical-feeds", requireAdmin, async (req, res) => {
  const pool = getPool();
  const { property_id, channel, ical_url } = req.body ?? {};
  if (!property_id || !channel || !ical_url) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const { rows } = await pool.query(
    `INSERT INTO ical_feeds (property_id, channel, ical_url) VALUES ($1,$2,$3)
     ON CONFLICT DO NOTHING RETURNING *`,
    [property_id, channel, ical_url]
  );
  return res.status(201).json(rows[0] ?? { message: "Already exists" });
});

router.delete("/admin/ical-feeds/:id", requireAdmin, async (req, res) => {
  const pool = getPool();
  await pool.query(`DELETE FROM ical_feeds WHERE id = $1`, [parseInt(req.params.id, 10)]);
  return res.json({ ok: true });
});

export default router;
