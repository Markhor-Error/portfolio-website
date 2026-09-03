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
