<?php
/**
 * Template Name: Going Eagle — Homepage
 *
 * A direct port of the Astro reference homepage (src/pages/index.astro), so what the
 * owner approved in the Astro preview is what ships. Markup and copy are 1:1; only
 * the link targets change, from static hrefs to home_url() so the template still
 * works if the site ever moves domains.
 *
 * All classes are prefixed .ge-home-* on purpose. Kadence's own theme almost
 * certainly defines generic names like .card, .grid and .btn, and this child theme
 * does not control Kadence's markup — reusing those names would risk silently
 * breaking Kadence's own layouts elsewhere on the site.
 *
 * Assign this template to a Page (Page Attributes > Template) and set that page as
 * the static front page under Settings > Reading. In the block editor's Kadence
 * panel for that page, turn off "Display Title" — Kadence's own title bar would
 * otherwise print the page title above this template's hero.
 *
 * @package GoingEagle
 */

defined( 'ABSPATH' ) || exit;

get_header();

$reviewer_url  = home_url( '/authors/mike-evans/' );
$reviewer_name = 'Mike Evans';
$reviewer_cred = 'Golf Coach — 6 years of coaching experience';

$entry_paths = array(
	array(
		'eyebrow' => 'Something is wrong',
		'title'   => 'My ball keeps doing that',
		'body'    => 'Slice, hook, shank, top, chunk. Pick the miss and work back to the cause instead of guessing at fixes.',
		'href'    => '/tools/ball-flight-diagnostic/',
		'cta'     => 'Diagnose my miss',
	),
	array(
		'eyebrow' => 'I have a number in mind',
		'title'   => 'I want to break 100, 90 or 80',
		'body'    => 'Each milestone is a different problem. Breaking 100 is about avoiding disasters; breaking 80 is about converting chances.',
		'href'    => '/scoring/',
		'cta'     => 'See the roadmap',
	),
	array(
		'eyebrow' => 'I am about to spend money',
		'title'   => 'I need to buy something',
		'body'    => 'What the equipment actually changes, what it cannot fix, and when the honest answer is to keep what you own.',
		'href'    => '/gear/',
		'cta'     => 'Buying guides',
	),
);

$tools = array(
	array(
		'name' => 'Ball Flight Diagnostic',
		'href' => '/tools/ball-flight-diagnostic/',
		'desc' => 'Pick your miss, get the likely cause.',
	),
	array(
		'name' => 'Handicap Calculator',
		'href' => '/tools/handicap-calculator/',
		'desc' => 'Work out an index from your scores.',
	),
	array(
		'name' => 'Simulator Planner',
		'href' => '/tools/simulator-budget/',
		'desc' => 'Check your room, then split your budget.',
	),
);

$clusters = array(
	array( 'label' => 'Swing Fixes', 'href' => '/fixes/', 'blurb' => 'Your ball is doing something you did not ask it to. Find the cause, then the cure.' ),
	array( 'label' => 'Short Game', 'href' => '/short-game/', 'blurb' => 'Inside 100 yards is where amateurs lose most of their strokes. It is also the cheapest place to find them.' ),
	array( 'label' => 'Scoring', 'href' => '/scoring/', 'blurb' => 'How to play eighteen holes, not how to swing a club. Strategy, decisions and the mental side.' ),
	array( 'label' => 'Clubs & Gear', 'href' => '/gear/', 'blurb' => 'What to carry, what it actually does, and when a purchase will not fix the problem.' ),
	array( 'label' => 'Home Golf', 'href' => '/home-golf/', 'blurb' => 'Simulators, launch monitors, nets and mats. How to build a practice space without wasting thousands.' ),
	array( 'label' => 'Golf Basics', 'href' => '/basics/', 'blurb' => 'Rules, scoring, handicaps, etiquette and the vocabulary, explained without condescension.' ),
);
?>

<div class="ge-home">

	<section class="ge-home-hero">
		<div class="ge-home-wrap">
			<p class="ge-home-eyebrow">Golf improvement, measured</p>
			<h1 class="ge-home-h1">Stop guessing at what&nbsp;is costing you&nbsp;strokes.</h1>
			<p class="ge-home-lead">
				Most golf advice tells you what a good swing looks like. That is not the same as
				telling you what <em>your</em> round is losing. Going Eagle starts with the
				number, works back to the cause, and only then talks about a fix — or a purchase.
			</p>
			<div class="ge-home-cta-row">
				<a class="ge-home-btn ge-home-btn--primary" href="<?php echo esc_url( home_url( '/tools/ball-flight-diagnostic/' ) ); ?>">Diagnose your miss</a>
				<a class="ge-home-btn ge-home-btn--secondary" href="<?php echo esc_url( home_url( '/scoring/' ) ); ?>">Start with your score</a>
			</div>
			<p class="ge-home-trust-line">
				Golf content reviewed before publication by
				<a href="<?php echo esc_url( $reviewer_url ); ?>"><?php echo esc_html( $reviewer_name ); ?></a>,
				<?php echo esc_html( $reviewer_cred ); ?>.
			</p>
		</div>
	</section>

	<section class="ge-home-section">
		<div class="ge-home-wrap">
			<h2 class="ge-home-sec-title">Where do you want to start?</h2>
			<div class="ge-home-grid ge-home-grid--3">
				<?php foreach ( $entry_paths as $p ) : ?>
					<a class="ge-home-card ge-home-path" href="<?php echo esc_url( home_url( $p['href'] ) ); ?>">
						<p class="ge-home-eyebrow"><?php echo esc_html( $p['eyebrow'] ); ?></p>
						<h3><?php echo esc_html( $p['title'] ); ?></h3>
						<p><?php echo esc_html( $p['body'] ); ?></p>
						<span class="ge-home-path-cta"><?php echo esc_html( $p['cta'] ); ?> &rarr;</span>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section class="ge-home-section ge-home-tools-band">
		<div class="ge-home-wrap">
			<div class="ge-home-band-head">
				<div>
					<p class="ge-home-eyebrow">Free, no signup</p>
					<h2 class="ge-home-sec-title">Tools that give you a number</h2>
					<p class="ge-home-band-sub">
						An opinion about your swing is cheap. A measurement is useful. These are
						free, run entirely in your browser, and store nothing.
					</p>
				</div>
				<a class="ge-home-btn ge-home-btn--secondary" href="<?php echo esc_url( home_url( '/tools/' ) ); ?>">All tools</a>
			</div>
			<ul class="ge-home-tool-list">
				<?php foreach ( $tools as $t ) : ?>
					<li>
						<a href="<?php echo esc_url( home_url( $t['href'] ) ); ?>">
							<strong><?php echo esc_html( $t['name'] ); ?></strong>
							<span><?php echo esc_html( $t['desc'] ); ?></span>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</section>

	<section class="ge-home-section">
		<div class="ge-home-wrap">
			<h2 class="ge-home-sec-title">Everything on the site</h2>
			<div class="ge-home-grid ge-home-cluster-grid">
				<?php foreach ( $clusters as $c ) : ?>
					<a class="ge-home-card" href="<?php echo esc_url( home_url( $c['href'] ) ); ?>">
						<h3><?php echo esc_html( $c['label'] ); ?></h3>
						<p><?php echo esc_html( $c['blurb'] ); ?></p>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section class="ge-home-section">
		<div class="ge-home-wrap">
			<div class="ge-home-trust">
				<h2>Why you can trust a recommendation here</h2>
				<div class="ge-home-grid ge-home-trust-grid">
					<div>
						<h3>A coach checks the advice</h3>
						<p>
							Articles are written by our editorial team, then reviewed by
							<?php echo esc_html( $reviewer_name ); ?> — a golf coach with six years
							of coaching experience — before they go live.
							<a href="<?php echo esc_url( home_url( '/editorial-policy/' ) ); ?>">Our editorial policy</a>.
						</p>
					</div>
					<div>
						<h3>We say how we tested</h3>
						<p>
							Every gear page states plainly whether a recommendation is hands-on or
							research-based. We will not call something tested if it was not.
							<a href="<?php echo esc_url( home_url( '/gear/how-we-test/' ) ); ?>">How we test</a>.
						</p>
					</div>
					<div>
						<h3>Commission never moves a ranking</h3>
						<p>
							We use affiliate links and we say so above the first one. If the
							cheaper product is the better product, it goes first.
							<a href="<?php echo esc_url( home_url( '/affiliate-disclosure/' ) ); ?>">Full disclosure</a>.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

</div>

<?php get_footer(); ?>
