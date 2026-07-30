const EVENTS_ENDPOINT = "/api/analytics/events";

export function trackEvent(event, properties = {}) {
  const payload = JSON.stringify({ event, properties });

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const sent = navigator.sendBeacon(
      EVENTS_ENDPOINT,
      new Blob([payload], { type: "application/json" }),
    );
    if (sent) return;
  }

  fetch(EVENTS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}
