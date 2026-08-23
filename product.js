/* DigitalToolsNepal — product buy page logic */

/* page loader: random 0.4s / 0.7s / 1.0s */
(function () {
  const loader = document.getElementById("dtnLoader");
  if (!loader) return;
  const delay = [400, 700, 1000][Math.floor(Math.random() * 3)];
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
const PRODUCT = PRODUCTS.find(p => p.id === window.PAGE_PRODUCT_ID);

let selectedPlan = null;
let selectedPayment = null;
let screenshotName = "";

function renderPlans() {
  $("planOptions").innerHTML = PRODUCT.plans.map((pl, i) => `
    <button class="plan-card" type="button" data-i="${i}">
      <b>${pl[0]}</b><span>${pl[1]}</span>
    </button>`).join("");
  document.querySelectorAll("#planOptions .plan-card").forEach(btn => {
    btn.addEventListener("click", () => choosePlan(Number(btn.dataset.i)));
  });
}

function choosePlan(i) {
  selectedPlan = PRODUCT.plans[i];
  document.querySelectorAll("#planOptions .plan-card")
    .forEach((c, idx) => c.classList.toggle("selected", idx === i));
  $("sumPlan").textContent = selectedPlan[0];
  $("sumTotal").textContent = formatNpr(parsePrice(selectedPlan[1]));
  validate();
}

function renderPayments() {
  $("paymentMethods").innerHTML = PAYMENT_METHODS.map(m => `
    <button class="payment-card" type="button" data-id="${m.id}">
      <b>${m.name}</b><span>${m.sub}</span>
    </button>`).join("");
  document.querySelectorAll("#paymentMethods .payment-card").forEach(btn => {
    btn.addEventListener("click", () => choosePayment(btn.dataset.id, btn));
  });
}

function choosePayment(id, btn) {
  selectedPayment = PAYMENT_METHODS.find(m => m.id === id);
  document.querySelectorAll("#paymentMethods .payment-card").forEach(c => c.classList.remove("selected"));
  btn.classList.add("selected");
  $("paymentMethodName").textContent = selectedPayment.name;
  $("qrImage").src = "../" + selectedPayment.img;
  $("downloadQr").href = "../" + selectedPayment.img;
  $("downloadQr").download = `${PRODUCT.id}-${selectedPayment.id}-qr.png`;
  $("paymentPreview").classList.remove("hidden");
  $("paymentPreview").scrollIntoView({ behavior: "smooth", block: "nearest" });
  validate();
}

function needsEmail() { return PRODUCT.delivery === "own"; }

function validate() {
  const name = $("buyerName").value.trim();
  const email = $("buyerEmail").value.trim();
  const emailOk = !needsEmail() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const ok = !!selectedPlan && !!selectedPayment && name.length >= 2 && emailOk && !!screenshotName;
  $("continueWhatsApp").disabled = !ok;
  $("statusHint").textContent = !selectedPlan ? "Step 1 — choose a plan."
    : (name.length < 2 ? "Step 2 — write your name."
      : (!emailOk ? "Step 2 — write the email where the subscription should be activated."
        : (!selectedPayment ? "Step 3 — choose a payment method and scan the QR."
          : (!screenshotName ? "Step 4 — attach your payment screenshot."
            : "All set! Continue to WhatsApp and send the screenshot there."))));
}

function buildWhatsApp() {
  const lines = [
    `Namaste ${CONFIG.storeName}!`,
    ``,
    `Order:`,
    `Product: ${PRODUCT.name}`,
    `Plan: ${selectedPlan[0]}`,
    `Amount: ${formatNpr(parsePrice(selectedPlan[1]))}`,
    ``,
    `My name: ${$("buyerName").value.trim()}`
  ];
  if (needsEmail()) lines.push(`Activate on my email: ${$("buyerEmail").value.trim()}`);
  else if ($("buyerEmail").value.trim()) lines.push(`Contact email: ${$("buyerEmail").value.trim()}`);
  if ($("buyerNote").value.trim()) lines.push(`Note: ${$("buyerNote").value.trim()}`);
  lines.push(``, `Payment method: ${selectedPayment.name}`,
    `Screenshot: ${screenshotName} (sending in this chat)`, ``,
    `Please verify and activate my order. Dhanyabad!`);
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderPlans();
  renderPayments();

  if (!needsEmail()) {
    $("emailLabelText").textContent = "Your email (optional — for the receipt)";
    $("buyerEmail").required = false;
  }

  ["buyerName", "buyerEmail"].forEach(id => $(id).addEventListener("input", validate));

  $("screenshotInput").addEventListener("change", e => {
    const file = e.target.files?.[0];
    screenshotName = file ? file.name : "";
    $("fileName").textContent = file ? file.name : "PNG, JPG or WEBP";
    if (file) {
      $("screenshotPreview").src = URL.createObjectURL(file);
      $("previewBox").classList.remove("hidden");
    } else {
      $("previewBox").classList.add("hidden");
    }
    validate();
  });

  $("continueWhatsApp").addEventListener("click", () => {
    if (!$("continueWhatsApp").disabled) window.open(buildWhatsApp(), "_blank", "noopener");
  });

  $("askWhatsApp").href = `https://wa.me/${CONFIG.whatsapp}?text=` +
    encodeURIComponent(`Namaste! I want to ask about ${PRODUCT.name}.`);
  document.querySelectorAll(".wa-link").forEach(a => a.href = `https://wa.me/${CONFIG.whatsapp}`);
  $("year").textContent = new Date().getFullYear();

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(en => en.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }), { threshold: .12 });
    document.querySelectorAll(".fade-up").forEach(el => io.observe(el));
  } else {
    document.querySelectorAll(".fade-up").forEach(el => el.classList.add("in"));
  }

  document.querySelectorAll("video").forEach(v => {
    v.muted = true; v.playsInline = true;
    const p = () => v.play().catch(() => {});
    p();
    ["touchstart", "click", "scroll"].forEach(ev => document.addEventListener(ev, p, { once: true, passive: true }));
  });

  validate();
});
