---
phase: 02-site-wide-forms-analytics
plan: 01
subsystem: api
tags: [resend, forms, lead-capture, email-notification, supabase]

# Dependency graph
requires:
  - phase: 01-ad-launch-pipeline
    provides: "Supabase leads table, /api/leads route, UTM capture, Meta Pixel tracking"
provides:
  - "Resend client library (src/lib/resend.ts) with lazy-init pattern"
  - "Email-only form type support in /api/leads (newsletter, download_gate)"
  - "Resend email notification on every lead submission"
  - "HeroForm, ConsultForm, DownloadGate wired to /api/leads with UTM + Meta Pixel"
affects: [02-site-wide-forms-analytics, analytics, lead-pipeline]

# Tech tracking
tech-stack:
  added: [resend]
  patterns: [email-only-validation, best-effort-notification]

key-files:
  created:
    - src/lib/resend.ts
  modified:
    - src/app/api/leads/route.ts
    - src/components/HeroForm.tsx
    - src/components/ConsultForm.tsx
    - src/components/DownloadGate.tsx
    - .env.example

key-decisions:
  - "Best-effort email notification: Resend failures do not block lead save success response"
  - "RESEND_API_KEY check before attempting notification: silently skips if not configured"
  - "Added name attributes to all form inputs for FormData extraction (Rule 1 - Bug fix)"

patterns-established:
  - "Best-effort notification: save data first, notify second, never fail on notification error"
  - "Form-type-aware validation: emailOnlyFormTypes array gates which fields are required"

requirements-completed: [LEAD-01, LEAD-02, LEAD-03, LEAD-04, LEAD-07]

# Metrics
duration: 3min
completed: 2026-03-08
---

# Phase 02 Plan 01: Form Wiring & Lead Notifications Summary

**All site forms (Hero, Consult, DownloadGate) wired to /api/leads with Resend email notifications, email-only validation, UTM params, and Meta Pixel Lead events**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-08T19:41:59Z
- **Completed:** 2026-03-08T19:44:44Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Created Resend client library with lazy-init pattern matching existing supabase-server.ts convention
- Updated /api/leads to support email-only form types (newsletter, download_gate) alongside full-field forms
- Added best-effort Resend email notification on every lead submission with full lead details
- Wired HeroForm, ConsultForm, and DownloadGate to POST to /api/leads with correct form_type, UTM params, and Meta Pixel Lead tracking
- Added error state display to all three form components
- Build passes cleanly with no type errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Resend client and update /api/leads with email-only validation + notification** - `948e1bb` (feat)
2. **Task 2: Wire HeroForm, ConsultForm, and DownloadGate to /api/leads** - `aae6e97` (feat)

## Files Created/Modified
- `src/lib/resend.ts` - Lazy-init Resend client with getResend() export
- `src/app/api/leads/route.ts` - Email-only validation + Resend notification after Supabase insert
- `src/components/HeroForm.tsx` - Wired to /api/leads with form_type='hero', UTM, Meta Pixel
- `src/components/ConsultForm.tsx` - Wired to /api/leads with form_type='consultation', UTM, Meta Pixel
- `src/components/DownloadGate.tsx` - Wired to /api/leads with form_type='download_gate' (email-only)
- `.env.example` - Added RESEND_API_KEY, RESEND_NOTIFICATION_TO, NEXT_PUBLIC_HOTJAR_ID

## Decisions Made
- Best-effort email notification: Resend failures are logged but do not block the success response (lead is already saved in Supabase)
- RESEND_API_KEY presence check before attempting notification: silently skips if env var is not configured, enabling development without Resend
- Added name attributes to all form inputs (missing from original components) to enable FormData extraction

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added name attributes to form inputs**
- **Found during:** Task 2 (wiring forms to /api/leads)
- **Issue:** Original form inputs lacked `name` attributes, making FormData extraction impossible
- **Fix:** Added `name` prop to all input/select/textarea elements across HeroForm, ConsultForm (including FormField component), and DownloadGate
- **Files modified:** src/components/HeroForm.tsx, src/components/ConsultForm.tsx, src/components/DownloadGate.tsx
- **Verification:** Build passes, FormData extraction works with named inputs
- **Committed in:** aae6e97 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Essential fix for form functionality. No scope creep.

## Issues Encountered
None

## User Setup Required

External services require manual configuration:
- **RESEND_API_KEY**: Resend Dashboard > API Keys > Create API Key
- **RESEND_NOTIFICATION_TO**: Comma-separated team email addresses (e.g. saksham@squaremind.in)
- **Domain verification**: Resend Dashboard > Domains > Add Domain > squaremind.in (SPF, DKIM DNS records)

## Next Phase Readiness
- All forms are live-wired to Supabase via /api/leads
- Resend notification will activate once RESEND_API_KEY is set and squaremind.in domain is verified
- Ready for Phase 02 Plan 02 (analytics/tracking integration)

---
*Phase: 02-site-wide-forms-analytics*
*Completed: 2026-03-08*
