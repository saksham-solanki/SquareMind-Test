---
phase: 07-content-quality-overhaul
plan: 01
subsystem: content
tags: [mdx, json-ld, seo, faq-schema, internal-linking]

# Dependency graph
requires:
  - phase: 04-blog-engine
    provides: MDX post infrastructure, gray-matter parsing, blog post page component
  - phase: 05-interactive-tools
    provides: 8 tool page routes for link map entries
provides:
  - Link map JSON (1191 keyword-to-URL mappings from 301 posts + 8 tools + consultation pages)
  - ToolCallout MDX component for styled tool CTA boxes
  - FAQPage JSON-LD schema auto-injection on blog post pages
affects: [07-02-rewrite-cli, content-seo]

# Tech tracking
tech-stack:
  added: []
  patterns: [keyword-to-url-link-map, faq-schema-extraction, mdx-callout-component]

key-files:
  created:
    - scripts/generate-link-map.js
    - content/link-map.json
    - src/components/ToolCallout.tsx
  modified:
    - src/app/(main)/insights/[slug]/page.tsx

key-decisions:
  - "Link map includes variant keywords (19 tool entries mapping to 8 unique tools) for flexible anchor text matching"
  - "FAQ extraction uses regex on raw MDX content at build time, not runtime parsing"
  - "ToolCallout uses not-prose class to escape MDX prose styling"

patterns-established:
  - "Link map generation: node scripts/generate-link-map.js writes content/link-map.json"
  - "FAQ schema: extractFAQs() helper in blog post page extracts H3 questions under ## FAQ heading"

requirements-completed: [CQO-01]

# Metrics
duration: 2min
completed: 2026-03-09
---

# Phase 7 Plan 01: Content Rewrite Infrastructure Summary

**Link map generator (1191 keywords from 301 posts), ToolCallout MDX component, and FAQPage JSON-LD schema injection on blog post pages**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-09T18:27:06Z
- **Completed:** 2026-03-09T18:29:14Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- CLI script generates keyword-to-URL link map from all 301 MDX posts (1191 keyword entries) plus 8 tool pages and consultation page
- ToolCallout component provides styled inline CTA boxes for tool links in rewritten MDX content
- Blog post pages auto-inject FAQPage JSON-LD schema when FAQ section with H3 questions is detected
- Build passes cleanly with all changes

## Task Commits

Each task was committed atomically:

1. **Task 1: Link map generator + ToolCallout component** - `de2fc66` (feat)
2. **Task 2: FAQPage JSON-LD schema injection** - `1b1daec` (feat)

## Files Created/Modified
- `scripts/generate-link-map.js` - CLI script that scans MDX posts and generates keyword-to-URL map
- `content/link-map.json` - JSON mapping of 1191 post keywords + 19 tool entries + 5 page entries
- `src/components/ToolCallout.tsx` - Styled callout box component for tool CTAs in MDX content
- `src/app/(main)/insights/[slug]/page.tsx` - Added extractFAQs() helper and FAQPage JSON-LD schema injection

## Decisions Made
- Link map includes multiple keyword variants per tool (e.g., "EMI calculator", "emi calculator", "home loan EMI" all point to /tools/emi-calculator) for flexible anchor text matching in the rewrite script
- FAQ extraction uses regex on raw MDX string from gray-matter (build-time), not runtime DOM parsing
- ToolCallout uses `not-prose` class to escape the prose-squaremind styling and render with its own layout
- Deduplication favors shorter slugs (more focused content) when multiple posts target the same keyword

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Link map ready for the rewrite CLI script (Plan 02) to use for internal link insertion
- ToolCallout component ready for MDX usage in rewritten posts
- FAQPage schema will auto-activate when rewritten posts include ## FAQ sections with ### questions

---
*Phase: 07-content-quality-overhaul*
*Completed: 2026-03-09*
