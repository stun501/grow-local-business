# Prompt for the AI Agent

You are the lead engineering agent responsible for delivering the **Local Business Lead-Magnet Toolkit** described in the attached project brief. Read the brief in full before doing anything else. Your job is to deliver the complete, working system — landing pages, the three free tools, staged lead capture, and print assets — efficiently, to a high quality bar, using an agentic, parallelised approach.

## How you must work

Work in this strict order:

### Phase 1 — Project Requirements Document (PRD)
Before writing any code, produce a PRD that translates the brief into concrete, testable requirements. It must cover:
- User stories for each persona: me (the consultant), the business owner, and the end customer (e.g. the garage's customer using the quote form).
- Functional requirements per tool (Instant Quote Form, Review QR Tool, Valuation Form), including the staged lead-capture flow (company name → instant tool → name + email to download/share).
- Non-functional requirements: mobile-first, sub-60-second flow, fast load, low/zero running cost, GDPR-compliant capture, maintainability by a non-developer.
- Data model for lead storage and how I will access/export leads.
- Tech stack proposal with justification, biased toward simple, cheap, and maintainable.
- Explicit out-of-scope list and open questions. **Present the open questions to me and pause for my answers before proceeding if any are blocking; otherwise state your assumptions clearly and continue.**

### Phase 2 — Delivery Plan
From the approved PRD, write a delivery plan containing:
- A breakdown of deliverables and milestones, ordered by priority (Milestone 1 must be the Instant Quote Form for garages plus its landing page and lead capture, since that is my primary in-field tool; then the Review QR tool; then the Valuation form; then flyer assets and admin/lead export).
- For each milestone: its deliverables, acceptance criteria, dependencies, and estimated effort.
- A parallelisation map: which workstreams are independent and can run concurrently.

### Phase 3 — Parallel Execution with Subagents
Execute the plan agentically:
- Where the plan identifies independent workstreams, **spawn subagents** to deliver them in parallel (for example: one subagent on the shared landing-page shell and design system, one on the quote-form tool logic, one on the review-QR tool, one on lead storage/admin, one on print assets).
- Give each subagent a tight, self-contained task spec derived from the PRD: inputs, expected outputs, acceptance criteria, and interface contracts so their outputs integrate cleanly.
- You remain the integrator: review each subagent's output against its acceptance criteria before merging, resolve conflicts, and maintain a consistent design system and codebase across all pages and tools.
- After each milestone, run a verification pass: test the full user flow end-to-end on mobile viewport (scan → generate → use → capture), confirm leads are recorded correctly, and fix defects before moving on.

### Phase 4 — Handover
Finish with:
- A deployed or deployable build with clear, step-by-step instructions for hosting it cheaply and pointing my master QR code at it.
- A short non-technical operations guide for me: how to view/export leads, how to update price templates and copy, and how to add a new business type/tool in future.
- The flyer template (A4, 4-up) as a print-ready file.
- A summary of what was delivered against each milestone, any known limitations, and recommended next improvements.

## Quality bar and working principles
- Value first, friction second: never add a form field that isn't in the brief.
- Mobile is the primary device; test everything on a phone-sized viewport first.
- Prefer boring, reliable technology over clever architecture — I need to maintain this.
- Keep me informed with brief progress updates at each milestone, not walls of text.
- If a requirement in the brief conflicts with something technical, flag it with options and a recommendation rather than silently deciding.

Begin now with Phase 1: the PRD.
