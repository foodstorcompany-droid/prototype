// ONBOARDING — first-run flow. Not gated (you can always revisit via a link),
// since this is a prototype, not an auth-gated production app.
window.District = window.District || {};
District.screens = District.screens || {};
District.onboardState = { step: 0 };

var OB_STEPS = ['welcome', 'district', 'interests', 'done'];
var OB_INTERESTS_ALL = ['Tailoring', 'Food', 'Hair & Beauty', 'Repairs', 'Study Spaces', 'Design', 'Fitness', 'Fashion'];
District.onboardInterests = {};

District.screens.onboarding = function () {
  var el = District.el, icon = District.icon;
  var os = District.onboardState;
  var stepName = OB_STEPS[os.step];

  var dots = el('div', { class: 'ob-dots' }, OB_STEPS.map(function (s, i) {
    return el('span', { class: 'ob-dot' + (i === os.step ? ' active' : i < os.step ? ' done' : '') }, []);
  }));

  var body;
  if (stepName === 'welcome') {
    body = el('div', { class: 'ob-panel' }, [
      el('div', { class: 'ob-mark' }, ['TD']),
      el('h1', { class: 'ob-title' }, ['Your world.', el('br', {}, []), el('em', {}, ['Discoverable.'])]),
      el('p', { class: 'ob-sub' }, ['The District is how you find, trust, and support the people and places around you — like a magazine, a world, and a marketplace in one.']),
    ]);
  } else if (stepName === 'district') {
    body = el('div', { class: 'ob-panel' }, [
      el('div', { class: 'eyebrow' }, [el('span', { class: 'bar' }, []), 'Step 2']),
      el('h1', { class: 'ob-title', style: 'font-size:28px;' }, ['Which District are you in?']),
      el('p', { class: 'ob-sub' }, ['You can always switch later from the top of the app.']),
      el('div', { class: 'ob-district-list' }, Object.values(District.data.districts).map(function (d) {
        var chosen = District.state.districtId === d.id;
        return el('button', { class: 'ob-district-row' + (chosen ? ' selected' : ''), onclick: function () { District.state.districtId = d.id; District.render(); } }, [
          el('div', {}, [el('div', { style: 'font-family:var(--font-serif); font-size:17px;' }, [d.name]), el('div', { style: 'font-size:12px; color:var(--stone);' }, [d.ring.slice(1).join(' · ')])]),
          chosen ? icon('check', 'icon-sm') : null,
        ]);
      })),
    ]);
  } else if (stepName === 'interests') {
    var d2 = District.getDistrict();
    body = el('div', { class: 'ob-panel' }, [
      el('div', { class: 'eyebrow' }, [el('span', { class: 'bar' }, []), 'Step 3']),
      el('h1', { class: 'ob-title', style: 'font-size:28px;' }, ['What are you into?']),
      el('p', { class: 'ob-sub' }, ['This shapes what surfaces first on your Home feed.']),
      el('div', { class: 'ob-interest-grid' }, OB_INTERESTS_ALL.map(function (c) {
        var on = !!District.onboardInterests[c];
        return el('button', { class: 'chip category-pill' + (on ? ' on' : ''), onclick: function () { District.onboardInterests[c] = !on; District.render(); } }, [c]);
      })),
    ]);
  } else {
    body = el('div', { class: 'ob-panel', style: 'text-align:center;' }, [
      el('div', { class: 'confirm-check', style: 'width:64px; height:64px;' }, [icon('check')]),
      el('h1', { class: 'ob-title', style: 'font-size:26px;' }, ['You\'re in.']),
      el('p', { class: 'ob-sub' }, ['Welcome to ' + District.getDistrict().name + '. Let\'s see what\'s happening.']),
    ]);
  }

  var nav = el('div', { class: 'ob-nav' }, [
    os.step > 0 ? el('button', { class: 'btn btn-ghost', onclick: function () { os.step -= 1; District.render(); } }, ['Back']) : el('span', {}, []),
    stepName === 'done'
      ? el('a', { class: 'btn btn-primary', href: '#/home' }, ['Enter The District'])
      : el('button', { class: 'btn btn-primary', onclick: function () { os.step = Math.min(os.step + 1, OB_STEPS.length - 1); District.render(); } }, [stepName === 'welcome' ? 'Get started' : 'Continue']),
  ]);

  return el('div', { class: 'ob-shell' }, [dots, body, nav]);
};
