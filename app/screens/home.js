// HOME — "My District" Locality-First Interface
// Structured around: THE DISTRICT · Mellanby · University of Ibadan
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

  var wrap = el('div', { class: 'home-shell' }, []);

  // =========================================================================
  // 1. LOCALITY-FIRST HEADER: MY DISTRICT
  // =========================================================================
  var hero = el('div', { class: 'home-hero' }, [
    el('div', { class: 'eyebrow' }, [
      el('span', { class: 'bar' }, []),
      'THE DISTRICT · ' + d.name + ' · ' + (d.parentDistrict || 'University of Ibadan'),
    ]),
    el('h1', {}, ['What's happening ', el('em', {}, ['around you']), '?']),
    el('div', { class: 'sub' }, [
      d.activeToday.toLocaleString() + ' residents active · ' + (d.businessesCount || d.providers) + ' verified providers · ' + d.eventsToday + ' events today.',
    ]),
  ]);
  wrap.appendChild(hero);

  // =========================================================================
  // 2. TODAY IN MELLANBY (Structured Daily Digest)
  // =========================================================================
  var digestItems = [];

  if (notices && notices.length) {
    var primaryNotice = notices[0];
    digestItems.push({
      type: '📢 Hall Announcement',
      title: primaryNotice.title,
      sub: primaryNotice.issuer + ' · ' + primaryNotice.createdDate,
      href: '#/notice/' + primaryNotice.id,
      badge: 'OFFICIAL',
      badgeClass: 'badge-official',
    });
  }

  if (businesses && businesses.length) {
    digestItems.push({
      type: '🔧 Trusted Providers',
      title: businesses.length + ' providers available today',
      sub: 'Tailoring, Hair & Beauty, Tech Repairs, Catering',
      href: '#/explore/Businesses',
      badge: 'VERIFIED BIZ',
      badgeClass: 'badge-business',
    });
  }

  if (events && events.length) {
    var topEvent = events[0];
    digestItems.push({
      type: '⚽ Activity & Events',
      title: topEvent.title,
      sub: topEvent.date + ' · ' + topEvent.venue,
      href: '#/event/' + topEvent.id,
      badge: 'EVENT',
      badgeClass: 'chip ember',
    });
  }

  if (requests && requests.length) {
    var topReq = requests[0];
    digestItems.push({
      type: '🙋 Open Request',
      title: topReq.title,
      sub: 'Budget: ' + topReq.budget + ' · Posted ' + topReq.createdDate,
      href: '#/requests',
      badge: 'DEMAND',
      badgeClass: 'chip on',
    });
  }

  if (opportunities && opportunities.length) {
    var topOpp = opportunities[0];
    digestItems.push({
      type: '💼 New Opportunity',
      title: topOpp.title,
      sub: topOpp.postedByName + ' · ' + topOpp.compensation,
      href: '#/opportunity/' + topOpp.id,
      badge: 'GIG',
      badgeClass: 'chip',
    });
  }

  wrap.appendChild(el('div', { class: 'home-section', style: 'margin-top:20px;' }, [
    el('div', { class: 'home-section-head' }, [
      el('h2', {}, ['Today in ' + d.name]),
      el('span', { style: 'font-family:var(--font-mono); font-size:10px; color:var(--stone); text-transform:uppercase;' }, ['Live Digest']),
    ]),
    el('div', { style: 'display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:12px;' }, digestItems.map(function (item) {
      return el('a', {
        class: 'card',
        href: item.href,
        style: 'padding:14px 16px; text-decoration:none; color:inherit; display:flex; flex-direction:column; justify-content:space-between; gap:10px;',
      }, [
        el('div', {}, [
          el('div', { style: 'display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;' }, [
            el('span', { style: 'font-family:var(--font-mono); font-size:10px; text-transform:uppercase; color:var(--stone);' }, [item.type]),
            el('span', { class: item.badgeClass, style: 'font-size:9.5px;' }, [item.badge]),
          ]),
          el('div', { style: 'font-weight:500; font-size:15px;' }, [item.title]),
          el('div', { style: 'font-size:12px; color:var(--stone); margin-top:3px;' }, [item.sub]),
        ]),
        el('div', { style: 'font-family:var(--font-mono); font-size:10.5px; color:var(--ember-deep); font-weight:500; text-align:right;' }, ['View →']),
      ]);
    })),
  ]));

  // =========================================================================
  // 3. NEED SOMETHING? (Dual Entrypoint: Search + Post Request)
  // =========================================================================
  wrap.appendChild(el('div', { class: 'home-section' }, [
    el('div', { class: 'home-section-head' }, [
      el('h2', {}, ['Need something?']),
      el('a', { href: '#/requests' }, ['View Requests →']),
    ]),
    el('div', { class: 'card', style: 'padding:20px; background:var(--vellum);' }, [
      el('div', { style: 'font-size:14.5px; color:var(--ink-soft); margin-bottom:14px;' }, ['Search for a service, product, person or place in ' + d.name + ' — or broadcast a custom request directly to local providers.']),
      el('div', { style: 'display:flex; gap:10px; flex-wrap:wrap;' }, [
        el('button', {
          class: 'btn btn-primary grow',
          style: 'flex:1; min-width:200px;',
          onclick: function () { District.navigate('#/search'); },
        }, [icon('search', 'icon-sm'), 'Search ' + d.name]),
        el('button', {
          class: 'btn btn-ember grow',
          style: 'flex:1; min-width:200px;',
          onclick: function () { District.openPostRequestModal(); },
        }, [icon('plus', 'icon-sm'), 'Post a Request for Help']),
      ]),
    ]),
  ]));

  // =========================================================================
  // 4. DISCOVER THE DISTRICT (Pillar Matrix)
  // =========================================================================
  var gateways = [
    { label: 'Services', filter: 'Services', icon: 'grid' },
    { label: 'Products', filter: 'Products', icon: 'bag' },
    { label: 'Businesses', filter: 'Businesses', icon: 'store' },
    { label: 'Places', filter: 'Places', icon: 'pin' },
    { label: 'Events', filter: 'Events', icon: 'calendar' },
    { label: 'People', filter: 'People', icon: 'user' },
  ];

  wrap.appendChild(el('div', { class: 'home-section' }, [
    el('div', { class: 'home-section-head' }, [
      el('h2', {}, ['Discover ' + d.name]),
      el('a', { href: '#/explore' }, ['Explore all →']),
    ]),
    el('div', { class: 'gateway-matrix' }, gateways.map(function (gw) {
      return el('a', { class: 'gateway-pill', href: '#/explore/' + encodeURIComponent(gw.filter) }, [
        icon(gw.icon, 'icon-sm'),
        gw.label,
      ]);
    })),
  ]));

  // =========================================================================
  // 5. PLACES IN MELLANBY
  // =========================================================================
  if (places && places.length) {
    var placeCards = places.map(function (pl) {
      var fig = pl.image
        ? el('div', { class: 'd-figure', style: 'height:110px;' }, [
            el('img', { src: pl.image, alt: pl.name, style: 'width:100%;height:100%;object-fit:cover;' }),
          ])
        : el('div', { class: 'd-placeholder', style: 'height:110px;', 'data-label': pl.type.toUpperCase(), 'data-coord': pl.coord || '' }, []);

      return el('a', { class: 'place-card', href: '#/place/' + pl.id }, [
        fig,
        el('div', { class: 'place-card-body' }, [
          el('div', {}, [
            el('div', { class: 'cat' }, [pl.type]),
            el('div', { class: 'name' }, [pl.name]),
          ]),
          el('div', { style: 'margin-top:10px;' }, [
            el('div', { class: 'live-chip ' + (pl.liveStatus && pl.liveStatus.level || 'good') }, [
              el('span', { class: 'pulse-dot' }, []),
              pl.liveStatus ? pl.liveStatus.tag : 'Open',
            ]),
          ]),
        ]),
      ]);
    });

    wrap.appendChild(el('div', { class: 'home-section' }, [
      el('div', { class: 'home-section-head' }, [
        el('h2', {}, ['Places in ' + d.name]),
        el('a', { href: '#/explore/Places' }, ['All places →']),
      ]),
      el('div', { class: 'hcard-scroll' }, placeCards),
    ]));
  }

  // =========================================================================
  // 6. OPEN REQUESTS IN MELLANBY
  // =========================================================================
  if (requests && requests.length) {
    var reqCards = requests.slice(0, 2).map(function (rq) {
      return el('div', { class: 'request-card' }, [
        el('div', { class: 'request-head' }, [
          el('div', {}, [
            el('div', { class: 'request-cat' }, [rq.category + ' · ' + rq.urgency]),
            el('h3', { class: 'request-title' }, [rq.title]),
          ]),
          el('div', { class: 'request-stipend' }, [rq.budget]),
        ]),
        el('p', { class: 'request-desc' }, [rq.description]),
        el('div', { class: 'request-footer' }, [
          el('div', { class: 'request-meta' }, [
            el('span', {}, [icon('user', 'icon-sm'), 'Posted by ' + rq.requesterName]),
            el('span', {}, ['· ' + rq.location]),
          ]),
          el('button', {
            class: 'btn btn-primary btn-sm',
            onclick: function () { District.openRespondRequestModal(rq); },
          }, ['Offer Service (' + rq.responsesCount + ')']),
        ]),
      ]);
    });

    wrap.appendChild(el('div', { class: 'home-section' }, [
      el('div', { class: 'home-section-head' }, [
        el('h2', {}, ['Active Requests']),
        el('a', { href: '#/requests' }, ['View all (' + requests.length + ') →']),
      ]),
      el('div', { style: 'display:flex; flex-direction:column; gap:10px;' }, reqCards),
    ]));
  }

  return wrap;
};
