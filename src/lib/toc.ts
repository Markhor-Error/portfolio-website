export interface Heading { depth: number; slug: string; text: string }

/** Only h2/h3 belong in a table of contents; deeper levels make it noise. */
export const tocFrom = (headings: Heading[]) =>
  headings.filter((h) => h.depth === 2 || h.depth === 3);
