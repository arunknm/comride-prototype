/**
 * COMRIDE — Journey Mode
 * Activates when a page is visited from user-journeys.html (?from=journeys)
 * Shows: scanline animation + clickable element highlights + journey nav bar
 */
(function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get('from') !== 'journeys') return;

  const journeyIdx = params.has('j') ? parseInt(params.get('j')) : null;
  const stepIdx    = params.has('s') ? parseInt(params.get('s')) : null;
  const hasProgress = journeyIdx !== null && stepIdx !== null;

  const JOURNEYS = [
    { name: 'Onboarding',      color: '#E2FF3B', steps: [
      { label: 'Splash',      file: 'splash.html'         },
      { label: 'Sign In',     file: 'login.html'          },
      { label: 'Profile',     file: 'profile-setup.html'  },
      { label: 'Ride DNA',    file: 'interests.html'      },
      { label: 'Feed',        file: 'home.html'           }
    ]},
    { name: 'Ride Planning',   color: '#E2FF3B', steps: [
      { label: 'Explore',     file: 'home.html'               },
      { label: 'AI Plan',     file: 'ai-suggestions.html'     },
      { label: 'Route',       file: 'route-builder.html'      },
      { label: 'Mode',        file: 'create-ride-modes.html'  },
      { label: 'Ride',        file: 'my-ride-detail.html'     }
    ]},
    { name: 'Ride Execution',  color: '#E2FF3B', steps: [
      { label: 'Detail',      file: 'my-ride-detail.html' },
      { label: 'Start',       file: 'trip-start.html'     },
      { label: 'Tracking',    file: 'tracking.html'       },
      { label: 'End',         file: 'end-ride.html'       },
      { label: 'Analytics',   file: 'analytics.html'      }
    ]},
    { name: 'Group Ride',      color: '#E2FF3B', steps: [
      { label: 'Groups',      file: 'groups.html'           },
      { label: 'Club',        file: 'club-profile.html'     },
      { label: 'Invited',     file: 'invited-ride.html'     },
      { label: 'Join',        file: 'request-to-join.html'  },
      { label: 'Accepted',    file: 'admin-accepted.html'   },
      { label: 'Chat',        file: 'chat.html'             },
      { label: 'Go!',         file: 'trip-start.html'       }
    ]},
    { name: 'Live Tracking',   color: '#E2FF3B', steps: [
      { label: 'Start',       file: 'trip-start.html' },
      { label: 'Tracking',    file: 'tracking.html'   },
      { label: 'Chat',        file: 'chat.html'       },
      { label: 'End',         file: 'end-ride.html'   }
    ]},
    { name: 'User Profile',    color: '#E2FF3B', steps: [
      { label: 'Profile',     file: 'profile.html'         },
      { label: 'Comrade',     file: 'comrade-profile.html' },
      { label: 'Rewards',     file: 'rewards.html'         },
      { label: 'Analytics',   file: 'analytics.html'       },
      { label: 'Settings',    file: 'settings.html'        }
    ]},
    { name: 'Purchase',        color: '#E2FF3B', steps: [
      { label: 'Shop',        file: 'marketplace.html'   },
      { label: 'Brand',       file: 'brand-profile.html' },
      { label: 'Product',     file: 'product-detail.html'},
      { label: 'Checkout',    file: 'payments.html'      }
    ]}
  ];

  const journey  = hasProgress ? (JOURNEYS[journeyIdx] || JOURNEYS[0]) : null;
  const step     = hasProgress ? (journey.steps[stepIdx] || journey.steps[0]) : null;
  const nextStep = hasProgress ? (journey.steps[stepIdx + 1] || null) : null;
  const acc      = '#E2FF3B';

  /* ── Inject CSS ─────────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
    @keyframes jm-scan {
      0%   { top: -4px; opacity: 1; }
      85%  { opacity: 1; }
      100% { top: 105%; opacity: 0; }
    }
    @keyframes jm-reveal {
      from { opacity:0; transform:translate(-50%,-14px) scale(0.92); }
      to   { opacity:1; transform:translate(-50%,0)    scale(1);    }
    }
    @keyframes jm-nav-in {
      from { opacity:0; transform:translateY(16px); }
      to   { opacity:1; transform:translateY(0);    }
    }
    @keyframes jm-ring {
      0%,100% { box-shadow: 0 0 0 0   rgba(226,255,59,0.75); }
      50%     { box-shadow: 0 0 0 7px rgba(226,255,59,0);    }
    }
    @keyframes jm-outline {
      0%,100% { outline-color: rgba(226,255,59,0.85); }
      50%     { outline-color: rgba(226,255,59,0.15); }
    }
    @keyframes jm-dot {
      0%,100% { opacity:1; transform:scale(1);   }
      50%     { opacity:0.4; transform:scale(0.7); }
    }
    /* scanline */
    #jm-scan { position:fixed; left:0; right:0; height:2px;
      background:linear-gradient(to right,transparent 0%,rgba(226,255,59,0.9) 40%,rgba(255,255,255,0.6) 50%,rgba(226,255,59,0.9) 60%,transparent 100%);
      z-index:99999; pointer-events:none;
      box-shadow: 0 0 12px 4px rgba(226,255,59,0.5);
      animation: jm-scan 1.1s cubic-bezier(0.4,0,0.6,1) 0.1s both; }
    /* pill */
    #jm-pill { position:fixed; top:80px; left:50%; transform:translateX(-50%);
      background:#E2FF3B; color:#000;
      font-family:'Space Grotesk',sans-serif; font-weight:700;
      font-size:9px; letter-spacing:2px; text-transform:uppercase;
      padding:6px 14px 6px 8px; border-radius:20px;
      display:flex; align-items:center; gap:8px;
      box-shadow:0 4px 24px rgba(226,255,59,0.5), 0 0 0 1px rgba(226,255,59,0.3);
      z-index:9998; white-space:nowrap;
      animation: jm-reveal 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.5s both; }
    /* element highlight — applied then removed */
    .jm-hl {
      outline:1.5px solid rgba(226,255,59,0.8) !important;
      outline-offset:3px !important;
      animation: jm-outline 1.8s ease infinite !important;
      border-radius:inherit; }
    .jm-hl-cta {
      animation: jm-ring 1.6s ease infinite !important; }
    /* bottom journey nav */
    #jm-nav { position:fixed; bottom:88px; left:12px; right:12px;
      background:rgba(0,0,0,0.92); backdrop-filter:blur(24px);
      border:1px solid rgba(226,255,59,0.22);
      border-radius:18px; padding:11px 14px;
      display:flex; align-items:center; gap:10px;
      z-index:9997;
      animation: jm-nav-in 0.4s ease 0.8s both;
      box-shadow:0 8px 32px rgba(0,0,0,0.6); }
  `;
  document.head.appendChild(css);

  /* ── Build URL helper ────────────────────────────────────── */
  function jmHref(file, jIdx, sIdx) {
    return file + '?from=journeys&j=' + jIdx + '&s=' + sIdx;
  }

  /* ── Init (after DOM ready) ─────────────────────────────── */
  function init() {

    /* 1 · Scanline sweep */
    const scan = document.createElement('div');
    scan.id = 'jm-scan';
    document.body.appendChild(scan);
    setTimeout(() => scan.remove(), 1400);

    /* 2 · Journey-mode pill */
    const dot = `<span style="width:7px;height:7px;border-radius:50%;background:#000;animation:jm-dot 1s infinite;flex-shrink:0"></span>`;
    const pill = document.createElement('div');
    pill.id = 'jm-pill';
    const pillLabel = hasProgress
      ? (dot + ' JOURNEY MODE &nbsp;·&nbsp; ' + journey.name.toUpperCase() + ' &nbsp;·&nbsp; STEP ' + (stepIdx + 1) + '/' + journey.steps.length)
      : (dot + ' JOURNEY MODE &nbsp;·&nbsp; TAP TO EXPLORE');
    pill.innerHTML = pillLabel;
    document.body.appendChild(pill);
    /* auto-hide pill after 4 s */
    setTimeout(() => {
      pill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      pill.style.opacity    = '0';
      pill.style.transform  = 'translateX(-50%) translateY(-14px)';
      setTimeout(() => pill.remove(), 600);
    }, 4000);

    /* 3 · Highlight all interactive elements */
    setTimeout(() => {
      const els = Array.from(document.querySelectorAll(
        'a[href]:not([href="#"]):not([href=""]), button, [onclick]'
      ));
      els.forEach(el => {
        el.classList.add('jm-hl');
        const r = el.getBoundingClientRect();
        if (r.width > 140 || el.tagName === 'BUTTON') el.classList.add('jm-hl-cta');
      });
      /* remove highlight after 3.8 s */
      setTimeout(() => {
        els.forEach(el => { el.classList.remove('jm-hl', 'jm-hl-cta'); });
      }, 3800);
    }, 350);

    /* 4 · Journey progress nav bar — only when j+s are present */
    if (!hasProgress) return;
    const dots = journey.steps.map((s, i) => {
      const active = i === stepIdx;
      const past   = i < stepIdx;
      const bg     = active ? '#E2FF3B' : past ? 'rgba(226,255,59,0.4)' : 'rgba(255,255,255,0.14)';
      const w      = active ? '20px' : '6px';
      return `<a href="${jmHref(s.file, journeyIdx, i)}" style="width:${w};height:6px;border-radius:3px;background:${bg};flex-shrink:0;transition:all .3s ease;text-decoration:none" title="${s.label}"></a>`;
    }).join('');

    const nextBtn = nextStep
      ? `<a href="${jmHref(nextStep.file, journeyIdx, stepIdx + 1)}"
           style="flex-shrink:0;height:30px;background:#E2FF3B;border-radius:10px;padding:0 14px;
                  display:flex;align-items:center;gap:5px;text-decoration:none;
                  font-family:'Space Grotesk',sans-serif;font-size:9px;font-weight:700;
                  color:#000;letter-spacing:1.5px;white-space:nowrap">
           NEXT
           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
         </a>`
      : `<a href="user-journeys.html"
           style="flex-shrink:0;height:30px;background:#E2FF3B;border-radius:10px;padding:0 14px;
                  display:flex;align-items:center;gap:5px;text-decoration:none;
                  font-family:'Space Grotesk',sans-serif;font-size:9px;font-weight:700;
                  color:#000;letter-spacing:1.5px;white-space:nowrap">
           DONE ✓
         </a>`;

    const nav = document.createElement('div');
    nav.id = 'jm-nav';
    nav.innerHTML = `
      <a href="user-journeys.html"
         style="flex-shrink:0;width:30px;height:30px;border-radius:50%;
                background:rgba(226,255,59,0.1);border:1px solid rgba(226,255,59,0.3);
                display:flex;align-items:center;justify-content:center;text-decoration:none">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E2FF3B" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </a>
      <div style="flex:1;min-width:0">
        <p style="font-family:'Manrope',sans-serif;font-size:9px;color:#E2FF3B;
                  font-weight:700;margin:0 0 6px;letter-spacing:1px;white-space:nowrap;
                  overflow:hidden;text-overflow:ellipsis">${journey.name.toUpperCase()}</p>
        <div style="display:flex;gap:4px;align-items:center">${dots}</div>
      </div>
      ${nextBtn}`;
    document.body.appendChild(nav);

    /* 5 · Preserve ?from=journeys on all intra-site links */
    document.querySelectorAll('a[href]').forEach(link => {
      const h = link.getAttribute('href') || '';
      if (!h || h.startsWith('http') || h.startsWith('#') || h.startsWith('mailto')
          || h.includes('?') || h.includes('user-journeys') || h.includes('journey-mode')) return;
      /* keep current journey context */
      link.setAttribute('href', h + '?from=journeys&j=' + journeyIdx + '&s=' + stepIdx);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
