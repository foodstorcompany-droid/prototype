// HOME — "What's happening in my world right now?"
// Adaptive editorial composition centered around place identity, verified notices,
// real-time pulses, entity gateways, live places, and community events.
window.District = window.District || {};
District.screens = District.screens || {};

District.screens.home = function () {
  var el = District.el, icon = District.icon;
  var d = District.getDistrict();
  var notices = District.getAnnouncements(d.id);
  var happening = District.getHappeningNow(d.id);
  var places = District.getPlaces(d.id);
  var events = District.getEvents(d.id);
  var rising = District.getRising(d.id);
  var opportunities = District.getOpportunities(d.id);

  // Solar local time greeting
  var hour = new Date().getUTCHours() + d.localTimeOffset;
  hour = ((hour % 24) + 24) % 24;
  var greeting = hour < 5 ? 'Late night in' : hour < 12 ? 'Good morning,' : hour < 17 ? 'Good afternoon,' : 'Good evening,';

  var wrap = el('div', { class: 'home-shell' }, []);

  // =========================================================================
  // 1. DISTRICT IDENTITY & VITALS
  // =========================================================================
  var hero = el('div', { class: 'home-hero' }, [
    el('div', { class: 'eyebrow' }, [
      el('span', { class: 'bar' }, []),
      (d.jurisdiction ? d.jurisdiction.slice(0, 3).join(' · ') : d.name + ' · ' + d.ring.slice(1).join(' › ')),
    ]),
    el('h1', {}, [greeting, ' ', el('em', {}, [d.name]), '.']),
    el('div', { class: 'sub' }, [
      d.activeToday.toLocaleString() + ' people active · ' + (d.businessesCount || d.providers) + ' businesses · ' + d.eventsToday + ' events today.',
    ]),
    el('div', { class: 'home-search' }, [
      el('input', {
        placeholder: 'Search ' + d.name + ' — places, events, food, organisations, gigs…',
        onfocus: function () { District.navigate('#/search'); },
        onkeydown: function (e) { if (e.key === 'Enter') District.navigate('#/search'); },
      }, []),
      el('button', { class: 'btn btn-primary', onclick: function () { District.navigate('#/search'); } }, [icon('search', 'icon-sm')]),
    ]),
  ]);
  wrap.appendChild(hero);

  // =========================================================================
  // 2. CONTEXTUAL OFFICIAL NOTICE (Authority-Stamped)
  // =========================================================================
  if (notices && notices.length) {
    var primaryNotice = notices[0];
    var noticeBanner = el('div', { class: 'district-notice-card' }, [
      el('div', { class: 'district-notice-head' }, [
        el('div', { class: 'notice-seal' }, [el('span', { class: 'seal-dot' }, []), primaryNotice.issuerType + ' · ' + primaryNotice.issuer]),
        el('div', { class: 'notice-time' }, [primaryNotice.createdDate]),
      ]),
      el('h3', {}, [primaryNotice.title]),
      el('p', {}, [primaryNotice.body.length > 140 ? primaryNotice.body.slice(0, 140) + '…' : primaryNotice.body]),
      el('div', { style: 'display:flex; justify-content:space-between; align-items:center; margin-top:8px;' }, [
        el('div', { class: 'notice-meta' }, ['Jurisdiction: ' + primaryNotice.jurisdiction]),
        el('a', { href: '#/notice/' + primaryNotice.id, style: 'font-family:var(--font-mono); font-size:11px; text-transform:uppercase; color:var(--ember-deep); text-decoration:none; font-weight:500;' }, ['Read full notice →']),
      ]),
    ]);
    wrap.appendChild(noticeBanner);
  }

  // =========================================================================
  // 3. HAPPENING NOW (Living Pulse of the Place)
  // =========================================================================
  if (happening && happening.length) {
    var streamRows = happening.map(function (item) {
      return el('a', { class: 'happening-item', href: '#/explore' }, [
        el('span', { class: 'happening-time' }, [item.time]),
        el('span', { class: 'happening-body' }, [
          el('b', {}, [item.entityName]),
          item.text,
        ]),
        el('span', { class: 'happening-badge' }, [item.badge]),
      ]);
    });

    wrap.appendChild(el('div', { class: 'home-section' }, [
      el('div', { class: 'home-section-head' }, [
        el('h2', {}, ['Happening now']),
        el('a', { href: '#/activity' }, ['Live Activity →']),
      ]),
      el('div', { class: 'happening-stream' }, streamRows),
    ]));
  }

  // =========================================================================
  // 4. DISCOVER THE DISTRICT (Entity Gateway Matrix)
  // =========================================================================
  var gateways = [
    { label: 'Businesses', filter: 'Businesses', icon: 'store' },
    { label: 'Places', filter: 'Places', icon: 'pin' },
    { label: 'Events', filter: 'Events', icon: 'calendar' },
    { label: 'Organisations', filter: 'Organisations', icon: 'shield' },
    { label: 'Services', filter: 'Services', icon: 'grid' },
    { label: 'People', filter: 'People', icon: 'user' },
    { label: 'Opportunities', filter: 'Opportunities', icon: 'briefcase' },
  ];

  wrap.appendChild(el('div', { class: 'home-section' }, [
    el('div', { class: 'home-section-head' }, [
      el('h2', {}, ['Discover the District']),
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
  // 5. NEAR YOU & PLACES WORTH KNOWING (Live Spatial Status)
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
        el('h2', {}, ['Places worth knowing']),
        el('a', { href: '#/explore/Places' }, ['All places →']),
      ]),
      el('div', { class: 'hcard-scroll' }, placeCards),
    ]));
  }

  // =========================================================================
  // 6. THIS WEEK’S EVENTS
  // =========================================================================
  if (events && events.length) {
    var eventCards = events.map(function (ev) {
      var eventFig = ev.image
        ? el('div', { style: 'width:64px;height:64px;border-radius:8px;overflow:hidden;flex-shrink:0;' }, [
            el('img', { src: ev.image, alt: ev.title, style: 'width:100%;height:100%;object-fit:cover;' }),
          ])
        : el('div', { class: 'event-date-block' }, [
            el('div', { class: 'month' }, [ev.date.split(' ')[0]]),
            el('div', { class: 'day' }, [ev.date.split(' ')[1] || '✦']),
          ]);

      return el('div', { class: 'event-card' }, [
        eventFig,
        el('a', { href: '#/event/' + ev.id, class: 'event-info', style: 'text-decoration:none; color:inherit;' }, [
          el('div', { class: 'title' }, [ev.title]),
          el('div', { class: 'meta' }, [ev.time + ' · ' + ev.venue]),
        ]),
        el('button', {
          class: 'btn ' + (ev.userRsvpd ? 'btn-quiet' : 'btn-ember') + ' btn-sm',
          onclick: function () { District.toggleRSVP(ev.id); },
        }, [ev.userRsvpd ? '✓ RSVP' : 'RSVP (' + ev.rsvpCount + ')']),
      ]);
    });

    wrap.appendChild(el('div', { class: 'home-section' }, [
      el('div', { class: 'home-section-head' }, [
        el('h2', {}, ['This week in ' + d.name]),
        el('a', { href: '#/explore/Events' }, ['View all events →']),
      ]),
      el('div', { style: 'display:flex; flex-direction:column; gap:10px;' }, eventCards),
    ]));
  }

  // =========================================================================
  // 7. RISING IN THE DISTRICT & OPPORTUNITIES
  // =========================================================================
  if (rising && rising.length) {
    var risingCards = rising.map(function (rs) {
      return el('a', { class: 'rising-card', href: '#/' + (rs.type.toLowerCase() === 'place' ? 'place' : rs.type.toLowerCase() === 'organization' ? 'org' : 'business') + '/' + rs.entityId }, [
        el('div', {}, [
          el('div', { style: 'font-weight:500; font-size:14.5px;' }, [rs.name]),
          el('div', { class: 'rising-signal' }, [rs.signal]),
        ]),
        el('div', { class: 'rising-metric' }, [rs.metric]),
      ]);
    });

    wrap.appendChild(el('div', { class: 'home-section' }, [
      el('div', { class: 'home-section-head' }, [
        el('h2', {}, ['Rising in the District']),
        el('span', { style: 'font-family:var(--font-mono); font-size:10px; color:var(--stone); text-transform:uppercase;' }, ['Signal-driven']),
      ]),
      el('div', { class: 'rising-grid' }, risingCards),
    ]));
  }

  // Opportunities highlight
  if (opportunities && opportunities.length) {
    var oppCards = opportunities.slice(0, 2).map(function (op) {
      return el('a', { class: 'opp-card', href: '#/opportunity/' + op.id }, [
        el('div', { class: 'opp-head' }, [
          el('div', { class: 'opp-title' }, [op.title]),
          el('div', { class: 'opp-stipend' }, [op.compensation]),
        ]),
        el('div', { class: 'opp-meta' }, [
          el('span', {}, ['Posted by ' + op.postedByName]),
          el('span', {}, ['· ' + op.duration]),
        ]),
      ]);
    });

    wrap.appendChild(el('div', { class: 'home-section' }, [
      el('div', { class: 'home-section-head' }, [
        el('h2', {}, ['Opportunities & Gigs']),
        el('a', { href: '#/explore/Opportunities' }, ['View all (' + opportunities.length + ') →']),
      ]),
      el('div', { style: 'display:grid; grid-template-columns:1fr; gap:10px;' }, oppCards),
    ]));
  }

  return wrap;
};
