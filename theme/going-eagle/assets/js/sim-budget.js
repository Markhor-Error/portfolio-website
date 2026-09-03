/**
 * Simulator space and budget planner.
 *
 * Mirrors /tools/simulator-budget/ on the Astro preview site. The model constants and
 * the budget allocations come from window.GE_SIM_BUDGET, which is generated from
 * src/data/simbudget.json by `npm run sync:theme` — so the two implementations
 * cannot disagree about the arithmetic.
 *
 * Two rules this file inherits from the data source and must not break:
 *   1. No market prices. It splits the reader's own budget; it never claims what
 *      anything costs.
 *   2. The geometry is a labelled planning estimate, not a verdict. The copy says so
 *      and the tool tells the reader to swing a driver in the room.
 *
 * Runs entirely client-side and stores nothing.
 */
(function () {
	'use strict';

	var root = document.getElementById( 'ge-sim-budget' );
	if ( ! root || ! window.GE_SIM_BUDGET ) {
		return;
	}

	var MODEL = window.GE_SIM_BUDGET.MODEL;
	var BUILDS = window.GE_SIM_BUDGET.BUILDS;
	var IN_PER_CM = 1 / 2.54;

	var form = root.querySelector( '[data-form]' );
	var box = root.querySelector( '[data-result]' );
	var hint = root.querySelector( '[data-hint]' );

	function unit() {
		return root.querySelector( 'input[name="ge-unit"]:checked' ).value;
	}

	function num( name ) {
		var el = root.querySelector( '[data-f="' + name + '"]' );
		var v = parseFloat( el.value );
		return isFinite( v ) && v > 0 ? v : null;
	}

	/** Everything is reasoned about in inches; the UI converts on the way in and out. */
	function toIn( v ) {
		if ( null === v ) {
			return null;
		}
		return 'cm' === unit() ? v * IN_PER_CM : v;
	}

	function fmtLen( inches ) {
		if ( 'cm' === unit() ) {
			return Math.round( inches / IN_PER_CM ) + ' cm';
		}
		var ft = Math.floor( inches / 12 );
		var rem = Math.round( inches - ft * 12 );
		return rem ? ft + '′' + rem + '″' : ft + '′';
	}

	function money( n, sym ) {
		return sym + n.toLocaleString( undefined, { maximumFractionDigits: 0 } );
	}

	/** clear = it fits; tight = inside the planning margin; short = it does not. */
	function verdict( have, need ) {
		if ( have >= need ) {
			return 'clear';
		}
		if ( have >= need - MODEL.swingMarginIn ) {
			return 'tight';
		}
		return 'short';
	}

	var LABEL = { clear: 'Fits', tight: 'Tight', short: 'Not enough' };

	function row( name, state, detail ) {
		return '<div class="ge-vrow is-' + state + '">' +
			'<span class="ge-vchip">' + LABEL[ state ] + '</span>' +
			'<span class="ge-vname">' + name + '</span>' +
			'<span class="ge-vdetail">' + detail + '</span></div>';
	}

	function allocate( build, budget ) {
		var rows = build.components.map( function ( c ) {
			var r = {};
			for ( var k in c ) {
				r[ k ] = c[ k ];
			}
			r.amount = Math.round( ( budget * c.pct ) / 100 );
			return r;
		} );
		// Independent rounding drifts from the total; absorb it on the last row.
		var sum = rows.reduce( function ( n, r ) {
			return n + r.amount;
		}, 0 );
		if ( rows.length ) {
			rows[ rows.length - 1 ].amount += budget - sum;
		}
		return rows;
	}

	function render() {
		var ceiling = toIn( num( 'ceiling' ) );
		var depth = toIn( num( 'depth' ) );
		var width = toIn( num( 'width' ) );
		var height = toIn( num( 'height' ) );
		var reachIn = toIn( num( 'reach' ) );
		var lmFront = toIn( num( 'lmFront' ) );
		var lmBehind = toIn( num( 'lmBehind' ) );
		var budget = num( 'budget' );
		var buildId = root.querySelector( 'input[name="ge-build"]:checked' ).value;
		var build = BUILDS[ buildId ];
		var sym = root.querySelector( '[data-f="ccy"]' ).value;

		var canSpace = null !== ceiling && ( null !== height || null !== reachIn );
		if ( ! canSpace && null === budget ) {
			box.hidden = true;
			hint.hidden = false;
			return;
		}

		var html = '';
		var warnings = [];

		if ( canSpace ) {
			var reach = null !== reachIn ? reachIn : height * MODEL.reachFactor;
			var needCeiling = reach + MODEL.clubOverheadIn + MODEL.swingMarginIn;
			var cState = verdict( ceiling, needCeiling );

			html += '<h3>Your room</h3><div class="ge-vrows">';
			html += row(
				'Ceiling clearance',
				cState,
				'You need about <strong>' + fmtLen( needCeiling ) + '</strong>; you have ' +
					fmtLen( ceiling ) + '. ' + ( null === reachIn ?
						'Based on an estimated overhead reach of ' + fmtLen( reach ) +
							' — measure yours for a better answer.' :
						'Based on your measured reach of ' + fmtLen( reach ) + '.' )
			);

			if ( null !== depth ) {
				var behind = Math.max( MODEL.shoulderToBallIn, lmBehind || 0 );
				var front = Math.max( MODEL.ballToNetMinIn, lmFront || 0 );
				html += row(
					'Room depth',
					verdict( depth, behind + front ),
					'You need about <strong>' + fmtLen( behind + front ) + '</strong>; you have ' +
						fmtLen( depth ) + '. That is ' + fmtLen( behind ) + ' behind the ball and ' +
						fmtLen( front ) + ' in front of it.'
				);
			}

			if ( null !== width ) {
				var needWidth = MODEL.sideClearanceIn * 2;
				html += row(
					'Room width',
					verdict( width, needWidth ),
					'You need about <strong>' + fmtLen( needWidth ) + '</strong>; you have ' +
						fmtLen( width ) + '. This is a mishit margin, not a swing margin — ' +
						'a shank leaves at a severe angle and at speed.'
				);
			}
			html += '</div>';

			if ( 'short' === cState ) {
				warnings.push(
					'Ceiling height is the one dimension nothing else fixes. Before ruling the room ' +
					'out, check whether a different spot in it is clear of the lowest obstruction, ' +
					'and confirm by swinging a driver rather than by the tape measure alone.'
				);
			} else if ( 'tight' === cState ) {
				warnings.push(
					'Your ceiling is inside the planning margin. Measure to the lowest obstruction ' +
					'— light fittings, joists, ducting, and in a garage the door track and the ' +
					'opener motor — then make ten full driver swings in the space before you ' +
					'buy anything.'
				);
			}
			if ( null !== depth && null === lmFront && null === lmBehind ) {
				warnings.push(
					'Depth was checked against a general minimum. Enter your shortlisted launch ' +
					'monitor’s stated space requirement for a check that means something — ' +
					'this is the requirement most often broken in a home build.'
				);
			}
			if ( 'screen' === buildId && 'clear' !== cState ) {
				warnings.push(
					'A tight room usually forces a short-throw or ultra-short-throw projector, which ' +
					'costs more than a standard projector of the same brightness. Budget for that ' +
					'before you commit to a screen build.'
				);
			}
		}

		if ( null !== budget ) {
			html += '<h3>Splitting ' + money( budget, sym ) + ' across a ' +
				build.label.toLowerCase() + '</h3><div class="ge-alloc">';
			allocate( build, budget ).forEach( function ( r ) {
				var name = r.href ? '<a href="' + r.href + '">' + r.name + '</a>' : r.name;
				html += '<div class="ge-arow">' +
					'<div class="ge-ahead"><span class="ge-aname">' + name + '</span>' +
					'<span class="ge-aamt">' + money( r.amount, sym ) +
					'<em>' + r.pct + '%</em></span></div>' +
					'<div class="ge-abar"><i style="width:' + r.pct + '%"></i></div>' +
					'<p class="ge-awhy">' + r.why + '</p></div>';
			} );
			html += '</div><p class="ge-disclaim"><strong>This is a split of your budget, not a ' +
				'price list.</strong> We do not publish component prices we have not verified, ' +
				'because this category moves fast enough that a copied figure misleads within a ' +
				'year. Price the components yourself against current listings, using this as the ' +
				'checklist so nothing is left out of the total.</p>';
		}

		if ( warnings.length ) {
			html += '<h3>Before you buy anything</h3><ul class="ge-warns">';
			warnings.forEach( function ( w ) {
				html += '<li>' + w + '</li>';
			} );
			html += '</ul>';
		}

		box.innerHTML = html;
		box.hidden = false;
		hint.hidden = true;
	}

	form.addEventListener( 'input', render );
	form.addEventListener( 'change', render );
})();
