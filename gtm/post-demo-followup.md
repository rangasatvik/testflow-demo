# Post-demo follow-up

Send within 2 hours of the demo call ending. One email, no attachments.
The goal is to confirm next steps before the conversation fades.

---

## Template

**Subject:** Next steps — Testflow / [COMPANY]

```
Hi [FIRST_NAME],

Thanks for the time today. Based on what you shared about [THEIR_TRIGGER —
e.g. "the vendor questionnaire from [customer name]" / "the Series B diligence
process"], here's what I think makes sense as a starting point:

[1–2 sentences summarising the specific gaps you identified in the demo — tie
them directly to what they described as the most pressing problem. Be concrete,
not generic.]

**Suggested next step:** [One clear action — e.g. "Run the full assessment with
your team this week and export the report. I'll hold the [date] slot we
discussed to review the results together and talk through pricing."]

If you'd rather move forward now, here's what it looks like:
- [Pricing line — e.g. "$X/month for up to Y seats"]
- Start date: whenever is practical for your team
- No implementation overhead — the assessment runs in the browser

Let me know if you have questions or want to loop in anyone else before
deciding.

[FOUNDER_FIRST_NAME]
[TITLE], Testflow
[DIRECT_PHONE or CALENDAR_LINK]
```

---

## Personalisation variables

| Variable | How to fill |
|----------|------------|
| `[FIRST_NAME]` | Prospect's first name |
| `[COMPANY]` | Prospect's company |
| `[THEIR_TRIGGER]` | The specific problem they named on the call — use their words |
| `[1–2 sentences]` | The top 1–2 gaps that came up live — reference the specific domain |
| `[Suggested next step]` | One concrete action with a date attached |
| `[Pricing line]` | Actual pricing for their situation |
| `[FOUNDER_FIRST_NAME]` | Your first name |
| `[TITLE]` | Your title |
| `[DIRECT_PHONE or CALENDAR_LINK]` | Direct contact for quick follow-up |

---

## If they asked for a written proposal

For founder-led deals at this stage, keep it to a single page (or a short email
addendum — not a PDF). Include:

1. **The problem** — one sentence using their words from the call.
2. **What Testflow does** — three bullet points, specific to their situation.
3. **Investment** — price, billing cadence, what's included.
4. **Next step** — a yes/no question with a date: "Does this work? If so, I'll
   send the agreement by [date]."

No slide deck, no logo soup, no multi-page security spec. If they need
additional security documentation for their own procurement, point them to
`docs/security-best-practices.md`.

---

## After the follow-up email

- Log the outcome in `prospect-tracker.csv`: `demo_outcome` and `next_step`.
- If no reply in 3 business days, send one short follow-up:

```
Subject: Re: Next steps — Testflow / [COMPANY]

Hi [FIRST_NAME], just checking in — any questions from our call or anything I
can clarify to make the decision easier?

[FOUNDER_FIRST_NAME]
```

- If still no reply after that, move to the nurture list. Re-engage in 60 days
  when a relevant trigger appears.
