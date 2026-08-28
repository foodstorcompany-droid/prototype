// PROVIDER DASHBOARD — desktop-first. Consolidates the provider-side screens
// (listings/services/products, orders/bookings, customers, earnings,
// reputation/verification, settings) into one tabbed operating console,
// as described in the brief's "small business operating system" section.
window.District = window.District || {};
District.screens = District.screens || {};
District.dashboardState = { tab: 'overview' };

var DASH_TABS = [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'listings', label: 'Listings', icon: 'bag' },
  { id: 'orders', label: 'Orders', icon: 'clock' },
  { id: 'customers', label: 'Customers', icon: 'user' },
  { id: 'earnings', label: 'Earnings', icon: 'wallet' },
  { id: 'reputation', label: 'Reputation', icon: 'shield' },
];

District.screens['provider-dashboard'] = function () {
  var el = District.el, icon = District.icon;
  var dd = District.data.dashboard;
  var p = District.getProvider(dd.providerId);
  var ds = District.dashboardState;

  var sidebar = el('div', { class: 'dash-sidebar' }, [
    el('div', { class: 'dash-who' }, [
      el('div', { class: 'provider-avatar', style: 'width:44px;height:44px;font-size:14px;' }, [p.avatarLabel]),
      el('div', {}, [el('div', { style: 'font-weight:500; font-size:14px;' }, [p.business]), el('div', { style: 'font-size:11px; color:var(--stone);' }, [p.name])]),
    ]),
    el('div', { class: 'dash-tabs' }, DASH_TABS.map(function (t) {
      return el('button', { class: 'dash-tab' + (ds.tab === t.id ? ' active' : ''), onclick: function () { ds.tab = t.id; District.render(); } }, [icon(t.icon, 'icon-sm'), t.label]);
    })),
    el('a', { class: 'btn btn-ghost btn-sm', href: '#/profile', style: 'margin-top:16px;' }, ['← Back to consumer view']),
  ]);

  var content = el('div', { class: 'dash-content' }, [renderTab(ds.tab, dd, p)]);

  return el('div', { class: 'dash-shell' }, [sidebar, content]);
};

function renderTab(tab, dd, p) {
  if (tab === 'listings') return listingsTab(dd);
  if (tab === 'orders') return ordersTab(dd);
  if (tab === 'customers') return customersTab(dd);
  if (tab === 'earnings') return earningsTab(dd);
  if (tab === 'reputation') return reputationTab(dd, p);
  return overviewTab(dd, p);
}

function overviewTab(dd, p) {
  var el = District.el;
  var s = dd.stats;
  return el('div', {}, [
    el('h2', { class: 'dash-h2' }, ['This month at ' + p.business]),
    el('div', { class: 'dash-stat-grid' }, [
      statCard('Earnings', s.earningsMonth, s.earningsChange), statCard('Open orders', String(s.ordersOpen)),
      statCard('Response rate', s.responseRate), statCard('Completion rate', s.completionRate),
    ]),
    el('h3', { class: 'dash-h3' }, ['Recent orders']),
    ordersTable(dd.orders.slice(0, 3)),
    el('h3', { class: 'dash-h3' }, ['Active listings']),
    listingsTable(dd.listings.filter(function (l) { return l.status === 'Active'; }).slice(0, 3)),
  ]);
}
function listingsTab(dd) {
  var el = District.el;
  return el('div', {}, [
    el('div', { class: 'dash-h2-row' }, [
      el('h2', { class: 'dash-h2' }, ['Listings']),
      el('button', {
        class: 'btn btn-ember btn-sm',
        onclick: function () {
          var name = prompt('Enter new listing / service name:', 'Bespoke Fitting Service');
          if (!name) return;
          var price = prompt('Enter price (e.g. ₦6,500):', '₦6,500') || '₦6,500';
          var newListing = {
            id: 'list-' + Date.now().toString(36),
            name: name,
            type: 'Service',
            status: 'Active',
            price: price,
          };
          dd.listings.unshift(newListing);
          var p = District.getProvider(dd.providerId);
          if (p) {
            p.services.unshift({
              id: newListing.id,
              name: name,
              price: price,
              duration: '45 min',
              desc: 'New listing created from provider console.',
              orderType: 'booking',
            });
          }
          District.toast('Listing “' + name + '” is now live!');
          District.render();
        },
      }, ['+ New listing']),
    ]),
    listingsTable(dd.listings),
  ]);
}
function ordersTab(dd) {
  var el = District.el;
  return el('div', {}, [el('h2', { class: 'dash-h2' }, ['Orders & bookings']), ordersTable(dd.orders)]);
}
function customersTab(dd) {
  var el = District.el;
  return el('div', {}, [
    el('h2', { class: 'dash-h2' }, ['Customers']),
    el('table', { class: 'dash-table' }, [el('tbody', {}, dd.customers.map(function (c) {
      return el('tr', {}, [el('td', {}, [c.name]), el('td', {}, [c.orders + ' orders']), el('td', { class: 'muted' }, ['Last: ' + c.lastOrder])]);
    }))]),
  ]);
}
function earningsTab(dd) {
  var el = District.el;
  var max = Math.max.apply(null, dd.earningsByWeek);
  var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return el('div', {}, [
    el('h2', { class: 'dash-h2' }, ['Earnings']),
    el('div', { class: 'dash-stat-grid' }, [statCard('This month', dd.stats.earningsMonth, dd.stats.earningsChange), statCard('Avg. per order', '₦11,650')]),
    el('div', { class: 'bar-chart' }, dd.earningsByWeek.map(function (v, i) {
      return el('div', { class: 'bar-col' }, [
        el('div', { class: 'bar', style: 'height:' + Math.round((v / max) * 100) + '%' }, []),
        el('div', { class: 'bar-label' }, [days[i]]),
      ]);
    })),
  ]);
}
function reputationTab(dd, p) {
  var el = District.el, icon = District.icon;
  return el('div', {}, [
    el('h2', { class: 'dash-h2' }, ['Reputation & verification']),
    el('div', { class: 'dash-stat-grid' }, [statCard('Rating', p.rating.toFixed(1)), statCard('Completed', String(p.completed)), statCard('Response', p.responseTime)]),
    el('h3', { class: 'dash-h3' }, ['Verification status']),
    el('div', { class: 'trust-grid', style: 'max-width:420px;' }, [
      trustItem('Identity', p.trust.identity), trustItem('Business', p.trust.business),
      trustItem('Location', p.trust.location), trustItem('Transactions', p.trust.transactions),
    ]),
    el('a', { href: '#/verification/provider/' + p.id, style: 'display:inline-block; font-size:12px; color:var(--ember-deep); text-decoration:none; margin-top:4px;' }, ['See verification details →']),
    el('h3', { class: 'dash-h3' }, ['Recent reviews']),
    el('div', {}, p.reviews.map(function (r) {
      return el('div', { class: 'review-item' }, [
        el('div', { class: 'rhead' }, [el('span', { class: 'rname' }, [r.author]), el('span', { class: 'rstars' }, ['★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)])]),
        el('div', { class: 'rtext' }, [r.text]),
      ]);
    })),
  ]);
}

function statCard(label, value, change) {
  var el = District.el;
  return el('div', { class: 'dash-stat-card' }, [
    el('div', { class: 'k' }, [label]),
    el('div', { class: 'v' }, [value]),
    change ? el('div', { class: 'chg' }, [change]) : null,
  ]);
}
function ordersTable(orders) {
  var el = District.el;
  return el('table', { class: 'dash-table' }, [el('tbody', {}, orders.map(function (o) {
    return el('tr', {}, [
      el('td', {}, [o.id]), el('td', {}, [o.service]), el('td', { class: 'muted' }, [o.customer || o.when]),
      el('td', {}, [el('span', { class: 'order-status ' + o.status.toLowerCase().replace(' ', '-') }, [o.status])]),
      el('td', { style: 'text-align:right; font-family:var(--font-serif);' }, [o.amount]),
    ]);
  }))]);
}
function listingsTable(listings) {
  var el = District.el;
  return el('table', { class: 'dash-table' }, [el('tbody', {}, listings.map(function (l) {
    return el('tr', {}, [
      el('td', {}, [l.name]), el('td', { class: 'muted' }, [l.type]),
      el('td', {}, [el('span', { class: 'order-status ' + l.status.toLowerCase() }, [l.status])]),
      el('td', { style: 'text-align:right; font-family:var(--font-serif);' }, [l.price]),
    ]);
  }))]);
}
function trustItem(label, on) {
  var el = District.el, icon = District.icon;
  return el('div', { class: 'ti' + (on ? ' on' : '') }, [icon(on ? 'check' : 'close', 'icon-sm'), label]);
}
