import { Router } from "express";
import { z } from "zod";
import type { Logger } from "pino";

const router = Router();

const OwnerEstimateSchema = z.object({
  area: z.string().min(1),
  propertyType: z.enum(["studio", "apartment", "villa", "house"]),
  bedrooms: z.number().int().min(0).max(10),
  sizeSqm: z.number().min(10).max(1000),
  amenities: z.array(z.string()),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
});

const AREA_BASE_RATES: Record<string, number> = {
  "Chiado / Bairro Alto": 190,
  "Belém / Santos": 165,
  "Alfama / Mouraria": 155,
  "Príncipe Real": 180,
  "Parque das Nações": 145,
  "Cascais / Estoril": 210,
  "Sintra": 145,
  "Almada / South Bank": 135,
  "Other": 130,
};

const AMENITY_BONUSES: Record<string, number> = {
  pool: 45,
  "sea_view": 30,
  "city_view": 15,
  terrace: 18,
  garden: 12,
  parking: 12,
  ac: 8,
  "modern_kitchen": 5,
};

function calculateEstimate(data: z.infer<typeof OwnerEstimateSchema>) {
  const base = AREA_BASE_RATES[data.area] ?? 130;
  const bedroomBonus = data.bedrooms * 28;
  const amenityBonus = data.amenities.reduce(
    (sum, a) => sum + (AMENITY_BONUSES[a] ?? 0),
    0,
  );
  const sizeMultiplier = data.sizeSqm > 100 ? 1.1 : data.sizeSqm > 60 ? 1.0 : 0.9;
  const typeMultiplier = data.propertyType === "villa" || data.propertyType === "house" ? 1.2 : 1.0;

  const nightly = Math.round((base + bedroomBonus + amenityBonus) * sizeMultiplier * typeMultiplier);
  const nightlyLow = Math.round(nightly * 0.85);
  const nightlyHigh = Math.round(nightly * 1.2);
  const monthlyLow = Math.round(nightlyLow * 18);
  const monthlyHigh = Math.round(nightlyHigh * 22);
  const annualLow = Math.round(monthlyLow * 10);
  const annualHigh = Math.round(monthlyHigh * 10);

  return { nightly, nightlyLow, nightlyHigh, monthlyLow, monthlyHigh, annualLow, annualHigh };
}

async function sendEstimateEmail(
  data: z.infer<typeof OwnerEstimateSchema>,
  estimate: ReturnType<typeof calculateEstimate>,
  log: Logger,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    log.info({ to: data.email }, "Email: RESEND_API_KEY not set — skipping owner estimate email");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const fromEmail = process.env.FROM_EMAIL ?? "Bougan Villa <hello@bouganvilla.com>";
  const ownersEmail = process.env.OWNERS_EMAIL ?? process.env.ADMISSIONS_EMAIL;

  const amenityLabels: Record<string, string> = {
    pool: "Pool", sea_view: "Sea view", city_view: "City view",
    terrace: "Terrace", garden: "Garden", parking: "Parking",
    ac: "Air conditioning", modern_kitchen: "Modern kitchen",
  };

  const amenityList = data.amenities.map((a) => amenityLabels[a] ?? a).join(", ") || "None";

  const ownerHtml = `
    <div style="font-family:'Plus Jakarta Sans',sans-serif;background:#f8f5f0;padding:40px;max-width:560px;margin:0 auto;">
      <div style="background:#203e4e;padding:24px 32px;margin-bottom:32px;">
        <p style="color:white;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;margin:0 0 4px;">South Bank Lisbon Rentals</p>
        <p style="color:rgba(255,255,255,0.5);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;margin:0;">Bougan Villa</p>
      </div>
      <h1 style="color:#2b2b2b;font-size:28px;font-weight:300;margin:0 0 8px;">Your rental estimate</h1>
      <p style="color:#888;font-size:14px;margin:0 0 32px;">Hi ${data.name}, here's what your property could earn.</p>

      <div style="background:white;border:1px solid #e8dfd0;padding:28px;margin-bottom:24px;">
        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#c96a3a;margin:0 0 16px;">Estimated nightly rate</p>
        <p style="font-size:42px;font-weight:300;color:#203e4e;margin:0 0 4px;">€${estimate.nightlyLow} – €${estimate.nightlyHigh}</p>
        <p style="color:#888;font-size:13px;margin:0;">per night</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;">
        <div style="background:white;border:1px solid #e8dfd0;padding:20px;">
          <p style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888;margin:0 0 8px;">Monthly (est.)</p>
          <p style="font-size:22px;font-weight:300;color:#2b2b2b;margin:0;">€${estimate.monthlyLow.toLocaleString()} – €${estimate.monthlyHigh.toLocaleString()}</p>
        </div>
        <div style="background:white;border:1px solid #e8dfd0;padding:20px;">
          <p style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888;margin:0 0 8px;">Annual (est.)</p>
          <p style="font-size:22px;font-weight:300;color:#2b2b2b;margin:0;">€${estimate.annualLow.toLocaleString()} – €${estimate.annualHigh.toLocaleString()}</p>
        </div>
      </div>

      <div style="background:white;border:1px solid #e8dfd0;padding:20px;margin-bottom:32px;">
        <p style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888;margin:0 0 12px;">Your property</p>
        <table style="width:100%;font-size:13px;border-collapse:collapse;">
          <tr><td style="color:#888;padding:4px 0;width:120px;">Area</td><td style="color:#2b2b2b;">${data.area}</td></tr>
          <tr><td style="color:#888;padding:4px 0;">Type</td><td style="color:#2b2b2b;">${data.propertyType}</td></tr>
          <tr><td style="color:#888;padding:4px 0;">Bedrooms</td><td style="color:#2b2b2b;">${data.bedrooms === 0 ? "Studio" : data.bedrooms}</td></tr>
          <tr><td style="color:#888;padding:4px 0;">Size</td><td style="color:#2b2b2b;">${data.sizeSqm} m²</td></tr>
          <tr><td style="color:#888;padding:4px 0;">Amenities</td><td style="color:#2b2b2b;">${amenityList}</td></tr>
        </table>
      </div>

      <p style="color:#888;font-size:12px;line-height:1.6;margin:0 0 24px;">These figures are estimates based on comparable properties in your area. A Bougan Villa consultant will reach out within 48 hours with a personalised analysis and next steps.</p>

      <div style="border-top:1px solid #e8dfd0;padding-top:24px;">
        <p style="color:#aaa;font-size:11px;margin:0;">© Bougan Villa · South Bank Lisbon Rentals</p>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: fromEmail,
    to: data.email,
    subject: `Your Bougan Villa rental estimate — €${estimate.nightlyLow}–€${estimate.nightlyHigh}/night`,
    html: ownerHtml,
    text: [
      `Hi ${data.name},`,
      "",
      `Here's your estimated nightly rate for your ${data.area} property:`,
      "",
      `Nightly: €${estimate.nightlyLow} – €${estimate.nightlyHigh}`,
      `Monthly: €${estimate.monthlyLow.toLocaleString()} – €${estimate.monthlyHigh.toLocaleString()}`,
      `Annual:  €${estimate.annualLow.toLocaleString()} – €${estimate.annualHigh.toLocaleString()}`,
      "",
      `Property: ${data.bedrooms === 0 ? "Studio" : `${data.bedrooms}-bed`} ${data.propertyType}, ${data.sizeSqm}m², ${data.area}`,
      "",
      "A Bougan Villa consultant will be in touch within 48 hours.",
      "",
      "— Bougan Villa",
    ].join("\n"),
  });

  if (ownersEmail) {
    await resend.emails.send({
      from: fromEmail,
      to: ownersEmail,
      subject: `New owner enquiry — ${data.name} (${data.area}, ${data.bedrooms}bd)`,
      html: `<div style="font-family:sans-serif;padding:24px;max-width:480px;">
        <p><strong>New owner estimate request</strong></p>
        <p>Name: ${data.name}<br>Email: ${data.email}<br>Phone: ${data.phone ?? "—"}</p>
        <p>Area: ${data.area}<br>Type: ${data.propertyType}<br>Beds: ${data.bedrooms}<br>Size: ${data.sizeSqm}m²<br>Amenities: ${amenityList}</p>
        <p>Estimate sent: €${estimate.nightlyLow}–€${estimate.nightlyHigh}/night</p>
      </div>`,
      text: `New owner enquiry\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone ?? "—"}\nArea: ${data.area}\nType: ${data.propertyType}\nBeds: ${data.bedrooms}\nSize: ${data.sizeSqm}m²\nEstimate: €${estimate.nightlyLow}–€${estimate.nightlyHigh}/night`,
    });
  }

  log.info({ to: data.email }, "Email: owner estimate sent");
}

router.post("/api/owner-estimate", async (req, res) => {
  const log = (req as unknown as { log: Logger }).log;

  const parsed = OwnerEstimateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
  }

  const estimate = calculateEstimate(parsed.data);

  sendEstimateEmail(parsed.data, estimate, log).catch((err) => {
    log.warn({ err }, "Owner estimate email failed");
  });

  return res.json({ ok: true, estimate });
});

export default router;
