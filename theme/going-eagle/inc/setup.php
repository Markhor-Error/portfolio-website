<?php
/**
 * A one-click, one-time setup screen under Tools.
 *
 * This exists because two WordPress actions have no API a remote tool can call at
 * all — installing a theme file, and this page's own settings screen — so a human
 * has to be the one to trigger them. Rather than send the owner hunting through
 * three separate wp-admin screens (Page Attributes, Settings > Reading, Users >
 * Application Passwords), this collapses all of it into one button: it wires up
 * the homepage template as the site's front page, and mints a fresh Application
 * Password so nothing past this point needs another manual click.
 *
 * Safe to click more than once: the Home page is found-or-created by a private
 * postmeta marker rather than duplicated, and a repeat click just issues another
 * valid Application Password (WordPress has no problem with several existing at
 * once — old ones can be revoked any time from Users > Profile).
 *
 * @package GoingEagle
 */

defined( 'ABSPATH' ) || exit;

add_action( 'admin_menu', function () {
	add_management_page(
		'Going Eagle Setup',
		'Going Eagle Setup',
		'manage_options',
		'going-eagle-setup',
		'going_eagle_render_setup_page'
	);
} );

function going_eagle_run_setup(): array {
	// Home page: find by our marker, or create it. Never duplicated on a re-run.
	$existing = get_posts( array(
		'post_type'      => 'page',
		'meta_key'       => '_ge_setup_home',
		'meta_value'     => '1',
		'posts_per_page' => 1,
		'post_status'    => 'any',
	) );

	if ( $existing ) {
		$page_id = $existing[0]->ID;
		wp_update_post( array( 'ID' => $page_id, 'post_status' => 'publish' ) );
	} else {
		$page_id = wp_insert_post( array(
			'post_title'  => 'Home',
			'post_status' => 'publish',
			'post_type'   => 'page',
		) );
		update_post_meta( $page_id, '_ge_setup_home', '1' );
	}

	// Assign our template and make it the static front page — the two things
	// Settings > Reading and Page Attributes would otherwise require by hand.
	update_post_meta( $page_id, '_wp_page_template', 'page-templates/homepage.php' );
	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', $page_id );

	// A fresh Application Password, shown once — WordPress's own rule, not this
	// theme's. Copy it immediately; it cannot be retrieved again after this screen.
	$app_password = null;
	$app_error    = null;
	if ( class_exists( 'WP_Application_Passwords' ) ) {
		$created = WP_Application_Passwords::create_new_application_password(
			get_current_user_id(),
			array( 'name' => 'claude-api-' . gmdate( 'Y-m-d-His' ) )
		);
		if ( is_wp_error( $created ) ) {
			$app_error = $created->get_error_message();
		} else {
			$app_password = $created[0];
		}
	} else {
		$app_error = 'Application Passwords are not available on this site (usually because it is not fully on HTTPS).';
	}

	return array(
		'page_id'      => $page_id,
		'app_password' => $app_password,
		'app_error'    => $app_error,
	);
}

function going_eagle_render_setup_page(): void {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$result = null;
	if ( isset( $_POST['ge_setup_nonce'] ) && wp_verify_nonce( $_POST['ge_setup_nonce'], 'ge_setup' ) ) {
		$result = going_eagle_run_setup();
	}
	?>
	<div class="wrap">
		<h1>Going Eagle Setup</h1>

		<?php if ( $result ) : ?>
			<div class="notice notice-success">
				<p><strong>Done.</strong> Your homepage is now live at the site's front page —
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" target="_blank">view it</a>.</p>
			</div>

			<?php if ( $result['app_password'] ) : ?>
				<div class="card" style="max-width:640px;padding:1.25rem 1.5rem;">
					<h2>Copy this and send it to Claude</h2>
					<p>This is shown <strong>once</strong>. WordPress cannot display it again after you
					leave this page — if you lose it, just click the button below again for a new one.</p>
					<p>
						<input type="text" readonly
							style="font-size:1.1rem;font-family:monospace;width:100%;padding:.6rem;"
							value="<?php echo esc_attr( $result['app_password'] ); ?>"
							onclick="this.select();">
					</p>
				</div>
			<?php elseif ( $result['app_error'] ) : ?>
				<div class="notice notice-error">
					<p><strong>The homepage is live, but the password step failed:</strong>
					<?php echo esc_html( $result['app_error'] ); ?></p>
				</div>
			<?php endif; ?>
		<?php endif; ?>

		<p>This does three things in one click: makes the Going Eagle homepage your site's
		front page, and (if it succeeds) generates a fresh key so future updates need no
		manual steps at all.</p>

		<form method="post">
			<?php wp_nonce_field( 'ge_setup' ); ?>
			<p><button type="submit" class="button button-primary button-hero">
				<?php echo $result ? 'Run again / get a new password' : 'Run setup'; ?>
			</button></p>
		</form>
	</div>
	<?php
}
