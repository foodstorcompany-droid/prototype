// HOME — "The Living District"
// Experiential Civic & Commercial Hub for Mellanby · University of Ibadan
// Brand: People · Place · Purpose
window.District = window.District || {};
District.screens = District.screens || {};

District.screens.home = function () {
  var el = District.el, icon = District.icon;
  var d = District.getDistrict();
  var notices = District.getAnnouncements(d.id);
  var happening = District.getHappeningNow(d.id);
  var places = District.getPlaces(d.id);
  var events = District.getEvents(d.id);
  var opportunities = District.getOpportunities(d.id);
  var requests = District.getRequests(d.id);
  var businesses = District.getBusinesses(d.id);

  // Solar local time greeting
  var hour = new Date().getUTCHours() + (d.localTimeOffset || 1);
  hour = ((hour % 24) + 24) % 24;
  var greeting = hour < 5 ? 'Late night in' : hour < 12 ? 'Good morning,' : hour < 17 ? 'Good afternoon,' : 'Good evening,';

  var wrap = el('div', { class: 'home-shell' }, []);

  // =========================================================================
  // 1. BRAND HERO & LOCALITY PULSE
  // =========================================================================
  var hero = el('div', { class: 'home-hero', style: 'position:relative; overflow:hidden;' }, [
    el('div', { class: 'eyebrow' }, [
      el('span', { class: 'bar' }, []),
      icon('cartographicMark', 'icon-sm'),
      'THE DISTRICT · ' + d.name + ' · ' + (d.parentDistrict || 'University of Ibadan'),
    ]),
    el('h1', { style: 'margin:8px 0 10px; font-family:var(--font-sans); font-weight:700;' }, [
      greeting, ' ', el('em', { style: 'font-family:var(--font-serif); font-weight:600; color:var(--district-bronze);' }, [d.name]), '.',
    ]),
    el('div', { class: 'sub', style: 'max-width:580px; font-size:15px; line-height:1.5; color:var(--ink-soft);' }, [
      'A living civic system connecting residents, local businesses, services, and opportunities in ' + d.name + '.',
    ]),

    // Quick Action Matrix
    el('div', { class: 'home-search', style: 'margin-top:20px;' }, [
      el('input', {
        placeholder: 'Search ' + d.name + ' — services, phone repair, tailoring, events, places…',
        onfocus: function () { District.navigate('#/search'); },
        onkeydown: function (e) { if (e.key === 'Enter') District.navigate('#/search'); },
      }, []),
      el('button', {
        class: 'btn btn-primary',
        onclick: function () { District.navigate('#/search'); },
      }, [icon('search', 'icon-sm'), 'Search']),
    ]),

    // Live Stats Bar
    el('div', { style: 'display:flex; gap:18px; margin-top:18px; flex-wrap:wrap; font-family:var(--font-mono); font-size:11px; color:var(--stone); align-items:center;' }, [
      el('span', { style: 'display:inline-flex; align-items:center; gap:6px;' }, [
        el('span', { style: 'width:7px; height:7px; background:var(--signal); border-radius:50%; display:inline-block;' }, []),
        d.activeToday.toLocaleString() + ' Active Residents',
      ]),
      el('span', {}, ['· ' + (d.businessesCount || d.providers) + ' Verified Providers']),
      el('span', {}, ['· ' + d.eventsToday + ' Events Today']),
      el('span', {}, ['· ' + requests.length + ' Open Requests']),
    ]),
  ]);
  wrap.appendChild(hero);

  // =========================================================================
  // 2. LIVE ACTIVITY PULSE (Living Stream)
  // =========================================================================
  if (happening && happening.length) {
    var pulseItems = happening.map(function (item) {
      return el('a', { class: 'happening-item', href: '#/activity', style: 'text-decoration:none;' }, [
        el('span', { class: 'happening-time' }, [item.time]),
        el('span', { class: 'happening-body' }, [
          el('b', {}, [item.entityName]),
          item.text,
        ]),
        el('span', { class: 'happening-badge' }, [item.badge]),
      ]);
    });

    wrap.appendChild(el('div', { class: 'home-section', style: 'margin-top:10px;' }, [
      el('div', { class: 'home-section-head' }, [
        el('h2', { style: 'display:flex; align-items:center; gap:8px;' }, [
          el('span', { class: 'pulse-dot' }, []),
          'Happening Right Now',
        ]),
        el('a', { href: '#/activity' }, ['Activity Feed →']),
      ]),
      el('div', { class: 'happening-stream' }, pulseItems),
    ]));
  }

  // =========================================================================
  // 3. OFFICIAL NOTICE (Institutional Seal & Authority)
  // =========================================================================
  if (notices && notices.length) {
    var primaryNotice = notices[0];
    var noticeCard = el('div', { class: 'district-notice-card', style: 'margin-top:20px; border-left:4px solid var(--district-bronze);' }, [
      el('div', { class: 'district-notice-head' }, [
        el('div', { class: 'notice-seal' }, [
          el('span', { class: 'seal-dot', style: 'background:var(--district-bronze);' }, []),
          el('span', { class: 'badge-official', style: 'margin-right:6px;' }, ['OFFICIAL']),
          primaryNotice.issuerType + ' · ' + primaryNotice.issuer,
        ]),
        el('div', { class: 'notice-time' }, [primaryNotice.createdDate]),
      ]),
      el('h3', { style: 'margin:8px 0;' }, [primaryNotice.title]),
      el('p', { style: 'margin:0 0 10px; color:var(--ink-soft); line-height:1.5;' }, [
        primaryNotice.body.length > 150 ? primaryNotice.body.slice(0, 150) + '…' : primaryNotice.body,
      ]),
      el('div', { style: 'display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;' }, [
        el('div', { class: 'notice-meta' }, ['Jurisdiction: ' + primaryNotice.jurisdiction]),
        el('a', { href: '#/notice/' + primaryNotice.id, class: 'btn btn-ghost btn-sm', style: 'font-size:11px;' }, ['Read Official Notice →']),
      ]),
    ]);
    wrap.appendChild(noticeCard);
  }

  // =========================================================================
  // 4. DEMAND & REQUESTS BANNER ("Need Something in Mellanby?")
  // =========================================================================
  wrap.appendChild(el('div', { class: 'home-section', style: 'margin-top:24px;' }, [
    el('div', { class: 'card', style: 'padding:22px; background:var(--vellum); border:1px solid var(--fog);' }, [
      el('div', { style: 'display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;' }, [
        el('div', { style: 'max-width:500px;' }, [
          el('div', { class: 'd-meta', style: 'color:var(--district-bronze); margin-bottom:6px;' }, ['Hyper-Local Demand Engine']),
          el('h3', { style: 'margin:0 0 6px; font-family:var(--font-sans); font-size:18px;' }, ['Need a service, repair, or artisan today?']),
          el('p', { style: 'margin:0; font-size:13.5px; color:var(--ink-soft);' }, [
            'Broadcast what you need to verified providers in ' + d.name + ' and receive instant proposals.',
          ]),
        ]),
        el('div', { style: 'display:flex; gap:8px; flex-wrap:wrap;' }, [
          el('button', {
            class: 'btn btn-ember',
            onclick: function () { District.openPostRequestModal(); },
          }, [icon('plus', 'icon-sm'), 'Post a Request']),
          el('a', {
            class: 'btn btn-ghost',
            href: '#/requests',
          }, ['Browse Requests (' + requests.length + ')']),
        ]),
      ]),
    ]),
  ]));

  // =========================================================================
  // 5. SPACES & PLACES IN MELLANBY (Experiential Photo Cards)
  // =========================================================================
  if (places && places.length) {
    var placeCards = places.map(function (pl) {
      var fig = pl.image
        ? el('div', { class: 'd-figure', style: 'height:130px;' }, [
            el('img', { src: pl.image, alt: pl.name, style: 'width:100%;height:100%;object-fit:cover;' }),
          ])
        : el('div', { class: 'd-placeholder', style: 'height:130px;', 'data-label': pl.type.toUpperCase(), 'data-coord': pl.coord || '' }, []);

      return el('a', { class: 'place-card', href: '#/place/' + pl.id }, [
        fig,
        el('div', { class: 'place-card-body' }, [
          el('div', {}, [
            el('div', { class: 'cat' }, [pl.type]),
            el('div', { class: 'name', style: 'font-weight:600;' }, [pl.name]),
          ]),
          el('div', { style: 'margin-top:8px; display:flex; justify-content:space-between; align-items:center;' }, [
            el('div', { class: 'live-chip ' + (pl.liveStatus && pl.liveStatus.level || 'good') }, [
              el('span', { class: 'pulse-dot' }, []),
              pl.liveStatus ? pl.liveStatus.tag : 'Open',
            ]),
            el('span', { style: 'font-family:var(--font-mono); font-size:10px; color:var(--stone);' }, [pl.coord ? pl.coord.split('·')[0].trim() : 'Mellanby']),
          ]),
        ]),
      ]);
    });

    wrap.appendChild(el('div', { class: 'home-section' }, [
      el('div', { class: 'home-section-head' }, [
        el('h2', {}, ['Places & Spaces in ' + d.name]),
        el('a', { href: '#/explore/Places' }, ['All Places (' + places.length + ') →']),
      ]),
      el('div', { class: 'hcard-scroll' }, placeCards),
    ]));
  }

  // =========================================================================
  // 6. TRUSTED LOCAL PROVIDERS & ARTISANS
  // =========================================================================
  if (businesses && businesses.length) {
    var providerCards = businesses.map(function (b) {
      return el('div', { class: 'card', style: 'padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;' }, [
        el('div', { style: 'display:flex; gap:12px; align-items:flex-start;' }, [
          b.image
            ? el('img', { src: b.image, alt: b.name, style: 'width:48px;height:48px;border-radius:var(--r-md);object-fit:cover;' })
            : el('div', { class: 'provider-avatar', style: 'width:48px;height:48px;font-size:16px;' }, [b.avatarLabel || b.name.slice(0, 2).toUpperCase()]),
          el('div', { style: 'flex:1;' }, [
            el('div', { style: 'display:flex; justify-content:space-between; align-items:center;' }, [
              el('span', { class: 'badge-business' }, ['VERIFIED BIZ']),
              el('span', { style: 'font-family:var(--font-mono); font-size:11px; font-weight:600; color:var(--signal);' }, ['★ ' + (b.rating ? b.rating.toFixed(1) : '4.9')]),
            ]),
            el('div', { style: 'font-weight:600; font-size:15px; margin-top:2px;' }, [b.name]),
            el('div', { style: 'font-size:12px; color:var(--stone);' }, [b.category + (b.ownerName ? ' · ' + b.ownerName : '')]),
          ]),
        ]),
        el('p', { style: 'font-size:13px; color:var(--ink-soft); margin:0; line-height:1.4;' }, [
          b.bio && b.bio.length > 90 ? b.bio.slice(0, 90) + '…' : (b.bio || 'Local provider in ' + d.name)
        ]),
        el('div', { style: 'display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--fog); padding-top:10px;' }, [
          el('span', { style: 'font-family:var(--font-mono); font-size:10px; color:var(--stone);' }, [
            (b.completed || 47) + ' transactions · 98% completion',
          ]),
          el('a', { class: 'btn btn-primary btn-sm', href: '#/business/' + b.id }, ['View Storefront']),
        ]),
      ]);
    });

    wrap.appendChild(el('div', { class: 'home-section' }, [
      el('div', { class: 'home-section-head' }, [
        el('h2', {}, ['Trusted Providers in ' + d.name]),
        el('a', { href: '#/explore/Businesses' }, ['View All (' + businesses.length + ') →']),
      ]),
      el('div', { style: 'display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px;' }, providerCards),
    ]));
  }

  // =========================================================================
  // 7. COMMUNITY EVENTS & HAPPENINGS
  // =========================================================================
  if (events && events.length) {
    var eventCards = events.map(function (ev) {
      return el('div', { class: 'card', style: 'padding:16px; display:flex; justify-content:space-between; align-items:center; gap:14px;' }, [
        el('div', { style: 'display:flex; gap:14px; align-items:center;' }, [
          el('div', { style: 'background:var(--district-earth); color:var(--warm-white); padding:10px 14px; border-radius:var(--r-md); text-align:center; font-family:var(--font-mono);' }, [
            el('div', { style: 'font-size:10px; text-transform:uppercase;' }, [ev.date.split(' ')[0] || 'TODAY']),
            el('div', { style: 'font-size:18px; font-weight:700;' }, [ev.date.split(' ')[1] || '29']),
          ]),
          el('div', {}, [
            el('span', { class: 'chip ember', style: 'font-size:10px; padding:3px 8px; margin-bottom:4px;' }, [ev.category]),
            el('h4', { style: 'margin:2px 0; font-size:15px; font-weight:600;' }, [ev.title]),
            el('div', { style: 'font-size:12px; color:var(--stone);' }, [ev.venue + ' · ' + ev.time]),
          ]),
        ]),
        el('div', { style: 'display:flex; flex-direction:column; gap:6px; align-items:flex-end;' }, [
          el('button', {
            class: 'btn btn-sm ' + (ev.userRsvpd ? 'btn-ember' : 'btn-ghost'),
            onclick: function () { District.toggleRSVP(ev.id); },
          }, [ev.userRsvpd ? 'Attending ✓' : 'RSVP (' + ev.rsvpCount + ')']),
          el('a', { href: '#/event/' + ev.id, style: 'font-family:var(--font-mono); font-size:10px; color:var(--district-bronze); text-decoration:none;' }, ['Details →']),
        ]),
      ]);
    });

    wrap.appendChild(el('div', { class: 'home-section' }, [
      el('div', { class: 'home-section-head' }, [
        el('h2', {}, ['Upcoming Events']),
        el('a', { href: '#/explore/Events' }, ['Calendar →']),
      ]),
      el('div', { style: 'display:flex; flex-direction:column; gap:10px;' }, eventCards),
    ]));
  }

  return wrap;
};
