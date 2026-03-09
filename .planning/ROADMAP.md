# Roadmap: SquareMind

## Overview

SquareMind's website revamp transforms a static GitHub Pages site into a live lead-generation engine on Vercel. The roadmap is sequenced around one hard constraint: Meta ads launch this week, so the deployment, landing page, form pipeline, and conversion tracking ship first. Everything else layers on top of that foundation -- site-wide forms and analytics, UX polish to make the site feel dynamic and premium, a scalable blog engine, interactive tools, and finally 300+ SEO articles at scale.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Ad Launch Pipeline** - Vercel deploy, Tri-City landing page, lead capture form, Meta Pixel, and Calendly -- everything needed to start running paid ads
- [x] **Phase 2: Site-Wide Forms & Analytics** - Wire up all remaining forms, booking CTAs, analytics, and notifications across the full site (completed 2026-03-08)
- [x] **Phase 3: UX & Design Polish** - Smooth transitions, micro-interactions, animated counters, mobile nav upgrade, and modern UI patterns to make the site feel premium and dynamic (completed 2026-03-08)
- [x] **Phase 4: Blog Engine** - Replace hardcoded posts.ts with MDX-based content system that scales to 300+ posts (completed 2026-03-09)
- [ ] **Phase 5: Interactive Tools** - Fix existing calculators and build new investment tools for SEO and user engagement
- [ ] **Phase 6: Content at Scale** - Generate 300+ SEO-optimized blog posts covering Indian real estate education

## Phase Details

### Phase 1: Ad Launch Pipeline
**Goal**: A visitor clicking a Meta ad lands on a mobile-optimized Tri-City investment page, submits a lead form tracked by Meta Pixel, and can book a strategy call via Calendly -- all on Vercel with working API routes
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, LAND-01, LAND-02, LAND-03, LAND-04, LAND-05, LEAD-05, LEAD-06, LEAD-08, BOOK-03, ANAL-02, ANAL-03
**Success Criteria** (what must be TRUE):
  1. Site is live at squaremind.in on Vercel with HTTPS and working API routes
  2. Visiting /invest/tri-city shows a distraction-free landing page that renders correctly on mobile
  3. Submitting the landing page form saves lead data (name, email, phone, UTM params, source page) to Supabase `leads` table
  4. Meta Pixel fires a Lead conversion event when the landing page form is submitted (verifiable via Meta Pixel Helper)
  5. "Book a Call" CTA on the landing page opens Calendly scheduling
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Infrastructure: clean next.config, route group migration, dynamic sitemap/robots
- [x] 01-02-PLAN.md — Lead capture pipeline: UTM utils, API route, form component
- [x] 01-03-PLAN.md — Landing page, Meta Pixel, GA4, Calendly integration

### Phase 2: Site-Wide Forms & Analytics
**Goal**: Every form on the site captures leads to Supabase with UTM tracking, the team gets instant notifications, and all analytics tools (GA4, Hotjar, Meta Pixel events) are running site-wide
**Depends on**: Phase 1
**Requirements**: LEAD-01, LEAD-02, LEAD-03, LEAD-04, LEAD-07, BOOK-01, BOOK-02, BOOK-04, ANAL-01, ANAL-04, ANAL-05, ANAL-06, NEWS-01, NEWS-02
**Success Criteria** (what must be TRUE):
  1. Submitting the HeroForm, ConsultForm, DownloadGate, or Newsletter form saves lead data to Supabase with correct form_type and UTM parameters
  2. Team receives an email notification within 60 seconds of any form submission (via Resend)
  3. "Book a Call" buttons across the site open Calendly popup; Calendly booking fires a Meta Pixel Schedule event
  4. GA4 tracks pageviews site-wide plus custom events (form_submit, calendly_open, whatsapp_click)
  5. Hotjar is recording sessions on homepage, consultation page, and landing page
**Plans**: 3 plans

Plans:
- [ ] 02-01-PLAN.md — Wire HeroForm, ConsultForm, DownloadGate to /api/leads + Resend email notifications
- [ ] 02-02-PLAN.md — GA4 custom events, Hotjar, CalendlyButton on consultation page, WhatsApp env var
- [ ] 02-03-PLAN.md — NewsletterForm component replacing dead inline forms on homepage and blog posts

### Phase 3: UX & Design Polish
**Goal**: The site feels dynamic, polished, and premium -- visitors experience smooth transitions, engaging animations, and modern UI patterns that build trust and keep them scrolling
**Depends on**: Phase 2 (all core functionality must work before layering polish)
**Requirements**: UX-01, UX-02, UX-03, UX-04, UX-05, UX-06, UX-07, UX-08, UX-09, UX-10
**Success Criteria** (what must be TRUE):
  1. Navigating between pages shows smooth animated transitions instead of hard page reloads
  2. Homepage stats (consultations done, cities covered, etc.) animate with a count-up effect when the user scrolls them into view
  3. Testimonials section is an interactive carousel that auto-advances, supports swipe on mobile, and pauses on hover
  4. Mobile navigation slides in smoothly with backdrop blur and closes automatically on route change
  5. Buttons, cards, and interactive elements respond to hover/focus with visible micro-interactions (scale, glow, shadow lift)
**Plans**: 3 plans

Plans:
- [ ] 03-01-PLAN.md — Animation infrastructure (page transitions, MotionConfig, CountUp, ParallaxHero) + homepage animated stats
- [ ] 03-02-PLAN.md — Testimonial carousel with autoplay/swipe + mobile nav slide-in drawer + hover micro-interactions
- [ ] 03-03-PLAN.md — Scroll progress bar, skeleton screens, glassmorphism refinement, spacing/typography audit, visual verification

### Phase 4: Blog Engine
**Goal**: Blog content lives in MDX files with frontmatter, renders with proper styling and SEO metadata, and the existing blog URLs continue to work without changes
**Depends on**: Phase 1 (needs Vercel for build pipeline)
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05, BLOG-06, BLOG-07, BLOG-08
**Success Criteria** (what must be TRUE):
  1. Blog listing page at /insights shows posts from MDX files (not hardcoded posts.ts) with working category filters
  2. Individual blog post pages render MDX content with prose styling, related posts, and correct SEO metadata (OpenGraph, Twitter, JSON-LD Article)
  3. All existing blog post URLs from posts.ts still work and display their migrated content
  4. Sitemap.xml auto-generates entries for all MDX blog posts with squaremind.in domain
**Plans**: 2 plans

Plans:
- [ ] 04-01-PLAN.md — MDX infrastructure (@next/mdx, gray-matter, remark-gfm) + migrate all 10 posts from posts.ts to MDX files + mdx.ts utility
- [ ] 04-02-PLAN.md — Rewire blog listing with working category filters, MDX post rendering, SEO metadata, sitemap integration, delete posts.ts

### Phase 5: Interactive Tools
**Goal**: Users can access a suite of real estate investment tools -- each with its own SEO-friendly URL -- that provide actionable calculations for Indian property buyers and NRIs
**Depends on**: Phase 1 (needs Vercel deploy)
**Requirements**: TOOL-01, TOOL-02, TOOL-03, TOOL-04, TOOL-05, TOOL-06, TOOL-07, TOOL-08, TOOL-09, TOOL-10
**Success Criteria** (what must be TRUE):
  1. Existing calculators (Rental Yield, Buy vs Rent, Total Cost) produce correct results with updated 2026 data and Indian city benchmarks
  2. New tools (Investment Scorecard, RERA Verifier, NRI Tax Calculator, EMI Calculator, Stamp Duty Calculator) are functional and produce accurate outputs
  3. Each tool has its own URL (/tools/rental-yield, /tools/emi-calculator, etc.) and the /tools page lists all tools with descriptions
  4. Tools work correctly on mobile devices
**Plans**: 3 plans

Plans:
- [ ] 05-01-PLAN.md — Shared data layer (stamp duty, RERA portals, NRI tax, city benchmarks), reusable UI components, and tools listing page refactor
- [ ] 05-02-PLAN.md — Fix 3 existing calculators + build EMI Calculator and Stamp Duty Calculator with individual route pages
- [ ] 05-03-PLAN.md — Build Investment Scorecard, RERA Verifier, and NRI Tax Calculator with individual route pages

### Phase 6: Content at Scale
**Goal**: The blog has 300+ SEO-optimized posts covering all major Indian real estate topics, cities, and buyer segments, with internal linking to tools and frameworks
**Depends on**: Phase 4 (needs blog engine for MDX publishing)
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. Blog has 300+ published posts across all categories (Investment Strategy, City Guides, NRI Corner, Tax & Legal, Builder Analysis, Market Data, Due Diligence, First-Time Buyers)
  2. Posts cover all major Indian cities (Mumbai, Bangalore, Hyderabad, Pune, Chennai, Delhi NCR, Chandigarh Tri-City, Gurgaon, Noida)
  3. Each post has a target keyword, meta description, proper header structure, and internal links to relevant tools and frameworks pages
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD
- [ ] 06-03: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Ad Launch Pipeline | 3/3 | Complete | 2026-03-08 |
| 2. Site-Wide Forms & Analytics | 3/3 | Complete   | 2026-03-08 |
| 3. UX & Design Polish | 3/3 | Complete   | 2026-03-08 |
| 4. Blog Engine | 2/2 | Complete   | 2026-03-09 |
| 5. Interactive Tools | 0/3 | Not started | - |
| 6. Content at Scale | 0/3 | Not started | - |
