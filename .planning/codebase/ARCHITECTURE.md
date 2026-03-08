# Architecture

**Analysis Date:** 2026-03-08

## Pattern Overview

**Overall:** Next.js App Router - Static-first marketing site with client-side interactivity

**Key Characteristics:**
- Static site generation (SSG) with `output: "export"` for GitHub Pages deployment
- No API routes in production (static export); forms use client-side stubs or console logging
- All content is hardcoded in TypeScript files (no CMS, no MDX, no filesystem content)
- Blog posts stored as a massive array of objects with inline HTML content in `src/lib/posts.ts`
- Supabase client exists but is only used by `EOIForm` (properties page); forms on other pages are non-functional stubs
- No server-side rendering; no middleware; no route handlers

## Layers

**Presentation Layer (Pages):**
- Purpose: Route-level page components with metadata exports for SEO
- Location: `src/app/*/page.tsx`
- Contains: Page-specific content data (hardcoded arrays), layout composition, metadata exports
- Depends on: Components, lib utilities
- Used by: Next.js App Router

**Shared Layout:**
- Purpose: Global shell wrapping all pages (Navbar, Footer, WhatsApp float, mobile CTA)
- Location: `src/app/layout.tsx`
- Contains: Font configuration (DM Sans, Instrument Serif), JSON-LD structured data, global metadata
- Depends on: `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/WhatsAppFloat.tsx`, `src/components/StickyMobileCTA.tsx`
- Used by: Every page

**Component Layer:**
- Purpose: Reusable UI components
- Location: `src/components/`
- Contains: Forms, animations, navigation, FAQ accordions, filter pills
- Depends on: `src/lib/cn.ts`, framer-motion, lucide-react
- Used by: Pages

**Calculator Components:**
- Purpose: Interactive real estate investment calculators
- Location: `src/components/calculators/`
- Contains: `RentalYieldCalc.tsx`, `BuyVsRentCalc.tsx`, `TotalCostCalc.tsx`
- Depends on: React state only (no external data)
- Used by: `src/app/tools/page.tsx`

**Library Layer:**
- Purpose: Shared utilities and data
- Location: `src/lib/`
- Contains: CSS class merging utility, blog post data, Supabase client
- Depends on: clsx, tailwind-merge, @supabase/supabase-js
- Used by: Components and Pages

**Styling Layer:**
- Purpose: Design system via CSS custom properties and Tailwind v4
- Location: `src/app/globals.css`
- Contains: Custom color palette (ink, chalk, cream, sage), font definitions, prose styles for blog content
- Depends on: Tailwind CSS v4
- Used by: All components via Tailwind utility classes

## Data Flow

**Blog Content Flow:**
1. All blog posts defined as `Post[]` array in `src/lib/posts.ts` with inline HTML `content` field
2. `src/app/insights/page.tsx` imports full array, renders listing
3. `src/app/insights/[slug]/page.tsx` calls `getPostBySlug()` and `getRelatedPosts()` from `src/lib/posts.ts`
4. `generateStaticParams()` pre-renders all slugs at build time
5. Blog content rendered via `dangerouslySetInnerHTML` with `.prose-squaremind` CSS class

**Form Submission Flow (HeroForm, ConsultForm):**
1. User fills form in client component
2. `handleSubmit` simulates a delay with `setTimeout(r, 1000)`
3. Sets `submitted = true` to show success state
4. No actual data is sent anywhere -- these are non-functional stubs

**EOI Form Submission Flow (Properties page):**
1. User fills form in `src/components/EOIForm.tsx`
2. Attempts `fetch("/api/eoi")` first (for server deployments)
3. On failure (static export), falls back to `console.log()` of form data
4. Supabase client in `src/lib/supabase.ts` exists but is not imported by EOIForm

**State Management:**
- No global state management (no Context, no Zustand, no Redux)
- All state is local component state via `useState`
- Interactive components: form submission states, mobile menu toggle, scroll detection, calculator inputs, FAQ accordion open/close

## Key Abstractions

**FadeUp Animation Wrapper:**
- Purpose: Scroll-triggered fade-in-up animation for any content block
- Examples: `src/components/FadeUp.tsx`
- Pattern: Wraps children in `motion.div` with `whileInView` trigger, configurable `delay` prop

**Form Components:**
- Purpose: Lead capture forms with identical UX patterns (loading state, success state)
- Examples: `src/components/HeroForm.tsx`, `src/components/ConsultForm.tsx`, `src/components/EOIForm.tsx`
- Pattern: `useState` for `loading`/`submitted`, form renders success message when `submitted === true`

**FAQ Accordions:**
- Purpose: Expandable question/answer lists
- Examples: `src/components/FAQ.tsx` (self-contained data), `src/components/FAQList.tsx` (receives `items` prop)
- Pattern: `useState<number | null>` for open index, `AnimatePresence` for expand/collapse animation

**cn() Utility:**
- Purpose: Merge Tailwind classes with conflict resolution
- Examples: `src/lib/cn.ts`
- Pattern: `clsx()` piped through `twMerge()` -- standard shadcn/ui pattern

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page load
- Responsibilities: Font loading, global metadata, JSON-LD, shell layout (Navbar + Footer + floating CTAs)

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: Route `/`
- Responsibilities: Hero with lead capture form, stats, value proposition, testimonials, research preview, newsletter signup, final CTA

**Tools Layout:**
- Location: `src/app/tools/layout.tsx`
- Triggers: Route `/tools`
- Responsibilities: Provides metadata separately since tools page is `"use client"` (cannot export metadata from client components)

**Dynamic Blog Post:**
- Location: `src/app/insights/[slug]/page.tsx`
- Triggers: Route `/insights/{slug}`
- Responsibilities: Static generation of individual blog posts with SEO metadata, structured data, related posts

## Error Handling

**Strategy:** Minimal -- mostly `notFound()` for missing blog slugs

**Patterns:**
- `src/app/insights/[slug]/page.tsx`: Calls `notFound()` if `getPostBySlug(slug)` returns falsy
- `src/lib/supabase.ts`: Returns `null` with `console.warn` if env vars missing
- `src/components/EOIForm.tsx`: try/catch with error state displayed in UI; fallback from API route to console.log

## Cross-Cutting Concerns

**Logging:** `console.warn` in Supabase client, `console.log` in EOIForm fallback. No structured logging.

**Validation:** HTML5 form validation only (`required` attributes). No schema validation (no Zod, no Yup).

**Authentication:** None. No auth system. Supabase anon key used for public inserts only.

**SEO:** Extensive -- every page exports `metadata` with title, description, OpenGraph, Twitter cards. Blog posts have `alternates.canonical`, `keywords`, and Article structured data. Global JSON-LD Organization schema in root layout. `robots.txt` and `sitemap.xml` in `public/`.

**Animations:** Framer Motion used globally via `FadeUp` wrapper and in FAQ accordions via `AnimatePresence`.

**Responsive Design:** Mobile-first with `max-lg:` breakpoints. Sticky mobile CTA bar (`StickyMobileCTA`), WhatsApp float repositioned on mobile.

---

*Architecture analysis: 2026-03-08*
