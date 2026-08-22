# DigitalToolsNepal — Complete Website (v2)

## What's inside
```
index.html                 Homepage (hero video, stats, product grid, FAQ)
data.js                    ⭐ ALL products + prices + WhatsApp number (edit here)
logos.js                   Real brand logo SVGs
app.js                     Homepage logic
product.js                 Buy-page logic (plan → details → QR → screenshot → WhatsApp)
styles.css / extra.css     Styling + animations
auth.js                    Sign in / sign up (localStorage)
build-pages.js             Regenerates every product page from data.js
products/*.html            15 separate SEO buy pages
sitemap.xml / robots.txt   For Google
assets/                    QR codes, images, videos
```

## Run it
Open `index.html`. No build step needed to *use* the site.
(For local testing, videos and QR load best from a small server: `python3 -m http.server`.)

## Change a price / add a product
1. Edit `data.js` (one file, everything is there).
2. Run `node build-pages.js` — this rebuilds all `products/*.html`, `sitemap.xml` and `robots.txt`.
   No Node? Then also edit the price text manually inside the matching `products/*.html`.

## WhatsApp number
`data.js` → `CONFIG.whatsapp` (currently `9779745586084`, no `+`, no spaces).

## Current pricing
Netflix 3M 499 / 6M 999 / 12M 1,899 · Prime Video 6M 899 · Spotify 12M 2,700 ·
YouTube Premium 12M 1,800 · Perplexity Pro 12M 2,100 · SuperGrok 3M 1,499 ·
ChatGPT Plus 1,499+ · ChatGPT Pro 2,200+ · Claude Pro 2,100+ · Claude Max 5x 4,600+ ·
Google AI Pro 1,800 · Adobe 3,500+ · CapCut 1,999+ · Minecraft 1,700+ · MS365 1,499

## Google ranking — what still needs doing (important)
The code side is done: unique title + description per page, keyword-rich URLs
(`/products/netflix-subscription-nepal.html`), H1s, FAQ text, Product/FAQ/Breadcrumb
schema, Open Graph, sitemap and robots.

Google will NOT rank you just from this. You must:
1. Upload to your real domain over **HTTPS**.
2. Add the site in **Google Search Console** → submit `sitemap.xml` → "Request indexing".
3. Create a **Google Business Profile** for the store.
4. Get a few real links/mentions (Facebook page, TikTok bio, Nepali marketplace listings).
5. Keep prices updated — pages that change rank better than dead pages.

Ranking #1 for "netflix nepal" takes weeks-to-months and competition, not one upload.

## Honest notes
- The stats (1,000+ daily viewers, 29,000+ monthly, 1,000+ orders, 4.9★) are hard-coded
  marketing numbers in `index.html` and in the schema `aggregateRating`. Google can issue a
  manual penalty for fake review markup, so replace them with real numbers when you have them.
- `auth.js` stores passwords in the browser in plain text. It is a demo login only — do not
  treat it as real security, and never store customer payment data in it.
- Brand logos are simplified in-house SVGs, not official trademark files.
