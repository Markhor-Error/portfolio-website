# Competitor Intelligence — goinglow.com

**Analyst:** Website Intelligence Engine (Phase 1)
**Date:** 2026-09-03
**Subject site:** https://goinglow.com/
**Our brand:** Going Eagle

## Access note (honesty rule)

Direct crawling of `goinglow.com` was **not possible** from this environment — the network
egress proxy blocks the domain (`EGRESS_BLOCKED`), as it does for the Hostinger target and
most third-party sites. Everything below is reconstructed from **search-index data**: indexed
URLs, title tags, and indexed page excerpts.

What this means for confidence:
- **High confidence:** URL structure, page titles, topic coverage, hub/taxonomy names,
  monetization model, positioning. These come straight from indexed metadata.
- **Medium confidence:** internal-link patterns, on-page depth, content freshness.
- **Not verified:** their schema markup, Core Web Vitals, exact word counts, plugin stack,
  traffic, or rankings. No estimates of these are invented anywhere in this project.

No search-volume figures appear in this project because no keyword tool is available here.
Opportunity scores are explicitly labelled as **judgement-based estimates**.

## 1. Positioning

Their title tag is the positioning statement:

> **"Going Low: How to Break 100, 90 and 80"**

That is a sharp, well-chosen hook. It names the audience (mid-to-high handicap amateurs) by
their actual goal (a score milestone) rather than by a demographic. Their stated mission is
research-driven insight to help everyday golfers shoot lower scores.

**Monetization:** affiliate. They run an `/affiliate-disclosure/` page and state they earn
commissions on purchases made through their links. There is also a `/golf-fix-offer/` page,
which reads as a lead-magnet or email-capture funnel.

## 2. Observed information architecture

Two structural facts stand out.

**a) URLs are flat.** Articles sit at the root: `/how-to-fix-a-slice-in-golf-step-by-step-guide-with-drills/`,
`/best-golf-driver-for-slicers/`, `/what-is-gir-in-golf-and-how-to-know-if-you-are-on-target/`.
There is no `/category/` segment and no topical path. Nothing in the URL tells a user or a
crawler which cluster a page belongs to.

**b) The hubs overlap badly.** Observed hub/taxonomy pages:

| Hub URL | Apparent purpose |
|---|---|
| `/golf-fixes/` | Swing faults |
| `/golf-breakthroughs/` | Improvement / progress |
| `/go-low/` | Scoring |
| `/score-low/` | Scoring |
| `/shaving-strokes/` | Scoring |
| `/golf-instruction/` | Instruction |
| `/sharpen-your-short-game/` | Short game |
| `/golf-shots/` | Shot types |
| `/golf-for-beginners/` | Beginners |
| `/senior-golfers/` | Audience segment |

`/go-low/`, `/score-low/` and `/shaving-strokes/` are three hubs for one intent.
`/golf-fixes/`, `/golf-instruction/` and `/golf-shots/` substantially overlap. An article
about fixing a slice could legitimately be filed under at least four of these. By the
architecture rule in Phase 3 — *if two categories could both hold the same article, the
taxonomy is wrong* — this taxonomy is broken.

## 3. Cannibalization on their own site

This is their clearest structural weakness. On the single topic of **the slice** they have at
minimum four indexed pages:

| URL | Apparent intent |
|---|---|
| `/how-to-fix-a-slice-in-golf-step-by-step-guide-with-drills/` | Informational — how to fix |
| `/how-to-stop-slicing-the-golf-ball/` | Informational — how to fix (**duplicate intent**) |
| `/what-is-a-slice-in-golf/` | Definitional |
| `/best-golf-driver-for-slicers/` | Commercial |

The first two target the same query set with the same intent. The definitional and commercial
pages are legitimately distinct. Additional likely overlaps: `/best-golf-training-aids/` vs
`/best-training-aids-for-golf-tempo-and-timing/`; `/best-golf-beginner-tips/` vs
`/golf-for-beginners/`; `/mastering-the-mental-game-of-golf/` vs
`/specific-steps-to-master-your-mental-game/`.

**Our counter-move:** one canonical page per intent, enforced by the Phase 5 guard and logged
in `cannibalization-log.md`. This is the single highest-leverage advantage available to us,
and it costs nothing to execute.

## 4. Content universe (observed sample)

Confirmed indexed URLs, grouped by the cluster we would place them in.

**Swing fixes:** `/how-to-fix-a-slice-in-golf-step-by-step-guide-with-drills/`,
`/how-to-stop-slicing-the-golf-ball/`, `/what-is-a-slice-in-golf/`,
`/how-to-fix-an-open-clubface-at-impact/`, `/fix-your-golf-swing/`,
`/golf-club-positions/`, `/how-to-use-alignment-sticks-to-fix-your-set-up-in-golf/`

**Scoring / mental / strategy:** `/mastering-the-mental-game-of-golf/`,
`/specific-steps-to-master-your-mental-game/`,
`/what-is-gir-in-golf-and-how-to-know-if-you-are-on-target/`,
`/how-to-choose-the-right-golf-clubs-for-breaking-80/`

**Basics / rules / definitions:** `/golf-scoring-for-beginners/`, `/best-golf-beginner-tips/`,
`/how-to-play-skins-in-golf/`, `/what-is-considered-mid-handicap-in-golf/`,
`/what-is-the-average-golf-handicap/`

**Gear reviews:** `/takomo-golf-review-are-they-right-for-you/`,
`/callaway-edge-10-piece-golf-club-set-review/`,
`/wilson-ultra-golf-clubs-review-best-starter-set-in-2025/`,
`/stix-golf-clubs-review/`, `/zero-friction-golf-balls-review/`,
`/arccos-golf-review-2025/`, `/callaway-paradym-irons-review-distance/`,
`/are-cobra-golf-clubs-good/`

**Gear "best of" / commercial:** `/best-golf-driver-for-slicers/`,
`/best-golf-clubs-for-seniors/`, `/best-golf-clubs-for-tall-men-top-picks-for-2025/`,
`/best-golf-rangefinders-for-mid-handicap-golfers/`,
`/best-golf-swing-analyzers-for-beginners/`, `/best-golf-training-aids/`,
`/best-training-aids-for-golf-tempo-and-timing/`,
`/best-golf-equipment-for-game-improvement-in-2025/`,
`/affordable-golf-simulators-under-1000/`

**Comparison:** `/cobra-vs-taylormade/`, `/what-golf-clubs-do-pros-use/`,
`/7-underrated-golf-brands-making-amazing-equipment/`

**Budget / lifestyle:** `/how-to-play-golf-without-breaking-the-bank/`

**Corporate:** `/about-us/`, `/affiliate-disclosure/`, `/golf-fix-offer/`

## 5. What they do well — worth learning from

1. **Goal-shaped positioning.** "Break 100, 90 and 80" beats "golf tips" because it names the
   reader's actual objective. We should adopt the *principle*, not the phrasing.
2. **Balanced funnel.** They cover definitional, how-to, comparison and commercial intent.
   The informational content feeds the affiliate content. That is the right model.
3. **Audience segmentation that maps to real buying intent.** "for seniors", "for tall men",
   "for mid-handicap", "for beginners" are genuine, distinct commercial queries.
4. **Problem-first framing.** Content is organised around what is going wrong for the reader,
   not around swing theory. Correct instinct.
5. **Visible affiliate disclosure.** Baseline compliance is in place.

## 6. Where they are weak — our openings

| # | Weakness | Our counter |
|---|---|---|
| 1 | Overlapping hubs; three scoring hubs, four instruction-ish hubs | Five clean clusters, one intent each |
| 2 | Self-cannibalizing article set (≥2 duplicate-intent slice pages) | One canonical page per intent, guarded pre-write |
| 3 | Flat URLs with no topical path | `/cluster/slug/` hierarchy with matching breadcrumbs |
| 4 | Titles carry "2025" — visibly ageing in late 2026 | Evergreen titles; dated claims isolated into refreshable blocks |
| 5 | No interactive tools observed anywhere | Six free calculators — genuine utility, link-worthy, AEO-friendly |
| 6 | No public testing methodology observed | `/how-we-test/` with an explicit, honest methodology |
| 7 | Generic "we are golfers" authorship; no named expert observed | Named contributor with a real, verified bio and per-article bylines |
| 8 | Unverified but likely: standard WordPress performance profile | Static-first build; performance as a competitive lever |
| 9 | No benchmark/reference data assets observed | Original reference tables — distances, scoring, gapping — properly sourced |
| 10 | Definitional pages exist but are scattered, not systematised | A structured glossary with entity linking for AEO |

## 7. Strategic read

Going Low is a competent, conventional affiliate content site. It is beatable on
**structure, utility and trust** rather than on volume:

- **Structure** — their taxonomy is genuinely disordered, and that is expensive to fix once
  hundreds of URLs exist. We start clean.
- **Utility** — nobody in this reconstruction of their site offers a calculator or an
  interactive diagnostic. Tools are the widest gap.
- **Trust** — a named reviewer plus a published testing methodology is a step above
  "we are golfers who love the game."

Matching their page count is explicitly **not** a goal. See `opportunity-scores.csv`.
