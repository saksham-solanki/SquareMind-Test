---
phase: 02-site-wide-forms-analytics
plan: 02
subsystem: analytics
tags: [ga4, hotjar, calendly, whatsapp, next-script, sendGAEvent]

requires:
  - phase: 01-ad-launch-pipeline
    provides: CalendlyButton, WhatsAppFloat, MetaPixel, GoogleAnalytics in layout, consultation page
provides:
  - GA4 custom event helpers (trackFormSubmit, trackCalendlyOpen, trackWhatsAppClick)
  - Hotjar session recording component with env-var gating
  - CalendlyButton on consultation page with Calendly URL fallback
  - WhatsAppFloat with configurable phone number via env var
affects: [02-site-wide-forms-analytics, 03-ux-design-polish]

tech-stack:
  added: []
  patterns: [sendGAEvent wrappers with SSR safety, Hotjar client component with next/script]

key-files:
  created:
    - src/lib/analytics.ts
    - src/components/Hotjar.tsx
  modified:
    - src/components/CalendlyButton.tsx
    - src/components/WhatsAppFloat.tsx
    - src/app/layout.tsx
    - src/app/(main)/consultation/page.tsx

key-decisions:
  - "Used onProfilePageViewed as proxy for calendly_open event since PopupButton has no onOpen callback"
  - "Calendly fallback URL set to https://calendly.com/work-samsolanki/30min when NEXT_PUBLIC_CALENDLY_URL not set"

patterns-established:
  - "GA4 event helpers: SSR-safe wrappers around sendGAEvent in src/lib/analytics.ts"
  - "Script loader pattern: Hotjar follows same env-var gating as MetaPixel"

requirements-completed: [BOOK-01, BOOK-02, BOOK-04, ANAL-01, ANAL-04, ANAL-05, ANAL-06]

duration: 2min
completed: 2026-03-09
---

# Phase 2 Plan 02: Analytics & Booking Integration Summary

**GA4 custom event tracking (form_submit, calendly_open, whatsapp_click), Hotjar session recording, and CalendlyButton on consultation page with configurable WhatsApp number**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-08T19:42:00Z
- **Completed:** 2026-03-08T19:43:45Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Created GA4 event helper functions with SSR safety checks for form_submit, calendly_open, and whatsapp_click events
- Added Hotjar session recording component to root layout with env-var gating (same pattern as MetaPixel)
- Wired CalendlyButton into consultation page alongside ConsultForm with fallback Calendly URL
- Updated WhatsAppFloat to use NEXT_PUBLIC_WHATSAPP_NUMBER env var and fire GA4 tracking event on click

## Task Commits

Each task was committed atomically:

1. **Task 1: Create analytics helpers and Hotjar component** - `a284c3d` (feat)
2. **Task 2: Wire analytics into CalendlyButton, WhatsAppFloat, layout, and consultation page** - `f78204d` (feat)

## Files Created/Modified
- `src/lib/analytics.ts` - GA4 custom event helpers with SSR safety wrappers
- `src/components/Hotjar.tsx` - Hotjar script loader with env-var gating
- `src/components/CalendlyButton.tsx` - Added GA4 calendly_open event via onProfilePageViewed
- `src/components/WhatsAppFloat.tsx` - Env var for phone number, GA4 whatsapp_click tracking
- `src/app/layout.tsx` - Added Hotjar component next to MetaPixel
- `src/app/(main)/consultation/page.tsx` - Added CalendlyButton below ConsultForm

## Decisions Made
- Used onProfilePageViewed as proxy for calendly_open event since PopupButton lacks an onOpen callback
- Set Calendly fallback URL to https://calendly.com/work-samsolanki/30min when NEXT_PUBLIC_CALENDLY_URL is not set
- Placed CalendlyButton below ConsultForm with "Or skip the form and book directly" text for UX clarity

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

The following environment variables should be configured:
- `NEXT_PUBLIC_HOTJAR_ID` - Hotjar Site ID from Hotjar Dashboard (Sites & Organizations)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - WhatsApp business number (defaults to 919876543210)
- `NEXT_PUBLIC_CALENDLY_URL` - Calendly scheduling URL (defaults to https://calendly.com/work-samsolanki/30min)

## Next Phase Readiness
- Analytics infrastructure complete for remaining Phase 2 plans (form wiring can use trackFormSubmit)
- Hotjar, GA4 events, and Calendly booking are all site-wide ready
- Remaining Phase 2 work: form submissions to Supabase (plan 01), Resend notifications (plan 03)

---
*Phase: 02-site-wide-forms-analytics*
*Completed: 2026-03-09*
