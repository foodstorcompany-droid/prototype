// THE DISTRICT — Router & Shell with Entity Engine Routes and Creation Modal
window.District = window.District || {};
District.screens = District.screens || {};

District.state = {
  districtId: 'mellanby',
  booking: null,
};

function el(tag, attrs, children) {
  var node = document.createElement(tag);
  attrs = attrs || {};
  Object.keys(attrs).forEach(function (k) {
    if (k === 'class') node.className = attrs[k];
    else if (k === 'html') node.innerHTML = attrs[k];
    else if (k.indexOf('on') === 0 && typeof attrs[k] === 'function') node.addEventListener(k.slice(2), attrs[k]);
    else if (attrs[k] !== undefined && attrs[k] !== null) node.setAttribute(k, attrs[k]);
  });
  (children || []).forEach(function (c) {
    if (c === null || c === undefined) return;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}
District.el = el;

function icon(name, cls) {
  var span = document.createElement('span');
  span.className = 'icon-wrap' + (cls ? ' ' + cls : '');
  span.innerHTML = window.DistrictIcons[name] || '';
  return span;
}
District.icon = icon;

District.toast = function (message) {
  var host = document.getElementById('toast-host');
  if (!host) return;
  var t = el('div', { class: 'district-toast' }, [message]);
  host.appendChild(t);
  requestAnimationFrame(function () { t.classList.add('show'); });
  setTimeout(function () {
    t.classList.remove('show');
    setTimeout(function () { if (t.parentNode === host) host.removeChild(t); }, 250);
  }, 2200);
};

function parseHash() {
  var h = location.hash.replace(/^#\/?/, '');
  var parts = h.split('/').filter(Boolean);
  return { name: parts[0] || 'home', params: parts.slice(1) };
}

function navLinks() {
  return [
    { route: 'home', label: 'Home', icon: 'home' },
    { route: 'explore', label: 'Explore', icon: 'explore' },
    { route: 'messages', label: 'Messages', icon: 'chat' },
    { route: 'activity', label: 'Activity', icon: 'bell' },
    { route: 'profile', label: 'My District', icon: 'user' },
  ];
}

function renderChrome(route) {
  var d = District.getDistrict(District.state.districtId);

  // Top header strip
  var top = el('div', { class: 'app-top-strip' }, [
    el('div', { class: 'row', style: 'gap:8px;' }, [
      el('a', { class: 'brand', href: '#/home', style: 'font-size:18px;' }, ['The District']),
    ]),
    el('nav', { class: 'app-nav-links' }, navLinks().map(function (l) {
      return el('a', { href: '#/' + l.route, class: route === l.route ? 'active' : '' }, [
        icon(l.icon, 'icon-sm'), el('span', {}, [l.label]),
      ]);
    })),
    el('div', { class: 'row', style: 'gap:10px;' }, [
      districtSwitcher(d),
      el('button', {
        class: 'btn btn-ember btn-sm',
        onclick: function () { District.openCreateModal(); },
      }, ['+ Create']),
      el('a', { class: 'btn btn-ghost btn-sm', href: '#/provider-dashboard' }, ['Provider OS']),
    ]),
  ]);

  // Locality strip
  var strip = el('div', { class: 'locality-strip' }, [
    el('span', {}, [d.coord]),
    el('span', { class: 'dot' }, []),
    el('span', {}, [(d.businessesCount || d.providers) + ' Businesses']),
    el('span', { class: 'dot' }, []),
    el('span', {}, [d.activeToday.toLocaleString() + ' Active Today']),
    el('span', { class: 'dot' }, []),
    el('span', {}, ['Trending: ' + d.trending.join(' · ')]),
  ]);

  // Mobile Bottom Navigation
  var bottom = el('div', { class: 'app-bottom-nav' }, navLinks().map(function (l) {
    return el('a', { href: '#/' + l.route, class: 'bn-item' + (route === l.route ? ' active' : '') }, [
      icon(l.icon), el('span', {}, [l.label]),
    ]);
  }));

  return { top: top, strip: strip, bottom: bottom };
}

function districtSwitcher(current) {
  var sel = el('select', {
    class: 'district-switcher', onchange: function (e) {
      District.state.districtId = e.target.value;
      if (District.exploreState) District.exploreState.selectedEntityId = null;
      District.render();
    },
  }, Object.values(District.data.districts).map(function (d) {
    var o = el('option', { value: d.id }, [d.name + ' · ' + (d.ring[d.ring.length - 2] || d.name)]);
    if (d.id === current.id) o.setAttribute('selected', 'selected');
    return o;
  }));
  return el('div', { class: 'district-switcher-wrap' }, [icon('pin', 'icon-sm'), sel]);
}

District.navigate = function (hash) {
  location.hash = hash;
};

// =========================================================================
// UNIVERSAL CREATE MODAL & INTERACTIVE MOCK FORMS
// =========================================================================
District.openCreateModal = function () {
  var el = District.el, icon = District.icon;
  var host = document.getElementById('sheet-host');
  if (!host) return;
  host.innerHTML = '';
  var currentDistrict = District.getDistrict();

  function showMenu() {
    host.innerHTML = '';
    var createOptions = [
      { title: 'Create an Event', desc: 'Host a workshop, tournament, meetup, or gathering', icon: 'calendar', type: 'event', action: showEventForm },
      { title: 'Post an Opportunity', desc: 'Post a paid gig, student job, or collaboration', icon: 'briefcase', type: 'opportunity', action: showOpportunityForm },
      { title: 'Publish Official Notice', desc: 'Issue an announcement with verified jurisdiction', icon: 'shield', type: 'notice', action: showNoticeForm },
      { title: 'Register a Place or Space', desc: 'Add a study room, studio, café, or field', icon: 'pin', type: 'place', action: showPlaceForm },
      { title: 'List a Service or Product', desc: 'Offer bookable services or products on District', icon: 'bag', type: 'service', action: showServiceForm },
    ];

    var sheet = el('div', { class: 'sheet' }, [
      el('div', { class: 'sheet-handle' }, []),
      el('div', { class: 'step-label' }, ['The District · Participation Engine']),
      el('h3', {}, ['Create in ' + currentDistrict.name]),
      el('p', { style: 'font-size:13px; color:var(--stone); margin:4px 0 16px;' }, ['Select what you want to contribute to the District layer:']),
      el('div', { style: 'display:flex; flex-direction:column; gap:8px;' }, createOptions.map(function (opt) {
        return el('button', {
          class: 'settings-row settings-row--btn',
          style: 'border:1px solid var(--fog); border-radius:var(--r-md); padding:12px 14px;',
          onclick: opt.action,
        }, [
          el('div', {}, [
            el('div', { style: 'font-weight:500; font-size:14.5px;' }, [opt.title]),
            el('div', { style: 'font-size:12px; color:var(--stone); margin-top:2px;' }, [opt.desc]),
          ]),
          icon('chevronRight', 'icon-sm'),
        ]);
      })),
      el('button', { class: 'btn btn-ghost', style: 'width:100%; margin-top:16px;', onclick: function () { host.innerHTML = ''; } }, ['Close']),
    ]);

    var backdrop = el('div', { class: 'sheet-backdrop', onclick: function (e) { if (e.target === backdrop) host.innerHTML = ''; } }, [sheet]);
    host.appendChild(backdrop);
  }

  // 1. EVENT CREATION FORM
  function showEventForm() {
    host.innerHTML = '';
    var titleInput = el('input', { placeholder: 'e.g. Saturday Design Jam & Portfolio Review' }, []);
    var venueInput = el('input', { placeholder: 'e.g. Mellanby Quad Benches / The Reading Room' }, []);
    var dateInput = el('input', { placeholder: 'e.g. This Saturday, 5:00 PM' }, []);
    var catSelect = el('select', {}, ['Technology', 'Culture & Social', 'Sports', 'Business', 'Academic'].map(function (c) { return el('option', { value: c }, [c]); }));
    var descInput = el('textarea', { placeholder: 'Describe what attendees will do and learn…', style: 'min-height:70px;' }, []);

    var sheet = el('div', { class: 'sheet' }, [
      el('div', { class: 'sheet-handle' }, []),
      el('div', { class: 'step-label' }, ['New Event · ' + currentDistrict.name]),
      el('h3', {}, ['Create an Event']),
      el('div', { class: 'ob-form', style: 'margin-top:12px; display:flex; flex-direction:column; gap:12px;' }, [
        el('label', {}, [el('div', { class: 'lbl' }, ['Event Title']), titleInput]),
        el('div', { style: 'display:grid; grid-template-columns:1fr 1fr; gap:10px;' }, [
          el('label', {}, [el('div', { class: 'lbl' }, ['Date & Time']), dateInput]),
          el('label', {}, [el('div', { class: 'lbl' }, ['Category']), catSelect]),
        ]),
        el('label', {}, [el('div', { class: 'lbl' }, ['Venue / Location']), venueInput]),
        el('label', {}, [el('div', { class: 'lbl' }, ['Description']), descInput]),
      ]),
      el('div', { class: 'row', style: 'gap:10px; margin-top:20px;' }, [
        el('button', { class: 'btn btn-ghost grow', style: 'flex:1;', onclick: showMenu }, ['Back']),
        el('button', {
          class: 'btn btn-ember grow', style: 'flex:1;',
          onclick: function () {
            var title = titleInput.value.trim() || 'Community Meetup & Workshop';
            var newId = 'event-' + Date.now().toString(36);
            var newEvent = {
              id: newId,
              title: title,
              districtId: currentDistrict.id,
              date: dateInput.value.trim() || 'This Weekend',
              time: '4:00 PM – 6:30 PM',
              venue: venueInput.value.trim() || 'Mellanby Central Commons',
              organizerType: 'person',
              organizerId: 'person-tomiwa',
              organizerName: District.data.user.name,
              description: descInput.value.trim() || 'Open community gathering hosted on The District.',
              category: catSelect.value,
              coverLabel: 'EVENT',
              image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
              rsvpCount: 1,
              capacity: 50,
              userRsvpd: true,
            };
            District.data.events.unshift(newEvent);
            District.data.user.rsvps[newId] = true;
            District.data.activity.unshift({
              districtId: currentDistrict.id,
              who: District.data.user.name,
              what: 'created and published a new event: ' + title,
              when: 'Just now',
            });
            host.innerHTML = '';
            District.toast('Event “' + title + '” published to The District!');
            location.hash = '#/event/' + newId;
          },
        }, ['Publish Event']),
      ]),
    ]);

    var backdrop = el('div', { class: 'sheet-backdrop', onclick: function (e) { if (e.target === backdrop) host.innerHTML = ''; } }, [sheet]);
    host.appendChild(backdrop);
  }

  // 2. OPPORTUNITY CREATION FORM
  function showOpportunityForm() {
    host.innerHTML = '';
    var titleInput = el('input', { placeholder: 'e.g. Student Photographer for Convocation Shoots' }, []);
    var compInput = el('input', { placeholder: 'e.g. ₦30,000 stipend / project' }, []);
    var durationInput = el('input', { placeholder: 'e.g. 2 days (Sat–Sun)' }, []);
    var descInput = el('textarea', { placeholder: 'Describe the gig responsibilities and deliverables…', style: 'min-height:70px;' }, []);

    var sheet = el('div', { class: 'sheet' }, [
      el('div', { class: 'sheet-handle' }, []),
      el('div', { class: 'step-label' }, ['New Gig / Opportunity · ' + currentDistrict.name]),
      el('h3', {}, ['Post an Opportunity']),
      el('div', { class: 'ob-form', style: 'margin-top:12px; display:flex; flex-direction:column; gap:12px;' }, [
        el('label', {}, [el('div', { class: 'lbl' }, ['Opportunity Title']), titleInput]),
        el('div', { style: 'display:grid; grid-template-columns:1fr 1fr; gap:10px;' }, [
          el('label', {}, [el('div', { class: 'lbl' }, ['Compensation / Stipend']), compInput]),
          el('label', {}, [el('div', { class: 'lbl' }, ['Duration']), durationInput]),
        ]),
        el('label', {}, [el('div', { class: 'lbl' }, ['Description & Deliverables']), descInput]),
      ]),
      el('div', { class: 'row', style: 'gap:10px; margin-top:20px;' }, [
        el('button', { class: 'btn btn-ghost grow', style: 'flex:1;', onclick: showMenu }, ['Back']),
        el('button', {
          class: 'btn btn-primary grow', style: 'flex:1;',
          onclick: function () {
            var title = titleInput.value.trim() || 'Campus Collaboration Opportunity';
            var newId = 'opp-' + Date.now().toString(36);
            var newOpp = {
              id: newId,
              title: title,
              districtId: currentDistrict.id,
              postedById: 'user-tomiwa',
              postedByName: District.data.user.name,
              postedByType: 'person',
              compensation: compInput.value.trim() || '₦20,000 stipend',
              duration: durationInput.value.trim() || 'Flexible duration',
              urgency: 'Active Today',
              description: descInput.value.trim() || 'Opportunity posted to the District community.',
              requirements: ['Responsible & punctual', 'Strong communication skills'],
              applicantsCount: 0,
            };
            District.data.opportunities.unshift(newOpp);
            District.data.activity.unshift({
              districtId: currentDistrict.id,
              who: District.data.user.name,
              what: 'posted a new opportunity: ' + title,
              when: 'Just now',
            });
            host.innerHTML = '';
            District.toast('Opportunity “' + title + '” posted!');
            location.hash = '#/opportunity/' + newId;
          },
        }, ['Post Opportunity']),
      ]),
    ]);

    var backdrop = el('div', { class: 'sheet-backdrop', onclick: function (e) { if (e.target === backdrop) host.innerHTML = ''; } }, [sheet]);
    host.appendChild(backdrop);
  }

  // 3. OFFICIAL NOTICE PUBLICATION FORM
  function showNoticeForm() {
    host.innerHTML = '';
    var titleInput = el('input', { placeholder: 'e.g. Electrical Transformer Scheduled Inspection' }, []);
    var issuerInput = el('input', { placeholder: 'e.g. Hall Facilities Committee' }, []);
    var scopeInput = el('input', { placeholder: 'e.g. Mellanby Hall & Quad' }, []);
    var bodyInput = el('textarea', { placeholder: 'Full official announcement text…', style: 'min-height:80px;' }, []);

    var sheet = el('div', { class: 'sheet' }, [
      el('div', { class: 'sheet-handle' }, []),
      el('div', { class: 'step-label' }, ['Civic Authority · ' + currentDistrict.name]),
      el('h3', {}, ['Publish Official Notice']),
      el('div', { class: 'ob-form', style: 'margin-top:12px; display:flex; flex-direction:column; gap:12px;' }, [
        el('label', {}, [el('div', { class: 'lbl' }, ['Notice Title']), titleInput]),
        el('div', { style: 'display:grid; grid-template-columns:1fr 1fr; gap:10px;' }, [
          el('label', {}, [el('div', { class: 'lbl' }, ['Issuing Body']), issuerInput]),
          el('label', {}, [el('div', { class: 'lbl' }, ['Jurisdiction / Scope']), scopeInput]),
        ]),
        el('label', {}, [el('div', { class: 'lbl' }, ['Announcement Body']), bodyInput]),
      ]),
      el('div', { class: 'row', style: 'gap:10px; margin-top:20px;' }, [
        el('button', { class: 'btn btn-ghost grow', style: 'flex:1;', onclick: showMenu }, ['Back']),
        el('button', {
          class: 'btn btn-ember grow', style: 'flex:1;',
          onclick: function () {
            var title = titleInput.value.trim() || 'Official Civic Update';
            var newId = 'notice-' + Date.now().toString(36);
            var newNotice = {
              id: newId,
              title: title,
              districtId: currentDistrict.id,
              issuer: issuerInput.value.trim() || 'District Civic Council',
              issuerType: 'Hall Authority',
              jurisdiction: scopeInput.value.trim() || currentDistrict.name,
              audience: 'All Residents',
              verifiedAuthority: true,
              time: 'Effective Immediately',
              createdDate: 'Just now',
              body: bodyInput.value.trim() || 'Official notice released on The District.',
              isUrgent: true,
            };
            District.data.announcements.unshift(newNotice);
            District.data.activity.unshift({
              districtId: currentDistrict.id,
              who: newNotice.issuer,
              what: 'issued an Official Notice: ' + title,
              when: 'Just now',
            });
            host.innerHTML = '';
            District.toast('Notice published with Verified Authority badge!');
            location.hash = '#/notice/' + newId;
          },
        }, ['Publish Notice']),
      ]),
    ]);

    var backdrop = el('div', { class: 'sheet-backdrop', onclick: function (e) { if (e.target === backdrop) host.innerHTML = ''; } }, [sheet]);
    host.appendChild(backdrop);
  }

  // 4. PLACE REGISTRATION FORM
  function showPlaceForm() {
    host.innerHTML = '';
    var nameInput = el('input', { placeholder: 'e.g. The Rooftop Garden & Co-Lab' }, []);
    var typeInput = el('input', { placeholder: 'e.g. Study Hall / Creative Studio' }, []);
    var locInput = el('input', { placeholder: 'e.g. 3rd Floor, Student Complex' }, []);
    var hoursInput = el('input', { placeholder: 'e.g. 8:00 AM – 10:00 PM Daily' }, []);

    var sheet = el('div', { class: 'sheet' }, [
      el('div', { class: 'sheet-handle' }, []),
      el('div', { class: 'step-label' }, ['Place Registry · ' + currentDistrict.name]),
      el('h3', {}, ['Register a Place or Space']),
      el('div', { class: 'ob-form', style: 'margin-top:12px; display:flex; flex-direction:column; gap:12px;' }, [
        el('label', {}, [el('div', { class: 'lbl' }, ['Place Name']), nameInput]),
        el('div', { style: 'display:grid; grid-template-columns:1fr 1fr; gap:10px;' }, [
          el('label', {}, [el('div', { class: 'lbl' }, ['Type / Category']), typeInput]),
          el('label', {}, [el('div', { class: 'lbl' }, ['Opening Hours']), hoursInput]),
        ]),
        el('label', {}, [el('div', { class: 'lbl' }, ['Location Details']), locInput]),
      ]),
      el('div', { class: 'row', style: 'gap:10px; margin-top:20px;' }, [
        el('button', { class: 'btn btn-ghost grow', style: 'flex:1;', onclick: showMenu }, ['Back']),
        el('button', {
          class: 'btn btn-primary grow', style: 'flex:1;',
          onclick: function () {
            var name = nameInput.value.trim() || 'New Community Space';
            var newId = 'place-' + Date.now().toString(36);
            var newPlace = {
              id: newId,
              name: name,
              type: typeInput.value.trim() || 'Community Space',
              districtId: currentDistrict.id,
              location: locInput.value.trim() || currentDistrict.name,
              coord: currentDistrict.coord,
              bio: 'A newly registered community space and commons in ' + currentDistrict.name + '.',
              avatarLabel: name.slice(0, 2).toUpperCase(),
              image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
              liveStatus: { open: true, tag: 'Open now · Free access', level: 'good' },
              hours: hoursInput.value.trim() || 'Open Daily',
              amenities: ['Power Outlets', 'Comfortable Seating', 'Public Access'],
              capacity: '30 people',
              signal: { savesThisWeek: 1 },
            };
            District.data.places.unshift(newPlace);
            host.innerHTML = '';
            District.toast('Place “' + name + '” registered in The District!');
            location.hash = '#/place/' + newId;
          },
        }, ['Register Space']),
      ]),
    ]);

    var backdrop = el('div', { class: 'sheet-backdrop', onclick: function (e) { if (e.target === backdrop) host.innerHTML = ''; } }, [sheet]);
    host.appendChild(backdrop);
  }

  // 5. SERVICE / PRODUCT LISTING FORM
  function showServiceForm() {
    host.innerHTML = '';
    var nameInput = el('input', { placeholder: 'e.g. Express Thesis Editing & Format Check' }, []);
    var priceInput = el('input', { placeholder: 'e.g. ₦5,000' }, []);
    var durInput = el('input', { placeholder: 'e.g. 24 hours' }, []);
    var descInput = el('textarea', { placeholder: 'Service details and deliverables…', style: 'min-height:70px;' }, []);

    var sheet = el('div', { class: 'sheet' }, [
      el('div', { class: 'sheet-handle' }, []),
      el('div', { class: 'step-label' }, ['Commercial Listing · ' + currentDistrict.name]),
      el('h3', {}, ['List a Service or Product']),
      el('div', { class: 'ob-form', style: 'margin-top:12px; display:flex; flex-direction:column; gap:12px;' }, [
        el('label', {}, [el('div', { class: 'lbl' }, ['Listing Name']), nameInput]),
        el('div', { style: 'display:grid; grid-template-columns:1fr 1fr; gap:10px;' }, [
          el('label', {}, [el('div', { class: 'lbl' }, ['Price (₦)']), priceInput]),
          el('label', {}, [el('div', { class: 'lbl' }, ['Duration / Turnaround']), durInput]),
        ]),
        el('label', {}, [el('div', { class: 'lbl' }, ['Description']), descInput]),
      ]),
      el('div', { class: 'row', style: 'gap:10px; margin-top:20px;' }, [
        el('button', { class: 'btn btn-ghost grow', style: 'flex:1;', onclick: showMenu }, ['Back']),
        el('button', {
          class: 'btn btn-ember grow', style: 'flex:1;',
          onclick: function () {
            var name = nameInput.value.trim() || 'New Service';
            var currentBiz = District.getBusinesses(currentDistrict.id)[0];
            if (currentBiz) {
              var sId = 'srv-' + Date.now().toString(36);
              currentBiz.services.unshift({
                id: sId,
                name: name,
                price: priceInput.value.trim() || '₦3,000',
                duration: durInput.value.trim() || '1 hour',
                desc: descInput.value.trim() || 'Bespoke service offered on The District.',
                orderType: 'booking',
              });
              host.innerHTML = '';
              District.toast('Listing “' + name + '” added to ' + currentBiz.name + '!');
              location.hash = '#/business/' + currentBiz.id;
            } else {
              host.innerHTML = '';
              District.toast('Listing created!');
              location.hash = '#/explore/Services';
            }
          },
        }, ['Publish Listing']),
      ]),
    ]);

    var backdrop = el('div', { class: 'sheet-backdrop', onclick: function (e) { if (e.target === backdrop) host.innerHTML = ''; } }, [sheet]);
    host.appendChild(backdrop);
  }

  showMenu();
};

// =========================================================================
// ROUTE DISPATCHER
// =========================================================================
var NO_CHROME_ROUTES = { onboarding: true };

District.render = function () {
  var route = parseHash();
  var app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = '';

  if (NO_CHROME_ROUTES[route.name]) {
    var full = el('main', { class: 'app-main app-main--full', id: 'app-main' }, []);
    var renderFnFull = District.screens[route.name];
    full.appendChild(renderFnFull ? renderFnFull(route.params) : el('div', {}, ['Not found']));
    app.appendChild(full);
    window.scrollTo(0, 0);
    return;
  }

  var chrome = renderChrome(route.name);
  app.appendChild(chrome.top);
  app.appendChild(chrome.strip);

  var main = el('main', { class: 'app-main', id: 'app-main' }, []);
  app.appendChild(main);

  // Canonical entity routes
  if (route.name === 'business' || route.name === 'place' || route.name === 'org' ||
      route.name === 'event' || route.name === 'opportunity' || route.name === 'person' || route.name === 'notice') {
    if (District.screens.entity) {
      main.appendChild(District.screens.entity(route.name, route.params[0]));
    }
  } else {
    var renderFn = District.screens[route.name];
    if (renderFn) {
      main.appendChild(renderFn(route.params));
    } else {
      main.appendChild(el('div', { class: 'not-built' }, [
        el('h2', {}, ['Page not found']),
        el('p', {}, ['Could not find route “' + route.name + '”.']),
        el('a', { class: 'btn btn-primary', href: '#/home' }, ['Back to Home']),
      ]));
    }
  }

  app.appendChild(chrome.bottom);
  window.scrollTo(0, 0);
};

window.addEventListener('hashchange', District.render);
window.addEventListener('DOMContentLoaded', function () {
  if (!location.hash) location.hash = '#/home';
  District.render();
});
