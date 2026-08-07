#!/usr/bin/env python3
"""One-shot SEO head patcher for Grow Local static HTML. Safe to re-run."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://www.growlocalbusiness.co.uk"
OG_IMAGE = f"{SITE}/assets/grow-local-logo.png"

ORG_JSON = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "name": "Grow Local",
    "url": SITE + "/",
    "email": "hello@growlocalbusiness.co.uk",
    "telephone": "+447379028832",
    "description": "A growth agency for local business. Free practical tools for established local businesses with a physical operation.",
    "areaServed": "GB",
}

INDEXABLE = {
    "index.html": {
        "path": "/",
        "title": "Grow Local · Free tools for local businesses",
        "desc": "Six free tools for established local businesses. Score your Google listing, capture quotes, collect reviews, and book appointments. No sign-up.",
        "type": "website",
        "app": None,
    },
    "about/index.html": {
        "path": "/about/",
        "title": "About Grow Local · Growth agency for local business",
        "desc": "Grow Local helps established local businesses fix what's holding them back; more customers, a tidier week, practical systems that fit how you work.",
        "type": "website",
        "app": None,
    },
    "book/index.html": {
        "path": "/book/",
        "title": "Book a free 30-minute chat · Grow Local",
        "desc": "Book a free 30-minute chat with Grow Local. No charge, no pressure. Talk through what's costing you customers or time.",
        "type": "website",
        "app": None,
    },
    "scorecard/index.html": {
        "path": "/scorecard/",
        "title": "Google Listing Scorecard · Grow Local",
        "desc": "Your Google listing could be costing you customers. Most score under 50. Check yours in 30 seconds. Free Google Listing Scorecard from Grow Local.",
        "type": "website",
        "app": "Google Listing Scorecard",
    },
    "quote/index.html": {
        "path": "/quote/",
        "title": "Instant Quote Form · Grow Local",
        "desc": "Catch them before they ring your competitor. Build a quote form with your prices in about a minute. Free for garages, trades and salons.",
        "type": "website",
        "app": "Instant Quote Form",
    },
    "review/index.html": {
        "path": "/review/",
        "title": "Google Review QR · Grow Local",
        "desc": "Create a QR code that sends happy customers straight to your Google review box. Free, ready in about a minute.",
        "type": "website",
        "app": "Google Review QR",
    },
    "reply/index.html": {
        "path": "/reply/",
        "title": "Review Reply Writer · Grow Local",
        "desc": "Every review deserves an answer. Paste it in, pick a tone, and get a reply you can actually send. Free, no sign-up.",
        "type": "website",
        "app": "Review Reply Writer",
    },
    "booking/index.html": {
        "path": "/booking/",
        "title": "Booking Link · Grow Local",
        "desc": "One link that ends the back-and-forth. Customers pick a slot from your usual hours, you confirm. Free, no sign-up.",
        "type": "website",
        "app": "Booking Link",
    },
    "valuation/index.html": {
        "path": "/valuation/",
        "title": "Instant Valuation · Grow Local",
        "desc": "Give sellers a rough guide to their home's value and capture a named lead every time it's used. Free for estate agents.",
        "type": "website",
        "app": "Instant Valuation",
    },
    "flyer/index.html": {
        "path": "/flyer/",
        "title": "Print flyers · Grow Local",
        "desc": "A5 print files for Grow Local cold-outreach flyers. Open Arm A or Arm B, then print or save as PDF for your printer.",
        "type": "website",
        "app": None,
    },
    "qr/index.html": {
        "path": "/qr/",
        "title": "Grow Local · Hub QR code",
        "desc": "Downloadable QR code linking to the Grow Local free tools landing page.",
        "type": "website",
        "app": None,
    },
    "resources/index.html": {
        "path": "/resources/",
        "title": "Resources for local businesses · Grow Local",
        "desc": "Practical resources for established local businesses; Google listings, reviews, quote forms and booking links. Free tools included.",
        "type": "website",
        "app": None,
    },
    "resources/google-listing-checklist/index.html": {
        "path": "/resources/google-listing-checklist/",
        "title": "Google listing checklist for local businesses · Grow Local",
        "desc": "A practical checklist for your Google Business Profile. See what customers notice first, then score your listing free.",
        "type": "article",
        "app": None,
    },
    "resources/more-google-reviews/index.html": {
        "path": "/resources/more-google-reviews/",
        "title": "How local businesses get more Google reviews · Grow Local",
        "desc": "Simple ways to ask for reviews at the right moment. Build a free Google Review QR in about a minute.",
        "type": "article",
        "app": None,
    },
    "resources/quote-form-for-trades/index.html": {
        "path": "/resources/quote-form-for-trades/",
        "title": "Quote forms for trades and salons · Grow Local",
        "desc": "Why after-hours browsers leave without asking for a price, and how a simple quote form captures them.",
        "type": "article",
        "app": None,
    },
    "resources/booking-without-back-and-forth/index.html": {
        "path": "/resources/booking-without-back-and-forth/",
        "title": "Booking without the back-and-forth · Grow Local",
        "desc": "Cut the diary ping-pong. Let customers pick a slot from your usual hours with a free booking link.",
        "type": "article",
        "app": None,
    },
}

NOINDEX_GLOBS = [
    "*/build/index.html",
    "*/done/index.html",
    "booking/request.html",
]


def dumps_json(obj) -> str:
    import json

    return json.dumps(obj, ensure_ascii=True, indent=None, separators=(",", ":"))


def seo_block(meta: dict, include_org: bool) -> str:
    url = SITE + meta["path"]
    title = meta["title"]
    desc = meta["desc"]
    og_type = meta["type"]
    lines = [
        f'<link rel="canonical" href="{url}">',
        f'<meta property="og:title" content="{esc(title)}">',
        f'<meta property="og:description" content="{esc(desc)}">',
        f'<meta property="og:url" content="{url}">',
        f'<meta property="og:type" content="{og_type}">',
        f'<meta property="og:image" content="{OG_IMAGE}">',
        f'<meta property="og:site_name" content="Grow Local">',
        f'<meta property="og:locale" content="en_GB">',
        f'<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:title" content="{esc(title)}">',
        f'<meta name="twitter:description" content="{esc(desc)}">',
        f'<meta name="twitter:image" content="{OG_IMAGE}">',
        '<!-- gl-seo:start -->',
    ]
    # marker placed after tags; we rebuild cleanly below
    scripts = []
    if include_org:
        scripts.append(
            '<script type="application/ld+json">' + dumps_json(ORG_JSON) + "</script>"
        )
        if meta["path"] == "/":
            website = {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Grow Local",
                "url": SITE + "/",
                "description": desc,
                "publisher": {"@type": "Organization", "name": "Grow Local"},
            }
            scripts.append(
                '<script type="application/ld+json">' + dumps_json(website) + "</script>"
            )
    if meta.get("app"):
        app = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": meta["app"],
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "offers": {"@type": "Offer", "price": "0", "priceCurrency": "GBP"},
            "url": url,
            "provider": {"@type": "Organization", "name": "Grow Local"},
        }
        scripts.append(
            '<script type="application/ld+json">' + dumps_json(app) + "</script>"
        )
    body = "\n".join(
        [
            f'<link rel="canonical" href="{url}">',
            f'<meta property="og:title" content="{esc(title)}">',
            f'<meta property="og:description" content="{esc(desc)}">',
            f'<meta property="og:url" content="{url}">',
            f'<meta property="og:type" content="{og_type}">',
            f'<meta property="og:image" content="{OG_IMAGE}">',
            f'<meta property="og:site_name" content="Grow Local">',
            f'<meta property="og:locale" content="en_GB">',
            f'<meta name="twitter:card" content="summary_large_image">',
            f'<meta name="twitter:title" content="{esc(title)}">',
            f'<meta name="twitter:description" content="{esc(desc)}">',
            f'<meta name="twitter:image" content="{OG_IMAGE}">',
        ]
        + scripts
    )
    return "<!-- gl-seo:start -->\n" + body + "\n<!-- gl-seo:end -->\n"


def esc(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace('"', "&quot;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def upsert_meta_description(html: str, desc: str) -> str:
    tag = f'<meta name="description" content="{esc(desc)}">'
    if re.search(r'<meta\s+name=["\']description["\']', html, re.I):
        return re.sub(
            r'<meta\s+name=["\']description["\'][^>]*>',
            tag,
            html,
            count=1,
            flags=re.I,
        )
    return re.sub(r"(<title>[^<]*</title>)", r"\1\n" + tag, html, count=1, flags=re.I)


def upsert_title(html: str, title: str) -> str:
    if re.search(r"<title>[^<]*</title>", html, re.I):
        return re.sub(
            r"<title>[^<]*</title>",
            f"<title>{esc(title)}</title>",
            html,
            count=1,
            flags=re.I,
        )
    return html


def strip_old_seo(html: str) -> str:
    html = re.sub(
        r"<!-- gl-seo:start -->.*?<!-- gl-seo:end -->\s*",
        "",
        html,
        flags=re.I | re.S,
    )
    # remove prior loose canonical/og/twitter we may have added without markers
    html = re.sub(r'\n?\s*<link rel="canonical"[^>]*>', "", html, flags=re.I)
    html = re.sub(r'\n?\s*<meta property="og:[^"]+"[^>]*>', "", html, flags=re.I)
    html = re.sub(r'\n?\s*<meta name="twitter:[^"]+"[^>]*>', "", html, flags=re.I)
    return html


def insert_before_head_close(html: str, block: str) -> str:
    if re.search(r"</head>", html, re.I):
        return re.sub(r"</head>", block + "</head>", html, count=1, flags=re.I)
    return html


def ensure_noindex(html: str) -> str:
    if re.search(r'name=["\']robots["\']', html, re.I):
        return re.sub(
            r'<meta\s+name=["\']robots["\'][^>]*>',
            '<meta name="robots" content="noindex,follow">',
            html,
            count=1,
            flags=re.I,
        )
    return insert_before_head_close(
        html, '<meta name="robots" content="noindex,follow">\n'
    )


def patch_indexable(rel: str, meta: dict) -> None:
    path = ROOT / rel
    if not path.exists():
        print("SKIP missing", rel)
        return
    html = path.read_text(encoding="utf-8")
    html = strip_old_seo(html)
    html = upsert_title(html, meta["title"])
    html = upsert_meta_description(html, meta["desc"])
    include_org = meta["path"] in ("/", "/about/")
    block = seo_block(meta, include_org=include_org)
    html = insert_before_head_close(html, block)
    path.write_text(html, encoding="utf-8")
    print("OK indexable", rel)


def patch_noindex() -> None:
    files = []
    for p in ROOT.rglob("index.html"):
        rel = p.relative_to(ROOT).as_posix()
        if "/build/" in rel or "/done/" in rel:
            files.append(p)
    req = ROOT / "booking" / "request.html"
    if req.exists():
        files.append(req)
    for p in files:
        html = p.read_text(encoding="utf-8")
        html = ensure_noindex(html)
        p.write_text(html, encoding="utf-8")
        print("OK noindex", p.relative_to(ROOT).as_posix())


def main() -> None:
    for rel, meta in INDEXABLE.items():
        patch_indexable(rel, meta)
    patch_noindex()


if __name__ == "__main__":
    main()
