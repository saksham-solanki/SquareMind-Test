---
phase: 06-content-at-scale
plan: 03
subsystem: content
tags: [mdx, blog, seo, builder-analysis, market-data, due-diligence]

requires:
  - phase: 04-blog-engine
    provides: MDX blog engine with PostMeta frontmatter schema
  - phase: 05-interactive-tools
    provides: RERA verifier, investment scorecard, rental yield calculator tools
provides:
  - 25 Builder Analysis MDX posts with developer reviews and city rankings
  - 30 Market Data MDX posts with price maps and rental yield analysis
  - 25 Due Diligence MDX posts with verification guides and fraud detection
affects: [06-04-content-at-scale, sitemap, seo]

tech-stack:
  added: []
  patterns:
    - Builder review post format with RERA delivery tables, financial health tables, and verdict grades
    - Market data post format with locality-wise price/yield tables
    - Due diligence guide format with step-by-step verification, registrar offices, and red flags sections

key-files:
  created:
    - content/posts/*-review-analysis.mdx (14 builder reviews)
    - content/posts/top-10-builders-*-2026.mdx (9 city builder rankings)
    - content/posts/*-property-prices-micro-market-2026.mdx (9 city price maps)
    - content/posts/*-rental-market-yields-2026.mdx (9 city rental analyses)
    - content/posts/property-due-diligence-*-guide.mdx (9 city DD guides)
    - content/posts/property-*.mdx (16 universal due diligence posts)
  modified: []

key-decisions:
  - "9 cities covered: Mumbai, Bangalore, Hyderabad, Pune, Chennai, Delhi NCR, Kolkata, Ahmedabad, Goa"
  - "Builder reviews include RERA delivery data tables, financial health tables, and letter grades (A to B-)"
  - "Market data posts include locality-wise price per sqft tables with YoY change and segment classification"
  - "Due diligence guides reference actual state RERA portals, registrar offices, and state-specific document names"

patterns-established:
  - "Builder review template: overview, RERA table, financials table, customer feedback, verdict grade, FAQs"
  - "Market data template: zone-by-zone tables with price/sqft, YoY change, segment label"
  - "Due diligence template: step-by-step numbered process, red flags section, FAQ section"

requirements-completed: [CONT-01, CONT-02, CONT-03, CONT-04, CONT-05]

duration: 14min
completed: 2026-03-09
---

# Phase 6 Plan 3: Builder Analysis, Market Data, and Due Diligence Content Summary

**80 SEO-optimized MDX posts across Builder Analysis (25), Market Data (30), and Due Diligence (25) categories with data tables, RERA tool links, and city-specific content for all 9 target cities**

## Performance

- **Duration:** 14 min
- **Started:** 2026-03-09T09:13:31Z
- **Completed:** 2026-03-09T09:27:26Z
- **Tasks:** 2
- **Files created:** 78 new MDX posts

## Accomplishments
- 25 Builder Analysis posts covering 15 major Indian developers (Prestige, DLF, Sobha, Brigade, Lodha, Mahindra, Puravankara, Shapoorji, Tata, Oberoi, L&T, Birla, Embassy, Hiranandani, Adani) plus 9 city top-10 builder rankings plus existing Godrej review
- 30 Market Data posts with locality-wise price/sqft tables and rental yield analysis for all 9 cities, plus 12 national comparative posts (city comparison, FDI impact, infrastructure correlation, supply pipeline, price correction history)
- 25 Due Diligence posts with 9 city-specific verification guides referencing actual registrar offices and state-specific documents (Khata, Patta/Chitta, 7/12 extract), plus 16 universal guides (title verification, EC reading, RERA check, OC/CC, fraud detection)

## Task Commits

Each task was committed atomically:

1. **Task 1: Generate Builder Analysis + Market Data posts** - `04b345b` (feat)
2. **Task 2: Generate Due Diligence posts** - `040ed6b` (feat)

## Files Created
- `content/posts/*-review-analysis.mdx` (14 files) - Individual builder reviews with RERA data, financials, verdict
- `content/posts/top-10-builders-*-2026.mdx` (9 files) - City-wise builder rankings
- `content/posts/*-property-prices-micro-market-2026.mdx` (9 files) - City price maps by locality
- `content/posts/*-rental-market-yields-2026.mdx` (9 files) - City rental yield analysis
- `content/posts/property-price-index-*.mdx` and 11 other national market data posts
- `content/posts/property-due-diligence-*-guide.mdx` (9 files) - City-specific DD guides
- `content/posts/property-title-verification-*.mdx` and 15 other universal DD posts

## Decisions Made
- 9 cities selected: Mumbai, Bangalore, Hyderabad, Pune, Chennai, Delhi NCR, Kolkata, Ahmedabad, Goa
- Builder grades use letter system (A to B-) based on delivery track record, financial health, quality, and buyer feedback
- Market data includes specific price ranges in INR/sqft with YoY change percentages
- Due diligence guides reference actual state RERA portal URLs and local document names (Khata for Karnataka, Patta/Chitta for Tamil Nadu, 7/12 for Maharashtra/Gujarat)
- All builder and due diligence posts link to /tools/rera-verifier; market data posts link to /tools/investment-scorecard and /tools/rental-yield

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 80 new posts bring total content to 214 MDX posts across all categories
- All posts have valid PostMeta frontmatter, unique slugs, and internal tool links
- Ready for Phase 6 Plan 4 (remaining content categories if applicable)

## Self-Check: PASSED

- SUMMARY.md exists: YES
- Commit 04b345b exists: YES
- Commit 040ed6b exists: YES
- Builder Analysis posts: 25
- Market Data posts: 30
- Due Diligence posts: 25

---
*Phase: 06-content-at-scale*
*Completed: 2026-03-09*
