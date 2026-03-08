# Phase 1: Ad Launch Pipeline - Research

**Researched:** 2026-03-08
**Domain:** Next.js 16 deployment, Meta Pixel, Supabase lead capture, Calendly integration
**Confidence:** HIGH

## Summary

Phase 1 transforms the current GitHub Pages static export into a fully functional Vercel deployment with API routes, creates a distraction-free Tri-City landing page for Meta ads, wires lead capture to Supabase, installs Meta Pixel with conversion events, adds GA4 tracking, and integrates Calendly popup booking.

The existing codebase is Next.js 16.1.6 with React 19, Tailwind CSS 4, Framer Motion 12, and Supabase JS 2.98. The current `next.config.ts` has a `GITHUB_PAGES` conditional that forces static export with basePath `/SquareMind-Test` -- this must be removed to enable API routes. The static `sitemap.xml` and `robots.txt` in `/public` reference the old GitHub Pages URL and must be replaced. There are no existing API routes or test infrastructure.

**Primary recommendation:** Use Next.js route groups `(landing)` for the distraction-free layout, `next/script` for Meta Pixel, `@next/third-parties/google` for GA4, `react-calendly` PopupButton for booking, and a server-side API route with `SUPABASE_SERVICE_ROLE_KEY` for secure lead insertion.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- Landing page at `/invest/tri-city` is a Tri-City 2026 investment guide -- advisory/educational tone, NOT salesy
- Form fields: Name, Email, Phone/WhatsApp, Location (dropdown of Indian cities), Investment Budget (dropdown with 5 ranges), hidden UTM fields + source page URL
- Calendly as popup on button click (not inline embed), both founders' emails linked
- Meta Pixel fires three events: ViewContent (page load), Lead (form submit), Schedule (Calendly booking)
- GA4 installed site-wide via environment variable
- WhatsApp float uses Business number configured via env var
- Vercel deployment: remove GITHUB_PAGES conditional, static export mode, basePath hack
- Supabase unified `leads` table with specified columns and form_type values
- RLS: anonymous inserts via anon key, only service role can read
- Distraction-free layout: no main nav, focused single CTA
- Mobile-first: 70%+ of Meta ad traffic is mobile

### Claude's Discretion
- Landing page visual design details (sections, layout, imagery approach)
- Exact landing page copy (following SquareMind's editorial voice)
- UTM tracking implementation approach (sessionStorage vs URL params)
- API route structure for form submissions
- Meta Pixel loading strategy (next/script vs @next/third-parties)
- Specific trust signals on landing page (stats, testimonials, credentials)

### Deferred Ideas (OUT OF SCOPE)
- 300-post content map -- Phase 4/6
- URL structure blog posts at /[slug] -- Phase 4
- Curated Deals Architecture -- future phase
- WhatsApp Business API automated notifications -- Phase 2

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFRA-01 | Remove static export, GITHUB_PAGES conditional, basePath hack | next.config.ts cleanup pattern documented |
| INFRA-02 | squaremind.in domain on Vercel with HTTPS | Already deployed; verify DNS settings |
| INFRA-03 | Fix sitemap.xml to reference squaremind.in | Replace static XML with Next.js dynamic sitemap.ts |
| INFRA-04 | Fix robots.txt to reference squaremind.in | Replace static file with Next.js dynamic robots.ts |
| INFRA-05 | API routes work in production | Enabled by removing static export; route handler pattern documented |
| LAND-01 | Tri-City landing page at /invest/tri-city | Route group pattern `(landing)` documented |
| LAND-02 | Distraction-free layout (no nav, focused CTA) | Route group with separate layout.tsx (no Navbar/Footer) |
| LAND-03 | Lead form connected to Supabase with UTM tracking | API route + Supabase service role + UTM sessionStorage pattern |
| LAND-04 | Calendly booking CTA | react-calendly PopupButton with useCalendlyEventListener |
| LAND-05 | Mobile-optimized | Tailwind responsive patterns, existing design system |
| LEAD-05 | UTM parameter capture (source, medium, campaign, content, term) | sessionStorage approach documented |
| LEAD-06 | Source page URL capture | window.location.href in form submission |
| LEAD-08 | Unified leads table in Supabase | SQL schema + RLS policies documented |
| BOOK-03 | Landing page Calendly integration | react-calendly PopupButton component |
| ANAL-02 | Meta Pixel site-wide | next/script with afterInteractive + fbq init pattern |
| ANAL-03 | Meta Pixel fires Lead event on form submit | fbq('track', 'Lead') standard event |

</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | Framework | Already in project |
| react | 19.2.3 | UI library | Already in project |
| @supabase/supabase-js | ^2.98.0 | Database client | Already in project |
| framer-motion | ^12.35.0 | Animations (FadeUp) | Already in project |
| tailwindcss | ^4 | Styling | Already in project |

### New Dependencies
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-calendly | ^4.x | Calendly popup widget | Booking CTA on landing page |
| @next/third-parties | latest | GA4 integration | Site-wide Google Analytics |

### No Package Needed
| Capability | Approach | Why |
|------------|----------|-----|
| Meta Pixel | `next/script` + manual fbq calls | No good maintained Next.js Meta Pixel package; official Vercel example uses raw script injection |
| UTM tracking | sessionStorage + URL parsing | Simple enough; no library needed |
| Sitemap | `src/app/sitemap.ts` export | Next.js built-in metadata API |
| Robots | `src/app/robots.ts` export | Next.js built-in metadata API |

**Installation:**
```bash
npm install react-calendly @next/third-parties
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── (main)/                    # Route group for pages WITH navbar
│   │   └── layout.tsx             # Wraps children with Navbar + Footer
│   ├── (landing)/                 # Route group for landing pages WITHOUT navbar
│   │   ├── layout.tsx             # Minimal layout: no Navbar, no Footer
│   │   └── invest/
│   │       └── tri-city/
│   │           └── page.tsx       # Landing page (server component with metadata)
│   ├── api/
│   │   └── leads/
│   │       └── route.ts           # POST handler for lead form submissions
│   ├── layout.tsx                 # Root layout: fonts, Meta Pixel, GA4, global CSS
│   ├── sitemap.ts                 # Dynamic sitemap pointing to squaremind.in
│   └── robots.ts                  # Dynamic robots.txt pointing to squaremind.in
├── components/
│   ├── TriCityForm.tsx            # Landing page form (client component)
│   ├── CalendlyButton.tsx         # Calendly popup trigger (client component)
│   ├── MetaPixel.tsx              # Meta Pixel script + init (client component)
│   └── UTMCapture.tsx             # Reads UTMs from URL, stores in sessionStorage
└── lib/
    ├── supabase.ts                # Existing client-side Supabase (anon key)
    ├── supabase-server.ts         # Server-side Supabase (service role key)
    ├── meta-pixel.ts              # fbq helper functions with TypeScript types
    └── utm.ts                     # UTM read/write from sessionStorage
```

### Pattern 1: Route Groups for Layout Isolation

**What:** Use Next.js route groups `(main)` and `(landing)` to serve different layouts from the same root layout.

**When to use:** Landing pages that need distraction-free design without the main site Navbar/Footer.

**Critical detail:** The current root `layout.tsx` renders Navbar, Footer, WhatsAppFloat, and StickyMobileCTA directly. These must be moved into `(main)/layout.tsx`. The root layout should ONLY contain `<html>`, `<body>`, fonts, global scripts (Meta Pixel, GA4), and global CSS.

```typescript
// src/app/layout.tsx (ROOT - stripped down)
import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

// ... font setup, metadata ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${dmSans.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        {children}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID} />
        )}
      </body>
    </html>
  );
}

// src/app/(main)/layout.tsx (site pages with nav)
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <StickyMobileCTA />
    </>
  );
}

// src/app/(landing)/layout.tsx (landing pages - distraction free)
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
```

**Migration note:** All existing pages (about, consultation, insights, etc.) must be moved into `(main)/` directory. Their URLs do NOT change because route groups are excluded from the URL path.

### Pattern 2: Meta Pixel as Client Component

**What:** Load Meta Pixel via `next/script` with `afterInteractive` strategy, expose typed helper functions for event tracking.

**Why not @next/third-parties:** `@next/third-parties` has a `GoogleAnalytics` component but no Meta Pixel equivalent. The official Next.js example uses raw script injection.

```typescript
// src/components/MetaPixel.tsx
"use client";

import Script from "next/script";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

export default function MetaPixel({ pixelId }: { pixelId?: string }) {
  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// src/lib/meta-pixel.ts
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
}

// Usage in landing page:
// trackEvent("ViewContent", { content_name: "Tri-City Investment Guide" });
// trackEvent("Lead");
// trackEvent("Schedule");
```

### Pattern 3: Server-Side API Route for Lead Capture

**What:** POST to `/api/leads` which uses the Supabase service role key to insert into the `leads` table. The client form calls this API route instead of directly inserting via the anon key.

**Why:** The anon key should allow inserts via RLS, but using an API route provides: (a) server-side validation, (b) ability to add email notifications later (Phase 2 Resend), (c) rate limiting potential, (d) keeps the service role key server-side only.

```typescript
// src/app/api/leads/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-only, NOT NEXT_PUBLIC_
);

export async function POST(request: Request) {
  const body = await request.json();

  // Validate required fields
  const { name, email, phone } = body;
  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await supabase.from("leads").insert({
    name: body.name,
    email: body.email,
    phone: body.phone,
    budget_range: body.budget_range || null,
    location: body.location || null,
    source_page: body.source_page,
    form_type: body.form_type,
    utm_source: body.utm_source || null,
    utm_medium: body.utm_medium || null,
    utm_campaign: body.utm_campaign || null,
    utm_content: body.utm_content || null,
    utm_term: body.utm_term || null,
  });

  if (error) {
    console.error("Lead insert error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

### Pattern 4: UTM Tracking via sessionStorage

**What:** On landing page mount, read UTM params from URL search params, store in sessionStorage. On form submit, read from sessionStorage and include in API payload.

**Why sessionStorage over URL params:** User may navigate away from the landing page URL (e.g., scroll to a section, interact with popup) and the UTM params could be lost. sessionStorage persists for the tab session.

```typescript
// src/lib/utm.ts
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function captureUTMParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) sessionStorage.setItem(key, value);
  });
}

export function getUTMParams(): Record<string, string | null> {
  if (typeof window === "undefined") return {};
  return Object.fromEntries(UTM_KEYS.map((key) => [key, sessionStorage.getItem(key)]));
}
```

### Pattern 5: Calendly Popup with Event Listener

**What:** Use `react-calendly` PopupButton component wrapped in a "use client" component. Use `useCalendlyEventListener` to detect booking completion and fire Meta Pixel Schedule event.

```typescript
// src/components/CalendlyButton.tsx
"use client";

import { PopupButton, useCalendlyEventListener } from "react-calendly";
import { trackEvent } from "@/lib/meta-pixel";

export default function CalendlyButton({ url, text }: { url: string; text?: string }) {
  useCalendlyEventListener({
    onEventScheduled: () => {
      trackEvent("Schedule");
    },
  });

  return (
    <PopupButton
      url={url}
      rootElement={document.body}
      text={text || "Book Your Free Strategy Call"}
      className="inline-flex items-center justify-center gap-2 bg-sage text-white px-9 py-4 rounded-full text-[16px] font-semibold tracking-[-0.01em] hover:bg-sage-deep hover:scale-[1.03] transition-all duration-300"
    />
  );
}
```

**Critical SSR note:** `react-calendly` accesses `document` which does not exist during SSR. The component MUST be in a "use client" file. If there are still SSR errors, wrap with `next/dynamic`:

```typescript
import dynamic from "next/dynamic";
const CalendlyButton = dynamic(() => import("@/components/CalendlyButton"), { ssr: false });
```

### Anti-Patterns to Avoid
- **Inserting directly from client with anon key:** Exposes insert logic client-side, no server-side validation, harder to add notifications later.
- **Putting Meta Pixel in `<head>` with `dangerouslySetInnerHTML`:** Bypasses Next.js script optimization. Use `next/script` component instead.
- **Static sitemap.xml / robots.txt in /public:** Hard to maintain. Use Next.js metadata API (`sitemap.ts`, `robots.ts`) which auto-generates from code.
- **Inline Calendly embed on landing page:** Takes up visual space, loads slow, breaks mobile UX. Popup on click is cleaner.
- **Reading UTM params only at form submit time:** If user navigated to a different URL before submitting, UTMs are lost. Capture on page load into sessionStorage.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Calendly scheduling | Custom calendar widget | react-calendly PopupButton | Handles OAuth, timezone, availability logic |
| GA4 script loading | Manual script tag | @next/third-parties GoogleAnalytics | Optimized loading, SSR-safe, maintained by Vercel |
| Sitemap generation | Static XML file | Next.js `sitemap.ts` metadata API | Auto-updates, type-safe, no manual URL management |
| Robots.txt | Static file | Next.js `robots.ts` metadata API | Dynamic, can reference correct domain |

**Key insight:** This phase is integration-heavy, not logic-heavy. Every external service (Meta Pixel, GA4, Calendly, Supabase) has a well-established integration pattern. The risk is in wiring them together wrong, not in building custom logic.

## Common Pitfalls

### Pitfall 1: Static Export Blocking API Routes
**What goes wrong:** If `output: "export"` remains in `next.config.ts`, API routes will silently not work in production (they work in dev).
**Why it happens:** The GITHUB_PAGES conditional in the current config enables static export. Forgetting to fully remove it (or having it activate via an env var on Vercel) breaks the entire lead capture pipeline.
**How to avoid:** Completely remove the `isGitHubPages` conditional and all static export configuration from `next.config.ts`. Verify on Vercel that the build type is "Server" not "Static".
**Warning signs:** Form submissions returning 404 in production but working in dev.

### Pitfall 2: Meta Pixel Not Firing Due to Consent/Script Loading
**What goes wrong:** Meta Pixel events don't fire, or fire before the pixel is initialized.
**Why it happens:** Using `beforeInteractive` can cause hydration issues; using `lazyOnload` means the pixel isn't ready when ViewContent should fire on page load.
**How to avoid:** Use `afterInteractive` strategy. For ViewContent on the landing page, fire in a useEffect that checks `window.fbq` exists. Add a small retry/polling mechanism or listen for the script's `onLoad` callback.
**Warning signs:** Meta Pixel Helper extension shows no events or shows errors.

### Pitfall 3: Calendly PopupButton SSR Crash
**What goes wrong:** `ReferenceError: document is not defined` during server-side rendering.
**Why it happens:** `react-calendly` requires `document.body` for the `rootElement` prop, which doesn't exist during SSR.
**How to avoid:** Mark component file as "use client". If still failing, use `dynamic(() => import(...), { ssr: false })`. Set `rootElement` inside a `useEffect` or guard with `typeof document !== 'undefined'`.
**Warning signs:** Build fails or white screen with console error about document.

### Pitfall 4: Supabase Service Role Key Exposed Client-Side
**What goes wrong:** The service role key (which bypasses RLS) is accidentally prefixed with `NEXT_PUBLIC_` and bundled into client-side JavaScript.
**Why it happens:** Copy-paste from the existing `NEXT_PUBLIC_SUPABASE_ANON_KEY` pattern.
**How to avoid:** Name the env var `SUPABASE_SERVICE_ROLE_KEY` (NO `NEXT_PUBLIC_` prefix). Only use it inside `src/app/api/` route handlers. Verify it's not in the client bundle.
**Warning signs:** Service role key visible in browser DevTools network tab or source.

### Pitfall 5: Route Group Migration Breaking Existing Pages
**What goes wrong:** Moving existing pages into `(main)/` route group changes their import paths or breaks existing links.
**Why it happens:** Files physically move directories, which can break relative imports.
**How to avoid:** The `@/` alias in tsconfig resolves to `src/`, so component imports stay the same. Only page files themselves move. Test all existing pages after the migration.
**Warning signs:** 404 errors on existing pages after deployment.

### Pitfall 6: Sitemap/Robots Still Referencing Old Domain
**What goes wrong:** Google indexes the wrong URLs.
**Why it happens:** Forgetting to delete the static files in `/public` after creating the dynamic ones. Next.js serves `/public` files first, so `public/sitemap.xml` takes precedence over `src/app/sitemap.ts`.
**How to avoid:** DELETE `public/sitemap.xml` and `public/robots.txt` before creating the dynamic versions.
**Warning signs:** Visiting squaremind.in/sitemap.xml still shows GitHub Pages URLs.

## Code Examples

### Supabase `leads` Table SQL

```sql
-- Create unified leads table
CREATE TABLE public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  email text NOT NULL,
  phone text,
  budget_range text,
  location text,
  source_page text,
  form_type text NOT NULL DEFAULT 'landing_tri_city',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (anon key can insert)
CREATE POLICY "Allow anonymous inserts" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies for anon = only service role can read
-- Service role key ALWAYS bypasses RLS, so no policy needed for reads
```

### Dynamic Sitemap

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://squaremind.in";
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/consultation`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/research`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/invest/tri-city`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/frameworks`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/properties`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), priority: 0.3 },
  ];
}
```

### Dynamic Robots.txt

```typescript
// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://squaremind.in/sitemap.xml",
  };
}
```

### Environment Variables Needed

```env
# Existing
NEXT_PUBLIC_SUPABASE_URL=https://skyozasquqndkmwcrnrp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# New for Phase 1
SUPABASE_SERVICE_ROLE_KEY=          # From Supabase dashboard > Settings > API
NEXT_PUBLIC_META_PIXEL_ID=          # From Meta Events Manager (placeholder until created)
NEXT_PUBLIC_GA4_ID=                 # From GA4 admin (placeholder until created)
NEXT_PUBLIC_CALENDLY_URL=           # e.g., https://calendly.com/squaremind/strategy-call
NEXT_PUBLIC_WHATSAPP_NUMBER=        # WhatsApp Business number (placeholder)
NEXT_PUBLIC_SITE_URL=https://squaremind.in
```

### Cleaned next.config.ts

```typescript
// src/next.config.ts -- after cleanup
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No static export, no basePath, no GITHUB_PAGES conditional
};

export default nextConfig;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Static sitemap.xml in /public | `src/app/sitemap.ts` metadata API | Next.js 13+ | Auto-generated, type-safe |
| Static robots.txt in /public | `src/app/robots.ts` metadata API | Next.js 13+ | Dynamic, correct domain |
| Manual GA4 script tags | `@next/third-parties/google` GoogleAnalytics | Next.js 14+ | Optimized loading, SSR-safe |
| GitHub Pages static export | Vercel with API routes | Already deployed to Vercel | Unlocks server-side functionality |
| Separate form tables | Unified `leads` table with form_type | This phase | Single source of truth for all leads |

**Deprecated/outdated:**
- `output: "export"` in next.config -- was needed for GitHub Pages, no longer relevant on Vercel
- `basePath: "/SquareMind-Test"` -- artifact of GitHub Pages repo name
- Static `public/sitemap.xml` and `public/robots.txt` -- replaced by dynamic metadata API

## Open Questions

1. **Calendly Account Setup**
   - What we know: Calendly account needs to be created; both founders' emails should be linked
   - What's unclear: Exact Calendly URL and event type slug
   - Recommendation: Use `NEXT_PUBLIC_CALENDLY_URL` env var as placeholder; configure once Calendly account is set up

2. **Meta Pixel ID**
   - What we know: Needs to be created in Meta Events Manager
   - What's unclear: The actual Pixel ID
   - Recommendation: Code with env var placeholder; conditionally render (skip if ID not set)

3. **GA4 Measurement ID**
   - What we know: GA4 needs to be created
   - What's unclear: The actual Measurement ID
   - Recommendation: Same env var placeholder approach

4. **WhatsApp Business Number**
   - What we know: User wants Business number, not personal
   - What's unclear: The actual number
   - Recommendation: Env var placeholder, current component already hardcodes a placeholder

5. **Indian Cities List for Location Dropdown**
   - What we know: Need a dropdown of Indian cities
   - What's unclear: Which cities to include, ordering
   - Recommendation: Include top 20-30 Indian cities plus "Other" option, ordered by population/relevance to real estate investment

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected -- needs setup |
| Config file | none -- see Wave 0 |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INFRA-01 | next.config.ts has no static export | unit | `npx vitest run tests/infra.test.ts -t "no static export"` | No -- Wave 0 |
| INFRA-03 | Sitemap references squaremind.in | unit | `npx vitest run tests/sitemap.test.ts` | No -- Wave 0 |
| INFRA-04 | Robots references squaremind.in | unit | `npx vitest run tests/robots.test.ts` | No -- Wave 0 |
| INFRA-05 | API route returns 200 on valid POST | integration | `npx vitest run tests/api-leads.test.ts` | No -- Wave 0 |
| LEAD-05 | UTM params captured from URL | unit | `npx vitest run tests/utm.test.ts` | No -- Wave 0 |
| LEAD-06 | Source page URL included in submission | unit | `npx vitest run tests/utm.test.ts -t "source page"` | No -- Wave 0 |
| LEAD-08 | Lead insert includes all required fields | integration | `npx vitest run tests/api-leads.test.ts -t "all fields"` | No -- Wave 0 |
| ANAL-02 | Meta Pixel script renders with ID | unit | `npx vitest run tests/meta-pixel.test.ts` | No -- Wave 0 |
| ANAL-03 | trackEvent calls fbq with Lead | unit | `npx vitest run tests/meta-pixel.test.ts -t "Lead event"` | No -- Wave 0 |
| LAND-02 | Landing layout has no Navbar | unit | `npx vitest run tests/landing-layout.test.ts` | No -- Wave 0 |
| LAND-05 | Landing page renders on mobile viewport | manual-only | Meta Pixel Helper + Chrome DevTools | N/A |
| BOOK-03 | Calendly button renders | unit | `npx vitest run tests/calendly.test.ts` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] Install vitest: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom`
- [ ] Create `vitest.config.ts` with jsdom environment and React plugin
- [ ] `tests/infra.test.ts` -- covers INFRA-01, INFRA-03, INFRA-04
- [ ] `tests/api-leads.test.ts` -- covers INFRA-05, LEAD-08
- [ ] `tests/utm.test.ts` -- covers LEAD-05, LEAD-06
- [ ] `tests/meta-pixel.test.ts` -- covers ANAL-02, ANAL-03
- [ ] `tests/landing-layout.test.ts` -- covers LAND-02
- [ ] `tests/calendly.test.ts` -- covers BOOK-03

## Sources

### Primary (HIGH confidence)
- Existing codebase: `package.json`, `next.config.ts`, `layout.tsx`, `supabase.ts`, `HeroForm.tsx` -- read directly
- [Next.js Route Groups docs](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups) -- layout isolation pattern
- [Meta Pixel Reference](https://developers.facebook.com/docs/meta-pixel/reference) -- standard events including ViewContent, Lead, Schedule
- [Meta Pixel Conversion Tracking](https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking/) -- fbq('track') syntax
- [@next/third-parties docs](https://nextjs.org/docs/app/guides/third-party-libraries) -- GoogleAnalytics component
- [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security) -- policy syntax for anon insert

### Secondary (MEDIUM confidence)
- [react-calendly npm](https://www.npmjs.com/package/react-calendly) -- PopupButton API, useCalendlyEventListener
- [Next.js with-facebook-pixel example](https://github.com/vercel/next.js/tree/canary/examples/with-facebook-pixel) -- script injection pattern
- [Calendly SSR issue #105](https://github.com/tcampb/react-calendly/issues/105) -- document.body SSR fix

### Tertiary (LOW confidence)
- None -- all findings verified with primary or secondary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries verified via existing package.json and official docs
- Architecture: HIGH -- route groups are well-documented Next.js feature; patterns verified against official docs
- Pitfalls: HIGH -- derived from actual codebase analysis (found the GITHUB_PAGES conditional, static files, etc.)
- Meta Pixel events: HIGH -- Schedule confirmed as standard event via official Meta Pixel Reference docs
- Calendly SSR: MEDIUM -- workaround pattern from GitHub issues, may need dynamic import depending on react-calendly version

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable stack, well-established patterns)
