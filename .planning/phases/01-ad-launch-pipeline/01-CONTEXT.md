# Phase 1: Ad Launch Pipeline - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Deploy SquareMind to Vercel with working API routes, create a Tri-City investment guide landing page at /invest/tri-city optimized for Meta ads, wire up the lead capture form to Supabase with UTM tracking, install Meta Pixel with conversion events, and integrate Calendly booking. This is everything needed to start running paid Meta ads this week.

</domain>

<decisions>
## Implementation Decisions

### Landing Page Content (/invest/tri-city)
- Page is a Tri-City 2026 investment guide — educates visitors about Chandigarh, Mohali, Panchkula real estate opportunity
- Tone: advisory/educational, NOT salesy — build trust so they book a consultation
- Content should cover: why Tri-City is a smart investment, key developments happening, how SquareMind helps navigate it
- Must build maximum trust and credibility — the goal is to convert Meta ad visitors into consultation bookings
- Meta ads will promote specific Homeland builder projects — the landing page captures interested visitors and funnels them to strategy call
- Distraction-free layout: no main nav, focused single CTA (book a call / submit form)
- Mobile-first: 70%+ of Meta ad traffic is mobile

### Form Fields
- Name (text)
- Email (text)
- Phone/WhatsApp (text)
- Location — dropdown with list of Indian cities (where they currently live)
- Investment Budget — dropdown: ₹50L–₹1Cr, ₹1Cr–₹3Cr, ₹3Cr–₹5Cr, ₹5Cr–₹10Cr, ₹10Cr+
- Hidden fields: UTM source, medium, campaign, content, term + source page URL

### Calendly Integration
- Popup on button click (not inline embed) — cleaner UX
- Both founders' emails linked on Calendly so both receive bookings
- CTA text: "Book Your Free Strategy Call" or similar
- Calendly account needs to be created (not set up yet)

### Meta Pixel Events
- All three conversion events on the landing page:
  1. ViewContent — fires on page load (for retargeting audiences)
  2. Lead — fires on form submission (primary conversion event for ad optimization)
  3. Schedule — fires on Calendly booking completion (highest-value conversion)
- Meta Pixel ID needs to be created in Meta Events Manager (not set up yet)
- Must be verifiable via Meta Pixel Helper browser extension before ads launch

### Google Analytics
- GA4 needs to be created (no Measurement ID yet)
- Install GA4 site-wide during this phase (not just landing page) — via environment variable so it's easy to add later

### WhatsApp Float
- User wants WhatsApp Business number, NOT personal number
- WhatsApp button should drive to booking consultation, not just chat
- Number to be provided after WhatsApp Business setup
- For now: configure as environment variable so it's easy to update

### Vercel Deployment
- Already deployed via GitHub → Vercel → squaremind.in
- Need to remove GITHUB_PAGES conditional, static export mode, basePath hack
- Enable API routes (Next.js route handlers)
- Fix sitemap.xml and robots.txt to point to squaremind.in

### Supabase Schema
- Create unified `leads` table (replacing separate eoi_submissions)
- Columns: id, name, email, phone, budget_range, location, source_page, form_type, utm_source, utm_medium, utm_campaign, utm_content, utm_term, created_at
- form_type values: 'landing_tri_city', 'hero', 'consultation', 'download', 'newsletter', 'eoi'
- RLS: allow anonymous inserts via anon key, only service role can read

### Claude's Discretion
- Landing page visual design details (sections, layout, imagery approach)
- Exact landing page copy (following SquareMind's editorial voice)
- UTM tracking implementation approach (sessionStorage vs URL params)
- API route structure for form submissions
- Meta Pixel loading strategy (next/script vs @next/third-parties)
- Specific trust signals on landing page (stats, testimonials, credentials)

</decisions>

<specifics>
## Specific Ideas

- Meta ads will be about Homeland builder projects in Tri-City — the landing page should feel like a natural next step for someone who clicked a Homeland-related ad
- The wireframe document (SquareMind_Website_Wireframe.html) has detailed design specs including color palette, typography, and component styles
- The 300-post content map (SquareMind_300_Post_Content_Map.xlsx) has URL structures: blog posts at squaremind.in/[primary-keyword-slug] — this affects how the sitemap should be structured
- Existing design system: Instrument Serif + DM Sans, Sage (#2A6F5A) / Ink (#0D0D0D) / Cream (#F5F0E8) / Chalk (#FAFAF7)
- All analytics IDs (GA4, Meta Pixel) and WhatsApp number will be configured via environment variables — placeholders for now, real values added before ads launch
- The Curated Deals Architecture doc exists (SquareMind_Curated_Deals_Architecture.docx) — relevant for future phases, not Phase 1

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `FadeUp` component (`src/components/FadeUp.tsx`): Scroll-triggered animation wrapper — use on landing page sections
- `cn()` utility (`src/lib/cn.ts`): Tailwind class merging — use for conditional styles
- `HeroForm` component (`src/components/HeroForm.tsx`): Form pattern with loading/success states — adapt for landing page form (add location dropdown, connect to Supabase)
- `supabase.ts` (`src/lib/supabase.ts`): Singleton Supabase client — extend for new leads table
- `globals.css` (`src/app/globals.css`): Full design system with custom properties — reuse all colors and typography

### Established Patterns
- Client components marked with "use client" for interactive forms
- Server components for page-level content with metadata exports
- Form pattern: useState for loading/submitted, show success message after submit
- Tailwind utility classes with custom theme colors (text-sage, bg-cream, etc.)

### Integration Points
- Landing page needs a new route group: `src/app/(landing)/invest/tri-city/page.tsx` with its own layout (no Navbar/Footer)
- API route for form submission: `src/app/api/leads/route.ts`
- Supabase client needs service role key for server-side writes (add to .env.local)
- Meta Pixel and GA4 script injection in root layout or landing layout
- Environment variables for all external service IDs

</code_context>

<deferred>
## Deferred Ideas

- The 300-post content map (Excel spreadsheet) has a complete publishing schedule, pillar page structure, internal linking rules, and SEO specs — this feeds directly into Phase 4 (Blog Engine) and Phase 6 (Content at Scale)
- URL structure from the content map: blog posts should be at squaremind.in/[slug] NOT squaremind.in/insights/[slug] — this is a Phase 4 decision that will require URL migration
- Curated Deals Architecture document — relevant for future Properties page revamp
- WhatsApp Business API integration for automated lead notifications — Phase 2

</deferred>

---

*Phase: 01-ad-launch-pipeline*
*Context gathered: 2026-03-08*
