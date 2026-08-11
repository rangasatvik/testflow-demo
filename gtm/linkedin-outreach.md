# LinkedIn outreach scripts

Supplement cold email with LinkedIn for prospects where you have a strong signal
but no verified email address, or where a mutual connection makes a warm touch
possible. Keep LinkedIn messages shorter than email — the character limits
enforce brevity.

---

## Connection request note (300 chars max)

Use when connecting before or instead of a cold email.

```
Hi [FIRST_NAME], noticed [COMPANY] is [SIGNAL — e.g. "hiring a first compliance
engineer" / "selling into enterprise accounts"]. Built a tool that might be
relevant — happy to share a quick read on your security posture if useful.
[FOUNDER_FIRST_NAME]
```

**Notes:**
- No pitch in the connection note itself — just a reason to connect.
- If they accept but don't reply, send a follow-up message 2 days later.
- If they don't accept within 5 days, move to cold email if you have their address.

---

## Follow-up after connection accepted (if no reply to the request note)

```
Thanks for connecting, [FIRST_NAME].

Quick context: Testflow runs a 15-minute automated security assessment — covers
identity, devices, data, and incident readiness. Teams your size usually use it
to get in front of a customer security questionnaire before it becomes a deal
blocker.

Worth 20 minutes to see if it fits? [CALENDAR_LINK]

[FOUNDER_FIRST_NAME]
```

**Notes:**
- Send this only once; do not follow up again on LinkedIn if there is no reply.
- If they engage but aren't ready to book, switch to email for the multi-touch
  sequence in `cold-email-sequences/`.

---

## Warm intro request (to a mutual connection)

Use when you share a connection with the target prospect.

```
Hi [MUTUAL_CONNECTION_NAME],

Hope you're well. I'm doing early outreach for Testflow — automated security
assessment for small B2B teams facing vendor security reviews. I noticed you're
connected to [TARGET_NAME] at [COMPANY], which looks like a strong fit.

Any chance you'd be comfortable making a brief intro? Happy to draft something
you could just forward.

Thanks,
[FOUNDER_FIRST_NAME]
```

**Notes:**
- Always offer to write the intro email — it reduces the ask and increases
  the odds.
- Warm intros should be your first channel before cold outreach to any
  target, per the ICP sourcing guidance in `icp.md`.

---

## Intro email draft (for the mutual connection to forward)

```
Subject: Intro: [FOUNDER_FIRST_NAME] + [TARGET_NAME]

[TARGET_NAME],

Connecting you with [FOUNDER_FIRST_NAME], who's building Testflow — a
lightweight security assessment tool for B2B teams dealing with vendor security
reviews. Given [COMPANY]'s space I thought it could be relevant.

[FOUNDER_FIRST_NAME], [TARGET_NAME] runs [ROLE] at [COMPANY].

Happy to leave you both here.

[MUTUAL_CONNECTION_NAME]
```

---

## LinkedIn DM to inbound visitors (if you can identify them)

When a prospect visits the product page and submits a demo request, their email
lands in `analytics_events` as a `demo_request` event. If you can match them
to a LinkedIn profile, this message is appropriate:

```
Hi [FIRST_NAME], thanks for the Testflow demo request — I'll reach out to your
email shortly. Anything specific you want to make sure we cover?

[FOUNDER_FIRST_NAME]
```

**Notes:**
- Do not message on LinkedIn AND email simultaneously — pick one channel.
- LinkedIn is for low-volume, high-signal outreach. Cold email at volume
  should come via the ESP, not LinkedIn DMs.
