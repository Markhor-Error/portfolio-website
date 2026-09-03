# Going Eagle — Kadence child theme

Deploys to `public_html/wp-content/themes/going-eagle/`. Never to `public_html` itself.

## What this theme adds

Kadence Pro already handles layout, headers and templating, so this child theme is
deliberately small. It adds only what Kadence cannot know about:

| File | Responsibility |
|---|---|
| `inc/reviewer.php` | Editorial byline. Written by the team, reviewed by Mike. |
| `inc/schema.php` | Structured data, including the reviewer relationship. |
| `inc/tools.php` | The calculators, as shortcodes. |
| `assets/css/going-eagle.css` | Brand tokens and component styles. |
| `assets/js/*` | Tool behaviour. No dependencies, no network, no storage. |

## Install

1. Zip the `going-eagle` directory.
2. **Appearance → Themes → Add New → Upload Theme**, then activate.
3. Kadence (the parent) must remain installed. Do not delete it.
4. Enter the palette from the top of `assets/css/going-eagle.css` into
   **Appearance → Customize → Colors** so Kadence's own components match.

## Shortcodes

| Shortcode | Output |
|---|---|
| `[ge_byline]` | Byline block. Add `compact="true"` for the small variant. Auto-prepended to single posts unless the shortcode is present in the content. |
| `[ge_ball_flight]` | Ball flight diagnostic. |
| `[ge_handicap]` | Handicap index calculator. |
| `[ge_sim_budget]` | Simulator space check and budget split. Publishes no prices — it splits the reader's own budget. |
| `[ge_faq]…[/ge_faq]` | FAQ accordion that also emits `FAQPage` schema. |
| `[ge_q question="…"]answer[/ge_q]` | One FAQ entry. Must sit inside `[ge_faq]`. |

Tool scripts load only on pages whose content contains the matching shortcode.

## The reviewer model — please do not "simplify" this

Articles are authored by the **Going Eagle Editorial Team**. Mike Evans is an
**expert reviewer**: he reads golf content before publication and approves it. He is
not a post author and must never be rendered as one.

In code this means:

- `going_eagle_author()` supplies the author; `going_eagle_reviewer()` supplies the reviewer.
- Article schema sets `author` to the Organization, and `reviewedBy` / `contributor`
  to the Person — only when the post is actually marked reviewed.
- `_going_eagle_reviewed` is per-post and defaults to **false**. A post is never
  described as reviewed until an editor sets it. Do not default it to true, and do
  not set it in bulk.
- The avatar is an initials monogram. The site does not use stock or AI-generated
  portraits to represent real people. Set `photo_id` in `going_eagle_reviewer()` only
  when a genuine photograph of Mike exists.

These are editorial commitments published at `/editorial-policy/`, not display
preferences.

## Schema and SEO plugins

If Yoast, Rank Math, SEOPress or AIOSEO is active, that plugin owns the
Organization, WebSite, Article and Breadcrumb nodes, and this theme emits **only**
the reviewer Person node plus the `reviewedBy` relationship — because two competing
graphs on one page is worse than one. With no SEO plugin, the theme emits the full
graph itself. Extend via the `going_eagle_schema_nodes` filter.

## Data

`assets/js/ball-flight-data.js` is **generated**. The source of truth is
`src/data/ballflight.json` at the repository root; regenerate with:

```bash
npm run sync:theme
```

Editing the generated file directly will be overwritten. Copy in that data must use
**lead/trail** for body references, never left/right — the left-handed mirroring
flips every standalone "left" and "right".
