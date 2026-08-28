// REQUESTS — Hyper-Local Demand & Matching Engine
// Connects local demand directly with providers, creators, and artisans.
window.District = window.District || {};
District.screens = District.screens || {};
District.requestsState = { filter: 'All' };

District.screens.requests = function (params) {
  var el = District.el, icon = District.icon;
  var d = District.getDistrict();
  var rs = District.requestsState;
  var activeId = params && params[0];

  if (activeId) {
    var reqResult = District.getEntity(activeId, 'request');
    if (reqResult && reqResult.entity) {
      return renderRequestDetail(reqResult.entity);
    }
  }

  var requests = District.getRequests(d.id);
  var categories = ['All', 'Tech Repair', 'Design', 'Print & Media', 'Grooming', 'Food & Catering', 'General'];

  var filteredRequests = requests.filter(function (r) {
    if (rs.filter === 'All') return true;
    return r.category.toLowerCase() === rs.filter.toLowerCase();
  });

  var wrap = el('div', { class: 'entity-shell' }, []);

  // Hero Section
  wrap.appendChild(el('div', { class: 'home-hero', style: 'padding-bottom:12px;' }, [
    el('div', { class: 'eyebrow' }, [
      el('span', { class: 'bar' }, []),
      'Hyper-Local Demand · ' + d.name,
    ]),
    el('h1', {}, ['What do you ', el('em', {}, ['need']), ' today?']),
    el('div', { class: 'sub' }, [
      'Post a request and match with verified providers, artisans, and creators in ' + d.name + '.',
    ]),
    el('button', {
      class: 'btn btn-ember btn-lg',
      style: 'margin-top:18px;',
      onclick: function () { District.openPostRequestModal(); },
    }, [icon('plus', 'icon-sm'), 'Post a Request in ' + d.name]),
  ]));

  // Filter Bar
  wrap.appendChild(el('div', { class: 'category-pills', style: 'margin-bottom:20px;' }, categories.map(function (c) {
    var on = rs.filter === c;
    return el('button', {
      class: 'chip category-pill' + (on ? ' on' : ''),
      onclick: function () { rs.filter = c; District.render(); },
    }, [c]);
  })));

  // Requests Feed
  var requestCards = filteredRequests.map(function (rq) {
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
          el('span', {}, ['· ' + rq.createdDate]),
        ]),
        el('div', { class: 'row', style: 'gap:8px;' }, [
          el('a', { class: 'btn btn-ghost btn-sm', href: '#/request/' + rq.id }, ['View Details']),
          el('button', {
            class: 'btn btn-primary btn-sm',
            onclick: function () { District.openRespondRequestModal(rq); },
          }, ['Offer Service (' + rq.responsesCount + ')']),
        ]),
      ]),
    ]);
  });

  if (!filteredRequests.length) {
    requestCards = [
      el('div', { style: 'padding:40px; text-align:center; color:var(--stone); border:1px solid var(--fog); border-radius:var(--r-lg);' }, [
        'No open requests under "' + rs.filter + '" in ' + d.name + ' right now. Be the first to post one!',
      ]),
    ];
  }

  wrap.appendChild(el('div', { style: 'display:flex; flex-direction:column; gap:14px;' }, requestCards));
  return wrap;
};

// CANONICAL REQUEST DETAIL VIEW
function renderRequestDetail(rq) {
  var el = District.el, icon = District.icon;
  var d = District.getDistrict(rq.districtId);

  var wrap = el('div', { class: 'entity-shell' }, []);

  wrap.appendChild(el('a', { href: '#/requests', style: 'display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:var(--stone); font-size:13px; margin-bottom:16px;' }, [
    icon('chevronLeft', 'icon-sm'), 'Back to Requests Feed',
  ]));

  wrap.appendChild(el('div', { class: 'entity-header' }, [
    el('div', { class: 'entity-badge' }, [icon('bolt', 'icon-sm'), 'District Request · ' + rq.urgency]),
    el('h1', { style: 'font-family:var(--font-serif); font-size:28px; margin:6px 0 8px;' }, [rq.title]),
    el('div', { class: 'cat', style: 'color:var(--stone); font-size:14px;' }, ['Requested by ' + rq.requesterName + ' · ' + rq.location]),
  ]));

  var left = el('div', {}, [
    el('div', { class: 'request-stipend', style: 'display:inline-block; font-size:16px; padding:6px 16px; margin-bottom:18px;' }, ['Budget: ' + rq.budget]),
    el('p', { class: 'provider-bio', style: 'font-size:16px; margin-top:0;' }, [rq.description]),
    el('h3', { class: 'section-h3' }, ['Request Specifications']),
    el('div', { class: 'sheet-summary', style: 'margin:0 0 24px;' }, [
      row2('Category', rq.category),
      row2('Urgency / Timeline', rq.urgency),
      row2('Location / Scope', rq.location),
      row2('Responses Received', String(rq.responsesCount)),
      row2('Status', rq.status),
    ]),
  ]);

  var right = el('div', { class: 'provider-side-card' }, [
    el('div', { style: 'font-family:var(--font-serif); font-size:22px; margin-bottom:4px;' }, [rq.budget]),
    el('div', { style: 'font-size:12.5px; color:var(--stone); margin-bottom:16px;' }, [rq.responsesCount + ' providers responded']),
    el('button', {
      class: 'btn btn-primary', style: 'width:100%; margin-bottom:8px;',
      onclick: function () { District.openRespondRequestModal(rq); },
    }, ['Respond & Offer Service']),
    el('button', {
      class: 'btn btn-ghost', style: 'width:100%;',
      onclick: function () { District.toast('Opening chat with requester'); location.hash = '#/messages'; },
    }, [icon('chat', 'icon-sm'), 'Contact Requester']),
  ]);

  wrap.appendChild(el('div', { class: 'provider-grid' }, [left, right]));
  return wrap;
}

// MODALS: POST REQUEST & RESPOND TO REQUEST
District.openPostRequestModal = function () {
  var el = District.el, icon = District.icon;
  var host = document.getElementById('sheet-host');
  if (!host) return;
  host.innerHTML = '';
  var currentDistrict = District.getDistrict();

  var titleInput = el('input', { placeholder: 'e.g. Phone repair, tailoring, or graphic design…' }, []);
  var catSelect = el('select', {}, ['Tech Repair', 'Design', 'Print & Media', 'Grooming', 'Food & Catering', 'General'].map(function (c) {
    return el('option', { value: c }, [c]);
  }));
  var budgetInput = el('input', { placeholder: 'e.g. ₦10,000' }, []);
  var locInput = el('input', { placeholder: 'e.g. Block B, Room 14, Mellanby' }, []);
  var descInput = el('textarea', { placeholder: 'Describe what you need done, deadline, or specifications…', style: 'min-height:80px;' }, []);

  var sheet = el('div', { class: 'sheet' }, [
    el('div', { class: 'sheet-handle' }, []),
    el('div', { class: 'step-label' }, ['Demand Engine · ' + currentDistrict.name]),
    el('h3', {}, ['Post a Request']),
    el('div', { class: 'ob-form', style: 'margin-top:12px; display:flex; flex-direction:column; gap:12px;' }, [
      el('label', {}, [el('div', { class: 'lbl' }, ['What do you need?']), titleInput]),
      el('div', { style: 'display:grid; grid-template-columns:1fr 1fr; gap:10px;' }, [
        el('label', {}, [el('div', { class: 'lbl' }, ['Category']), catSelect]),
        el('label', {}, [el('div', { class: 'lbl' }, ['Estimated Budget']), budgetInput]),
      ]),
      el('label', {}, [el('div', { class: 'lbl' }, ['Location / Building']), locInput]),
      el('label', {}, [el('div', { class: 'lbl' }, ['Description & Details']), descInput]),
    ]),
    el('div', { class: 'row', style: 'gap:10px; margin-top:20px;' }, [
      el('button', { class: 'btn btn-ghost grow', style: 'flex:1;', onclick: function () { host.innerHTML = ''; } }, ['Cancel']),
      el('button', {
        class: 'btn btn-ember grow', style: 'flex:1;',
        onclick: function () {
          var title = titleInput.value.trim();
          if (!title) { District.toast('Please enter a request title'); return; }
          District.createRequest({
            title: title,
            category: catSelect.value,
            budget: budgetInput.value.trim() || 'Open budget',
            location: locInput.value.trim() || currentDistrict.name,
            description: descInput.value.trim() || 'Posted on The District demand engine.',
          });
          host.innerHTML = '';
          location.hash = '#/requests';
        },
      }, ['Post Request']),
    ]),
  ]);

  var backdrop = el('div', { class: 'sheet-backdrop', onclick: function (e) { if (e.target === backdrop) host.innerHTML = ''; } }, [sheet]);
  host.appendChild(backdrop);
};

District.openRespondRequestModal = function (rq) {
  var el = District.el, icon = District.icon;
  var host = document.getElementById('sheet-host');
  if (!host) return;
  host.innerHTML = '';

  var noteInput = el('textarea', {
    placeholder: 'Introduce your service, availability, or pricing offer…',
    style: 'width:100%; min-height:80px; padding:12px; border:1px solid var(--fog); border-radius:var(--r-md); font-family:var(--font-sans); font-size:13.5px; margin:14px 0;',
  }, []);

  var sheet = el('div', { class: 'sheet' }, [
    el('div', { class: 'sheet-handle' }, []),
    el('div', { class: 'step-label' }, ['Offer Service']),
    el('h3', {}, [rq.title]),
    el('div', { style: 'color:var(--stone); font-size:13px; margin-bottom:10px;' }, ['Budget: ' + rq.budget + ' · Posted by ' + rq.requesterName]),
    noteInput,
    el('div', { class: 'row', style: 'gap:10px;' }, [
      el('button', { class: 'btn btn-ghost grow', onclick: function () { host.innerHTML = ''; } }, ['Cancel']),
      el('button', {
        class: 'btn btn-primary grow',
        onclick: function () {
          District.respondToRequest(rq.id, noteInput.value);
          host.innerHTML = '';
        },
      }, ['Send Offer / Proposal']),
    ]),
  ]);

  var backdrop = el('div', { class: 'sheet-backdrop', onclick: function (e) { if (e.target === backdrop) host.innerHTML = ''; } }, [sheet]);
  host.appendChild(backdrop);
};

function row2(k, v) {
  var el = District.el;
  return el('div', { class: 'row2' }, [el('span', { style: 'color:var(--stone);' }, [k]), el('span', { style: 'font-weight:500;' }, [v])]);
}
