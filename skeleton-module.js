/**
 * skeleton-module.js — Comride Shimmer Skeleton Loading
 * Injects a full-screen shimmer skeleton that matches each page's layout.
 * Auto-dismisses after content is ready (1 300 ms simulated load).
 */
(function () {

  // ── Shimmer keyframe + base class injected once ────────────────────────────
  var styleTag = document.createElement('style');
  styleTag.textContent = [
    '@keyframes cr-shimmer{',
    '  0%{background-position:-600px 0}',
    '  100%{background-position:600px 0}',
    '}',
    '.cr-sk{',
    '  background:linear-gradient(90deg,',
    '    rgba(255,255,255,0.055) 0%,',
    '    rgba(255,255,255,0.055) 35%,',
    '    rgba(255,255,255,0.13) 50%,',
    '    rgba(255,255,255,0.055) 65%,',
    '    rgba(255,255,255,0.055) 100%',
    '  );',
    '  background-size:1200px 100%;',
    '  animation:cr-shimmer 1.5s linear infinite;',
    '  border-radius:6px;',
    '  flex-shrink:0',
    '}',
    '.cr-sk-r{border-radius:999px}',       // pill / circle variant
    '.cr-sk-overlay{',
    '  position:fixed;inset:0;z-index:9999;',
    '  background:#000;',
    '  overflow:hidden;',
    '  padding:72px 0 80px;',              // header clearance + nav clearance
    '  transition:opacity 0.35s ease',
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

  // ── PAGE TEMPLATES ────────────────────────────────────────────────────────

  var templates = {

    home: function(wrap) {
      wrap.appendChild(storiesRowSkel());
      wrap.appendChild(pillRowSkel());
      wrap.appendChild(postCardSkel(true));
      wrap.appendChild(postCardSkel(false));
    },

    'ride-tab': function(wrap) {
      wrap.appendChild(pillRowSkel());
      wrap.appendChild(liveNowSkel());
      wrap.appendChild(rideCardSkel());
      wrap.appendChild(sectionHeaderSkel());
      wrap.appendChild(rideCardSkel());
    },

    marketplace: function(wrap) {
      wrap.appendChild(pillRowSkel());
      wrap.appendChild(sectionHeaderSkel());
      wrap.appendChild(cardGridSkel(4));
    },

    'product-detail': function(wrap) {
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

    profile: function(wrap) {
      wrap.appendChild(profileHeaderSkel());
      wrap.appendChild(pillRowSkel());
      for (var i=0;i<3;i++) wrap.appendChild(postCardSkel(i===0));
    },

    notifications: function(wrap) {
      wrap.appendChild(pillRowSkel());
      for (var i=0;i<7;i++) wrap.appendChild(listRowSkel());
    },

    chat: function(wrap) {
      var searchBar = row('margin:8px 16px 4px;');
      searchBar.appendChild(sk('100%','38px','border-radius:999px'));
      wrap.appendChild(searchBar);
      for (var i=0;i<6;i++) wrap.appendChild(listRowSkel());
    },

    discover: function(wrap) {
      wrap.appendChild(pillRowSkel());
      wrap.appendChild(sectionHeaderSkel());
      wrap.appendChild(cardGridSkel(4));
      wrap.appendChild(sectionHeaderSkel());
      wrap.appendChild(cardGridSkel(2));
    },

    'ai-suggestions': function(wrap) {
      var header = col('padding:14px 16px;gap:8px');
      append(header, sk('55%','14px'), sk('80%','10px'));
      wrap.appendChild(header);
      for (var i=0;i<3;i++) {
        var c = col('margin:0 16px 12px;border-radius:10px;background:rgba(255,255,255,0.04);padding:12px;gap:8px;border:1px solid rgba(255,255,255,0.06)');
        append(c, sk('60px','18px','',true), sk('75%','13px'), sk('90%','10px'), sk('55%','10px'), sk('100%','36px','border-radius:8px;margin-top:4px'));
        wrap.appendChild(c);
      }
    },

    challenges: function(wrap) {
      wrap.appendChild(pillRowSkel());
      wrap.appendChild(sectionHeaderSkel());
      wrap.appendChild(challengeCardSkel());
      wrap.appendChild(challengeCardSkel());
    },

    groups: function(wrap) {
      var searchBar = row('margin:8px 16px 8px;');
      searchBar.appendChild(sk('100%','38px','border-radius:999px'));
      wrap.appendChild(searchBar);
      wrap.appendChild(sectionHeaderSkel());
      for (var i=0;i<4;i++) {
        var gr = row('gap:10px;padding:10px 16px;border-bottom:1px solid rgba(255,255,255,0.04)');
        var img = sk('56px','56px','border-radius:8px');
        var lines = col('gap:5px;flex:1');
        append(lines, sk('55%','11px'), sk('80%','9px'), sk('45%','9px'));
        append(gr, img, lines, sk('64px','26px','',true));
        wrap.appendChild(gr);
      }
    },

    'comrade-profile': function(wrap) {
      wrap.appendChild(profileHeaderSkel());
      wrap.appendChild(pillRowSkel());
      wrap.appendChild(postCardSkel(true));
      wrap.appendChild(postCardSkel(false));
    },

    'brand-profile': function(wrap) {
      wrap.appendChild(profileHeaderSkel());
      wrap.appendChild(pillRowSkel());
      wrap.appendChild(cardGridSkel(4));
    },

    'club-profile': function(wrap) {
      wrap.appendChild(profileHeaderSkel());
      var stats = row('gap:8px;padding:8px 16px');
      for (var i=0;i<3;i++) {
        var s = col('align-items:center;gap:5px;flex:1;padding:8px;border-radius:8px;background:rgba(255,255,255,0.04)');
        append(s, sk('44px','16px'), sk('60px','8px','',true));
        stats.appendChild(s);
      }
      wrap.appendChild(stats);
      for (var j=0;j<2;j++) wrap.appendChild(rideCardSkel());
    },

    'influencer-profile': function(wrap) {
      wrap.appendChild(profileHeaderSkel());
      wrap.appendChild(pillRowSkel());
      wrap.appendChild(postCardSkel(true));
    },

    'ride-details': function(wrap) {
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

    'my-ride-detail': function(wrap) {
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

    'admin-ride': function(wrap) {
      var header = col('padding:14px 16px;gap:8px');
      append(header, sk('60%','14px'), sk('40%','10px'));
      wrap.appendChild(header);
      var statsStrip = row('gap:8px;padding:0 16px 12px');
      for (var i=0;i<4;i++) {
        var s3 = col('align-items:center;gap:4px;flex:1;background:rgba(255,255,255,0.04);border-radius:8px;padding:7px');
        append(s3, sk('36px','16px'), sk('48px','8px','',true));
        statsStrip.appendChild(s3);
      }
      wrap.appendChild(statsStrip);
      for (var j=0;j<4;j++) wrap.appendChild(listRowSkel());
    },

    experiences: function(wrap) {
      wrap.appendChild(pillRowSkel());
      wrap.appendChild(sectionHeaderSkel());
      for (var i=0;i<2;i++) {
        var c = col('margin:0 16px 12px;border-radius:10px;background:rgba(255,255,255,0.04);overflow:hidden;border:1px solid rgba(255,255,255,0.06)');
        c.appendChild(sk('100%','160px','border-radius:0'));
        var bd = col('padding:10px;gap:6px');
        append(bd, sk('70%','12px'), sk('90%','10px'), row('gap:8px', sk('60px','20px','',true), sk('80px','20px','',true)));
        c.appendChild(bd);
        wrap.appendChild(c);
      }
    },

    // ── fallback for any unrecognised page ──
    _default: function(wrap) {
      wrap.appendChild(pillRowSkel());
      wrap.appendChild(sectionHeaderSkel());
      wrap.appendChild(postCardSkel(true));
      wrap.appendChild(postCardSkel(false));
    }
  };

  // Aliases
  ['analytics','rewards','insurance','payments','comride-pro','garage','mechanic','sos','settings'].forEach(function(p){
    templates[p] = function(wrap){ wrap.appendChild(profileHeaderSkel()); for(var i=0;i<5;i++) wrap.appendChild(listRowSkel()); };
  });
  ['search-results','rxz-community'].forEach(function(p){
    templates[p] = templates.discover;
  });
  ['invited-ride','request-to-join'].forEach(function(p){
    templates[p] = templates['ride-details'];
  });
  ['route-builder'].forEach(function(p){
    templates[p] = function(wrap){ wrap.appendChild(sk('100%','100%','border-radius:0;position:absolute;inset:0')); };
  });
  ['trip-start','tracking','end-ride'].forEach(function(p){
    templates[p] = templates['my-ride-detail'];
  });
  ['create-ride','create-ride-modes','admin-accepted'].forEach(function(p){
    templates[p] = templates['admin-ride'];
  });

  // ── Build and inject overlay ───────────────────────────────────────────────
  function buildOverlay() {
    var overlay = el('div', '', 'cr-sk-overlay');

    // Fake header
    var fakeHeader = el('div', [
      'position:absolute;top:0;left:0;right:0;height:64px;',
      'background:rgba(8,8,8,0.9);',
      'border-bottom:1px solid rgba(255,255,255,0.06);',
      'display:flex;align-items:center;justify-content:space-between;padding:0 16px'
    ].join(''));
    append(fakeHeader, sk('88px','20px'), row('gap:16px', sk('22px','22px','',true), sk('22px','22px','',true)));
    overlay.appendChild(fakeHeader);

    // Scrollable content area
    var content = el('div', 'height:100%;overflow:hidden;display:flex;flex-direction:column;gap:0');
    var builder = templates[page] || templates._default;
    builder(content);
    overlay.appendChild(content);

    // Fake nav
    overlay.appendChild(navSkel());

    return overlay;
  }

  function inject() {
    // Don't show on index / investor-deck
    if (page === 'index' || page === 'investor-deck' || page === 'user-journeys') return;

    var overlay = buildOverlay();
    document.body.appendChild(overlay);

    // Dismiss: fade out then remove
    var delay = 1300; // ms simulated load
    setTimeout(function () {
      overlay.style.opacity = '0';
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 380);
    }, delay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
