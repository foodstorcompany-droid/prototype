// DISCOVER MELLANBY — Experiential Spatial Discovery & Multi-Perspective Engine
// 4 Pillars: People | Things to do | Things to get | Places
// Geography: 200m | 500m | 1km Spatial Radius Filter
window.District = window.District || {};
District.screens = District.screens || {};

District.exploreState = { perspective: 'grid', filter: 'Everything', selectedEntityId: null, radius: '500m' };

District.screens.explore = function (params) {
  var el = District.el, icon = District.icon;
  var d = District.getDistrict();
  var es = District.exploreState;

  if (params && params[0]) {
    es.filter = decodeURIComponent(params[0]);
  }

  var businesses = District.getBusinesses(d.id);
  var places = District.getPlaces(d.id);
  var events = District.getEvents(d.id);
  var orgs = District.getOrganizations(d.id);
  var opps = District.getOpportunities(d.id);
  var people = District.getPeople(d.id);

  // Compile unified entity collection with 4 Discovery Pillars
  var allEntities = [];

  // Pillar 1: People
  people.forEach(function (pe) {
    allEntities.push({
      id: pe.id, name: pe.name, category: pe.role, pillar: 'People', type: 'person',
      tag: pe.trustLevel || 'Verified Resident', pinType: 'pin-business', href: '#/person/' + pe.id,
      image: pe.image, sub: (pe.faculty || 'Mellanby') + ' · ' + pe.room,
      badge: 'RESIDENT', badgeClass: 'badge-resident'
    });
  });

  // Pillar 2: Things to do
  events.forEach(function (ev) {
    allEntities.push({
      id: ev.id, name: ev.title, category: ev.category + ' Event', pillar: 'Things to do', type: 'event',
      tag: ev.date, pinType: 'pin-event', href: '#/event/' + ev.id, image: ev.image,
      sub: ev.venue + ' · ' + ev.time, badge: 'EVENT', badgeClass: 'chip ember'
    });
  });
  opps.forEach(function (op) {
    allEntities.push({
      id: op.id, name: op.title, category: 'Opportunity', pillar: 'Things to do', type: 'opportunity',
      tag: op.compensation, pinType: 'pin-org', href: '#/opportunity/' + op.id,
      sub: op.postedByName + ' · ' + op.type, badge: 'GIG', badgeClass: 'chip on'
    });
  });

  // Pillar 3: Things to get
  businesses.forEach(function (b) {
    allEntities.push({
      id: b.id, name: b.name, category: b.category, pillar: 'Things to get', type: 'business',
      tag: b.openStatus || 'Open', pinType: 'pin-business', href: '#/business/' + b.id,
      rating: b.rating, image: b.image, sub: (b.services ? b.services.length + ' bookable services' : 'Verified provider'),
      badge: 'BIZ', badgeClass: 'badge-business'
    });
    (b.services || []).forEach(function (s) {
      allEntities.push({
        id: b.id + '-' + s.id, name: s.name, category: b.name + ' · Service', pillar: 'Things to get', type: 'service',
        tag: s.price, pinType: 'pin-business', href: '#/business/' + b.id, image: b.image,
        sub: s.duration ? 'Takes ' + s.duration : 'Bookable on District', badge: 'SERVICE', badgeClass: 'chip'
      });
    });
  });

  // Pillar 4: Places
  places.forEach(function (pl) {
    allEntities.push({
      id: pl.id, name: pl.name, category: pl.type, pillar: 'Places', type: 'place',
      tag: pl.liveStatus ? pl.liveStatus.tag : 'Open Space', pinType: 'pin-place', href: '#/place/' + pl.id,
      image: pl.image, sub: pl.hours || 'Open daily to residents', badge: 'PLACE', badgeClass: 'chip on'
    });
  });
  orgs.forEach(function (og) {
    allEntities.push({
      id: og.id, name: og.name, category: og.category, pillar: 'Places', type: 'organization',
      tag: og.authorityTier || 'Community', pinType: 'pin-org', href: '#/org/' + og.id,
      image: og.image, sub: og.membership || 'Open to UI community', badge: 'ORG', badgeClass: 'badge-org'
    });
  });

  // Filter items based on active pill
  var filteredEntities = allEntities.filter(function (ent) {
    if (es.filter === 'Everything') return ent.type !== 'service';
    if (es.filter === 'People') return ent.pillar === 'People';
    if (es.filter === 'Things to do') return ent.pillar === 'Things to do';
    if (es.filter === 'Things to get') return ent.pillar === 'Things to get';
    if (es.filter === 'Places') return ent.pillar === 'Places';
    if (es.filter === 'Businesses') return ent.type === 'business';
    if (es.filter === 'Services') return ent.type === 'service';
    if (es.filter === 'Events') return ent.type === 'event';
    return true;
  });

  // Validate selected entity
  var selectedExists = filteredEntities.some(function (e) { return e.id === es.selectedEntityId; });
  if (!selectedExists && filteredEntities.length) {
    es.selectedEntityId = filteredEntities[0].id;
  }

  var shell = el('div', { class: 'explore-shell mode-' + es.perspective }, []);

  // Filter Options
  var filterOptions = ['Everything', 'People', 'Things to do', 'Things to get', 'Places', 'Businesses', 'Services'];

  var controls = el('div', { class: 'explore-controls', style: 'margin-bottom:16px;' }, [
    el('div', { class: 'row-top', style: 'display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;' }, [
      el('div', { class: 'search-mini', style: 'flex:1; min-width:220px;' }, [
        icon('search', 'icon-sm'),
        el('input', { placeholder: 'Discover ' + d.name + ' (' + filteredEntities.length + ' results)…' }, []),
      ]),

      // Spatial Radius Selector
      el('div', { class: 'radius-selector' }, ['200m', '500m', '1km'].map(function (rad) {
        var on = es.radius === rad;
        return el('button', {
          class: 'chip-radius' + (on ? ' active' : ''),
          onclick: function () { es.radius = rad; District.toast('Radius: ' + rad + ' within ' + d.name); District.render(); },
        }, [rad]);
      })),

      // 3-Perspective View Switcher
      el('div', { class: 'explore-perspectives' }, [
        el('button', {
          class: es.perspective === 'grid' ? 'active' : '',
          onclick: function () { es.perspective = 'grid'; District.render(); },
        }, [icon('grid', 'icon-sm'), 'Cards']),
        el('button', {
          class: es.perspective === 'list' ? 'active' : '',
          onclick: function () { es.perspective = 'list'; District.render(); },
        }, [icon('list', 'icon-sm'), 'List']),
        el('button', {
          class: es.perspective === 'map' ? 'active' : '',
          onclick: function () { es.perspective = 'map'; District.render(); },
        }, [icon('map', 'icon-sm'), 'Map']),
      ]),
    ]),

    // Category Filter Pills
    el('div', { class: 'category-pills', style: 'margin-top:12px;' }, filterOptions.map(function (f) {
      var on = es.filter === f;
      return el('button', {
        class: 'chip category-pill' + (on ? ' on' : ''),
        onclick: function () { es.filter = f; es.selectedEntityId = null; District.render(); },
      }, [f]);
    })),
  ]);

  // Main Content Container
  var listPane = el('div', { class: 'explore-list-pane' }, [controls]);

  // Render according to selected perspective
  if (es.perspective === 'grid') {
    var gridCards = filteredEntities.map(function (ent) {
      var fig = ent.image
        ? el('div', { class: 'd-figure', style: 'height:140px;' }, [el('img', { src: ent.image, alt: ent.name, style: 'width:100%;height:100%;object-fit:cover;' })])
        : el('div', { class: 'd-placeholder', style: 'height:140px;', 'data-label': ent.type.toUpperCase(), 'data-coord': '' }, []);

      return el('a', {
        class: 'card',
        href: ent.href,
        style: 'text-decoration:none; color:inherit; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;'
      }, [
        fig,
        el('div', { style: 'padding:14px;' }, [
          el('div', { style: 'display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;' }, [
            el('span', { class: ent.badgeClass || 'chip', style: 'font-size:9.5px;' }, [ent.badge || ent.type]),
            el('span', { style: 'font-family:var(--font-mono); font-size:10.5px; color:var(--stone);' }, [ent.tag]),
          ]),
          el('h3', { style: 'font-size:16px; margin:0 0 4px; font-weight:600;' }, [ent.name]),
          el('div', { style: 'font-size:12px; color:var(--stone); line-height:1.4;' }, [ent.sub || ent.category]),
        ]),
      ]);
    });

    listPane.appendChild(el('div', {
      style: 'display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:14px; margin-top:8px;'
    }, gridCards));

  } else if (es.perspective === 'list') {
    var listRows = filteredEntities.map(function (ent) {
      var fig = ent.image
        ? el('div', { class: 'fig d-figure' }, [el('img', { src: ent.image, alt: ent.name, style: 'width:100%;height:100%;object-fit:cover;' })])
        : el('div', { class: 'fig d-figure d-placeholder', 'data-label': ent.type.slice(0, 3).toUpperCase(), 'data-coord': '' }, []);

      return el('div', {
        class: 'explore-list-item' + (es.selectedEntityId === ent.id ? ' selected' : ''),
        onclick: function () { location.hash = ent.href; },
      }, [
        fig,
        el('div', {}, [
          el('div', { class: 'name', style: 'font-weight:600;' }, [ent.name]),
          el('div', { class: 'cat' }, [ent.category + ' · ' + ent.tag]),
        ]),
        el('a', { class: 'btn btn-ghost btn-sm', href: ent.href, style: 'font-size:11px; padding:4px 10px;' }, ['View']),
      ]);
    });

    listPane.appendChild(el('div', { style: 'margin-top:8px;' }, listRows));
  }

  // Map Perspective Pane
  var mapPane = el('div', { class: 'explore-map-pane' }, []);
  var geoEntities = filteredEntities.filter(function (e) { return e.type === 'business' || e.type === 'place' || e.type === 'event' || e.type === 'organization'; });

  mapPane.appendChild(buildMultiEntityMap(geoEntities, es.selectedEntityId, function (id) {
    es.selectedEntityId = id;
    District.render();
  }));

  var selected = filteredEntities.filter(function (p) { return p.id === es.selectedEntityId; })[0];
  if (selected && es.perspective === 'map') {
    var previewFig = selected.image
      ? el('div', { class: 'fig d-figure' }, [el('img', { src: selected.image, alt: selected.name, style: 'width:100%;height:100%;object-fit:cover;' })])
      : el('div', { class: 'fig d-figure d-placeholder', 'data-label': selected.type.slice(0, 3).toUpperCase(), 'data-coord': '' }, []);

    mapPane.appendChild(el('div', { class: 'map-preview-sheet' }, [
      previewFig,
      el('div', { class: 'info' }, [
        el('div', { class: 'name', style: 'font-weight:600;' }, [selected.name]),
        el('div', { class: 'cat' }, [selected.category + ' · ' + selected.tag]),
      ]),
      el('a', { class: 'btn btn-primary btn-sm', href: selected.href }, ['Open Details']),
    ]));
  }

  shell.appendChild(listPane);
  if (es.perspective === 'map') {
    shell.appendChild(mapPane);
  }

  return shell;
};

function pinPos(id, i) {
  var seed = 0;
  for (var k = 0; k < id.length; k++) seed += id.charCodeAt(k);
  var x = 90 + ((seed * 37) % 440);
  var y = 70 + ((seed * 53 + i * 42) % 380);
  return { x: x, y: y };
}

function buildMultiEntityMap(entities, selectedId, onSelect) {
  var NS = 'http://www.w3.org/2000/svg';
  function sel(tag, attrs) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }

  var svg = sel('svg', { class: 'map-svg', viewBox: '0 0 620 520', preserveAspectRatio: 'xMidYMid slice' });
  svg.appendChild(sel('rect', { class: 'land', width: 620, height: 520, fill: 'var(--district-ground)' }));

  [130, 260, 390].forEach(function (y) { svg.appendChild(sel('line', { class: 'grid-line', x1: 0, y1: y, x2: 620, y2: y, stroke: 'var(--district-stone)', opacity: '0.4' })); });
  [155, 310, 465].forEach(function (x) { svg.appendChild(sel('line', { class: 'grid-line', x1: x, y1: 0, x2: x, y2: 520, stroke: 'var(--district-stone)', opacity: '0.4' })); });

  var blockGroup = sel('g', { class: 'block', fill: 'var(--warm-white)', stroke: 'var(--district-stone)', opacity: '0.8' });
  [[200,60,70,50],[280,60,60,70],[350,70,80,60],[440,60,55,90],[510,80,90,70],
   [200,170,90,70],[300,170,70,90],[380,180,60,70],[450,180,70,80],
   [60,300,80,60],[150,300,70,70],[250,310,60,80]].forEach(function (b) {
    blockGroup.appendChild(sel('rect', { x: b[0], y: b[1], width: b[2], height: b[3], rx: 4 }));
  });
  svg.appendChild(blockGroup);

  entities.forEach(function (ent, i) {
    var pos = pinPos(ent.id, i);
    var pinClass = 'map-pin-btn ' + (ent.pinType || 'pin-business') + (ent.id === selectedId ? ' selected' : '');
    var g = sel('g', { class: pinClass, transform: 'translate(' + pos.x + ',' + pos.y + ')' });
    g.appendChild(sel('circle', { class: 'pin-ring', r: 14, stroke: 'var(--district-earth)', fill: 'none', opacity: '0.5' }));
    g.appendChild(sel('circle', { class: 'pin-dot', r: 6, fill: 'var(--district-earth)' }));

    var label = sel('text', { class: 'label', x: 12, y: 4, fill: 'var(--district-ink)', 'font-family': 'var(--font-sans)', 'font-size': '11px', 'font-weight': '600' });
    label.textContent = ent.name.split(' ')[0];
    g.appendChild(label);
    g.style.cursor = 'pointer';
    g.addEventListener('click', function () { onSelect(ent.id); });
    svg.appendChild(g);
  });

  return svg;
}
