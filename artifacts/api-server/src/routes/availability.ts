import { Router } from "express";
import { getPool } from "../lib/db.js";

const router = Router();

// GET /availability/:propertyId
// Returns blocked date ranges for a property (for calendar display)
router.get("/availability/:propertyId", async (req, res) => {
  const pool = getPool();
  const { rows } = await pool.query(
    `SELECT check_in, check_out, channel, status
     FROM bookings
     WHERE property_id = $1
       AND status NOT IN ('cancelled')
       AND check_out >= CURRENT_DATE
     ORDER BY check_in ASC`,
    [req.params.propertyId]
  );
  return res.json(rows);
});

export default router;
