/**
 * skeleton-module.js — Comride Splash + Shimmer Skeleton Loading
 * Sequence per page:
 *   1. Splash screen — logo centred, black bg, brief hold
 *   2. Splash fades out → skeleton shimmer fades in
 *   3. Skeleton fades out → real content reveals with slide-up
 */
(function () {

  // ── Synchronously hide page before first paint ────────────────────────────
  // Sets visibility on <html> (no !important needed, no body required yet).
  // Overridden by plain inline style in inject() — can't get stuck.
  document.documentElement.style.visibility = 'hidden';

  // ── Styles ─────────────────────────────────────────────────────────────────
  var styleTag = document.createElement('style');
  styleTag.textContent = [

    /* ── Black background so there's never a white flash ── */
    'html,body{background:#000!important}',

    /* ── Opaque cover: sits behind skeleton, hides real content ── */
    '#cr-cover{',
    '  position:fixed;inset:0;z-index:9997;',
    '  background:#000;pointer-events:none;',
    '  transition:opacity 0.35s ease',
    '}',

    /* ── All panels/drawers stay hidden until cover is fully gone ── */
    '#menu-drawer,#drawer,#drawer-backdrop,#notif-panel,#notif-backdrop{',
    '  visibility:hidden!important;transition:none!important',
    '}',
    '#menu-drawer.cr-visible,#drawer.cr-visible,#notif-panel.cr-visible{',
    '  visibility:visible!important;transition:transform 0.3s ease!important',
    '}',
    '#drawer-backdrop.cr-visible,#notif-backdrop.cr-visible{',
    '  visibility:visible!important;transition:opacity 0.3s ease!important',
    '}',

    /* ── Splash ── */
    '.cr-splash{',
    '  position:fixed;inset:0;z-index:10000;',
    '  background:#000;',
    '  display:flex;flex-direction:column;align-items:center;justify-content:center;',
    '  transition:opacity 0.4s ease',
    '}',
    '.cr-splash-logo{width:180px;height:auto;animation:cr-logo-in 0.5s cubic-bezier(0.16,1,0.3,1) both}',
    '@keyframes cr-logo-in{',
    '  from{opacity:0;transform:scale(0.82) translateY(10px)}',
    '  to{opacity:1;transform:scale(1) translateY(0)}',
    '}',
    '.cr-splash-ring{',
    '  width:72px;height:72px;border-radius:50%;position:absolute;',
    '  background:radial-gradient(circle,rgba(226,255,59,0.18) 0%,transparent 70%);',
    '  animation:cr-ring-pulse 1.6s ease-in-out infinite',
    '}',
    '@keyframes cr-ring-pulse{0%,100%{transform:scale(0.8);opacity:0.4}50%{transform:scale(1.6);opacity:0}}',

    /* ── Shimmer skeleton (per-module independent shimmer) ── */
    '@keyframes cr-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}',
    '.cr-sk{',
    '  background:linear-gradient(90deg,',
    '    rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.055) 35%,',
    '    rgba(255,255,255,0.13) 50%,',
    '    rgba(255,255,255,0.055) 65%,rgba(255,255,255,0.055) 100%);',
    '  background-size:1200px 100%;',
    '  animation:cr-shimmer 1.5s linear infinite;',
    '  border-radius:10px;flex-shrink:0',
    '}',
    /* per-position phase offsets so each shimmer block sweeps independently */
    '.cr-sk:nth-child(1n){animation-delay:0s}',
    '.cr-sk:nth-child(2n){animation-delay:-0.35s}',
    '.cr-sk:nth-child(3n){animation-delay:-0.7s}',
    '.cr-sk:nth-child(4n){animation-delay:-1.05s}',
    '.cr-sk:nth-child(5n){animation-delay:-1.4s}',
    '.cr-sk:nth-child(6n){animation-delay:-0.18s}',
    '.cr-sk:nth-child(7n){animation-delay:-0.55s}',
    '.cr-sk:nth-child(11n){animation-delay:-0.9s}',
    '.cr-sk-r{border-radius:999px}',
    '.cr-sk-overlay{',
    '  position:fixed;inset:0;z-index:9999;',
    '  background:#000;overflow:hidden;',
    '  padding-top:calc(env(safe-area-inset-top,0px) + 64px);padding-bottom:80px;',
    '  opacity:0;transition:opacity 0.28s ease',
    '}'

  ].join('');
  document.head.appendChild(styleTag);

  // ── Helpers ───────────────────────────────────────────────────────────────
  var page = (window.location.pathname.split('/').pop() || 'home.html').replace('.html', '');

  // shorthand to create an element with inline CSS + optional classes
  function el(tag, css, cls) {
    var d = document.createElement(tag || 'div');
    if (css) d.style.cssText = css;
    if (cls) d.className = cls;
    return d;
  }
  // a shimmer block
  function sk(w, h, extraCss, pill) {
    var d = el('div', 'width:' + w + ';height:' + h + ';' + (extraCss || ''), 'cr-sk' + (pill ? ' cr-sk-r' : ''));
    return d;
  }
  // a flex row container
  function row(css) { return el('div', 'display:flex;align-items:center;' + (css || '')); }
  // column flex
  function col(css) { return el('div', 'display:flex;flex-direction:column;' + (css || '')); }
  // append multiple children
  function append(parent) {
    for (var i = 1; i < arguments.length; i++) parent.appendChild(arguments[i]);
    return parent;
  }

  // ── Skeleton builders ─────────────────────────────────────────────────────

  // Reusable: top header bar (logo + icons)
  function headerSkel() {
    var h = row('justify-content:space-between;padding:0 16px;height:64px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(8,8,8,0.9)');
    append(h, sk('88px', '20px'), row('gap:16px;' , append(row(), sk('22px','22px','',true), sk('22px','22px','',true))));
    return h;
  }

  // Reusable: bottom nav bar
  function navSkel() {
    var nav = row('position:fixed;bottom:0;left:0;right:0;height:72px;background:rgba(0,0,0,0.96);border-top:1px solid rgba(255,255,255,0.08);justify-content:space-around;padding:0 8px');
    for (var i = 0; i < 4; i++) {
      var item = col('align-items:center;gap:5px;padding:8px 12px');
      append(item, sk('22px','22px','',true), sk('32px','8px','',true));
      nav.appendChild(item);
    }
    return nav;
  }

  // Reusable: avatar + name+handle lines
  function avatarRow(avatarSize, line1W, line2W) {
    var r = row('gap:10px;padding:0 16px');
    var circle = sk(avatarSize||'40px', avatarSize||'40px', '', true);
    var lines = col('gap:5px');
    append(lines, sk(line1W||'120px','11px'), sk(line2W||'80px','9px'));
    return append(r, circle, lines);
  }

  // ── POST CARD skeleton (home feed) ────────────────────────────────────────
  function postCardSkel(hasImage) {
    var card = col('margin:0 16px 16px;border-radius:10px;background:rgba(255,255,255,0.04);overflow:hidden;border:1px solid rgba(255,255,255,0.06)');
    var top = row('padding:12px;gap:10px;align-items:center');
    var circle = sk('38px','38px','',true);
    var lines = col('gap:5px;flex:1');
    append(lines, sk('110px','10px'), sk('72px','8px'));
    append(top, circle, lines, sk('22px','22px','',true));
    card.appendChild(top);
    if (hasImage !== false) {
      card.appendChild(sk('100%','190px','border-radius:0'));
    }
    var bottom = col('padding:10px 12px;gap:7px');
    append(bottom, sk('100%','10px'), sk('80%','10px'), sk('55%','10px'));
    var actions = row('padding:8px 12px;gap:14px;margin-top:2px');
    append(actions, sk('44px','24px','',true), sk('44px','24px','',true), sk('44px','24px','',true));
    append(card, bottom, actions);
    return card;
  }

  // ── STORY ROW skeleton ────────────────────────────────────────────────────
  function storiesRowSkel() {
    var wrap = row('gap:14px;padding:10px 16px;overflow:hidden');
    for (var i = 0; i < 6; i++) {
      var item = col('align-items:center;gap:5px');
      append(item,
        sk('54px','54px','border:2px solid rgba(226,255,59,0.18)',true),
        sk('42px','8px','',true)
      );
      wrap.appendChild(item);
    }
    return wrap;
  }

  // ── RIDE CARD skeleton ────────────────────────────────────────────────────
  function rideCardSkel() {
    var card = col('margin:0 16px 14px;border-radius:10px;background:rgba(255,255,255,0.04);overflow:hidden;border:1px solid rgba(255,255,255,0.06)');
    var top = row('padding:12px;gap:10px;align-items:center');
    var c = sk('40px','40px','',true);
    var lines = col('gap:5px;flex:1');
    append(lines, sk('130px','11px'), sk('88px','9px'));
    append(top, c, lines, sk('50px','20px','',true));
    card.appendChild(top);
    card.appendChild(sk('100%','100px','border-radius:0;opacity:0.6'));
    var stats = row('padding:10px 12px;gap:8px');
    for (var i = 0; i < 4; i++) stats.appendChild(sk('60px','22px','',true));
    var actions = row('padding:8px 12px;gap:8px;border-top:1px solid rgba(255,255,255,0.05)');
    append(actions, sk('100%','32px','border-radius:8px'));
    append(card, stats, actions);
    return card;
  }

  // ── LIVE NOW strip skeleton ───────────────────────────────────────────────
  function liveNowSkel() {
    var strip = col('margin:0 16px 14px;border-radius:10px;background:rgba(255,255,255,0.04);padding:12px;gap:10px;border:1px solid rgba(255,255,255,0.06)');
    var header = row('gap:8px');
    append(header, sk('10px','10px','border-radius:50%'), sk('100px','11px'), sk('80px','11px','margin-left:auto'));
    strip.appendChild(header);
    var avatars = row('gap:10px;margin-top:2px');
    for (var i = 0; i < 4; i++) {
      var av = col('align-items:center;gap:5px');
      append(av, sk('52px','52px','',true), sk('40px','8px','',true), sk('50px','7px','',true));
      avatars.appendChild(av);
    }
    strip.appendChild(avatars);
    return strip;
  }

  // ── PRODUCT CARD skeleton (marketplace) ──────────────────────────────────
  function productCardSkel() {
    var card = col('border-radius:10px;background:rgba(255,255,255,0.04);overflow:hidden;border:1px solid rgba(255,255,255,0.06)');
    card.appendChild(sk('100%','140px','border-radius:0'));
    var info = col('padding:10px;gap:6px');
    append(info, sk('90%','10px'), sk('60%','9px'), sk('50px','16px','',true));
    card.appendChild(info);
    return card;
  }

  // ── PROFILE HEADER skeleton ───────────────────────────────────────────────
  function profileHeaderSkel() {
    var wrap = col('gap:0');
    wrap.appendChild(sk('100%','130px','border-radius:0'));
    var lower = col('padding:0 16px 14px;gap:10px');
    var avatarRow2 = row('justify-content:space-between;align-items:flex-end;margin-top:-28px');
    append(avatarRow2, sk('72px','72px','border:3px solid #000',true), sk('88px','32px','',true));
    lower.appendChild(avatarRow2);
    append(lower,
      row('gap:6px;align-items:center;' , append(row(), sk('140px','13px'), sk('20px','20px','margin-left:8px;',true))),
      sk('200px','10px'),
      row('gap:16px;padding:10px 0;border-top:1px solid rgba(255,255,255,0.07);border-bottom:1px solid rgba(255,255,255,0.07);' , ...([0,1,2].map(function(){ var s=col('align-items:center;gap:4px;flex:1'); append(s, sk('36px','16px'), sk('52px','8px','',true)); return s; })))
    );
    wrap.appendChild(lower);
    return wrap;
  }

  // ── NOTIFICATION / CHAT LIST ROW ──────────────────────────────────────────
  function listRowSkel() {
    var r = row('gap:10px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.04)');
    var circle = sk('44px','44px','flex-shrink:0',true);
    var lines = col('gap:6px;flex:1');
    append(lines, sk('65%','10px'), sk('45%','9px'));
    return append(r, circle, lines, sk('40px','8px'));
  }

  // ── MAP / ROUTE BLOCK skeleton ────────────────────────────────────────────
  function mapBlockSkel() {
    var b = col('margin:0 16px 12px;border-radius:10px;overflow:hidden;position:relative');
    b.appendChild(sk('100%','180px','border-radius:10px'));
    var overlay = row('position:absolute;bottom:8px;left:8px;gap:6px');
    append(overlay, sk('60px','22px','',true), sk('80px','22px','',true));
    b.appendChild(overlay);
    return b;
  }

  // ── PILL ROW (filter tabs) ────────────────────────────────────────────────
  function pillRowSkel() {
    var r = row('gap:8px;padding:8px 16px;overflow:hidden');
    [64,52,80,60,56].forEach(function(w){ r.appendChild(sk(w+'px','28px','',true)); });
    return r;
  }

  // ── SECTION HEADER ────────────────────────────────────────────────────────
  function sectionHeaderSkel() {
    var r = row('justify-content:space-between;padding:14px 16px 8px');
    append(r, sk('100px','12px'), sk('48px','10px'));
    return r;
  }

  // ── CARD GRID (2 col) ─────────────────────────────────────────────────────
  function cardGridSkel(rows) {
    var wrap = el('div','display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 16px');
    for (var i = 0; i < (rows || 4); i++) wrap.appendChild(productCardSkel());
    return wrap;
  }

  // ── CHALLENGE CARD ────────────────────────────────────────────────────────
  function challengeCardSkel() {
    var card = col('border-radius:10px;background:rgba(255,255,255,0.04);overflow:hidden;border:1px solid rgba(255,255,255,0.06);margin:0 16px 12px');
    card.appendChild(sk('100%','110px','border-radius:0'));
    var body = col('padding:10px;gap:7px');
    append(body, sk('100px','10px','',true), sk('80%','11px'), sk('60%','10px'), row('gap:8px', ...([0,1,2].map(function(){ return sk('70px','22px','',true); }))));
    card.appendChild(body);
    return card;
  }

  // ── Viewport budget ───────────────────────────────────────────────────────
  // Available height = screen minus header (64px) and nav (72px)
  function viewportBudget() {
    return window.innerHeight - 64 - 72;
  }

  // ── PAGE TEMPLATES ────────────────────────────────────────────────────────
  // Each template receives (wrap, budget) and fills only up to budget px.

  var templates = {

    home: function(wrap, budget) {
      var used = 0;
      // Stories row ~80px, pills ~44px — these are always above the fold
      wrap.appendChild(storiesRowSkel());  used += 80;
      wrap.appendChild(pillRowSkel());     used += 44;
      // Cards: with-image ~270px, without-image ~130px
      var first = true;
      while (used < budget) {
        wrap.appendChild(postCardSkel(first));
        used += first ? 270 : 130;
        first = false;
      }
    },

    'ride-tab': function(wrap, budget) {
      var used = 0;
      wrap.appendChild(pillRowSkel());    used += 44;
      wrap.appendChild(liveNowSkel());    used += 130;
      // Ride cards ~200px each
      while (used < budget) {
        wrap.appendChild(rideCardSkel());
        used += 200;
      }
    },

    marketplace: function(wrap, budget) {
      var used = 0;
      wrap.appendChild(pillRowSkel());        used += 44;
      wrap.appendChild(sectionHeaderSkel());  used += 40;
      // Grid rows: each row = 2 product cards ~190px
      while (used < budget) {
        var row2 = el('div','display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 16px;margin-bottom:10px');
        row2.appendChild(productCardSkel());
        row2.appendChild(productCardSkel());
        wrap.appendChild(row2);
        used += 190;
      }
    },

    'product-detail': function(wrap, budget) {
      wrap.appendChild(sk('100%','260px','border-radius:0'));
      var body = col('padding:14px 16px;gap:10px');
      append(body,
        sk('70%','14px'), sk('45%','11px'),
        row('gap:8px', sk('80px','28px','',true), sk('60px','20px','',true)),
        sk('100%','1px','background:rgba(255,255,255,0.07)'),
        sk('100%','10px'), sk('90%','10px'), sk('65%','10px'),
        sk('100%','44px','border-radius:10px;margin-top:6px')
      );
      wrap.appendChild(body);
    },

    profile: function(wrap, budget) {
      var used = 0;
      wrap.appendChild(profileHeaderSkel()); used += 220;
      wrap.appendChild(pillRowSkel());       used += 44;
      var first = true;
      while (used < budget) {
        wrap.appendChild(postCardSkel(first));
        used += first ? 270 : 130;
        first = false;
      }
    },

    notifications: function(wrap, budget) {
      var used = 0;
      wrap.appendChild(pillRowSkel()); used += 44;
      // List rows ~68px each
      while (used < budget) {
        wrap.appendChild(listRowSkel());
        used += 68;
      }
    },

    chat: function(wrap, budget) {
      var used = 0;
      var searchBar = row('margin:8px 16px 4px;');
      searchBar.appendChild(sk('100%','38px','border-radius:999px'));
      wrap.appendChild(searchBar); used += 54;
      while (used < budget) {
        wrap.appendChild(listRowSkel());
        used += 68;
      }
    },

    discover: function(wrap, budget) {
      var used = 0;
      wrap.appendChild(pillRowSkel());        used += 44;
      wrap.appendChild(sectionHeaderSkel());  used += 40;
      while (used < budget) {
        var row2 = el('div','display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 16px;margin-bottom:10px');
        row2.appendChild(productCardSkel());
        row2.appendChild(productCardSkel());
        wrap.appendChild(row2);
        used += 190;
      }
    },

    'ai-suggestions': function(wrap, budget) {
      var used = 0;
      var header = col('padding:14px 16px;gap:8px');
      append(header, sk('55%','14px'), sk('80%','10px'));
      wrap.appendChild(header); used += 60;
      // AI card ~130px each
      while (used < budget) {
        var c = col('margin:0 16px 12px;border-radius:10px;background:rgba(255,255,255,0.04);padding:12px;gap:8px;border:1px solid rgba(255,255,255,0.06)');
        append(c, sk('60px','18px','',true), sk('75%','13px'), sk('90%','10px'), sk('55%','10px'), sk('100%','36px','border-radius:8px;margin-top:4px'));
        wrap.appendChild(c);
        used += 130;
      }
    },

    challenges: function(wrap, budget) {
      var used = 0;
      wrap.appendChild(pillRowSkel());        used += 44;
      wrap.appendChild(sectionHeaderSkel());  used += 40;
      // Challenge card ~180px
      while (used < budget) {
        wrap.appendChild(challengeCardSkel());
        used += 180;
      }
    },

    groups: function(wrap, budget) {
      var used = 0;
      var searchBar = row('margin:8px 16px 8px;');
      searchBar.appendChild(sk('100%','38px','border-radius:999px'));
      wrap.appendChild(searchBar);            used += 54;
      wrap.appendChild(sectionHeaderSkel());  used += 40;
      // Group row ~76px
      while (used < budget) {
        var gr = row('gap:10px;padding:10px 16px;border-bottom:1px solid rgba(255,255,255,0.04)');
        var img = sk('56px','56px','border-radius:8px');
        var lines = col('gap:5px;flex:1');
        append(lines, sk('55%','11px'), sk('80%','9px'), sk('45%','9px'));
        append(gr, img, lines, sk('64px','26px','',true));
        wrap.appendChild(gr);
        used += 76;
      }
    },

    'comrade-profile': function(wrap, budget) {
      templates.profile(wrap, budget);
    },

    'brand-profile': function(wrap, budget) {
      var used = 0;
      wrap.appendChild(profileHeaderSkel()); used += 220;
      wrap.appendChild(pillRowSkel());       used += 44;
      while (used < budget) {
        var row2 = el('div','display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 16px;margin-bottom:10px');
        row2.appendChild(productCardSkel());
        row2.appendChild(productCardSkel());
        wrap.appendChild(row2);
        used += 190;
      }
    },

    'club-profile': function(wrap, budget) {
      var used = 0;
      wrap.appendChild(profileHeaderSkel()); used += 220;
      var stats = row('gap:8px;padding:8px 16px'); used += 60;
      for (var i=0;i<3;i++) {
        var s = col('align-items:center;gap:5px;flex:1;padding:8px;border-radius:8px;background:rgba(255,255,255,0.04)');
        append(s, sk('44px','16px'), sk('60px','8px','',true));
        stats.appendChild(s);
      }
      wrap.appendChild(stats);
      while (used < budget) {
        wrap.appendChild(rideCardSkel());
        used += 200;
      }
    },

    'influencer-profile': function(wrap, budget) {
      templates.profile(wrap, budget);
    },

    'ride-details': function(wrap, budget) {
      wrap.appendChild(mapBlockSkel());
      var body = col('padding:0 16px;gap:9px');
      append(body,
        sk('70%','14px'), sk('44px','22px','',true),
        sk('100%','1px','background:rgba(255,255,255,0.07)'),
        avatarRow('40px','110px','72px'),
        sk('100%','1px','background:rgba(255,255,255,0.07)')
      );
      var pills = row('gap:7px');
      for (var i=0;i<4;i++) pills.appendChild(sk('64px','22px','',true));
      body.appendChild(pills);
      append(body, sk('100%','44px','border-radius:10px;margin-top:4px'));
      wrap.appendChild(body);
    },

    'my-ride-detail': function(wrap, budget) {
      wrap.appendChild(mapBlockSkel());
      var body = col('padding:0 16px;gap:9px');
      append(body, sk('65%','13px'), sk('100%','1px','background:rgba(255,255,255,0.07)'));
      var stats = row('gap:8px');
      for (var i=0;i<4;i++) {
        var s2 = col('align-items:center;gap:4px;flex:1;background:rgba(255,255,255,0.04);border-radius:8px;padding:7px');
        append(s2, sk('36px','16px'), sk('50px','8px','',true));
        stats.appendChild(s2);
      }
      body.appendChild(stats);
      append(body, sk('100%','1px','background:rgba(255,255,255,0.07)'), sk('100%','44px','border-radius:10px'));
      wrap.appendChild(body);
    },

    'admin-ride': function(wrap, budget) {
      var used = 0;
      var header = col('padding:14px 16px;gap:8px');
      append(header, sk('60%','14px'), sk('40%','10px'));
      wrap.appendChild(header);              used += 60;
      var statsStrip = row('gap:8px;padding:0 16px 12px');
      for (var i=0;i<4;i++) {
        var s3 = col('align-items:center;gap:4px;flex:1;background:rgba(255,255,255,0.04);border-radius:8px;padding:7px');
        append(s3, sk('36px','16px'), sk('48px','8px','',true));
        statsStrip.appendChild(s3);
      }
      wrap.appendChild(statsStrip);          used += 70;
      while (used < budget) {
        wrap.appendChild(listRowSkel());
        used += 68;
      }
    },

    experiences: function(wrap, budget) {
      var used = 0;
      wrap.appendChild(pillRowSkel());        used += 44;
      wrap.appendChild(sectionHeaderSkel());  used += 40;
      // Experience card ~220px
      while (used < budget) {
        var c = col('margin:0 16px 12px;border-radius:10px;background:rgba(255,255,255,0.04);overflow:hidden;border:1px solid rgba(255,255,255,0.06)');
        c.appendChild(sk('100%','160px','border-radius:0'));
        var bd = col('padding:10px;gap:6px');
        append(bd, sk('70%','12px'), sk('90%','10px'), row('gap:8px', sk('60px','20px','',true), sk('80px','20px','',true)));
        c.appendChild(bd);
        wrap.appendChild(c);
        used += 220;
      }
    },

    _default: function(wrap, budget) {
      var used = 0;
      wrap.appendChild(pillRowSkel());        used += 44;
      wrap.appendChild(sectionHeaderSkel());  used += 40;
      var first = true;
      while (used < budget) {
        wrap.appendChild(postCardSkel(first));
        used += first ? 270 : 130;
        first = false;
      }
    }
  };

  // Aliases
  ['analytics','rewards','insurance','payments','comride-pro','garage','mechanic','sos','settings'].forEach(function(p){
    templates[p] = function(wrap, budget){
      var used = 0;
      wrap.appendChild(profileHeaderSkel()); used += 220;
      while (used < budget) { wrap.appendChild(listRowSkel()); used += 68; }
    };
  });
  ['search-results','rxz-community'].forEach(function(p){ templates[p] = templates.discover; });
  ['invited-ride','request-to-join'].forEach(function(p){ templates[p] = templates['ride-details']; });
  ['route-builder'].forEach(function(p){
    templates[p] = function(wrap){ wrap.appendChild(sk('100%','100%','border-radius:0;position:absolute;inset:0')); };
  });
  ['trip-start','tracking','end-ride'].forEach(function(p){ templates[p] = templates['my-ride-detail']; });
  ['create-ride','create-ride-modes','admin-accepted'].forEach(function(p){ templates[p] = templates['admin-ride']; });

  // ── Build and inject overlay ───────────────────────────────────────────────
  function buildOverlay() {
    var overlay = el('div', '', 'cr-sk-overlay');

    // Fake header (accounts for safe-area-inset-top)
    var fakeHeader = el('div', [
      'position:absolute;top:0;left:0;right:0;',
      'padding-top:env(safe-area-inset-top,0px);',
      'background:rgba(8,8,8,0.9);',
      'border-bottom:1px solid rgba(255,255,255,0.06);',
      'display:flex;align-items:center;justify-content:space-between;padding-left:16px;padding-right:16px;padding-bottom:0;',
      'height:calc(env(safe-area-inset-top,0px) + 64px)'
    ].join(''));
    append(fakeHeader, sk('88px','20px'), row('gap:16px', sk('22px','22px','',true), sk('22px','22px','',true)));
    overlay.appendChild(fakeHeader);

    // Scrollable content area — only fill what fits in the viewport
    var content = el('div', 'height:100%;overflow:hidden;display:flex;flex-direction:column;gap:0');
    var builder = templates[page] || templates._default;
    builder(content, viewportBudget());
    overlay.appendChild(content);

    // Fake nav
    overlay.appendChild(navSkel());

    return overlay;
  }

  // ── Splash screen builder ──────────────────────────────────────────────────
  function buildSplash() {
    var splash = el('div', '', 'cr-splash');

    // Lime pulse ring behind logo
    var ring = el('div', '', 'cr-splash-ring');
    splash.appendChild(ring);

    // Logo — use vt_logo from images folder
    var img = el('img');
    img.src = 'images/vt_logo.svg';
    img.className = 'cr-splash-logo';
    img.alt = 'Comride';
    splash.appendChild(img);

    return splash;
  }

  function revealDrawers() {
    // Re-enable all panel/drawer visibility and transitions after cover is gone
    ['menu-drawer','drawer','drawer-backdrop','notif-panel','notif-backdrop'].forEach(function(id) {
      var el2 = document.getElementById(id);
      if (el2) el2.classList.add('cr-visible');
    });
  }

  function inject() {
    // Skip non-app pages — restore visibility immediately
    if (page === 'index' || page === 'investor-deck' || page === 'user-journeys') {
      document.documentElement.style.visibility = '';
      return;
    }

    // ── Cover div: opaque black layer that sits on top of real content ────────
    var cover = el('div', '', '');
    cover.id = 'cr-cover';
    document.body.appendChild(cover);

    // ── Restore visibility — cover is in place so content is still hidden ─────
    // Simple inline style removal, no !important conflict possible.
    document.documentElement.style.visibility = '';

    var SPLASH_HOLD   = 900;
    var SPLASH_FADE   = 400;
    var SKELETON_HOLD = 900;
    var SKELETON_FADE = 280;
    var COVER_FADE    = 350;

    // ── Splash (sits on top of cover, z-index:10000) ──────────────────────────
    var splash = buildSplash();
    document.body.appendChild(splash);

    // ── Fade splash → skeleton ────────────────────────────────────────────────
    setTimeout(function () {
      splash.style.opacity = '0';

      setTimeout(function () {
        if (splash.parentNode) splash.parentNode.removeChild(splash);

        // Skeleton sits above cover (z-index:9999 > 9997)
        var overlay = buildOverlay();
        document.body.appendChild(overlay);
        overlay.getBoundingClientRect(); // force reflow
        overlay.style.opacity = '1';

        // ── Fade skeleton out ─────────────────────────────────────────────────
        setTimeout(function () {
          overlay.style.opacity = '0';

          setTimeout(function () {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);

            // ── Fade cover out — single clean reveal, no body-class animation ─
            cover.style.opacity = '0';

            setTimeout(function () {
              if (cover.parentNode) cover.parentNode.removeChild(cover);
              revealDrawers();
            }, COVER_FADE);

          }, SKELETON_FADE);
        }, SKELETON_HOLD);

      }, SPLASH_FADE);
    }, SPLASH_HOLD);
  }

  // ── Pull-to-refresh ───────────────────────────────────────────────────────
  function setupPullToRefresh() {
    if (page === 'index' || page === 'investor-deck' || page === 'user-journeys') return;

    var THRESHOLD   = 72;    // px of pull needed to trigger
    var MAX_PULL    = 110;   // max rubber-band travel
    var startY      = 0;
    var pulling     = false;
    var triggered   = false;
    var pullDist    = 0;

    // ── Pull indicator ───────────────────────────────────────────────────────
    var indicator = el('div', [
      'position:fixed;top:0;left:0;right:0;z-index:9998;',
      'display:flex;align-items:center;justify-content:center;',
      'height:0;overflow:hidden;',
      'background:linear-gradient(to bottom,rgba(226,255,59,0.1),transparent);',
      'transition:none;pointer-events:none'
    ].join(''));

    // Spinner icon inside the indicator
    var spinnerWrap = el('div', [
      'width:32px;height:32px;border-radius:50%;',
      'border:2px solid rgba(226,255,59,0.2);',
      'border-top-color:#E2FF3B;',
      'display:flex;align-items:center;justify-content:center;',
      'transition:transform 0.1s linear;opacity:0;transition:opacity 0.2s'
    ].join(''));

    // Checkmark / refresh arrow SVG
    spinnerWrap.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E2FF3B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>';

    // "Pull to refresh" label
    var label = el('div', [
      'font-family:Manrope,sans-serif;font-size:11px;font-weight:600;',
      'color:rgba(226,255,59,0.7);letter-spacing:0.06em;',
      'margin-left:8px;opacity:0;transition:opacity 0.2s'
    ].join(''));
    label.textContent = 'Pull to refresh';

    var inner = el('div','display:flex;align-items:center;gap:0;padding-top:8px');
    append(inner, spinnerWrap, label);
    indicator.appendChild(inner);
    document.body.appendChild(indicator);

    // ── Add pull indicator CSS spin animation ────────────────────────────────
    var pullStyle = document.createElement('style');
    pullStyle.textContent = [
      '@keyframes cr-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}',
      '.cr-ptr-spinning{animation:cr-spin 0.7s linear infinite!important}'
    ].join('');
    document.head.appendChild(pullStyle);

    // ── Touch handlers ───────────────────────────────────────────────────────
    document.addEventListener('touchstart', function(e) {
      // Only start if at the very top of the page
      if (window.scrollY > 2) return;
      startY   = e.touches[0].clientY;
      pulling  = true;
      triggered = false;
      pullDist = 0;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
      if (!pulling) return;
      var dy = e.touches[0].clientY - startY;
      if (dy <= 0) { pulling = false; return; }

      // Rubber-band easing: gets harder to pull further
      pullDist = Math.min(MAX_PULL, dy * (1 - dy / (MAX_PULL * 3.5)));

      // Show indicator
      indicator.style.height = pullDist + 'px';
      spinnerWrap.style.opacity = Math.min(1, pullDist / THRESHOLD);
      label.style.opacity       = Math.min(1, pullDist / THRESHOLD);

      // Rotate the arrow proportionally while pulling
      if (!triggered) {
        spinnerWrap.querySelector('svg').style.transform =
          'rotate(' + (pullDist / THRESHOLD * 180) + 'deg)';
      }

      // Past threshold — update label and mark triggered
      if (pullDist >= THRESHOLD && !triggered) {
        triggered = true;
        label.textContent = 'Release to refresh';
        label.style.color = '#E2FF3B';
        spinnerWrap.classList.add('cr-ptr-spinning');
        spinnerWrap.querySelector('svg').style.transform = '';
      }
      if (pullDist < THRESHOLD && triggered) {
        triggered = false;
        label.textContent = 'Pull to refresh';
        label.style.color = 'rgba(226,255,59,0.7)';
        spinnerWrap.classList.remove('cr-ptr-spinning');
      }

    }, { passive: true });

    document.addEventListener('touchend', function() {
      if (!pulling) return;
      pulling = false;

      if (triggered) {
        // Lock indicator at threshold height, spin for a moment, then reload
        indicator.style.transition = 'height 0.2s ease';
        indicator.style.height     = THRESHOLD + 'px';
        label.textContent = 'Refreshing…';

        setTimeout(function() {
          // Run skeleton sequence then remove indicator
          runSkeletonOnly(function() {
            // Snap indicator closed
            indicator.style.height = '0';
            indicator.style.transition = 'height 0.3s ease';
            spinnerWrap.classList.remove('cr-ptr-spinning');
          });
        }, 300);

      } else {
        // Snap back
        indicator.style.transition = 'height 0.3s ease';
        indicator.style.height     = '0';
        setTimeout(function() { indicator.style.transition = 'none'; }, 320);
      }
    }, { passive: true });
  }

  // ── Skeleton-only sequence (used by pull-to-refresh) ─────────────────────
  function runSkeletonOnly(onDone) {
    var SKELETON_HOLD = 1000;
    var SKELETON_FADE = 280;
    var COVER_FADE    = 300;

    // Cover hides content while skeleton plays
    var cover = el('div', '', '');
    cover.id = 'cr-cover';
    document.body.appendChild(cover);

    var overlay = buildOverlay();
    document.body.appendChild(overlay);
    overlay.getBoundingClientRect();
    overlay.style.opacity = '1';

    setTimeout(function() {
      overlay.style.opacity = '0';
      setTimeout(function() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        // Fade cover out — single clean reveal
        cover.style.opacity = '0';
        if (onDone) onDone();
        setTimeout(function() {
          if (cover.parentNode) cover.parentNode.removeChild(cover);
        }, COVER_FADE);
      }, SKELETON_FADE);
    }, SKELETON_HOLD);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      inject();
      setupPullToRefresh();
    });
  } else {
    inject();
    setupPullToRefresh();
  }

})();
