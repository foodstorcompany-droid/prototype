// PROVIDER PROFILE — identity, trust, services, reviews, booking.
window.District = window.District || {};
District.screens = District.screens || {};

District.screens.provider = function (params) {
  var el = District.el, icon = District.icon;
  var id = params && params[0];
  var p = District.getProvider(id);
  if (!p) {
    return el('div', { class: 'not-built' }, [el('h2', {}, ['Provider not found']), el('a', { class: 'btn btn-primary', href: '#/explore' }, ['Back to Explore'])]);
  }
  var d = District.getDistrict(p.districtId);

  var wrap = el('div', {}, []);

  wrap.appendChild(el('div', { class: 'provider-hero d-figure' }, [
    p.image
      ? el('img', { src: p.image, alt: p.name, style: 'width:100%;height:100%;object-fit:cover;' })
      : el('div', { class: 'd-placeholder', style: 'width:100%;height:100%;', 'data-label': p.category.toUpperCase(), 'data-coord': 'Fig. P' }, []),
  ]));

  wrap.appendChild(el('div', { class: 'provider-id-row' }, [
    el('div', { class: 'provider-avatar' }, [p.avatarLabel]),
    el('div', { class: 'provider-id-name' }, [
      el('h1', {}, [p.business]),
      el('div', { class: 'cat' }, [p.category + ' · ' + p.name]),
    ]),
  ]));

  var left = el('div', {}, []);
  left.appendChild(el('div', { class: 'd-ring' }, ringNodes(d)));
  left.appendChild(el('p', { class: 'provider-bio' }, [p.bio]));

  left.appendChild(el('div', { class: 'provider-metrics' }, [
    metric('Rating', p.rating.toFixed(1)),
    metric('Response', p.responseTime),
    metric('Completed', String(p.completed)),
  ]));

  left.appendChild(el('h3', { class: 'section-h3' }, ['Services']));
  left.appendChild(el('div', {}, p.services.map(function (s) {
    return el('div', { class: 'service-row' }, [
      el('a', { href: '#/service/' + p.id + '/' + s.id, style: 'text-decoration:none; color:inherit; display:block;' }, [
        el('div', { class: 'name' }, [s.name]),
        el('div', { class: 'desc' }, [s.desc]),
        el('div', { class: 'meta' }, [s.duration]),
      ]),
      el('div', { style: 'display:flex; flex-direction:column; align-items:flex-end; gap:8px;' }, [
        el('div', { class: 'price' }, [s.price]),
        s.orderType === 'purchase'
          ? el('a', { class: 'btn btn-ember btn-sm', href: '#/checkout/' + p.id + '/' + s.id }, ['Order'])
          : el('button', { class: 'btn btn-ember btn-sm', onclick: function () { openBookingSheet(p, s); } }, ['Book']),
      ]),
    ]);
  })));

  left.appendChild(el('h3', { class: 'section-h3' }, ['Reviews']));
  left.appendChild(el('div', {}, p.reviews.map(function (r) {
    return el('div', { class: 'review-item' }, [
      el('div', { class: 'rhead' }, [el('span', { class: 'rname' }, [r.author]), el('span', { class: 'rstars' }, ['★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)])]),
      el('div', { class: 'rtext' }, [r.text]),
    ]);
  })));

  // ---- right: trust / location / contact --------------------------------
  var side = el('div', { class: 'provider-side-card' }, [
    el('div', { class: 'row' }, [icon('pin', 'icon-sm'), el('span', { style: 'font-size:13px; color:var(--stone);' }, [p.location])]),
    el('div', { class: 'trust-grid' }, [
      trustItem('Identity', p.trust.identity), trustItem('Business', p.trust.business),
      trustItem('Location', p.trust.location), trustItem('Transactions', p.trust.transactions),
    ]),
    el('a', { href: '#/verification/provider/' + p.id, style: 'display:block; font-size:12px; color:var(--ember-deep); text-decoration:none; margin:-8px 0 14px;' }, ['See verification details →']),
    el('button', { class: 'btn btn-primary grow', style: 'width:100%; margin-bottom:8px;', onclick: function () { openBookingSheet(p, p.services[0]); } }, ['Book a service']),
    el('button', { class: 'btn btn-ghost grow', style: 'width:100%;', onclick: function () { District.toast('Message sent to ' + p.name + ' (simulated).'); } }, [icon('chat', 'icon-sm'), 'Message']),
  ]);

  var grid = el('div', { class: 'provider-grid' }, [left, side]);
  wrap.appendChild(grid);

  return wrap;
};

function ringNodes(d) {
  var el = District.el;
  var nodes = [];
  d.ring.forEach(function (r, i) {
    if (i === 0) nodes.push(el('b', {}, [r]));
    else { nodes.push(el('span', { class: 'sep' }, ['›'])); nodes.push(document.createTextNode(r)); }
  });
  return nodes;
}
function metric(k, v) {
  var el = District.el;
  return el('div', { class: 'pmet' }, [el('div', { class: 'k' }, [k]), el('div', { class: 'v' }, [v])]);
}
function trustItem(label, on) {
  var el = District.el, icon = District.icon;
  return el('div', { class: 'ti' + (on ? ' on' : '') }, [icon(on ? 'check' : 'close', 'icon-sm'), label]);
}

// ============================================================ BOOKING SHEET
var bookingCtx = { provider: null, service: null, date: null, time: null, step: 1 };
var TIMES = ['10:00', '11:30', '1:00', '2:30', '4:00', '5:30'];

function openBookingSheet(provider, service) {
  bookingCtx = { provider: provider, service: service, date: 0, time: null, step: 1 };
  renderBookingSheet();
}
function closeBookingSheet() {
  var host = document.getElementById('sheet-host');
  if (host) host.innerHTML = '';
}

function renderBookingSheet() {
  var el = District.el, icon = District.icon;
  var host = document.getElementById('sheet-host');
  host.innerHTML = '';
  var ctx = bookingCtx;
  var body;

  if (ctx.step === 1) {
    var dates = [0, 1, 2, 3, 4, 5].map(function (offset) {
      var dt = new Date(); dt.setDate(dt.getDate() + offset);
      return { offset: offset, dow: dt.toLocaleDateString(undefined, { weekday: 'short' }), day: dt.getDate() };
    });
    body = el('div', {}, [
      el('div', { class: 'step-label' }, ['Step 1 of 3 · Choose a time']),
      el('h3', {}, [ctx.service.name]),
      el('div', { style: 'color:var(--stone); font-size:13px; margin-bottom:6px;' }, [ctx.provider.business + ' · ' + ctx.service.price]),
      el('div', { class: 'date-strip' }, dates.map(function (dt) {
        return el('div', { class: 'date-chip' + (ctx.date === dt.offset ? ' selected' : ''), onclick: function () { ctx.date = dt.offset; renderBookingSheet(); } }, [
          el('div', { class: 'd' }, [dt.dow]), el('div', { class: 'n' }, [String(dt.day)]),
        ]);
      })),
      el('div', { class: 'time-grid' }, TIMES.map(function (t) {
        return el('div', { class: 'time-slot' + (ctx.time === t ? ' selected' : ''), onclick: function () { ctx.time = t; renderBookingSheet(); } }, [t]);
      })),
      el('button', { class: 'btn btn-primary', style: 'width:100%; margin-top:8px;', disabled: ctx.time ? undefined : 'disabled', onclick: function () { if (ctx.time) { ctx.step = 2; renderBookingSheet(); } } }, ['Continue']),
    ]);
  } else if (ctx.step === 2) {
    var dt2 = new Date(); dt2.setDate(dt2.getDate() + ctx.date);
    body = el('div', {}, [
      el('div', { class: 'step-label' }, ['Step 2 of 3 · Confirm']),
      el('h3', {}, ['Confirm booking']),
      el('div', { class: 'sheet-summary' }, [
        row2('Service', ctx.service.name), row2('Provider', ctx.provider.business),
        row2('When', dt2.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) + ' · ' + ctx.time),
        row2('Price', ctx.service.price),
      ]),
      el('div', { style: 'font-size:12px; color:var(--stone); margin-bottom:16px;' }, ['This is a prototype — no real payment or calendar entry is created.']),
      el('div', { class: 'row', style: 'gap:10px;' }, [
        el('button', { class: 'btn btn-ghost grow', style: 'flex:1;', onclick: function () { ctx.step = 1; renderBookingSheet(); } }, ['Back']),
        el('button', {
          class: 'btn btn-ember grow', style: 'flex:1;', disabled: ctx.confirming ? 'disabled' : undefined,
          onclick: function () {
            if (ctx.confirming) return;
            ctx.confirming = true; renderBookingSheet();
            setTimeout(function () { ctx.confirming = false; ctx.step = 3; renderBookingSheet(); }, 650);
          },
        }, [ctx.confirming ? el('span', { class: 'spinner' }, []) : 'Confirm booking']),
      ]),
    ]);
  } else {
    var dtFinal = new Date(); dtFinal.setDate(dtFinal.getDate() + ctx.date);
    var whenStr = dtFinal.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) + ' · ' + ctx.time;
    var orderId = 'BK-' + Math.floor(1000 + Math.random() * 9000);

    // Save to orders collection
    District.data.orders.unshift({
      id: orderId,
      providerId: ctx.provider.id,
      service: ctx.service.name,
      status: 'Upcoming',
      when: whenStr,
      amount: ctx.service.price,
    });
    District.data.user.ordersCount += 1;

    // Send confirmation to messages
    var threadObj = District.data.messages.filter(function (m) { return m.providerId === ctx.provider.id; })[0];
    if (threadObj) {
      threadObj.preview = 'Booking confirmed for ' + ctx.service.name + ' on ' + whenStr + '!';
      threadObj.when = 'Just now';
      threadObj.unread = true;
      threadObj.thread.push({ from: 'them', text: 'Booking confirmed for ' + ctx.service.name + ' on ' + whenStr + '! Looking forward to seeing you.', when: 'Just now' });
    }

    // Add activity
    District.data.activity.unshift({
      districtId: ctx.provider.districtId,
      who: District.data.user.name,
      what: 'booked an appointment for ' + ctx.service.name + ' with ' + ctx.provider.business,
      when: 'Just now',
    });

    body = el('div', { style: 'text-align:center;' }, [
      el('div', { class: 'confirm-check' }, [icon('check')]),
      el('div', { class: 'entity-badge', style: 'margin-bottom:8px;' }, ['Booking #' + orderId + ' · Confirmed']),
      el('h3', {}, ['Appointment Confirmed!']),
      el('div', { style: 'color:var(--stone); font-size:13.5px; margin-bottom:20px; line-height:1.5;' }, [
        'You\'re scheduled with ' + ctx.provider.business + ' for ' + whenStr + '. We\'ve added this to your District schedule and sent a message confirmation.',
      ]),
      el('div', { style: 'display:flex; flex-direction:column; gap:8px;' }, [
        el('button', {
          class: 'btn btn-primary', style: 'width:100%;',
          onclick: function () { closeBookingSheet(); location.hash = '#/profile'; District.render(); },
        }, ['View in My District']),
        el('button', {
          class: 'btn btn-ghost', style: 'width:100%;',
          onclick: function () { closeBookingSheet(); location.hash = '#/messages/' + ctx.provider.id; District.render(); },
        }, ['Open Chat with ' + ctx.provider.business]),
      ]),
    ]);
  }

  var sheet = el('div', { class: 'sheet' }, [el('div', { class: 'sheet-handle' }, []), body]);
  var backdrop = el('div', { class: 'sheet-backdrop', onclick: function (e) { if (e.target === backdrop) closeBookingSheet(); } }, [sheet]);
  host.appendChild(backdrop);
}
function row2(k, v) {
  var el = District.el;
  return el('div', { class: 'row2' }, [el('span', { style: 'color:var(--stone);' }, [k]), el('span', { style: 'font-weight:500;' }, [v])]);
}
