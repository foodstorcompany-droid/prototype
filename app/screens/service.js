// SERVICE / PRODUCT DETAIL — one listing, full context, single clear action.
window.District = window.District || {};
District.screens = District.screens || {};

District.screens.service = function (params) {
  var el = District.el, icon = District.icon;
  var providerId = params && params[0];
  var serviceId = params && params[1];
  var p = District.getProvider(providerId);
  var s = p && p.services.filter(function (x) { return x.id === serviceId; })[0];

  if (!p || !s) {
    return el('div', { class: 'not-built' }, [el('h2', {}, ['Listing not found']), el('a', { class: 'btn btn-primary', href: '#/explore' }, ['Back to Explore'])]);
  }

  var isPurchase = s.orderType === 'purchase';

  var wrap = el('div', {}, []);

  wrap.appendChild(el('div', { class: 'provider-hero d-figure' }, [
    (s.image || p.image)
      ? el('img', { src: s.image || p.image, alt: s.name, style: 'width:100%;height:100%;object-fit:cover;' })
      : el('div', { class: 'd-placeholder', style: 'width:100%;height:100%;', 'data-label': (isPurchase ? 'PRODUCT' : 'SERVICE'), 'data-coord': s.duration }, []),
  ]));

  wrap.appendChild(el('div', { class: 'provider-grid', style: 'margin-top:24px;' }, [
    el('div', {}, [
      el('div', { class: 'pc-cat' }, [p.category + (isPurchase ? ' · Product' : ' · Service')]),
      el('h1', { style: 'font-family:var(--font-serif); font-size:28px; margin:6px 0 4px; letter-spacing:-.02em;' }, [s.name]),
      el('a', { href: '#/provider/' + p.id, style: 'font-size:13px; color:var(--stone); text-decoration:none;' }, ['by ' + p.business + ' →']),
      el('p', { class: 'provider-bio', style: 'font-size:16px; margin-top:20px;' }, [s.desc]),
      el('div', { class: 'provider-metrics' }, [
        metric(isPurchase ? 'Ready in' : 'Duration', s.duration),
        metric('Price', s.price),
        metric('Provider rating', '★ ' + p.rating),
      ]),
      el('h3', { class: 'section-h3' }, ['About ' + p.business]),
      el('p', { style: 'color:var(--stone); font-size:13.5px; line-height:1.6;' }, [p.bio]),
      el('div', { class: 'row', style: 'gap:8px; margin-top:8px;' }, [icon('pin', 'icon-sm'), el('span', { style: 'font-size:13px; color:var(--stone);' }, [p.location])]),
    ]),
    el('div', { class: 'provider-side-card' }, [
      el('div', { class: 'price', style: 'font-size:26px; margin-bottom:4px;' }, [s.price]),
      el('div', { style: 'font-size:12.5px; color:var(--stone); margin-bottom:16px;' }, [s.duration]),
      isPurchase
        ? el('a', { class: 'btn btn-primary', style: 'width:100%; margin-bottom:8px; display:block; text-align:center;', href: '#/checkout/' + p.id + '/' + s.id }, ['Order now'])
        : el('button', { class: 'btn btn-primary', style: 'width:100%; margin-bottom:8px;', onclick: function () { openBookingSheet(p, s); } }, ['Book this']),
      el('button', { class: 'btn btn-ghost', style: 'width:100%;', onclick: function () { District.toast('Message sent to ' + p.name + ' (simulated).'); } }, [icon('chat', 'icon-sm'), 'Ask a question']),
    ]),
  ]));

  return wrap;
};

function metric(k, v) {
  var el = District.el;
  return el('div', { class: 'pmet' }, [el('div', { class: 'k' }, [k]), el('div', { class: 'v' }, [v])]);
}
