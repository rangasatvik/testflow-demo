# Go-to-market: outreach-heavy, founder-led

Motion for launching Testflow: cold email into a tightly scoped ICP, with the
founder running every reply and demo personally until there's a repeatable
script worth handing to a rep.

## Contents

- [`icp.md`](./icp.md) — who we're targeting and why, plus disqualifiers.
- [`cold-email-sequence.md`](./cold-email-sequence.md) — 3-touch cold email
  sequence (initial + 2 follow-ups), with the `email_open` tracking pixel
  wired into every template.
- [`cold-email-sequences/`](./cold-email-sequences/) — per-email files with
  full body, subject-line A/B variants, personalisation variables, and do/don'ts.
- [`linkedin-outreach.md`](./linkedin-outreach.md) — connection request, DM
  follow-up, warm-intro request, and inbound-lead scripts.
- [`reply-handling.md`](./reply-handling.md) — exact response copy for every
  reply type: interested, not-now, wrong-person, competitor-user, price ask,
  and unsubscribe.
- [`post-demo-followup.md`](./post-demo-followup.md) — follow-up email to send
  within 2 hours of a demo call, plus the lightweight one-page proposal format.
- [`founder-led-sales-playbook.md`](./founder-led-sales-playbook.md) — call
  script, objection handling, and the demo-to-close flow.
- [`launch-checklist.md`](./launch-checklist.md) — pre-launch requirements and
  the weekly outreach cadence checklist.
- [`prospect-tracker.csv`](./prospect-tracker.csv) — template for logging
  prospects and outreach status; import into a spreadsheet or CRM.

## What's already wired up in the product

- `POST /api/analytics/events` captures `website_visit` and `demo_request`
  (see `src/analytics.js`, `src/App.jsx`).
- `GET /api/analytics/pixel.gif?campaign=<name>` records an `email_open`
  event. The cold email templates in this folder embed it as
  `<img src="https://<deployed-host>/api/analytics/pixel.gif?campaign=cold-01">`
  — swap `<deployed-host>` for the real deployment domain before sending.
- `GET /api/analytics/summary` returns a rolling 30-day JSON summary of event
  counts by type and `email_open` counts by campaign slug — use this in the
  weekly founder review (see `launch-checklist.md`) to see which touches are
  driving demo requests.
- Reply-to on every template should be the founder's inbox — this is a
  founder-led motion, not a shared sales alias.

## What is NOT wired up (blocked on resources, see below)

There is no outbound email-sending integration in this repo (no ESP/SMTP
provider, no sending domain, no verified prospect list). This task produced
the outreach assets and the tracking wiring; it did not send any email. Cold
email requires a real target list and a real sending identity — fabricating
either would just produce noise, not results.

To actually run this motion, a human needs to:

1. Pick an ESP (e.g. Mailgun, SendGrid, or plain Gmail for founder-led volume)
   and set up SPF/DKIM/DMARC on the sending domain.
2. Build or buy a real prospect list matching `icp.md` and load it into
   `prospect-tracker.csv` (or a CRM).
3. Load the templates in `cold-email-sequence.md` into the ESP/CRM, replacing
   `<deployed-host>` with the real deployed domain.
