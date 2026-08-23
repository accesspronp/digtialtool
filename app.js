/* DigitalToolsNepal — homepage logic */

/* ---------- page loader: random 0.4s / 0.7s / 1.0s ---------- */
(function () {
  const loader = document.getElementById("dtnLoader");
  if (!loader) return;
  const delay = 150;
  function hide() {
    setTimeout(() => {
      loader.classList.add("dtn-hide");
      document.body.classList.remove("dtn-loading");
      setTimeout(() => loader.remove(), 350);
    }, delay);
  }
  if (document.readyState === "complete") hide();
  else window.addEventListener("load", hide);
})();

const $ = id => document.getElementById(id);
let activeCategory = "all";

function priceRange(p) {
  const nums = p.plans.map(pl => parsePrice(pl[1])).filter(Boolean);
  return nums.length ? formatNpr(Math.min(...nums)) : "Ask us";
}

function renderProducts() {
  const grid = $("productGrid");
  if (!grid) return;
  const q = ($("search")?.value || "").trim().toLowerCase();
  const list = PRODUCTS.filter(p => {
    const catOk = activeCategory === "all" || p.cat === activeCategory;
    const text = `${p.name} ${p.short} ${p.cat} ${p.keywords}`.toLowerCase();
    return catOk && (!q || text.includes(q));
  });

  grid.innerHTML = list.length ? list.map((p, i) => `
    <article class="product reveal" style="animation-delay:${(i % 6) * 60}ms">
      <div class="product-logo-wrap">
        <div class="product-logo">${dtnLogo(p.logo)}</div>
        <span class="subscription-badge">${p.tag}</span>
      </div>
      <small>${p.cat.toUpperCase()}</small>
      <h3>${p.name}</h3>
      <p>${p.short}</p>
      <div class="price-row">
        <div class="price">${priceRange(p)} <small>from</small></div>
        <a class="order-btn" href="${productUrl(p)}">Buy Now ↗</a>
      </div>
      <div class="card-plan-list">${p.plans.map(pl => `<span>${pl[0]} · <b>${pl[1]}</b></span>`).join("")}</div>
    </article>
  `).join("") : `<div class="empty">Product bhetiena. Search feri try garnus.</div>`;
}

/* animated stat counters */
function runCounters() {
  document.querySelectorAll("[data-count]").forEach(el => {
    const target = Number(el.dataset.count);
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-NP");
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      renderProducts();
    });
  });

  $("search")?.addEventListener("input", renderProducts);
  if ($("navWhatsApp")) $("navWhatsApp").href = `https://wa.me/${CONFIG.whatsapp}`;
  if ($("floatWhatsApp")) $("floatWhatsApp").href = `https://wa.me/${CONFIG.whatsapp}`;
  if ($("footerWhatsApp")) $("footerWhatsApp").href = `https://wa.me/${CONFIG.whatsapp}`;
  if ($("year")) $("year").textContent = new Date().getFullYear();

  // stats counter when scrolled into view
  const hasIO = "IntersectionObserver" in window;
  if (!hasIO) { runCounters(); document.querySelectorAll(".fade-up").forEach(el=>el.classList.add("in")); }
  const stats = document.querySelector(".stats-strip");
  if (stats && hasIO) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { runCounters(); io.disconnect(); } });
    }, { threshold: .3 });
    io.observe(stats);
  }

  // scroll reveal for sections
  const io2 = hasIO ? new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
  }, { threshold: .12 }) : null;
  if (io2) document.querySelectorAll(".fade-up").forEach(el => io2.observe(el));

  // make sure the hero video really plays on mobile browsers
  const v = document.querySelector(".hero-video");
  if (v) {
    v.muted = true; v.playsInline = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    ["touchstart", "click", "scroll"].forEach(ev =>
      document.addEventListener(ev, tryPlay, { once: true, passive: true }));
  }
});
