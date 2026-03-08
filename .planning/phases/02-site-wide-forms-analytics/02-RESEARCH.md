# Phase 2: Site-Wide Forms & Analytics - Research

**Researched:** 2026-03-09
**Domain:** Lead capture forms, transactional email (Resend), analytics (GA4, Hotjar, Meta Pixel), booking (Calendly)
**Confidence:** HIGH

## Summary

Phase 2 extends the Phase 1 lead capture pipeline to ALL forms across the site. Currently, only the TriCityForm (landing page) actually submits to Supabase via `/api/leads`. Three other form components -- HeroForm (homepage), ConsultForm (consultation page), and DownloadGate (research page) -- exist as UI-only with fake `setTimeout` submissions. Two newsletter forms (homepage section, blog post mid-article CTA) are plain HTML forms with no handler. All of these must be wired to the existing `/api/leads` API route with correct `form_type` values and UTM parameters.

Additionally, the phase adds: (1) Resend email notifications triggered on every form submission so the team gets instant alerts, (2) Hotjar session recording on key pages, (3) GA4 custom event tracking (form_submit, calendly_open, whatsapp_click), (4) Meta Pixel Schedule event on Calendly booking (already built in CalendlyButton), (5) Calendly popup on all "Book a Call" CTAs site-wide, and (6) real WhatsApp number in WhatsAppFloat.

**Primary recommendation:** Wire existing form components to `/api/leads` with form_type discrimination, add Resend notification as a server-side call inside the API route (not a separate endpoint), add Hotjar via a client component similar to MetaPixel, and use `sendGAEvent` from `@next/third-parties/google` for GA4 custom events.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LEAD-01 | HeroForm saves to Supabase | Wire HeroForm to POST /api/leads with form_type="hero" and UTM params |
| LEAD-02 | ConsultForm saves to Supabase | Wire ConsultForm to POST /api/leads with form_type="consultation" and UTM params |
| LEAD-03 | DownloadGate saves to Supabase | Wire DownloadGate to POST /api/leads with form_type="download_gate" (email-only, name/phone optional) |
| LEAD-04 | Newsletter form saves to Supabase | Create NewsletterForm component, POST to /api/leads with form_type="newsletter" (email-only) |
| LEAD-07 | Form submissions trigger email notification via Resend | Add Resend call inside /api/leads route after successful Supabase insert |
| BOOK-01 | "Book a Call" CTAs open Calendly popup site-wide | Replace Link href="/consultation" CTAs with CalendlyButton where appropriate |
| BOOK-02 | Consultation page embeds Calendly popup | Add CalendlyButton to consultation page alongside ConsultForm |
| BOOK-04 | WhatsApp float uses real business number | Update WhatsAppFloat to use env var NEXT_PUBLIC_WHATSAPP_NUMBER |
| ANAL-01 | GA4 installed site-wide with pageview tracking | Already done in Phase 1 (GoogleAnalytics in root layout) -- verify Enhanced Measurement is documented |
| ANAL-04 | Meta Pixel fires Schedule on Calendly booking | Already done in Phase 1 (CalendlyButton tracks Schedule) -- just ensure CalendlyButton is used everywhere |
| ANAL-05 | Hotjar recording on homepage, consultation, landing page | Create Hotjar component, add to root layout with page-conditional recording |
| ANAL-06 | GA4 custom events: form_submit, calendly_open, whatsapp_click | Use sendGAEvent from @next/third-parties/google in form handlers and click handlers |
| NEWS-01 | Newsletter signup on homepage and blog pages | Create reusable NewsletterForm, place in homepage section and blog post mid-article CTA |
| NEWS-02 | Subscriber sees confirmation UI state | NewsletterForm shows success message after submission |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @supabase/supabase-js | ^2.98.0 | Database insert for leads | Already in use, service role key pattern established |
| @next/third-parties | ^16.1.6 | GA4 integration + sendGAEvent | Already installed, official Next.js package |
| react-calendly | ^4.4.0 | Calendly popup booking | Already installed, CalendlyButton pattern established |
| next | 16.1.6 | Framework | Current version |

### New Dependencies
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| resend | ^6.9.3 | Transactional email API | Send team notification on form submission |

### No Additional Libraries Needed
| Problem | Solution | Why No Library |
|---------|----------|----------------|
| Hotjar | next/script with inline JS | Hotjar is just a script tag with site ID, no npm package needed |
| GA4 custom events | sendGAEvent from @next/third-parties | Already have GoogleAnalytics installed |
| Newsletter form | Reuse /api/leads endpoint | Same Supabase table, just different form_type |
| Form validation | Existing pattern in /api/leads | Keep current regex + required field checks |

**Installation:**
```bash
npm install resend
```

## Architecture Patterns

### Recommended Changes
```
src/
├── app/
│   └── api/
│       └── leads/
│           └── route.ts          # MODIFY: Add Resend notification after Supabase insert
├── components/
│   ├── HeroForm.tsx              # MODIFY: Wire to /api/leads with UTM
│   ├── ConsultForm.tsx           # MODIFY: Wire to /api/leads with UTM
│   ├── DownloadGate.tsx          # MODIFY: Wire to /api/leads with UTM
│   ├── NewsletterForm.tsx        # CREATE: Reusable newsletter email capture
│   ├── Hotjar.tsx                # CREATE: Hotjar script loader (client component)
│   ├── WhatsAppFloat.tsx         # MODIFY: Use env var for phone number
│   └── CalendlyButton.tsx        # NO CHANGE: Already handles Schedule event
├── lib/
│   ├── resend.ts                 # CREATE: Lazy-init Resend client (same pattern as supabase-server.ts)
│   ├── analytics.ts              # CREATE: Unified GA4 event helpers (form_submit, calendly_open, whatsapp_click)
│   ├── meta-pixel.ts             # NO CHANGE
│   ├── utm.ts                    # NO CHANGE
│   └── supabase-server.ts        # NO CHANGE
└── .env.example                  # MODIFY: Add RESEND_API_KEY, NEXT_PUBLIC_HOTJAR_ID
```

### Pattern 1: Form Submission with Lead Capture + Analytics
**What:** Unified pattern for all forms submitting to /api/leads
**When to use:** Every form component
**Example:**
```typescript
// In any form component (client-side)
import { getUTMParams } from "@/lib/utm";
import { trackEvent } from "@/lib/meta-pixel";
import { trackFormSubmit } from "@/lib/analytics";

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.currentTarget);
  const utmParams = getUTMParams();

  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.get("name") || null,
      email: formData.get("email"),
      phone: formData.get("phone") || null,
      budget_range: formData.get("budget_range") || null,
      location: formData.get("location") || null,
      source_page: window.location.pathname,
      form_type: "hero",  // unique per form
      ...utmParams,
    }),
  });

  if (res.ok) {
    setSubmitted(true);
    trackEvent("Lead", { content_name: "hero_form" });  // Meta Pixel
    trackFormSubmit("hero");  // GA4
  }

  setLoading(false);
}
```

### Pattern 2: Resend Notification Inside API Route (Server-Side)
**What:** Send team email notification after successful Supabase insert
**When to use:** /api/leads route.ts
**Example:**
```typescript
// In /api/leads/route.ts (after successful Supabase insert)
import { getResend } from "@/lib/resend";

// After: const { error } = await supabase.from("leads").insert({...});
// Before: return NextResponse.json({ success: true });

try {
  const resend = getResend();
  await resend.emails.send({
    from: "SquareMind Leads <leads@squaremind.in>",
    to: ["team@squaremind.in"],  // or from env var
    subject: `New Lead: ${name} (${form_type})`,
    html: `<h2>New Lead from ${form_type}</h2>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Source:</strong> ${source_page}</p>
           <p><strong>UTM Source:</strong> ${utm_source || "direct"}</p>`,
  });
} catch (emailErr) {
  // Log but don't fail the request -- lead is already saved
  console.error("[API /leads] Resend notification failed:", emailErr);
}
```

### Pattern 3: Lazy-Init Resend Client
**What:** Same singleton pattern as supabase-server.ts
**When to use:** src/lib/resend.ts
**Example:**
```typescript
import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (_resend) return _resend;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("[Resend] Missing RESEND_API_KEY");
  }

  _resend = new Resend(apiKey);
  return _resend;
}
```

### Pattern 4: Hotjar Client Component
**What:** Script loader for Hotjar, same pattern as MetaPixel
**When to use:** Root layout
**Example:**
```typescript
"use client";

import Script from "next/script";

export default function Hotjar({ siteId }: { siteId?: string }) {
  if (!siteId) return null;

  return (
    <Script id="hotjar" strategy="afterInteractive">
      {`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${siteId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
    </Script>
  );
}
```

### Pattern 5: GA4 Custom Event Helpers
**What:** Thin wrappers around sendGAEvent for type-safe custom events
**When to use:** src/lib/analytics.ts
**Example:**
```typescript
"use client";

import { sendGAEvent } from "@next/third-parties/google";

export function trackFormSubmit(formType: string) {
  sendGAEvent("event", "form_submit", { form_type: formType });
}

export function trackCalendlyOpen() {
  sendGAEvent("event", "calendly_open", {});
}

export function trackWhatsAppClick() {
  sendGAEvent("event", "whatsapp_click", {});
}
```

### Anti-Patterns to Avoid
- **Separate API routes per form:** Don't create /api/hero-form, /api/consult-form, etc. Use the single /api/leads route with form_type discrimination.
- **Client-side Resend calls:** Never call Resend from client components. The API key is server-only. Always call from the API route.
- **Blocking on email send:** Don't make the API response wait for Resend. If Resend fails, the lead is already saved -- log the error and return success.
- **Using react-hotjar npm package:** Unnecessary dependency for what is just a script tag. Use next/script directly.
- **Duplicating form submission logic:** Extract the fetch + UTM + analytics pattern into a shared helper or use consistent copy-paste pattern across form components.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email sending | Custom SMTP client | Resend SDK | Deliverability, bounce handling, domain verification |
| Session recording | Custom event tracking | Hotjar script | Heatmaps, recordings, funnels built-in |
| GA4 event sending | Direct gtag() calls | sendGAEvent from @next/third-parties | Handles dataLayer setup, SSR safety |
| Calendly scheduling | Custom booking form | react-calendly PopupButton | Calendar sync, timezone handling, reminders |
| Form validation | Custom validation library | HTML5 required + server regex | Already established pattern, keep simple |

## Common Pitfalls

### Pitfall 1: API Route Validation Must Handle Email-Only Forms
**What goes wrong:** The current /api/leads route requires name, email, AND phone. Newsletter and DownloadGate forms only collect email.
**Why it happens:** Phase 1 only had TriCityForm which collects all three fields.
**How to avoid:** Make name and phone conditionally required based on form_type. Newsletter and download_gate forms should only require email. Other form types require all three.
**Warning signs:** 400 errors when submitting newsletter form.

### Pitfall 2: Resend Domain Verification Required Before Sending
**What goes wrong:** Emails from unverified domains are rejected or go to spam.
**Why it happens:** Resend requires DNS records (SPF, DKIM) for custom sender domains.
**How to avoid:** Verify squaremind.in domain in Resend dashboard before implementing. Until verified, use the testing domain (onboarding@resend.dev) for development.
**Warning signs:** 403 errors from Resend API, emails landing in spam.

### Pitfall 3: sendGAEvent Known Issues
**What goes wrong:** GA4 custom events may not appear in GA4 dashboard despite calling sendGAEvent.
**Why it happens:** sendGAEvent uses dataLayer push which requires proper GA4 Enhanced Measurement configuration. Some users report events not registering.
**How to avoid:** Verify events appear in GA4 DebugView (Realtime > Events). If sendGAEvent fails, fallback to direct `window.gtag("event", ...)` call. The GoogleAnalytics component from @next/third-parties loads gtag.js which makes window.gtag available.
**Warning signs:** Events fire in console but don't appear in GA4 dashboard after 24-48 hours.

### Pitfall 4: Hotjar + Next.js SPA Navigation
**What goes wrong:** Hotjar doesn't track page changes on client-side navigation by default.
**Why it happens:** Hotjar relies on full page loads; Next.js client-side routing doesn't trigger them.
**How to avoid:** Hotjar's auto-SPA detection handles this for most cases. Their script version 6 (hjsv:6) includes SPA support that listens for URL changes. No manual intervention needed for basic session recording.
**Warning signs:** Hotjar only shows recordings for landing page, not for subsequent navigated pages.

### Pitfall 5: CalendlyButton rootElement SSR Issue
**What goes wrong:** CalendlyButton crashes on server render because document.body doesn't exist.
**Why it happens:** react-calendly's PopupButton needs a DOM element reference.
**How to avoid:** Already solved in Phase 1 -- CalendlyButton uses useState/useEffect to set rootElement. Just import and use the existing component. Don't create new Calendly components.
**Warning signs:** Hydration errors or "document is not defined" errors.

### Pitfall 6: Newsletter Form Appearing in Multiple Locations
**What goes wrong:** Newsletter forms exist as inline HTML in homepage (src/app/(main)/page.tsx lines 291-296) and blog post pages (src/app/(main)/insights/[slug]/page.tsx lines 126-131). These are currently bare `<form>` elements with no handler.
**Why it happens:** Phase 1 focused on landing page, not site-wide forms.
**How to avoid:** Create a single NewsletterForm client component and replace all inline newsletter form HTML with it. The component handles submission, loading state, success state, and analytics.
**Warning signs:** Forgetting one of the inline forms, leaving dead forms on the site.

## Code Examples

### Modifying /api/leads for Email-Only Forms
```typescript
// Updated validation in /api/leads/route.ts
const emailOnlyFormTypes = ["newsletter", "download_gate"];
const isEmailOnly = emailOnlyFormTypes.includes(form_type as string);

if (!email) {
  return NextResponse.json({ error: "Missing required field: email" }, { status: 400 });
}

if (!isEmailOnly && (!name || !phone)) {
  return NextResponse.json(
    { error: "Missing required fields: name, email, phone" },
    { status: 400 }
  );
}
```

### WhatsApp Float with Environment Variable and Click Tracking
```typescript
"use client";

import { trackWhatsAppClick } from "@/lib/analytics";

export default function WhatsAppFloat() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20strategy%20call`}
      onClick={() => trackWhatsAppClick()}
      className="fixed bottom-7 right-7 z-[90] ..."
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
    >
      {/* SVG icon */}
    </a>
  );
}
```

### CalendlyButton with calendly_open Event
```typescript
// In CalendlyButton.tsx, add GA4 tracking when popup opens
import { trackCalendlyOpen } from "@/lib/analytics";

// The PopupButton doesn't have an onOpen callback, but you can
// track it via the onClick on a wrapper or use useCalendlyEventListener
// with onProfilePageViewed as a proxy for "opened"
useCalendlyEventListener({
  onEventScheduled: () => {
    trackEvent("Schedule");  // Meta Pixel (already exists)
  },
  onProfilePageViewed: () => {
    trackCalendlyOpen();  // GA4 custom event
  },
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Nodemailer + SMTP | Resend API | 2023+ | Simpler API, better deliverability, React email templates |
| Manual gtag() calls | @next/third-parties sendGAEvent | Next.js 14+ | SSR-safe, automatic script loading |
| Hotjar npm packages | next/script with inline JS | Always | No dependency needed for a script tag |

**No deprecated patterns to worry about** -- all Phase 1 code uses current approaches.

## Open Questions

1. **Resend sender domain**
   - What we know: Resend requires verified domain for production sends. squaremind.in needs DNS records.
   - What's unclear: Whether DNS is already configured, who has access to DNS settings.
   - Recommendation: Use `onboarding@resend.dev` for testing. Document DNS setup as a user action item.

2. **Team notification email recipients**
   - What we know: Resend needs a "to" address for notifications.
   - What's unclear: Exact email addresses for the team.
   - Recommendation: Use an env var `RESEND_NOTIFICATION_TO` (comma-separated) so it's configurable without code changes.

3. **GA4 Custom Event Names**
   - What we know: GA4 tracks form_submit, calendly_open, whatsapp_click per requirements.
   - What's unclear: Whether these exact event names are configured in GA4 dashboard.
   - Recommendation: Use these names. Custom events auto-register in GA4 when first fired. Mark them as conversions in GA4 admin afterward.

4. **Hotjar Site ID**
   - What we know: Hotjar requires a site ID from the Hotjar dashboard.
   - What's unclear: Whether a Hotjar account exists yet.
   - Recommendation: Add NEXT_PUBLIC_HOTJAR_ID to .env.example. Component returns null if not set (graceful degradation, same as MetaPixel).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected -- no test framework installed |
| Config file | none -- see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LEAD-01 | HeroForm submits to /api/leads | manual-only | Manual: fill form, check Supabase | N/A |
| LEAD-02 | ConsultForm submits to /api/leads | manual-only | Manual: fill form, check Supabase | N/A |
| LEAD-03 | DownloadGate submits to /api/leads | manual-only | Manual: enter email, check Supabase | N/A |
| LEAD-04 | Newsletter form saves email | manual-only | Manual: enter email, check Supabase | N/A |
| LEAD-07 | Resend email notification | manual-only | Manual: submit form, check team inbox | N/A |
| BOOK-01 | Calendly popup on CTAs | manual-only | Manual: click CTA, verify popup | N/A |
| BOOK-02 | Consultation page Calendly | manual-only | Manual: visit page, verify CTA | N/A |
| BOOK-04 | WhatsApp uses real number | smoke | `grep -q "NEXT_PUBLIC_WHATSAPP_NUMBER" src/components/WhatsAppFloat.tsx` | N/A |
| ANAL-01 | GA4 pageview tracking | manual-only | Manual: verify in GA4 Realtime | N/A |
| ANAL-04 | Meta Pixel Schedule event | manual-only | Manual: book via Calendly, check Pixel Helper | N/A |
| ANAL-05 | Hotjar recording | manual-only | Manual: visit pages, check Hotjar dashboard | N/A |
| ANAL-06 | GA4 custom events | manual-only | Manual: trigger events, check GA4 DebugView | N/A |
| NEWS-01 | Newsletter on homepage + blog | smoke | `grep -q "NewsletterForm" src/app/(main)/page.tsx` | N/A |
| NEWS-02 | Success confirmation UI | manual-only | Manual: submit, verify success state | N/A |

### Sampling Rate
- **Per task commit:** `npx next build` (build must pass)
- **Per wave merge:** Manual smoke test of all forms
- **Phase gate:** All forms submit to Supabase, email notification received, GA4 events visible in DebugView

### Wave 0 Gaps
- No test framework installed -- all validation is build verification + manual testing
- This is acceptable for Phase 2 (forms, analytics, email are inherently integration/E2E concerns that require browser + external services)
- Justification: Adding a test framework is out of scope for this phase. Build verification (`npx next build`) catches type errors and import issues.

## Sources

### Primary (HIGH confidence)
- Next.js official docs - @next/third-parties GoogleAnalytics + sendGAEvent (https://nextjs.org/docs/app/guides/third-party-libraries)
- Resend official docs - Send with Next.js (https://resend.com/docs/send-with-nextjs)
- Existing codebase: src/app/api/leads/route.ts, src/components/*.tsx, src/lib/*.ts

### Secondary (MEDIUM confidence)
- Resend npm v6.9.3 latest stable (https://www.npmjs.com/package/resend)
- Hotjar SPA support documentation (https://help.hotjar.com/hc/en-us/articles/115011805428-Hotjar-on-Single-Page-Apps)
- GA4 sendGAEvent known issues (https://github.com/vercel/next.js/issues/61703)

### Tertiary (LOW confidence)
- None -- all findings verified with official sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries either already installed or well-documented (Resend)
- Architecture: HIGH - Extending established Phase 1 patterns (lazy-init, env-var gating, client components for scripts)
- Pitfalls: HIGH - API validation gap is verified by reading current code; Resend domain verification is standard; sendGAEvent issues documented in Next.js GitHub

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (stable stack, no fast-moving dependencies)
