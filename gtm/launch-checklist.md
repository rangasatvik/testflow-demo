# GTM launch checklist

Use this before sending the first email and at the start of each outreach week.
Everything in "Pre-launch" must be done once; "Weekly cadence" repeats.

---

## Pre-launch (one-time)

### Sending identity
- [ ] Sending domain purchased and SPF / DKIM / DMARC configured (verify with
  `mail-tester.com` or Google Postmaster).
- [ ] Warm-up period complete: 2–3 weeks of low volume from the sending domain
  before the first cold batch (10–20 emails/day, gradually increasing).
- [ ] Reply-to set to the founder's inbox on every template — not a shared alias.
- [ ] Calendar link (Calendly or equivalent) live and tested.

### Product readiness
- [ ] App deployed at a stable public URL (replace `<deployed-host>` in all
  templates with the real domain before uploading to an ESP).
- [ ] `GET /api/analytics/pixel.gif?campaign=cold-01-intro` returns a 1×1 GIF
  and records `email_open` in `analytics_events`.
- [ ] `GET /api/analytics/summary` returns event counts (confirms the DB is up).
- [ ] Demo flow walks cleanly through all four assessment domains without errors.

### Prospect list
- [ ] Initial list of 50–100 targets built from LinkedIn Sales Navigator, each
  matching the ICP in `icp.md` (headcount 15–150, no existing GRC vendor, clear
  trigger signal).
- [ ] Each row in `prospect-tracker.csv` has: company, contact name, title,
  email, and signal (the specific reason for reaching out).
- [ ] Disqualifiers checked: no Vanta/Drata/Secureframe users, no pre-revenue
  companies, no regulated enterprises.

### Email templates loaded
- [ ] Touch 1 (Day 0) template uploaded to ESP with pixel `campaign=cold-01-intro`.
- [ ] Touch 2 (Day 3) template uploaded with pixel `campaign=cold-02-followup`.
- [ ] Touch 3 (Day 8) template uploaded with pixel `campaign=cold-03-breakup`.
- [ ] Each template personalisation-tested with one real prospect before bulk load.

---

## Weekly cadence (every Monday)

### Before sending
1. Pull last week's numbers from `GET /api/analytics/summary` — note
   `email_open` counts by campaign and `demo_request` count.
2. Review `prospect-tracker.csv` — mark anyone who replied, schedule Touch 2 or
   Touch 3 as needed, remove anyone who unsubscribed.
3. Check reply inbox — respond to any pending replies before sending new touches
   (see `reply-handling.md`).

### Sending
4. Send Touch 1 to that week's new prospects (target: 20–30/week until list
   is exhausted or quota limits).
5. Send Touch 2 to prospects who hit Day 3 with no reply.
6. Send Touch 3 to prospects who hit Day 8 with no reply.
7. Log send dates in `prospect-tracker.csv` immediately after each batch.

### After sending
8. Update `prospect-tracker.csv` with outcomes: replied / demo-scheduled /
   no-show / closed / nurture.
9. Note which subject lines drove opens (compare `cold-01-intro` vs
   `cold-02-followup` open counts) — cut or rewrite anything below 30% open rate
   in the rolling 30-day window.

---

## Demo readiness check (before each booked demo)

- [ ] Confirm the call is still on — send a 24-hour reminder via email.
- [ ] Review the prospect's row in `prospect-tracker.csv` — note the trigger
  signal to open the discovery call with.
- [ ] App is up and demo can be shown live at `<deployed-host>`.
- [ ] Reference `founder-led-sales-playbook.md` for the discovery → demo → close flow.

---

## Post-demo follow-up

- Send the follow-up email from `post-demo-followup.md` within 2 hours of the call.
- Log the outcome in `prospect-tracker.csv` (next step + date).
- If won: confirm price and start date verbally, send the one-page confirmation.
- If lost or timing off: move to nurture, re-engage in 60 days on a trigger signal.
