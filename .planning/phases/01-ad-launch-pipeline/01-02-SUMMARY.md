---
phase: 01-ad-launch-pipeline
plan: 02
subsystem: api
tags: [supabase, utm, meta-pixel, lead-capture, nextjs-api-routes, forms]

# Dependency graph
requires:
  - phase: 01-01
    provides: "Route groups, Vercel-ready config, env variable template"
provides:
  - POST /api/leads endpoint with validation and Supabase insert
  - UTM capture/retrieval utilities (sessionStorage)
  - Meta Pixel trackEvent helper
  - TriCityForm component with all lead capture fields
  - UTMCapture side-effect component
affects: [01-03, landing-pages, meta-ads, analytics]

# Tech tracking
tech-stack:
  added: []
  patterns: [lazy-supabase-admin, utm-sessionStorage, server-client-separation]

key-files:
  created:
    - src/lib/utm.ts
    - src/lib/supabase-server.ts
    - src/lib/meta-pixel.ts
    - src/app/api/leads/route.ts
    - src/components/TriCityForm.tsx
    - src/components/UTMCapture.tsx
  modified: []

key-decisions:
  - "Lazy-init supabaseAdmin via getSupabaseAdmin() to prevent build-time crash when env vars missing"
  - "UTM params stored in sessionStorage (persists across page navigations within session)"
  - "Form validation on both client (required attrs) and server (explicit field + email regex check)"

patterns-established:
  - "Server Supabase: use getSupabaseAdmin() function, never top-level instantiation"
  - "UTM flow: UTMCapture on mount -> sessionStorage -> getUTMParams() on form submit"
  - "API routes: validate required fields, return 400/500 with { error } or 200 with { success: true }"

requirements-completed: [LEAD-05, LEAD-06, LEAD-08, LAND-03]

# Metrics
duration: 3min
completed: 2026-03-08
---

# Phase 1 Plan 02: Lead Capture Pipeline Summary

**UTM tracking utilities, Supabase API route with validation, and TriCityForm component with location/budget dropdowns and Meta Pixel Lead event**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-08T19:14:36Z
- **Completed:** 2026-03-08T19:17:08Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Built complete lead capture pipeline: UTM capture -> form submission -> API validation -> Supabase insert -> Meta Pixel event
- Created TriCityForm with 5 fields (name, email, phone, location dropdown with 22 cities, budget dropdown with 5 ranges)
- API route validates required fields and email format, returns proper HTTP status codes
- UTM params captured from URL into sessionStorage on page load, attached to form submissions automatically

## Task Commits

Each task was committed atomically:

1. **Task 1: Create utility libraries and API route for lead capture** - `8d553de` (feat)
2. **Task 2: Build TriCityForm and UTMCapture components** - `8864201` (feat)

## Files Created/Modified
- `src/lib/utm.ts` - UTM capture/retrieval from sessionStorage with SSR safety
- `src/lib/supabase-server.ts` - Lazy-init server-side Supabase client with service role key
- `src/lib/meta-pixel.ts` - Meta Pixel trackEvent helper with global fbq type declaration
- `src/app/api/leads/route.ts` - POST endpoint: validates name/email/phone, inserts to Supabase leads table
- `src/components/TriCityForm.tsx` - Full lead capture form with loading spinner, error display, success state
- `src/components/UTMCapture.tsx` - Side-effect component that captures UTMs on mount

## Decisions Made
- Used lazy initialization for supabaseAdmin (getSupabaseAdmin() function) instead of top-level createClient -- prevents build-time crash when SUPABASE_SERVICE_ROLE_KEY is not yet set in the environment
- UTM params stored in sessionStorage rather than passed via URL -- persists across page navigations within the same session without polluting URLs
- Dual validation: HTML required attributes on client + explicit field checks on server -- defense in depth

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Changed supabaseAdmin from eager to lazy instantiation**
- **Found during:** Task 2 (build verification)
- **Issue:** `createClient()` called at module scope threw "supabaseKey is required" during `next build` when env vars are missing
- **Fix:** Changed from `export const supabaseAdmin = createClient(...)` to `export function getSupabaseAdmin()` with lazy instantiation and caching
- **Files modified:** src/lib/supabase-server.ts, src/app/api/leads/route.ts
- **Verification:** `npx next build` succeeds without env vars set
- **Committed in:** `8864201` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential fix for build reliability. No scope creep.

## Issues Encountered
- Plan's verification command (`! grep -q "NEXT_PUBLIC.*SERVICE_ROLE"`) produced false positive because the console.warn message contained both "NEXT_PUBLIC_SUPABASE_URL" and "SUPABASE_SERVICE_ROLE_KEY" on the same line. The implementation is correct -- the service role key is NOT prefixed with NEXT_PUBLIC_.

## User Setup Required
None beyond existing .env.example -- SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL must be set in .env.local before the API route will function at runtime. The Supabase `leads` table must be created per the SQL schema in the research document.

## Next Phase Readiness
- TriCityForm is ready to embed in the landing page (Plan 03)
- UTMCapture is ready to place in landing layout
- API route is functional once Supabase env vars and leads table are configured
- Meta Pixel Lead event will fire once the pixel script is installed (Plan 03)

---
*Phase: 01-ad-launch-pipeline*
*Completed: 2026-03-08*
