const CONFIG = {
  whatsapp: "9779800000000", // Replace with your real WhatsApp number, no + sign.
  storeName: "DigitalToolsNepal"
};

const products = [
  {id:"chatgpt-plus", name:"ChatGPT Plus", cat:"ai", logo:"◎", style:"chatgpt", desc:"Premium AI access for study, writing and daily work.", plans:[["1 Month","Rs. 2,200"],["3 Months","Rs. 4,400"],["12 Months","Rs. 17,000"]]},
  {id:"chatgpt-pro", name:"ChatGPT Pro", cat:"ai", logo:"◎", style:"chatgpt-pro", desc:"Higher-tier ChatGPT plan for heavy AI use and advanced access.", plans:[["1 Month","Rs. 2,200"],["3 Months","Rs. 4,500"],["12 Months","Rs. 17,000"]]},
  {id:"claude-pro", name:"Claude Pro", cat:"ai", logo:"C", style:"claude", desc:"Advanced AI for writing, coding and research.", plans:[["1 Month","Rs. 2,100"],["3 Months","Rs. 3,500"],["12 Months","Rs. 15,000"]]},
  {id:"claude-max", name:"Claude Max 5X", cat:"ai", logo:"C", style:"claude", desc:"Higher-capacity Claude plan with premium access.", plans:[["3 Months","Rs. 4,600"],["12 Months","Rs. 20,000"]]},
  {id:"gemini", name:"Gemini Advanced", cat:"ai", logo:"✧", style:"gemini", desc:"Google AI tools for productivity and learning.", plans:[["1 Month","Rs. 1,900"],["3 Months","Rs. 4,900"],["12 Months","Rs. 14,000"]]},
  {id:"netflix", name:"Netflix", cat:"ott", logo:"N", style:"netflix", desc:"Entertainment plans with available durations.", plans:[["3 Months","Rs. 2,000"],["6 Months","Rs. 3,500"],["12 Months","Rs. 7,000"]]},
  {id:"spotify", name:"Spotify Premium", cat:"ott", logo:"♫", style:"spotify", desc:"Premium music with a prepaid long-term option.", plans:[["12 Months","Rs. 2,700"]]},
  {id:"youtube", name:"YouTube Premium", cat:"ott", logo:"▶", style:"youtube", desc:"Ad-free YouTube and premium features.", plans:[["3 Months","Rs. 1,800"],["12 Months","Rs. 4,800"]]},
  {id:"adobe", name:"Adobe Creative Cloud", cat:"creative", logo:"A", style:"adobe", desc:"Creative apps for design, video and content.", plans:[["4 Months","Rs. 3,500"],["12 Months","Rs. 6,000"]]},
  {id:"capcut", name:"CapCut Pro", cat:"creative", logo:"◇", style:"capcut", desc:"Premium editing tools for creators.", plans:[["3 Months","Rs. 1,999"],["6 Months","Rs. 3,000"],["12 Months","Rs. 5,000"]]},
  {id:"minecraft", name:"Minecraft", cat:"gaming", logo:"▦", style:"minecraft", desc:"Gaming products and activation options.", plans:[["Account","Rs. 1,700"],["Redeem Code","Rs. 2,500"]]},
  {id:"office", name:"Microsoft 365", cat:"productivity", logo:"▣", style:"office", desc:"Productivity suite for school, documents and work.", plans:[["Lifetime","Rs. 1,499"]]},
  {id:"google-one", name:"Google One", cat:"productivity", logo:"G", style:"google", desc:"Extra storage and eligible Google benefits.", plans:[["1 Year","Custom"]]}
];

const paymentMethods = [
  {id:"esewa", name:"eSewa", sub:"eSewa QR transfer", img:"assets/esewa-qr.png"},
  {id:"khalti", name:"Khalti", sub:"Khalti QR transfer", img:"assets/khalti-qr.png"},
  {id:"bank", name:"Bank Transfer", sub:"Bank QR transfer", img:"assets/bank-qr.png"}
];

let activeCategory = "all";
let selectedProduct = null;
let selectedPlan = null;
let selectedPayment = null;
let screenshotFile = null;

const $ = id => document.getElementById(id);
const grid = $("productGrid");
const modal = $("orderModal");

function renderProducts(){
  const q = $("search").value.trim().toLowerCase();
  const list = products.filter(p => {
    const catOk = activeCategory === "all" || p.cat === activeCategory;
    const text = `${p.name} ${p.desc} ${p.cat}`.toLowerCase();
    return catOk && (!q || text.includes(q));
  });
  grid.innerHTML = list.length ? list.map(p => `
    <article class="product">
      <div class="product-logo-wrap">
        <div class="product-logo ${p.style}">${p.logo}</div>
        <span class="subscription-badge">SUBSCRIPTION</span>
      </div>
      <small>${p.cat.toUpperCase()}</small>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price-row">
        <div class="price">${p.plans[0][1]} <small>+</small></div>
        <button class="order-btn" onclick="openOrder('${p.id}')">Order Now ↗</button>
      </div>
    </article>
  `).join("") : `<div class="empty">Product भेटिएन. Search फेरि try garnus.</div>`;
}

function openOrder(id){
  selectedProduct = products.find(p => p.id === id);
  selectedPlan = null; selectedPayment = null; screenshotFile = null;
  $("modalProduct").textContent = selectedProduct.name;
  $("planOptions").innerHTML = selectedProduct.plans.map((pl, i) => `
    <button class="plan-card" onclick="choosePlan(${i})">
      <b>${pl[0]}</b><span>${pl[1]}</span>
    </button>
  `).join("");
  $("orderStep1").classList.remove("hidden");
  $("orderStep2").classList.add("hidden");
  $("orderStep3").classList.add("hidden");
  $("paymentPreview").classList.add("hidden");
  $("qrImage").src = "";
  $("screenshotInput").value = "";
  $("continueWhatsApp").disabled = true;
  $("previewBox").classList.add("hidden");
  modal.classList.remove("hidden"); modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}

function choosePlan(i){
  selectedPlan = selectedProduct.plans[i];
  $("paymentMethods").innerHTML = paymentMethods.map(m => `
    <button class="payment-card" onclick="choosePayment('${m.id}')">
      <b>${m.name}</b><span>${m.sub}</span>
    </button>
  `).join("");
  $("orderStep1").classList.add("hidden");
  $("orderStep2").classList.remove("hidden");
}

function choosePayment(id){
  selectedPayment = paymentMethods.find(m => m.id === id);
  $("paymentMethodName").textContent = selectedPayment.name;
  $("qrImage").src = selectedPayment.img;
  $("downloadQr").href = selectedPayment.img;
  $("downloadQr").download = `${selectedProduct.id}-${selectedPayment.id}-qr.png`;
  $("paymentPreview").classList.remove("hidden");
}

function closeModal(){
  modal.classList.add("hidden"); modal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}

function showUpload(){
  if(!selectedPayment) return;
  $("orderStep2").classList.add("hidden");
  $("orderStep3").classList.remove("hidden");
}

function buildWhatsApp(){
  const text = [
    `Namaste ${CONFIG.storeName}!`,
    ``,
    `Product: ${selectedProduct.name}`,
    `Plan: ${selectedPlan[0]}`,
    `Amount: ${selectedPlan[1]}`,
    `Payment: ${selectedPayment.name}`,
    ``,
    `Payment screenshot selected. Please verify and activate my order.`,
    `Thank you.`
  ].join("\n");
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
}

$("paidBtn").addEventListener("click", showUpload);
$("backToPayment").addEventListener("click", ()=>{
  $("orderStep3").classList.add("hidden"); $("orderStep2").classList.remove("hidden");
});
$("backToMethods").addEventListener("click", ()=>{
  $("paymentPreview").classList.add("hidden"); selectedPayment=null;
});
$("screenshotInput").addEventListener("change", e=>{
  const file = e.target.files?.[0]; screenshotFile = file || null;
  $("fileName").textContent = file ? file.name : "PNG, JPG or WEBP";
  if(!file){ $("continueWhatsApp").disabled = true; $("previewBox").classList.add("hidden"); return; }
  $("continueWhatsApp").disabled = false;
  const url = URL.createObjectURL(file);
  $("screenshotPreview").src = url;
  $("previewBox").classList.remove("hidden");
});
$("continueWhatsApp").addEventListener("click", ()=>window.open(buildWhatsApp(), "_blank", "noopener"));
document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape") closeModal()});

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderProducts();
  });
});
$("search").addEventListener("input",renderProducts);
$("navWhatsApp").href = `https://wa.me/${CONFIG.whatsapp}`;
$("year").textContent = new Date().getFullYear();
renderProducts();

window.openOrder = openOrder;
window.choosePlan = choosePlan;
window.choosePayment = choosePayment;
