# Deploying Going Eagle to Hostinger

The site is a static build. Nothing needs PHP, a database, or WordPress.

## What gets deployed

`npm run build` produces `dist/`. The contents of `dist/` are the website — that is what
goes into `public_html`.

## Option A — Hostinger Git deploy (recommended)

Hostinger can pull directly from this repository, but it deploys the **repository**, not a
build output, so the built files must be committed for this to work end to end. Two ways:

1. **Build locally, commit `dist/`.** Remove `dist/` from `.gitignore`, run `npm run build`,
   commit, and point Hostinger's Git deploy at the branch with `dist` as the directory.
2. **Build in CI.** A GitHub Action runs `npm ci && npm run build` and pushes `dist/` to a
   `deploy` branch. Hostinger's Git deploy tracks `deploy`. This keeps the main branch clean
   and is the better long-term setup.

In hPanel: **Advanced → Git**, add the repository, choose the branch, set the install path to
`public_html`, then use **Deploy** (or set up the auto-deploy webhook).

## Option B — Manual upload

```bash
npm ci
npm run build
```

Then upload everything inside `dist/` to `public_html` via hPanel's File Manager or SFTP.
Include the dotfile `.htaccess` — file managers hide it by default.

## After the first deploy, check

- `https://<domain>/` loads and the theme toggle works
- `https://<domain>/robots.txt` and `/sitemap-index.xml` resolve
- A nested route such as `/tools/handicap-calculator/` loads directly, not only via a link
- `/404.html` is served for a nonexistent path
- Submit the sitemap in Google Search Console

## Before going live on the real domain

`SITE.url` in `src/consts.ts` is currently the staging URL. It drives canonicals, the sitemap,
Open Graph URLs and JSON-LD `@id` values, so **change it before launching on the production
domain** and rebuild. Leaving it wrong will point every canonical at staging.
