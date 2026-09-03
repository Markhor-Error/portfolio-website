# Master Dashboard — Going Eagle

Updated: 2026-09-03

```
WEBSITE
├── Discovery          ✅  Constraints mapped; no SSH, deploy via Git
├── Competitor         ✅  Both references analysed (search-index reconstruction)
├── Architecture       ✅  7 clusters, boundaries defined
├── Opportunity Score  ⏳  Not started
├── Content Map        🔄  Cluster children defined; not yet scored
├── UI/UX              ✅  Design system built, light/dark, verified in browser
├── Approval           ✅  Direction approved by owner
├── WordPress          🔄  Kadence child theme built; not yet deployed
├── Technical SEO      🔄  Schema, canonicals, sitemap, link gate done; CWV untested live
├── Content            🔄  7 pillars + 1 flagship article
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
| Home Golf | ✅ | 9 | 0 |
| Basics | ✅ | 7 | 0 |
| Tools | ✅ | 6 | 2 (ball flight, handicap) |

## Waiting on the owner

1. **Content delivery method** — WP REST API or WXR import file
2. **Mike's photograph** — monogram placeholder until a genuine photo exists
3. **Affiliate program applications** — see `affiliate-programs.md`
4. **Publishing authorisation** — remains locked until explicitly granted

## Risks

- Competitor analysis is reconstructed from search-index data, not direct crawling.
  High confidence on structure and topics; unverified on depth, schema and performance.
  Re-verify once the domain allowlist is live.
- No keyword tool available, so opportunity scores will be judgement-based estimates
  and must be labelled as such. Never invent search volumes.
- Deploying to the wrong path would destroy a paid WordPress + Kadence Pro install.
