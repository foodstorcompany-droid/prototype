// PROFILE & "MY DISTRICT" — Portable Local Identity & Trust Spine
// Identifiers: Verified Resident, Authority Badges, Trust Spine, Completed Transactions, Repeat Rate.
window.District = window.District || {};
District.screens = District.screens || {};
District.profileTab = District.profileTab || 'my-district';

District.screens.profile = function () {
  var el = District.el, icon = District.icon;
  var u = District.data.user;
  var orders = District.data.orders;
  var requests = District.getRequests(District.getDistrict().id).filter(function (r) { return r.requesterId === u.handle || r.requesterName === u.name; });
  var savedKeys = Object.keys(u.saved || {});
  var followingKeys = Object.keys(u.following || {}).filter(function (k) { return u.following[k]; });
  var rsvpKeys = Object.keys(u.rsvps || {}).filter(function (k) { return u.rsvps[k]; });

  var wrap = el('div', { class: 'entity-shell' }, []);

  // Profile header
  wrap.appendChild(el('div', { class: 'profile-head' }, [
    el('div', { class: 'provider-avatar', style: 'width:72px;height:72px;font-size:22px;' }, [u.avatarLabel]),
    el('div', {}, [
      el('div', { class: 'badge-resident', style: 'margin-bottom:6px;' }, [icon('check', 'icon-sm'), 'Verified Resident · Mellanby Hall']),
      el('h1', { style: 'font-family:var(--font-serif); font-size:26px; margin:0;' }, [u.name]),
      el('div', { style: 'color:var(--stone); font-size:13px; margin-top:2px;' }, [u.handle + ' · Computer Science · University of Ibadan']),
    ]),
  ]));

  // Trust Spine Block (Expanded Metrics)
  wrap.appendChild(el('div', { class: 'card', style: 'padding:18px; margin-top:20px; background:var(--vellum);' }, [
    el('div', { class: 'd-meta', style: 'margin-bottom:10px; color:var(--ember-deep);' }, ['Local Trust Spine & Reputation']),
    el('div', { class: 'provider-metrics', style: 'margin:0; padding:0; border:none;' }, [
      metric('Completed', '47'),
      metric('Repeat Rate', '94%'),
      metric('Completion', '98%'),
      metric('Disputes', '0'),
    ]),
  ]));

  // Metrics summary
  wrap.appendChild(el('div', { class: 'provider-metrics', style: 'margin-top:20px;' }, [
    metric('Following', String(followingKeys.length)),
    metric('Saved', String(savedKeys.length)),
    metric('RSVPs', String(rsvpKeys.length)),
    metric('Orders', String(orders.length)),
  ]));

  // Sub-Navigation Tabs
  var tabs = [
    { id: 'my-district', label: 'My District' },
    { id: 'requests', label: 'My Requests (' + requests.length + ')' },
    { id: 'saved', label: 'Saved (' + savedKeys.length + ')' },
    { id: 'following', label: 'Following (' + followingKeys.length + ')' },
    { id: 'orders', label: 'Orders (' + orders.length + ')' },
    { id: 'verification', label: 'Trust Audit' },
  ];

  var tabNav = el('div', { class: 'entity-tab-nav' }, tabs.map(function (tb) {
    return el('button', {
      class: 'entity-tab-btn' + (District.profileTab === tb.id ? ' active' : ''),
      onclick: function () { District.profileTab = tb.id; District.render(); },
    }, [tb.label]);
  }));
  wrap.appendChild(tabNav);

  // Tab Contents
  if (District.profileTab === 'my-district') {
    var mdBody = el('div', { style: 'display:flex; flex-direction:column; gap:20px;' }, []);

    // Active RSVPs
    var myEvents = District.data.events.filter(function (e) { return u.rsvps[e.id]; });
    if (myEvents.length) {
      mdBody.appendChild(el('div', {}, [
        el('h3', { class: 'section-h3' }, ['My Upcoming Events']),
        el('div', { style: 'display:flex; flex-direction:column; gap:8px;' }, myEvents.map(function (ev) {
          return el('a', { class: 'card', href: '#/event/' + ev.id, style: 'padding:14px 16px; display:flex; justify-content:space-between; align-items:center; text-decoration:none; color:inherit;' }, [
            el('div', {}, [
              el('div', { style: 'font-weight:500; font-size:15px;' }, [ev.title]),
              el('div', { style: 'font-size:12px; color:var(--stone); margin-top:2px;' }, [ev.date + ' · ' + ev.venue]),
            ]),
            el('span', { class: 'chip on', style: 'font-size:11px;' }, ['Attending']),
          ]);
        })),
      ]));
    }

    // Active Applications
    if (u.applications && u.applications.length) {
      mdBody.appendChild(el('div', {}, [
        el('h3', { class: 'section-h3' }, ['My Opportunity Applications']),
        el('div', { style: 'display:flex; flex-direction:column; gap:8px;' }, u.applications.map(function (ap) {
          return el('div', { class: 'card', style: 'padding:14px 16px; display:flex; justify-content:space-between; align-items:center;' }, [
            el('div', {}, [
              el('div', { style: 'font-weight:500; font-size:14.5px;' }, [ap.title]),
              el('div', { style: 'font-size:12px; color:var(--stone); margin-top:2px;' }, [ap.organization + ' · Submitted ' + ap.date]),
            ]),
            el('span', { class: 'order-status in-progress' }, [ap.status]),
          ]);
        })),
      ]));
    }

    // Quick Actions
    mdBody.appendChild(el('div', { style: 'margin-top:20px; display:flex; gap:10px; flex-wrap:wrap;' }, [
      el('a', { class: 'btn btn-ghost', href: '#/provider-dashboard' }, ['Provider Operating Console']),
      el('button', { class: 'btn btn-ghost', onclick: function () { District.onboardState.step = 0; District.navigate('#/onboarding'); } }, ['Replay Onboarding']),
      el('button', { class: 'btn btn-ghost', onclick: function () { District.navigate('#/settings'); } }, ['Settings']),
    ]));

    wrap.appendChild(mdBody);

  } else if (District.profileTab === 'requests') {
    var reqBody = el('div', { style: 'display:flex; flex-direction:column; gap:10px;' }, []);
    if (!requests.length) {
      reqBody.appendChild(el('div', { style: 'padding:40px; text-align:center; color:var(--stone);' }, ['No active requests posted yet.']));
    } else {
      requests.forEach(function (rq) {
        reqBody.appendChild(el('div', { class: 'card', style: 'padding:14px 16px; display:flex; justify-content:space-between; align-items:center;' }, [
          el('div', {}, [
            el('div', { style: 'font-weight:500; font-size:15px;' }, [rq.title]),
            el('div', { style: 'font-size:12px; color:var(--stone); margin-top:2px;' }, [rq.category + ' · Budget: ' + rq.budget]),
          ]),
          el('span', { class: 'chip ember' }, [rq.responsesCount + ' Offers']),
        ]));
      });
    }
    wrap.appendChild(reqBody);

  } else if (District.profileTab === 'saved') {
    var savedList = el('div', { style: 'display:flex; flex-direction:column; gap:10px;' }, []);
    if (!savedKeys.length) {
      savedList.appendChild(el('div', { style: 'padding:40px; text-align:center; color:var(--stone);' }, ['No saved items yet. Save places, events, or opportunities across the District.']));
    } else {
      savedKeys.forEach(function (k) {
        var itm = u.saved[k];
        savedList.appendChild(el('div', { class: 'card', style: 'padding:14px 16px; display:flex; justify-content:space-between; align-items:center;' }, [
          el('div', {}, [
            el('span', { class: 'cat', style: 'font-family:var(--font-mono); font-size:9.5px; text-transform:uppercase; color:var(--stone);' }, [itm.type || 'Saved Item']),
            el('div', { style: 'font-weight:500; font-size:15px; margin-top:2px;' }, [itm.title || itm.id]),
            el('div', { style: 'font-size:12px; color:var(--stone);' }, [itm.subtitle || '']),
          ]),
          el('button', {
            class: 'btn btn-ghost btn-sm',
            onclick: function () { District.toggleSave(k); },
          }, ['Remove']),
        ]));
      });
    }
    wrap.appendChild(savedList);

  } else if (District.profileTab === 'following') {
    var followList = el('div', { style: 'display:flex; flex-direction:column; gap:10px;' }, []);
    if (!followingKeys.length) {
      followList.appendChild(el('div', { style: 'padding:40px; text-align:center; color:var(--stone);' }, ['Not following any businesses or organisations yet.']));
    } else {
      followingKeys.forEach(function (k) {
        var entRes = District.getEntity(k);
        var name = entRes ? (entRes.entity.name || entRes.entity.title) : k;
        var cat = entRes ? (entRes.entity.category || entRes.type) : 'District Entity';
        followList.appendChild(el('div', { class: 'card', style: 'padding:14px 16px; display:flex; justify-content:space-between; align-items:center;' }, [
          el('div', {}, [
            el('div', { style: 'font-weight:500; font-size:15px;' }, [name]),
            el('div', { style: 'font-size:12px; color:var(--stone);' }, [cat]),
          ]),
          el('button', {
            class: 'btn btn-ghost btn-sm',
            onclick: function () { District.toggleFollow(k); },
          }, ['Following ✓']),
        ]));
      });
    }
    wrap.appendChild(followList);

  } else if (District.profileTab === 'orders') {
    wrap.appendChild(el('div', { class: 'happening-list' }, orders.map(function (o) {
      return el('div', { class: 'order-row' }, [
        el('div', {}, [
          el('div', { style: 'font-weight:500; font-size:14px;' }, [o.service]),
          el('div', { style: 'font-size:12px; color:var(--stone);' }, [o.providerId + ' · ' + o.when]),
        ]),
        el('div', { style: 'text-align:right;' }, [
          el('div', { class: 'order-status ' + o.status.toLowerCase().replace(' ', '-') }, [o.status]),
          el('div', { style: 'font-family:var(--font-serif); font-size:14px; margin-top:2px;' }, [o.amount]),
        ]),
      ]);
    })));

  } else if (District.profileTab === 'verification') {
    var vBody = el('div', {}, [
      el('h3', { class: 'section-h3' }, ['My Local Trust Verification Spine']),
      el('div', { class: 'trust-grid', style: 'max-width:420px;' }, [
        trustItem('Identity', u.trust.identity), trustItem('Business', u.trust.business),
        trustItem('Location', u.trust.location), trustItem('Transactions', u.trust.transactions),
      ]),
    ]);
    wrap.appendChild(vBody);
  }

  return wrap;
};

function metric(k, v) {
  var el = District.el;
  return el('div', { class: 'pmet' }, [el('div', { class: 'k' }, [k]), el('div', { class: 'v' }, [v])]);
}
function trustItem(label, on) {
  var el = District.el, icon = District.icon;
  return el('div', { class: 'ti' + (on ? ' on' : '') }, [icon(on ? 'check' : 'close', 'icon-sm'), label]);
}
