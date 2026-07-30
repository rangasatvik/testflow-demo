# Founder-led sales playbook

For the founder running every reply and demo personally during the
outreach-heavy launch phase — before there's a script worth handing to a rep.

## When a reply comes in

- Respond within a few hours during business hours; speed matters more than
  polish at this stage.
- Goal of the reply is one thing: get 15 minutes on the calendar. Don't sell
  in the email thread.

## Discovery call (15 min)

1. **What triggered this?** (customer questionnaire, cyber-insurance
   renewal, investor diligence, a recent incident/scare). This is the
   pitch — mirror their own words back on the demo.
2. **What do they have today?** Nothing / a spreadsheet / a policy doc
   nobody's read. Confirms they're not a GRC-platform buyer (disqualify per
   `icp.md` if they already run Vanta/Drata/Secureframe).
3. **Who else needs to see this?** Founder-led deals at this size are
   usually single-threaded — confirm the discovery-call person can actually
   say yes.

## Demo (15–20 min)

Walk the live assessment at the deployed URL, following the four domains in
`src/App.jsx` (`ASSESSMENT_AREAS`): identity & access, devices & endpoints,
data protection, incident readiness. For each domain:

- Answer 2–3 questions live, in their context, not hypothetically.
- Show the remediation output, not just the score — the score doesn't close
  deals, the "here's exactly what to fix" list does.
- If they mention a specific customer/questionnaire, show how the output
  maps directly to what that customer is asking for.

## Objection handling

- **"We don't have budget for this."** Reframe: the cost is the deal or
  renewal blocked by the questionnaire they can't answer, not the tool.
- **"We're looking at Vanta/Drata instead."** Don't compete on
  compliance-automation breadth — this is faster to stand up and cheaper for
  a team with no security hire; the moment they need audit-ready evidence
  automation at scale, that's a different buyer, say so honestly.
- **"Can we get someone technical from your side to talk to our engineer?"**
  Founder-led doesn't mean founder-only — pull in the engineer who built the
  assessment logic if a technical objection needs a technical answer, but
  the founder stays on the deal.

## Close

- No formal proposal process at this stage: verbal agreement on price and
  start date, followed by a one-page confirmation email.
- Every demo, regardless of outcome, gets logged in `prospect-tracker.csv`
  with next-step and date.

## Weekly founder review

- Pull `email_open`, `website_visit`, and `demo_request` counts from
  `analytics_events` (see `README.md` → Analytics) to see which cold-email
  campaign (`cold-01-intro`, `cold-02-followup`, `cold-03-breakup`) is
  actually driving demo requests, and cut or rewrite the ones that aren't.
