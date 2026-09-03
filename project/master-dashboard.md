# Master Dashboard — Going Eagle

Updated: 2026-09-03 (Home Golf cluster session)

```
WEBSITE
├── Discovery          ✅  Constraints mapped; no SSH, deploy via Git
├── Competitor         ✅  Both references analysed; Golfer Logic re-verified by direct fetch
├── Architecture       ✅  7 clusters, boundaries defined
├── Opportunity Score  ⏳  Not started
├── Content Map        🔄  Cluster children defined; not yet scored
├── UI/UX              ✅  Design system built, light/dark, verified in browser
├── Approval           ✅  Direction approved by owner
├── WordPress          🔄  Kadence child theme built; not yet deployed
├── Technical SEO      🔄  Schema, canonicals, sitemap, link gate done; CWV untested live
├── Content            🔄  7 pillars + 6 articles (Home Golf commercial core done)
├── Images             ⏳  SVG diagram done; hero images not started
├── Internal Links     ✅  Zero broken links, CI-enforced
├── External Links     ⚠️  Blocked — owner has no affiliate programs yet
├── Freshness          ⏳  Decay classes in front matter; register not built
├── QA                 🔄  Build + link check automated; full QA pass pending
└── Publishing         🔒  LOCKED — owner authorisation required
```

## Cluster progress

| Cluster | Pillar | Children planned | Drafted |
|---|---|---|---|
| Fixes | ✅ | 8 | 1 (slice) |
| Short Game | ✅ | 7 | 0 |
| Scoring | ✅ | 7 | 0 |
| Gear | ✅ | 9 | 1 (how-we-test) |
| Home Golf | ✅ | 9 | **5** (build, launch monitors, cost, mats, nets) |
| Basics | ✅ | 7 | 0 |
| Tools | ✅ | 6 | 3 (ball flight, handicap, simulator planner) |

## Fixed this session

- **False credential on every Astro page.** `ReviewerBadge` printed "Reviewed by Mike Evans,
  Golf Coach — 6 years of coaching experience" on every article and tool, while every article
  carries `reviewed: false` and the JSON-LD correctly omitted `reviewedBy`. The WordPress theme
  already gated this properly; Astro now matches it. Unreviewed pages say so plainly.
- **Two cannibalization conflicts in the IA**, both resolved and documented in
  `information-architecture.md`: launch monitors were planned under `/gear/` *and* `/home-golf/`
  (now Home Golf only), and `/home-golf/simulators/` was planned to own the cost intent that
  `/home-golf/simulator-cost/` exists for (now build vs money, cleanly split).

## Waiting on the owner

1. **Content delivery method** — WP REST API or WXR import file
2. **Mike's photograph** — monogram placeholder until a genuine photo exists
3. **Affiliate program applications** — see `affiliate-programs.md`
4. **Publishing authorisation** — remains locked until explicitly granted
5. **Verified component pricing** — the cost guide and the planner deliberately publish no
   price figures, per standing rule 1. Both carry a refreshable slot for real numbers once
   the owner has pricing we can stand behind.

## Risks

- ~~Competitor analysis is reconstructed from search-index data, not direct crawling.~~
  **Resolved 2026-09-03.** Both competitor domains and the staging domain now respond, so
  Golfer Logic's structure was verified directly from its sitemap. Findings held up: flat URLs
  with no topical path, years baked into titles (`diy-golf-simulator` still reads "2026", their
  simulator round-up "Our Top Picks For 2026"), and three overlapping budget-intent pages —
  a cost guide, a "cheap simulator under $1000" page and a "DIY sub $5000" page. That is the
  cannibalization our single cost guide plus the planner tool is built to beat.
  Still unverified: their depth, schema and Core Web Vitals.
- No keyword tool available, so opportunity scores will be judgement-based estimates
  and must be labelled as such. Never invent search volumes.
- Deploying to the wrong path would destroy a paid WordPress + Kadence Pro install.
