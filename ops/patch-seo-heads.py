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
    "alternateName": ["Grow Local Business"],
    "legalName": "Grow Local",
    "url": SITE + "/",
    "email": "hello@growlocalbusiness.co.uk",
    "telephone": "+447379028832",
    "description": "Grow Local is a UK growth agency for established local businesses. Official site: growlocalbusiness.co.uk. Free practical tools for Google listings, quotes, reviews and bookings.",
    "slogan": "A growth agency for local business",
    "areaServed": "GB",
    "knowsAbout": [
        "Google Business Profile",
        "local business marketing",
        "review generation",
        "quote forms",
        "appointment booking",
    ],
}

INDEXABLE = {
    "index.html": {
        "path": "/",
        "title": "Grow Local | Free tools for established local businesses",
        "desc": "Grow Local (growlocalbusiness.co.uk) gives established local businesses free tools to score their Google listing, capture quotes, collect reviews and take bookings. No sign-up.",
        "type": "website",
        "app": None,
    },
    "about/index.html": {
        "path": "/about/",
        "title": "About Grow Local | Official site growlocalbusiness.co.uk",
        "desc": "About Grow Local, the UK growth agency at growlocalbusiness.co.uk. We help established local businesses get found, lose fewer enquiries, and tidy the week.",
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
        "title": "Free Google Listing Scorecard | Grow Local",
        "desc": "Free Google Listing Scorecard for local businesses. Score your Google Business Profile out of 100 in about 30 seconds and see what to fix.",
        "type": "website",
        "app": "Google Listing Scorecard",
    },
    "quote/index.html": {
        "path": "/quote/",
        "title": "Instant Quote Form for Trades & Salons | Grow Local",
        "desc": "Free instant quote form for garages, trades and salons. Show ballpark prices and capture named leads after hours. From Grow Local.",
        "type": "website",
        "app": "Instant Quote Form",
    },
    "review/index.html": {
        "path": "/review/",
        "title": "Google Review QR Code for Local Businesses | Grow Local",
        "desc": "Free Google review QR code for local businesses. Send happy customers straight to your Google review box in about a minute.",
        "type": "website",
        "app": "Google Review QR",
    },
    "reply/index.html": {
        "path": "/reply/",
        "title": "Google Review Reply Writer | Grow Local",
        "desc": "Free Google review reply writer for local businesses. Paste a review, pick a tone, get a draft you can edit and post. No sign-up.",
        "type": "website",
        "app": "Review Reply Writer",
    },
    "booking/index.html": {
        "path": "/booking/",
        "title": "Free Booking Link for Local Businesses | Grow Local",
        "desc": "Free booking link for salons, clinics and trades. Customers pick a slot from your usual hours; you confirm. No sign-up.",
        "type": "website",
        "app": "Booking Link",
    },
    "valuation/index.html": {
        "path": "/valuation/",
        "title": "Instant Valuation Tool for Estate Agents | Grow Local",
        "desc": "Free instant valuation tool for estate agents. Give sellers a rough guide and capture a named lead every time it's used.",
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
        "title": "Resources from Grow Local | growlocalbusiness.co.uk",
        "desc": "Practical resources from Grow Local (growlocalbusiness.co.uk): Google listings, reviews, quote forms and booking links, plus free tools for established local businesses.",
        "type": "website",
        "app": None,
    },
    "resources/what-is-grow-local/index.html": {
        "path": "/resources/what-is-grow-local/",
        "title": "What is Grow Local? | Official growlocalbusiness.co.uk",
        "desc": "Grow Local is a UK growth agency for established local businesses. Official website growlocalbusiness.co.uk. Free tools for listings, reviews, quotes and bookings.",
        "type": "article",
        "app": None,
    },
    "resources/google-listing-checklist/index.html": {
        "path": "/resources/google-listing-checklist/",
        "title": "Google Business Profile Checklist for Local Businesses | Grow Local",
        "desc": "Practical Google Business Profile checklist for local businesses. See what customers notice first, then score your listing free.",
        "type": "article",
        "app": None,
    },
    "resources/free-google-listing-scorecard/index.html": {
        "path": "/resources/free-google-listing-scorecard/",
        "title": "Free Google Listing Scorecard | Grow Local",
        "desc": "Score your Google Business Profile out of 100 in about 30 seconds. Free Google Listing Scorecard from Grow Local for established local businesses.",
        "type": "article",
        "app": None,
    },
    "resources/more-google-reviews/index.html": {
        "path": "/resources/more-google-reviews/",
        "title": "How Local Businesses Get More Google Reviews | Grow Local",
        "desc": "Simple ways local businesses get more Google reviews. Ask at the right moment, then build a free Google Review QR in about a minute.",
        "type": "article",
        "app": None,
    },
    "resources/google-review-qr-code/index.html": {
        "path": "/resources/google-review-qr-code/",
        "title": "Google Review QR Code for Local Businesses | Grow Local",
        "desc": "Create a free Google review QR code that sends happy customers straight to your review box. Ready in about a minute from Grow Local.",
        "type": "article",
        "app": None,
    },
    "resources/reply-to-google-reviews/index.html": {
        "path": "/resources/reply-to-google-reviews/",
        "title": "How to Reply to Google Reviews | Free Writer · Grow Local",
        "desc": "Paste a Google review, pick a tone, and get a reply you can edit and post. Free Review Reply Writer from Grow Local for local businesses.",
        "type": "article",
        "app": None,
    },
    "resources/quote-form-for-trades/index.html": {
        "path": "/resources/quote-form-for-trades/",
        "title": "Instant Quote Forms for Trades and Salons | Grow Local",
        "desc": "Why after-hours browsers leave without asking for a price, and how a free instant quote form for trades and salons captures them.",
        "type": "article",
        "app": None,
    },
    "resources/booking-without-back-and-forth/index.html": {
        "path": "/resources/booking-without-back-and-forth/",
        "title": "Booking Link for Local Businesses | Cut the Back-and-Forth",
        "desc": "Cut diary ping-pong with a free booking link for local businesses. Customers pick a slot from your usual hours; you confirm.",
        "type": "article",
        "app": None,
    },
    "resources/estate-agent-instant-valuation/index.html": {
        "path": "/resources/estate-agent-instant-valuation/",
        "title": "Instant Valuation Tool for Estate Agents | Grow Local",
        "desc": "Free instant valuation tool for estate agents and lettings. Give sellers a rough guide and capture a named lead. From Grow Local.",
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
