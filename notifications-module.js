/**
 * notifications-module.js — Comride Notifications Overlay
 * Injects a slide-in notifications panel on every page.
 * Call openNotifications() / closeNotifications() from anywhere.
 */
(function () {

  var NOTIF_HTML = [
    /* ── Backdrop ── */
    '<div id="notif-backdrop" onclick="closeNotifications()" style="',
      'position:fixed;inset:0;z-index:490;',
      'background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);',
      'opacity:0;pointer-events:none;transition:opacity 0.3s ease',
    '"></div>',

    /* ── Panel ── */
    '<div id="notif-panel" style="',
      'position:fixed;top:0;right:0;bottom:0;z-index:495;',
      'width:min(100vw,390px);',
      'background:#0c0c0c;',
      'transform:translateX(100%);transition:transform 0.35s cubic-bezier(0.4,0,0.2,1);',
      'display:flex;flex-direction:column;',
      'border-left:1px solid rgba(255,255,255,0.07);',
      'overflow:hidden',
    '">',

      /* Header */
      '<div style="',
        'padding:calc(env(safe-area-inset-top,0px) + 16px) 16px 12px;',
        'display:flex;align-items:center;justify-content:space-between;',
        'border-bottom:1px solid rgba(255,255,255,0.07);',
        'background:rgba(8,8,8,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);',
        'flex-shrink:0',
      '">',
        '<div>',
          '<h2 style="font-family:Space Grotesk,sans-serif;font-weight:700;font-size:18px;color:#fff;margin:0 0 2px;letter-spacing:-0.3px">Notifications</h2>',
          '<p style="font-family:Manrope,sans-serif;font-size:11px;color:rgba(255,255,255,0.35);margin:0;letter-spacing:0.04em">Stay tuned to the pulse</p>',
        '</div>',
        '<div style="display:flex;align-items:center;gap:10px">',
          '<button onclick="notifMarkAllRead()" style="background:rgba(226,255,59,0.1);border:1px solid rgba(226,255,59,0.22);border-radius:999px;padding:5px 12px;font-family:Manrope,sans-serif;font-weight:700;font-size:10px;color:#E2FF3B;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer">Mark all read</button>',
          '<button onclick="closeNotifications()" style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.07);border:none;color:rgba(255,255,255,0.6);font-size:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;line-height:1">✕</button>',
        '</div>',
      '</div>',

      /* Scrollable content */
      '<div id="notif-scroll" style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:12px 14px 32px">',

        /* Section: Ride Updates */
        '<div style="margin-bottom:24px">',
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">',
            '<span style="font-family:Manrope,sans-serif;font-weight:700;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.35)">Ride Updates</span>',
            '<div style="flex:1;height:1px;background:rgba(255,255,255,0.07)"></div>',
          '</div>',

          /* Ride Invite */
          '<div class="notif-item notif-unread" onclick="closeNotifications();location.href=\'invited-ride.html\'" style="background:#161616;border-radius:10px;padding:12px 36px 12px 12px;display:flex;gap:10px;margin-bottom:8px;border-left:3px solid #E2FF3B;position:relative;cursor:pointer;transition:opacity 0.2s">',
            '<div style="width:38px;height:38px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid rgba(226,255,59,0.35)">',
              '<img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&auto=format&fit=crop&q=80" style="width:100%;height:100%;object-fit:cover" loading="lazy"/>',
            '</div>',
            '<div style="flex:1;min-width:0">',
              '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">',
                '<span style="font-family:Manrope,sans-serif;font-weight:700;font-size:11px;color:#E2FF3B;letter-spacing:0.1em;text-transform:uppercase">Ride Invite</span>',
                '<span style="font-family:Manrope,sans-serif;font-size:10px;color:rgba(255,255,255,0.35)">2m ago</span>',
              '</div>',
              '<p style="font-family:Manrope,sans-serif;font-size:12.5px;color:#fff;line-height:1.45;margin:0 0 7px">Siddharth Roy invited you to <strong>Coastal Highway Sprint</strong> · May 18–20</p>',
              '<button onclick="event.stopPropagation();closeNotifications();location.href=\'invited-ride.html\'" style="background:#E2FF3B;border:none;border-radius:999px;padding:5px 13px;font-family:Manrope,sans-serif;font-weight:700;font-size:10px;color:#000;letter-spacing:0.08em;cursor:pointer">View Invite</button>',
            '</div>',
            '<button onclick="event.stopPropagation();notifDismiss(this)" style="position:absolute;top:9px;right:9px;background:rgba(255,255,255,0.06);border:none;border-radius:50%;width:20px;height:20px;color:rgba(255,255,255,0.4);font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer">✕</button>',
          '</div>',

          /* Upcoming Ride */
          '<div class="notif-item notif-unread" onclick="closeNotifications();location.href=\'my-ride-detail.html\'" style="background:#161616;border-radius:10px;padding:12px 36px 12px 12px;display:flex;gap:10px;margin-bottom:8px;border-left:3px solid #FF9632;position:relative;cursor:pointer;transition:opacity 0.2s">',
            '<div style="width:38px;height:38px;border-radius:9px;overflow:hidden;flex-shrink:0;border:1.5px solid rgba(255,150,50,0.35)">',
              '<img src="https://images.unsplash.com/photo-1519003300449-424ad0405076?w=100&auto=format&fit=crop&q=80" style="width:100%;height:100%;object-fit:cover" loading="lazy"/>',
            '</div>',
            '<div style="flex:1;min-width:0">',
              '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">',
                '<span style="font-family:Manrope,sans-serif;font-weight:700;font-size:11px;color:#FF9632;letter-spacing:0.1em;text-transform:uppercase">Upcoming Ride</span>',
                '<span style="font-family:Manrope,sans-serif;font-size:10px;color:rgba(255,255,255,0.35)">45m ago</span>',
              '</div>',
              '<p style="font-family:Manrope,sans-serif;font-size:12.5px;color:#fff;line-height:1.45;margin:0">Midnight Circuit starts in 3h. Check route and head to the starting point.</p>',
            '</div>',
            '<button onclick="event.stopPropagation();notifDismiss(this)" style="position:absolute;top:9px;right:9px;background:rgba(255,255,255,0.06);border:none;border-radius:50%;width:20px;height:20px;color:rgba(255,255,255,0.4);font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer">✕</button>',
          '</div>',

          /* Ride Completed */
          '<div class="notif-item" onclick="closeNotifications();location.href=\'my-ride-detail.html\'" style="background:#161616;border-radius:10px;padding:12px 36px 12px 12px;display:flex;gap:10px;margin-bottom:8px;border-left:3px solid rgba(255,255,255,0.1);position:relative;cursor:pointer;transition:opacity 0.2s">',
            '<div style="width:38px;height:38px;border-radius:9px;overflow:hidden;flex-shrink:0;border:1.5px solid rgba(255,255,255,0.1)">',
              '<img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&auto=format&fit=crop&q=80" style="width:100%;height:100%;object-fit:cover" loading="lazy"/>',
            '</div>',
            '<div style="flex:1;min-width:0">',
              '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">',
                '<span style="font-family:Manrope,sans-serif;font-weight:700;font-size:11px;color:rgba(255,255,255,0.45);letter-spacing:0.1em;text-transform:uppercase">Ride Completed</span>',
                '<span style="font-family:Manrope,sans-serif;font-size:10px;color:rgba(255,255,255,0.35)">2h ago</span>',
              '</div>',
              '<p style="font-family:Manrope,sans-serif;font-size:12.5px;color:#fff;line-height:1.45;margin:0">Midnight Highway Run — 142 km completed. XP +340 added.</p>',
            '</div>',
            '<button onclick="event.stopPropagation();notifDismiss(this)" style="position:absolute;top:9px;right:9px;background:rgba(255,255,255,0.06);border:none;border-radius:50%;width:20px;height:20px;color:rgba(255,255,255,0.4);font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer">✕</button>',
          '</div>',
        '</div>',

        /* Section: Friend Activity */
        '<div style="margin-bottom:24px">',
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">',
            '<span style="font-family:Manrope,sans-serif;font-weight:700;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.35)">Friend Activity</span>',
            '<div style="flex:1;height:1px;background:rgba(255,255,255,0.07)"></div>',
          '</div>',

          /* Follow */
          '<div class="notif-item notif-unread" onclick="closeNotifications();location.href=\'comrade-profile.html\'" style="background:#161616;border-radius:10px;padding:12px 36px 12px 12px;display:flex;align-items:center;gap:10px;margin-bottom:8px;border-left:3px solid rgba(226,255,59,0.4);position:relative;cursor:pointer;transition:opacity 0.2s">',
            '<div style="width:38px;height:38px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid rgba(226,255,59,0.35)">',
              '<img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80" style="width:100%;height:100%;object-fit:cover" loading="lazy"/>',
            '</div>',
            '<div style="flex:1;min-width:0">',
              '<p style="font-family:Manrope,sans-serif;font-weight:700;font-size:12.5px;color:#fff;margin:0 0 2px">Alex Rivera started following you</p>',
              '<p style="font-family:Manrope,sans-serif;font-size:11.5px;color:rgba(255,255,255,0.45);margin:0">2,400 km · ⭐ 4.8 · Bangalore</p>',
            '</div>',
            '<span style="font-family:Manrope,sans-serif;font-size:10px;color:rgba(255,255,255,0.35);white-space:nowrap">1h ago</span>',
            '<button onclick="event.stopPropagation();notifDismiss(this)" style="position:absolute;top:9px;right:9px;background:rgba(255,255,255,0.06);border:none;border-radius:50%;width:20px;height:20px;color:rgba(255,255,255,0.4);font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer">✕</button>',
          '</div>',

          /* Challenge */
          '<div class="notif-item" onclick="closeNotifications();location.href=\'comrade-profile.html\'" style="background:#161616;border-radius:10px;padding:12px 36px 12px 12px;display:flex;align-items:center;gap:10px;margin-bottom:8px;border-left:3px solid rgba(255,255,255,0.08);position:relative;cursor:pointer;transition:opacity 0.2s">',
            '<div style="width:38px;height:38px;border-radius:50%;overflow:hidden;flex-shrink:0;border:1.5px solid rgba(72,72,72,0.4)">',
              '<img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80" style="width:100%;height:100%;object-fit:cover" loading="lazy"/>',
            '</div>',
            '<div style="flex:1;min-width:0">',
              '<p style="font-family:Manrope,sans-serif;font-weight:700;font-size:12.5px;color:#fff;margin:0 0 2px">Sara Vance accepted your challenge</p>',
              '<p style="font-family:Manrope,sans-serif;font-size:11.5px;color:rgba(255,255,255,0.45);margin:0">"Coastal Blast" · Starts in 2 days</p>',
            '</div>',
            '<span style="font-family:Manrope,sans-serif;font-size:10px;color:rgba(255,255,255,0.35);white-space:nowrap">3h ago</span>',
            '<button onclick="event.stopPropagation();notifDismiss(this)" style="position:absolute;top:9px;right:9px;background:rgba(255,255,255,0.06);border:none;border-radius:50%;width:20px;height:20px;color:rgba(255,255,255,0.4);font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer">✕</button>',
          '</div>',
        '</div>',

        /* Section: Achievements */
        '<div style="margin-bottom:24px">',
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">',
            '<span style="font-family:Manrope,sans-serif;font-weight:700;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.35)">Achievements</span>',
            '<div style="flex:1;height:1px;background:rgba(255,255,255,0.07)"></div>',
          '</div>',

          /* Badge */
          '<div class="notif-item notif-unread" onclick="closeNotifications();location.href=\'rewards.html\'" style="background:#161616;border-radius:10px;padding:12px 36px 12px 12px;display:flex;gap:10px;margin-bottom:8px;border-left:3px solid #E2FF3B;position:relative;cursor:pointer;transition:opacity 0.2s">',
            '<div style="width:38px;height:38px;border-radius:50%;background:rgba(226,255,59,0.1);border:2px solid rgba(226,255,59,0.35);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:17px">🏆</div>',
            '<div style="flex:1;min-width:0">',
              '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">',
                '<span style="font-family:Manrope,sans-serif;font-weight:700;font-size:11px;color:#E2FF3B;letter-spacing:0.1em;text-transform:uppercase">Badge Unlocked</span>',
                '<span style="font-family:Manrope,sans-serif;font-size:10px;color:rgba(255,255,255,0.35)">Yesterday</span>',
              '</div>',
              '<p style="font-family:Manrope,sans-serif;font-size:12.5px;color:#fff;line-height:1.45;margin:0">You earned the <strong>Night Owl</strong> badge for 10 night rides!</p>',
            '</div>',
            '<button onclick="event.stopPropagation();notifDismiss(this)" style="position:absolute;top:9px;right:9px;background:rgba(255,255,255,0.06);border:none;border-radius:50%;width:20px;height:20px;color:rgba(255,255,255,0.4);font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer">✕</button>',
          '</div>',

          /* Payment */
          '<div class="notif-item" onclick="closeNotifications();location.href=\'payments.html\'" style="background:#161616;border-radius:10px;padding:12px 36px 12px 12px;display:flex;gap:10px;margin-bottom:8px;border-left:3px solid rgba(255,255,255,0.08);position:relative;cursor:pointer;transition:opacity 0.2s">',
            '<div style="width:38px;height:38px;border-radius:9px;overflow:hidden;flex-shrink:0;border:1.5px solid rgba(100,200,100,0.25)">',
              '<img src="https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=100&auto=format&fit=crop&q=80" style="width:100%;height:100%;object-fit:cover" loading="lazy"/>',
            '</div>',
            '<div style="flex:1;min-width:0">',
              '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">',
                '<span style="font-family:Manrope,sans-serif;font-weight:700;font-size:11px;color:rgba(255,255,255,0.45);letter-spacing:0.1em;text-transform:uppercase">Payment Received</span>',
                '<span style="font-family:Manrope,sans-serif;font-size:10px;color:rgba(255,255,255,0.35)">2 days ago</span>',
              '</div>',
              '<p style="font-family:Manrope,sans-serif;font-size:12.5px;color:#fff;line-height:1.45;margin:0">₹1,200 received for Coastal Karnataka Loop ride booking.</p>',
            '</div>',
            '<button onclick="event.stopPropagation();notifDismiss(this)" style="position:absolute;top:9px;right:9px;background:rgba(255,255,255,0.06);border:none;border-radius:50%;width:20px;height:20px;color:rgba(255,255,255,0.4);font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer">✕</button>',
          '</div>',
        '</div>',

        /* Clear all footer */
        '<div style="text-align:center;padding:4px 0 8px">',
          '<button onclick="notifClearAll()" style="background:none;border:none;font-family:Manrope,sans-serif;font-weight:700;font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;padding:8px 16px">Clear All</button>',
        '</div>',

      '</div>',
    '</div>'
  ].join('');

  // ── Inject panel into DOM ──────────────────────────────────────────────────
  function inject() {
    var wrap = document.createElement('div');
    wrap.innerHTML = NOTIF_HTML;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    // Add notif-unread dot style
    var s = document.createElement('style');
    s.textContent = [
      '.notif-item:active{opacity:0.75}',
      '#notif-panel::-webkit-scrollbar{display:none}',
      '#notif-scroll::-webkit-scrollbar{display:none}',
      /* Ensure panel sits UNDER the hamburger drawer (z:300) but above content */
      '#notif-panel{z-index:495}',
      '#notif-backdrop{z-index:490}',
      /* Also keep out of cr-loading suppression */
      '#notif-panel,#notif-backdrop{visibility:hidden!important;transition:none!important}',
      '#notif-panel.cr-visible,#notif-backdrop.cr-visible{visibility:visible!important}',
      '#notif-panel.cr-visible{transition:transform 0.35s cubic-bezier(0.4,0,0.2,1)!important}',
      '#notif-backdrop.cr-visible{transition:opacity 0.3s ease!important}',
    ].join('');
    document.head.appendChild(s);
  }

  // ── Open / Close ───────────────────────────────────────────────────────────
  window.openNotifications = function () {
    var panel    = document.getElementById('notif-panel');
    var backdrop = document.getElementById('notif-backdrop');
    if (!panel) return;
    panel.classList.add('cr-visible');
    backdrop.classList.add('cr-visible');
    // Force reflow
    panel.getBoundingClientRect();
    panel.style.transform    = 'translateX(0)';
    backdrop.style.opacity   = '1';
    backdrop.style.pointerEvents = 'auto';
    // Reset scroll to top each open
    var scroll = document.getElementById('notif-scroll');
    if (scroll) scroll.scrollTop = 0;
    // Update badge
    var badge = document.getElementById('notif-badge');
    if (badge) badge.style.display = 'none';
  };

  window.closeNotifications = function () {
    var panel    = document.getElementById('notif-panel');
    var backdrop = document.getElementById('notif-backdrop');
    if (!panel) return;
    panel.style.transform        = 'translateX(100%)';
    backdrop.style.opacity       = '0';
    backdrop.style.pointerEvents = 'none';
  };

  // ── Notification actions ───────────────────────────────────────────────────
  window.notifDismiss = function (btn) {
    var item = btn.closest('.notif-item');
    item.style.transition  = 'all 0.3s ease';
    item.style.transform   = 'translateX(110%)';
    item.style.opacity     = '0';
    item.style.pointerEvents = 'none';
    setTimeout(function () {
      item.style.maxHeight    = '0';
      item.style.marginBottom = '0';
      item.style.padding      = '0';
      item.style.overflow     = 'hidden';
    }, 300);
  };

  window.notifMarkAllRead = function () {
    document.querySelectorAll('.notif-unread').forEach(function (el) {
      el.classList.remove('notif-unread');
      el.style.borderLeftColor = 'rgba(255,255,255,0.1)';
    });
    var badge = document.getElementById('notif-badge');
    if (badge) badge.style.display = 'none';
    if (window.showToast) window.showToast('All marked as read');
  };

  window.notifClearAll = function () {
    var items = document.querySelectorAll('.notif-item');
    items.forEach(function (item, i) {
      setTimeout(function () {
        item.style.transition  = 'all 0.3s ease';
        item.style.transform   = 'translateX(110%)';
        item.style.opacity     = '0';
        setTimeout(function () {
          item.style.maxHeight    = '0';
          item.style.marginBottom = '0';
          item.style.padding      = '0';
          item.style.overflow     = 'hidden';
        }, 300);
      }, i * 60);
    });
    var badge = document.getElementById('notif-badge');
    if (badge) badge.style.display = 'none';
    setTimeout(function () {
      if (window.showToast) window.showToast('All notifications cleared');
    }, items.length * 60 + 100);
  };

  // Also make drawers restore notification panel visibility alongside other drawers
  // (revealDrawers in skeleton-module handles #menu-drawer and #drawer already;
  //  here we also restore notif-panel via cr-visible when skeleton-module fires)
  var _origReveal = window.revealDrawers;
  window.revealDrawers = function () {
    if (_origReveal) _origReveal();
    var panel    = document.getElementById('notif-panel');
    var backdrop = document.getElementById('notif-backdrop');
    if (panel)    panel.classList.add('cr-visible');
    if (backdrop) backdrop.classList.add('cr-visible');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
