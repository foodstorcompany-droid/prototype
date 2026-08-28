// ACTIVITY — full feed, "what's happening" expanded beyond the Home teaser.
window.District = window.District || {};
District.screens = District.screens || {};

var EXTRA_ACTIVITY = [
  { who: 'Kemi', what: 'opened 4 more study room slots tonight', when: '1h ago' },
  { who: 'Grace A.', what: 'left a 5★ review for Ìjà Tailoring Co.', when: '2h ago' },
  { who: 'Tunde', what: 'is fixing laptops on Zik Avenue today', when: '3h ago' },
  { who: 'Mrs. Adekunle', what: 'restocked provisions at the corner shop', when: '5h ago' },
  { who: 'Yemi', what: 'posted 3 new logo design samples', when: '6h ago' },
  { who: 'Bola', what: 'is fully booked until 6pm', when: '7h ago' },
];

District.screens.activity = function () {
  var el = District.el;
  var d = District.getDistrict();
  var all = District.data.activity.concat(EXTRA_ACTIVITY);

  var wrap = el('div', {}, [
    el('div', { class: 'home-hero', style: 'padding-bottom:8px;' }, [
      el('div', { class: 'eyebrow' }, [el('span', { class: 'bar' }, []), 'Live in ' + d.name]),
      el('h1', { style: 'font-size:clamp(26px,4vw,36px);' }, ['Activity']),
      el('div', { class: 'sub' }, ['Everything happening across ' + d.name + ' right now, in order.']),
    ]),
    el('div', { class: 'happening-list', style: 'margin-top:20px;' }, all.map(function (a) {
      return el('div', { class: 'happening-row' }, [
        el('span', { class: 'live-dot' }, []),
        el('span', {}, [el('span', { class: 'who' }, [a.who]), el('span', { class: 'what' }, [a.what])]),
        el('span', { class: 'when' }, [a.when]),
      ]);
    })),
  ]);
  return wrap;
};
