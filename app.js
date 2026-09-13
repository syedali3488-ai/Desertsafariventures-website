/* ==========================================================================
   DESERT SAFARI VENTURES - INTERACTIVE JAVASCRIPT ENGINE
   ========================================================================== */

// CURRENCY CONVERSION ENGINE
const CURRENCIES = {
  AED: { symbol: 'AED', rate: 1.0, decimals: 0, label: 'AED (Dirham)' },
  USD: { symbol: '$', rate: 0.272, decimals: 0, label: 'USD (US Dollar)' },
  EUR: { symbol: '€', rate: 0.245, decimals: 0, label: 'EUR (Euro)' },
  GBP: { symbol: '£', rate: 0.210, decimals: 0, label: 'GBP (Pound)' },
  SAR: { symbol: 'SAR', rate: 1.02, decimals: 0, label: 'SAR (Riyal)' },
  INR: { symbol: '₹', rate: 22.8, decimals: 0, label: 'INR (Rupee)' }
};

let currentCurrency = 'AED';

// BOOKING DRAWER STATE
let selectedPackageId = 'evening-premium';
let adultCount = 2;
let childCount = 0;
let transportType = 'sharing';
let addonQuad = 'none';

function formatPrice(aedAmount) {
  const curr = CURRENCIES[currentCurrency] || CURRENCIES.AED;
  const converted = Math.round(aedAmount * curr.rate);
  return `${curr.symbol} ${converted.toLocaleString()}`;
}

function updateAllPrices() {
  document.querySelectorAll('[data-price-aed]').forEach(el => {
    const aed = parseFloat(el.getAttribute('data-price-aed'));
    if (!isNaN(aed)) {
      el.textContent = formatPrice(aed);
    }
  });
  
  // Update currency dropdown button text
  const currBtn = document.getElementById('currencyBtn');
  if (currBtn) {
    const currCodeEl = currBtn.querySelector('.curr-code');
    if (currCodeEl) currCodeEl.textContent = currentCurrency;
  }
  
  // Recalculate booking total if drawer is open or available
  calculateBookingTotal();
}

// PACKAGES DATA SOURCED FROM DUBAIDESERTVENTURES.COM
const PACKAGES = [
  {
    id: 'selfdrive-standard',
    category: 'selfdrive',
    title: 'Self-Drive Standard Safari Pass',
    tag: 'BEST VALUE ENTRY',
    rating: '4.8 (310 reviews)',
    duration: '4 Hours • 5:00 PM Camp Arrival',
    priceAed: 35,
    unit: '/ person',
    image: 'assets/images/couple_quad_arabic.jpg',
    popular: false,
    features: [
      'Drive Your Own Vehicle Directly to Desert Camp',
      'Authentic Bedouin Camp Access & Carpet Seating',
      'Full BBQ Buffet Dinner (Veg & Non-Veg, Halal)',
      '3 Live Shows: Tanoura, Fire Show & Belly Dance',
      'Short Camel Ride & Henna Painting for Ladies',
      'Complimentary Tea, Coffee & Bottled Water'
    ]
  },
  {
    id: 'selfdrive-premium',
    category: 'selfdrive',
    title: 'Self-Drive Premium Safari Pass',
    tag: 'PREMIUM CAMP ACCESS',
    rating: '4.9 (240 reviews)',
    duration: '4 Hours • 5:00 PM Camp Arrival',
    priceAed: 59,
    unit: '/ person',
    image: 'assets/images/dune_buggy_carving.jpg',
    popular: false,
    features: [
      'Drive Your Own Vehicle Directly to Desert Camp',
      'Priority Bedouin Camp Seating & Cushion Majlis',
      '5-Star Live BBQ Buffet (Veg, Non-Veg, Halal)',
      '3 Live Stage Shows: Tanoura, Fire Show & Belly Dance',
      'Sandboarding & Golden Hour Sunset Stop',
      'Unlimited Soft Drinks, Arabian Coffee & Water'
    ]
  },
  {
    id: 'selfdrive-vip',
    category: 'selfdrive',
    title: 'Self-Drive VIP Camp Pass',
    tag: 'DIRECT CAMP ACCESS',
    rating: '4.8 (95 reviews)',
    duration: '4 Hours • 5:00 PM Camp Arrival',
    priceAed: 75,
    unit: '/ person',
    image: 'assets/images/selfdrive_vip_camp.jpg',
    popular: false,
    features: [
      'Drive Your Own Vehicle Directly to Camp',
      'VIP Reserved Table Seating & Table Service',
      'Full BBQ Buffet Dinner & Dessert Bar',
      'All 3 Live Shows (Tanoura, Fire, Belly Dance)',
      'Camel Ride, Henna & Shisha Available'
    ]
  },
  {
    id: 'evening-standard',
    category: 'evening',
    title: 'Evening Standard Safari',
    tag: 'BEST VALUE ENTRY',
    rating: '4.8 (310 reviews)',
    duration: '6 Hours • 3:30 PM Pickup',
    priceAed: 79,
    unit: '/ person',
    image: 'assets/images/show_bbq.jpg',
    popular: false,
    features: [
      '15–20 Min Thrilling Dune Bashing',
      'Sharing 4x4 Hotel Pickup & Drop-off',
      'Traditional Carpet Majlis Camp Seating',
      'Full BBQ Buffet Dinner (Veg & Non-Veg)',
      'Live Tanoura & Belly Dance Entertainment',
      'Sunset Photo Stop & Sandboarding',
      'Camel Ride & Complimentary Tea/Coffee'
    ]
  },
  {
    id: 'evening-premium',
    category: 'evening',
    title: 'Evening Premium Safari',
    tag: '★ MOST BOOKED',
    rating: '4.9 (420 reviews)',
    duration: '6–7 Hours • 3:00 PM Pickup',
    priceAed: 129,
    unit: '/ person',
    image: 'assets/images/hero.jpg',
    popular: true,
    features: [
      '25–30 Min High-Dune Bashing (Lehbab Red Dunes)',
      'Free 4x4 SUV Pickup & Drop-off from Hotel',
      'Bedouin Camp Access & Priority Majlis Seating',
      '5-Star Live BBQ Buffet (Veg, Non-Veg, Halal)',
      'Sandboarding + Golden Hour Sunset Stop',
      '3 Live Shows: Tanoura, Fire Show & Belly Dance',
      'Camel Ride & Henna Painting for Ladies',
      'Unlimited Soft Drinks, Arabic Coffee & Water'
    ]
  },
  {
    id: 'evening-vip',
    category: 'vip',
    title: 'Evening VIP Safari',
    tag: 'LUXURY & VIP SEATING',
    rating: '5.0 (180 reviews)',
    duration: '7 Hours • 2:30 PM Pickup',
    priceAed: 299,
    unit: '/ person',
    image: 'assets/images/vip_camp.jpg',
    popular: false,
    features: [
      'Extended Open-Desert Dune Bashing Route',
      'Exclusive VIP Waiter-Served Chair Seating Area',
      'Upgraded Gourmet BBQ Buffet & Live Grill',
      'Falcon Photo Opportunity Included',
      'Traditional Arabic Costume Photography',
      'Double Live Performance Sessions (2x Each)',
      'VIP Welcome Drinks, Dates & Fresh Snacks',
      'Priority Camel Ride & Henna Table'
    ]
  },
  {
    id: 'combo-quad-safari',
    category: 'combos',
    title: 'Quad Bike + Evening Safari Combo',
    tag: 'ULTIMATE THRILL',
    rating: '4.9 (250 reviews)',
    duration: '7 Hours • 2:30 PM Pickup',
    priceAed: 299,
    unit: '/ person',
    image: 'assets/images/quad_buggy.jpg',
    popular: false,
    features: [
      '30 Min Self-Drive Quad Bike (Yamaha 350cc)',
      'Full Evening Premium Desert Safari Included',
      'High-Dune Land Cruiser Dune Bashing',
      '5-Star BBQ Dinner & Live Show Performances',
      'Safety Helmet, Goggles & Briefing Provided',
      'Hotel Pickup & Return Included'
    ]
  },
  {
    id: 'sunrise-safari',
    category: 'morning',
    title: 'Sunrise Desert Safari (Private)',
    tag: 'EARLY BIRD SUNRISE',
    rating: '4.9 (140 reviews)',
    duration: '4 Hours • 4:30 AM Pickup',
    priceAed: 419,
    unit: '/ vehicle (up to 6 pax)',
    image: 'assets/images/sunrise_desert_safari.jpg',
    popular: false,
    features: [
      'Watch Sunrise Over Crisp Desert Sand Dunes',
      'Private Land Cruiser Pick & Drop',
      '30 Min Deep Dune Bashing Experience',
      'Sandboarding & Sunrise Photography',
      'Light Breakfast & Fresh Arabian Coffee',
      'Peaceful Morning Desert Serenity'
    ]
  },
  {
    id: 'morning-short',
    category: 'short',
    title: 'Morning Short Desert Safari (Private)',
    tag: 'FAST MORNING ADVENTURE',
    rating: '4.9 (384 reviews)',
    duration: '4 Hours • 8:00 AM Pickup',
    priceAed: 449,
    unit: '/ vehicle (up to 6 pax)',
    image: 'assets/images/camel_falcon.jpg',
    popular: false,
    features: [
      'Private 4x4 SUV Pickup & Return (8:00 AM – 12:00 PM)',
      '30–45 Min Lehbab Red Dune Bashing',
      'Sandboarding Down High Red Dunes',
      'Camel Ride & Scenic Desert Photo Stop',
      'Arabic Coffee, Dates & Bottled Water Provided',
      'Back to Hotel by Noon for Afternoon Plans',
      'Flat Rate per Vehicle (Up to 6 Guests Included)'
    ]
  },
  {
    id: 'evening-short',
    category: 'short',
    title: 'Evening Short Desert Safari (Private)',
    tag: 'NO CAMP • PRIVATE SUNSET',
    rating: '4.9 (384 reviews)',
    duration: '4 Hours • 3:30 PM Pickup',
    priceAed: 479,
    unit: '/ vehicle (up to 6 pax)',
    image: 'assets/images/buggy_canam_action.jpg',
    popular: false,
    features: [
      'Private 4x4 SUV Pickup & Drop-off (3:30 PM – 7:30 PM)',
      '45–60 Min High-Dune Bashing (Lehbab Red Dunes)',
      'Sandboarding + 30-Min Sunset Photo Session',
      'Short Camel Ride Experience & Arabian Coffee',
      'Desert Focus — Skip the Camp, BBQ & Shows',
      'Back at Hotel by 7:30 PM for Evening Dinner',
      'Flat Rate per Vehicle (Up to 6 Guests Included)'
    ]
  },
  {
    id: 'vip-traditional-arabic',
    category: 'vip',
    title: 'VIP Traditional Arabic Safari (Private)',
    tag: 'EXCLUSIVE ARABIC LUXURY',
    rating: '5.0 (195 reviews)',
    duration: '6–7 Hours • 2:30 PM Pickup',
    priceAed: 999,
    unit: '/ vehicle (up to 6 pax)',
    image: 'assets/images/falcon_sunset_portrait.jpg',
    popular: false,
    features: [
      'Private Land Cruiser 4x4 SUV Pick-up & Drop-off',
      'Authentic Traditional Arabic Bedouin Setup',
      '35+ Min Deep Red Dune Bashing & Sandboarding',
      'Gourmet Live BBQ Buffet & Seafood Feast',
      'Falcon Photo Opportunity & Arabic Costume',
      'VIP Seating & Unlimited Drinks, Coffee & Shisha',
      '7 Live Performances: Belly Dance, Fire Show & Tanoura',
      'Flat Rate per Vehicle (Up to 6 Guests Included)'
    ]
  },
  {
    id: 'arabian-elegance-birthday',
    category: 'birthday',
    title: 'Arabian Elegance Birthday Retreat',
    tag: '★ BIRTHDAY SPECIAL',
    rating: '5.0 (320 reviews)',
    duration: '6–7 Hours • 3:00 PM Pickup',
    priceAed: 999,
    unit: '/ package (2 guests)',
    image: 'assets/images/birthday_evening.jpg',
    popular: true,
    features: [
      'Pick & Drop From Your Location',
      'Desert Dune Bashing',
      'Camel Ride',
      'Sand Boarding',
      'Desert Photography',
      'Professional Couple Photos',
      'Fresh Flower Bouquet',
      'Celebration Cake',
      'Couple Balloons',
      'Romantic Surprise',
      'Traditional Arabic Tea & Coffee',
      'Refreshments & Mineral Water',
      'Fire Show',
      'Tanoura Show'
    ]
  },
  {
    id: 'private-camp-setup',
    category: 'vip',
    title: 'Private Desert Camp Setup',
    tag: 'ULTIMATE PRIVATE OASIS',
    rating: '5.0 (88 reviews)',
    duration: '7 Hours • 2:00 PM Pickup',
    priceAed: 2599,
    unit: '/ setup (private camp)',
    image: 'assets/images/group_quad_adventure.jpg',
    popular: false,
    features: [
      'Exclusive 100% Private Desert Camp Setup',
      'Dedicated Luxury Fleet Pick-up & Drop-off',
      'Private Chef & Tailored Gourmet Dining Menu',
      'Private Live Show Performances & Fire Artist',
      'Private Dune Bashing, Sandboarding & Quad Access',
      'Dedicated Private Butler & Waiter Service',
      'Custom Setup for Birthdays, Proposals & Events',
      'Complete Privacy in the Deep Lehbab Red Dunes'
    ]
  }
];

// DYNAMIC MODAL DRAWER CREATION & LOOKUP
function getBookingModalElement() {
  let modal = document.getElementById('bookingModal') || document.getElementById('bookingDrawerOverlay');
  if (!modal) {
    // Dynamically inject booking modal drawer markup if page lacks one
    const div = document.createElement('div');
    div.className = 'modal-overlay';
    div.id = 'bookingModal';
    div.onclick = closeBookingDrawer;
    div.innerHTML = `
      <div class="booking-drawer" onclick="event.stopPropagation()">
        <div class="drawer-header">
          <h3 class="drawer-title">Reserve Your Desert Safari</h3>
          <button class="close-btn" onclick="closeBookingDrawer()" aria-label="Close">✕</button>
        </div>
        <div class="drawer-body">
          <form id="bookingForm" onsubmit="submitBookingToWhatsapp(event)">
            <div class="form-group">
              <label class="form-label">Select Package</label>
              <select class="form-control" id="bookPackageSelect">
                ${PACKAGES.map(p => `<option value="${p.id}">${p.title} (${formatPrice(p.priceAed)})</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Safari Date</label>
              <input type="date" class="form-control" id="bookDate" required>
            </div>
            <div class="form-group">
              <label class="form-label">Number of Guests</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="counter-wrap">
                  <span>Adults</span>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <button type="button" class="counter-btn" onclick="updateCounter('adult', -1)">-</button>
                    <span id="adultCountEl" style="font-weight: 700;">2</span>
                    <button type="button" class="counter-btn" onclick="updateCounter('adult', 1)">+</button>
                  </div>
                </div>
                <div class="counter-wrap">
                  <span>Kids (3-11y, 25% Off)</span>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <button type="button" class="counter-btn" onclick="updateCounter('child', -1)">-</button>
                    <span id="childCountEl" style="font-weight: 700;">0</span>
                    <button type="button" class="counter-btn" onclick="updateCounter('child', 1)">+</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Transport Option</label>
              <select class="form-control" id="transportSelect">
                <option value="sharing">Sharing 4x4 SUV (Included Free)</option>
                <option value="private">Private 4x4 Land Cruiser (+400 AED Flat)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Add-on Quad Bike Ride</label>
              <select class="form-control" id="quadSelect">
                <option value="none">No Quad Bike</option>
                <option value="30m">30 Min Quad Bike (+150 AED / pax)</option>
                <option value="60m">60 Min Quad Bike (+250 AED / pax)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Lead Guest Full Name</label>
              <input type="text" class="form-control" id="bookName" placeholder="e.g. John Smith" required>
            </div>
            <div class="form-group">
              <label class="form-label">Hotel / Pick-Up Location</label>
              <input type="text" class="form-control" id="bookHotel" placeholder="e.g. Atlantis The Palm / Address Downtown" required>
            </div>
            <div class="price-breakdown">
              <div class="breakdown-row">
                <span>Adults Total</span>
                <span id="subtotalAdults">2 × AED 129</span>
              </div>
              <div class="breakdown-row">
                <span>Children Total</span>
                <span id="subtotalChildren">0 × AED 89</span>
              </div>
              <div class="breakdown-row">
                <span>Transport</span>
                <span id="subtotalTransport">Free Included</span>
              </div>
              <div class="breakdown-total">
                <span>Total Payable on Arrival</span>
                <span id="grandTotalEl" style="color: var(--brand-gold);">AED 238</span>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 16px;">
              <span>Reserve via WhatsApp (No Payment Needed Now)</span>
            </button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(div);
    modal = div;
  }
  bindDrawerFormEvents();
  return modal;
}

function bindDrawerFormEvents() {
  const pkgSelect = document.getElementById('bookPackageSelect');
  if (pkgSelect && !pkgSelect._hasListener) {
    pkgSelect._hasListener = true;
    pkgSelect.addEventListener('change', (e) => {
      selectedPackageId = e.target.value;
      calculateBookingTotal();
    });
  }

  const transportSelect = document.getElementById('transportSelect');
  if (transportSelect && !transportSelect._hasListener) {
    transportSelect._hasListener = true;
    transportSelect.addEventListener('change', (e) => {
      transportType = e.target.value;
      calculateBookingTotal();
    });
  }

  const quadSelect = document.getElementById('quadSelect');
  if (quadSelect && !quadSelect._hasListener) {
    quadSelect._hasListener = true;
    quadSelect.addEventListener('change', (e) => {
      addonQuad = e.target.value;
      calculateBookingTotal();
    });
  }
}

function getPagePackageId() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('vip-safari')) return 'evening-vip';
  if (path.includes('standard-safari')) return 'evening-standard';
  if (path.includes('quad-buggy')) return 'combo-quad-safari';
  if (path.includes('morning-safari')) return 'sunrise-safari';
  if (path.includes('evening-premium')) return 'evening-premium';
  return selectedPackageId || 'evening-premium';
}

function openBookingDrawer(packageId) {
  const modal = getBookingModalElement();
  if (!modal) return;

  const targetPkgId = packageId || getPagePackageId();
  selectedPackageId = targetPkgId;

  const pkgSelect = document.getElementById('bookPackageSelect');
  if (pkgSelect) {
    pkgSelect.value = targetPkgId;
  }

  const dateInput = document.getElementById('bookDate');
  if (dateInput && !dateInput.value) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  calculateBookingTotal();
  modal.classList.add('show');
}

function openBookingModal(packageId) {
  openBookingDrawer(packageId);
}

function closeBookingDrawer() {
  const modal = document.getElementById('bookingModal') || document.getElementById('bookingDrawerOverlay');
  if (modal) {
    modal.classList.remove('show');
  }
}

function closeBookingModal() {
  closeBookingDrawer();
}

function updateCounter(type, delta) {
  if (type === 'adult') {
    adultCount = Math.max(1, adultCount + delta);
    const el = document.getElementById('adultCountEl');
    if (el) el.textContent = adultCount;
  } else if (type === 'child') {
    childCount = Math.max(0, childCount + delta);
    const el = document.getElementById('childCountEl');
    if (el) el.textContent = childCount;
  }
  calculateBookingTotal();
}

function calculateBookingTotal() {
  const pkgSelect = document.getElementById('bookPackageSelect');
  if (pkgSelect && pkgSelect.value) {
    selectedPackageId = pkgSelect.value;
  }

  const pkg = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];
  const pricePerAdult = pkg.priceAed;
  const isVehicleFlat = pkg.unit.includes('vehicle') || pkg.unit.includes('setup') || pkg.unit.includes('package');

  let baseTotal = 0;
  let pricePerChild = Math.round(pricePerAdult * 0.75);

  if (isVehicleFlat) {
    baseTotal = pricePerAdult;
  } else {
    baseTotal = (adultCount * pricePerAdult) + (childCount * pricePerChild);
  }

  // Transport
  const transportSel = document.getElementById('transportSelect');
  if (transportSel) transportType = transportSel.value;
  const transportCost = (transportType === 'private') ? 400 : 0;

  // Quad
  const quadSel = document.getElementById('quadSelect');
  if (quadSel) addonQuad = quadSel.value;
  let quadCostPerPax = 0;
  if (addonQuad === '30m') quadCostPerPax = 150;
  if (addonQuad === '60m') quadCostPerPax = 250;
  const totalQuadCost = quadCostPerPax * (adultCount + childCount);

  const totalAed = baseTotal + transportCost + totalQuadCost;

  // Update DOM Elements
  const adultSubEl = document.getElementById('subtotalAdults');
  if (adultSubEl) {
    adultSubEl.textContent = isVehicleFlat
      ? `1 Flat Rate (${formatPrice(pricePerAdult)})`
      : `${adultCount} × ${formatPrice(pricePerAdult)}`;
  }

  const childSubEl = document.getElementById('subtotalChildren');
  if (childSubEl) {
    childSubEl.textContent = isVehicleFlat
      ? `Included (up to 6 guests)`
      : `${childCount} × ${formatPrice(pricePerChild)}`;
  }

  const transportSubEl = document.getElementById('subtotalTransport');
  if (transportSubEl) {
    transportSubEl.textContent = transportCost > 0 ? formatPrice(transportCost) : 'Free Included';
  }

  const grandTotalEl = document.getElementById('grandTotalEl');
  if (grandTotalEl) {
    grandTotalEl.textContent = formatPrice(totalAed);
  }
}

// SUBMIT BOOKING RESERVATION TO WHATSAPP
function submitBookingToWhatsapp(e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  const nameInput = document.getElementById('bookName');
  const hotelInput = document.getElementById('bookHotel');
  const dateInput = document.getElementById('bookDate');
  const modal = document.getElementById('bookingModal') || document.getElementById('bookingDrawerOverlay');

  // If user clicked a direct "WhatsApp" button and drawer is NOT visible, open the drawer for them
  if (!e && modal && !modal.classList.contains('show')) {
    openBookingDrawer(getPagePackageId());
    return;
  }

  // If input fields exist, check if user has filled name/hotel/date
  if (nameInput && hotelInput) {
    const name = nameInput.value.trim();
    const hotel = hotelInput.value.trim();
    const date = dateInput ? dateInput.value : '';

    if (!name || !hotel) {
      if (modal && !modal.classList.contains('show')) {
        openBookingDrawer(getPagePackageId());
        return;
      }
      alert('Please fill in your Lead Guest Name and Hotel / Pickup Location.');
      if (!name) nameInput.focus();
      else if (!hotel) hotelInput.focus();
      return;
    }

    const pkgSelect = document.getElementById('bookPackageSelect');
    const selectedId = pkgSelect ? pkgSelect.value : selectedPackageId;
    const pkg = PACKAGES.find(p => p.id === selectedId) || PACKAGES[0];

    const grandTotalEl = document.getElementById('grandTotalEl');
    const grandTotalText = grandTotalEl ? grandTotalEl.textContent : '';

    const transportSel = document.getElementById('transportSelect');
    const transportText = transportSel ? transportSel.options[transportSel.selectedIndex].text : 'Sharing 4x4 SUV';

    const quadSel = document.getElementById('quadSelect');
    const quadText = quadSel ? quadSel.options[quadSel.selectedIndex].text : 'None';

    let msg = `🌵 *DESERT SAFARI RESERVATION INQUIRY* 🌵\n`;
    msg += `-----------------------------------\n`;
    msg += `📦 *Package:* ${pkg.title}\n`;
    if (date) msg += `📅 *Date:* ${date}\n`;
    msg += `👥 *Guests:* ${adultCount} Adult(s)${childCount > 0 ? `, ${childCount} Child(ren)` : ''}\n`;
    msg += `🚗 *Transport:* ${transportText}\n`;
    if (quadText && !quadText.includes('No Quad')) msg += `🏍️ *Quad Add-on:* ${quadText}\n`;
    msg += `👤 *Lead Guest:* ${name}\n`;
    msg += `🏨 *Pickup Location:* ${hotel}\n`;
    if (grandTotalText) msg += `💰 *Total Estimated Price:* ${grandTotalText}\n`;
    msg += `-----------------------------------\n`;
    msg += `Please confirm booking availability & pickup details. Thank you!`;

    const waUrl = `https://wa.me/971544508581?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    closeBookingDrawer();
    return;
  }

  // Fallback for general WhatsApp inquiry
  const generalMsg = `Hello Desert Safari Ventures, I would like to inquire about booking a desert safari package.`;
  const waUrl = `https://wa.me/971544508581?text=${encodeURIComponent(generalMsg)}`;
  window.open(waUrl, '_blank');
}

function populatePackageDropdowns() {
  document.querySelectorAll('#bookPackageSelect, #bookPackageSelectModal').forEach(select => {
    select.innerHTML = PACKAGES.map(p => 
      `<option value="${p.id}">${p.title} (${formatPrice(p.priceAed)})</option>`
    ).join('');
  });
}

function renderPackages(filter = 'all') {
  const container = document.getElementById('packagesGrid');
  if (!container) return;
  
  const filtered = filter === 'all' 
    ? PACKAGES 
    : PACKAGES.filter(p => p.category === filter);

  // Ensure cheap/standard packages are at top and costly/premium packages at bottom
  const sorted = [...filtered].sort((a, b) => a.priceAed - b.priceAed);
    
  container.innerHTML = sorted.map(pkg => `
    <div class="package-card ${pkg.popular ? 'popular' : ''}">
      ${pkg.popular ? `<span class="badge-popular">${pkg.tag}</span>` : ''}
      <div class="package-img-wrap">
        <img src="${pkg.image}" alt="${pkg.title}" class="package-img" loading="lazy">
        <div class="package-img-overlay"></div>
      </div>
      <div class="package-body">
        <div class="package-header">
          <div class="package-category">${pkg.tag}</div>
          <h3 class="package-title">${pkg.title}</h3>
          <div class="package-meta">
            <span>⏱️ ${pkg.duration}</span>
            <span>⭐ ${pkg.rating}</span>
          </div>
        </div>
        <ul class="package-features">
          ${pkg.features.map(f => `
            <li class="feature-item">
              <svg class="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
        <div class="package-footer">
          <div class="price-box">
            <span class="price-lbl">Starting From</span>
            <div class="price-value-wrap">
              <span class="price-value" data-price-aed="${pkg.priceAed}">${formatPrice(pkg.priceAed)}</span>
              <span class="price-unit">${pkg.unit}</span>
            </div>
          </div>
          <button class="btn btn-primary" onclick="openBookingDrawer('${pkg.id}')">
            Book Now
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// LIGHTBOX GALLERY
function openLightbox(imgSrc, title) {
  const overlay = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  if (overlay && img) {
    img.src = imgSrc;
    if (caption) caption.textContent = title;
    overlay.classList.add('show');
  }
}

function closeLightbox() {
  const overlay = document.getElementById('lightboxModal');
  if (overlay) overlay.classList.remove('show');
}

// FILTER TABS LOGIC
function initFilterTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      renderPackages(category);
    });
  });
}

// FAQ ACCORDION LOGIC
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

// MOBILE MENU TOGGLE LOGIC
function initMobileMenu() {
  const burgerBtn = document.getElementById('burgerBtn') || document.querySelector('.burger-btn');
  const navMenu = document.getElementById('navMenu') || document.querySelector('.nav-menu');

  if (!burgerBtn || !navMenu) return;

  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu.classList.toggle('active');
    
    const openIcon = burgerBtn.querySelector('.burger-icon-open');
    const closeIcon = burgerBtn.querySelector('.burger-icon-close');
    if (openIcon && closeIcon) {
      openIcon.style.display = isActive ? 'none' : 'block';
      closeIcon.style.display = isActive ? 'block' : 'none';
    }
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const openIcon = burgerBtn.querySelector('.burger-icon-open');
      const closeIcon = burgerBtn.querySelector('.burger-icon-close');
      if (openIcon && closeIcon) {
        openIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !e.target.closest('#burgerBtn, .burger-btn')) {
      navMenu.classList.remove('active');
      const openIcon = burgerBtn.querySelector('.burger-icon-open');
      const closeIcon = burgerBtn.querySelector('.burger-icon-close');
      if (openIcon && closeIcon) {
        openIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  renderPackages('all');
  populatePackageDropdowns();
  initFilterTabs();
  initFaqAccordion();
  bindDrawerFormEvents();
  
  // Currency Dropdown toggle
  const currBtn = document.getElementById('currencyBtn');
  const currDropdown = document.getElementById('currencyDropdown');
  if (currBtn && currDropdown) {
    currBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', () => {
      currDropdown.classList.remove('show');
    });
    
    document.querySelectorAll('.currency-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        currentCurrency = opt.getAttribute('data-curr');
        document.querySelectorAll('.currency-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        updateAllPrices();
      });
    });
  }

  // Header Scroll blur
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
});
