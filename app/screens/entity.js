// THE DISTRICT — Canonical Universal Entity Renderer
// Routes: #/business/:id, #/place/:id, #/org/:id, #/event/:id, #/opportunity/:id, #/person/:id, #/notice/:id
window.District = window.District || {};
District.screens = District.screens || {};

District.screens.entity = function (type, id) {
  var el = District.el, icon = District.icon;
  var result = District.getEntity(id, type);
  if (!result || !result.entity) {
    return el('div', { class: 'not-built' }, [
      el('h2', {}, ['Entity not found']),
      el('p', {}, ['The requested ' + (type || 'item') + ' could not be found in this District.']),
      el('a', { class: 'btn btn-primary', href: '#/home' }, ['Back to Home']),
    ]);
  }

  var ent = result.entity;
  var entType = result.type;

  if (entType === 'business') return renderBusiness(ent);
  if (entType === 'place') return renderPlace(ent);
  if (entType === 'organization') return renderOrganization(ent);
  if (entType === 'event') return renderEvent(ent);
  if (entType === 'opportunity') return renderOpportunity(ent);
  if (entType === 'person') return renderPerson(ent);
  if (entType === 'announcement') return renderAnnouncement(ent);

  return el('div', {}, ['Unknown entity type']);
};

// ---------------------------------------------------------------------------
// 1. BUSINESS CANONICAL VIEW
// ---------------------------------------------------------------------------
function renderBusiness(b) {
  var el = District.el, icon = District.icon;
  var d = District.getDistrict(b.districtId);
  var isFollowing = !!District.data.user.following[b.id];
  var isSaved = !!District.data.user.saved[b.id];

  var wrap = el('div', { class: 'entity-shell' }, []);

  // Back link
  wrap.appendChild(el('a', { href: '#/explore', style: 'display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:var(--stone); font-size:13px; margin-bottom:16px;' }, [
    icon('chevronLeft', 'icon-sm'), 'Back to District',
  ]));

  // Hero figure
  wrap.appendChild(el('div', { class: 'provider-hero d-figure' }, [
    b.image
      ? el('img', { src: b.image, alt: b.name, style: 'width:100%;height:100%;object-fit:cover;' })
      : el('div', { class: 'd-placeholder', 'data-label': b.category.toUpperCase(), 'data-coord': b.coord || '07°26′N' }, []),
  ]));

  // Header row
  var header = el('div', { class: 'provider-id-row' }, [
    el('div', { class: 'provider-avatar' }, [b.avatarLabel || b.name.slice(0, 2).toUpperCase()]),
    el('div', { class: 'provider-id-name' }, [
      el('div', { class: 'badge-business' }, [icon('check', 'icon-sm'), 'Verified Business · Mellanby']),
      el('h1', {}, [b.name]),
      el('div', { class: 'cat' }, [b.category, b.ownerName ? ' · Owned by ' + b.ownerName : '']),
    ]),
  ]);
  wrap.appendChild(header);

  // Main grid
  var left = el('div', {}, []);
  left.appendChild(el('p', { class: 'provider-bio' }, [b.bio]));

  // Trust Spine Metrics
  left.appendChild(el('div', { class: 'card', style: 'padding:16px; margin-bottom:24px; background:var(--vellum);' }, [
    el('div', { class: 'd-meta', style: 'margin-bottom:8px; color:var(--ember-deep);' }, ['Local Trust Spine & Performance']),
    el('div', { class: 'provider-metrics', style: 'margin:0; padding:0; border:none;' }, [
      metric('Rating', '★ ' + (b.rating ? b.rating.toFixed(1) : '4.9')),
      metric('Completed', b.completed ? String(b.completed) : '47'),
      metric('Repeat Rate', b.signal ? b.signal.repeatRate : '94%'),
      metric('Disputes', '0'),
    ]),
  ]));

  // Services section
  if (b.services && b.services.length) {
    left.appendChild(el('h3', { class: 'section-h3' }, ['Services Offered']));
    left.appendChild(el('div', {}, b.services.map(function (s) {
      return el('div', { class: 'service-row' }, [
        el('div', {}, [
          el('div', { class: 'name' }, [s.name]),
          el('div', { class: 'desc' }, [s.desc]),
          el('div', { class: 'meta' }, [s.duration]),
        ]),
        el('div', { style: 'display:flex; flex-direction:column; align-items:flex-end; gap:6px;' }, [
          el('div', { class: 'price' }, [s.price]),
          el('button', {
            class: 'btn btn-ember btn-sm',
            onclick: function () {
              District.toast('Booking flow started for ' + s.name);
              location.hash = '#/provider/' + b.id;
            },
          }, [s.orderType === 'purchase' ? 'Order' : 'Book']),
        ]),
      ]);
    })));
  }

  // Products section
  if (b.products && b.products.length) {
    left.appendChild(el('h3', { class: 'section-h3' }, ['Menu / Products']));
    left.appendChild(el('div', {}, b.products.map(function (pr) {
      return el('div', { class: 'service-row' }, [
        el('div', {}, [
          el('div', { class: 'name' }, [pr.name]),
          el('div', { class: 'desc' }, [pr.desc]),
        ]),
        el('div', { style: 'display:flex; flex-direction:column; align-items:flex-end; gap:6px;' }, [
          el('div', { class: 'price' }, [pr.price]),
          el('button', { class: 'btn btn-primary btn-sm', onclick: function () { District.toast('Added ' + pr.name + ' to order (simulated)'); } }, ['Order']),
        ]),
      ]);
    })));
  }

  // Reviews
  if (b.reviews && b.reviews.length) {
    left.appendChild(el('h3', { class: 'section-h3' }, ['Verified Reviews']));
    left.appendChild(el('div', {}, b.reviews.map(function (r) {
      return el('div', { class: 'review-item' }, [
        el('div', { class: 'rhead' }, [el('span', { class: 'rname' }, [r.author]), el('span', { class: 'rstars' }, ['★'.repeat(r.rating)])]),
        el('div', { class: 'rtext' }, [r.text]),
      ]);
    })));
  }

  // Right sidebar
  var right = el('div', { class: 'provider-side-card' }, [
    el('div', { class: 'row' }, [icon('pin', 'icon-sm'), el('span', { style: 'font-size:13px; color:var(--stone);' }, [b.location || d.name])]),
    el('div', { class: 'trust-grid' }, [
      trustItem('Identity', b.trust ? b.trust.identity : true),
      trustItem('Business', b.trust ? b.trust.business : true),
      trustItem('Location', b.trust ? b.trust.location : true),
      trustItem('Transactions', b.trust ? b.trust.transactions : true),
    ]),
    el('div', { class: 'entity-actions-bar', style: 'margin-top:14px;' }, [
      el('button', {
        class: 'btn ' + (isFollowing ? 'btn-quiet' : 'btn-primary') + ' grow', style: 'flex:1;',
        onclick: function () { District.toggleFollow(b.id); },
      }, [icon('check', 'icon-sm'), isFollowing ? 'Following' : 'Follow Business']),
      el('button', {
        class: 'btn btn-ghost',
        onclick: function () { District.toggleSave(b.id, 'Business', b.name, b.category); },
      }, [icon('bag', 'icon-sm'), isSaved ? 'Saved' : 'Save']),
    ]),
    el('button', {
      class: 'btn btn-ghost', style: 'width:100%; margin-top:8px;',
      onclick: function () { District.toast('Opening chat with ' + b.name); location.hash = '#/messages'; },
    }, [icon('chat', 'icon-sm'), 'Message Business']),
  ]);

  wrap.appendChild(el('div', { class: 'provider-grid' }, [left, right]));
  return wrap;
}

// ---------------------------------------------------------------------------
// 2. PLACE CANONICAL VIEW
// ---------------------------------------------------------------------------
function renderPlace(pl) {
  var el = District.el, icon = District.icon;
  var d = District.getDistrict(pl.districtId);
  var isSaved = !!District.data.user.saved[pl.id];

  var wrap = el('div', { class: 'entity-shell' }, []);

  wrap.appendChild(el('a', { href: '#/explore', style: 'display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:var(--stone); font-size:13px; margin-bottom:16px;' }, [
    icon('chevronLeft', 'icon-sm'), 'Back to District',
  ]));

  wrap.appendChild(el('div', { class: 'provider-hero d-figure' }, [
    pl.image
      ? el('img', { src: pl.image, alt: pl.name, style: 'width:100%;height:100%;object-fit:cover;' })
      : el('div', { class: 'd-placeholder', 'data-label': pl.type.toUpperCase(), 'data-coord': pl.coord || '07°26′N' }, []),
  ]));

  wrap.appendChild(el('div', { class: 'provider-id-row' }, [
    el('div', { class: 'provider-avatar', style: 'background:oklch(0.92 0.04 240); color:oklch(0.45 0.14 240);' }, [pl.avatarLabel || 'PL']),
    el('div', { class: 'provider-id-name' }, [
      el('div', { class: 'entity-badge' }, [icon('pin', 'icon-sm'), 'Place · ' + (pl.liveStatus ? pl.liveStatus.tag : 'Open')]),
      el('h1', {}, [pl.name]),
      el('div', { class: 'cat' }, [pl.type + ' · ' + pl.location]),
    ]),
  ]));

  var left = el('div', {}, [
    el('p', { class: 'provider-bio' }, [pl.bio]),
    el('h3', { class: 'section-h3' }, ['Amenities & Infrastructure']),
    el('div', { class: 'category-pills', style: 'margin-bottom:24px;' }, (pl.amenities || []).map(function (am) {
      return el('span', { class: 'chip' }, [icon('check', 'icon-sm'), am]);
    })),
    el('h3', { class: 'section-h3' }, ['Opening Hours & Access']),
    el('div', { class: 'sheet-summary', style: 'margin:0 0 24px;' }, [
      row2('Operating Hours', pl.hours),
      row2('Capacity', pl.capacity),
      row2('District Coordinates', pl.coord || d.coord),
    ]),
  ]);

  var right = el('div', { class: 'provider-side-card' }, [
    el('div', { class: 'live-chip ' + (pl.liveStatus && pl.liveStatus.level || 'good'), style: 'font-size:13px; margin-bottom:14px;' }, [
      el('span', { class: 'pulse-dot' }, []), pl.liveStatus ? pl.liveStatus.tag : 'Open to Public',
    ]),
    el('div', { class: 'row', style: 'font-size:12.5px; color:var(--stone); margin-bottom:14px;' }, [
      icon('pin', 'icon-sm'), pl.location,
    ]),
    el('button', {
      class: 'btn btn-primary', style: 'width:100%; margin-bottom:8px;',
      onclick: function () { District.toast('Directions to ' + pl.name + ' simulated.'); },
    }, [icon('explore', 'icon-sm'), 'Get Directions']),
    el('button', {
      class: 'btn btn-ghost', style: 'width:100%;',
      onclick: function () { District.toggleSave(pl.id, 'Place', pl.name, pl.type); },
    }, [icon('bag', 'icon-sm'), isSaved ? 'Saved in My District' : 'Save Place']),
  ]);

  wrap.appendChild(el('div', { class: 'provider-grid' }, [left, right]));
  return wrap;
}

// ---------------------------------------------------------------------------
// 3. ORGANIZATION CANONICAL VIEW
// ---------------------------------------------------------------------------
function renderOrganization(og) {
  var el = District.el, icon = District.icon;
  var isFollowing = !!District.data.user.following[og.id];

  var wrap = el('div', { class: 'entity-shell' }, []);

  wrap.appendChild(el('a', { href: '#/explore', style: 'display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:var(--stone); font-size:13px; margin-bottom:16px;' }, [
    icon('chevronLeft', 'icon-sm'), 'Back to District',
  ]));

  wrap.appendChild(el('div', { class: 'provider-hero d-figure' }, [
    og.image
      ? el('img', { src: og.image, alt: og.name, style: 'width:100%;height:100%;object-fit:cover;' })
      : el('div', { class: 'd-placeholder', 'data-label': og.category.toUpperCase(), 'data-coord': 'ORG' }, []),
  ]));

  wrap.appendChild(el('div', { class: 'provider-id-row' }, [
    el('div', { class: 'provider-avatar', style: 'background:oklch(0.92 0.05 300); color:oklch(0.48 0.16 300);' }, [og.avatarLabel || 'OG']),
    el('div', { class: 'provider-id-name' }, [
      el('div', { class: 'entity-badge' }, [icon('shield', 'icon-sm'), og.authorityTier || 'Community Organization']),
      el('h1', {}, [og.name]),
      el('div', { class: 'cat' }, [og.memberCount + ' Members · ' + og.category]),
    ]),
  ]));

  var left = el('div', {}, [
    el('p', { class: 'provider-bio' }, [og.bio]),
    el('h3', { class: 'section-h3' }, ['Executive Leadership']),
    el('div', { style: 'display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-bottom:24px;' }, (og.leadership || []).map(function (ld) {
      return el('div', { class: 'card', style: 'padding:12px;' }, [
        el('div', { style: 'font-weight:500; font-size:14px;' }, [ld.name]),
        el('div', { style: 'font-family:var(--font-mono); font-size:11px; color:var(--stone); margin-top:2px;' }, [ld.role]),
      ]);
    })),
  ]);

  var right = el('div', { class: 'provider-side-card' }, [
    el('div', { style: 'font-family:var(--font-serif); font-size:22px; margin-bottom:4px;' }, [og.memberCount.toLocaleString() + ' Members']),
    el('div', { style: 'font-size:12.5px; color:var(--stone); margin-bottom:16px;' }, [og.openStatus || 'Active Community']),
    el('button', {
      class: 'btn ' + (isFollowing ? 'btn-quiet' : 'btn-primary'), style: 'width:100%; margin-bottom:8px;',
      onclick: function () { District.toggleFollow(og.id); },
    }, [icon('check', 'icon-sm'), isFollowing ? 'Joined / Following' : 'Join Community']),
    el('button', {
      class: 'btn btn-ghost', style: 'width:100%;',
      onclick: function () { District.toast('Opening contact with ' + og.name); },
    }, [icon('chat', 'icon-sm'), 'Contact Executive']),
  ]);

  wrap.appendChild(el('div', { class: 'provider-grid' }, [left, right]));
  return wrap;
}

// ---------------------------------------------------------------------------
// 4. EVENT CANONICAL VIEW
// ---------------------------------------------------------------------------
function renderEvent(ev) {
  var el = District.el, icon = District.icon;
  var isRsvpd = !!District.data.user.rsvps[ev.id];
  var isSaved = !!District.data.user.saved[ev.id];

  var wrap = el('div', { class: 'entity-shell' }, []);

  wrap.appendChild(el('a', { href: '#/explore', style: 'display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:var(--stone); font-size:13px; margin-bottom:16px;' }, [
    icon('chevronLeft', 'icon-sm'), 'Back to District',
  ]));

  wrap.appendChild(el('div', { class: 'provider-hero d-figure' }, [
    ev.image
      ? el('img', { src: ev.image, alt: ev.title, style: 'width:100%;height:100%;object-fit:cover;' })
      : el('div', { class: 'd-placeholder', 'data-label': ev.category.toUpperCase() + ' EVENT', 'data-coord': ev.date }, []),
  ]));

  wrap.appendChild(el('div', { class: 'provider-id-row' }, [
    el('div', { class: 'provider-avatar', style: 'background:var(--signal-soft); color:var(--signal);' }, [ev.coverLabel || 'EV']),
    el('div', { class: 'provider-id-name' }, [
      el('div', { class: 'entity-badge' }, [icon('calendar', 'icon-sm'), 'Event · ' + ev.date]),
      el('h1', {}, [ev.title]),
      el('div', { class: 'cat' }, ['Hosted by ' + ev.organizerName + ' · ' + ev.venue]),
    ]),
  ]));

  var left = el('div', {}, [
    el('p', { class: 'provider-bio' }, [ev.description]),
    el('h3', { class: 'section-h3' }, ['Schedule & Location Details']),
    el('div', { class: 'sheet-summary', style: 'margin:0 0 24px;' }, [
      row2('Date & Time', ev.date + ' · ' + ev.time),
      row2('Venue / Space', ev.venue),
      row2('Host Organisation', ev.organizerName),
      row2('Expected Attendees', ev.rsvpCount + ' / ' + ev.capacity + ' seats'),
    ]),
  ]);

  var right = el('div', { class: 'provider-side-card' }, [
    el('div', { style: 'font-family:var(--font-serif); font-size:24px; margin-bottom:2px;' }, [ev.rsvpCount + ' Attending']),
    el('div', { style: 'font-size:12px; color:var(--stone); margin-bottom:16px;' }, ['Free admission · Open to District']),
    el('button', {
      class: 'btn ' + (isRsvpd ? 'btn-quiet' : 'btn-ember'), style: 'width:100%; margin-bottom:8px;',
      onclick: function () { District.toggleRSVP(ev.id); },
    }, [icon('check', 'icon-sm'), isRsvpd ? '✓ RSVP Confirmed' : 'RSVP for Event']),
    el('button', {
      class: 'btn btn-ghost', style: 'width:100%;',
      onclick: function () { District.toggleSave(ev.id, 'Event', ev.title, ev.date); },
    }, [icon('bag', 'icon-sm'), isSaved ? 'Saved in My District' : 'Save Event']),
  ]);

  wrap.appendChild(el('div', { class: 'provider-grid' }, [left, right]));
  return wrap;
}

// ---------------------------------------------------------------------------
// 5. OPPORTUNITY CANONICAL VIEW
// ---------------------------------------------------------------------------
function renderOpportunity(op) {
  var el = District.el, icon = District.icon;
  var isSaved = !!District.data.user.saved[op.id];

  var wrap = el('div', { class: 'entity-shell' }, []);

  wrap.appendChild(el('a', { href: '#/home', style: 'display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:var(--stone); font-size:13px; margin-bottom:16px;' }, [
    icon('chevronLeft', 'icon-sm'), 'Back to District',
  ]));

  wrap.appendChild(el('div', { class: 'entity-header' }, [
    el('div', { class: 'entity-badge' }, [icon('briefcase', 'icon-sm'), 'District Opportunity · ' + op.urgency]),
    el('h1', { style: 'font-family:var(--font-serif); font-size:28px; margin:6px 0 8px;' }, [op.title]),
    el('div', { class: 'cat', style: 'color:var(--stone); font-size:14px;' }, ['Posted by ' + op.postedByName + ' · ' + op.duration]),
  ]));

  var left = el('div', {}, [
    el('div', { class: 'opp-stipend', style: 'display:inline-block; font-size:15px; padding:6px 14px; margin-bottom:18px;' }, [op.compensation]),
    el('p', { class: 'provider-bio', style: 'font-size:16px; margin-top:0;' }, [op.description]),
    el('h3', { class: 'section-h3' }, ['Requirements']),
    el('div', { style: 'display:flex; flex-direction:column; gap:8px; margin-bottom:24px;' }, (op.requirements || []).map(function (rq) {
      return el('div', { style: 'display:flex; gap:8px; font-size:13.5px; color:var(--ink-soft);' }, [icon('check', 'icon-sm'), rq]);
    })),
  ]);

  var right = el('div', { class: 'provider-side-card' }, [
    el('div', { style: 'font-family:var(--font-serif); font-size:20px; margin-bottom:4px;' }, [op.compensation]),
    el('div', { style: 'font-size:12.5px; color:var(--stone); margin-bottom:16px;' }, [op.applicantsCount + ' applications received']),
    el('button', {
      class: 'btn btn-primary', style: 'width:100%; margin-bottom:8px;',
      onclick: function () { openApplyModal(op); },
    }, ['Apply / Submit Inquiry']),
    el('button', {
      class: 'btn btn-ghost', style: 'width:100%;',
      onclick: function () { District.toggleSave(op.id, 'Opportunity', op.title, op.compensation); },
    }, [icon('bag', 'icon-sm'), isSaved ? 'Saved' : 'Save Opportunity']),
  ]);

  wrap.appendChild(el('div', { class: 'provider-grid' }, [left, right]));
  return wrap;
}

// ---------------------------------------------------------------------------
// 6. PERSON CANONICAL VIEW
// ---------------------------------------------------------------------------
function renderPerson(pe) {
  var el = District.el, icon = District.icon;
  var isFollowing = !!District.data.user.following[pe.id];

  var wrap = el('div', { class: 'entity-shell' }, []);

  wrap.appendChild(el('a', { href: '#/explore', style: 'display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:var(--stone); font-size:13px; margin-bottom:16px;' }, [
    icon('chevronLeft', 'icon-sm'), 'Back to District',
  ]));

  wrap.appendChild(el('div', { class: 'provider-id-row', style: 'margin-top:20px;' }, [
    el('div', { class: 'provider-avatar' }, [pe.avatarLabel || 'P']),
    el('div', { class: 'provider-id-name' }, [
      el('div', { class: 'entity-badge' }, [icon('user', 'icon-sm'), pe.trustLevel || 'Verified Member']),
      el('h1', {}, [pe.name]),
      el('div', { class: 'cat' }, [pe.role]),
    ]),
  ]));

  var left = el('div', {}, [
    el('p', { class: 'provider-bio' }, [pe.bio]),
    pe.businessId ? el('div', { class: 'sheet-summary', style: 'margin:20px 0;' }, [
      row2('Affiliated Business', pe.businessId),
      el('a', { href: '#/business/' + pe.businessId, style: 'font-size:12.5px; color:var(--ember-deep); text-decoration:none; font-weight:500; margin-top:6px; display:inline-block;' }, ['View Business Profile →']),
    ]) : null,
  ]);

  var right = el('div', { class: 'provider-side-card' }, [
    el('div', { class: 'entity-badge', style: 'color:var(--signal);' }, [icon('check', 'icon-sm'), 'Verified Resident']),
    el('button', {
      class: 'btn ' + (isFollowing ? 'btn-quiet' : 'btn-primary'), style: 'width:100%; margin-top:10px;',
      onclick: function () { District.toggleFollow(pe.id); },
    }, [icon('check', 'icon-sm'), isFollowing ? 'Following' : 'Follow Person']),
  ]);

  wrap.appendChild(el('div', { class: 'provider-grid' }, [left, right]));
  return wrap;
}

// ---------------------------------------------------------------------------
// 7. ANNOUNCEMENT CANONICAL VIEW
// ---------------------------------------------------------------------------
function renderAnnouncement(an) {
  var el = District.el, icon = District.icon;

  var wrap = el('div', { class: 'entity-shell' }, []);

  wrap.appendChild(el('a', { href: '#/home', style: 'display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:var(--stone); font-size:13px; margin-bottom:16px;' }, [
    icon('chevronLeft', 'icon-sm'), 'Back to Home',
  ]));

  wrap.appendChild(el('div', { class: 'district-notice-card', style: 'margin-top:10px;' }, [
    el('div', { class: 'district-notice-head' }, [
      el('div', { class: 'notice-seal' }, [el('span', { class: 'seal-dot' }, []), an.issuerType + ' · ' + an.issuer]),
      el('div', { class: 'notice-time' }, [an.createdDate]),
    ]),
    el('h2', { style: 'font-family:var(--font-serif); font-size:24px; margin:12px 0 8px;' }, [an.title]),
    el('p', { style: 'font-size:15px; line-height:1.6; color:var(--ink-soft);' }, [an.body]),
    el('div', { class: 'notice-meta', style: 'margin-top:16px; border-top:1px solid var(--ember-line); padding-top:12px;' }, [
      el('span', {}, ['Jurisdiction: ' + an.jurisdiction]),
      el('span', {}, ['Audience: ' + an.audience]),
      el('span', {}, ['Effective: ' + an.time]),
    ]),
  ]));

  return wrap;
}

// ---------------------------------------------------------------------------
// APPLICATION MODAL
// ---------------------------------------------------------------------------
function openApplyModal(op) {
  var el = District.el, icon = District.icon;
  var host = document.getElementById('sheet-host');
  if (!host) return;
  host.innerHTML = '';

  var inputNote = el('textarea', {
    placeholder: 'Briefly introduce yourself, relevant experience, or link to past work…',
    style: 'width:100%; min-height:90px; padding:12px; border:1px solid var(--fog); border-radius:var(--r-md); font-family:var(--font-sans); font-size:13.5px; margin:14px 0;',
  }, []);

  var sheet = el('div', { class: 'sheet' }, [
    el('div', { class: 'sheet-handle' }, []),
    el('div', { class: 'step-label' }, ['Apply for Opportunity']),
    el('h3', {}, [op.title]),
    el('div', { style: 'color:var(--stone); font-size:13px; margin-bottom:10px;' }, [op.postedByName + ' · ' + op.compensation]),
    inputNote,
    el('div', { class: 'row', style: 'gap:10px;' }, [
      el('button', { class: 'btn btn-ghost grow', onclick: function () { host.innerHTML = ''; } }, ['Cancel']),
      el('button', {
        class: 'btn btn-primary grow',
        onclick: function () {
          District.applyOpportunity(op.id, inputNote.value);
          host.innerHTML = '';
        },
      }, ['Submit Application']),
    ]),
  ]);

  var backdrop = el('div', { class: 'sheet-backdrop', onclick: function (e) { if (e.target === backdrop) host.innerHTML = ''; } }, [sheet]);
  host.appendChild(backdrop);
}

function metric(k, v) {
  var el = District.el;
  return el('div', { class: 'pmet' }, [el('div', { class: 'k' }, [k]), el('div', { class: 'v' }, [v])]);
}
function trustItem(label, on) {
  var el = District.el, icon = District.icon;
  return el('div', { class: 'ti' + (on ? ' on' : '') }, [icon(on ? 'check' : 'close', 'icon-sm'), label]);
}
function row2(k, v) {
  var el = District.el;
  return el('div', { class: 'row2' }, [el('span', { style: 'color:var(--stone);' }, [k]), el('span', { style: 'font-weight:500;' }, [v])]);
}
