<?php
/**
 * Going Eagle child theme for Kadence.
 *
 * Kept deliberately small: Kadence Pro already handles layout, headers and
 * templating, so this theme adds only what Kadence cannot know about — the brand
 * tokens, the editorial byline model, structured data, and the calculators.
 *
 * @package GoingEagle
 */

defined( 'ABSPATH' ) || exit;

define( 'GOING_EAGLE_VERSION', '0.1.0' );
define( 'GOING_EAGLE_DIR', get_stylesheet_directory() );
define( 'GOING_EAGLE_URI', get_stylesheet_directory_uri() );

/**
 * The reviewer. Mike reviews content; he does not write it.
 *
 * Nothing in this theme may render him as a post author. The byline helper and the
 * schema builder both depend on that distinction, and it is an editorial commitment
 * documented at /editorial-policy/, not a display preference.
 */
function going_eagle_reviewer(): array {
	return array(
		'name'       => 'Mike Evans',
		'role'       => 'Golf Coach & Expert Reviewer',
		'credential' => 'Golf Coach — 6 years of coaching experience',
		'url'        => home_url( '/authors/mike-evans/' ),
		'initials'   => 'ME',
		// No stock or AI-generated portrait may stand in for a real person.
		// Flip to a real attachment ID only when a genuine photograph exists.
		'photo_id'   => 0,
	);
}

/** Articles are written by the editorial team, not by any individual. */
function going_eagle_author(): array {
	return array(
		'name' => 'Going Eagle Editorial Team',
		'url'  => home_url( '/about/' ),
	);
}

/**
 * Load the child stylesheet after Kadence's, and the tool scripts only on pages
 * that actually contain the relevant shortcode.
 */
function going_eagle_assets(): void {
	wp_enqueue_style(
		'going-eagle',
		GOING_EAGLE_URI . '/assets/css/going-eagle.css',
		array( 'kadence-global' ),
		GOING_EAGLE_VERSION
	);

	// Conditional loading matters here: these are the only scripts the theme adds,
	// and shipping them sitewide would cost every article page for no reason.
	$post = get_post();
	if ( ! $post ) {
		return;
	}

	if ( has_shortcode( $post->post_content, 'ge_ball_flight' ) ) {
		wp_enqueue_script(
			'going-eagle-ball-flight',
			GOING_EAGLE_URI . '/assets/js/ball-flight.js',
			array(),
			GOING_EAGLE_VERSION,
			true
		);
	}

	if ( has_shortcode( $post->post_content, 'ge_handicap' ) ) {
		wp_enqueue_script(
			'going-eagle-handicap',
			GOING_EAGLE_URI . '/assets/js/handicap.js',
			array(),
			GOING_EAGLE_VERSION,
			true
		);
	}

	if ( has_shortcode( $post->post_content, 'ge_sim_budget' ) ) {
		wp_enqueue_script(
			'going-eagle-sim-budget',
			GOING_EAGLE_URI . '/assets/js/sim-budget.js',
			array(),
			GOING_EAGLE_VERSION,
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'going_eagle_assets', 20 );

require_once GOING_EAGLE_DIR . '/inc/reviewer.php';
require_once GOING_EAGLE_DIR . '/inc/schema.php';
require_once GOING_EAGLE_DIR . '/inc/tools.php';
