/**
 * Going Eagle — ball flight diagnostic.
 *
 * Reference data comes from window.GE_BALL_FLIGHT (ball-flight-data.js, generated
 * from src/data/ballflight.json). No dependencies, no network, no storage.
 */
(function () {
  'use strict';

  var root = document.getElementById('ge-ball-flight');
  var data = window.GE_BALL_FLIGHT;
  if (!root || !data) return;

  var FLIGHTS = data.FLIGHTS;
  var STRIKE = data.STRIKE;
  var MIRROR = { left: 'right', right: 'left', straight: 'straight' };

  var state = { start: null, curve: null, strike: null, hand: 'rh', mode: 'curve' };

  var resultEl = root.querySelector('[data-result]');
  var hintEl = root.querySelector('[data-hint]');

  /**
   * Copy in the source data is written for a right-hander, so for left-handers the
   * directional words flip too. Safe only because body references use lead/trail
   * rather than left/right — see the COPY RULE in src/data/ballflight.ts.
   */
  function flip(text) {
    return text.replace(/\b(left|right|Left|Right)\b/g, function (m) {
      var lower = m.toLowerCase() === 'left' ? 'right' : 'left';
      return m[0] === m[0].toUpperCase() ? lower.charAt(0).toUpperCase() + lower.slice(1) : lower;
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function list(items, lh) {
    return '<ul>' + items.map(function (i) {
      return '<li>' + esc(lh ? flip(i) : i) + '</li>';
    }).join('') + '</ul>';
  }

  function cta(href) {
    return href ? '<a class="ge-btn ge-btn--primary" href="' + esc(href) + '">Read the full fix guide</a>' : '';
  }

  function render() {
    var lh = state.hand === 'lh';

    if (state.mode === 'strike') {
      var s = STRIKE.filter(function (x) { return x.id === state.strike; })[0];
      if (!s) { resultEl.hidden = true; return; }
      resultEl.innerHTML =
        '<p class="ge-result__label">Most likely</p>' +
        '<h3>' + esc(s.name) + '</h3>' +
        '<p class="ge-result__impact">' + esc(lh ? flip(s.symptom) : s.symptom) + '</p>' +
        '<p class="ge-result__impact"><strong>At impact:</strong> ' + esc(lh ? flip(s.impact) : s.impact) + '</p>' +
        '<div class="ge-result__cols"><div><h4>Why it happens</h4>' + list(s.causes, lh) + '</div>' +
        '<div><h4>What to work on</h4>' + list(s.fixes, lh) + '</div></div>' + cta(s.href);
      resultEl.hidden = false;
      hintEl.hidden = true;
      return;
    }

    if (!state.start || !state.curve) { resultEl.hidden = true; return; }

    // Mirror a left-hander's observed shot onto the right-handed lookup table.
    var key = (lh ? MIRROR[state.start] : state.start) + '-' + (lh ? MIRROR[state.curve] : state.curve);
    var f = FLIGHTS[key];
    if (!f) { resultEl.hidden = true; return; }

    resultEl.innerHTML =
      '<p class="ge-result__label">Your miss</p>' +
      '<h3>' + esc(f.name) + '</h3>' +
      '<p class="ge-result__impact">' + esc(lh ? flip(f.impact) : f.impact) + '</p>' +
      '<div class="ge-result__cols"><div><h4>Why it happens</h4>' + list(f.causes, lh) + '</div>' +
      '<div><h4>What to work on</h4>' + list(f.fixes, lh) + '</div></div>' + cta(f.href);
    resultEl.hidden = false;
    hintEl.hidden = true;
  }

  // Strike options are built from the data so adding a fault needs no markup change.
  var strikeGroup = root.querySelector('[data-group="strike"]');
  if (strikeGroup) {
    strikeGroup.innerHTML = STRIKE.map(function (s) {
      return '<button type="button" class="ge-opt" data-v="' + esc(s.id) + '">' + esc(s.name) + '</button>';
    }).join('');
  }

  root.addEventListener('click', function (e) {
    var opt = e.target.closest('.ge-opt');
    if (opt) {
      var group = opt.closest('.ge-opts');
      group.querySelectorAll('.ge-opt').forEach(function (b) { b.classList.remove('is-on'); });
      opt.classList.add('is-on');
      state[group.dataset.group] = opt.dataset.v;
      render();
      return;
    }

    var mode = e.target.closest('.ge-mode');
    if (mode) {
      state.mode = mode.dataset.mode;
      root.querySelectorAll('.ge-mode').forEach(function (b) {
        var on = b === mode;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-selected', String(on));
      });
      root.querySelectorAll('[data-panel]').forEach(function (p) {
        p.hidden = p.dataset.panel !== state.mode;
      });
      render();
    }
  });

  root.querySelectorAll('input[name="ge-hand"]').forEach(function (r) {
    r.addEventListener('change', function (e) { state.hand = e.target.value; render(); });
  });
})();
