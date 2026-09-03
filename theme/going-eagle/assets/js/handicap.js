/**
 * Going Eagle — handicap index estimate (World Handicap System method).
 *
 * Differential = (113 / slope) x (adjusted gross score - course rating).
 * The index is the average of the lowest N differentials, where N and any
 * adjustment depend on how many scores have been posted.
 *
 * Deliberately does NOT model net double bogey, the playing conditions
 * calculation, or the soft and hard caps. The page says so; do not quietly add a
 * partial version of those, because a half-implemented cap is worse than none.
 */
(function () {
  'use strict';

  var root = document.getElementById('ge-handicap');
  if (!root) return;

  var TABLE = [
    { n: 3, use: 1, adj: -2.0 },
    { n: 4, use: 1, adj: -1.0 },
    { n: 5, use: 1, adj: 0 },
    { n: 6, use: 2, adj: -1.0 },
    { n: 8, use: 2, adj: 0 },
    { n: 11, use: 3, adj: 0 },
    { n: 14, use: 4, adj: 0 },
    { n: 16, use: 5, adj: 0 },
    { n: 18, use: 6, adj: 0 },
    { n: 19, use: 7, adj: 0 },
    { n: 20, use: 8, adj: 0 }
  ];

  var rowsEl = root.querySelector('[data-rows]');
  var resultEl = root.querySelector('[data-result]');
  var hintEl = root.querySelector('[data-hint]');

  function addRow(v) {
    v = v || {};
    var row = document.createElement('div');
    row.className = 'ge-row';
    row.innerHTML =
      '<input type="number" inputmode="numeric" step="1" aria-label="Adjusted gross score" placeholder="92" value="' + (v.s || '') + '" data-f="s">' +
      '<input type="number" inputmode="decimal" step="0.1" aria-label="Course rating" placeholder="71.2" value="' + (v.cr || '') + '" data-f="cr">' +
      '<input type="number" inputmode="numeric" step="1" aria-label="Slope rating" placeholder="130" value="' + (v.sl || '') + '" data-f="sl">' +
      '<span class="ge-row__diff">&mdash;</span>' +
      '<button type="button" class="ge-row__rm" aria-label="Remove this round">&times;</button>';
    rowsEl.appendChild(row);
  }

  function calc() {
    var diffs = [];
    Array.prototype.forEach.call(rowsEl.querySelectorAll('.ge-row'), function (row) {
      function g(f) { return parseFloat(row.querySelector('[data-f="' + f + '"]').value); }
      var s = g('s'), cr = g('cr'), sl = g('sl');
      var cell = row.querySelector('.ge-row__diff');
      if (isFinite(s) && isFinite(cr) && isFinite(sl) && sl > 0) {
        var d = (113 / sl) * (s - cr);
        cell.textContent = d.toFixed(1);
        diffs.push(d);
      } else {
        cell.innerHTML = '&mdash;';
      }
    });

    if (diffs.length < 3) {
      resultEl.hidden = true;
      hintEl.hidden = false;
      hintEl.textContent = 'Enter at least three complete rounds to get an estimate. ' + diffs.length + ' so far.';
      return;
    }
    hintEl.hidden = true;

    // Only the most recent 20 rounds count towards an index.
    var recent = diffs.slice(-20);
    var rule = TABLE.filter(function (r) { return recent.length <= r.n; })[0] || TABLE[TABLE.length - 1];
    var lowest = recent.slice().sort(function (a, b) { return a - b; }).slice(0, rule.use);
    var avg = lowest.reduce(function (a, b) { return a + b; }, 0) / lowest.length;
    var index = avg + rule.adj;

    resultEl.innerHTML =
      '<p class="ge-result__label">Estimated handicap index</p>' +
      '<p class="ge-result__big">' + index.toFixed(1) + '</p>' +
      '<div class="ge-result__steps">' +
      '<p><strong>' + recent.length + '</strong> rounds counted, so the lowest <strong>' + rule.use +
      '</strong> differential' + (rule.use > 1 ? 's are' : ' is') + ' used.</p>' +
      '<p>Lowest used: ' + lowest.map(function (d) { return d.toFixed(1); }).join(', ') + '</p>' +
      '<p>Average: <strong>' + avg.toFixed(2) + '</strong>' +
      (rule.adj !== 0 ? ' &minus; adjustment ' + Math.abs(rule.adj).toFixed(1) : '') +
      ' &rarr; <strong>' + index.toFixed(1) + '</strong></p></div>' +
      '<p class="ge-result__note">An estimate using the standard method. Not an official index.</p>';
    resultEl.hidden = false;
  }

  root.addEventListener('input', function (e) {
    if (e.target.matches('[data-f]')) calc();
  });

  root.addEventListener('click', function (e) {
    if (e.target.closest('[data-add]')) { addRow(); return; }
    if (e.target.closest('.ge-row__rm')) { e.target.closest('.ge-row').remove(); calc(); return; }
    if (e.target.closest('[data-demo]')) {
      rowsEl.innerHTML = '';
      [[94, 71.2, 131], [89, 70.4, 124], [97, 72.1, 138], [91, 71.2, 131], [88, 69.8, 120]]
        .forEach(function (r) { addRow({ s: r[0], cr: r[1], sl: r[2] }); });
      calc();
    }
  });

  for (var i = 0; i < 3; i++) addRow();
})();
