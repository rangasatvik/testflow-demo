-- Analytics capture: website visits, demo requests, email opens.
CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  event_name TEXT NOT NULL,
  properties JSONB NOT NULL DEFAULT '{}'::jsonb,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS analytics_events_event_name_idx ON analytics_events (event_name);
CREATE INDEX IF NOT EXISTS analytics_events_occurred_at_idx ON analytics_events (occurred_at);
