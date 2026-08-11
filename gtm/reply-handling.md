# Reply handling guide

For every reply type, respond within a few business hours. The goal of every
reply is the same: get 15 minutes on the calendar. Don't close in the reply
thread.

Mark the sequence stopped in `prospect-tracker.csv` the moment any reply arrives —
never send Touch 2 or Touch 3 after a reply, regardless of sentiment.

---

## "Interested — let's talk" or "Tell me more"

**Goal:** book the call immediately, no back-and-forth.

```
Subject: Re: [original thread]

Great — here's my calendar: [CALENDAR_LINK]

Pick any slot that works. I'll send a short agenda the day before.

[FOUNDER_FIRST_NAME]
```

**Notes:**
- Don't send a long reply pitching features — save it for the call.
- If they ask a specific question before agreeing to a call, answer it in one
  sentence and re-offer the calendar link.

---

## "Not right now / we'll revisit later"

**Goal:** confirm the timing and set a re-engage date without pressure.

```
Subject: Re: [original thread]

Understood — happy to revisit when the timing works.

Is there a specific trigger that would make it more relevant? (A security
questionnaire landing, a new enterprise deal, a compliance conversation?) Helps
me know when to follow back up.

[FOUNDER_FIRST_NAME]
```

**Notes:**
- If they name a specific trigger, note it in `prospect-tracker.csv` under
  `next_step` and schedule a reminder to re-engage in 60–90 days.
- If they give a vague "few months," set a 60-day reminder, don't push
  for specifics.

---

## "We already have [Vanta / Drata / Secureframe / another GRC tool]"

**Goal:** qualify out gracefully and preserve the relationship.

```
Subject: Re: [original thread]

Completely makes sense — you're already in a different category of buyer than
what Testflow is built for. We're focused on teams earlier in that journey who
need a baseline before they're ready for a full GRC platform.

If that changes at another company or you have a contact dealing with that
earlier-stage problem, I'd appreciate the intro. Good luck with [GRC tool].

[FOUNDER_FIRST_NAME]
```

**Notes:**
- Do not try to compete on breadth with Vanta/Drata — per the objection
  handling in `founder-led-sales-playbook.md`, that's a different buyer.
- Mark as disqualified in `prospect-tracker.csv`.

---

## "Wrong person — you should talk to [Name]"

**Goal:** get the warm referral and reach out to the right contact promptly.

```
Subject: Re: [original thread]

Thanks for the redirect — really appreciate it. I'll reach out to [REFERRED_NAME]
directly.

[FOUNDER_FIRST_NAME]
```

Then email or LinkedIn the referred contact:

```
Subject: [REFERRING_NAME] suggested I reach out

Hi [REFERRED_FIRST_NAME],

[REFERRING_NAME] pointed me your way — they thought Testflow might be relevant
for [COMPANY] given your work on [area]. [REFERRING_NAME]'s context:
[one sentence].

[Paste the relevant portion of the original first-touch email here, condensed
to 2–3 sentences.]

Worth 15 minutes?

[FOUNDER_FIRST_NAME]
[CALENDAR_LINK]
```

**Notes:**
- A referral from inside the company is warmer than cold outreach —
  respond to it faster than a cold reply.
- Update `prospect-tracker.csv`: mark the original contact as "referred"
  and add a new row for the referred contact.

---

## "Please remove me / stop emailing me"

**Goal:** honour the request immediately, log it, and move on.

```
Subject: Re: [original thread]

Done — removing you from my list now. Sorry for the interruption.

[FOUNDER_FIRST_NAME]
```

**Notes:**
- Stop the sequence immediately; do not send Touch 2 or 3.
- Mark as "unsubscribed" in `prospect-tracker.csv` and do not re-engage.
- If you're using an ESP, also unsubscribe the address in the ESP to prevent
  accidental re-contact.

---

## "What does it cost?"

**Goal:** move to a call before quoting — pricing should be in context.

```
Subject: Re: [original thread]

Pricing depends on a few things that are easiest to walk through live. It's
designed to be cheaper than a consulting bill for the same problem.

Can you do 15 minutes this week? [CALENDAR_LINK]

[FOUNDER_FIRST_NAME]
```

**Notes:**
- Don't quote a number in email at this stage — it anchors the conversation
  before they've seen the value.
- If they push back and insist on a number first, give a range rather than a
  specific figure: "We've been in the $[low]–$[high]/month range for teams your
  size, depending on headcount and modules."
