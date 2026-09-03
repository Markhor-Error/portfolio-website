import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return rss({
    title: `${SITE.name} — golf improvement, measured`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: articles
      .sort((a, b) => +new Date(b.data.published) - +new Date(a.data.published))
      .map((a) => ({
        title: a.data.title,
        description: a.data.description,
        pubDate: new Date(a.data.published),
        link: `/${a.id}/`,
      })),
  });
}
