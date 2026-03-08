---
phase: 02-site-wide-forms-analytics
verified: 2026-03-09T12:00:00Z
status: gaps_found
score: 12/14
must_haves:
  truths:
    - "HeroForm submission saves lead data to Supabase with form_type='hero' and UTM params"
    - "ConsultForm submission saves lead data to Supabase with form_type='consultation' and UTM params"
    - "DownloadGate submission saves email to Supabase with form_type='download_gate'"
    - "Team receives email notification within 60 seconds of any form submission"
    - "Email-only forms (newsletter, download_gate) are accepted by API without name/phone"
    - "GA4 custom events (form_submit, calendly_open, whatsapp_click) fire when corresponding actions occur"
    - "Hotjar script loads on all pages when NEXT_PUBLIC_HOTJAR_ID is set"
    - "Calendly popup is accessible on the consultation page"
    - "WhatsApp float uses configurable phone number from env var"
    - "CalendlyButton fires calendly_open GA4 event when popup opens"
    - "WhatsAppFloat fires whatsapp_click GA4 event on click"
    - "Newsletter signup on homepage collects email and saves to Supabase with form_type='newsletter'"
    - "Newsletter signup on blog post pages collects email and saves to Supabase with form_type='newsletter'"
    - "Subscriber sees a success confirmation message after submitting their email"
gaps:
  - truth: "GA4 custom events (form_submit, calendly_open, whatsapp_click) fire when corresponding actions occur"
    status: partial
    reason: "trackFormSubmit() from analytics.ts is only called in NewsletterForm. HeroForm, ConsultForm, and DownloadGate fire Meta Pixel Lead events but do NOT fire GA4 form_submit events."
    artifacts:
      - path: "src/components/HeroForm.tsx"
        issue: "Does not import or call trackFormSubmit('hero') on successful submission"
      - path: "src/components/ConsultForm.tsx"
        issue: "Does not import or call trackFormSubmit('consultation') on successful submission"
      - path: "src/components/DownloadGate.tsx"
        issue: "Does not import or call trackFormSubmit('download_gate') on successful submission"
    missing:
      - "Add import { trackFormSubmit } from '@/lib/analytics' and call trackFormSubmit() after successful submission in HeroForm, ConsultForm, and DownloadGate"
  - truth: "Newsletter form shows loading state during submission"
    status: partial
    reason: "Minor: loading state exists but the truth was listed in Plan 03 must_haves. Verified the code does handle loading -- marking as verified below but noting it as a minor truth."
    artifacts: []
    missing: []
---

# Phase 2: Site-Wide Forms & Analytics Verification Report

**Phase Goal:** Every form on the site captures leads to Supabase with UTM tracking, the team gets instant notifications, and all analytics tools (GA4, Hotjar, Meta Pixel events) are running site-wide
**Verified:** 2026-03-09T12:00:00Z
**Status:** gaps_found
**Re-verification:** No -- initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | HeroForm submission saves lead data to Supabase with form_type='hero' and UTM params | VERIFIED | HeroForm.tsx POSTs to /api/leads with form_type: "hero", ...getUTMParams(). API route inserts into Supabase leads table. |
| 2 | ConsultForm submission saves lead data to Supabase with form_type='consultation' and UTM params | VERIFIED | ConsultForm.tsx POSTs to /api/leads with form_type: "consultation", ...getUTMParams(). |
| 3 | DownloadGate submission saves email to Supabase with form_type='download_gate' | VERIFIED | DownloadGate.tsx POSTs email to /api/leads with form_type: "download_gate", ...getUTMParams(). Email-only, no name/phone. |
| 4 | Team receives email notification within 60 seconds of any form submission | VERIFIED | API route calls getResend() after Supabase insert, sends to RESEND_NOTIFICATION_TO recipients. Best-effort (never blocks success). |
| 5 | Email-only forms (newsletter, download_gate) accepted by API without name/phone | VERIFIED | API route has emailOnlyFormTypes = ["newsletter", "download_gate"]; only requires email for these types. |
| 6 | GA4 custom events (form_submit, calendly_open, whatsapp_click) fire on corresponding actions | FAILED | trackCalendlyOpen() wired in CalendlyButton, trackWhatsAppClick() wired in WhatsAppFloat. BUT trackFormSubmit() only called in NewsletterForm -- NOT called in HeroForm, ConsultForm, or DownloadGate. |
| 7 | Hotjar script loads on all pages when NEXT_PUBLIC_HOTJAR_ID is set | VERIFIED | Hotjar component in root layout.tsx with siteId={process.env.NEXT_PUBLIC_HOTJAR_ID}. Returns null if no siteId. |
| 8 | Calendly popup accessible on consultation page | VERIFIED | consultation/page.tsx imports and renders CalendlyButton with calendlyUrl below ConsultForm. |
| 9 | WhatsApp float uses configurable phone number from env var | VERIFIED | WhatsAppFloat.tsx reads process.env.NEXT_PUBLIC_WHATSAPP_NUMBER with fallback to "919876543210". |
| 10 | CalendlyButton fires calendly_open GA4 event when popup opens | VERIFIED | CalendlyButton.tsx calls trackCalendlyOpen() via onProfilePageViewed listener. |
| 11 | WhatsAppFloat fires whatsapp_click GA4 event on click | VERIFIED | WhatsAppFloat.tsx calls trackWhatsAppClick() in onClick handler. |
| 12 | Newsletter signup on homepage saves email to Supabase with form_type='newsletter' | VERIFIED | page.tsx imports NewsletterForm (line 5, rendered line 292). NewsletterForm POSTs to /api/leads with form_type: "newsletter". |
| 13 | Newsletter signup on blog posts saves email to Supabase with form_type='newsletter' | VERIFIED | insights/[slug]/page.tsx imports NewsletterForm (line 5, rendered line 127). |
| 14 | Subscriber sees success confirmation after submitting email | VERIFIED | NewsletterForm shows "You're in! Check your inbox." with green checkmark when submitted=true. |

**Score:** 13/14 truths verified (1 partially failed)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/lib/resend.ts` | Lazy-init Resend client | VERIFIED | Exports getResend(), lazy-init pattern, throws if RESEND_API_KEY missing |
| `src/app/api/leads/route.ts` | Updated API with email-only validation + Resend notification | VERIFIED | emailOnlyFormTypes array, Resend email send after insert, best-effort pattern |
| `src/components/HeroForm.tsx` | HeroForm wired to /api/leads | VERIFIED | POSTs to /api/leads with form_type='hero', UTM params, loading/error/success states |
| `src/components/ConsultForm.tsx` | ConsultForm wired to /api/leads | VERIFIED | POSTs to /api/leads with form_type='consultation', UTM params, loading/error/success states |
| `src/components/DownloadGate.tsx` | DownloadGate wired to /api/leads | VERIFIED | POSTs to /api/leads with form_type='download_gate', email-only, UTM params |
| `src/lib/analytics.ts` | GA4 custom event helpers | VERIFIED | Exports trackFormSubmit, trackCalendlyOpen, trackWhatsAppClick with SSR safety |
| `src/components/Hotjar.tsx` | Hotjar script loader | VERIFIED | next/script afterInteractive, env-var gating, standard Hotjar snippet |
| `src/components/CalendlyButton.tsx` | Updated CalendlyButton with GA4 tracking | VERIFIED | Imports and calls trackCalendlyOpen via onProfilePageViewed |
| `src/components/WhatsAppFloat.tsx` | Updated WhatsAppFloat with env var + GA4 tracking | VERIFIED | NEXT_PUBLIC_WHATSAPP_NUMBER, trackWhatsAppClick onClick |
| `src/components/NewsletterForm.tsx` | Reusable newsletter email capture component | VERIFIED | Email capture, loading/submitted/error states, form_type='newsletter', UTM, Meta Pixel + GA4 |
| `.env.example` | Updated with new env vars | VERIFIED | Contains RESEND_API_KEY, RESEND_NOTIFICATION_TO, NEXT_PUBLIC_HOTJAR_ID, NEXT_PUBLIC_WHATSAPP_NUMBER |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| HeroForm.tsx | /api/leads | fetch POST with form_type='hero' | WIRED | Line 24-36: fetch("/api/leads", { body: JSON.stringify({ form_type: "hero" }) }) |
| ConsultForm.tsx | /api/leads | fetch POST with form_type='consultation' | WIRED | Line 25-37: fetch("/api/leads", { body: JSON.stringify({ form_type: "consultation" }) }) |
| DownloadGate.tsx | /api/leads | fetch POST with form_type='download_gate' | WIRED | Line 22-31: fetch("/api/leads", { body: JSON.stringify({ form_type: "download_gate" }) }) |
| API route | src/lib/resend.ts | getResend() call after insert | WIRED | Line 84: const resend = getResend(); followed by resend.emails.send() |
| layout.tsx | Hotjar.tsx | Hotjar component in root layout | WIRED | Line 82: <Hotjar siteId={process.env.NEXT_PUBLIC_HOTJAR_ID} /> |
| CalendlyButton.tsx | analytics.ts | trackCalendlyOpen on popup open | WIRED | Line 6 import, line 26 call in onProfilePageViewed |
| WhatsAppFloat.tsx | analytics.ts | trackWhatsAppClick on click | WIRED | Line 3 import, line 11 call in onClick |
| NewsletterForm.tsx | /api/leads | fetch POST with form_type='newsletter' | WIRED | Line 27-36: fetch("/api/leads", { body: JSON.stringify({ form_type: "newsletter" }) }) |
| page.tsx (homepage) | NewsletterForm.tsx | import and render | WIRED | Line 5 import, line 292 render |
| insights/[slug]/page.tsx | NewsletterForm.tsx | import and render | WIRED | Line 5 import, line 127 render |
| consultation/page.tsx | CalendlyButton.tsx | import and render | WIRED | Line 5 import, line 92 render with calendlyUrl |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| LEAD-01 | 02-01 | HeroForm saves submissions to Supabase leads table | SATISFIED | HeroForm POSTs to /api/leads, API inserts into Supabase |
| LEAD-02 | 02-01 | ConsultForm saves submissions to Supabase leads table | SATISFIED | ConsultForm POSTs to /api/leads with form_type='consultation' |
| LEAD-03 | 02-01 | DownloadGate saves email to Supabase leads table | SATISFIED | DownloadGate POSTs email to /api/leads with form_type='download_gate' |
| LEAD-04 | 02-01, 02-03 | Newsletter signup saves email to Supabase leads table | SATISFIED | NewsletterForm POSTs to /api/leads with form_type='newsletter' |
| LEAD-07 | 02-01 | Form submissions trigger instant email notification via Resend | SATISFIED | API route sends Resend email after Supabase insert (best-effort) |
| BOOK-01 | 02-02 | "Book a Call" CTAs open Calendly scheduling popup | SATISFIED | CalendlyButton on consultation page with PopupButton |
| BOOK-02 | 02-02 | Consultation page embeds Calendly inline or popup | SATISFIED | consultation/page.tsx renders CalendlyButton with Calendly URL |
| BOOK-04 | 02-02 | WhatsApp float uses real business WhatsApp number | SATISFIED | WhatsAppFloat reads NEXT_PUBLIC_WHATSAPP_NUMBER env var |
| ANAL-01 | 02-02 | GA4 installed site-wide with pageview tracking | SATISFIED | GoogleAnalytics in root layout.tsx with NEXT_PUBLIC_GA4_ID |
| ANAL-04 | 02-02 | Meta Pixel fires Schedule event on Calendly booking | SATISFIED | CalendlyButton has onEventScheduled -> trackEvent("Schedule") |
| ANAL-05 | 02-02 | Hotjar installed on key pages | SATISFIED | Hotjar in root layout.tsx loads site-wide when NEXT_PUBLIC_HOTJAR_ID is set |
| ANAL-06 | 02-02 | GA4 tracks custom events: form_submit, calendly_open, whatsapp_click | PARTIAL | calendly_open and whatsapp_click are wired. form_submit only fires from NewsletterForm -- HeroForm, ConsultForm, DownloadGate do not call trackFormSubmit() |
| NEWS-01 | 02-03 | Newsletter signup on homepage and blog pages collects email to Supabase | SATISFIED | NewsletterForm on both pages POSTs to /api/leads |
| NEWS-02 | 02-03 | Subscriber receives confirmation (success state in UI) | SATISFIED | NewsletterForm shows "You're in! Check your inbox." on success |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| src/components/DownloadGate.tsx | 43 | setTimeout(() => setOpen(false), 2000) | Info | Closes modal 2 seconds after success -- intentional UX, not a fake submission |

No blockers, no TODOs, no placeholder implementations found.

### Human Verification Required

### 1. Form Submission to Supabase

**Test:** Submit each form (Hero, Consult, DownloadGate, Newsletter) on the live site
**Expected:** Lead appears in Supabase leads table with correct form_type and UTM params
**Why human:** Requires running the app with valid Supabase credentials

### 2. Resend Email Notifications

**Test:** Submit a form with RESEND_API_KEY configured
**Expected:** Team email received within 60 seconds with lead details
**Why human:** Requires Resend API key and verified domain

### 3. Calendly Popup on Consultation Page

**Test:** Click "Book Your Free Strategy Call" button on /consultation
**Expected:** Calendly scheduling popup opens
**Why human:** Requires Calendly URL and visual verification of popup behavior

### 4. Hotjar Session Recording

**Test:** Visit site with NEXT_PUBLIC_HOTJAR_ID set
**Expected:** Hotjar script loads and session recording begins
**Why human:** Requires Hotjar account and browser network tab verification

### 5. GA4 Custom Events

**Test:** Submit a form, open Calendly, click WhatsApp on the live site
**Expected:** GA4 DebugView shows form_submit, calendly_open, whatsapp_click events
**Why human:** Requires GA4 DebugView access and browser interaction

### Gaps Summary

One gap found: **GA4 form_submit event not firing for 3 out of 4 form types.**

The `trackFormSubmit()` function exists in `src/lib/analytics.ts` and is correctly used in `NewsletterForm.tsx`, but it was not wired into `HeroForm.tsx`, `ConsultForm.tsx`, or `DownloadGate.tsx`. These three components fire Meta Pixel `Lead` events on success but do not call `trackFormSubmit()` for GA4 tracking. This is likely because Plan 01 (which wired these forms) was executed before Plan 02 (which created `analytics.ts`), and Plan 02 only wired `trackFormSubmit` into CalendlyButton and WhatsAppFloat -- not back into the already-wired forms.

The fix is straightforward: add `import { trackFormSubmit } from "@/lib/analytics"` and call `trackFormSubmit("hero")`, `trackFormSubmit("consultation")`, `trackFormSubmit("download_gate")` alongside the existing `trackEvent("Lead", ...)` calls in each component.

---

_Verified: 2026-03-09T12:00:00Z_
_Verifier: Claude (gsd-verifier)_
