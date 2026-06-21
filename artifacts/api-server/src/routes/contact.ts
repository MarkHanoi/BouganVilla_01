import { Router } from "express";
import { z } from "zod";
import type { Logger } from "pino";
import { getPool } from "../lib/db.js";

const router = Router();

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(300),
  phone: z.string().max(50).optional(),
  property: z.string().max(100),
  checkin: z.string().optional(),
  checkout: z.string().optional(),
  guests: z.string().optional(),
  message: z.string().min(1).max(5000),
});

async function sendContactEmails(
  data: z.infer<typeof ContactSchema>,
  enquiryId: number,
  log: Logger,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    log.info({ enquiryId }, "Email: RESEND_API_KEY not set — skipping contact notification");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const fromEmail = process.env.FROM_EMAIL ?? "Bougan Villa <hello@bouganvilla.com>";
  const ownersEmail = process.env.OWNERS_EMAIL;

  const propertyLabels: Record<string, string> = {
    "villa-emerald": "Villa Emerald",
    "apartamento-sao-martinho": "Apartamento São Martinho",
    "both": "Both properties",
    "not-sure": "Not sure yet",
  };
  const propertyLabel = propertyLabels[data.property] ?? data.property;

  const datesLine = data.checkin && data.checkout
    ? `${data.checkin} → ${data.checkout}${data.guests ? ` · ${data.guests} guest${Number(data.guests) !== 1 ? "s" : ""}` : ""}`
    : "Dates not specified";

  const guestHtml = `
    <div style="font-family:'Helvetica Neue',Helvetica,sans-serif;background:#faf7f2;padding:40px;max-width:540px;margin:0 auto;">
      <div style="background:#203e4e;padding:22px 28px;margin-bottom:32px;">
        <p style="color:#FAF7F2;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0;font-weight:300;">BOUGAN · VILLA</p>
        <p style="color:rgba(250,247,242,0.5);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;margin:4px 0 0;">PROPERTY MANAGEMENT</p>
      </div>
      <h1 style="color:#2b2b2b;font-size:26px;font-weight:300;margin:0 0 8px;line-height:1.3;">Thank you, ${data.name}.</h1>
      <p style="color:#888;font-size:13px;margin:0 0 28px;line-height:1.6;">We've received your enquiry and will get back to you within 24 hours.</p>

      <div style="background:white;border:1px solid #e8dfd0;padding:24px;margin-bottom:28px;">
        <p style="font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#c96a3a;margin:0 0 14px;">Your enquiry</p>
        <table style="width:100%;font-size:13px;border-collapse:collapse;line-height:1.8;">
          <tr><td style="color:#888;width:110px;vertical-align:top;">Property</td><td style="color:#2b2b2b;">${propertyLabel}</td></tr>
          <tr><td style="color:#888;vertical-align:top;">Dates</td><td style="color:#2b2b2b;">${datesLine}</td></tr>
          <tr><td style="color:#888;vertical-align:top;padding-top:8px;">Message</td><td style="color:#2b2b2b;padding-top:8px;">${data.message.replace(/\n/g, "<br>")}</td></tr>
        </table>
      </div>

      <p style="color:#888;font-size:12px;line-height:1.7;margin:0 0 24px;">In the meantime, you can view the property on Airbnb or message us on WhatsApp at <a href="tel:+351912345678" style="color:#c96a3a;">+351 912 345 678</a>.</p>
      <div style="border-top:1px solid #e8dfd0;padding-top:20px;">
        <p style="color:#bbb;font-size:11px;margin:0;">© Bougan Villa · Setúbal / Silver Coast, Portugal</p>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: fromEmail,
    to: data.email,
    subject: `Your enquiry — Bougan Villa (${propertyLabel})`,
    html: guestHtml,
    text: [
      `Hi ${data.name},`,
      "",
      `Thank you for your enquiry about ${propertyLabel}.`,
      "We'll get back to you within 24 hours.",
      "",
      `Dates: ${datesLine}`,
      "",
      `Your message: ${data.message}`,
      "",
      "— Bougan Villa",
    ].join("\n"),
  });

  if (ownersEmail) {
    const internalHtml = `
      <div style="font-family:sans-serif;padding:24px;max-width:480px;background:#fff;">
        <p style="font-size:16px;font-weight:600;margin:0 0 16px;">New guest enquiry #${enquiryId}</p>
        <table style="font-size:13px;border-collapse:collapse;width:100%;line-height:2;">
          <tr><td style="color:#888;width:100px;">Name</td><td><strong>${data.name}</strong></td></tr>
          <tr><td style="color:#888;">Email</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="color:#888;">Phone</td><td>${data.phone ?? "—"}</td></tr>
          <tr><td style="color:#888;">Property</td><td>${propertyLabel}</td></tr>
          <tr><td style="color:#888;">Dates</td><td>${datesLine}</td></tr>
          <tr><td style="color:#888;vertical-align:top;">Message</td><td>${data.message.replace(/\n/g, "<br>")}</td></tr>
        </table>
      </div>
    `;
    await resend.emails.send({
      from: fromEmail,
      to: ownersEmail,
      replyTo: data.email,
      subject: `Enquiry #${enquiryId} — ${data.name} · ${propertyLabel}`,
      html: internalHtml,
      text: `New enquiry #${enquiryId}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone ?? "—"}\nProperty: ${propertyLabel}\nDates: ${datesLine}\nMessage: ${data.message}`,
    });
  }

  log.info({ enquiryId, to: data.email }, "Email: contact notification sent");
}

router.post("/contact", async (req, res) => {
  const log = (req as unknown as { log: Logger }).log;

  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
  }

  const d = parsed.data;
  const pool = getPool();

  const { rows } = await pool.query(
    `INSERT INTO enquiries (property_id, name, email, phone, message, check_in, check_out, guests)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id`,
    [
      d.property || null,
      d.name,
      d.email,
      d.phone ?? null,
      d.message,
      d.checkin || null,
      d.checkout || null,
      d.guests ? parseInt(d.guests, 10) : null,
    ],
  );

  const enquiryId = rows[0].id as number;
  log.info({ enquiryId }, "Enquiry saved to database");

  sendContactEmails(d, enquiryId, log).catch((err) => {
    log.warn({ err, enquiryId }, "Contact email failed");
  });

  return res.json({ ok: true, id: enquiryId });
});

export default router;
