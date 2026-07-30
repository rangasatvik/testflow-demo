# Cold email sequence (3 touches)

Sent from the founder's personal inbox, not a noreply/sales alias. One
prospect per send — no BCC blasts. Replace bracketed fields per prospect
before sending. Replace `<deployed-host>` with the real deployed domain
before loading these into an ESP.

Every template embeds the open-tracking pixel from
`GET /api/analytics/pixel.gif?campaign=<name>` (see `server/index.js`) so
opens land in `analytics_events` as `email_open` events, one campaign name
per touch.

---

## Touch 1 — Day 0

**Subject:** quick question about [Company]'s security questionnaires

```
Hi [First name],

Saw [signal: job post for a compliance hire / recent funding round /
customer review request] — usually means security questionnaires just
started showing up in your inbox.

I built Testflow because most teams your size don't need a full GRC
platform, they need a fast, honest answer to "where are we exposed" and
something concrete to hand back to the customer asking. It's a guided
assessment across identity, devices, data, and incident readiness, plus the
remediation steps to close the gaps.

Worth 15 minutes to see if it'd save you the next questionnaire?

[Founder name]

<img src="https://<deployed-host>/api/analytics/pixel.gif?campaign=cold-01-intro" width="1" height="1" alt="" style="display:none">
```

---

## Touch 2 — Day 3 (if no reply)

**Subject:** re: quick question about [Company]'s security questionnaires

```
Hi [First name],

Following up in case this got buried — happy to just send over the
assessment framework directly if a call isn't useful right now
([deployed-host] has a live version, takes about 10 minutes to run through).

Either way, no worries if it's not a priority this quarter.

[Founder name]

<img src="https://<deployed-host>/api/analytics/pixel.gif?campaign=cold-02-followup" width="1" height="1" alt="" style="display:none">
```

---

## Touch 3 — Day 8 (if still no reply)

**Subject:** closing the loop

```
Hi [First name],

Last note from me — I'll assume the timing's off for now. If a security
questionnaire or vendor review does land on your desk, the assessment is at
https://<deployed-host> and takes about 10 minutes.

Reply any time if that changes.

[Founder name]

<img src="https://<deployed-host>/api/analytics/pixel.gif?campaign=cold-03-breakup" width="1" height="1" alt="" style="display:none">
```

---

## Notes

- Personalize the `[signal: ...]` line per prospect — generic versions of
  this line kill reply rates. If there's no real signal, don't send.
- Stop the sequence immediately on any reply, including "not interested."
- Track every send/reply/open in `prospect-tracker.csv`.
