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

function formatPrice(aedAmount) {
  const curr = CURRENCIES[currentCurrency];
  const converted = Math.round(aedAmount * curr.rate);
  return `${curr.symbol} ${converted.toLocaleString()}`;
}

function updateAllPrices() {
  document.querySelectorAll('[data-price-aed]').forEach(el => {
    const aed = parseFloat(el.getAttribute('data-price-aed'));
    el.textContent = formatPrice(aed);
  });
  
  // Update currency dropdown button text
  const currBtn = document.getElementById('currencyBtn');
  if (currBtn) {
    currBtn.querySelector('.curr-code').textContent = currentCurrency;
  }
  
  // Recalculate booking total if drawer is open
  calculateBookingTotal();
}

// PACKAGES DATA SOURCED FROM DUBAIDESERTVENTURES.COM
const PACKAGES = [
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
  }
];

// RENDER PACKAGES GRID
function renderPackages(filter = 'all') {
  const container = document.getElementById('packagesGrid');
  if (!container) return;
  
  const filtered = filter === 'all' 
    ? PACKAGES 
    : PACKAGES.filter(p => p.category === filter);
    
  container.innerHTML = filtered.map(pkg => `
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

// FILTER TABS LOGIC
function initFilterTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');
      renderPackages(cat);
    });
  });
}

// BOOKING DRAWER & CALCULATOR
let selectedPackageId = 'evening-premium';
let adultCount = 2;
let childCount = 0;
let transportType = 'sharing';
let addonQuad = 'none';
let addonFalcon = false;

function openBookingDrawer(pkgId = 'evening-premium') {
  selectedPackageId = pkgId;
  const pkgSelect = document.getElementById('bookPackageSelect');
  if (pkgSelect) pkgSelect.value = pkgId;
  
  const drawer = document.getElementById('bookingModal') || document.getElementById('bookingDrawerOverlay');
  if (drawer) drawer.classList.add('show');
  calculateBookingTotal();
}

function closeBookingDrawer() {
  const drawer = document.getElementById('bookingModal') || document.getElementById('bookingDrawerOverlay');
  if (drawer) drawer.classList.remove('show');
}

function updateCounter(type, delta) {
  if (type === 'adult') {
    adultCount = Math.max(1, adultCount + delta);
    document.getElementById('adultCountEl').textContent = adultCount;
  } else if (type === 'child') {
    childCount = Math.max(0, childCount + delta);
    document.getElementById('childCountEl').textContent = childCount;
  }
  calculateBookingTotal();
}

function calculateBookingTotal() {
  const pkg = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];
  let basePrice = pkg.priceAed;
  
  const isVehicleFlat = pkg.unit.includes('vehicle') || pkg.unit.includes('setup');
  
  // Calculate Adults & Children
  let totalAed = isVehicleFlat 
    ? Math.ceil((adultCount + childCount) / 6) * basePrice
    : (adultCount * basePrice) + (childCount * basePrice * 0.75);
  
  // Transport upgrade: Private SUV (+400 AED flat for sharing packages)
  if (transportType === 'private' && !isVehicleFlat) {
    totalAed += 400;
  }
  
  // Addons
  if (addonQuad === '30m') totalAed += (adultCount + childCount) * 150;
  if (addonQuad === '60m') totalAed += (adultCount + childCount) * 250;
  if (addonFalcon) totalAed += (adultCount + childCount) * 50;
  
  // Update breakdown DOM
  const adultSub = document.getElementById('subtotalAdults');
  const childSub = document.getElementById('subtotalChildren');
  const transportSub = document.getElementById('subtotalTransport');
  const grandTotalEl = document.getElementById('grandTotalEl');
  
  if (adultSub) {
    adultSub.textContent = isVehicleFlat 
      ? `Flat Rate: ${formatPrice(basePrice)}`
      : `${adultCount} × ${formatPrice(basePrice)}`;
  }
  if (childSub) {
    childSub.textContent = isVehicleFlat 
      ? `Included in flat rate`
      : `${childCount} × ${formatPrice(basePrice * 0.75)}`;
  }
  if (transportSub) {
    transportSub.textContent = isVehicleFlat ? 'Private Transport Included' : (transportType === 'private' ? formatPrice(400) : 'Free Included');
  }
  if (grandTotalEl) grandTotalEl.textContent = formatPrice(totalAed);
  
  return { pkg, totalAed };
}

// WHATSAPP RESERVATION GENERATOR
function submitBookingToWhatsapp(e) {
  if (e) e.preventDefault();
  
  const { pkg, totalAed } = calculateBookingTotal();
  const name = document.getElementById('bookName')?.value || 'Guest';
  const date = document.getElementById('bookDate')?.value || 'Upcoming Date';
  const hotel = document.getElementById('bookHotel')?.value || 'Dubai Hotel';
  
  const message = `Hello Desert Safari Ventures! 🐪\n\nI would like to book a safari with you:\n` +
    `• Package: *${pkg.title}*\n` +
    `• Date: *${date}*\n` +
    `• Guests: *${adultCount} Adults, ${childCount} Children*\n` +
    `• Transport: *${transportType === 'private' ? 'Private 4x4 SUV (+400 AED)' : 'Sharing 4x4 Pickup (Included)'}*\n` +
    `• Add-ons: *${addonQuad !== 'none' ? 'Quad Bike ' + addonQuad : 'None'}*\n` +
    `• Pick-up Location: *${hotel}*\n` +
    `• Lead Guest: *${name}*\n` +
    `• Estimated Total: *${formatPrice(totalAed)} (Pay on Arrival)*\n\n` +
    `Please confirm my slot! Thank you.`;
    
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/971544508581?text=${encoded}`, '_blank');
}

// FAQ SEARCH & ACCORDION
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  const searchInput = document.getElementById('faqSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? 'block' : 'none';
      });
    });
  }
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

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  renderPackages('all');
  initFilterTabs();
  initFaqAccordion();
  
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

  // Booking drawer form listeners
  const pkgSelect = document.getElementById('bookPackageSelect');
  if (pkgSelect) {
    pkgSelect.addEventListener('change', (e) => {
      selectedPackageId = e.target.value;
      calculateBookingTotal();
    });
  }

  const transportSelect = document.getElementById('transportSelect');
  if (transportSelect) {
    transportSelect.addEventListener('change', (e) => {
      transportType = e.target.value;
      calculateBookingTotal();
    });
  }

  const quadSelect = document.getElementById('quadSelect');
  if (quadSelect) {
    quadSelect.addEventListener('change', (e) => {
      addonQuad = e.target.value;
      calculateBookingTotal();
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
