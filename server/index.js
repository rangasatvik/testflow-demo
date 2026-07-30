import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import { getPool } from "./db.js";
import { ALLOWED_EVENTS, TRACKING_PIXEL, recordEvent } from "./analytics.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/db-health", async (_req, res) => {
  try {
    await getPool().query("SELECT 1");
    res.json({ status: "ok" });
  } catch (err) {
    res.status(503).json({ status: "error", message: err.message });
  }
});

app.post("/api/analytics/events", async (req, res) => {
  const { event, properties } = req.body || {};
  if (typeof event !== "string" || !ALLOWED_EVENTS.has(event)) {
    res.status(400).json({ status: "error", message: "Unknown or missing event name" });
    return;
  }
  try {
    await recordEvent(
      getPool(),
      event,
      properties && typeof properties === "object" ? properties : {},
    );
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Email open-rate capture: embed this as an <img> pixel in outbound email
// templates once an email-sending integration exists.
app.get("/api/analytics/pixel.gif", async (req, res) => {
  const { campaign } = req.query;
  try {
    await recordEvent(getPool(), "email_open", campaign ? { campaign } : {});
  } catch (err) {
    console.error("Failed to record email_open event:", err.message);
  }
  res.set("Content-Type", "image/gif");
  res.set("Cache-Control", "no-store");
  res.send(TRACKING_PIXEL);
});

app.use(express.static(distDir));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
