# Architecture Patterns

**Domain:** Proptech advisory lead-gen website
**Researched:** 2026-03-08

## Current Architecture

```
GitHub Pages (static export)
    |
    v
Next.js App Router (static HTML/CSS/JS)
    |
    v
Client-side Supabase writes (anon key exposed, no server validation)
```

**Problems:** No API routes (static export), client-side DB writes (insecure), no server-side logic possible, no image optimization.

## Target Architecture

```
Vercel (SSR + API routes)
    |
    v
Next.js App Router
    |-- Server Components (pages, layouts)
    |-- Client Components (forms, animations, analytics, Calendly)
    |-- API Routes (/api/leads, /api/newsletter)
    |       |
    |       v
    |   Supabase (service role key -- server-side only)
    |       |-- leads table
    |       |-- subscribers table
    |       |-- eoi_submissions table (existing)
    |       v
    |   Resend (transactional email)
    |
    |-- Static Content (Velite build)
    |       |-- content/posts/*.mdx -> typed JSON at build
    |       v
    |   Blog pages (SSG with generateStaticParams)
    |
    v
Third-party scripts (client-side)
    |-- GA4 (@next/third-parties)
    |-- Meta Pixel (Script component)
    |-- Hotjar (Script component)
    |-- Calendly (react-calendly)
```

## Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `app/(main)/` | Main site pages with full nav/footer | Layout, components |
| `app/(landing)/` | Ad landing pages, stripped nav | Forms, Calendly, analytics |
| `app/api/leads/` | Form submission endpoint | Supabase, Resend |
| `app/api/newsletter/` | Newsletter signup endpoint | Supabase |
| `src/components/analytics/` | Analytics script components | GA4, Meta Pixel, Hotjar |
| `src/components/forms/` | Reusable form components | API routes |
| `src/components/calendly/` | Calendly embed wrappers | react-calendly, analytics |
| `src/lib/supabase-server.ts` | Server-side Supabase client (service role) | API routes |
| `src/lib/supabase.ts` | Client-side Supabase client (anon key) | Keep for read-only client queries if needed |
| `src/lib/utm.ts` | UTM parameter capture/retrieval | Forms |
| `content/posts/` | MDX blog content files | Velite build pipeline |
| `velite.config.ts` | Content schema definitions | Build process |

## Data Flow

### Lead Capture Flow
```
1. Visitor lands on page (UTM params captured -> sessionStorage)
2. Visitor fills form (hero, consultation, contact, or EOI)
3. Client component POSTs to /api/leads with:
   - Form data (name, email, phone, message)
   - source_page (which page the form is on)
   - utm_source, utm_medium, utm_campaign (from sessionStorage)
   - form_type (hero | consultation | contact | eoi)
4. API route validates with Zod
5. API route writes to Supabase `leads` table (service role key)
6. API route sends notification email via Resend
7. API route returns success/error to client
8. Client shows success state
```

### Blog Content Flow
```
1. Author writes .mdx file in content/posts/
2. Frontmatter: title, slug, excerpt, category, publishedAt, seoTitle, seoDescription
3. `npm run build` triggers Velite
4. Velite validates frontmatter against Zod schema
5. Velite compiles MDX and outputs typed JSON
6. Blog listing page queries Velite output (sorted, filtered by category)
7. Blog post pages use generateStaticParams for SSG
8. Each post gets automatic SEO meta tags from frontmatter
```

### Analytics Event Flow
```
1. Analytics components load in root layout (production only)
2. Page views tracked automatically by GA4
3. Custom events fired on:
   - Form submission (GA4 event + Meta Pixel Lead event)
   - Calendly scheduling (GA4 event + Meta Pixel Schedule event)
   - CTA clicks (GA4 event)
4. Meta Pixel fires ViewContent on landing pages
5. Hotjar records sessions passively
```

## Patterns to Follow

### Pattern 1: Server-Side Form Handling
**What:** All form writes go through API routes, never directly from client to Supabase.
**When:** Every form submission.
**Why:** Hides service role key, enables server-side validation, allows side effects (email notifications), centralizes lead tracking logic.
```typescript
// app/api/leads/route.ts
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
)

export async function POST(request: Request) {
  const body = await request.json()
  const validated = leadSchema.parse(body) // Zod

  const { error } = await supabase.from('leads').insert(validated)
  if (error) return Response.json({ error: 'Failed' }, { status: 500 })

  // Send notification email
  await resend.emails.send({ /* ... */ })

  return Response.json({ success: true })
}
```

### Pattern 2: Environment-Gated Analytics
**What:** Analytics components only render when env vars are set.
**When:** All third-party scripts.
**Why:** No tracking in development, no errors when IDs aren't configured yet.
```typescript
// src/components/analytics/Analytics.tsx
'use client'
export function Analytics() {
  return (
    <>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && <GoogleAnalytics />}
      {process.env.NEXT_PUBLIC_META_PIXEL_ID && <MetaPixel />}
      {process.env.NEXT_PUBLIC_HOTJAR_ID && <Hotjar />}
    </>
  )
}
```

### Pattern 3: UTM Capture on Mount
**What:** Capture UTM params from URL on first page load, persist in sessionStorage.
**When:** Root layout mount.
**Why:** UTM params are only in the landing URL. Navigation loses them. sessionStorage persists across pages but not across sessions (correct behavior -- each visit is a new session).
```typescript
// src/lib/utm.ts
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

export function captureUTMParams() {
  const params = new URLSearchParams(window.location.search)
  UTM_KEYS.forEach(key => {
    const value = params.get(key)
    if (value) sessionStorage.setItem(key, value)
  })
}

export function getUTMParams() {
  return Object.fromEntries(
    UTM_KEYS.map(key => [key, sessionStorage.getItem(key) || ''])
  )
}
```

### Pattern 4: Route Groups for Layout Variants
**What:** Use Next.js route groups to separate main site layout from landing page layout.
**When:** Landing pages for ads need a different layout (no nav, focused CTA).
**Why:** Route groups `(main)` and `(landing)` share the root layout (analytics, fonts) but have different sub-layouts (nav/no-nav).

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client-Side Supabase Writes for Sensitive Data
**What:** Using anon key from client components to write lead data directly.
**Why bad:** Anon key is exposed in browser. RLS helps but is not a substitute for proper server-side validation. Can't trigger side effects (email notifications).
**Instead:** API routes with service role key.

### Anti-Pattern 2: Loading All Analytics Scripts Eagerly
**What:** Using `beforeInteractive` strategy for analytics scripts.
**Why bad:** Blocks page rendering. Analytics should never delay user experience.
**Instead:** Use `afterInteractive` (GA4, Meta Pixel) or `lazyOnload` (Hotjar) strategies.

### Anti-Pattern 3: Storing Blog Content in Database
**What:** Putting blog posts in Supabase instead of MDX files.
**Why bad:** Adds runtime dependency, latency, and complexity. Blog content is static -- it changes when you publish, not when users interact. No need for a database.
**Instead:** MDX files + Velite build-time processing. Static generation is faster and simpler.

### Anti-Pattern 4: Building a Custom Newsletter System Early
**What:** Creating send, unsubscribe, template, and scheduling features for newsletters.
**Why bad:** Massive scope creep. You have zero subscribers right now.
**Instead:** Collect emails in Supabase. Use Resend manually or via their dashboard when ready to send. Build automation only when volume demands it.

## Scalability Considerations

| Concern | At current (0 leads/day) | At 10 leads/day | At 100 leads/day |
|---------|--------------------------|------------------|-------------------|
| Form handling | API route + Supabase free tier | Same, well within limits | Same, Supabase free tier handles this easily |
| Email notifications | Resend free tier (3K/month) | ~300/month, fine | ~3K/month, hitting free tier limit. Upgrade to $20/month plan. |
| Blog build time | Seconds with 20 posts | Seconds with 100 posts | 10-30 seconds with 300 posts. Still acceptable. |
| Analytics | Free tiers sufficient | Same | Same -- GA4/Meta Pixel/Hotjar all scale to millions |
| Vercel hosting | Free tier | Free tier | Free tier handles up to ~100K page views/month |

## Sources

- Next.js App Router documentation
- Supabase client-side vs server-side patterns
- Vercel deployment architecture
