/**
 * ═══════════════════════════════════════════════════════════
 * MONETIZATION MODULE - Toggle On/Off Easily
 * ═══════════════════════════════════════════════════════════
 *
 * USAGE:
 * 1. Include this script in index.html: <script src="monetization.js"></script>
 * 2. Change ENABLED flag below to true/false to toggle monetization
 * 3. Add your Google AdSense Publisher ID and Ad Slot IDs
 * 4. Add your Ko-fi link for donations
 *
 * NO CHANGES NEEDED TO GAME LOGIC OR UI!
 * ═══════════════════════════════════════════════════════════
 */

const MONETIZATION_CONFIG = {
  // ⚠️ MAIN TOGGLE: Set to true to enable, false to disable
  ENABLED: true,

  // Google AdSense Configuration
  ADSENSE: {
    publisherId: 'pub-5925451023602971',    // Your Publisher ID ✓
    topAdSlot: '3993550080',                // Top Ad Unit ✓
    bottomAdSlot: '9928403042'              // Bottom Ad Unit ✓
  },

  // Ko-fi Donation Configuration
  KOFI: {
    enabled: false,                         // Set to true when you have Ko-fi account
    username: 'yourname'                    // Replace with your Ko-fi username
  }
};

// ═══════════════════════════════════════════════════════════
// INITIALIZATION - No changes needed below
// ═══════════════════════════════════════════════════════════

function initMonetization() {
  if (!MONETIZATION_CONFIG.ENABLED) {
    console.log('ℹ️ Monetization is disabled');
    return;
  }

  console.log('💰 Initializing monetization...');

  // Inject CSS
  injectMonetizationStyles();

  // Inject HTML elements
  injectAdContainers();
  if (MONETIZATION_CONFIG.KOFI.enabled) {
    injectDonationButton();
  }

  // Load Google AdSense
  loadGoogleAdSense();

  console.log('✅ Monetization initialized successfully');
}

function injectMonetizationStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    #ad-top, #ad-bottom {
      width: 100%; padding: 10px; background: #0d0d1a;
      border-top: 1px solid #333; border-bottom: 1px solid #333;
      display: flex; justify-content: center; align-items: center;
      min-height: 90px;
    }
    #ad-top { border-top: 2px solid #444; }
    #ad-bottom { border-bottom: 2px solid #444; margin-top: 20px; }

    .donation-btn {
      position: fixed; bottom: 20px; right: 20px; z-index: 100;
      background: linear-gradient(135deg, #f0c040, #f9a825);
      color: #000; border: none; border-radius: 50px;
      padding: 12px 20px; font-weight: 700; cursor: pointer;
      box-shadow: 0 4px 15px #f0c04066; transition: transform 0.2s, box-shadow 0.2s;
      font-size: 0.9rem;
    }
    .donation-btn:hover {
      transform: scale(1.05); box-shadow: 0 6px 20px #f0c04088;
    }
    @media screen and (max-width: 900px) {
      .donation-btn { bottom: 10px; right: 10px; padding: 10px 16px; font-size: 0.8rem; }
    }
  `;
  document.head.appendChild(style);
}

function injectAdContainers() {
  // Top ad container
  const topAd = document.createElement('div');
  topAd.id = 'ad-top';
  topAd.innerHTML = `
    <ins class="adsbygoogle" style="display:block"
         data-ad-client="${MONETIZATION_CONFIG.ADSENSE.publisherId}"
         data-ad-slot="${MONETIZATION_CONFIG.ADSENSE.topAdSlot}"
         data-ad-format="horizontal"></ins>
  `;

  const rotateOverlay = document.getElementById('rotate-overlay');
  if (rotateOverlay && rotateOverlay.nextSibling) {
    rotateOverlay.parentNode.insertBefore(topAd, rotateOverlay.nextSibling);
  } else {
    document.body.prepend(topAd);
  }

  // Bottom ad container
  const bottomAd = document.createElement('div');
  bottomAd.id = 'ad-bottom';
  bottomAd.innerHTML = `
    <ins class="adsbygoogle" style="display:block"
         data-ad-client="${MONETIZATION_CONFIG.ADSENSE.publisherId}"
         data-ad-slot="${MONETIZATION_CONFIG.ADSENSE.bottomAdSlot}"
         data-ad-format="horizontal"></ins>
  `;
  document.body.appendChild(bottomAd);
}

function injectDonationButton() {
  const donationBtn = document.createElement('button');
  donationBtn.className = 'donation-btn';
  donationBtn.textContent = '☕ Support Us';
  donationBtn.onclick = () => {
    window.open(`https://ko-fi.com/${MONETIZATION_CONFIG.KOFI.username}`, '_blank');
  };
  document.body.appendChild(donationBtn);
}

function loadGoogleAdSense() {
  // Load AdSense script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${MONETIZATION_CONFIG.ADSENSE.publisherId}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);

  // Initialize ads
  script.onload = () => {
    if (window.adsbygoogle) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMonetization);
} else {
  initMonetization();
}

console.log('📦 Monetization module loaded');
