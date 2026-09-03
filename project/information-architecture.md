# Information Architecture — Going Eagle

**Phase 3 deliverable. Requires owner approval (Gate 2) before the content map is finalised.**

## Brand positioning

**Going Eagle** — *Play your best golf, backed by data.*

The reference site positions on score milestones ("Break 100, 90 and 80"). That hook works,
and we keep the *principle* — organise around the reader's goal — but not the phrasing, and we
add the thing they do not have: **measurement**. Going Eagle's promise is that you can find out
what is actually costing you strokes, then fix that specific thing.

This gives us a defensible identity rather than a second version of theirs:

| | Going Low | Going Eagle |
|---|---|---|
| Promise | Tips to shoot lower scores | Diagnose what costs you strokes, then fix it |
| Proof | "We are golfers" | Named reviewer + published test methodology |
| Utility | Articles | Articles **plus six free tools** |
| Structure | 10 overlapping hubs | 5 clusters, one intent each |

## Site tree

```
HOME  /
│
├── FIXES  /fixes/                          [Pillar: Diagnose Your Ball Flight]
│   ├── /fixes/slice/                       ← canonical slice page
│   ├── /fixes/hook/
│   ├── /fixes/topped-shots/
│   ├── /fixes/fat-shots/
│   ├── /fixes/shank/
│   ├── /fixes/push-and-pull/
│   ├── /fixes/early-extension/
│   └── /fixes/casting/
│
├── SHORT GAME  /short-game/                [Pillar: Where Amateurs Lose Strokes]
│   ├── /short-game/chipping/
│   ├── /short-game/pitching/
│   ├── /short-game/bunker-play/
│   ├── /short-game/putting/
│   ├── /short-game/distance-control/
│   ├── /short-game/green-reading/
│   └── /short-game/wedge-gapping/
│
├── SCORING  /scoring/                      [Pillar: The Scoring Roadmap]
│   ├── /scoring/break-100/
│   ├── /scoring/break-90/
│   ├── /scoring/break-80/
│   ├── /scoring/course-management/
│   ├── /scoring/mental-game/
│   ├── /scoring/practice-plans/
│   └── /scoring/average-golf-scores/
│
├── GEAR  /gear/                            [Pillar: How to Buy Golf Equipment]
│   ├── /gear/how-we-test/                  ← trust asset
│   ├── /gear/drivers/          + reviews & best-for pages
│   ├── /gear/irons/
│   ├── /gear/wedges/
│   ├── /gear/putters/
│   ├── /gear/balls/
│   ├── /gear/rangefinders/
│   ├── /gear/launch-monitors/
│   ├── /gear/training-aids/
│   └── /gear/complete-sets/
│
├── HOME GOLF  /home-golf/                  [Pillar: Build a Home Practice Setup]
│   ├── /home-golf/simulators/
│   ├── /home-golf/launch-monitors/
│   ├── /home-golf/hitting-nets/
│   ├── /home-golf/hitting-mats/
│   ├── /home-golf/impact-screens/
│   ├── /home-golf/enclosures/
│   ├── /home-golf/putting-greens/
│   ├── /home-golf/simulator-cost/
│   └── /home-golf/practice-at-home/
│
├── BASICS  /basics/                        [Pillar: Golf, Explained]
│   ├── /basics/how-to-start-golf/
│   ├── /basics/scoring-explained/
│   ├── /basics/handicap-explained/
│   ├── /basics/rules-essentials/
│   ├── /basics/etiquette/
│   ├── /basics/formats/                    (skins, scramble, stableford, match play)
│   └── /basics/glossary/                   ← entity hub for AEO
│
├── TOOLS  /tools/                          [Differentiator — no equivalent observed]
│   ├── /tools/handicap-calculator/
│   ├── /tools/scoring-benchmark/
│   ├── /tools/ball-flight-diagnostic/
│   ├── /tools/club-distance-chart/
│   ├── /tools/wedge-gapping/
│   ├── /tools/strokes-gained/
│   └── /tools/simulator-budget/
│
└── SITE
    ├── /about/
    ├── /authors/mike-evans/
    ├── /editorial-policy/
    ├── /affiliate-disclosure/
    ├── /contact/
    ├── /privacy/  /terms/
    ├── /search/  /404
    └── /sitemap.xml  /rss.xml
```

### Navigation

Seven clusters is too many for a flat menu, so the primary nav is **four items with mega-menu
panels**. Each panel exposes its pillar plus its top children, which gives every pillar a
sitewide inbound link — better for crawl depth than burying pillars in a dropdown.

| Nav item | Panel contents |
|---|---|
| **Improve** | Fixes · Short Game · Scoring (pillars + top 4 children each) |
| **Gear** | Clubs & Equipment · Home Golf (sub-hubs + How We Test) |
| **Tools** | All seven tools, listed flat |
| **Learn** | Basics pillar · Glossary · How We Test · About |

Everything on the site is within three clicks of the homepage.

## Cluster definitions

### 1. Fixes — `/fixes/`
- **Purpose:** own "my ball is doing X, make it stop." Highest-volume amateur pain.
- **Audience:** 15–30 handicap, frustrated, searching mid-problem.
- **Intent owned:** informational, problem-first.
- **Pillar:** *Diagnose Your Ball Flight* — a decision tree from miss → cause → fix.
- **Commercial destination:** `/gear/training-aids/`, `/gear/drivers/` (draw-bias), `/tools/ball-flight-diagnostic/`.
- **Internal-link rule:** every fix page links **up** to `/fixes/`, **across** to one drill on the
  relevant short-game or scoring page, and **down** to the diagnostic tool. The pillar links
  down to all eight.

### 2. Short Game — `/short-game/`
- **Purpose:** own the scoring zone, where amateurs actually lose most strokes.
- **Audience:** anyone who has stopped blaming their driver.
- **Intent owned:** informational + drill-seeking.
- **Pillar:** *Where Amateurs Lose Strokes* — with data on shot distribution by handicap.
- **Commercial destination:** `/gear/wedges/`, `/gear/putters/`, `/gear/training-aids/`.
- **Internal-link rule:** children link up to the pillar and across to `/tools/wedge-gapping/`.

### 3. Scoring — `/scoring/`
- **Purpose:** own the goal-shaped queries the reference site is strongest on, but with one
  clean page per milestone instead of three competing hubs.
- **Audience:** golfers with a specific number in mind.
- **Intent owned:** informational, strategy — explicitly *not* swing mechanics. That
  boundary is what stops it cannibalizing `/fixes/`.
- **Pillar:** *The Scoring Roadmap* — what changes at each milestone.
- **Commercial destination:** `/gear/rangefinders/`, `/gear/launch-monitors/`, `/tools/scoring-benchmark/`.
- **Internal-link rule:** milestone pages link to each other in sequence (100 → 90 → 80) and up
  to the pillar. Each links out to the *one* fix cluster most relevant to that scoring band.

### 4. Gear — `/gear/`
- **Purpose:** the revenue cluster. Every other cluster feeds it.
- **Audience:** in-market buyers.
- **Intent owned:** commercial investigation + transactional.
- **Pillar:** *How to Buy Golf Equipment* — fitting basics, what matters, what does not.
- **Commercial destination:** itself. Affiliate links, disclosed.
- **Internal-link rule:** every review links up to its category sub-hub, across to the relevant
  fix or short-game page that explains *why* the gear matters, and to `/gear/how-we-test/`.
- **Integrity rule:** `how-we-test` states our method honestly, including its limits. We never
  reorder a recommendation because of commission rate.

### 4b. Home Golf — `/home-golf/`

- **Purpose:** the *highest-value* commercial cluster on the site. Simulators, launch monitors
  and enclosures are $1,000–$20,000 purchases; one conversion here outweighs a hundred glove
  sales. Golfer Logic has proven the territory works and Going Low has left it open.
- **Audience:** golfers building a practice setup at home — a project mindset, researching for
  weeks, high intent, high budget.
- **Intent owned:** commercial investigation, "how much does X cost", "how do I build X".
- **Pillar:** *Build a Home Practice Setup* — a budget-tiered build guide.
- **Commercial destination:** itself.
- **Differentiator:** `/tools/simulator-budget/` — pick a budget and a space, get a component
  list. Neither competitor has anything like it, and it converts directly into the affiliate
  pages.
- **Internal-link rule:** components link up to the pillar and across to the budget tool. The
  cost guide is the hub-and-spoke centre; every component page links to it.

**Boundary vs Gear:** `/gear/` is what you carry to the course. `/home-golf/` is what you build
in your garage. A hitting mat is Home Golf. A golf bag is Gear. No page belongs in both.

### 5. Basics — `/basics/`
- **Purpose:** top-of-funnel capture, entity/definitional coverage, and the AEO engine.
- **Audience:** new golfers and anyone querying a term.
- **Intent owned:** definitional and navigational.
- **Pillar:** *Golf, Explained*.
- **Commercial destination:** `/gear/complete-sets/`.
- **Internal-link rule:** the glossary is the entity hub — every defined term links to the
  cluster page that treats it in depth, and deep pages link back to the glossary entry on
  first use of a term. This is the strongest internal-link asset on the site.

### 6. Tools — `/tools/`
- **Purpose:** utility, differentiation, natural link acquisition, repeat visits.
- **Intent owned:** transactional-utility ("calculate", "chart", "work out my …").
- **Commercial destination:** contextual — each tool routes to the gear category it implies.
- **Internal-link rule:** every tool embeds a link to the pillar that explains the concept, and
  every pillar embeds its matching tool. Tools are never orphans.

## Architecture rules in force

1. One cluster per article. No cross-filing.
2. One pillar per cluster. Six clusters, six pillars.
3. Every cluster names a commercial destination.
4. Supporting → pillar (up), pillar → supporting (down), pillar → commercial (across).
5. Three clicks maximum from home to anything.
6. **Audience segments are not clusters.** "For seniors", "for beginners", "for tall players"
   are gear-buying modifiers, so those pages live in `/gear/`, never as a parallel hub. This is
   the specific mistake that produced the reference site's `/senior-golfers/` hub.
7. Nothing is planned as an orphan. Any page without a planned inbound link is cut.

## Cannibalization boundaries (the hard lines)

These four boundaries prevent the failure mode observed on the reference site:

| Boundary | Rule |
|---|---|
| Fixes vs Scoring | Fixes = *mechanics of one bad shot*. Scoring = *decisions across 18 holes*. A page about club selection off the tee is Scoring. A page about why the face is open is Fixes. |
| Fixes vs Gear | Fixes = *change your motion*. Gear = *change your equipment*. `/fixes/slice/` may mention draw-bias drivers in one paragraph and link out; the buying guide lives at `/gear/drivers/`. |
| Basics vs everything | Basics = *what a thing is*. Clusters = *how to do it well*. `/basics/glossary/` defines "GIR"; `/scoring/` teaches how to hit more greens. |
| Gear vs Home Golf | Gear = carried to the course. Home Golf = built at home. Mats, screens, nets, enclosures are Home Golf. Clubs, balls, bags, rangefinders are Gear. |
| One intent, one page | "How to fix a slice" and "how to stop slicing" are the same intent. One page. Variants become H2 sections, never separate URLs. |

## URL and breadcrumb conventions

- Pattern: `/{cluster}/{slug}/` — lowercase, hyphenated, no dates, no stop-word padding.
- No year in any slug. Dated claims live in refreshable on-page blocks, not URLs, so the
  "2025" decay visible on the reference site cannot happen to us.
- Breadcrumbs mirror the path exactly: `Home › Gear › Drivers › {Review}`, with
  `BreadcrumbList` schema.
- Trailing slash, canonical self-reference on every indexable page.
- Paginated archives: `noindex, follow` beyond page 1.
