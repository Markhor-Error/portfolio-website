# Deploying Going Eagle

> **STOP — read this first.**
> The staging site `lawngreen-donkey-777239.hostingersite.com` runs **WordPress with
> Kadence Pro**. Copying a static build into `public_html` would overwrite that
> installation and destroy the paid theme setup. **Do not do it.**
>
> The deployment target below is a WordPress **child theme**, not the web root.

## Current state of this repository

This repo currently contains two things:

1. **`project/`** — the strategy deliverables (competitor intelligence, information
   architecture, affiliate research). Reference material, not deployed.
2. **An Astro static site** — built while the WordPress stack was unknown. Its design
   tokens, page copy, schema logic and interactive tools are being ported to the Kadence
   child theme; the Markdown content in `src/content/` is the source of truth for articles
   either way.

The Astro build is **not** the deployment artifact for a WordPress host. It is kept as the
reference implementation and as a way to preview pages quickly.

## Deployment target: `theme/going-eagle/`

The WordPress child theme is the thing that gets deployed. It goes to:

```
public_html/wp-content/themes/going-eagle/
```

Nothing outside `wp-content/themes/going-eagle/` is touched by a deploy. WordPress core,
plugins, uploads and the database are all left alone.

## Option A — Hostinger Git deploy (recommended)

In hPanel: **Advanced → Git**

- Repository: this repo
- Branch: `claude/going-eagle-website-dev-gzkqxs`
- **Install path: `public_html/wp-content/themes/going-eagle`**

Getting the install path right is the whole safety story. Pointed at `public_html`, a deploy
would clobber the WordPress install.

## Option B — Manual upload

Zip `theme/going-eagle/` and install it through **WP Admin → Appearance → Themes → Add New →
Upload Theme**. WordPress puts it in the right place and will not overwrite anything else.

## Content

Articles live as Markdown in `src/content/articles/`, with front matter carrying the SEO
metadata, decay class, review date, page purpose and original-value notes. They reach
WordPress by one of:

- **WP REST API** — direct push using an application password. Needs the staging domain
  allowlisted in the Claude Code environment's network policy first.
- **WXR import file** — generated from the same Markdown and imported through
  **Tools → Import**. Works with no network access at all.

Either way the Markdown stays the source of truth, so content is never trapped in the CMS.

## Before going live on the real domain

`SITE.url` in `src/consts.ts` and the corresponding constant in the theme point at the
staging URL. They drive canonicals, sitemap entries and JSON-LD `@id` values, so **update
them before launching on the production domain**.

## Post-deploy checklist

- Kadence Pro is still active and its licence still registered
- The child theme is active and its parent (Kadence) resolves
- Existing pages and media still load
- `/robots.txt` and the sitemap resolve
- A nested route loads directly, not only by following a link
