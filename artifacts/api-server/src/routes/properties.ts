import { Router } from "express";
import { getPool } from "../lib/db.js";

const router = Router();

router.get("/properties", async (_req, res) => {
  const pool = getPool();
  const { rows } = await pool.query(
    `SELECT id, name, type, area, region, bedrooms, bathrooms, guests,
            description, image, images, amenities, tags, highlights, nearby,
            cta_label, cta_href, cta_external, airbnb_url, base_price_eur, active
     FROM properties WHERE active = true ORDER BY created_at ASC`
  );
  return res.json(rows);
});

router.get("/properties/:id", async (req, res) => {
  const pool = getPool();
  const { rows } = await pool.query(
    `SELECT id, name, type, area, region, bedrooms, bathrooms, guests,
            description, long_description, image, images, amenities, tags,
            highlights, nearby, cta_label, cta_href, cta_external, airbnb_url,
            base_price_eur, active
     FROM properties WHERE id = $1 AND active = true`,
    [req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: "Property not found" });
  return res.json(rows[0]);
});

export default router;
