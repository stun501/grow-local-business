# Grow Local — Design & Copy

## Design system: Shopfront

**Authoritative CSS:** `assets/tokens-shopfront.css` + `assets/product-shell.css`  
**Rationale:** `design-research/growlocal-design-direction.md`, `design-research/SHOPFRONT-RATIONALE.md`

### Palette

| Token | Hex | Role |
|-------|-----|------|
| Bottle | `#12291F` | Hero / footer fascia |
| Bone | `#F2EFE6` | Page paper (never pure white) |
| Bone warm | `#EBE6DA` | Warm panels / capture cards |
| Gold | `#C6A15B` | Rules, eyebrows (sparing) |
| Brass | `#A8813C` | Primary CTA fill |
| Ink | `#0E1613` | Body on bone |
| Slate | `#5C6B62` | Secondary text |
| Oxblood | `#7A2E2E` | Errors |

### Typography

| Role | Family |
|------|--------|
| Display / headlines | Fraunces |
| Body | Archivo |
| Utility / eyebrows | Archivo Narrow (small caps / tracking) |

Do not use Inter, Roboto, Poppins, Montserrat, or system-ui as the design voice.

### Visual rules

- **No gradients**
- **No drop shadows** (rare inset selection indicators on build pages only if already patterned)
- **No pure `#FFFFFF`** — use Bone
- **No stock photography** as product truth; prefer outcome mockups that read as mockups
- Left-aligned marketing layouts; one job per section
- CTAs: Brass fill / outline buttons from product shell
- Capture cards: Bone-warm panel + Gold border (existing pattern)

### Assets

- `assets/monogram-gl.svg`, `wordmark-ink.svg`, `wordmark-bone.svg`
- Signatures: `signature-ink.png` (on Bone), `signature-bone.png` (on Bottle)
- Hub QR: `assets/hub-qr.svg` / `.png`

## Brand voice

From `growlocal-copy-and-build-spec-v2.md`:

- Warm, practical, owner-to-owner
- UK English
- Specific over vague
- Text first (`07379 028832`), email second
- Tools are free; no sales pitch on the tool itself

### Forbidden customer-facing language

| Avoid | Prefer |
|-------|--------|
| Think Beyond / Think Beyond Automation | Grow Local |
| high street / high-street | local business / established local businesses |
| automation, workflow, AI, solution | plain benefit language |
| Em dash (—) | Semicolon, comma, or rewrite |
| “Email me the full report” / report delivery CTAs | Unlock on-page |
| Nudge / remind me checkboxes | Single GDPR consent only |

### Audience framing

Serve **established local businesses with a physical operation** — workshops, yards, units, offices, home-based trades. Examples: kitchen fitter, accountancy practice, dental surgery. Do not imply micro-retail, newsagents, or market stalls.

## Landing page composition

- Brand is a hero-level signal (not only nav)
- First viewport: brand, one headline, short support, CTA group, one dominant visual idea
- Avoid dashboard clutter, pill clusters, stat strips in the hero
- Tool cards: audience (gold utility) + title + benefit + outcome

## Product page template

Typical sections:

1. Sticky bar (Grow Local + back)
2. Hero: problem + promise + CTA to `/build/`
3. How it works / teaching copy (from v2 spec)
4. Mockup showing **outcome**, not a full UI clone
5. Need a hand? (aligned to page width — use shell wrap)
6. Related tools + footer

CTA labels should land on `/TOOL/build/`, not a hidden in-page generator.

## Mockup rules (companion doc)

- Show the outcome the owner cares about
- One interaction max in the mock
- Visibly a mockup (device frame / fascia), not a fake live app
- No stock photos pretending to be the product

## Flyer / print copy

**Flyer wins:** `growlocal-flyer-spec.md`

- A5 double-sided; trim 148×210mm; 4mm bleed
- Arm A: Scorecard hook → QR to scorecard
- Arm B: Six-tools / hub hook → QR to hub
- No phone number on the printed flyer
- Front must work alone
- Hub index: `flyer/index.html`

## Naming

| Correct | Incorrect |
|---------|-----------|
| Google Listing Scorecard | Foundation Scorecard (legacy) |
| Instant Quote Form | Instant quote widget |
| Grow Local | Think Beyond Automation (customer UI) |

## Contact surfaces

- Show: phone (text-first), email, domain
- **Do not show** street / postal address on any customer page (including About). Address belongs on Google Business Profile only.

## Scorecard copy lock (current)

- Product H1: Your Google listing is doing more work than your website.
- Product subhead: Your Google listing could be costing you customers. Most score under 50. Check yours in 30 seconds.
- Landing benefit: Your Google listing is often your first impression and how you attract customers, before they visit your website. See what's costing you customers, and what to fix.
- Flyer Scorecard sub-line: Customers judge your business on Google before they visit your website. Check your score.

## Guides content

Hub `/guides/` plus:

1. google-listing-checklist → Scorecard
2. more-google-reviews → Review QR
3. quote-form-for-trades → Quote
4. booking-without-back-and-forth → Booking
