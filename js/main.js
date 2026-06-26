/* Main site JS (extracted from index.html). Safe guards added so pages without all elements won't error. */
(function(){
  const services = [
    { id: "svc-office", type: "service", name: "NEW OFFICE IT SETUP", description: "Get your office up and running with hassle-free IT solutions.", price: 950, priceLabel: "Starting AED 950", range: "AED 950-2,800", vat: "+5% VAT", icon: "fa-computer" },
    { id: "svc-cctv", type: "service", name: "CCTV INSTALLATION", description: "Advanced surveillance solutions for secure monitoring.", price: 1200, priceLabel: "Starting AED 1,200", range: "AED 1,200-6,500", vat: "+5% VAT", icon: "fa-video" },
    { id: "svc-amc", type: "service", name: "IT AMC", description: "Comprehensive annual maintenance to keep your systems running smoothly.", price: 1500, priceLabel: "Starting AED 1,500", range: "AED 1,500-7,000", vat: "+5% VAT", icon: "fa-screwdriver-wrench" },
    { id: "svc-virtualization", type: "service", name: "SERVER VIRTUALIZATION SERVICES", description: "Optimize server performance with virtualization technology.", price: 2200, priceLabel: "Starting AED 2,200", range: "AED 2,200-9,500", vat: "+5% VAT", icon: "fa-server" },
    { id: "svc-cabling", type: "service", name: "STRUCTURED CABLING", description: "Organized cabling systems ensuring seamless connectivity.", price: 800, priceLabel: "Starting AED 800", range: "AED 800-4,200", vat: "+5% VAT", icon: "fa-network-wired" },
    { id: "svc-telephone", type: "service", name: "TELEPHONE SOLUTIONS", description: "Modern telephony systems tailored to your business needs.", price: 1100, priceLabel: "Starting AED 1,100", range: "AED 1,100-5,500", vat: "+5% VAT", icon: "fa-phone-volume" },
    { id: "svc-inquiries", type: "service", name: "PRODUCT INQUIRIES", description: "Quick assistance and guidance on all IT product queries.", price: 250, priceLabel: "AED 250-600", range: "AED 250-600", vat: "Inclusive of VAT", icon: "fa-box-open" },
    { id: "svc-hardware", type: "service", name: "IT HARDWARE SERVICES", description: "Power your business with reliable supply, installation, maintenance, and top quality support.", price: 450, priceLabel: "AED 450-950", range: "AED 450-950", vat: "Inclusive of VAT", icon: "fa-laptop-medical" }
  ];

  const products = [
    { id: "prd-laptop", type: "product", name: "Business Laptop", description: "Reliable laptop for office productivity, administration, and sales teams.", price: 2899, priceLabel: "AED 2,899", range: "AED 2,899", vat: "Inclusive of VAT", icon: "fa-laptop" },
    { id: "prd-camera", type: "product", name: "CCTV Camera", description: "HD security camera for office, retail, warehouse, and entrance monitoring.", price: 349, priceLabel: "AED 349", range: "AED 349", vat: "Inclusive of VAT", icon: "fa-camera" },
    { id: "prd-switch", type: "product", name: "24-Port Network Switch", description: "Managed gigabit switch for stable business networking and expansion.", price: 1299, priceLabel: "AED 1,299", range: "AED 1,299", vat: "Inclusive of VAT", icon: "fa-ethernet" },
    { id: "prd-cabling", type: "product", name: "Structured Cabling Kit", description: "Patch panel, cable roll, connectors, and accessories for office fit-outs.", price: 899, priceLabel: "AED 899", range: "AED 899", vat: "Inclusive of VAT", icon: "fa-plug-circle-bolt" },
    { id: "prd-phone", type: "product", name: "IP Phone", description: "Professional desk phone for reception, admin, and business communication.", price: 425, priceLabel: "AED 425", range: "AED 425", vat: "Inclusive of VAT", icon: "fa-phone" },
    { id: "prd-nvr", type: "product", name: "CCTV Recorder NVR", description: "Network video recorder for secure surveillance archiving and playback.", price: 999, priceLabel: "AED 999", range: "AED 999", vat: "Inclusive of VAT", icon: "fa-hard-drive" }
  ];

  const specialOffer = {
    id: "special-audit",
    type: "service",
    name: "Free Thermal Audit for Server Rooms",
    description: "AED 0 with any IT AMC.",
    price: 0,
    priceLabel: "AED 0",
    range: "AED 0",
    vat: "Inclusive of VAT",
    icon: "fa-temperature-half"
  };

  let cart = JSON.parse(localStorage.getItem("gme-cart") || "[]");

  // Safe selectors: elements may be missing on some pages
  const servicesGrid = document.getElementById("servicesGrid");
  const productsGrid = document.getElementById("productsGrid");
  const cartButton = document.getElementById("cartButton");
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const quoteForm = document.getElementById("quoteForm");
  const formCartSummary = document.getElementById("formCartSummary");
  const formSuccess = document.getElementById("formSuccess");
  const interestField = document.getElementById("interestField");
  const cartSidebar = document.getElementById("cartSidebar");

  function formatAED(value) {
    return `AED ${value.toLocaleString()}`;
  }

  function allItems() { return [...services, ...products, specialOffer]; }

  function saveCart() { localStorage.setItem("gme-cart", JSON.stringify(cart)); }

  function addToCart(id) {
    const item = allItems().find(entry => entry.id === id);
    if (!item) return;
    const existing = cart.find(entry => entry.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id: item.id, name: item.name, nameAr: item.nameAr, price: item.price, vat: item.vat, qty: 1 });
    saveCart(); renderCart(); syncFormSummary();
  }

  function removeFromCart(id) { cart = cart.filter(item => item.id !== id); saveCart(); renderCart(); syncFormSummary(); }
  function clearCart() { cart = []; saveCart(); renderCart(); syncFormSummary(); }
  function cartSum() { return cart.reduce((sum, item) => sum + item.price * item.qty, 0); }

  function renderCards(items, target) {
    if (!target) return;
    target.innerHTML = items.map(item => `
      <article class="reveal rounded-[1.75rem] bg-white p-5 shadow-panel transition hover:-translate-y-1">
        <div class="flex items-start justify-between gap-3">
          <div class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gmeMist text-xl text-gmeBlue">
            <i class="fa-solid ${item.icon}"></i>
          </div>
          <span class="rounded-full bg-gmeGreenSoft px-3 py-1 text-xs font-bold text-gmeBlue">${item.range}</span>
        </div>
        <h3 class="mt-5 text-lg font-bold text-gmeBlue">${item.name}</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">${item.description}</p>
        <div class="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
          <span class="rounded-full bg-gmeMist px-3 py-1 text-gmeBlue">🇦🇪 Local Delivery</span>
          <span class="rounded-full border border-gmeGreen/40 px-3 py-1 text-gmeBlue">Halal / Shariah Compliant</span>
        </div>
        <div class="mt-5">
          <p class="text-2xl font-extrabold text-gmeBlue">${item.priceLabel}</p>
          <p class="text-xs font-semibold text-slate-500">${item.vat}</p>
        </div>
        <div class="mt-5 flex flex-wrap gap-3">
          <button onclick="addToCart('${item.id}')" class="rounded-full bg-gmeBlue px-4 py-3 text-sm font-bold text-white transition hover:bg-gmeGreen">Add to Cart - ${formatAED(item.price)}</button>
          <button onclick="requestCallback('${item.id}')" class="rounded-full border border-gmeGreen px-4 py-3 text-sm font-bold text-gmeBlue transition hover:bg-gmeGreen hover:text-white">Request Callback</button>
        </div>
      </article>
    `).join("");
    attachReveal();
  }

  function renderCart() {
    if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartTotal) cartTotal.textContent = formatAED(cartSum());
    if (!cartItems) return;
    if (!cart.length) {
      cartItems.innerHTML = `<div class="rounded-[1.5rem] border border-dashed border-white/20 p-4 text-sm text-white/75">Your quote basket is empty.</div>`;
      return;
    }
    cartItems.innerHTML = cart.map(item => `
      <div class="rounded-[1.5rem] bg-white/10 p-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="font-semibold text-white">${item.name}</p>
            <p class="mt-1 text-sm text-white/75">${formatAED(item.price)} x ${item.qty}</p>
            <p class="mt-1 text-xs text-gmeGreen">${item.vat}</p>
          </div>
          <button onclick="removeFromCart('${item.id}')" class="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold">×</button>
        </div>
      </div>
    `).join("");
  }

  function syncFormSummary() {
    if (!formCartSummary) return;
    if (!cart.length) { formCartSummary.textContent = "None"; return; }
    formCartSummary.textContent = cart.map(item => `${item.name} x${item.qty} (${formatAED(item.price * item.qty)})`).join(" • ");
  }

  function requestCallback(id) {
    const item = allItems().find(entry => entry.id === id);
    if (!item) return;
    if (interestField) interestField.value = item.name;
    const quoteEl = document.getElementById("quote");
    if (quoteEl) { quoteEl.scrollIntoView({ behavior: "smooth" }); if (interestField) interestField.focus(); }
  }

  function addSpecialOffer() { addToCart("special-audit"); requestCallback("special-audit"); }

  function setActiveNavLink() {
    const currentPath = window.location.pathname.toLowerCase();
    document.querySelectorAll('nav a').forEach(link => {
      const linkPath = new URL(link.getAttribute('href'), window.location.href).pathname.toLowerCase();
      const isActive = currentPath === linkPath || currentPath.endsWith(linkPath) || linkPath.endsWith(currentPath);
      if (isActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function submitQuote(event) {
    if (event) event.preventDefault();
    if (!quoteForm) return;
    const formData = new FormData(quoteForm);
    const payload = { name: formData.get("name"), email: formData.get("email"), phone: formData.get("phone"), emirate: formData.get("emirate"), interest: formData.get("interest"), message: formData.get("message"), items: cart, totalAED: cartSum() };
    localStorage.setItem("gme-last-quote", JSON.stringify(payload));
    if (formSuccess) { formSuccess.textContent = "Quote requested. Our UAE team will contact you within 4 business hours."; formSuccess.classList.remove("hidden"); }
    quoteForm.reset(); syncFormSummary();
  }

  function attachReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); }); }, { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node));
  }

  if (cartButton && cartSidebar) cartButton.addEventListener("click", () => { cartSidebar.scrollIntoView({ behavior: "smooth", block: "start" }); });
  const requestQuoteBtn = document.getElementById("requestQuoteFromCart"); if (requestQuoteBtn) requestQuoteBtn.addEventListener("click", () => { const q = document.getElementById("quote"); if (q) q.scrollIntoView({ behavior: "smooth" }); });
  const closeCartBtn = document.getElementById("closeCart"); if (closeCartBtn) closeCartBtn.addEventListener("click", () => { const q = document.getElementById("quote"); if (q) q.scrollIntoView({ behavior: "smooth" }); });
  const clearCartBtn = document.getElementById("clearCart"); if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);
  
  if (quoteForm) quoteForm.addEventListener("submit", submitQuote);

  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeMobileMenuBtn = document.getElementById("closeMobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileDrawerOverlay = document.getElementById("mobileDrawerOverlay");
  const mobileDrawerPanel = document.getElementById("mobileDrawerPanel");

  function openMobileMenu() {
    if(!mobileDrawer) return;
    mobileDrawer.classList.remove("hidden");
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    // Trigger transition
    requestAnimationFrame(() => {
      mobileDrawerOverlay.classList.remove("opacity-0");
      mobileDrawerPanel.classList.remove("translate-x-full", "rtl:-translate-x-full");
    });
  }

  function closeMobileMenu() {
    if(!mobileDrawer) return;
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    mobileDrawerOverlay.classList.add("opacity-0");
    mobileDrawerPanel.classList.add("translate-x-full", "rtl:-translate-x-full");
    setTimeout(() => mobileDrawer.classList.add("hidden"), 300);
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener("click", closeMobileMenu);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener("click", closeMobileMenu);

  // Initial render where applicable
  if (servicesGrid) renderCards(services, servicesGrid);
  if (productsGrid) renderCards(products, productsGrid);
  setActiveNavLink();
  renderCart();
  syncFormSummary();
  attachReveal();

  // Expose a few functions for inline handlers
  window.addToCart = addToCart; window.removeFromCart = removeFromCart; window.requestCallback = requestCallback; window.addSpecialOffer = addSpecialOffer;
})();
