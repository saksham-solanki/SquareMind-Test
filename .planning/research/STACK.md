# Technology Stack

**Project:** SquareMind Website Revamp (Milestone 2 capabilities)
**Researched:** 2026-03-08
**Overall Confidence:** MEDIUM-HIGH

## Existing Stack (Keep As-Is)

| Technology | Version | Purpose | Status |
|------------|---------|---------|--------|
| Next.js | 16.1.6 | App Router framework | Keep |
| React | 19.2.3 | UI library | Keep |
| TypeScript | 5.x | Type safety | Keep |
| Tailwind CSS | 4.x | Styling | Keep |
| Supabase JS | 2.98.0 | Database client | Keep |
| Framer Motion | 12.35.0 | Animations | Keep |
| Lucide React | 0.577.0 | Icons | Keep |
| clsx + tailwind-merge | 2.1.1 / 3.5.0 | Class utilities | Keep |

## New Stack Additions

### 1. SEO Blog Engine: Velite + MDX

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| velite | 0.3.x | MDX content layer with Zod schemas | Type-safe content, replaces 1041-line posts.ts, generates typed data at build time. Contentlayer is abandoned; Velite is its maintained successor. |
| @mdx-js/mdx | latest | MDX compilation | Required by Velite for MDX processing |
| rehype-pretty-code | latest | Code syntax highlighting | For any technical content in blog posts |
| rehype-slug | latest | Auto-generate heading IDs | Enables anchor links for SEO |

**Confidence:** MEDIUM

**Why Velite over alternatives:**
- **vs Contentlayer:** Contentlayer is unmaintained, does not support Next.js 14+. Velite is the community-adopted replacement.
- **vs Sanity/Contentful (headless CMS):** Overkill for a one-person content operation at bootstrap stage. Adds API dependency, latency, and cost. Saksham writes content himself -- MDX files in the repo give full control, zero cost, and git-based versioning.
- **vs raw @next/mdx:** No content validation, no frontmatter typing, no collection queries. Velite adds the data layer missing from raw MDX.
- **vs next-mdx-remote:** Velite handles the full pipeline (schema validation, collection building, type generation). next-mdx-remote is just a renderer.

**Scaling note for 300+ posts:** Velite processes at build time. At 300 posts this is fine (seconds, not minutes). If content reaches 1000+ posts, re-evaluate with ISR or move to a headless CMS at that point. Do not over-engineer for that scenario now.

**Migration path:** Convert posts.ts entries into individual .mdx files under `content/posts/`. Velite config defines the schema with Zod. Build outputs typed JSON that pages consume. Existing blog routes (`/insights/[slug]`) stay the same.

### 2. Analytics Stack

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @next/third-parties | 16.1.6 | GA4 integration | Official Next.js package. Optimized script loading, no manual Script tags. Match version to Next.js. |

**Confidence:** HIGH (GA4), MEDIUM (Meta Pixel, Hotjar)

**GA4 (Google Analytics 4):**
Use `@next/third-parties/google` -- the `GoogleAnalytics` component. Place in root layout after app content. Set `GA_MEASUREMENT_ID` as env var.

**Meta Pixel:**
No official @next/third-parties support yet (open discussion on vercel/next.js#72777). Use Next.js `<Script>` component with `strategy="afterInteractive"` in a client component. Add `<noscript>` fallback. This is the standard pattern the community uses.

**Hotjar:**
Same approach as Meta Pixel. Client component with `<Script strategy="afterInteractive">`. Load the Hotjar snippet via `dangerouslySetInnerHTML`. No third-party package needed -- the official Hotjar snippet is simple enough.

**All three share a pattern:** Create `src/components/analytics/` with:
- `GoogleAnalytics.tsx` (uses @next/third-parties)
- `MetaPixel.tsx` (client component + Script)
- `Hotjar.tsx` (client component + Script)
- `Analytics.tsx` (barrel component that renders all three)

Gate all behind env vars so they only load in production.

### 3. Form-to-Supabase Pipeline

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| (No new packages) | -- | Form submissions via API routes | Supabase JS 2.98.0 already installed. Move from client-side writes to API routes for security and source tracking. |

**Confidence:** HIGH

**Architecture:**
- Create `app/api/leads/route.ts` -- single API route that accepts all form submissions
- Form data includes: `source_page`, `utm_source`, `utm_medium`, `utm_campaign`, `form_type` (hero/consultation/contact/eoi)
- API route validates with Zod, writes to Supabase `leads` table server-side (using service role key, not anon key)
- Client forms POST to `/api/leads` instead of direct Supabase writes
- This requires Vercel deployment (API routes don't work with static export)

**UTM tracking:** Read UTM params from URL on page load, store in sessionStorage, attach to form submissions. No library needed -- 20 lines of custom code.

### 4. Calendly Booking Integration

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-calendly | 4.4.0 | Calendly embed components | Official-ish React wrapper. Provides InlineWidget, PopupModal, PopupButton. Handles SSR edge cases. |

**Confidence:** HIGH

**Usage pattern:**
- `PopupButton` on all "Book a Call" CTAs across the site (lightweight, no page navigation)
- `InlineWidget` on the Consultation page (full calendar view)
- Wire `onEventScheduled` callback to fire GA4 + Meta Pixel conversion events

**Why not raw embed script:** react-calendly handles React lifecycle, SSR hydration, and event callbacks cleanly. The raw Calendly embed script requires manual useEffect management and doesn't expose scheduling events to React.

**Free tier:** Calendly free supports 1 event type, which is sufficient (30-min strategy call).

### 5. Deployment: Vercel

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | -- | Hosting platform | Zero-config Next.js deployment. Enables API routes, ISR, edge functions. Free tier: 100GB bandwidth, serverless functions, analytics. Required for forms to work. |

**Confidence:** HIGH

**Migration from GitHub Pages:**
1. Remove `GITHUB_PAGES` env var and conditional static export from `next.config.ts`
2. Connect Vercel to GitHub repo (auto-deploy on push)
3. Add env vars in Vercel dashboard (Supabase creds, analytics IDs)
4. Point `squaremind.in` DNS to Vercel
5. Remove `.github/workflows/deploy.yml`

**Config changes to next.config.ts:**
- Remove `output: "export"` conditional
- Remove `basePath: "/SquareMind-Test"`
- Remove `images: { unoptimized: true }` -- Vercel handles image optimization natively

### 6. Email / Newsletter

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| resend | 4.x | Transactional email (lead notifications) | 3,000 emails/month free. First-class Next.js support. React Email templates. Developer-friendly API. |
| @react-email/components | latest | Email templates in JSX | Write email templates as React components. Used with Resend. |

**Confidence:** MEDIUM

**Why Resend over alternatives:**
- **vs Mailchimp:** Mailchimp free tier capped at 500 contacts and bloated for this use case. SquareMind needs transactional emails (lead notifications) + simple newsletter, not a full marketing automation suite.
- **vs SendGrid:** More complex setup, worse DX. Resend is built for developers.
- **vs Buttondown:** Good for newsletters but doesn't handle transactional emails (lead notifications when someone fills a form).
- **vs AWS SES:** Cheapest at scale but painful to set up. Overkill for bootstrap stage.

**Two email use cases:**
1. **Lead notifications:** When someone submits a form, email Saksham + co-founder immediately. Use Resend API from the `/api/leads` route.
2. **Newsletter:** Collect subscribers via signup form. Store in Supabase `subscribers` table. When ready to send, use Resend's batch send or their Audiences feature.

**Free tier:** 3,000 emails/month, 1 domain. More than enough for early-stage lead notifications + occasional newsletters.

**Newsletter collection approach:** For now, just collect emails in Supabase. Don't build a full newsletter sending system yet -- that can wait until there's content to send. Resend's Audiences feature can manage subscriber lists when needed.

### 7. Landing Page System (Meta Ads)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| (No new packages) | -- | Landing pages for ad campaigns | Use existing Next.js pages + components. Landing pages are just focused pages with specific CTAs -- no special framework needed. |

**Confidence:** HIGH

**Pattern:**
- Create pages under `app/(landing)/` route group (no shared layout with main site nav)
- Each landing page gets its own URL: `/tri-city-investing-2025`, etc.
- Minimal navigation (no header menu -- reduce bounce)
- Strong single CTA (Calendly popup or lead form)
- UTM params auto-captured and attached to form submissions
- Meta Pixel fires `ViewContent` on page load, `Lead` on form submit

## Complete New Dependencies

```bash
# Content engine
npm install velite

# Analytics
npm install @next/third-parties@16.1.6

# Calendly
npm install react-calendly@4.4.0

# Email
npm install resend @react-email/components
```

**Dev dependencies:** None new required.

## Environment Variables (New)

```bash
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=XXXXXXX

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/squaremind/30min

# Email
RESEND_API_KEY=re_XXXXXXXXXX
NOTIFICATION_EMAIL=saksham@squaremind.in

# Supabase (existing, add service role for server-side)
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## What NOT to Use

| Technology | Why Not |
|------------|---------|
| Contentlayer | Abandoned. Does not support Next.js 14+. Use Velite instead. |
| Sanity / Contentful / Strapi | Overkill for one-person content operation at bootstrap stage. Adds cost, complexity, and API dependency. Re-evaluate when team grows or content needs non-developer editing. |
| Mailchimp | Bloated, expensive after 500 contacts, poor DX. |
| Google Tag Manager (GTM) | Adds unnecessary layer of indirection. For 3 scripts (GA4, Meta Pixel, Hotjar), direct integration is simpler and more performant. GTM makes sense when marketing team manages 10+ tags -- not here. |
| next-mdx-remote | Just a renderer. Velite provides the full content pipeline (schema, collections, types). |
| Prisma / Drizzle | Already using Supabase JS client. Adding an ORM for simple form writes is unnecessary complexity. |
| NextAuth / Auth.js | No user accounts needed. Out of scope per PROJECT.md. |
| Intercom / Drift / Crisp | WhatsApp handles direct communication per PROJECT.md. No chat widget needed. |
| react-hook-form / Formik | For 3-4 simple forms with 3-5 fields each, native React form handling + Zod validation is sufficient. Adding a form library adds bundle size for minimal benefit. |

## Alternatives Considered (Summary)

| Category | Recommended | Runner-Up | Why Runner-Up Lost |
|----------|-------------|-----------|-------------------|
| Blog engine | Velite + MDX | Sanity | Free, no API dependency, git-versioned, one-person team |
| Analytics (GA4) | @next/third-parties | Manual Script tag | Official package, optimized loading |
| Booking | react-calendly | Raw embed | React lifecycle, event callbacks, SSR handling |
| Email | Resend | SendGrid | Better DX, simpler setup, generous free tier |
| Newsletter storage | Supabase table | Mailchimp | Already have Supabase, no new vendor, free |
| Hosting | Vercel | Netlify | Zero-config Next.js, same company, best SSR support |
| Form handling | Native + Zod | react-hook-form | 3-4 simple forms don't justify a library |

## Sources

- [Velite documentation](https://velite.js.org/)
- [Velite npm](https://www.npmjs.com/package/velite) -- v0.3.x, last updated ~3 months ago
- [Next.js Third Party Libraries guide](https://nextjs.org/docs/app/guides/third-party-libraries)
- [@next/third-parties npm](https://www.npmjs.com/package/@next/third-parties) -- v16.1.6
- [react-calendly npm](https://www.npmjs.com/package/react-calendly) -- v4.4.0
- [Resend Next.js docs](https://resend.com/docs/send-with-nextjs)
- [Resend free tier](https://resend.com/blog/new-free-tier) -- 3,000 emails/month
- [Resend npm](https://www.npmjs.com/package/resend) -- v4.x
- [Meta Pixel in Next.js](https://www.3zerodigital.com/blog/integrating-meta-pixel-in-a-next-js-application-with-the-app-directory)
- [Hotjar Next.js integration](https://zippystarter.com/blog/blog-starter/integrate-hotjar-with-nextjs)
- [Calendly React embed docs](https://help.calendly.com/hc/en-us/articles/31644195810199-How-to-embed-Calendly-in-a-React-app)
- [Contentlayer to Velite migration](https://www.mikevpeeren.nl/blog/refactoring-contentlayer-to-velite)
