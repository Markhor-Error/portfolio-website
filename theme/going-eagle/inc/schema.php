<?php
/**
 * Structured data.
 *
 * An SEO plugin (Yoast, Rank Math, SEOPress, AIOSEO) already emits Organization,
 * WebSite, Article and Breadcrumb nodes. Emitting a second, competing graph is a
 * common and avoidable mistake, so when one of those is active this file adds only
 * what no plugin can know: that a named coach reviewed the article.
 *
 * @package GoingEagle
 */

defined( 'ABSPATH' ) || exit;

/** Whether a plugin is already producing the main schema graph. */
function going_eagle_seo_plugin_active(): bool {
	return defined( 'WPSEO_VERSION' )          // Yoast
		|| defined( 'RANK_MATH_VERSION' )      // Rank Math
		|| defined( 'SEOPRESS_VERSION' )       // SEOPress
		|| defined( 'AIOSEO_VERSION' );        // All in One SEO
}

/** The reviewer Person node, referenced by @id from wherever it is needed. */
function going_eagle_person_node(): array {
	$reviewer = going_eagle_reviewer();

	return array(
		'@type'       => 'Person',
		'@id'         => $reviewer['url'] . '#person',
		'name'        => $reviewer['name'],
		'url'         => $reviewer['url'],
		'jobTitle'    => $reviewer['role'],
		'description' => sprintf(
			'%s is a golf coach with six years of coaching experience who reviews golf content on %s for accuracy and practical usefulness before publication.',
			$reviewer['name'],
			get_bloginfo( 'name' )
		),
		'knowsAbout'  => array( 'Golf', 'Golf instruction', 'Golf coaching', 'Golf equipment' ),
	);
}

/** Organization and WebSite. Only emitted when no SEO plugin owns them. */
function going_eagle_org_nodes(): array {
	$org_id = home_url( '/#organization' );

	return array(
		array(
			'@type'                => 'Organization',
			'@id'                  => $org_id,
			'name'                 => get_bloginfo( 'name' ),
			'url'                  => home_url( '/' ),
			'description'          => get_bloginfo( 'description' ),
			'publishingPrinciples' => home_url( '/editorial-policy/' ),
			'ethicsPolicy'         => home_url( '/affiliate-disclosure/' ),
		),
		array(
			'@type'      => 'WebSite',
			'@id'        => home_url( '/#website' ),
			'url'        => home_url( '/' ),
			'name'       => get_bloginfo( 'name' ),
			'publisher'  => array( '@id' => $org_id ),
			'inLanguage' => get_bloginfo( 'language' ),
		),
	);
}

/**
 * The Article node.
 *
 * author is the Organization, because the editorial team writes the articles.
 * reviewedBy states the actual relationship; contributor is included alongside it
 * because it is the property most reliably consumed, and extra properties are
 * ignored rather than penalised.
 */
function going_eagle_article_node(): array {
	$author   = going_eagle_author();
	$reviewer = going_eagle_reviewer();

	$node = array(
		'@type'            => 'Article',
		'@id'              => get_permalink() . '#article',
		'mainEntityOfPage' => get_permalink(),
		'headline'         => wp_strip_all_tags( get_the_title() ),
		'datePublished'    => get_the_date( 'c' ),
		'dateModified'     => get_the_modified_date( 'c' ),
		'inLanguage'       => get_bloginfo( 'language' ),
		'author'           => array(
			'@type' => 'Organization',
			'name'  => $author['name'],
			'url'   => $author['url'],
		),
		'publisher'        => array( '@id' => home_url( '/#organization' ) ),
	);

	$excerpt = get_the_excerpt();
	if ( $excerpt ) {
		$node['description'] = wp_strip_all_tags( $excerpt );
	}

	if ( has_post_thumbnail() ) {
		$image = wp_get_attachment_image_url( get_post_thumbnail_id(), 'full' );
		if ( $image ) {
			$node['image'] = $image;
		}
	}

	$categories = get_the_category();
	if ( $categories ) {
		$node['articleSection'] = $categories[0]->name;
	}

	// Only claim review when a human actually recorded one.
	if ( going_eagle_is_reviewed() ) {
		$ref                  = array( '@id' => $reviewer['url'] . '#person' );
		$node['reviewedBy']   = $ref;
		$node['contributor']  = $ref;
	}

	return $node;
}

/** Emit the graph in the document head. */
function going_eagle_output_schema(): void {
	$nodes = array();

	if ( ! going_eagle_seo_plugin_active() ) {
		$nodes = array_merge( $nodes, going_eagle_org_nodes() );
	}

	if ( is_singular( 'post' ) ) {
		// The Person node is always ours to emit — no SEO plugin models a reviewer.
		if ( going_eagle_is_reviewed() ) {
			$nodes[] = going_eagle_person_node();
		}
		if ( ! going_eagle_seo_plugin_active() ) {
			$nodes[] = going_eagle_article_node();
		}
	}

	if ( is_page( 'mike-evans' ) || is_page( 'authors/mike-evans' ) ) {
		$nodes[] = going_eagle_person_node();
	}

	/**
	 * Filter the schema nodes before output.
	 *
	 * @param array $nodes Schema.org nodes destined for the @graph.
	 */
	$nodes = apply_filters( 'going_eagle_schema_nodes', $nodes );

	if ( ! $nodes ) {
		return;
	}

	$graph = array(
		'@context' => 'https://schema.org',
		'@graph'   => array_values( $nodes ),
	);

	printf(
		"<script type=\"application/ld+json\">%s</script>\n",
		wp_json_encode( $graph, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE )
	);
}
add_action( 'wp_head', 'going_eagle_output_schema', 20 );

/**
 * [ge_faq] — an FAQ accordion that also contributes FAQPage schema.
 *
 * Usage:
 *   [ge_faq]
 *     [ge_q question="What causes a slice?"]An open face relative to path.[/ge_q]
 *   [/ge_faq]
 */
function going_eagle_faq_shortcode( $atts, $content = null ): string {
	global $going_eagle_faq_items;
	$going_eagle_faq_items = array();

	$inner = do_shortcode( (string) $content );

	if ( ! $going_eagle_faq_items ) {
		return '';
	}

	$faq_nodes = array_map(
		static fn( array $item ): array => array(
			'@type'          => 'Question',
			'name'           => $item['q'],
			'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $item['a'] ),
		),
		$going_eagle_faq_items
	);

	$json = wp_json_encode(
		array(
			'@context'   => 'https://schema.org',
			'@type'      => 'FAQPage',
			'mainEntity' => $faq_nodes,
		),
		JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
	);

	return sprintf(
		'<section class="ge-faq"><h2>%s</h2>%s</section><script type="application/ld+json">%s</script>',
		esc_html__( 'Common questions', 'going-eagle' ),
		$inner,
		$json
	);
}
add_shortcode( 'ge_faq', 'going_eagle_faq_shortcode' );

/** [ge_q question="..."]answer[/ge_q] — one FAQ entry. */
function going_eagle_question_shortcode( $atts, $content = null ): string {
	global $going_eagle_faq_items;

	$atts     = shortcode_atts( array( 'question' => '' ), $atts, 'ge_q' );
	$question = trim( (string) $atts['question'] );
	$answer   = trim( wp_strip_all_tags( (string) $content ) );

	if ( '' === $question || '' === $answer ) {
		return '';
	}

	if ( is_array( $going_eagle_faq_items ) ) {
		$going_eagle_faq_items[] = array( 'q' => $question, 'a' => $answer );
	}

	return sprintf(
		'<details><summary>%s</summary><p>%s</p></details>',
		esc_html( $question ),
		esc_html( $answer )
	);
}
add_shortcode( 'ge_q', 'going_eagle_question_shortcode' );
