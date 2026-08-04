# Grow Local — Companion Build Document

**Read alongside `growlocal-copy-and-build-spec-v2.md`. That document owns brand, palette, typography, voice, the landing page and the product page template. This one owns three things it doesn't cover: product requirements for the three new tools, the mockup system that brings every product page to life, and the estate agent toolset.**

**Where the two documents overlap, v2 wins on copy and this one wins on functionality.**

---

## Part 1 — The product page mockup system

### 1.1 Why this exists

Every product page currently asks an owner to imagine what a tool does before deciding whether to build one. That's the wrong order. A mockup that shows the thing working removes the imagining, and it's the single cheapest conversion improvement available on these pages.

But a mockup can also do real damage — a fake interface that looks interactive but isn't makes a site feel like a demo rather than a product. So the rules below are not stylistic preferences; they're what separates a mockup that builds confidence from one that erodes it.

### 1.2 The seven rules

1. **Show the outcome, not the interface.** Nobody is persuaded by a screenshot of a form. They're persuaded by seeing the *result* the form produces — the score, the reply, the booked slot, the price. Where a mockup must show input, keep it to a single field already filled in.

2. **Real content only.** Believable British business names, real-looking prices, plausible review text. Never lorem ipsum, never "Business Name Here," never `£XX`. One implausible detail undoes the whole effect.

3. **One interaction, maximum.** A single tap, or a single animated transition, then it rests. Mockups that loop busily or offer multiple controls compete with the actual CTA, which is the thing that matters on the page.

4. **It must be visibly a mockup, never mistaken for the generator.** Device frame, slight scale reduction, and a utility-face caption beneath. A visitor who taps a mockup expecting it to work and finds it inert loses more trust than the mockup gained.

5. **Static fallback, always.** Under `prefers-reduced-motion`, show the finished end state as a still image. The end state is the persuasive frame anyway — the animation only adds a little drama.

6. **Weightless.** CSS and SVG, no video, no image sequences, no animation libraries. Every mockup on the site together should add under 100KB.

7. **Placed high, but never above the CTA.** The mockup sits alongside or immediately after the hero copy, and the primary CTA stays visible without scrolling on mobile. If the mockup pushes the button below the fold, the mockup shrinks.

### 1.3 Standard construction

A Bottle-green panel with a Gold Leaf hairline keyline, containing a simplified phone or card frame in Bone. Beneath, a caption in the utility face, Gold Leaf small caps, naming what's being shown.

The device frame should be a plain rounded rectangle with a speaker notch — no photographic phone renders, no drop shadows, no perspective tilt. This is a diagram, drawn in the brand's own language, not a product photograph.

Animation, where used: one sequence, 1.2 seconds total, easing out, beginning when the panel scrolls into view, running once. Not on a loop.

### 1.4 What each mockup shows

| Tool | Mockup | Caption |
|---|---|---|
| Instant Quote Form | Existing three-state phone cycling through garage, kitchen fitter, accountant | `ONE TOOL · EVERY TRADE` |
| Google Review QR | Phone showing a review card; fifth star fills; card resolves to "Thanks — that helps more than you'd think" | `WHAT YOUR CUSTOMER SEES` |
| Foundation Scorecard | Score dial counting up from 0 to 41, needle settling in the amber band; three gap rows fade in beneath | `A REAL LISTING WE CHECKED` |
| Review Reply Writer | A one-star review card at top; beneath it, a reply composing itself line by line | `FROM A HARD REVIEW TO A GOOD REPLY` |
| Booking Link | A week strip of slots; one taps and turns Gold Leaf; a confirmation line appears | `WHAT YOUR CUSTOMER SEES` |
| Instant Valuation | Postcode field filled; a figure counts up to £412,000; range appears beneath | `AN ESTIMATE IN UNDER A MINUTE` |

**Content for each mockup is specified inside its PRD below. Use it verbatim — it's been written to be plausible, and plausibility is the entire point.**

---

## Part 2 — PRD: Foundation Scorecard

### 2.1 Summary

**Name: Google Profile Foundation Scorecard.** Referred to throughout the site as the **Foundation Scorecard**.

Scores the fundamentals of a business's public Google listing out of 100 and returns the three highest-impact gaps with a plain-English fix for each.

**Strategic note:** this is the most commercially valuable tool in the set. Every other tool gives something away. This one *diagnoses a problem the owner didn't know they had* — and produces, as a by-product, a database of local businesses with recorded scores. A list of qualified prospects with a number attached is worth more than any amount of cold outreach.

### 2.1a Why "Foundation," and what it honestly achieves

**The positioning is deliberate and the wording matters, because overclaiming here would be both wrong and commercially self-defeating.**

Google's local results are driven by three things: **relevance** (does this business match what was searched), **distance** (how close it is to the searcher), and **prominence** (how well-known and well-regarded it appears). The Foundation Scorecard only touches the first and third — nothing can change distance, and for many searches proximity is the dominant factor.

**What fixing the foundations does achieve, honestly stated:**

- **Categories are one of the strongest relevance signals available**, and a wrong or missing primary category is a genuinely significant problem. Fixing it can move a listing noticeably, not marginally. This is the single most valuable thing the Scorecard finds.
- **Review volume and recency correlate strongly with prominence.** A listing going from nine old reviews to forty recent ones tends to improve over months, not days.
- **Completeness — hours, website, description, secondary categories — produces modest gains individually and a meaningful gain collectively**, particularly for listings starting from a low base.
- **Photos and replies affect click-through and conversion more than ranking.** A listing that ranks third but gets chosen because it looks alive beats one that ranks second and looks abandoned.

**The honest summary:** for a listing scoring under 50, completing the foundations typically produces a real, visible improvement — sometimes a substantial one where the primary category was wrong. For a listing already at 70+, gains are slight. In both cases the effect on *whether people choose you once they see you* is more reliable than the effect on *where you appear*. Both matter; they're just not the same thing.

Exact ranking weightings are not published by Google and shift over time, so nothing on the site should ever quote a percentage improvement, promise a position, or imply a timescale.

**Copy rule.** The page says the Scorecard covers the essentials every listing should have right, and that getting them right gives a business its best chance of showing up and being chosen. It never promises a ranking position, never says "guaranteed," and never implies this is a complete local SEO audit.

**The upgrade path.** A deeper audit — competitor comparison, category strategy against local rivals, search-term ranking checks, review velocity against competitors, website and citation consistency — genuinely requires tools, time and judgement, and is properly a paid service. Name it the **Full Local Visibility Review** and reference it only in the "Need a hand?" section, never as a locked or teased feature. Nothing on this page should feel like a trial that's been deliberately crippled. The free tool must be completely useful on its own.

**Landing page and hero copy update:**

`ANY BUSINESS ON GOOGLE`
**Foundation Scorecard**
Score the essentials on your Google listing out of 100 and see the three things quietly costing you customers.
`MOST LOCAL LISTINGS SCORE UNDER 50`

Hero headline stays **"Score your Google listing out of 100."** Sub-line becomes:
> Your Google listing is the first thing most customers see, and most are half-finished. This checks the essentials in about thirty seconds and tells you exactly what's missing.

### 2.2 The constraint that shapes everything

**Read this before writing any code, because getting it wrong means rebuilding.**

A full Google Business Profile audit requires the Google Business Profile API, which needs the *owner* to authenticate. We do not have that, and requiring it would destroy the sixty-second promise.

So the Scorecard must be built entirely on **publicly available data via the Google Places API** (Place Details). That's less than a full audit — but it is genuinely enough to produce a meaningful, honest score, because the things that are publicly visible are precisely the things a customer sees.

**Available and scoreable:** business name, categories, full address, phone, website URL, opening hours, special/holiday hours, photo count, rating, review count, review recency, whether reviews have owner replies, business description, price level, wheelchair/service attributes where present.

**Not available, and must not be claimed:** post frequency, product/service listings, messaging settings, Q&A content, insights and view counts.

**Rule: the page must never claim to audit anything it cannot see.** Copy says "we check what your customers can see," which is accurate, honest, and happens to be the more persuasive framing anyway.

### 2.3 User flow

1. Owner types their business name (and optionally a town, to disambiguate).
2. Autocomplete returns up to five candidate listings with addresses. They pick theirs.
3. A short scoring animation, roughly two seconds, showing what's being checked.
4. Score out of 100 with a band label, then the three biggest gaps ranked by impact, each with a fix.
5. Email gate to download the full report as a PDF or receive it by email. **The score itself is never gated** — gating the number would break the goodwill the tool exists to create.
6. Full report shows all scored categories, not just the top three.

### 2.4 Scoring rubric

Total 100. Weighted toward what actually shifts local visibility and customer choice.

| Category | Points | How it's scored |
|---|---|---|
| Review volume | 20 | 0 reviews = 0 · 1–9 = 5 · 10–24 = 10 · 25–49 = 15 · 50+ = 20 |
| Review recency | 15 | Most recent review: within 30 days = 15 · 90 days = 10 · 6 months = 5 · older = 0 |
| Rating | 10 | 4.5+ = 10 · 4.0–4.4 = 7 · 3.5–3.9 = 4 · below = 0 |
| Owner replies | 10 | Proportion of the 5 most recent reviews with a reply, scaled |
| Photos | 15 | 0 = 0 · 1–4 = 5 · 5–19 = 10 · 20+ = 15 |
| Opening hours | 10 | Present and complete = 10 · partial = 5 · absent = 0 |
| Website link | 10 | Present = 10 · absent = 0 |
| Description | 5 | Present and over 100 characters = 5 · shorter = 2 · absent = 0 |
| Categories | 5 | Primary plus at least one secondary = 5 · primary only = 3 · none = 0 |

**Bands:** 0–39 `NEEDS WORK` (Oxblood) · 40–69 `GETTING THERE` (Deep Brass) · 70–100 `IN GOOD SHAPE` (Bottle green).

**Two rules on presentation.** Never show a score above 95 — there's always something to improve, and a perfect score removes any reason to talk to us. And never present a low score as failure; the copy is always "here's what's missing," never "your listing is bad." An owner made to feel foolish doesn't come back.

### 2.5 Fix library

Each gap needs a heading, a one-line reason, and two or three steps. Written once, reused.

**Photos** — *Listings with recent photos get noticeably more clicks than those without.*
1. Open the Google Maps app, find your business, tap **Add photo**.
2. Add five: the front, the inside, your team, your work, your sign.
3. Add two or three more each month rather than twenty in one go.

**Review recency** — *Google weighs how recent your reviews are, not just how many.*
1. Ask every customer on the day, while it's fresh.
2. Use a review QR on the counter or the invoice.
3. A steady few a month beats a burst.

**Owner replies** — *Replies show the listing is looked after, and readers notice them.*
1. Reply to every review, good and bad.
2. Keep it short and specific.
3. Set aside ten minutes a week rather than checking daily.

**Opening hours** — *Wrong hours are the fastest route to a one-star review from someone who drove over.*
1. Check your standard hours are right.
2. Set special hours for bank holidays and Christmas now, not the week before.

**Website link** — *A listing with nowhere to click loses people who were ready to act.*
1. Add your website in **Edit profile**.
2. No website? Use your quote form or booking link instead.

**Description** — *It's free space to say what you do and where you do it.*
1. Write 150–200 words covering what you do, the areas you cover, and what you're known for.
2. Skip the sales language — plain description works better.

**Categories** — *Your primary category is one of the strongest signals Google has.*
1. Check the primary category is the most accurate one available.
2. Add secondary categories for anything else you genuinely do.

### 2.6 Mockup content

Score dial counting 0 → **41**, band label `GETTING THERE`. Beneath, three rows fading in:

> `NO PHOTOS IN 14 MONTHS` — worth 15 points
> `12 REVIEWS, NONE REPLIED TO` — worth 10 points
> `NO BANK HOLIDAY HOURS SET` — worth 4 points

Caption: `A REAL LISTING WE CHECKED`

### 2.7 Landing page entry

`ANY BUSINESS ON GOOGLE`
**Foundation Scorecard**
Score the essentials on your Google listing out of 100 and see the three things quietly costing you customers.
`MOST LOCAL LISTINGS SCORE UNDER 50`


### 2.8 Technical and edge cases

- Google Places API (Place Details + Autocomplete). Cache responses for 24 hours to control cost.
- **No listing found:** don't dead-end. "We couldn't find a listing under that name — which usually means there isn't one yet. That's worth fixing first; text us and we'll walk you through claiming it." That's a strong lead, not a failure.
- **Multiple matches:** always show the address alongside each option. Never auto-select.
- **API failure:** show a plain message and the text-us line. Never a stack trace, never a fabricated score.
- **Rate limiting:** cap at a sensible number of checks per IP per hour to prevent scraping.
- Store every run in the Scorecard Runs table whether or not an email is given.

---

## Part 3 — PRD: Review Reply Writer

### 3.1 Summary

Drafts a reply to a customer review in the owner's voice. Editable before use. The easiest build of the three and the one most likely to bring people back weekly.

### 3.2 User flow

1. Enter business name and business type.
2. Paste the review text. Select the star rating.
3. Choose a tone: **Warm** · **Brief** · **Formal**.
4. Optionally add context — "we did offer a refund," "this was during the flood."
5. Generate. Show the draft in an editable box.
6. **Copy reply** button, plus **Try another** for a different draft.
7. Email gate only on **Save my replies** — never on the first draft. Someone must be able to use this once, completely free, without giving anything.

### 3.3 Generation rules

These are guardrails, not style preferences. A tool that produces a reply which creates legal exposure for a business would be worse than no tool.

**Every generated reply must:**
- Stay under 80 words. Long replies read as defensive.
- Thank or acknowledge the reviewer within the first sentence.
- Sound like a person, not a brand. No "we value your feedback."
- Vary its opening. Never produce the same first line twice for one business.

**Every generated reply must not:**
- Invent any fact not present in the review or the owner's context — no claimed refunds, no invented staff names, no "as we discussed on the phone."
- Admit legal liability, fault for injury or damage, or breach of regulation. For anything touching injury, health, safety or legal threat, the tool acknowledges and moves the conversation offline, nothing further.
- Dispute the reviewer's account point by point in public.
- Offer compensation, discounts or refunds. That's the owner's call, never the tool's.
- Mention a competitor.

**For one and two-star reviews**, replies follow a fixed shape: acknowledge → one line of regret without admitting fault → an offline route ("give us a ring on X and we'll put it right").

**Always displayed above the draft**, in the utility face:
> `READ IT BEFORE YOU POST IT — THIS IS A STARTING POINT, NOT THE FINAL WORD`

### 3.4 Mockup content

Review card at top, one star:
> ★☆☆☆☆ **Danielle W.** — *"Waited three weeks for a part and had to keep chasing for updates. Work itself was fine but the communication was poor."*

Beneath, reply composing line by line:
> *"Thanks for being straight with us, Danielle — you're right, we should have kept you updated rather than leaving you to chase. Glad the work itself was up to scratch. We've changed how we handle parts delays because of this. Give us a ring on 01234 567890 if there's anything still outstanding."*

Caption: `FROM A HARD REVIEW TO A GOOD REPLY`

*This mockup is the most persuasive on the site — it shows a genuinely difficult situation handled well, which is exactly the moment an owner dreads.*

### 3.5 Landing page entry

`ANY BUSINESS WITH REVIEWS`
**Review Reply Writer**
Every review deserves an answer. Write a good one in about a minute, in your own words.
`REPLIED-TO REVIEWS BUILD MORE TRUST THAN RATINGS ALONE`


### 3.6 Repeat-visit mechanics

This is one of two tools designed to bring owners back. Three things make that happen:

- **Saved business profile.** Once the name, type and tone are stored, a return visit is paste-and-generate. Store locally, no account.
- **A weekly nudge**, opt-in at the email gate: *"Want a Monday reminder to clear your reviews? Ten minutes, once a week."* Plain text, one line, one link. No newsletter.
- **A visible streak**, understated: `12 REPLIES WRITTEN` in the utility face. Motivating without being a game.

### 3.7 Technical

- LLM API call, server-side so the key isn't exposed. Temperature moderate — replies should vary between generations.
- System prompt encodes §3.3 as hard constraints.
- Never store review text beyond the session unless the owner saves it.
- On API failure: honest message plus the text-us line. Never a fallback template — a generic reply posted under a real review is worse than nothing.

---

## Part 4 — PRD: Booking Link

### 4.1 Summary

A page where a customer picks a slot from the owner's stated availability and submits a request, ending the back-and-forth of arranging by text.

### 4.1a Practicality assessment — verdict: build it, with constraints

Assessed against the four questions that decide whether this belongs in a free toolkit.

**Setup effort for the owner: moderate — about two minutes, not sixty seconds.** Day toggles, hours, slot length, buffer and a notification address. That's more input than any other tool in the set. Mitigate it with sensible defaults doing most of the work: Monday–Friday pre-selected, 9–5 pre-filled, 60-minute slots, 15-minute buffer. A owner who changes nothing still gets a working link, and the flow shows a live preview updating as they go so the effort feels like progress rather than form-filling.

**Does it need an LLM? No.** This is date arithmetic and state handling — slot generation, availability encoding, request capture. Pure JavaScript. No AI anywhere, which makes it the most predictable and cheapest of the three to run.

**API requirements and running costs: near zero, provided one decision is made correctly.** Availability is encoded in the URL exactly as the quote form works, so there's no per-business database. Requests write to Baserow, which is free at this volume. The only real cost is owner notification, and here's the decision that matters: **email notification is effectively free; SMS notification is not.** UK SMS runs roughly 3–5p per message through a provider like Twilio, plus a number rental. At a few hundred requests a month that's small; at scale it's an open-ended bill attached to a free product with no revenue against it.

**Can it stay free at scale? Yes — with email-only notification in v1.** That constraint is what makes the maths work. SMS notification becomes part of the paid upgrade alongside calendar sync.

**The honest risk, stated plainly.** This is the only tool of the six where a failure damages the owner's actual business rather than merely disappointing them. If the quote form breaks, someone doesn't get a price. If this breaks — a stale slot, a missed notification, a timezone bug — a customer turns up to a locked door, or two customers turn up at once. That asymmetry is why the safeguards in §4.2 are non-negotiable rather than nice-to-have, and it's why this tool is third in the build order despite being conceptually the simplest.

**Recommendation: keep it.** The pain it addresses is real and universal, the build is genuinely straightforward without AI, and it costs nothing to run on email notifications. But it needs more care in the copy than anything else on the site, and it will generate more support questions than the other five combined. Budget for that.

### 4.2 The honesty constraint and double-booking safeguards

**Version one does not write to a live calendar.** No account, no OAuth, no two-minute setup can produce true real-time availability.

What it does is show the owner's *stated* availability, take a request, and notify the owner to confirm. That removes the back-and-forth, which is the actual pain — but it is **not** instant confirmation.

**Copy rules, treated as functional requirements rather than preferences:**

- The customer-facing button reads **Request this slot**. Never "Book now," never "Confirm booking."
- The confirmation reads: *"Request sent — [business] will confirm shortly."*
- The page carries a permanent line beneath the slot grid, utility face: `SLOTS SHOWN ARE USUAL AVAILABILITY — [BUSINESS] WILL CONFIRM YOUR TIME`
- Any wording implying a guaranteed booking is a **defect**, to be raised and fixed, not a wording debate.

**Double-booking safeguards — all four required:**

1. **Warn the owner at setup**, before they generate the link, in a Gold Leaf keyline panel: *"This shows the hours you've told us you're usually free — it doesn't check your calendar. Always confirm a request before you treat it as booked. If two people ask for the same slot, we'll tell you, and you decide."*
2. **Never mark a slot as taken on the strength of an unconfirmed request.** If a slot is requested twice, accept both and flag the clash prominently in the owner's notification. Better an owner resolves a clash than a genuine customer is silently turned away.
3. **Every notification carries the full picture** — name, number, slot, service, and whether that slot has been requested before — so the owner can confirm without opening anything.
4. **A one-line reminder in every notification:** *"Confirm with the customer before you treat this as booked."*

**The paid upgrade, named honestly in "Need a hand?":** live calendar sync (Google or Outlook), so slots reflect real availability and confirm instantly, plus SMS notification. That's a genuine engineering job with ongoing cost, and it should be presented as such rather than as a feature withheld to force an upgrade.

### 4.3 Setup flow (owner)

1. Business name and type.
2. Days they take bookings — day-of-week toggles.
3. Hours per day, with a "same every day" shortcut.
4. Typical slot length: 30 / 45 / 60 / 90 minutes, or custom.
5. Buffer between slots: none / 15 / 30 minutes. Default 15 — most owners under-allow.
6. Where requests go: mobile for text, or email.
7. Optional: two or three service types with different lengths.
8. Generate. Returns a link, a QR, and a preview.

### 4.4 Customer flow

1. Open link. Business name at the top.
2. Week strip showing available slots, defaulting to the current week, with a forward arrow.
3. Tap a slot.
4. Enter name, mobile, and what it's for.
5. **Request this slot.**
6. Confirmation: *"Request sent — [business] will confirm shortly."*

### 4.5 Rules

- Never show slots in the past, or within the next two hours.
- Show a fortnight ahead maximum. Further out and requests become unreliable.
- If a slot is requested twice before confirmation, accept both and flag it to the owner. Better an owner resolves a clash than a customer is silently refused.
- Owner notification, by text or email, must contain everything needed to confirm without opening anything: name, number, slot, service.
- Mobile-first without compromise. Nearly every customer will open this on a phone.

### 4.6 Mockup content

Week strip, three days visible:

> **Tue 12** · 9:00 · 11:30 · 2:00
> **Wed 13** · 10:00 · 1:30
> **Thu 14** · 9:30 · 12:00 · 3:00

`Wed 13, 10:00` taps and fills Gold Leaf. Line appears beneath:
> *Request sent — Ashford Motors will confirm shortly.*

Caption: `WHAT YOUR CUSTOMER SEES`

### 4.7 Landing page entry

`TRADES · CLINICS · ANYONE WITH A DIARY`
**Booking Link**
One link that ends the back-and-forth. They pick a slot, you confirm, done.
`FEWER CALLS · FEWER MESSAGES`


### 4.8 Technical

- Availability encoded in the URL, as with the quote form, so no per-business database is needed.
- Requests write to a Baserow table and trigger the owner notification.
- Timezone: Europe/London throughout, with British Summer Time handled correctly. A tool that shows the wrong hour twice a year is a tool nobody trusts.

---

## Part 5 — Parked for later

Six tools is the launch set: Instant Quote Form, Google Review QR, Foundation Scorecard, Review Reply Writer, Booking Link, Instant Valuation. Nothing else gets built until those six are live, polished and generating leads.

**Parked, not abandoned.** The wider tool ideas — the estate agent toolset (Vendor Report Card, What Sold Near You, Landlord Yield Calculator, Viewing Feedback Collector), the Local Rank Tracker, the Finance Illustration Tool and the rest — remain on the list for a later phase. Revisit once there's real usage data showing which of the six actually get used, because that will be better evidence for what to build next than any amount of guessing now.

**One consequence for the agent:** build nothing speculative for future tools. No plugin architecture, no category taxonomy, no "tools framework." Six hard-coded pages sharing a design system is the right amount of structure for six tools, and it's faster to change later than an abstraction built for tools that may never exist.

---

## Part 6 — Build sequencing

Ordered by value returned per day of build.

| Order | Item | Why here |
|---|---|---|
| 1 | Review Reply Writer | Fastest build, drives repeat visits, no external API risk |
| 2 | Foundation Scorecard | Highest strategic value; needs Places API access set up first |
| 3 | Booking Link | Most build effort, and the honesty constraints need care in copy |
| 4 | Mockups, all six pages | Do together for visual consistency, not tool by tool |
| 5 | `/about` page | Last — it serves the highest-intent visitors, who are the fewest |

**Before building any of the three new tools, produce a short rationale** covering the Places API constraint in §2.2, the reply guardrails in §3.3, and the booking constraints in §4.2, confirming each is understood. Those three are where this build is most likely to go wrong.
