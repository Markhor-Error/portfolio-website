<?php
/**
 * Editorial byline: written by the editorial team, reviewed by a named coach.
 *
 * Reviewer status is per-post and opt-in. It is stored as post meta and defaults to
 * off, so a post is never described as reviewed until an editor says it was.
 *
 * @package GoingEagle
 */

defined( 'ABSPATH' ) || exit;

const GOING_EAGLE_REVIEWED_META = '_going_eagle_reviewed';
const GOING_EAGLE_REVIEWED_DATE = '_going_eagle_reviewed_date';

/** Whether this specific post has actually been reviewed. Defaults to false. */
function going_eagle_is_reviewed( ?int $post_id = null ): bool {
	$post_id = $post_id ?: get_the_ID();
	return (bool) get_post_meta( $post_id, GOING_EAGLE_REVIEWED_META, true );
}

/** Register the reviewer meta so it is editable and exposed to the REST API. */
function going_eagle_register_meta(): void {
	register_post_meta(
		'post',
		GOING_EAGLE_REVIEWED_META,
		array(
			'type'          => 'boolean',
			'single'        => true,
			'default'       => false,
			'show_in_rest'  => true,
			'description'   => 'Whether Mike Evans has reviewed and approved this post.',
			'auth_callback' => static fn() => current_user_can( 'edit_posts' ),
		)
	);

	register_post_meta(
		'post',
		GOING_EAGLE_REVIEWED_DATE,
		array(
			'type'          => 'string',
			'single'        => true,
			'default'       => '',
			'show_in_rest'  => true,
			'description'   => 'ISO date the review was completed.',
			'auth_callback' => static fn() => current_user_can( 'edit_posts' ),
		)
	);
}
add_action( 'init', 'going_eagle_register_meta' );

/**
 * Render the byline block.
 *
 * The reviewer avatar is an initials monogram rather than a portrait, because the
 * site does not use stock or AI-generated images to represent real people. When a
 * genuine photograph exists, set photo_id in going_eagle_reviewer().
 */
function going_eagle_byline( bool $compact = false ): string {
	$reviewer = going_eagle_reviewer();
	$author   = going_eagle_author();
	$reviewed = going_eagle_is_reviewed();

	$avatar = $reviewer['photo_id']
		? wp_get_attachment_image( $reviewer['photo_id'], 'thumbnail', false, array( 'class' => 'ge-byline__photo', 'alt' => $reviewer['name'] ) )
		: sprintf( '<span class="ge-byline__monogram" aria-hidden="true">%s</span>', esc_html( $reviewer['initials'] ) );

	ob_start();
	?>
	<div class="ge-byline<?php echo $compact ? ' ge-byline--compact' : ''; ?>">
		<?php echo wp_kses_post( $avatar ); ?>
		<div class="ge-byline__body">
			<p class="ge-byline__line">
				<?php
				printf(
					/* translators: %s: editorial team link */
					esc_html__( 'Written by %s', 'going-eagle' ),
					sprintf( '<a href="%s">%s</a>', esc_url( $author['url'] ), esc_html( $author['name'] ) )
				);

				if ( $reviewed ) {
					echo ' · ';
					printf(
						/* translators: 1: reviewer link, 2: credential */
						esc_html__( 'Reviewed by %1$s, %2$s', 'going-eagle' ),
						sprintf( '<a href="%s"><strong>%s</strong></a>', esc_url( $reviewer['url'] ), esc_html( $reviewer['name'] ) ),
						esc_html( $reviewer['credential'] )
					);
				}
				?>
			</p>
			<?php if ( ! $compact ) : ?>
				<p class="ge-byline__note">
					<?php if ( $reviewed ) : ?>
						<?php esc_html_e( 'Mike reads golf articles before publication and checks the advice is accurate and genuinely useful.', 'going-eagle' ); ?>
					<?php else : ?>
						<?php esc_html_e( 'This page has not yet been through coach review.', 'going-eagle' ); ?>
					<?php endif; ?>
					<a href="<?php echo esc_url( home_url( '/editorial-policy/' ) ); ?>"><?php esc_html_e( 'How our review process works', 'going-eagle' ); ?></a>.
					<?php if ( get_the_modified_date( 'Y-m-d' ) !== get_the_date( 'Y-m-d' ) ) : ?>
						· <?php esc_html_e( 'Last updated', 'going-eagle' ); ?>
						<time datetime="<?php echo esc_attr( get_the_modified_date( 'c' ) ); ?>"><?php echo esc_html( get_the_modified_date() ); ?></time>
					<?php endif; ?>
				</p>
			<?php endif; ?>
		</div>
	</div>
	<?php
	return (string) ob_get_clean();
}

/** [ge_byline] — place the byline anywhere, including inside a Kadence template. */
add_shortcode(
	'ge_byline',
	static function ( $atts ): string {
		$atts = shortcode_atts( array( 'compact' => 'false' ), $atts, 'ge_byline' );
		return going_eagle_byline( 'true' === $atts['compact'] );
	}
);

/** Prepend the byline to single posts automatically. */
function going_eagle_prepend_byline( string $content ): string {
	if ( ! is_singular( 'post' ) || ! in_the_loop() || ! is_main_query() ) {
		return $content;
	}
	// Respect an explicit [ge_byline] in the content rather than showing two.
	if ( has_shortcode( $content, 'ge_byline' ) ) {
		return $content;
	}
	return going_eagle_byline() . $content;
}
add_filter( 'the_content', 'going_eagle_prepend_byline' );
