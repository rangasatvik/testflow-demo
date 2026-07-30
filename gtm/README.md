# Go-to-market: outreach-heavy, founder-led

Motion for launching Testflow: cold email into a tightly scoped ICP, with the
founder running every reply and demo personally until there's a repeatable
script worth handing to a rep.

## Contents

- [`icp.md`](./icp.md) — who we're targeting and why, plus disqualifiers.
- [`cold-email-sequence.md`](./cold-email-sequence.md) — 3-touch cold email
  sequence (initial + 2 follow-ups), with the `email_open` tracking pixel
  wired into every template.
- [`founder-led-sales-playbook.md`](./founder-led-sales-playbook.md) — call
  script, objection handling, and the demo-to-close flow.
- [`prospect-tracker.csv`](./prospect-tracker.csv) — template for logging
  prospects and outreach status; import into a spreadsheet or CRM.

## What's already wired up in the product

- `POST /api/analytics/events` captures `website_visit` and `demo_request`
  (see `src/analytics.js`, `src/App.jsx`).
- `GET /api/analytics/pixel.gif?campaign=<name>` records an `email_open`
  event. The cold email templates in this folder embed it as
  `<img src="https://<deployed-host>/api/analytics/pixel.gif?campaign=cold-01">`
  — swap `<deployed-host>` for the real deployment domain before sending.
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
