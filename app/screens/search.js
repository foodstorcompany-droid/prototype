// SEARCH — Universal District Search across all entity collections
// Searches: Businesses, Places, Events, Organisations, Opportunities, People, Services, Products
window.District = window.District || {};
District.screens = District.screens || {};
District.searchState = { q: '', recent: ['tailoring', 'jollof', 'study room', 'tech repairs', 'figma'] };

District.screens.search = function () {
  var el = District.el, icon = District.icon;
  var d = District.getDistrict();
  var ss = District.searchState;

  var businesses = District.getBusinesses(d.id);
  var places = District.getPlaces(d.id);
  var events = District.getEvents(d.id);
  var orgs = District.getOrganizations(d.id);
  var opps = District.getOpportunities(d.id);
  var people = District.getPeople(d.id);

  var wrap = el('div', { class: 'entity-shell' }, []);

  var input = el('input', {
    placeholder: 'Search ' + d.name + ' — places, businesses, events, organisations, gigs…',
    value: ss.q,
    oninput: function (e) { ss.q = e.target.value; renderResults(); },
    onkeydown: function (e) { if (e.key === 'Enter' && ss.q.trim()) { addRecent(ss.q.trim()); } },
  }, []);

  var searchBar = el('div', { class: 'home-search', style: 'margin-top:4px; align-items:center; border:1px solid var(--fog); border-radius:999px; padding:4px 6px 4px 16px; background:var(--paper);' }, [
    icon('search', 'icon-sm'),
    input,
  ]);
  input.style.border = 'none';
  input.style.borderRadius = '0';
  input.style.padding = '10px 4px';
  input.style.background = 'transparent';
  input.style.flex = '1';

  wrap.appendChild(el('div', { class: 'home-hero', style: 'padding-bottom:6px;' }, [
    el('h1', { style: 'font-size:clamp(24px,4vw,32px);' }, ['Search ' + d.name]),
    searchBar,
  ]));

  var resultsHost = el('div', { id: 'search-results', style: 'margin-top:14px;' }, []);
  wrap.appendChild(resultsHost);

  function addRecent(term) {
    ss.recent = [term].concat(ss.recent.filter(function (t) { return t !== term; })).slice(0, 6);
  }

  function score(text) {
    if (!text) return -1;
    return text.toLowerCase().indexOf(ss.q.toLowerCase());
  }

  function renderResults() {
    resultsHost.innerHTML = '';
    var q = ss.q.trim();

    if (!q) {
      // Recent searches
      resultsHost.appendChild(el('div', { class: 'home-section-head' }, [el('h2', {}, ['Recent searches'])]));
      resultsHost.appendChild(el('div', { class: 'category-pills', style: 'margin-bottom:24px;' }, ss.recent.map(function (r) {
        return el('button', {
          class: 'chip category-pill',
          onclick: function () { ss.q = r; input.value = r; renderResults(); },
        }, [r]);
      })));

      // Browse entity categories
      resultsHost.appendChild(el('div', { class: 'home-section-head' }, [el('h2', {}, ['Browse The District'])]));
      resultsHost.appendChild(el('div', { class: 'category-pills', style: 'margin-bottom:24px;' }, [
        'Businesses', 'Places', 'Events', 'Organisations', 'Opportunities', 'People',
      ].map(function (c) {
        return el('a', { class: 'chip category-pill', href: '#/explore/' + encodeURIComponent(c) }, [c]);
      })));

      // Suggested highlights
      resultsHost.appendChild(el('div', { class: 'home-section-head' }, [el('h2', {}, ['Suggested in ' + d.name])]));
      var suggestions = businesses.concat(places).slice(0, 4);
      resultsHost.appendChild(el('div', { style: 'display:flex; flex-direction:column; gap:8px;' }, suggestions.map(function (sg) {
        var isBiz = !!sg.ownerName || !!sg.rating;
        var href = isBiz ? '#/business/' + sg.id : '#/place/' + sg.id;
        return el('a', {
          class: 'card',
          href: href,
          style: 'padding:12px 16px; display:flex; justify-content:space-between; align-items:center; text-decoration:none; color:inherit;',
        }, [
          el('div', {}, [
            el('div', { style: 'font-weight:500; font-size:14.5px;' }, [sg.name]),
            el('div', { style: 'font-size:12px; color:var(--stone); margin-top:2px;' }, [(sg.category || sg.type) + ' · ' + (sg.location || d.name)]),
          ]),
          el('span', { style: 'font-family:var(--font-mono); font-size:11px; color:var(--stone);' }, ['View →']),
        ]);
      })));
      return;
    }

    // 1. Businesses
    var bMatches = businesses.filter(function (b) {
      return score(b.name) > -1 || score(b.category) > -1 || score(b.bio) > -1;
    });

    // 2. Places
    var plMatches = places.filter(function (pl) {
      return score(pl.name) > -1 || score(pl.type) > -1 || score(pl.bio) > -1;
    });

    // 3. Events
    var evMatches = events.filter(function (ev) {
      return score(ev.title) > -1 || score(ev.category) > -1 || score(ev.description) > -1;
    });

    // 4. Organizations
    var ogMatches = orgs.filter(function (og) {
      return score(og.name) > -1 || score(og.category) > -1 || score(og.bio) > -1;
    });

    // 5. Opportunities
    var opMatches = opps.filter(function (op) {
      return score(op.title) > -1 || score(op.description) > -1;
    });

    // 6. People
    var peMatches = people.filter(function (pe) {
      return score(pe.name) > -1 || score(pe.role) > -1 || score(pe.bio) > -1;
    });

    var totalMatches = bMatches.length + plMatches.length + evMatches.length + ogMatches.length + opMatches.length + peMatches.length;

    if (!totalMatches) {
      resultsHost.appendChild(el('div', { style: 'padding:40px 4px; text-align:center; color:var(--stone);' }, [
        'Nothing matches “' + q + '” in ' + d.name + ' yet. Try searching another place, event, or category.',
      ]));
      return;
    }

    function renderGroup(title, items, type, hrefPrefix) {
      if (!items || !items.length) return;
      resultsHost.appendChild(el('div', { class: 'home-section-head', style: 'margin-top:20px;' }, [el('h2', {}, [title + ' (' + items.length + ')'])]));
      resultsHost.appendChild(el('div', { style: 'display:flex; flex-direction:column; gap:8px;' }, items.map(function (it) {
        return el('a', {
          class: 'card',
          href: hrefPrefix + it.id,
          style: 'padding:12px 16px; display:flex; justify-content:space-between; align-items:center; text-decoration:none; color:inherit;',
        }, [
          el('div', {}, [
            el('div', { style: 'font-weight:500; font-size:14.5px;' }, [it.name || it.title]),
            el('div', { style: 'font-size:12px; color:var(--stone); margin-top:2px;' }, [
              (it.category || it.type || it.role || '') + (it.location ? ' · ' + it.location : it.date ? ' · ' + it.date : ''),
            ]),
          ]),
          el('span', { class: 'chip on', style: 'font-size:11px;' }, [type]),
        ]);
      })));
    }

    renderGroup('Businesses', bMatches, 'Business', '#/business/');
    renderGroup('Places', plMatches, 'Place', '#/place/');
    renderGroup('Events', evMatches, 'Event', '#/event/');
    renderGroup('Organisations', ogMatches, 'Org', '#/org/');
    renderGroup('Opportunities', opMatches, 'Gig', '#/opportunity/');
    renderGroup('People', peMatches, 'Person', '#/person/');
  }

  renderResults();
  setTimeout(function () { input.focus(); }, 30);
  return wrap;
};
