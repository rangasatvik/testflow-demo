// Capture layer for the blueprint's analytics plan: website visits, demo
// requests, and email opens all land in the same append-only events table.
export const ALLOWED_EVENTS = new Set([
  "website_visit",
  "demo_request",
  "email_open",
  "customer_onboarded",
]);

// 1x1 transparent GIF, used as an email open-tracking pixel.
export const TRACKING_PIXEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7",
  "base64",
);

export async function getEventCounts(pool) {
  const { rows } = await pool.query(
    `SELECT event_name, COUNT(*)::int AS count
     FROM analytics_events
     WHERE event_name = ANY($1)
     GROUP BY event_name`,
    [Array.from(ALLOWED_EVENTS)],
  );
  const counts = Object.fromEntries(Array.from(ALLOWED_EVENTS).map((e) => [e, 0]));
  for (const row of rows) counts[row.event_name] = row.count;
  return counts;
}

export async function recordEvent(pool, eventName, properties = {}) {
  if (!ALLOWED_EVENTS.has(eventName)) {
    throw new Error(`Unknown analytics event: ${eventName}`);
  }
  await pool.query(
    "INSERT INTO analytics_events (event_name, properties) VALUES ($1, $2)",
    [eventName, properties],
  );
}
