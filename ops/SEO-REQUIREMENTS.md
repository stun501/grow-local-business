# Grow Local — SEO Requirements (Definition of Done)

Use this checklist to measure SEO work. Status: Complete / Partial / Gap.

Brand constraints still apply: Grow Local only, no Think Beyond, no high-street framing, no em dashes in customer copy, Shopfront design, no deploy until Craig asks.

## A. Technical SEO

| ID | Requirement | Status |
|----|-------------|--------|
| T1 | Unique `<title>` on every indexable page | Complete |
| T2 | Unique meta description on every indexable page | Complete |
| T3 | Absolute canonical URL on every indexable page | Complete |
| T4 | Open Graph + Twitter card tags | Complete |
| T5 | `robots.txt` allows indexable pages; points to sitemap; soft-blocks legacy/utility | Complete |
| T6 | `sitemap.xml` lists indexable URLs (home, about, book, 6 tools, guides, flyer/qr) | Complete |
| T7 | `/TOOL/build/` and `/TOOL/done/` are `noindex,follow` | Complete |
| T8 | Trailing-slash consistency via redirects (netlify.toml) | Complete |
| T9 | Legacy `/instant-quote-form.html` force-redirects to `/quote/` | Complete |
| T10 | Valid HTML lang=`en-GB`; viewport present | Complete |
| T11 | Favicon / monogram present | Complete |
| T12 | No broken internal primary CTAs to build paths | Complete |

## B. On-page SEO

| ID | Requirement | Status |
|----|-------------|--------|
| O1 | One clear H1 matching search intent per indexable page | Complete |
| O2 | Logical H2/H3 structure | Complete |
| O3 | Primary theme in title + H1 + first paragraph (UK English) | Complete |
| O4 | Internal links: hub + next-step tool + About/Book/Guides where relevant | Complete |
| O5 | Image `alt` text on meaningful images | Complete |
| O6 | Scorecard disclaimer footer on scorecard surfaces (not flyer) | Complete |
| O7 | Thin product pages have teaching copy | Complete |

## C. Content SEO

| ID | Requirement | Status |
|----|-------------|--------|
| C1 | At least 4 indexable guide pages | Complete |
| C2 | Resources use Shopfront shell + tool CTA | Complete |
| C3 | Resources hub `/resources/` | Complete |
| C4 | Landing + About reinforce established local-business positioning | Complete |
| C5 | Scorecard product hero: H1 “doing more work…” + subhead “could be costing you… Check yours in 30 seconds.” | Complete |

## D. Local SEO

| ID | Requirement | Status |
|----|-------------|--------|
| L1 | Consistent contact: phone, email, domain (no postal address on website) | Complete |
| L2 | Organization schema with phone + email (no street address on site) | Complete |
| L3 | Copy targets UK local businesses with physical operations | Complete |
| L4 | Service-type language present | Complete |
| L5 | Footer contact consistent on major pages | Partial (home/about strong; tool footers lighter by design) |

## E. Authority / E-E-A-T

| ID | Requirement | Status |
|----|-------------|--------|
| A1 | About page explains who Craig/Grow Local are | Complete |
| A2 | Trust signals; no fake reviews/testimonials | Complete |
| A3 | Clear path to Book a free chat | Complete |
| A4 | No fabricated awards/stats/`sameAs` | Complete |

## F. AI SEO / answer-engine readiness

| ID | Requirement | Status |
|----|-------------|--------|
| AI1 | `llms.txt` present | Complete |
| AI2 | Clear entity language | Complete |
| AI3 | FAQ + FAQPage schema on home + Scorecard | Complete |
| AI4 | Tool pages state honest scope | Complete |

## G. Momentum Framework (Marketing Hacks)

| ID | Requirement | Status |
|----|-------------|--------|
| M1 | Done pages: celebrate → why-now → ONE next tool → CTA | Complete |
| M2 | No multi-tool primary next step | Complete |
| M3 | Chain: Review→Scorecard→Reply→Booking; Quote→Scorecard; Valuation→Scorecard; Booking→Quote | Complete |
| M4 | Related tools demoted vs one next step | Complete |

## H. Risk / quality gates

| ID | Requirement | Status |
|----|-------------|--------|
| R1 | No new heavy JS frameworks | Complete |
| R2 | No em dashes / Think Beyond / high street in new copy | Complete |
| R3 | Unlock UX unchanged (no emailing reports to users) | Complete |
| R4 | Do not deploy until Craig asks | Complete (held) |

## Operator tasks outside the codebase (flag, do not fake)

- [x] Create/optimise Google Business Profile for Grow Local (Craig confirmed set up; address stays on GBP only, not the website)
- [ ] Submit sitemap in Google Search Console / Bing Webmaster (**after deploy**)
- [ ] Set OpenRouter spend **alert** (not a hard cap) — cost ops, not SEO ranking
- [ ] Add real social profile URLs to schema `sameAs` only when they exist
- [ ] Confirm OG share image works in production after deploy (`assets/grow-local-logo.png`)

## Gaps / notes

1. **Postal address:** Do not publish on the website, About, footers, `llms.txt`, or JSON-LD. GBP only.
2. **Tool footers (L5 Partial):** Product pages keep a light footer; phone/email on About + Organization schema.
3. **sameAs:** intentionally omitted until real social URLs exist (do not invent).

## Phase 1 brand SEO (executed)

Brand defence pack for competing “Grow Local” SERPs:

- Homepage title/description + FAQ disambiguation + entity language in hero/who-behind
- About H1 + “Official Grow Local” lookalike section
- Resource: `/resources/what-is-grow-local/`
- Organization schema: `alternateName`, slogan, knowsAbout, stronger description
- Distinctive Resources meta (includes Grow Local + domain) to reduce snippet confusion
- Sitemap + `llms.txt` updated

**Operator (manual):** Request indexing for `/`, `/about/`, `/resources/`, `/resources/what-is-grow-local/`; keep GBP website = growlocalbusiness.co.uk; create consistent social profiles when ready.
