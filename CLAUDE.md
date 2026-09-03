# Going Eagle — project context

Read this first. It carries the decisions, constraints and current state so a new
session does not re-derive or re-research anything already settled.

**Owner:** Hashir · **Brand:** Going Eagle · **Niche:** golf improvement + equipment
**Branch:** whichever branch the session assigns. Past work: `claude/going-eagle-website-dev-gzkqxs`,
then `claude/home-golf-cluster-k9ju8o` (Home Golf cluster). Follow the session's branch, not this line.
**Framework:** the `website-intelligence-engine` skill. Invoke it when doing strategy,
content planning or QA work. It is the agreed operating method for this project.

---

## The deployment target — read before touching deploys

The staging site **`lawngreen-donkey-777239.hostingersite.com` runs WordPress with
Kadence Pro** (a paid plugin/theme the owner has licensed).

> **Deploy to `public_html/wp-content/themes/going-eagle/` — NEVER to `public_html`.**
> Copying a static build into the web root would overwrite the WordPress install and
> the paid Kadence setup. If setting up Hostinger Git deploy (hPanel → Advanced →
> Git), the install path is the entire safety story.

There is **no SSH from a Claude session**, and credentials will not change that: the
container has no `ssh`/`scp`/`sftp` binary and all non-443 outbound TCP is blocked.
Do not ask the owner for SSH details. Deployment happens via Hostinger Git deploy or
the owner running commands. See `DEPLOY.md`.

## Repository layout

| Path | What it is |
|---|---|
| `project/` | Strategy deliverables. Competitor intelligence, IA, affiliate research. Reference, not deployed. |
| `theme/going-eagle/` | **The deployable artifact.** Kadence child theme. See its README. |
| `src/` | Astro site. Used to draft, preview and verify pages fast. Not deployed to a WordPress host. |
| `src/content/articles/` | **Source of truth for article content**, as Markdown with SEO front matter. |
| `src/data/ballflight.json` | Canonical ball-flight data, shared by the Astro tool and the theme. |
| `scripts/` | `check-links.mjs` (build gate), `sync-theme-data.mjs` (JSON → theme JS). |

## Commands

```bash
npm run build        # build the Astro preview site
npm run check:links  # fail on any broken internal link (also runs in CI)
npm run sync:theme   # regenerate theme ball-flight data from the JSON
php -l <file>        # PHP lints locally; use it on every theme change
```

---

## Editorial model — do not "simplify" this

Articles are written by the **Going Eagle Editorial Team**. **Mike Evans is an expert
reviewer, not an author**, and must never be rendered as a post author or byline.

Mike's real credentials, as supplied by the owner:

- Golf coach with **six years of hands-on coaching experience**
- Reviews golf content before publication for accuracy, practical usefulness and
  soundness of advice; gives feedback and approves the final version
- Credential line: *"Reviewed and approved by Mike Evans, Golf Coach — 6 years of
  coaching experience."*
- **No handicap index is published** — there is no verified figure to substantiate one
- **No photograph yet.** The site does not use stock or AI-generated portraits to
  represent real people. An initials monogram stands in until a genuine photo exists.

In code: `going_eagle_author()` vs `going_eagle_reviewer()`; schema sets `author` to
the Organization and `reviewedBy`/`contributor` to the Person. `_going_eagle_reviewed`
is per-post meta defaulting to **false** — never default it true, never set it in bulk.
Astro front matter mirrors this with `reviewed: false`.

## Standing rules

1. **No invented credentials, statistics, test results or affiliate links.** If a
   figure is unavailable, say so rather than estimating one.
2. **Nothing is described as "tested" unless it was.** `/gear/how-we-test/` publishes
   three evidence labels: hands-on, fitted data, research-based.
3. **Commission never reorders a recommendation.** Stated publicly; hold to it.
4. **Publishing stays locked.** Content is drafted, never auto-published, until the
   owner explicitly authorises it.
5. **One intent, one page.** Check for cannibalization before creating any page.
6. **No year in any slug.** Dated claims go in refreshable on-page blocks. Both
   competitors are visibly rotting because they put years in titles.
7. **No broken internal links.** New nav entries are gated behind `ready: true` in
   `src/consts.ts` and flipped in the same commit that adds the page.
8. **Competitors are research input only.** Never copy or closely paraphrase their text.

---

## Competitive position (full detail in `project/`)

Two references: **goinglow.com** and **golferlogic.com**. Both are competent affiliate
sites sharing three structural flaws — disordered taxonomy, flat URLs with no topical
path, and **zero interactive tools**.

- Going Low positions on score milestones ("Break 100, 90 and 80") but has ten
  overlapping hubs and cannibalizes itself (4+ pages on the slice alone).
- Golfer Logic's real asset is a deep **home golf / simulator** cluster, the only part
  of their site refreshed to 2026. Half their other titles still say 2023.
- **The biggest opening: home golf / simulators.** $1,000–$20,000 purchases. Golfer
  Logic proved it earns; Going Low has left it open.
- **The widest gap: interactive tools.** Neither competitor has any.

Beat them on **structure, tools, freshness discipline and trust** — never on volume.

## Architecture: seven clusters, one intent each

`/fixes/` · `/short-game/` · `/scoring/` · `/gear/` · `/home-golf/` · `/basics/` · `/tools/`

Hard boundaries that prevent the competitors' failure mode:

- **Fixes vs Scoring** — mechanics of one bad shot vs decisions across 18 holes
- **Fixes vs Gear** — change your motion vs change your equipment
- **Gear vs Home Golf** — carried to the course vs built in the garage
- **Basics vs everything** — what a thing *is* vs how to do it well
- Audience segments ("for seniors", "for beginners") are **gear modifiers, not
  clusters**. They live in `/gear/`. This is exactly the mistake that produced Going
  Low's `/senior-golfers/` hub.

Full site tree and internal-link rules: `project/information-architecture.md`.

---

## Current state

**Done**
- Phases 0–6 strategy docs in `project/`
- Astro preview site: 20 pages, builds clean, zero broken links
- Design system with light/dark tokens
- Trust pages: editorial policy, how-we-test, affiliate disclosure, about, contact,
  Mike's reviewer profile, privacy, terms
- Seven cluster pillars with original prose
- `/fixes/slice/` — flagship article, consolidating what Going Low splits across 4 URLs
- **Home Golf commercial core: 5 articles** — `/home-golf/simulators/` (build: room geometry
  and build order), `/launch-monitors/` (measured vs modelled, as a method not a product list),
  `/simulator-cost/` (cost structure and cost-per-round; no price figures), `/hitting-mats/`,
  `/hitting-nets/`
- Three working tools: ball flight diagnostic (9 flights + strike faults, D-plane based,
  mirrors for left-handers), a WHS handicap calculator, and the simulator space and budget
  planner (`/tools/simulator-budget/` — room geometry check plus a split of the reader's own
  budget; the differentiator neither competitor has)
- Kadence child theme with byline, schema and all three tools as shortcodes
- CI: builds, link-checks, pushes `dist/` to a `deploy` branch

**Open decisions**
- **How content reaches WordPress:** REST API (application password, needs the domain
  allowlisted) or a generated WXR import file (works with no network access). Not yet
  chosen by the owner.
- Whether to keep the Astro site as a preview tool long-term.

**Next up**
1. Remaining Home Golf children: impact screens, enclosures, putting greens, practice-at-home
2. Remaining `/fixes/` children (hook, shank, fat, thin, push/pull)
3. Remaining tools: scoring benchmark, wedge gapping, club distances
4. Glossary as the entity hub for AI search
5. Candidate page — "golf simulator room dimensions" is a real standalone intent that Golfer
   Logic ranks a dedicated page for. Currently served as an H2 on `/home-golf/simulators/`
   plus the planner tool. Split it out only if the pillar section proves too cramped; do not
   create it as a near-duplicate.

**Not started:** opportunity scoring CSV, cannibalization log, freshness register.

## Affiliate status

The owner has **no affiliate programs yet**. `project/affiliate-programs.md` holds the
application shortlist and order. Every rate in it came from third-party roundups and is
flagged unverified — do not repeat those numbers as fact. Priority applications:
Shop Indoor Golf, SkyTrak, Rain or Shine (the high-value simulator cluster), then
Callaway, TaylorMade, Global Golf, Austad's, Bushnell, Arccos.

## Environment notes

- Network access is governed by the cloud environment's policy (environment: "Hashir").
  Domain changes require a **new session** — a running session keeps its old policy.
- GitHub push works. **Verified 2026-09-03: `golferlogic.com`, `goinglow.com` and the staging
  domain all respond.** Competitor structure can now be checked directly rather than
  reconstructed. Still verify with a real fetch at the start of a session — a policy change
  needs a new session to take effect.
