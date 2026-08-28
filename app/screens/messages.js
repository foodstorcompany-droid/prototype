// MESSAGES — conversation list, and a thread view with a simulated send.
window.District = window.District || {};
District.screens = District.screens || {};

District.screens.messages = function (params) {
  var el = District.el, icon = District.icon;
  var activeId = params && params[0];
  var convos = District.data.messages;

  if (activeId) {
    var convo = convos.filter(function (c) { return c.providerId === activeId; })[0];
    if (convo) return renderThread(convo);
  }

  var wrap = el('div', {}, [
    el('div', { class: 'home-hero', style: 'padding-bottom:8px;' }, [
      el('h1', { style: 'font-size:clamp(26px,4vw,36px);' }, ['Messages']),
      el('div', { class: 'sub' }, ['Conversations with providers you\'ve booked or reached out to.']),
    ]),
    el('div', { class: 'happening-list', style: 'margin-top:20px;' }, convos.map(function (c) {
      var p = District.getProvider(c.providerId);
      return el('a', { class: 'msg-row', href: '#/messages/' + c.providerId }, [
        el('div', { class: 'provider-avatar', style: 'width:44px;height:44px;font-size:14px;' }, [p.avatarLabel]),
        el('div', { class: 'msg-row-body' }, [
          el('div', { class: 'msg-row-top' }, [el('span', { class: 'name' }, [p.business]), el('span', { class: 'when' }, [c.when])]),
          el('div', { class: 'preview' + (c.unread ? ' unread' : '') }, [c.preview]),
        ]),
        c.unread ? el('span', { class: 'unread-dot' }, []) : null,
      ]);
    })),
  ]);
  return wrap;
};

function renderThread(convo) {
  var el = District.el, icon = District.icon;
  var p = District.getProvider(convo.providerId);

  var bubbles = el('div', { class: 'thread-body', id: 'thread-body' }, convo.thread.map(function (m) {
    return el('div', { class: 'bubble-row ' + m.from }, [
      el('div', { class: 'bubble' }, [m.text]),
      el('div', { class: 'bwhen' }, [m.when]),
    ]);
  }));

  function sendMessage() {
    var val = input.value.trim();
    if (!val) return;
    convo.thread.push({ from: 'me', text: val, when: 'Just now' });
    convo.preview = 'You: ' + val;
    convo.when = 'Just now';
    bubbles.appendChild(el('div', { class: 'bubble-row me' }, [el('div', { class: 'bubble' }, [val]), el('div', { class: 'bwhen' }, ['Just now'])]));
    input.value = '';
    bubbles.scrollTop = bubbles.scrollHeight;

    // Contextual mock response
    var replies = [
      'Thanks for reaching out! I can definitely help with that.',
      'Got your note. Let me check the schedule and get right back to you.',
      'Sounds great! Feel free to book the slot or stop by ' + p.location + '.',
      'Confirmed! Looking forward to it.',
    ];
    var replyText = replies[Math.floor(Math.random() * replies.length)];
    if (val.toLowerCase().indexOf('price') > -1 || val.toLowerCase().indexOf('cost') > -1) {
      replyText = 'Our rates are listed on our profile with clear pricing. Let me know which service you need!';
    } else if (val.toLowerCase().indexOf('time') > -1 || val.toLowerCase().indexOf('when') > -1 || val.toLowerCase().indexOf('open') > -1) {
      replyText = 'We are ' + (p.openStatus || 'open for appointments') + ' at ' + p.location + '.';
    }

    setTimeout(function () {
      convo.thread.push({ from: 'them', text: replyText, when: 'Just now' });
      convo.preview = replyText;
      convo.when = 'Just now';
      bubbles.appendChild(el('div', { class: 'bubble-row them' }, [el('div', { class: 'bubble' }, [replyText]), el('div', { class: 'bwhen' }, ['Just now'])]));
      bubbles.scrollTop = bubbles.scrollHeight;
    }, 600);
  }

  var input = el('input', {
    placeholder: 'Message ' + p.name.split(' ')[0] + '…',
    onkeydown: function (e) { if (e.key === 'Enter') sendMessage(); },
  }, []);

  var sendRow = el('div', { class: 'thread-input-row' }, [
    input,
    el('button', { class: 'btn btn-primary btn-sm', onclick: sendMessage }, [icon('send', 'icon-sm')]),
  ]);

  return el('div', { class: 'thread-shell' }, [
    el('div', { class: 'thread-head' }, [
      el('a', { href: '#/messages', class: 'thread-back' }, [icon('chevronLeft', 'icon-sm')]),
      el('div', { class: 'provider-avatar', style: 'width:36px;height:36px;font-size:12px;' }, [p.avatarLabel]),
      el('div', {}, [el('div', { style: 'font-weight:500;' }, [p.business]), el('div', { style: 'font-size:11px;color:var(--stone);' }, [p.responseTime + ' response time'])]),
      el('a', { class: 'btn btn-ghost btn-sm', href: '#/provider/' + p.id, style: 'margin-left:auto;' }, ['View profile']),
    ]),
    bubbles,
    sendRow,
  ]);
}
