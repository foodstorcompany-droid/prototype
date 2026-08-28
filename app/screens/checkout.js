// CHECKOUT — Interactive Mock Commerce & Order Flow
window.District = window.District || {};
District.screens = District.screens || {};
District.checkoutState = {};

District.screens.checkout = function (params) {
  var el = District.el, icon = District.icon;
  var providerId = params && params[0];
  var serviceId = params && params[1];
  var p = District.getProvider(providerId);
  var s = p && p.services.filter(function (x) { return x.id === serviceId; })[0];

  if (!p || !s) {
    return el('div', { class: 'not-built' }, [el('h2', {}, ['Nothing to check out']), el('a', { class: 'btn btn-primary', href: '#/explore' }, ['Back to Explore'])]);
  }

  var key = providerId + ':' + serviceId;
  if (!District.checkoutState[key]) {
    District.checkoutState[key] = {
      fulfillment: 'pickup',
      paymentMethod: 'escrow',
      deliveryNote: '',
      qty: 1,
      placed: false,
      orderId: null,
    };
  }
  var cs = District.checkoutState[key];

  if (cs.placed && cs.orderId) {
    return el('div', { class: 'entity-shell', style: 'max-width:520px; margin:40px auto;' }, [
      el('div', { class: 'card', style: 'padding:28px 24px; text-align:center;' }, [
        el('div', { class: 'confirm-check', style: 'width:64px; height:64px; margin:0 auto 16px;' }, [icon('check')]),
        el('div', { class: 'entity-badge', style: 'margin-bottom:8px;' }, ['Order #' + cs.orderId + ' · Confirmed']),
        el('h1', { style: 'font-family:var(--font-serif); font-size:26px; margin:0 0 8px;' }, ['Payment & Order Received']),
        el('p', { style: 'color:var(--stone); font-size:14px; margin-bottom:20px; line-height:1.5;' }, [
          p.business + ' has received your order for ' + cs.qty + '× ' + s.name + '. A receipt and message confirmation have been added to your account.',
        ]),
        // Live order tracker
        el('div', { class: 'sheet-summary', style: 'text-align:left; margin-bottom:24px;' }, [
          row2('Status', '● Preparing order'),
          row2('Fulfillment', cs.fulfillment === 'pickup' ? 'Ready for pickup at ' + p.location : 'Dispatched to ' + (cs.deliveryNote || 'Mellanby Hall')),
          row2('Payment Method', cs.paymentMethod === 'escrow' ? 'District Escrow (Protected)' : 'Instant Transfer'),
          row2('Order ID', cs.orderId),
        ]),
        el('div', { style: 'display:flex; flex-direction:column; gap:10px;' }, [
          el('a', { class: 'btn btn-primary', href: '#/profile', style: 'width:100%; text-align:center;' }, ['View in My District Orders']),
          el('a', { class: 'btn btn-ghost', href: '#/messages/' + p.id, style: 'width:100%; text-align:center;' }, ['Message ' + p.business]),
        ]),
      ]),
    ]);
  }

  var wrap = el('div', { style: 'max-width:560px; margin:0 auto; padding-bottom:40px;' }, []);

  // Back link
  wrap.appendChild(el('a', { href: '#/business/' + p.id, style: 'display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:var(--stone); font-size:13px; margin-bottom:16px;' }, [
    icon('chevronLeft', 'icon-sm'), 'Back to ' + p.business,
  ]));

  wrap.appendChild(el('div', { class: 'home-hero', style: 'padding-bottom:6px;' }, [
    el('div', { class: 'eyebrow' }, [el('span', { class: 'bar' }, []), 'Checkout']),
    el('h1', { style: 'font-size:clamp(24px,4vw,30px);' }, [s.name]),
    el('div', { class: 'sub' }, [p.business + ' · ' + p.location]),
  ]));

  wrap.appendChild(el('div', { class: 'checkout-card', style: 'margin-top:14px;' }, [
    el('div', { style: 'display:flex; justify-content:space-between; align-items:center;' }, [
      el('div', {}, [
        el('span', { style: 'font-weight:500; font-size:15px;' }, ['Quantity']),
        el('div', { style: 'font-size:12px; color:var(--stone); margin-top:2px;' }, [s.price + ' each']),
      ]),
      el('div', { class: 'qty-stepper' }, [
        el('button', { onclick: function () { cs.qty = Math.max(1, cs.qty - 1); District.render(); } }, ['−']),
        el('span', {}, [String(cs.qty)]),
        el('button', { onclick: function () { cs.qty += 1; District.render(); } }, ['+']),
      ]),
    ]),
  ]));

  wrap.appendChild(el('h3', { class: 'dash-h3', style: 'margin-top:24px;' }, ['Fulfillment']));
  wrap.appendChild(el('div', { class: 'fulfillment-options' }, [
    fulfillOption('pickup', 'Pickup', p.location, cs, icon),
    fulfillOption('delivery', 'Campus Delivery (+₦500)', 'Within ' + District.getDistrict(p.districtId).name, cs, icon),
  ]));

  if (cs.fulfillment === 'delivery') {
    wrap.appendChild(el('div', { style: 'margin-top:10px;' }, [
      el('input', {
        placeholder: 'Enter Room / Block / Building delivery location…',
        value: cs.deliveryNote,
        oninput: function (e) { cs.deliveryNote = e.target.value; },
      }, []),
    ]));
  }

  wrap.appendChild(el('h3', { class: 'dash-h3', style: 'margin-top:24px;' }, ['Payment Method']));
  var payMethods = [
    { id: 'escrow', title: 'District Escrow', sub: 'Funds held securely until delivery is confirmed', icon: 'shield' },
    { id: 'transfer', title: 'Bank Transfer / Campus Cash', sub: 'Direct merchant verification', icon: 'grid' },
    { id: 'card', title: 'Debit Card (Mock)', sub: 'Instant settlement', icon: 'check' },
  ];
  wrap.appendChild(el('div', { style: 'display:flex; flex-direction:column; gap:8px;' }, payMethods.map(function (pm) {
    var on = cs.paymentMethod === pm.id;
    return el('button', {
      class: 'fulfill-opt' + (on ? ' selected' : ''),
      onclick: function () { cs.paymentMethod = pm.id; District.render(); },
    }, [
      el('div', {}, [
        el('div', { style: 'font-weight:500; font-size:14px;' }, [pm.title]),
        el('div', { style: 'font-size:12px; color:var(--stone);' }, [pm.sub]),
      ]),
      on ? icon('check', 'icon-sm') : null,
    ]);
  })));

  var unitPrice = parseInt((s.price.match(/[\d,]+/) || ['0'])[0].replace(/,/g, ''), 10) || 0;
  var subtotal = unitPrice * cs.qty;
  var deliveryFee = cs.fulfillment === 'delivery' ? 500 : 0;
  var total = subtotal + deliveryFee;

  wrap.appendChild(el('h3', { class: 'dash-h3', style: 'margin-top:24px;' }, ['Order summary']));
  wrap.appendChild(el('div', { class: 'sheet-summary' }, [
    row2(s.name + ' × ' + cs.qty, '₦' + subtotal.toLocaleString()),
    row2('Fulfillment', cs.fulfillment === 'pickup' ? 'Pickup — free' : 'Campus Delivery — ₦500'),
    row2('Total', '₦' + total.toLocaleString()),
  ]));

  wrap.appendChild(el('button', {
    class: 'btn btn-primary', style: 'width:100%; margin-top:20px;', disabled: cs.placing ? 'disabled' : undefined,
    onclick: function () {
      if (cs.placing) return;
      cs.placing = true; District.render();
      setTimeout(function () {
        cs.placing = false;
        cs.placed = true;
        var orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
        cs.orderId = orderId;

        // Record order into District data
        District.data.orders.unshift({
          id: orderId,
          providerId: p.id,
          service: s.name + (cs.qty > 1 ? ' (×' + cs.qty + ')' : ''),
          status: 'Confirmed',
          when: 'Today, Just now',
          amount: '₦' + total.toLocaleString(),
        });
        District.data.user.ordersCount += 1;

        // Push chat notification from provider
        var threadObj = District.data.messages.filter(function (m) { return m.providerId === p.id; })[0];
        if (threadObj) {
          threadObj.preview = 'Order #' + orderId + ' received! Preparing your ' + s.name + '.';
          threadObj.when = 'Just now';
          threadObj.unread = true;
          threadObj.thread.push({ from: 'them', text: 'Order #' + orderId + ' received! Preparing your ' + s.name + '.', when: 'Just now' });
        }

        // Add to live activity stream
        District.data.activity.unshift({
          districtId: p.districtId,
          who: District.data.user.name,
          what: 'placed an order for ' + s.name + ' with ' + p.business,
          when: 'Just now',
        });

        District.toast('Order #' + orderId + ' placed successfully!');
        District.render();
      }, 750);
    },
  }, [cs.placing ? el('span', { class: 'spinner' }, []) : 'Pay & Confirm Order (₦' + total.toLocaleString() + ')']));

  return wrap;
};

function fulfillOption(id, label, sub, cs, icon) {
  var el = District.el;
  var on = cs.fulfillment === id;
  return el('button', { class: 'fulfill-opt' + (on ? ' selected' : ''), onclick: function () { cs.fulfillment = id; District.render(); } }, [
    el('div', {}, [el('div', { style: 'font-weight:500; font-size:14px;' }, [label]), el('div', { style: 'font-size:12px; color:var(--stone);' }, [sub])]),
    on ? icon('check', 'icon-sm') : null,
  ]);
}

function row2(k, v) {
  var el = District.el;
  return el('div', { class: 'row2' }, [el('span', { style: 'color:var(--stone);' }, [k]), el('span', { style: 'font-weight:500;' }, [v])]);
}
