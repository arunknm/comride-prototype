/**
 * nav-module.js — Comride Global Bottom Navigation
 * Single source of truth for the bottom nav bar across all app pages.
 * Auto-detects current page and highlights the correct tab.
 */
(function () {

  // ── Tab definitions ───────────────────────────────────────────────────────
  // 'match' = page filename prefixes that belong to this tab
  const TABS = [
    {
      label : 'Explore',
      href  : 'home.html',
      match : ['home', 'notifications', 'search-results', 'comrade-profile',
               'brand-profile', 'club-profile', 'ai-suggestions',
               'influencer-profile', 'rxz-community',
               'experiences'],
      // Compass — suits "Explore" perfectly
      icon  : `<circle cx="12" cy="12" r="10"/>
               <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>`
    },
    {
      label : 'Ride',
      href  : 'ride-tab.html',
      match : ['ride-tab', 'discover', 'create-ride', 'admin-ride',
               'admin-accepted', 'invited-ride', 'request-to-join',
               'ride-details', 'my-ride-detail', 'route-builder',
               'trip-start', 'tracking', 'end-ride', 'groups',
               'challenges'],
      // Bicycle / two-wheel vehicle — clear for a ride app
      icon  : `<circle cx="18.5" cy="17.5" r="3.5"/>
               <circle cx="5.5" cy="17.5" r="3.5"/>
               <circle cx="15" cy="5" r="1"/>
               <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>`
    },
    {
      label : 'Shop',
      href  : 'marketplace.html',
      match : ['marketplace', 'product-detail'],
      // Store-front / shop — cleaner than a bag
      icon  : `<path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/>
               <path d="M3 9l2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
               <line x1="12" y1="3" x2="12" y2="9"/>`
    },
    {
      label : 'Profile',
      href  : 'profile.html',
      match : ['profile', 'settings', 'analytics', 'rewards',
               'insurance', 'payments', 'comride-pro',
               'garage', 'mechanic', 'sos'],
      // Rounded person silhouette — universally recognised
      icon  : `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
               <circle cx="12" cy="8" r="4"/>`
    }
  ];

  // ── Active-tab detection ───────────────────────────────────────────────────
  const page = (window.location.pathname.split('/').pop() || 'home.html')
                 .replace('.html', '');

  function isActive(tab) {
    return tab.match.some(m => page === m || page.startsWith(m));
  }

  // ── Build nav element ─────────────────────────────────────────────────────
  function buildNav() {
    const nav = document.createElement('nav');
    nav.id = 'cr-bottom-nav';
    nav.style.cssText = [
      'position:fixed', 'bottom:0', 'left:0', 'right:0',
      'display:flex', 'align-items:center', 'justify-content:space-around',
      'background:rgba(0,0,0,0.96)',
      'backdrop-filter:blur(20px)', '-webkit-backdrop-filter:blur(20px)',
      'border-top:1px solid rgba(255,255,255,0.08)',
      'height:72px', 'z-index:500',
      'box-sizing:border-box', 'padding:0 4px'
    ].join(';');

    TABS.forEach(tab => {
      const active = isActive(tab);
      const color  = active ? '#E2FF3B' : 'rgba(255,255,255,0.42)';
      const weight = active ? '700'     : '500';
      const bg     = active ? 'background:rgba(226,255,59,0.1);border-radius:12px;padding:6px 18px;'
                            : 'padding:6px 10px;';

      const a = document.createElement('a');
      a.href = tab.href;
      a.style.textDecoration = 'none';
      a.style.flex = '1';
      a.style.display = 'flex';
      a.style.justifyContent = 'center';

      a.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px;${bg}transition:opacity .15s">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
               stroke="${color}" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            ${tab.icon}
          </svg>
          <span style="font-family:'Manrope',sans-serif;font-size:10px;
                       font-weight:${weight};color:${color};
                       ${active ? 'letter-spacing:0.02em' : ''}">
            ${tab.label}
          </span>
        </div>`;

      // Press feedback
      a.addEventListener('mousedown',  () => { a.style.opacity = '0.7'; a.style.transform = 'scale(0.94)'; });
      a.addEventListener('mouseup',    () => { a.style.opacity = '';    a.style.transform = ''; });
      a.addEventListener('touchstart', () => { a.style.opacity = '0.7'; a.style.transform = 'scale(0.94)'; }, { passive: true });
      a.addEventListener('touchend',   () => { a.style.opacity = '';    a.style.transform = ''; }, { passive: true });

      nav.appendChild(a);
    });

    return nav;
  }

  // ── Inject ────────────────────────────────────────────────────────────────
  function inject() {
    // Remove any pre-existing bottom nav (static HTML or previous injection)
    document.querySelectorAll('nav, #cr-bottom-nav').forEach(el => {
      const s = el.getAttribute('style') || '';
      if (el.id === 'cr-bottom-nav' || s.includes('bottom:0') || s.includes('bottom: 0')) {
        el.remove();
      }
    });
    document.body.appendChild(buildNav());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();

// ── Shrink top header on scroll ───────────────────────────────────────────────
(function () {
  function setupHeaderScroll() {
    var header = document.querySelector('header');
    if (!header) return;

    // Find the inner row div — it carries the explicit height
    var inner = header.querySelector('div[style*="height:64px"]')
              || header.querySelector('div[style*="height:56px"]');
    if (!inner) return;

    var fullH   = inner.style.height || '64px';   // e.g. "64px"
    var shrunK  = '46px';

    // Smooth transition on header background + inner row height
    header.style.transition = 'box-shadow 0.25s ease';
    inner.style.transition  = 'height 0.25s ease';

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 12) {
            inner.style.height = shrunK;
            header.style.boxShadow = '0 2px 40px rgba(0,0,0,0.75),inset 0 1px 0 rgba(255,255,255,0.05)';
          } else {
            inner.style.height = fullH;
            header.style.boxShadow = '0 1px 32px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeaderScroll);
  } else {
    setupHeaderScroll();
  }
})();
