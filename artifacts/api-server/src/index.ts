import app from "./app";
import { logger } from "./lib/logger";
import cron from "node-cron";

const rawPort = process.env["PORT"] ?? "8080";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  // iCal sync — every 15 minutes
  cron.schedule("*/15 * * * *", async () => {
    try {
      const cronSecret = process.env.CRON_SECRET;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (cronSecret) headers["Authorization"] = `Bearer ${cronSecret}`;

      const res = await fetch(`http://localhost:${port}/api/sync-ical`, {
        method: "POST",
        headers,
      });
      const body = await res.json() as { results?: Array<{ synced: number; error?: string }> };
      const synced = body.results?.reduce((s, r) => s + (r.synced ?? 0), 0) ?? 0;
      const errors = body.results?.filter(r => r.error).length ?? 0;
      logger.info({ synced, errors }, "Scheduled iCal sync completed");
    } catch (err) {
      logger.warn({ err }, "Scheduled iCal sync failed");
    }
  });

  logger.info("iCal sync cron scheduled (every 15 min)");
});
