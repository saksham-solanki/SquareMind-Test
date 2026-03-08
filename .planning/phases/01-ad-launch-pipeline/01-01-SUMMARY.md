---
phase: 01-ad-launch-pipeline
plan: 01
subsystem: infra
tags: [nextjs, vercel, route-groups, sitemap, robots, config]

# Dependency graph
requires: []
provides:
  - Clean Vercel-ready next.config.ts (no static export)
  - (main) route group with Navbar/Footer layout
  - (landing) route group for distraction-free pages
  - Dynamic sitemap.ts and robots.ts for squaremind.in
  - Environment variable template for Phase 1
affects: [01-02, 01-03, landing-pages, api-routes]

# Tech tracking
tech-stack:
  added: []
  patterns: [route-group-layout-isolation, dynamic-metadata-api]

key-files:
  created:
    - src/app/(main)/layout.tsx
    - src/app/(landing)/layout.tsx
    - src/app/sitemap.ts
    - src/app/robots.ts
    - .env.example
  modified:
    - next.config.ts
    - src/app/layout.tsx

key-decisions:
  - "Route group pattern: (main) for chrome, (landing) for distraction-free"
  - "Dynamic metadata API over static files for sitemap/robots"
  - ".env.example committed; .env.local stays gitignored with secrets"

patterns-established:
  - "Route groups: (main) for pages with Navbar/Footer, (landing) for standalone pages"
  - "Environment variables: documented in .env.example, secrets never committed"

requirements-completed: [INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05]

# Metrics
duration: 2min
completed: 2026-03-08
---

# Phase 1 Plan 01: Vercel Infrastructure & Route Groups Summary

**Removed GitHub Pages static export, created (main)/(landing) route groups for layout isolation, and replaced static sitemap/robots with dynamic Next.js metadata API**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-08T19:10:19Z
- **Completed:** 2026-03-08T19:12:21Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments
- Cleaned next.config.ts to enable Vercel deployment with API routes (removed static export)
- Created (main) and (landing) route groups for layout isolation -- existing pages retain Navbar/Footer while future landing pages get distraction-free layouts
- Replaced static sitemap.xml/robots.txt with dynamic metadata API using squaremind.in domain
- Created .env.example documenting all Phase 1 environment variables

## Task Commits

Each task was committed atomically:

1. **Task 1: Clean next.config.ts and create environment variable template** - `4db44d7` (chore)
2. **Task 2: Restructure app into (main) and (landing) route groups** - `2293a45` (feat)
3. **Task 3: Replace static sitemap/robots with dynamic metadata API** - `09a5d86` (feat)

## Files Created/Modified
- `next.config.ts` - Cleaned to empty NextConfig (removed GitHub Pages conditional)
- `.env.example` - Phase 1 environment variable template with documentation
- `src/app/layout.tsx` - Stripped to root-only: html, body, fonts, CSS, JSON-LD
- `src/app/(main)/layout.tsx` - Navbar, Footer, WhatsAppFloat, StickyMobileCTA wrapper
- `src/app/(landing)/layout.tsx` - Minimal layout for distraction-free pages
- `src/app/sitemap.ts` - Dynamic sitemap with squaremind.in URLs and priority tiers
- `src/app/robots.ts` - Dynamic robots.txt referencing squaremind.in/sitemap.xml
- `src/app/(main)/*` - All existing pages moved into (main) route group

## Decisions Made
- Used route group pattern `(main)` and `(landing)` for layout isolation instead of conditional rendering
- Dynamic metadata API (sitemap.ts/robots.ts) instead of static files for domain flexibility
- .env.example force-added to git despite .gitignore pattern; .env.local kept gitignored (contains secrets)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- .env.example and .env.local were caught by .gitignore -- used `git add -f` for .env.example only (safe template). .env.local correctly remains untracked.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- API routes are now enabled (no static export blocking them)
- (landing) route group is ready for the Tri-City landing page (Plan 02)
- Environment variable template is in place for tracking/analytics setup (Plan 03)
- Build verified: `next build` succeeds with all routes

---
*Phase: 01-ad-launch-pipeline*
*Completed: 2026-03-08*
