// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/consts.js';

/**
 * Markdown tables render as a bare <table>, which has no way to scroll and so pushes
 * the whole page sideways on a phone. Hand-written HTML in the codebase already wraps
 * wide tables in .table-scroll; this gives authored Markdown the same treatment
 * automatically, so a content writer cannot reintroduce the bug.
 */
function rehypeWrapTables() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        walk(child);
        if (child.type !== 'element' || child.tagName !== 'table') return child;
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-scroll'] },
          children: [child],
        };
      });
    };
    walk(tree);
  };
}

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  markdown: { rehypePlugins: [rehypeWrapTables] },
  integrations: [
    sitemap({
      // Utility and legal pages carry no search value and would dilute the sitemap.
      filter: (page) => !/\/(404|search|thanks)\/$/.test(page),
    }),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
