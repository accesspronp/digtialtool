/* =========================================================
   DigitalToolsNepal — EDIT EVERYTHING HERE
   Change a price in this file and it updates the homepage
   AND the product buy page automatically.
   ========================================================= */

window.CONFIG = {
  whatsapp: "9779745586084",      // WhatsApp number, no + and no spaces
  storeName: "DigitalToolsNepal",
  email: "mail@digitaltoolsnepal.store",
  domain: "https://digitaltoolsnepal.store"
};

/* delivery:
   "own"    -> activated on the customer's OWN email (they must give email)
   "login"  -> we send ready login details after payment
   "code"   -> redeem code / link                                        */

window.PRODUCTS = [
  {
    id: "netflix", slug: "netflix-subscription-nepal", name: "Netflix", cat: "ott", logo: "netflix",
    tag: "MOST SOLD", delivery: "login", badge: "4K UHD available",
    short: "Netflix premium plan at Nepal's cheapest price — 3, 6 or 12 months.",
    desc: "Netflix premium access for movies, series, anime and Nepali favourites. Works on mobile, laptop, smart TV and tablet. After payment we hand over your access details on WhatsApp, usually within a few minutes.",
    plans: [["3 Months", "Rs. 499"], ["6 Months", "Rs. 999"], ["12 Months", "Rs. 1,899"]],
    points: [
      "Watch on phone, laptop, smart TV or tablet",
      "HD / UHD quality depending on plan given",
      "Full replacement support during your plan period",
      "Delivery on WhatsApp right after payment verify"
    ],
    keywords: "netflix nepal, netflix cheap price nepal, netflix subscription nepal, netflix 1 year nepal, netflix esewa khalti"
  },
  {
    id: "prime-video", slug: "amazon-prime-video-nepal", name: "Prime Video", cat: "ott", logo: "prime",
    tag: "NEW", delivery: "own", badge: "On your own email",
    short: "Amazon Prime Video 6 months on your own email — Rs. 899.",
    desc: "Prime Video subscription activated directly on YOUR own email address. You keep the account, your watchlist and your profile — we only activate the premium plan on it. Give us your email at checkout and we do the rest.",
    plans: [["6 Months", "Rs. 899"]],
    points: [
      "Activated on your own email — the account stays yours",
      "Your watchlist, profiles and history are not touched",
      "Movies, series and Amazon Originals in HD",
      "Support on WhatsApp for the whole plan period"
    ],
    keywords: "prime video nepal, amazon prime nepal price, prime video 6 months nepal, prime video cheap nepal"
  },
  {
    id: "spotify", slug: "spotify-premium-nepal", name: "Spotify Premium", cat: "ott", logo: "spotify",
    tag: "POPULAR", delivery: "own", badge: "On your own email",
    short: "Spotify Premium 12 months on your own account — Rs. 2,700.",
    desc: "Spotify Premium is activated on YOUR own Spotify email — your playlists, liked songs, followers and Wrapped history all stay exactly where they are. No new account, no re-following artists. Just send your Spotify email at checkout.",
    plans: [["12 Months", "Rs. 2,700"]],
    points: [
      "Activated on your own Spotify email — playlists stay safe",
      "Ad-free music and podcasts",
      "Offline download and unlimited skips",
      "High quality audio streaming"
    ],
    keywords: "spotify premium nepal, spotify nepal price, spotify 1 year nepal, spotify premium cheap nepal"
  },
  {
    id: "youtube", slug: "youtube-premium-nepal", name: "YouTube Premium", cat: "ott", logo: "youtube",
    tag: "BEST VALUE", delivery: "own", badge: "On your own Gmail",
    short: "YouTube Premium 12 months on your own Gmail — Rs. 1,800.",
    desc: "YouTube Premium activated on YOUR own Gmail address. Your subscriptions, watch later, history and channel stay untouched — we simply turn Premium on for that Google account. YouTube Music Premium is included.",
    plans: [["12 Months", "Rs. 1,800"]],
    points: [
      "Activated on your own Gmail — nothing is reset",
      "No ads on YouTube and YouTube Music",
      "Background play and offline download",
      "YouTube Music Premium included free"
    ],
    keywords: "youtube premium nepal, youtube premium price nepal, youtube premium 1 year nepal, youtube premium cheap nepal"
  },
  {
    id: "chatgpt-plus", slug: "chatgpt-plus-nepal", name: "ChatGPT Plus", cat: "ai", logo: "chatgpt",
    tag: "TOP AI", delivery: "own", badge: "On your own email",
    short: "ChatGPT Plus in Nepal from Rs. 1,499 — activated on your own OpenAI email.",
    desc: "ChatGPT Plus is upgraded on YOUR own OpenAI account, so all your old chats, custom instructions and projects remain. You get the latest GPT models, image generation, file and photo upload, data analysis, voice mode and much faster responses even at busy hours.",
    plans: [["3 Months", "Rs. 1,499"], ["6 Months", "Rs. 2,900"], ["12 Months", "Rs. 5,600"]],
    points: [
      "Upgraded on your own email — old chats stay",
      "Latest GPT models, image generation, voice mode",
      "File, PDF and photo upload with data analysis",
      "Priority access when servers are busy"
    ],
    keywords: "chatgpt plus nepal, chatgpt subscription nepal, chatgpt plus price nepal, buy chatgpt nepal esewa"
  },
  {
    id: "chatgpt-pro", slug: "chatgpt-pro-nepal", name: "ChatGPT Pro", cat: "ai", logo: "chatgpt",
    tag: "HEAVY USE", delivery: "own", badge: "On your own email",
    short: "ChatGPT Pro for power users — on your own OpenAI email.",
    desc: "ChatGPT Pro is the highest OpenAI tier, activated on YOUR own email. Built for people who use AI all day: the strongest reasoning models with near-unlimited usage, extended thinking for hard problems, and top priority even at peak hours. Best for developers, researchers, agencies and students doing thesis-level work.",
    plans: [["1 Month", "Rs. 2,200"], ["3 Months", "Rs. 4,500"], ["12 Months", "Rs. 17,000"]],
    points: [
      "Activated on your own OpenAI email",
      "Near-unlimited use of the strongest reasoning models",
      "Extended thinking mode for very hard problems",
      "Best tier for coding, research and thesis work"
    ],
    keywords: "chatgpt pro nepal, chatgpt pro price nepal, openai pro nepal, chatgpt pro buy nepal"
  },
  {
    id: "claude-pro", slug: "claude-pro-nepal", name: "Claude Pro", cat: "ai", logo: "claude",
    tag: "BEST FOR CODING", delivery: "own", badge: "On your own email",
    short: "Claude Pro in Nepal from Rs. 2,100 — activated on your own email.",
    desc: "Claude Pro by Anthropic, activated on YOUR own email address. Claude is loved for long-document reading, natural writing and clean code. Pro gives you around 5x more usage than free, access to the newest Claude models, Projects to keep your files and context in one place, and Claude Code for terminal work.",
    plans: [["1 Month", "Rs. 2,100"], ["3 Months", "Rs. 3,500"], ["12 Months", "Rs. 15,000"]],
    points: [
      "Activated on your own email — your chats stay yours",
      "~5x more usage than the free plan",
      "Projects, file uploads and long document analysis",
      "Claude Code access for developers"
    ],
    keywords: "claude pro nepal, claude ai nepal price, buy claude pro nepal, anthropic claude subscription nepal"
  },
  {
    id: "claude-max", slug: "claude-max-nepal", name: "Claude Max 5x", cat: "ai", logo: "claude",
    tag: "PRO LEVEL", delivery: "own", badge: "On your own email",
    short: "Claude Max 5x — the highest Claude tier, on your own email.",
    desc: "Claude Max 5x is Anthropic's high-capacity plan, activated on YOUR own email. It gives roughly 5 times the usage of Claude Pro, so you can run long coding sessions in Claude Code, analyse big documents and keep working without hitting limits mid-task. Higher output limits, priority during peak hours and early access to new features are included. This is the plan for developers, agencies and anyone who lives inside Claude all day.",
    plans: [["3 Months", "Rs. 4,600"], ["12 Months", "Rs. 20,000"]],
    points: [
      "Activated on your own email — full account ownership",
      "About 5x the usage limit of Claude Pro",
      "Long Claude Code sessions without hitting limits",
      "Priority access at busy hours + early features"
    ],
    keywords: "claude max nepal, claude max 5x price nepal, claude ai max subscription nepal, buy claude max nepal"
  },
  {
    id: "supergrok", slug: "supergrok-nepal", name: "SuperGrok", cat: "ai", logo: "grok",
    tag: "NEW", delivery: "own", badge: "On your own email",
    short: "SuperGrok 3 months — Rs. 1,499, on your own X / Grok account.",
    desc: "SuperGrok is the paid xAI plan, activated on YOUR own Grok / X account. You get much higher limits on the newest Grok models, real-time answers pulled from X, image generation and the voice mode. Great if you want an AI that knows what is trending right now.",
    plans: [["3 Months", "Rs. 1,499"]],
    points: [
      "Activated on your own Grok / X account",
      "Higher limits on the newest Grok models",
      "Real-time information from X",
      "Image generation and voice mode"
    ],
    keywords: "supergrok nepal, grok subscription nepal, grok ai price nepal, buy supergrok nepal"
  },
  {
    id: "perplexity", slug: "perplexity-pro-nepal", name: "Perplexity Pro", cat: "ai", logo: "perplexity",
    tag: "RESEARCH", delivery: "own", badge: "On your own email",
    short: "Perplexity Pro 12 months — Rs. 2,100, on your own email.",
    desc: "Perplexity Pro is an AI search engine that answers with real sources and citations, activated on YOUR own email. Perfect for students, journalists and researchers: hundreds of Pro searches a day, the ability to pick between top AI models, file upload and deep research reports with links you can actually verify.",
    plans: [["12 Months", "Rs. 2,100"]],
    points: [
      "Activated on your own email",
      "Answers with real sources and citations",
      "Choose between multiple top AI models",
      "File upload + deep research reports"
    ],
    keywords: "perplexity pro nepal, perplexity ai nepal price, perplexity 1 year nepal, buy perplexity pro nepal"
  },
  {
    id: "google-ai-pro", slug: "google-ai-pro-nepal", name: "Google AI Pro", cat: "ai", logo: "google",
    tag: "18 MONTHS", delivery: "code", badge: "Redeem link",
    short: "Google AI Pro 18 months redeem link — Rs. 1,800.",
    desc: "Google AI Pro (Gemini Advanced) for 18 months through an official redeem link. You redeem it on your own Google account and get the advanced Gemini models, Gemini inside Docs, Gmail and Drive, plus extra cloud storage.",
    plans: [["18 Months · Redeem Link", "Rs. 1,800"]],
    points: [
      "Redeemed on your own Google account",
      "Advanced Gemini models",
      "Gemini inside Gmail, Docs and Drive",
      "Extra Google One cloud storage"
    ],
    keywords: "google ai pro nepal, gemini advanced nepal price, google one ai nepal, gemini subscription nepal"
  },
  {
    id: "adobe", slug: "adobe-creative-cloud-nepal", name: "Adobe Creative Cloud", cat: "creative", logo: "adobe",
    tag: "CREATORS", delivery: "login", badge: "All apps",
    short: "Adobe Creative Cloud all apps from Rs. 3,500.",
    desc: "Adobe Creative Cloud with Photoshop, Illustrator, Premiere Pro, After Effects, Lightroom and more. Ideal for designers, editors and content creators in Nepal who need the full professional toolkit without the international price.",
    plans: [["4 Months", "Rs. 3,500"], ["12 Months", "Rs. 6,000"]],
    points: ["Photoshop, Illustrator, Premiere Pro, After Effects", "Windows and macOS", "Setup help on WhatsApp", "Full support during plan period"],
    keywords: "adobe creative cloud nepal, photoshop price nepal, adobe subscription nepal cheap"
  },
  {
    id: "capcut", slug: "capcut-pro-nepal", name: "CapCut Pro", cat: "creative", logo: "capcut",
    tag: "EDITORS", delivery: "own", badge: "On your own email",
    short: "CapCut Pro from Rs. 1,999 — 3, 6 or 12 months.",
    desc: "CapCut Pro unlocks premium effects, transitions, filters, cloud space and watermark-free export for reels and TikToks. Activated on your own account so your saved drafts stay with you.",
    plans: [["3 Months", "Rs. 1,999"], ["6 Months", "Rs. 3,000"], ["12 Months", "Rs. 5,000"]],
    points: ["Premium effects, filters and transitions", "No watermark export", "Works on mobile and desktop", "Cloud storage included"],
    keywords: "capcut pro nepal, capcut pro price nepal, capcut subscription nepal"
  },
  {
    id: "minecraft", slug: "minecraft-nepal", name: "Minecraft", cat: "gaming", logo: "minecraft",
    tag: "GAMING", delivery: "code", badge: "Account or code",
    short: "Minecraft account Rs. 1,700 or redeem code Rs. 2,500.",
    desc: "Minecraft Java and Bedrock options for Nepali gamers. Choose a ready account or an official redeem code you can activate on your own Microsoft account.",
    plans: [["Account", "Rs. 1,700"], ["Redeem Code", "Rs. 2,500"]],
    points: ["Java + Bedrock options", "Redeem on your own Microsoft account", "Setup guidance on WhatsApp", "Instant handover after verify"],
    keywords: "minecraft nepal, minecraft account nepal price, buy minecraft nepal esewa"
  },
  {
    id: "gta5", slug: "gta-5-nepal", name: "GTA 5", cat: "gaming", logo: "gta5",
    tag: "GAMING", delivery: "code", badge: "Full redeem code",
    short: "GTA 5 full redeem code — Rs. 2,500, activate on your own account.",
    desc: "Grand Theft Auto V full game redeem code, activated on your own platform account (Rockstar / Steam / Epic depending on stock). Play the full story mode and GTA Online. Code is sent after payment verify, redeem instructions given on WhatsApp.",
    plans: [["Full Redeem Code", "Rs. 2,500"]],
    points: [
      "Full game — story mode + GTA Online included",
      "Official redeem code, activate on your own account",
      "Redeem instructions sent on WhatsApp",
      "Support if the code has any issue"
    ],
    keywords: "gta 5 nepal, gta 5 redeem code nepal, gta v price nepal, buy gta 5 nepal esewa khalti"
  },
  {
    id: "office", slug: "microsoft-365-nepal", name: "Microsoft 365", cat: "productivity", logo: "office",
    tag: "LIFETIME", delivery: "own", badge: "Lifetime",
    short: "Microsoft 365 lifetime — Rs. 1,499.",
    desc: "Microsoft 365 with Word, Excel, PowerPoint, Outlook and OneDrive storage. A one-time payment option that is perfect for students, offices and anyone tired of yearly renewals.",
    plans: [["Lifetime", "Rs. 1,499"]],
    points: ["Word, Excel, PowerPoint, Outlook", "OneDrive cloud storage", "One-time payment", "Windows and macOS"],
    keywords: "microsoft 365 nepal, office 365 lifetime nepal, ms office price nepal"
  }
];

window.PAYMENT_METHODS = [
  { id: "esewa", name: "eSewa", sub: "eSewa QR transfer", img: "assets/esewa-qr.png" },
  { id: "khalti", name: "Khalti", sub: "Khalti QR transfer", img: "assets/khalti-qr.png" },
  { id: "bank", name: "Bank Transfer", sub: "Bank QR transfer", img: "assets/bank-qr.png" }
];

/* ---------- shared helpers ---------- */
window.parsePrice = function (value) {
  const m = String(value ?? "").replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  const n = m ? Number(m[0]) : 0;
  return Number.isFinite(n) ? n : 0;
};
window.formatNpr = function (a) {
  const n = Number.isFinite(Number(a)) ? Number(a) : 0;
  return "Rs. " + n.toLocaleString("en-NP");
};
window.productUrl = function (p) { return "products/" + p.slug + ".html"; };
