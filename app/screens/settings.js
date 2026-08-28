// SETTINGS — account-level preferences. Dark mode toggle actually works,
// since district.css ships a real [data-theme="dark"] variant.
window.District = window.District || {};
District.screens = District.screens || {};
District.settingsState = {
  notifications: true,
  locationSharing: true,
  darkMode: document.documentElement.getAttribute('data-theme') === 'dark',
  language: 'English',
};

District.screens.settings = function () {
  var el = District.el, icon = District.icon;
  var ss = District.settingsState;
  var u = District.data.user;

  var wrap = el('div', { style: 'max-width:560px; margin:0 auto;' }, [
    el('div', { class: 'home-hero', style: 'padding-bottom:6px;' }, [
      el('h1', { style: 'font-size:clamp(24px,4vw,32px);' }, ['Settings']),
      el('div', { class: 'sub' }, [u.name + ' · ' + u.handle]),
    ]),
  ]);

  wrap.appendChild(sectionLabel('Preferences'));
  wrap.appendChild(el('div', { class: 'settings-group' }, [
    toggleRow('Notifications', 'Booking updates, messages, activity nearby', ss.notifications, function (v) { ss.notifications = v; District.toast(v ? 'Notifications on' : 'Notifications off'); }),
    toggleRow('Location sharing', 'Lets The District show what\'s near you', ss.locationSharing, function (v) { ss.locationSharing = v; District.toast(v ? 'Location sharing on' : 'Location sharing off'); }),
    toggleRow('Dark mode', 'Switch the whole app to the dark Ink & Ember palette', ss.darkMode, function (v) {
      ss.darkMode = v;
      document.documentElement.setAttribute('data-theme', v ? 'dark' : 'light');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', v ? '#1F1B18' : '#FBFAF6');
    }),
  ]));

  wrap.appendChild(sectionLabel('Account'));
  wrap.appendChild(el('div', { class: 'settings-group' }, [
    linkRow('Verification status', 'See your identity, location & transaction checks', '#/verification/user', icon),
    linkRow('Language', ss.language, null, icon),
    linkRow('Payment methods', '1 saved card', null, icon),
  ]));

  wrap.appendChild(sectionLabel('Support'));
  wrap.appendChild(el('div', { class: 'settings-group' }, [
    actionRow('Help & FAQ', function () { District.toast('Help center not built in this pass.'); }),
    actionRow('Contact The District', function () { District.toast('Support contact not built in this pass.'); }),
    actionRow('Terms & Privacy', function () { District.toast('Legal pages not built in this pass.'); }),
  ]));

  wrap.appendChild(el('button', {
    class: 'btn btn-ghost', style: 'width:100%; margin-top:24px; color:var(--ember-deep);',
    onclick: function () { District.toast('Sign-out is not wired in this prototype.'); },
  }, ['Sign out']));

  return wrap;
};

function sectionLabel(text) {
  var el = District.el;
  return el('div', { style: 'font-family:var(--font-mono); font-size:10.5px; text-transform:uppercase; letter-spacing:.1em; color:var(--stone); margin:24px 0 8px;' }, [text]);
}

function toggleRow(title, sub, on, onChange) {
  var el = District.el;
  var sw = el('button', { class: 'settings-switch' + (on ? ' on' : ''), onclick: function () { onChange(!on); District.render(); } }, [el('span', { class: 'knob' }, [])]);
  return el('div', { class: 'settings-row' }, [
    el('div', {}, [el('div', { class: 'settings-row-title' }, [title]), el('div', { class: 'settings-row-sub' }, [sub])]),
    sw,
  ]);
}

function linkRow(title, sub, href, icon) {
  var el = District.el;
  var right = icon ? icon('chevronRight', 'icon-sm') : null;
  var children = [el('div', {}, [el('div', { class: 'settings-row-title' }, [title]), el('div', { class: 'settings-row-sub' }, [sub])]), right];
  return href ? el('a', { class: 'settings-row', href: href }, children) : el('div', { class: 'settings-row' }, children);
}

function actionRow(title, onclick) {
  var el = District.el;
  return el('button', { class: 'settings-row settings-row--btn', onclick: onclick }, [el('div', { class: 'settings-row-title' }, [title])]);
}
