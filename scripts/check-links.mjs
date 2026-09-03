/**
 * Fails the build on any internal link that does not resolve to a built page or
 * asset. The sitewide nav makes a single bad href appear on every page, so this
 * check is worth having in CI rather than relying on spotting it in review.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(DIST);
const toUrl = (p) => '/' + relative(DIST, p).split(sep).join('/');

const pages = new Set(
  files.filter((f) => f.endsWith('.html')).map((f) => toUrl(f).replace(/index\.html$/, '')),
);
const assets = new Set(files.map(toUrl));

const broken = [];
for (const file of files.filter((f) => f.endsWith('.html'))) {
  const src = toUrl(file).replace(/index\.html$/, '');
  const html = readFileSync(file, 'utf8');
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (pages.has(href) || assets.has(href) || href.startsWith('/_astro/')) continue;
    broken.push(`${src} -> ${href}`);
  }
}

const unique = [...new Set(broken)];
if (unique.length) {
  console.error(`\n${unique.length} broken internal link(s):`);
  for (const b of unique) console.error('  ' + b);
  process.exit(1);
}
console.log(`Link check passed: ${pages.size} pages, no broken internal links.`);
