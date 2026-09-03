import { SITE, REVIEWER, AUTHOR } from '../consts';

const abs = (path: string) => new URL(path, SITE.url).href;

export const ORG_ID = abs('/#organization');
export const SITE_ID = abs('/#website');
export const REVIEWER_ID = abs(`${REVIEWER.url}#person`);

/** Emitted once, sitewide, so every other node can reference these by @id. */
export function organizationGraph() {
  return [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE.name,
      url: abs('/'),
      description: SITE.description,
      slogan: SITE.tagline,
      publishingPrinciples: abs('/editorial-policy/'),
      // Declared so the affiliate relationship is machine-readable, not just legalese.
      ethicsPolicy: abs('/affiliate-disclosure/'),
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: abs('/'),
      name: SITE.name,
      description: SITE.description,
      publisher: { '@id': ORG_ID },
      inLanguage: SITE.locale,
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: abs('/search/?q={search_term_string}') },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Person',
      '@id': REVIEWER_ID,
      name: REVIEWER.name,
      url: abs(REVIEWER.url),
      jobTitle: REVIEWER.role,
      description: `${REVIEWER.name} is a golf coach with six years of coaching experience who reviews golf content on ${SITE.name} for accuracy and practical usefulness before publication.`,
      knowsAbout: ['Golf', 'Golf instruction', 'Golf coaching', 'Golf equipment'],
      worksFor: { '@id': ORG_ID },
    },
  ];
}

export function breadcrumbGraph(trail: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': abs('/#breadcrumb'),
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.href),
    })),
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  published?: string;
  updated?: string;
  reviewed: boolean;
  image?: string;
  section?: string;
}

export function articleGraph(a: ArticleSchemaInput) {
  const node: Record<string, unknown> = {
    '@type': 'Article',
    '@id': abs(a.path) + '#article',
    isPartOf: { '@id': SITE_ID },
    mainEntityOfPage: abs(a.path),
    headline: a.title,
    description: a.description,
    inLanguage: SITE.locale,
    // The Editorial Team writes. Mike reviews. This distinction is deliberate
    // and must survive any future refactor of the author system.
    author: { '@type': 'Organization', name: AUTHOR.name, url: abs(AUTHOR.url) },
    publisher: { '@id': ORG_ID },
  };
  if (a.published) node.datePublished = a.published;
  if (a.updated) node.dateModified = a.updated;
  if (a.section) node.articleSection = a.section;
  if (a.image) node.image = abs(a.image);
  if (a.reviewed) {
    node.reviewedBy = { '@id': REVIEWER_ID };
    // `contributor` is the property Google reliably understands on CreativeWork;
    // `reviewedBy` above is the more precise statement of the actual relationship.
    node.contributor = { '@id': REVIEWER_ID };
  }
  return node;
}

export function faqGraph(faqs: { q: string; a: string }[], path: string) {
  return {
    '@type': 'FAQPage',
    '@id': abs(path) + '#faq',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export const jsonLd = (nodes: unknown[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
