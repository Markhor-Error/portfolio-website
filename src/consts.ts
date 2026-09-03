/** Single source of truth for site-wide identity, navigation and editorial policy. */

export const SITE = {
  name: 'Going Eagle',
  shortName: 'Eagle',
  url: 'https://lawngreen-donkey-777239.hostingersite.com',
  tagline: 'Play your best golf, backed by data',
  description:
    'Find out what is actually costing you strokes, then fix it. Golf instruction, ' +
    'short game, scoring strategy and equipment guidance, reviewed by a working golf coach.',
  locale: 'en',
  themeColor: '#0d4f3c',
} as const;

/** Mike reviews; he does not write. Nothing in the codebase may present him as an author. */
export const REVIEWER = {
  id: 'mike-evans',
  name: 'Mike Evans',
  role: 'Golf Coach & Expert Reviewer',
  credential: 'Golf Coach — 6 years of coaching experience',
  url: '/authors/mike-evans/',
  /** No stock or AI-generated portrait may ever stand in for a real expert. */
  hasRealPhoto: false,
  initials: 'ME',
} as const;

export const AUTHOR = {
  name: 'Going Eagle Editorial Team',
  url: '/about/',
} as const;

export type ClusterId =
  | 'fixes' | 'short-game' | 'scoring' | 'gear' | 'home-golf' | 'basics' | 'tools';

export interface Cluster {
  id: ClusterId;
  label: string;
  href: string;
  blurb: string;
  /** Where this cluster sends commercial intent. Phase 6 requires every cluster to name one. */
  commercialDestination: string;
  group: 'improve' | 'gear' | 'tools' | 'learn';
}

export const CLUSTERS: Cluster[] = [
  {
    id: 'fixes', label: 'Swing Fixes', href: '/fixes/', group: 'improve',
    blurb: 'Your ball is doing something you did not ask it to. Find the cause, then the cure.',
    commercialDestination: '/gear/training-aids/',
  },
  {
    id: 'short-game', label: 'Short Game', href: '/short-game/', group: 'improve',
    blurb: 'Inside 100 yards is where amateurs lose most of their strokes. It is also the cheapest place to find them.',
    commercialDestination: '/gear/wedges/',
  },
  {
    id: 'scoring', label: 'Scoring', href: '/scoring/', group: 'improve',
    blurb: 'How to play eighteen holes, not how to swing a club. Strategy, decisions and the mental side.',
    commercialDestination: '/gear/rangefinders/',
  },
  {
    id: 'gear', label: 'Clubs & Gear', href: '/gear/', group: 'gear',
    blurb: 'What to carry, what it actually does, and when a purchase will not fix the problem.',
    commercialDestination: '/gear/',
  },
  {
    id: 'home-golf', label: 'Home Golf', href: '/home-golf/', group: 'gear',
    blurb: 'Simulators, launch monitors, nets and mats. How to build a practice space without wasting thousands.',
    commercialDestination: '/home-golf/simulators/',
  },
  {
    id: 'basics', label: 'Golf Basics', href: '/basics/', group: 'learn',
    blurb: 'Rules, scoring, handicaps, etiquette and the vocabulary, explained without condescension.',
    commercialDestination: '/gear/complete-sets/',
  },
  {
    id: 'tools', label: 'Free Tools', href: '/tools/', group: 'tools',
    blurb: 'Calculators and diagnostics that give you a number instead of an opinion.',
    commercialDestination: '/gear/',
  },
];

export const clusterById = (id: ClusterId): Cluster =>
  CLUSTERS.find((c) => c.id === id)!;

/**
 * Mega-menu panels. Four triggers keeps the bar usable while every pillar keeps a
 * sitewide link.
 *
 * `ready` gates the link: only built pages are rendered, so the global nav can never
 * ship a 404. Flip an entry to true in the same commit that adds its page.
 */
export interface NavChild { label: string; href: string; ready?: boolean }
export interface NavGroup { label: string; href: string; children: NavChild[] }

const NAV_ALL: NavGroup[] = [
  {
    label: 'Improve', href: '/fixes/',
    children: [
      { label: 'Swing Fixes', href: '/fixes/', ready: true },
      { label: 'Fix a Slice', href: '/fixes/slice/', ready: true },
      { label: 'Fix a Hook', href: '/fixes/hook/' },
      { label: 'Cure the Shanks', href: '/fixes/shank/' },
      { label: 'Short Game', href: '/short-game/', ready: true },
      { label: 'Chipping', href: '/short-game/chipping/' },
      { label: 'Putting', href: '/short-game/putting/' },
      { label: 'Scoring', href: '/scoring/', ready: true },
      { label: 'Break 100', href: '/scoring/break-100/' },
      { label: 'Break 90', href: '/scoring/break-90/' },
      { label: 'Break 80', href: '/scoring/break-80/' },
      { label: 'Course Management', href: '/scoring/course-management/' },
    ],
  },
  {
    label: 'Gear', href: '/gear/',
    children: [
      { label: 'All Equipment', href: '/gear/', ready: true },
      { label: 'Drivers', href: '/gear/drivers/' },
      { label: 'Irons', href: '/gear/irons/' },
      { label: 'Wedges', href: '/gear/wedges/' },
      { label: 'Putters', href: '/gear/putters/' },
      { label: 'Rangefinders', href: '/gear/rangefinders/' },
      { label: 'Home Golf', href: '/home-golf/', ready: true },
      { label: 'Golf Simulators', href: '/home-golf/simulators/' },
      { label: 'Launch Monitors', href: '/home-golf/launch-monitors/' },
      { label: 'How We Test', href: '/gear/how-we-test/', ready: true },
    ],
  },
  {
    label: 'Tools', href: '/tools/',
    children: [
      { label: 'All Tools', href: '/tools/', ready: true },
      { label: 'Ball Flight Diagnostic', href: '/tools/ball-flight-diagnostic/', ready: true },
      { label: 'Handicap Calculator', href: '/tools/handicap-calculator/', ready: true },
      { label: 'Scoring Benchmark', href: '/tools/scoring-benchmark/' },
      { label: 'Wedge Gapping', href: '/tools/wedge-gapping/' },
      { label: 'Simulator Budget', href: '/tools/simulator-budget/' },
    ],
  },
  {
    label: 'Learn', href: '/basics/',
    children: [
      { label: 'Golf Basics', href: '/basics/', ready: true },
      { label: 'Glossary', href: '/basics/glossary/' },
      { label: 'Handicaps Explained', href: '/basics/handicap-explained/' },
      { label: 'Scoring Explained', href: '/basics/scoring-explained/' },
      { label: 'How We Test', href: '/gear/how-we-test/', ready: true },
      { label: 'Editorial Policy', href: '/editorial-policy/', ready: true },
      { label: 'About Going Eagle', href: '/about/', ready: true },
    ],
  },
];

export const NAV: NavGroup[] = NAV_ALL
  .map((g) => ({ ...g, children: g.children.filter((c) => c.ready) }))
  .filter((g) => g.children.length > 0);
