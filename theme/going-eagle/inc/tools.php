<?php
/**
 * The free calculators, as shortcodes.
 *
 * Markup only. The behaviour lives in assets/js, and the ball-flight reference data
 * is generated from src/data/ballflight.json so this and the Astro implementation
 * cannot drift. Both tools run entirely client-side and store nothing.
 *
 * @package GoingEagle
 */

defined( 'ABSPATH' ) || exit;

/** [ge_ball_flight] — the nine ball flights plus strike faults. */
function going_eagle_ball_flight_shortcode(): string {
	ob_start();
	?>
	<div class="ge-tool" id="ge-ball-flight">
		<div class="ge-tool__bar">
			<fieldset class="ge-hand">
				<legend><?php esc_html_e( 'You play', 'going-eagle' ); ?></legend>
				<label><input type="radio" name="ge-hand" value="rh" checked> <?php esc_html_e( 'Right-handed', 'going-eagle' ); ?></label>
				<label><input type="radio" name="ge-hand" value="lh"> <?php esc_html_e( 'Left-handed', 'going-eagle' ); ?></label>
			</fieldset>
			<div class="ge-modes" role="tablist" aria-label="<?php esc_attr_e( 'Problem type', 'going-eagle' ); ?>">
				<button type="button" role="tab" class="ge-mode is-on" data-mode="curve" aria-selected="true"><?php esc_html_e( 'It curves in the air', 'going-eagle' ); ?></button>
				<button type="button" role="tab" class="ge-mode" data-mode="strike" aria-selected="false"><?php esc_html_e( 'Contact is the problem', 'going-eagle' ); ?></button>
			</div>
		</div>

		<div data-panel="curve">
			<fieldset class="ge-q">
				<legend><span class="ge-q__n">1</span> <span><?php esc_html_e( 'Where does it start?', 'going-eagle' ); ?></span></legend>
				<div class="ge-opts" data-group="start">
					<button type="button" class="ge-opt" data-v="left"><?php esc_html_e( 'Left of target', 'going-eagle' ); ?></button>
					<button type="button" class="ge-opt" data-v="straight"><?php esc_html_e( 'At the target', 'going-eagle' ); ?></button>
					<button type="button" class="ge-opt" data-v="right"><?php esc_html_e( 'Right of target', 'going-eagle' ); ?></button>
				</div>
			</fieldset>
			<fieldset class="ge-q">
				<legend><span class="ge-q__n">2</span> <span><?php esc_html_e( 'Which way does it curve?', 'going-eagle' ); ?></span></legend>
				<div class="ge-opts" data-group="curve">
					<button type="button" class="ge-opt" data-v="left"><?php esc_html_e( 'Curves left', 'going-eagle' ); ?></button>
					<button type="button" class="ge-opt" data-v="straight"><?php esc_html_e( 'Does not curve', 'going-eagle' ); ?></button>
					<button type="button" class="ge-opt" data-v="right"><?php esc_html_e( 'Curves right', 'going-eagle' ); ?></button>
				</div>
			</fieldset>
		</div>

		<div data-panel="strike" hidden>
			<fieldset class="ge-q">
				<legend><span class="ge-q__n">1</span> <span><?php esc_html_e( 'What does the contact look like?', 'going-eagle' ); ?></span></legend>
				<div class="ge-opts ge-opts--wrap" data-group="strike"></div>
			</fieldset>
		</div>

		<p class="ge-hint" data-hint><?php esc_html_e( 'Pick one from each row to see your diagnosis.', 'going-eagle' ); ?></p>
		<output class="ge-result" data-result hidden aria-live="polite"></output>
	</div>
	<?php
	return (string) ob_get_clean();
}
add_shortcode( 'ge_ball_flight', 'going_eagle_ball_flight_shortcode' );

/** [ge_handicap] — World Handicap System index estimate. */
function going_eagle_handicap_shortcode(): string {
	ob_start();
	?>
	<div class="ge-tool" id="ge-handicap">
		<div class="ge-rows__head">
			<span><?php esc_html_e( 'Adjusted gross score', 'going-eagle' ); ?></span>
			<span><?php esc_html_e( 'Course rating', 'going-eagle' ); ?></span>
			<span><?php esc_html_e( 'Slope rating', 'going-eagle' ); ?></span>
			<span><?php esc_html_e( 'Differential', 'going-eagle' ); ?></span>
			<span></span>
		</div>
		<div data-rows></div>
		<div class="ge-tool__actions">
			<button type="button" class="ge-btn ge-btn--secondary" data-add><?php esc_html_e( 'Add a round', 'going-eagle' ); ?></button>
			<button type="button" class="ge-btn ge-btn--ghost" data-demo><?php esc_html_e( 'Fill with example scores', 'going-eagle' ); ?></button>
		</div>
		<output class="ge-result" data-result hidden aria-live="polite"></output>
		<p class="ge-hint" data-hint><?php esc_html_e( 'Enter at least three rounds to get an estimate.', 'going-eagle' ); ?></p>
	</div>
	<?php
	return (string) ob_get_clean();
}
add_shortcode( 'ge_handicap', 'going_eagle_handicap_shortcode' );

/**
 * [ge_sim_budget] — simulator space check and budget split.
 *
 * The build profiles and the geometry model come from assets/js/sim-budget-data.js,
 * generated from src/data/simbudget.json, so this and the Astro implementation cannot
 * drift. No prices are published here: the tool splits the reader's own budget.
 */
function going_eagle_sim_budget_shortcode(): string {
	$builds = array(
		'net'    => array(
			'label'   => __( 'Net build', 'going-eagle' ),
			'summary' => __( 'Launch monitor, mat and net. Every number a screen build gives you, without the picture.', 'going-eagle' ),
		),
		'screen' => array(
			'label'   => __( 'Screen and enclosure build', 'going-eagle' ),
			'summary' => __( 'The full stack, including the projector and the computer that most package prices leave out.', 'going-eagle' ),
		),
	);

	$fields = array(
		'ceiling'  => array( __( 'Ceiling height', 'going-eagle' ), __( 'to the lowest obstruction', 'going-eagle' ), 'e.g. 108' ),
		'depth'    => array( __( 'Room depth', 'going-eagle' ), __( 'front wall to back wall', 'going-eagle' ), 'e.g. 180' ),
		'width'    => array( __( 'Room width', 'going-eagle' ), __( 'side wall to side wall', 'going-eagle' ), 'e.g. 144' ),
		'height'   => array( __( 'Your height', 'going-eagle' ), __( 'standing, without shoes', 'going-eagle' ), 'e.g. 70' ),
	);

	ob_start();
	?>
	<div class="ge-tool" id="ge-sim-budget">
		<form data-form novalidate>
			<fieldset class="ge-grp">
				<legend><span class="ge-q__n">1</span> <span><?php esc_html_e( 'Your room', 'going-eagle' ); ?></span></legend>
				<div class="ge-units" role="group" aria-label="<?php esc_attr_e( 'Measurement units', 'going-eagle' ); ?>">
					<label><input type="radio" name="ge-unit" value="in" checked> <?php esc_html_e( 'Inches', 'going-eagle' ); ?></label>
					<label><input type="radio" name="ge-unit" value="cm"> <?php esc_html_e( 'Centimetres', 'going-eagle' ); ?></label>
				</div>
				<div class="ge-fields">
					<?php foreach ( $fields as $key => $f ) : ?>
						<p class="ge-f">
							<label for="ge-f-<?php echo esc_attr( $key ); ?>">
								<?php echo esc_html( $f[0] ); ?>
								<span><?php echo esc_html( $f[1] ); ?></span>
							</label>
							<input type="number" id="ge-f-<?php echo esc_attr( $key ); ?>"
								data-f="<?php echo esc_attr( $key ); ?>" min="1" step="0.5"
								inputmode="decimal" placeholder="<?php echo esc_attr( $f[2] ); ?>">
						</p>
					<?php endforeach; ?>
					<p class="ge-f ge-f--wide">
						<label for="ge-f-reach">
							<?php esc_html_e( 'Your overhead reach', 'going-eagle' ); ?>
							<span><?php esc_html_e( 'optional — fingertips, arms straight up', 'going-eagle' ); ?></span>
						</label>
						<input type="number" id="ge-f-reach" data-f="reach" min="1" step="0.5" inputmode="decimal"
							placeholder="<?php esc_attr_e( 'Measured — more accurate than the estimate', 'going-eagle' ); ?>">
					</p>
				</div>
			</fieldset>

			<fieldset class="ge-grp">
				<legend><span class="ge-q__n">2</span> <span><?php esc_html_e( 'Your launch monitor', 'going-eagle' ); ?></span></legend>
				<p class="ge-grp__note"><?php esc_html_e( 'From the spec sheet of the unit you are considering. We check its stated requirement against your room rather than guessing a figure on your behalf.', 'going-eagle' ); ?></p>
				<div class="ge-fields">
					<p class="ge-f">
						<label for="ge-f-lmFront"><?php esc_html_e( 'Space needed in front of the ball', 'going-eagle' ); ?></label>
						<input type="number" id="ge-f-lmFront" data-f="lmFront" min="0" step="0.5" inputmode="decimal"
							placeholder="<?php esc_attr_e( 'Radar units need the most', 'going-eagle' ); ?>">
					</p>
					<p class="ge-f">
						<label for="ge-f-lmBehind"><?php esc_html_e( 'Space needed behind the ball', 'going-eagle' ); ?></label>
						<input type="number" id="ge-f-lmBehind" data-f="lmBehind" min="0" step="0.5" inputmode="decimal"
							placeholder="<?php esc_attr_e( 'Camera units are often positioned here', 'going-eagle' ); ?>">
					</p>
				</div>
			</fieldset>

			<fieldset class="ge-grp">
				<legend><span class="ge-q__n">3</span> <span><?php esc_html_e( 'Your build and budget', 'going-eagle' ); ?></span></legend>
				<div class="ge-builds" role="group" aria-label="<?php esc_attr_e( 'Build type', 'going-eagle' ); ?>">
					<?php $first = true; ?>
					<?php foreach ( $builds as $id => $b ) : ?>
						<label class="ge-build">
							<input type="radio" name="ge-build" value="<?php echo esc_attr( $id ); ?>" <?php checked( $first ); ?>>
							<span><strong><?php echo esc_html( $b['label'] ); ?></strong><em><?php echo esc_html( $b['summary'] ); ?></em></span>
						</label>
						<?php $first = false; ?>
					<?php endforeach; ?>
				</div>
				<div class="ge-fields">
					<p class="ge-f">
						<label for="ge-f-budget"><?php esc_html_e( 'Total build budget', 'going-eagle' ); ?></label>
						<input type="number" id="ge-f-budget" data-f="budget" min="0" step="50" inputmode="numeric" placeholder="e.g. 5000">
					</p>
					<p class="ge-f ge-f--narrow">
						<label for="ge-f-ccy"><?php esc_html_e( 'Currency', 'going-eagle' ); ?></label>
						<select id="ge-f-ccy" data-f="ccy">
							<option value="$" selected>$</option>
							<option value="&pound;">&pound;</option>
							<option value="&euro;">&euro;</option>
						</select>
					</p>
				</div>
			</fieldset>
		</form>

		<p class="ge-hint" data-hint><?php esc_html_e( 'Enter your ceiling height and your own height to get a space verdict. Add a budget to see the split.', 'going-eagle' ); ?></p>
		<output class="ge-result" data-result hidden aria-live="polite"></output>
	</div>
	<?php
	return (string) ob_get_clean();
}
add_shortcode( 'ge_sim_budget', 'going_eagle_sim_budget_shortcode' );

/** Ball-flight data must load before the tool script that reads it. */
function going_eagle_ball_flight_data(): void {
	if ( wp_script_is( 'going-eagle-ball-flight', 'enqueued' ) ) {
		wp_enqueue_script(
			'going-eagle-ball-flight-data',
			GOING_EAGLE_URI . '/assets/js/ball-flight-data.js',
			array(),
			GOING_EAGLE_VERSION,
			true
		);
		wp_scripts()->add_data( 'going-eagle-ball-flight', 'deps', array( 'going-eagle-ball-flight-data' ) );
	}
}
add_action( 'wp_enqueue_scripts', 'going_eagle_ball_flight_data', 21 );

/** Simulator planner data must load before the tool script that reads it. */
function going_eagle_sim_budget_data(): void {
	if ( wp_script_is( 'going-eagle-sim-budget', 'enqueued' ) ) {
		wp_enqueue_script(
			'going-eagle-sim-budget-data',
			GOING_EAGLE_URI . '/assets/js/sim-budget-data.js',
			array(),
			GOING_EAGLE_VERSION,
			true
		);
		wp_scripts()->add_data( 'going-eagle-sim-budget', 'deps', array( 'going-eagle-sim-budget-data' ) );
	}
}
add_action( 'wp_enqueue_scripts', 'going_eagle_sim_budget_data', 21 );
