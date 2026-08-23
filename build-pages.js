/* Run:  node build-pages.js   → regenerates every products/*.html from data.js */
const fs = require("fs");
const path = require("path");
global.window = {};
require("./data.js");
require("./logos.js");
const { PRODUCTS, PAYMENT_METHODS, CONFIG, DTN_LOGOS } = window;

const OUT = path.join(__dirname, "products");
fs.mkdirSync(OUT, { recursive: true });

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const num = v => { const m = String(v).replace(/,/g, "").match(/\d+(?:\.\d+)?/); return m ? Number(m[0]) : 0; };
const CLAUDE_VIDEO = ["claude-pro", "claude-max"];

function deliveryLine(p) {
  if (p.delivery === "own") return "Activated on your own email — you keep the account";
  if (p.delivery === "code") return "Official redeem code / link sent to you";
  return "Ready login details sent on WhatsApp after verify";
}

function faqs(p) {
  const cheapest = p.plans.map(pl => pl[1]).join(", ");
  const list = [
    [`How much does ${p.name} cost in Nepal?`,
     `At DigitalToolsNepal the ${p.name} price in Nepal is ${cheapest}. You can pay with eSewa, Khalti or bank transfer QR.`],
    [`How do I pay for ${p.name} from Nepal?`,
     `Choose your plan on this page, scan the eSewa, Khalti or Bank QR, upload the payment screenshot and continue to WhatsApp. We verify and activate it, usually within a few minutes.`],
    [`How is ${p.name} delivered?`,
     deliveryLine(p) + ". Everything is handed over on WhatsApp so you always have a record of your order."],
    [`Is there support if something stops working?`,
     `Yes. Message us on WhatsApp at any time during your plan period and we will fix or replace it.`]
  ];
  if (p.delivery === "own") list.splice(3, 0, [
    `Do I have to give my password?`,
    `No. For ${p.name} we only need the email address of the account, because the plan is activated on your own account. Never share your password with anyone.`
  ]);
  return list;
}

function relatedFor(p) {
  return PRODUCTS.filter(x => x.id !== p.id)
    .sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat))
    .slice(0, 4);
}

function page(p) {
  const min = Math.min(...p.plans.map(pl => num(pl[1])));
  const title = `${p.name} Nepal – Cheap ${p.name} Subscription Price (from Rs. ${min.toLocaleString("en-NP")}) | DigitalToolsNepal`;
  const desc = `${p.short} Pay by eSewa, Khalti or bank QR and get instant delivery on WhatsApp. Nepal's trusted premium subscription store.`;
  const url = `${CONFIG.domain}/products/${p.slug}.html`;
  const f = faqs(p);

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: `${p.name} Subscription Nepal`,
        description: p.desc,
        brand: { "@type": "Brand", name: p.name },
        category: p.cat,
        url,
        offers: p.plans.map(pl => ({
          "@type": "Offer",
          name: `${p.name} ${pl[0]}`,
          price: num(pl[1]),
          priceCurrency: "NPR",
          availability: "https://schema.org/InStock",
          url,
          seller: { "@type": "Organization", name: CONFIG.storeName }
        })),
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1024" }
      },
      {
        "@type": "FAQPage",
        mainEntity: f.map(([q, a]) => ({
          "@type": "Question", name: q,
          acceptedAnswer: { "@type": "Answer", text: a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: CONFIG.domain + "/" },
          { "@type": "ListItem", position: 2, name: "Products", item: CONFIG.domain + "/#products" },
          { "@type": "ListItem", position: 3, name: p.name, item: url }
        ]
      }
    ]
  };

  const heroRight = CLAUDE_VIDEO.includes(p.id) ? `
      <div class="loop-video fade-up">
        <span class="lv-tag">${p.name.toUpperCase()} · LIVE DEMO</span>
        <video src="../assets/hero-video.mp4" autoplay muted loop playsinline preload="metadata"></video>
      </div>` : `
      <div class="panel fade-up">
        <div class="eyebrow">WHY BUY FROM US</div>
        <h2>${esc(p.name)} in Nepal, without the hassle</h2>
        <ul class="buy-points" style="margin-top:14px">
          <li>Local prices in NPR — no dollar card needed</li>
          <li>eSewa, Khalti and bank transfer accepted</li>
          <li>${esc(deliveryLine(p))}</li>
          <li>Real human support on WhatsApp</li>
        </ul>
      </div>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="keywords" content="${esc(p.keywords)}, digitaltoolsnepal, premium subscription nepal, esewa khalti payment">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="product">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${CONFIG.domain}/assets/family-desktop.png">
<meta property="og:site_name" content="${CONFIG.storeName}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles.css">
<link rel="stylesheet" href="../extra.css">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<script defer src="https://app.fastbots.ai/embed.js" data-bot-id="cmt07u3sf016epe1pi175z4t1"></script>
</head>
<body class="dtn-loading">
<div id="dtnLoader"><div class="dtn-spinner"></div></div>
<div class="bg-grid" aria-hidden="true"></div>
<div class="topbar">🇳🇵 ${esc(p.name)} Nepal · eSewa / Khalti / Bank QR · Fast WhatsApp delivery</div>

<header class="navbar">
  <a class="brand" href="../index.html">
    <div class="brand-icon">D</div>
    <div><div class="brand-title">DigitalTools<span>Nepal</span></div><div class="brand-sub">Premium Digital Store</div></div>
  </a>
  <nav>
    <a href="../index.html#products">All Products</a>
    <a href="../index.html#how">How to order</a>
    <a href="../index.html#faq">FAQ</a>
  </nav>
  <div class="auth-nav">
    <div class="lang-cur"><span>🌐 EN</span><span>Rs. <small>NPR</small></span></div>
    <a class="wa-btn wa-link" href="#" target="_blank" rel="noopener">WhatsApp ↗</a>
  </div>
</header>

<main class="buy-wrap">
  <div class="crumbs"><a href="../index.html">Home</a> › <a href="../index.html#products">Products</a> › ${esc(p.name)}</div>

  <section class="buy-hero">
    <div>
      <div class="buy-head">
        <div class="buy-logo">${DTN_LOGOS[p.logo]}</div>
        <div>
          <span class="buy-tag">${esc(p.tag)}</span>
          <h1>Buy ${esc(p.name)} in Nepal</h1>
          <div class="mini-facts"><span>From Rs. ${min.toLocaleString("en-NP")}</span><span>${esc(p.badge)}</span><span>★ 4.9 · 1000+ orders</span></div>
        </div>
      </div>
      <p class="buy-sub">${esc(p.desc)}</p>
      <ul class="buy-points">${p.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <div class="hero-actions">
        <a class="btn primary" href="#checkout">Order now →</a>
        <a class="btn secondary" id="askWhatsApp" href="#" target="_blank" rel="noopener">Ask on WhatsApp</a>
      </div>
    </div>
    ${heroRight}
  </section>

  <section class="checkout fade-up" id="checkout">
    <div class="panel">
      <div class="eyebrow">SECURE ORDER</div>
      <h2>Order your ${esc(p.name)} plan</h2>
      <p class="modal-muted">4 quick steps: plan → your details → QR payment → screenshot.</p>

      <div class="step-block">
        <div class="eyebrow">STEP 1 · CHOOSE PLAN</div>
        <div id="planOptions" class="plan-grid"></div>
      </div>

      <div class="step-block">
        <div class="eyebrow">STEP 2 · YOUR DETAILS</div>
        <label class="field"><span>Your name</span><input id="buyerName" type="text" placeholder="e.g. Sujan Thapa" autocomplete="name"></label>
        <label class="field"><span id="emailLabelText">Subscription email (where we activate it)</span>
          <input id="buyerEmail" type="email" placeholder="yourname@gmail.com" autocomplete="email"></label>
        <label class="field"><span>Note (optional)</span><textarea id="buyerNote" placeholder="Anything we should know?"></textarea></label>
        <p class="hint">🔒 We only need your <b>email address</b>, never your password. Details are sent straight to our WhatsApp — this website stores nothing.</p>
      </div>

      <div class="step-block">
        <div class="eyebrow">STEP 3 · PAYMENT</div>
        <div id="paymentMethods" class="payment-grid"></div>
        <div class="payment-preview hidden" id="paymentPreview">
          <div class="payment-head">
            <div><span id="paymentMethodName"></span><small>Scan to pay</small></div>
            <a id="downloadQr" class="tiny-btn" download>Download QR</a>
          </div>
          <img id="qrImage" src="" alt="${esc(p.name)} payment QR code Nepal">
          <div class="secure-row"><span>✓ Secure</span><span>⚡ Instant</span><span>✓ Safe</span></div>
        </div>
      </div>

      <div class="step-block">
        <div class="eyebrow">STEP 4 · SCREENSHOT</div>
        <label class="upload-box">
          <input id="screenshotInput" type="file" accept="image/*">
          <span class="upload-icon">↑</span><b>Choose payment screenshot</b><small id="fileName">PNG, JPG or WEBP</small>
        </label>
        <div id="previewBox" class="preview-box hidden"><img id="screenshotPreview" alt="Payment screenshot preview"></div>
        <p class="status-hint" id="statusHint"></p>
        <button id="continueWhatsApp" class="btn primary full" disabled>Continue to WhatsApp ↗</button>
        <p class="hint" style="margin-top:10px">The screenshot is not uploaded to this website. WhatsApp opens with your order pre-filled — attach the screenshot there.</p>
      </div>
    </div>

    <aside class="panel summary-card">
      <div class="eyebrow">ORDER SUMMARY</div>
      <h2>${esc(p.name)}</h2>
      <div class="summary-row"><span>Selected plan</span><b id="sumPlan">None</b></div>
      <div class="summary-row"><span>Total</span><strong id="sumTotal">Rs. 0</strong></div>
      <div class="trust-mini">
        <div>✅ ${esc(deliveryLine(p))}</div>
        <div>⚡ Usually activated within minutes</div>
        <div>💬 WhatsApp support the whole plan period</div>
        <div>🇳🇵 Paid in NPR — eSewa, Khalti, Bank</div>
      </div>
    </aside>
  </section>

  <section class="faq-block fade-up">
    <div class="eyebrow">FAQ</div>
    <h2 style="font-size:22px;margin:6px 0 14px">${esc(p.name)} in Nepal — common questions</h2>
    ${f.map(([q, a], i) => `<details${i === 0 ? " open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
  </section>

  <section class="related fade-up">
    <h2>People also buy</h2>
    <div class="related-grid">
      ${relatedFor(p).map(r => `<a class="related-card" href="${r.slug}.html"><i>${DTN_LOGOS[r.logo]}</i><span><b>${esc(r.name)}</b><small>from Rs. ${Math.min(...r.plans.map(x => num(x[1]))).toLocaleString("en-NP")}</small></span></a>`).join("")}
    </div>
  </section>
</main>

<footer>
  <div class="brand footer-brand">
    <div class="brand-icon">D</div>
    <div><div class="brand-title">DigitalTools<span>Nepal</span></div><div class="brand-sub">Premium Digital Store</div></div>
  </div>
  <div class="footer-payment"><b>Supported Payments</b>
    <div class="payment-logos">
      <span class="pay-mark esewa"><i>e</i>eSewa</span>
      <span class="pay-mark khalti"><i>K</i>Khalti</span>
      <span class="pay-mark imepay"><i>I</i>IME Pay</span>
      <span class="pay-mark fonepay"><i>F</i>FonePay</span>
      <span class="pay-mark bank"><i>B</i>Bank</span>
    </div>
  </div>
  <div class="footer-contact">
    <b>Contact</b>
    <div>📍 Kathmandu, Nepal</div>
    <div>Email: ${CONFIG.email}</div>
    <div>📞 <a href="tel:+9779745586084">+977 9745586084</a> · <a class="wa-link" href="#">WhatsApp support</a></div>
  </div>
  <div>© <span id="year"></span> ${CONFIG.storeName}</div>
</footer>

<script>window.PAGE_PRODUCT_ID = ${JSON.stringify(p.id)};</script>
<script src="../data.js"></script>
<script src="../logos.js"></script>
<script src="../product.js"></script>
</body>
</html>`;
}

PRODUCTS.forEach(p => {
  fs.writeFileSync(path.join(OUT, p.slug + ".html"), page(p));
  console.log("built products/" + p.slug + ".html");
});

/* sitemap + robots */
const today = new Date().toISOString().slice(0, 10);
const urls = [`${CONFIG.domain}/`, ...PRODUCTS.map(p => `${CONFIG.domain}/products/${p.slug}.html`)];
fs.writeFileSync(path.join(__dirname, "sitemap.xml"),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u, i) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${i === 0 ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>`);
fs.writeFileSync(path.join(__dirname, "robots.txt"),
`User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.domain}/sitemap.xml\n`);
console.log("built sitemap.xml + robots.txt");
