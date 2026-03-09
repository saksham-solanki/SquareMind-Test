---
phase: 04-blog-engine
plan: 02
subsystem: ui
tags: [mdx, next.js, blog, seo, sitemap, react-components]

requires:
  - phase: 04-blog-engine/01
    provides: MDX content infrastructure (mdx.ts, 10 MDX posts, @next/mdx pipeline)
provides:
  - Blog listing page with functional category filtering via BlogGrid client component
  - MDX-rendered blog post pages with prose-squaremind styling
  - SEO metadata and JSON-LD Article schema from MDX frontmatter
  - Dynamic sitemap with all blog post URLs
  - Removal of legacy posts.ts hardcoded data
affects: [05-tools, 06-content]

tech-stack:
  added: []
  patterns: [server-client split for filtered listing, dynamic MDX import for content rendering]

key-files:
  created:
    - src/components/BlogGrid.tsx
  modified:
    - src/app/(main)/insights/page.tsx
    - src/app/(main)/insights/[slug]/page.tsx
    - src/app/sitemap.ts
  deleted:
    - src/lib/posts.ts

key-decisions:
  - "BlogGrid absorbs FilterPills functionality inline instead of prop-drilling callbacks"
  - "Newsletter CTA placed after full MDX content block instead of splitting HTML at h2 tags"
  - "Dynamic MDX import via @content alias for component-based rendering"

patterns-established:
  - "Server-client split: server component fetches data, client component handles filtering state"
  - "MDX content rendered as React component via dynamic import, not dangerouslySetInnerHTML"

requirements-completed: [BLOG-03, BLOG-04, BLOG-05, BLOG-06, BLOG-08]

duration: 2min
completed: 2026-03-09
---

# Phase 4 Plan 02: Blog Page Wiring Summary

**Blog listing with functional category filters, MDX-rendered post pages with SEO/JSON-LD, dynamic sitemap, legacy posts.ts deleted**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-09T04:51:54Z
- **Completed:** 2026-03-09T04:54:10Z
- **Tasks:** 2
- **Files modified:** 5 (1 created, 3 modified, 1 deleted)

## Accomplishments
- Blog listing page at /insights now uses MDX data with working category filter pills via BlogGrid client component
- Individual blog post pages render MDX as React components (no dangerouslySetInnerHTML)
- Sitemap dynamically includes all 10 blog post URLs with publishedAt dates
- Deleted legacy src/lib/posts.ts -- zero remaining references to old data source

## Task Commits

Each task was committed atomically:

1. **Task 1: Create BlogGrid client component and update blog listing page** - `09bf2d9` (feat)
2. **Task 2: Update blog post page to render MDX content with SEO and related posts** - `3c89c63` (feat)

## Files Created/Modified
- `src/components/BlogGrid.tsx` - Client component with category filter state and post grid rendering
- `src/app/(main)/insights/page.tsx` - Server component importing from mdx.ts, delegating to BlogGrid
- `src/app/(main)/insights/[slug]/page.tsx` - MDX dynamic import rendering, SEO metadata from frontmatter
- `src/app/sitemap.ts` - Dynamic blog post entries from getAllPosts()
- `src/lib/posts.ts` - Deleted (1000+ lines of hardcoded HTML content removed)

## Decisions Made
- BlogGrid absorbs FilterPills styling inline rather than importing FilterPills as a dependency -- simpler architecture without callback prop-drilling
- Newsletter CTA placed after full MDX content block instead of the old HTML-splitting hack (splitting at `</h2>` tags was fragile and only worked with raw HTML)
- Used `@content/posts/${slug}.mdx` dynamic import via tsconfig path alias for clean MDX component rendering

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Blog engine is fully MDX-powered and ready for content additions
- FilterPills.tsx remains in codebase but is unused (can be cleaned up in future)
- Phase 5 (Tools) can proceed independently

---
*Phase: 04-blog-engine*
*Completed: 2026-03-09*
