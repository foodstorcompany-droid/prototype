// EXPLORE — Universal Discovery Engine
// 3 Perspectives on a Place: MAP | LIST | DISTRICT
// Filtering across Businesses, Places, Events, Organisations, Opportunities, People, Services, Products.
window.District = window.District || {};
District.screens = District.screens || {};

District.exploreState = { perspective: 'map', filter: 'Everything', selectedEntityId: null };

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

  // Compile unified entity collection
  var allEntities = [];
  businesses.forEach(function (b) {
    allEntities.push({ id: b.id, name: b.name, category: b.category, type: 'business', tag: b.openStatus || 'Business', pinType: 'pin-business', href: '#/business/' + b.id, rating: b.rating, image: b.image });
    (b.services || []).forEach(function (s) {
      allEntities.push({ id: b.id + '-' + s.id, name: s.name, category: b.name + ' · Service', type: 'service', tag: s.price, pinType: 'pin-business', href: '#/business/' + b.id, image: b.image });
    });
    (b.products || []).forEach(function (pr) {
      allEntities.push({ id: b.id + '-' + pr.id, name: pr.name, category: b.name + ' · Product', type: 'product', tag: pr.price, pinType: 'pin-business', href: '#/business/' + b.id, image: b.image });
    });
  });

  places.forEach(function (pl) {
    allEntities.push({ id: pl.id, name: pl.name, category: pl.type, type: 'place', tag: pl.liveStatus ? pl.liveStatus.tag : 'Place', pinType: 'pin-place', href: '#/place/' + pl.id, image: pl.image });
  });

  events.forEach(function (ev) {
    allEntities.push({ id: ev.id, name: ev.title, category: ev.category, type: 'event', tag: ev.date, pinType: 'pin-event', href: '#/event/' + ev.id, image: ev.image });
  });

  orgs.forEach(function (og) {
    allEntities.push({ id: og.id, name: og.name, category: og.category, type: 'organization', tag: og.authorityTier, pinType: 'pin-org', href: '#/org/' + og.id, image: og.image });
  });

  opps.forEach(function (op) {
    allEntities.push({ id: op.id, name: op.title, category: 'Opportunity', type: 'opportunity', tag: op.compensation, pinType: 'pin-org', href: '#/opportunity/' + op.id });
  });

  people.forEach(function (pe) {
    allEntities.push({ id: pe.id, name: pe.name, category: pe.role, type: 'person', tag: pe.trustLevel, pinType: 'pin-business', href: '#/person/' + pe.id, image: pe.image });
  });

  // Filter items
  var filteredEntities = allEntities.filter(function (ent) {
    if (es.filter === 'Everything') return ent.type !== 'service' && ent.type !== 'product'; // Keep primary objects in everything
    if (es.filter === 'Businesses') return ent.type === 'business';
    if (es.filter === 'Places') return ent.type === 'place';
    if (es.filter === 'Events') return ent.type === 'event';
    if (es.filter === 'Organisations') return ent.type === 'organization';
    if (es.filter === 'Opportunities') return ent.type === 'opportunity';
    if (es.filter === 'People') return ent.type === 'person';
    if (es.filter === 'Services') return ent.type === 'service';
    if (es.filter === 'Products') return ent.type === 'product';
    return true;
  });

  // Validate selected entity
  var selectedExists = filteredEntities.some(function (e) { return e.id === es.selectedEntityId; });
  if (!selectedExists && filteredEntities.length) {
    es.selectedEntityId = filteredEntities[0].id;
  }

  var shell = el('div', { class: 'explore-shell mode-' + es.perspective }, []);

  // =========================================================================
  // CONTROLS & FILTER BAR
  // =========================================================================
  var filterOptions = ['Everything', 'Businesses', 'Places', 'Events', 'Organisations', 'Services', 'Products', 'Opportunities', 'People'];

  var controls = el('div', { class: 'explore-controls' }, [
    el('div', { class: 'row-top' }, [
      el('div', { class: 'search-mini' }, [
        icon('search', 'icon-sm'),
        el('input', { placeholder: 'Explore ' + d.name + ' (' + filteredEntities.length + ' results)…' }, []),
      ]),
      // 3 Perspective Toggle
      el('div', { class: 'explore-perspectives' }, [
        el('button', {
          class: es.perspective === 'map' ? 'active' : '',
          onclick: function () { es.perspective = 'map'; District.render(); },
        }, [icon('map', 'icon-sm'), 'Map']),
        el('button', {
          class: es.perspective === 'list' ? 'active' : '',
          onclick: function () { es.perspective = 'list'; District.render(); },
        }, [icon('list', 'icon-sm'), 'List']),
        el('button', {
          class: es.perspective === 'district' ? 'active' : '',
          onclick: function () { es.perspective = 'district'; District.render(); },
        }, [icon('grid', 'icon-sm'), 'Feed']),
      ]),
    ]),
    el('div', { class: 'category-pills' }, filterOptions.map(function (f) {
      var on = es.filter === f;
      return el('button', {
        class: 'chip category-pill' + (on ? ' on' : ''),
        onclick: function () { es.filter = f; es.selectedEntityId = null; District.render(); },
      }, [f]);
    })),
  ]);

  // =========================================================================
  // PERSPECTIVE 1 & 2: LIST / SPLIT PANE
  // =========================================================================
  var listPane = el('div', { class: 'explore-list-pane' }, [controls]);

  if (es.perspective === 'district') {
    // District Feed view
    var feedItems = District.data.activity.filter(function (a) { return a.districtId === d.id; });
    if (!feedItems.length) feedItems = District.data.activity.slice(0, 4);

    var feedBody = el('div', { style: 'margin-top:14px; display:flex; flex-direction:column; gap:10px;' }, feedItems.map(function (fi) {
      return el('div', { class: 'card', style: 'padding:14px 16px;' }, [
        el('div', { style: 'display:flex; justify-content:space-between; align-items:center;' }, [
          el('div', { style: 'font-weight:500; font-size:14px;' }, [fi.who]),
          el('div', { style: 'font-family:var(--font-mono); font-size:10px; color:var(--stone);' }, [fi.when]),
        ]),
        el('div', { style: 'color:var(--ink-soft); font-size:13px; margin-top:4px;' }, [fi.what]),
      ]);
    }));
    listPane.appendChild(feedBody);
  } else {
    // Standard List view
    var list = el('div', { style: 'margin-top:8px;' }, filteredEntities.map(function (ent) {
      var isSel = es.selectedEntityId === ent.id;
      var fig = ent.image
        ? el('div', { class: 'fig d-figure' }, [el('img', { src: ent.image, alt: ent.name, style: 'width:100%;height:100%;object-fit:cover;' })])
        : el('div', { class: 'fig d-figure d-placeholder', 'data-label': ent.type.slice(0, 3).toUpperCase(), 'data-coord': '' }, []);

      return el('div', {
        class: 'explore-list-item' + (isSel ? ' selected' : ''),
        onclick: function () {
          es.selectedEntityId = ent.id;
          if (es.perspective === 'list') {
            location.hash = ent.href;
          } else {
            District.render();
          }
        },
      }, [
        fig,
        el('div', {}, [
          el('div', { class: 'name' }, [ent.name]),
          el('div', { class: 'cat' }, [ent.category + ' · ' + ent.tag]),
        ]),
        el('a', { class: 'btn btn-ghost btn-sm', href: ent.href, style: 'font-size:11px; padding:4px 10px;' }, ['View']),
      ]);
    }));

    if (!filteredEntities.length) {
      list = el('div', { style: 'padding:40px 4px; text-align:center; color:var(--stone);' }, ['Nothing found under this filter in ' + d.name + ' — try another category.']);
    }
    listPane.appendChild(list);
  }

  // =========================================================================
  // PERSPECTIVE 3: MAP PANE
  // =========================================================================
  var mapPane = el('div', { class: 'explore-map-pane' }, []);
  var geoEntities = filteredEntities.filter(function (e) { return e.type === 'business' || e.type === 'place' || e.type === 'event' || e.type === 'organization'; });

  mapPane.appendChild(buildMultiEntityMap(geoEntities, es.selectedEntityId, function (id) {
    es.selectedEntityId = id;
    District.render();
  }));

  // Selected Entity Bottom Floating Card (on Map mode)
  var selected = filteredEntities.filter(function (p) { return p.id === es.selectedEntityId; })[0];
  if (selected && es.perspective === 'map') {
    var previewFig = selected.image
      ? el('div', { class: 'fig d-figure' }, [el('img', { src: selected.image, alt: selected.name, style: 'width:100%;height:100%;object-fit:cover;' })])
      : el('div', { class: 'fig d-figure d-placeholder', 'data-label': selected.type.slice(0, 3).toUpperCase(), 'data-coord': '' }, []);

    mapPane.appendChild(el('div', { class: 'map-preview-sheet' }, [
      previewFig,
      el('div', { class: 'info' }, [
        el('div', { class: 'name' }, [selected.name]),
        el('div', { class: 'cat' }, [selected.category + ' · ' + selected.tag]),
      ]),
      el('a', { class: 'btn btn-primary btn-sm', href: selected.href }, ['Open']),
    ]));
  }

  shell.appendChild(listPane);
  if (es.perspective !== 'district') {
    shell.appendChild(mapPane);
  }

  return shell;
};

// Deterministic map pin coordinate computation
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
  svg.appendChild(sel('rect', { class: 'land', width: 620, height: 520 }));

  // Grid lines
  [130, 260, 390].forEach(function (y) { svg.appendChild(sel('line', { class: 'grid-line', x1: 0, y1: y, x2: 620, y2: y })); });
  [155, 310, 465].forEach(function (x) { svg.appendChild(sel('line', { class: 'grid-line', x1: x, y1: 0, x2: x, y2: 520 })); });

  // Stylized city/campus blocks
  var blockGroup = sel('g', { class: 'block' });
  [[200,60,70,50],[280,60,60,70],[350,70,80,60],[440,60,55,90],[510,80,90,70],
   [200,170,90,70],[300,170,70,90],[380,180,60,70],[450,180,70,80],
   [60,300,80,60],[150,300,70,70],[250,310,60,80]].forEach(function (b) {
    blockGroup.appendChild(sel('rect', { x: b[0], y: b[1], width: b[2], height: b[3] }));
  });
  svg.appendChild(blockGroup);

  // Entities as pins
  entities.forEach(function (ent, i) {
    var pos = pinPos(ent.id, i);
    var pinClass = 'map-pin-btn ' + (ent.pinType || 'pin-business') + (ent.id === selectedId ? ' selected' : '');
    var g = sel('g', { class: pinClass, transform: 'translate(' + pos.x + ',' + pos.y + ')' });
    g.appendChild(sel('circle', { class: 'pin-ring', r: 13 }));
    g.appendChild(sel('circle', { class: 'pin-dot', r: 6 }));

    var label = sel('text', { class: 'label', x: 12, y: 4 });
    label.textContent = ent.name.split(' ')[0];
    g.appendChild(label);
    g.style.cursor = 'pointer';
    g.addEventListener('click', function () { onSelect(ent.id); });
    svg.appendChild(g);
  });

  return svg;
}
