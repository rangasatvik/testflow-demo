-- Convenience view for the analytics summary endpoint; counts each planned
-- event type so the API can JOIN once instead of running per-event queries.
CREATE OR REPLACE VIEW analytics_summary AS
SELECT
  COALESCE(SUM(CASE WHEN event_name = 'website_visit'     THEN 1 END), 0) AS website_visits,
  COALESCE(SUM(CASE WHEN event_name = 'demo_request'      THEN 1 END), 0) AS demo_requests,
  COALESCE(SUM(CASE WHEN event_name = 'email_open'        THEN 1 END), 0) AS email_opens,
  COALESCE(SUM(CASE WHEN event_name = 'customer_onboarded' THEN 1 END), 0) AS customers_onboarded
FROM analytics_events;
