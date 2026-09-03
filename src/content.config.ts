import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Phase 21: every page declares how fast its facts rot, so reviews can be scheduled. */
const decayClass = z.enum(['high', 'medium', 'low']);

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** Meta description. Kept separate from the on-page intro on purpose. */
    description: z.string().min(50).max(165),
    cluster: z.enum(['fixes', 'short-game', 'scoring', 'gear', 'home-golf', 'basics']),
    /** A pillar is the one page that owns its cluster. Exactly one per cluster. */
    pillar: z.boolean().default(false),
    published: z.string(),
    updated: z.string().optional(),
    /** False until Mike has actually reviewed it. Never default this to true. */
    reviewed: z.boolean().default(false),
    decay: decayClass,
    nextReview: z.string(),
    /** Phase 6: one sentence. A page whose only purpose is traffic is not approved. */
    purpose: z.string(),
    /** Phase 12: at least three things this page has that the competitors do not. */
    originalValue: z.array(z.string()).min(3),
    /** Phase 5: the single intent this page owns. Two pages may not share one. */
    intent: z.string(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
