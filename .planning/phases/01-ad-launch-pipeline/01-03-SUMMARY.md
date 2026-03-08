---
phase: 01-ad-launch-pipeline
plan: 03
subsystem: ui
tags: [meta-pixel, ga4, calendly, landing-page, nextjs, react-calendly, tracking]

# Dependency graph
requires:
  - phase: 01-01
    provides: "Route groups, (landing) layout, Vercel-ready config"
  - phase: 01-02
    provides: "TriCityForm, UTMCapture, meta-pixel trackEvent helper, /api/leads endpoint"
provides:
  - MetaPixel component with FB Pixel SDK initialization and PageView tracking
  - CalendlyButton with popup booking and Schedule event tracking
  - GA4 installed site-wide via @next/third-parties
  - Tri-City investment guide landing page at /invest/tri-city
  - ViewContentTracker component for page-load Meta Pixel events
  - Complete ad-to-lead pipeline (ad click -> landing page -> form/booking -> tracked conversion)
affects: [meta-ads, analytics, phase-02-email-notifications]

# Tech tracking
tech-stack:
  added: [react-calendly, "@next/third-parties"]
  patterns: [ssr-safe-calendly-popup, env-var-gated-tracking, dynamic-viewcontent-tracking]

key-files:
  created:
    - src/components/MetaPixel.tsx
    - src/components/CalendlyButton.tsx
    - src/components/ViewContentTracker.tsx
    - src/app/(landing)/invest/tri-city/page.tsx
  modified:
    - src/app/layout.tsx

key-decisions:
  - "Direct CalendlyButton import (not dynamic ssr:false) since component handles SSR internally via useState/useEffect for rootElement"
  - "Removed duplicate fbq type declaration from MetaPixel.tsx to avoid conflict with meta-pixel.ts global declaration"
  - "ViewContentTracker as separate reusable component rather than inline useEffect in page"

patterns-established:
  - "Tracking components: use env var gating (return null if env var missing) for graceful degradation"
  - "SSR-safe client components: use useState+useEffect for browser APIs instead of dynamic(ssr:false) in server components"
  - "Landing page structure: hero, value props, trust signals, process steps, form, Calendly CTA, minimal footer"

requirements-completed: [LAND-01, LAND-02, LAND-04, LAND-05, BOOK-03, ANAL-02, ANAL-03]

# Metrics
duration: 4min
completed: 2026-03-08
---

# Phase 1 Plan 03: Landing Page & Tracking Integration Summary

**Tri-City investment guide landing page with Meta Pixel (ViewContent/Lead/Schedule events), GA4 site-wide, and Calendly popup booking -- completing the full ad-to-lead pipeline**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-08T19:19:55Z
- **Completed:** 2026-03-08T19:23:24Z
- **Tasks:** 3 (2 auto + 1 checkpoint auto-approved)
- **Files modified:** 5

## Accomplishments
- Built complete Tri-City investment guide landing page with 7 sections: hero, why Tri-City, trust signals, how it works, lead form, Calendly CTA, and minimal footer
- Installed Meta Pixel site-wide (PageView on every page, ViewContent on landing page, Lead on form submit, Schedule on booking)
- Added GA4 tracking site-wide via @next/third-parties GoogleAnalytics
- CalendlyButton opens popup on click and tracks Schedule event on booking completion
- All tracking components gracefully degrade when env vars are not set (no crashes, just skip)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create MetaPixel, CalendlyButton components and wire into root layout with GA4** - `5fc304b` (feat)
2. **Task 2: Build Tri-City investment guide landing page** - `5bb5d43` (feat)
3. **Task 3: Verify complete ad-to-lead pipeline** - Auto-approved checkpoint (no commit)

## Files Created/Modified
- `src/components/MetaPixel.tsx` - FB Pixel SDK loader via next/script afterInteractive, fires PageView
- `src/components/CalendlyButton.tsx` - react-calendly PopupButton with SSR-safe rootElement and Schedule event tracking
- `src/components/ViewContentTracker.tsx` - Reusable client component that fires ViewContent Meta Pixel event on mount
- `src/app/(landing)/invest/tri-city/page.tsx` - Full landing page with educational Tri-City content, TriCityForm, CalendlyButton, FadeUp animations
- `src/app/layout.tsx` - Added MetaPixel and GoogleAnalytics to root layout (site-wide tracking)

## Decisions Made
- Used direct import for CalendlyButton instead of `dynamic(() => import(...), { ssr: false })` because Next.js 16 does not allow `ssr: false` in Server Components. The CalendlyButton handles SSR internally with useState/useEffect for rootElement.
- Removed duplicate global Window.fbq type declaration from MetaPixel.tsx to avoid TypeScript conflict with the existing declaration in src/lib/meta-pixel.ts.
- Created ViewContentTracker as a separate reusable component rather than inlining the tracking useEffect, making it easy to add ViewContent tracking to future landing pages.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Removed dynamic(ssr:false) from server component**
- **Found during:** Task 2 (landing page build verification)
- **Issue:** `next/dynamic` with `{ ssr: false }` is not allowed in Server Components in Next.js 16
- **Fix:** Changed to direct import of CalendlyButton which already handles SSR via useState/useEffect pattern
- **Files modified:** src/app/(landing)/invest/tri-city/page.tsx
- **Verification:** `npx next build` succeeds
- **Committed in:** `5bb5d43` (Task 2 commit)

**2. [Rule 1 - Bug] Fixed duplicate fbq type declaration**
- **Found during:** Task 2 (build verification)
- **Issue:** MetaPixel.tsx declared `Window.fbq` as required, but meta-pixel.ts declared it as optional -- TypeScript error
- **Fix:** Removed duplicate declaration from MetaPixel.tsx, kept the one in meta-pixel.ts
- **Files modified:** src/components/MetaPixel.tsx
- **Verification:** `npx next build` succeeds with no type errors
- **Committed in:** `5bb5d43` (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both fixes necessary for build to succeed. No scope creep.

## Issues Encountered
- None beyond the auto-fixed deviations above.

## User Setup Required
The following environment variables must be configured for full functionality:
- `NEXT_PUBLIC_META_PIXEL_ID` - From Meta Events Manager > Data Sources > Create Pixel
- `NEXT_PUBLIC_GA4_ID` - From GA4 Admin > Data Streams > Measurement ID
- `NEXT_PUBLIC_CALENDLY_URL` - From Calendly > Event Types > copy event link
- `SUPABASE_SERVICE_ROLE_KEY` - From Supabase Dashboard > Settings > API
- Supabase `leads` table must be created per SQL schema in 01-RESEARCH.md

All tracking components render nothing when env vars are missing -- the site works without them.

## Next Phase Readiness
- Phase 1 (Ad Launch Pipeline) is complete: Vercel infra, lead capture, and landing page with tracking
- Ready for Meta ad campaigns once Meta Pixel ID and Calendly URL are configured
- Phase 2 (email notifications via Resend) can proceed independently
- Verify Meta Pixel events with Pixel Helper browser extension before spending ad budget

---
*Phase: 01-ad-launch-pipeline*
*Completed: 2026-03-08*
