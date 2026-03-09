---
phase: 06-content-at-scale
plan: 02
subsystem: content
tags: [mdx, blog, seo, nri, tax, first-time-buyers]

requires:
  - phase: 04-blog-engine
    provides: MDX blog infrastructure and PostMeta schema
  - phase: 05-interactive-tools
    provides: Calculator tools (nri-tax, stamp-duty, emi, buy-vs-rent, total-cost)
provides:
  - 79 SEO-optimized MDX blog posts across NRI Corner, Tax & Legal, and First-Time Buyers categories
  - Internal tool links driving traffic from content to interactive calculators
  - City-specific content for all 9 target cities
affects: [06-content-at-scale, seo, blog]

tech-stack:
  added: []
  patterns:
    - "City-specific posts with local stamp duty rates, builder names, and regulatory data"
    - "Category-appropriate tool linking (NRI -> nri-tax-calculator, Tax -> stamp-duty-calculator, FTB -> emi-calculator/buy-vs-rent)"
    - "Data tables in every post for SEO featured snippet targeting"

key-files:
  created:
    - content/posts/nri-guide-buying-property-{city}-2026.mdx (9 files)
    - content/posts/stamp-duty-registration-charges-{city}-2026.mdx (9 files)
    - content/posts/first-home-buyer-guide-{city}-2026.mdx (9 files)
    - content/posts/*.mdx (52 universal topic posts)
  modified: []

key-decisions:
  - "Existing capital-gains-tax-property-india.mdx counted toward Tax & Legal total (25 including it), created 15 new universal Tax posts"
  - "Carpet area explainer post included in First-Time Buyers despite existing carpet-area-super-built-up-area-scam.mdx (different category and angle)"

patterns-established:
  - "NRI posts always link to /tools/nri-tax-calculator"
  - "Tax & Legal posts always link to /tools/stamp-duty-calculator"
  - "First-Time Buyers posts link to /tools/emi-calculator and /tools/buy-vs-rent"
  - "All posts include CTA link to /consultation"

requirements-completed: [CONT-01, CONT-02, CONT-03, CONT-04, CONT-05]

duration: 15min
completed: 2026-03-09
---

# Phase 6 Plan 02: NRI, Tax & Legal, First-Time Buyers Content Summary

**79 SEO-optimized MDX blog posts across NRI Corner (26), Tax & Legal (25), and First-Time Buyers (30) with city-specific data, tool links, and consultation CTAs**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-09T09:13:17Z
- **Completed:** 2026-03-09T09:28:00Z
- **Tasks:** 2
- **Files created:** 79

## Accomplishments

- 26 NRI Corner posts covering FEMA rules, NRO/NRE accounts, POA execution, country-specific tax implications (US/UK/Canada/UAE), and city-specific investment guides for all 9 cities
- 25 Tax & Legal posts covering stamp duty by city, capital gains, Section 54 exemptions, GST rules, RERA guide, and legal verification checklists
- 30 First-Time Buyers posts with beginner-friendly guides for all 9 cities, plus practical topics (PMAY, negotiation, hidden costs, builder verification, loan comparison)
- All posts include data tables, comparison charts, and specific numerical data for SEO featured snippet targeting

## Task Commits

Each task was committed atomically:

1. **Task 1: NRI Corner + Tax & Legal posts** - `3a393b8` (feat)
2. **Task 2: First-Time Buyers posts** - `34896cd` (feat)

## Files Created

- `content/posts/nri-guide-buying-property-{city}-2026.mdx` (9 cities) - City-specific NRI investment guides
- `content/posts/fema-rules-nri-property-investment-india-2026.mdx` - FEMA compliance guide
- `content/posts/nro-vs-nre-account-property-purchase-guide.mdx` - NRO vs NRE comparison
- `content/posts/power-of-attorney-nri-property-buyers.mdx` - POA execution guide
- `content/posts/nri-home-loan-india-eligibility-2026.mdx` - NRI home loan guide
- `content/posts/nri-real-estate-us-tax-implications.mdx` - US FBAR/FATCA guide
- `content/posts/nri-property-uk-tax-implications.mdx` - UK HMRC reporting
- `content/posts/nri-property-canada-tax-treaty.mdx` - Canada tax treaty
- `content/posts/nri-property-uae-tax-rules.mdx` - UAE tax-free status
- 7 more universal NRI posts (rental income, capital gains, repatriation, joint ownership, OCI, verification, commercial)
- `content/posts/stamp-duty-registration-charges-{city}-2026.mdx` (9 cities) - City-specific stamp duty guides
- 15 universal Tax & Legal posts (Section 54, GST, TDS, home loan tax benefits, inheritance, RERA, legal checklist, etc.)
- `content/posts/first-home-buyer-guide-{city}-2026.mdx` (9 cities) - City-specific first-time buyer guides
- 21 universal First-Time Buyers posts (checklist, PMAY, negotiation, hidden costs, EMI comparison, etc.)

## Verification Results

- NRI Corner: 26 posts
- Tax & Legal: 25 posts
- First-Time Buyers: 30 posts
- NRI tax calculator links: 25 posts
- Stamp duty calculator links: 55 posts
- EMI calculator links: 36 posts
- Buy vs Rent links: 16 posts
- All 9 cities represented across all 3 categories
- Zero duplicate slugs

## Decisions Made

- Existing `capital-gains-tax-property-india.mdx` counted toward Tax & Legal total, so 15 new universal tax posts were created (not 16)
- Created `carpet-area-built-up-super-built-up-explained.mdx` in First-Time Buyers category despite existing `carpet-area-super-built-up-area-scam.mdx` -- different category and different angle (educational vs exposing scam)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- 79 new posts add substantial content volume for SEO indexing
- All tool links verified working (linking to Phase 5 calculators)
- Remaining Phase 6 plans (03, 04) can proceed with additional content categories

---
*Phase: 06-content-at-scale*
*Completed: 2026-03-09*
