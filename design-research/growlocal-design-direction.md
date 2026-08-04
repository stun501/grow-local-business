# GrowLocal — Premium Design Direction

**A brief for the AI agent. Follow this exactly. Every colour, typeface and layout decision below is deliberate — do not substitute defaults.**

---

## 0. What's wrong with the current work (context, so you don't repeat it)

The existing landing page and flyer are competent but read as templated. The specific tells:

- **Gradient wash backgrounds.** Soft green-to-white gradients are the single strongest "made in a builder" signal. Premium work uses flat, confident colour, or paper-like texture — never an ambient wash.
- **Saturated kelly-green CTA.** Bright green reads discount, eco-budget, or charity. It is the wrong register for a £25k-feeling brand.
- **Generic stock photography.** The smiling man holding a drill is the most damaging element on the page. Stock humans destroy premium perception instantly, because the viewer has seen that exact photograph elsewhere.
- **Centre-everything layout.** Centred headline, centred sub, centred image, then a left-aligned list — no consistent alignment logic, and centred-by-default reads as unconsidered.
- **A generic ascending-arrow logo mark.** "Bars going up and to the right" is the most predictable possible identity for a growth brand.
- **Three competing headlines** on the flyer before the reader reaches the QR.
- **Drop shadows on rounded white cards.** A 2015 web convention that now signals template.
- **Weak hierarchy in the contact details** — light grey 8pt type that nobody will read.

---

## 1. Design thesis

GrowLocal serves the British high street: garages, salons, dental practices, estate agents, restaurants. The design should therefore borrow from the visual world those businesses physically inhabit — **traditional British shopfront livery**: deep bottle-green fascias, signwritten gold lettering, hairline gold rules, painted-glass numerals, enamel trade signage.

This is the core idea. It is grounded in the subject rather than in generic SaaS convention, it lets us keep green (so the GrowLocal name still resonates) while making it *deep and expensive* rather than bright and cheap, and it reads as heritage and craft — which is exactly the register that earns trust from an owner who has been pitched a hundred times.

**Tone: signwritten, not startup. Considered, quiet, confident.**

---

## 2. Colour palette

### Primary direction — "Shopfront"

| Role | Name | Hex | Use |
|---|---|---|---|
| Base / ground | Bottle | `#12291F` | Flyer background, landing page hero and footer. A deep, near-black green. |
| Paper | Bone | `#F2EFE6` | Body backgrounds, reversed-out panels, flyer QR field. Warm, slightly aged — never pure white. |
| Accent | Gold Leaf | `#C6A15B` | Hairline rules, eyebrow labels, the logotype flourish, key numerals. **Used sparingly — this is the luxury signal, and its power comes entirely from restraint.** |
| Ink | Ink | `#0E1613` | All body copy set on Bone. |
| Secondary text | Slate Green | `#5C6B62` | Captions, supporting copy, form hints. |
| Action | Deep Brass | `#A8813C` | The single CTA. Solid fill, Bone text. |

**Hard rules:**
- No gradients anywhere. None. Flat fields only.
- Gold never fills a large area — rules, small caps, and fine detail only. If gold occupies more than roughly 5% of the composition, it stops reading as gold leaf and starts reading as cheap.
- Pure white (`#FFFFFF`) is banned. Bone replaces it everywhere.
- No drop shadows. Separate elements with hairline rules (`0.5px`, Gold Leaf at 40% opacity) or by changing the background field.

### Alternative direction A — "Enamel"
If the client wants to move away from green entirely: Ink Navy `#131C2B` base, Bone `#F2EFE6` paper, Oxblood `#7A2E2E` accent, Brass `#B8934F` detail. Reads like vintage enamel trade signage. Slightly more formal, better suited if estate agents and dental practices become the primary market.

### Alternative direction B — "Workshop"
Graphite `#1F2124` base, Chalk `#EDEAE4` paper, Signal Copper `#B4653A` accent. More industrial, leans into garages and trades specifically. Warmer and less formal than the other two.

**Default to "Shopfront" unless instructed otherwise.**

---

## 3. Typography

Three roles. The pairing is the point — do not use one family for everything, and do not reach for Inter, Poppins, Montserrat or Open Sans.

| Role | Licensed (preferred) | Free equivalent (Google Fonts) | Treatment |
|---|---|---|---|
| Display | GT Sectra Fine, or Canela | **Fraunces** (use optical size axis; `wonk` off, `soft` low) | Headlines only. Tight tracking (`-0.02em`), generous leading (1.05–1.15). Large sizes — a display face set small is wasted. |
| Body | Söhne, or Untitled Sans | **Archivo** | Body copy, buttons, form fields. Weight 400 for prose, 600 for buttons. Never bolder than 600. |
| Utility | Söhne Schmal | **Archivo Narrow** | Eyebrows, labels, section markers. ALL CAPS, `0.16em` letter-spacing, 11px, Gold Leaf. This is the signwriting voice — it does a lot of the heritage work. |

**Type scale** (landing page, desktop): 64 / 40 / 28 / 20 / 16 / 13 / 11. Mobile: 40 / 30 / 22 / 18 / 16 / 13 / 11.

The display face carries the personality. The utility face carries the credibility. The body face should be invisible.

---

## 4. Identity

**Retire the ascending-arrow icon mark.**

Replace with a **wordmark-led identity**: "GROW LOCAL" set in the display serif, with a hairline Gold Leaf rule directly beneath the full width of the word — echoing a painted fascia board and its gold underline. That rule becomes the recurring brand device across both the flyer and the site.

If a standalone mark is required for favicons and small applications, use a **signwritten monogram**: an interlocking `GL` in the display serif, in Gold Leaf on Bottle, inside a fine rectangular keyline. Restrained, engraved, plate-like. No icons, no arrows, no leaves, no abstract swooshes.

**Signature element (the thing this brand is remembered by):** the *fascia band* — a full-bleed Bottle-green horizontal band with Gold Leaf hairline rules top and bottom, containing signwritten-style display type. It appears once on the flyer (as the header) and twice on the landing page (hero and footer). It is the shopfront, abstracted. Use it exactly this many times and no more.

---

## 5. The flyer — specification

**Format:** A6, portrait, printed 4-up on A4 and cut. Design at A6 with 3mm bleed.

**Structure, top to bottom:**

1. **Fascia band** (upper third, full bleed): Bottle green. Gold Leaf hairline rules top and bottom. GrowLocal wordmark centred in Bone, with the gold underline rule. Beneath it, in the utility face, small caps Gold Leaf: `FREE TOOLS · REAL GROWTH · NO CATCH`.

2. **The hook** (Bone field): one headline only. Set large in the display serif, Ink, left-aligned with a generous left margin. **Cut the duplicate headline** — "Free Tools to Help Grow Local Businesses" and "Catch the customers who look you up but never call" are currently fighting each other. Keep only the second; it is the stronger line and it earns its place.

3. **The action line**, utility face, Gold Leaf, small caps: `SCAN NOW — SEE IT WORKING BEFORE YOU WALK AWAY`

4. **The QR**, presented as a signwritten panel: QR in Ink on a Bone field, inside a fine Gold Leaf keyline box. No rounded corners, no shadow. Minimum 32mm square for reliable scanning. Beneath it, hairline rule.

5. **Contact block** (bottom, Bottle-green band): Bone type at 11px, properly legible — not 8pt grey. Name, email, phone on one line separated by Gold Leaf middots. `from Think Beyond Automation` in the utility face beneath.

**Balance:** the current flyer's bottom half is empty, which reads as unfinished rather than minimal. Either extend the lower green band to close the composition, or reduce the format so the content fills it. Whitespace must look allocated, not left over.

---

## 6. The landing page — specification

**Kill the stock photograph.** It is the single highest-impact change on the page. Replace it with one of these, in order of preference:

1. **The product itself** — a clean, straight-on render of a phone displaying the live quote form. Show the thing working. This is more persuasive than any photograph of a person, and it is free to produce.
2. **Type-led hero, no image at all** — a large display headline on the Bottle-green fascia, with the gold rule and nothing else. Confident, and confidence reads as expensive.
3. **Commissioned documentary photography** of actual local businesses — only if real photography is available. Never stock.

**Hero:** full-bleed Bottle green. Wordmark top-left (not centred). Headline left-aligned in the display serif, Bone, maximum 40–64px, two lines maximum. One line of supporting copy in Slate-tinted Bone. One CTA in Deep Brass. The phone render sits right, overlapping the fascia band's lower rule slightly — that overlap is the one moment of visual tension on the page and it is worth having.

**Tool list:** keep the existing left-aligned editorial list structure — it is the strongest thing in the current design. Refine it:
- Separate rows with Gold Leaf hairline rules at 40% opacity, not solid grey.
- Eyebrow labels (`GARAGES & TRADES`, `ALL BUSINESSES`, `ESTATE AGENTS`) in the utility face, Gold Leaf, small caps, wide tracking.
- Tool names in the display serif, not the body sans — this is where the serif earns its keep at smaller sizes.
- Replace the small circular arrow buttons with a plain Gold Leaf arrow glyph that translates 4px right on hover. No circles, no borders.
- Whole row is the click target, with a subtle Bone-to-warmer-Bone background shift on hover.

**Alignment discipline:** pick left-aligned and hold it. The current page centres the hero then left-aligns the list, which is the inconsistency that makes it feel unresolved.

**Motion:** one orchestrated page-load sequence only — the gold rule under the wordmark draws left-to-right over 600ms, then the headline fades up 8px. Nothing else animates on load. Hover states are 150ms. Respect `prefers-reduced-motion` throughout.

**Quality floor (non-negotiable):** fully responsive to 360px, visible keyboard focus states in Gold Leaf, WCAG AA contrast on all text, no layout shift, fonts preloaded.

---

## 7. Copy adjustments

- Header: **"Grow your business. Free."** — or keep "Catch the customers who look you up but never call" as the flyer's single hook.
- Remove every duplicated headline. One message per view.
- Tagline: **"Free tools. Real growth. No catch."** — set in the utility face as small caps, where it works as a signwritten strapline rather than a sentence.
- Sentence case throughout body copy. Small caps reserved for the utility face only.

---

## 8. Deliverables

1. Landing page as a single responsive HTML file, following this direction exactly.
2. Flyer as a print-ready A6 PDF with 3mm bleed, plus a 4-up A4 imposition with crop marks.
3. Wordmark and monogram as SVG, in Bone-on-Bottle and Ink-on-Bone versions.
4. A short design-token file (CSS custom properties) so the palette and type scale stay consistent across future tools.

**Before building, produce a one-page rationale showing the palette, type pairing and hero layout, and confirm it against this brief. If any element resolves to something you would produce for any generic small-business brand, revise it and state what you changed and why.**
