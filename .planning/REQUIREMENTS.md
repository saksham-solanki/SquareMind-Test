# Requirements: SquareMind

**Defined:** 2026-03-08
**Core Value:** Visitors trust SquareMind enough to book a free strategy call within 5 minutes of landing on the site.

## v1 Requirements

Requirements for the full revamp. Each maps to roadmap phases.

### Deployment & Infrastructure

- [x] **INFRA-01**: Site deploys to Vercel via GitHub (remove static export mode, GITHUB_PAGES conditional, basePath hack)
- [x] **INFRA-02**: squaremind.in domain points to Vercel with HTTPS
- [x] **INFRA-03**: Fix sitemap.xml to reference squaremind.in (currently wrong domain)
- [x] **INFRA-04**: Fix robots.txt to reference squaremind.in
- [x] **INFRA-05**: API routes work in production (no more static export limitations)

### Lead Capture & Forms

- [x] **LEAD-01**: HeroForm (homepage) saves submissions to Supabase `leads` table
- [x] **LEAD-02**: ConsultForm (consultation page) saves submissions to Supabase `leads` table
- [x] **LEAD-03**: DownloadGate (research page) saves email to Supabase `leads` table
- [x] **LEAD-04**: Newsletter signup form saves email to Supabase `leads` table
- [x] **LEAD-05**: All forms capture UTM parameters (source, medium, campaign, content, term) via sessionStorage
- [x] **LEAD-06**: All forms capture source page URL (which page the user submitted from)
- [x] **LEAD-07**: Form submissions trigger instant email notification to team via Resend
- [x] **LEAD-08**: Unified `leads` table in Supabase with columns: name, email, phone, budget, location, source_page, utm_source, utm_medium, utm_campaign, form_type, created_at

### Booking & Conversion

- [x] **BOOK-01**: "Book a Call" CTAs across the site open Calendly scheduling popup
- [x] **BOOK-02**: Consultation page embeds Calendly inline or popup
- [x] **BOOK-03**: Landing page has Calendly booking integration
- [x] **BOOK-04**: WhatsApp float button uses real business WhatsApp number (not placeholder)

### Analytics & Tracking

- [x] **ANAL-01**: Google Analytics 4 installed site-wide with pageview tracking
- [x] **ANAL-02**: Meta Pixel installed site-wide for audience building
- [x] **ANAL-03**: Meta Pixel fires Lead conversion event on form submissions
- [x] **ANAL-04**: Meta Pixel fires Schedule conversion event on Calendly booking
- [x] **ANAL-05**: Hotjar installed on key pages (homepage, consultation, landing page)
- [x] **ANAL-06**: GA4 tracks custom events: form_submit, calendly_open, whatsapp_click

### Landing Pages

- [x] **LAND-01**: Tri-City investment guide landing page ("/invest/tri-city") for Meta ads
- [x] **LAND-02**: Landing page has distraction-free layout (no main nav, focused CTA)
- [x] **LAND-03**: Landing page has lead capture form connected to Supabase with UTM tracking
- [x] **LAND-04**: Landing page has Calendly booking CTA
- [x] **LAND-05**: Landing page is optimized for mobile (70%+ traffic from Meta ads is mobile)

### UX & Design Polish

- [ ] **UX-01**: Smooth page transitions between routes using Framer Motion layout animations (no hard page reloads feel)
- [x] **UX-02**: Interactive testimonial carousel/slider with autoplay, swipe gestures on mobile, and pause-on-hover
- [ ] **UX-03**: Animated stats counters (count-up effect) on homepage metrics that trigger when section scrolls into view
- [x] **UX-04**: Improved mobile navigation with smooth slide-in drawer, backdrop blur, and close-on-route-change
- [x] **UX-05**: Micro-interactions on hover states (buttons scale/glow, cards lift with shadow, nav links highlight) and scroll-triggered fade/slide reveals
- [ ] **UX-06**: Loading states and skeleton screens on dynamic content (blog listing, tool results, form submissions)
- [ ] **UX-07**: Scroll progress indicator bar on blog post pages showing read progress
- [ ] **UX-08**: Animated social proof / trust signals (client count ticker, rotating partner logos, or live consultation counter)
- [ ] **UX-09**: Visual hierarchy and spacing refinements -- consistent section padding, improved typography scale, better whitespace rhythm across all pages
- [ ] **UX-10**: Modern UI patterns -- glassmorphism/frosted-glass navbar on scroll, subtle parallax on hero sections, gradient mesh backgrounds on key sections

### Blog Engine

- [ ] **BLOG-01**: Replace hardcoded posts.ts with MDX-based content system (Velite or @next/mdx)
- [ ] **BLOG-02**: Blog posts have frontmatter: title, slug, description, category, tags, publishedAt, readTime, keywords
- [ ] **BLOG-03**: Blog listing page with category filters works with new engine
- [ ] **BLOG-04**: Individual blog post pages render MDX with proper styling (prose-squaremind)
- [ ] **BLOG-05**: Related posts feature works with new engine
- [ ] **BLOG-06**: Blog post SEO metadata (OpenGraph, Twitter, JSON-LD Article schema) works with new engine
- [ ] **BLOG-07**: Existing blog content migrated from posts.ts to MDX files without URL changes
- [ ] **BLOG-08**: Sitemap auto-generates from MDX content

### Newsletter

- [x] **NEWS-01**: Newsletter signup form on homepage and blog pages collects email to Supabase
- [x] **NEWS-02**: Subscriber receives confirmation that they've been added (success state in UI)

### Interactive Tools

- [ ] **TOOL-01**: Fix existing Rental Yield Calculator (verify calculations, improve UX, add Indian city benchmarks)
- [ ] **TOOL-02**: Fix existing Buy vs Rent Calculator (verify assumptions, improve inputs)
- [ ] **TOOL-03**: Fix existing Total Cost Calculator (verify stamp duty rates by state, update for 2026)
- [ ] **TOOL-04**: Build Investment Scorecard tool (input property details → get A/B/C/D investment grade)
- [ ] **TOOL-05**: Build RERA Project Verifier tool (check RERA registration status, builder compliance)
- [ ] **TOOL-06**: Build NRI Tax Calculator (tax implications by country of residence: India, US, UK, Canada, UAE, Singapore, Australia)
- [ ] **TOOL-07**: Build EMI Calculator (loan amount, interest rate, tenure → monthly EMI + amortization)
- [ ] **TOOL-08**: Build Stamp Duty Calculator (state-wise stamp duty + registration charges)
- [ ] **TOOL-09**: Each tool has its own URL (/tools/rental-yield, /tools/emi-calculator, etc.) for SEO
- [ ] **TOOL-10**: Tools section page lists all tools with descriptions and links

### Content at Scale

- [ ] **CONT-01**: Generate 300+ SEO-optimized blog posts covering Indian real estate education
- [ ] **CONT-02**: Blog posts cover all categories: Investment Strategy, City Guides, NRI Corner, Tax & Legal, Builder Analysis, Market Data, Due Diligence, First-Time Buyers
- [ ] **CONT-03**: Each blog post has proper SEO: target keyword, meta description, internal linking, headers structure
- [ ] **CONT-04**: Blog posts internally link to relevant tools and frameworks pages
- [ ] **CONT-05**: Content covers all major Indian cities: Mumbai, Bangalore, Hyderabad, Pune, Chennai, Delhi NCR, Chandigarh Tri-City, Gurgaon, Noida

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content Growth

- **CONT-01**: SEO content workflow automation (keyword research → brief → draft → audit → publish)
- **CONT-02**: Content calendar and publishing schedule
- **CONT-03**: Blog post performance tracking dashboard

### Notifications

- **NOTF-01**: WhatsApp Business API integration for lead notifications
- **NOTF-02**: Automated email drip sequence for newsletter subscribers

### Advanced Analytics

- **ADVN-01**: Lead attribution dashboard in Supabase
- **ADVN-02**: A/B testing on landing pages
- **ADVN-03**: Conversion funnel visualization

### Platform Features

- **PLAT-01**: Properties marketplace with verified listings
- **PLAT-02**: Builder review/rating system
- **PLAT-03**: NRI-specific portal with FEMA/tax tools

## Out of Scope

| Feature | Reason |
|---------|--------|
| User accounts / authentication | Public lead-gen site, no need for login system |
| Builder project listing pages | Advisory positioning — builder campaigns run via Meta ads, not the website |
| Live chat widget | WhatsApp is the communication channel in India |
| Marketing automation / CRM | Premature at 0-10 leads/day; add when volume justifies |
| Multi-language (Hindi/Punjabi) | English-first for target audience; massive content burden |
| Blog comments | Low-quality signal, spam magnet, no SEO benefit |
| Mobile app | Web-first, no app planned |
| Payment processing | Monetization happens offline after consultation |
| Full newsletter sending system | Collect emails now; send campaigns later via Resend/Loops |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete |
| INFRA-04 | Phase 1 | Complete |
| INFRA-05 | Phase 1 | Complete |
| LEAD-01 | Phase 2 | Complete |
| LEAD-02 | Phase 2 | Complete |
| LEAD-03 | Phase 2 | Complete |
| LEAD-04 | Phase 2 | Complete |
| LEAD-05 | Phase 1 | Complete |
| LEAD-06 | Phase 1 | Complete |
| LEAD-07 | Phase 2 | Complete |
| LEAD-08 | Phase 1 | Complete |
| BOOK-01 | Phase 2 | Complete |
| BOOK-02 | Phase 2 | Complete |
| BOOK-03 | Phase 1 | Complete |
| BOOK-04 | Phase 2 | Complete |
| ANAL-01 | Phase 2 | Complete |
| ANAL-02 | Phase 1 | Complete |
| ANAL-03 | Phase 1 | Complete |
| ANAL-04 | Phase 2 | Complete |
| ANAL-05 | Phase 2 | Complete |
| ANAL-06 | Phase 2 | Complete |
| LAND-01 | Phase 1 | Complete |
| LAND-02 | Phase 1 | Complete |
| LAND-03 | Phase 1 | Complete |
| LAND-04 | Phase 1 | Complete |
| LAND-05 | Phase 1 | Complete |
| UX-01 | Phase 3 | Pending |
| UX-02 | Phase 3 | Complete |
| UX-03 | Phase 3 | Pending |
| UX-04 | Phase 3 | Complete |
| UX-05 | Phase 3 | Complete |
| UX-06 | Phase 3 | Pending |
| UX-07 | Phase 3 | Pending |
| UX-08 | Phase 3 | Pending |
| UX-09 | Phase 3 | Pending |
| UX-10 | Phase 3 | Pending |
| BLOG-01 | Phase 4 | Pending |
| BLOG-02 | Phase 4 | Pending |
| BLOG-03 | Phase 4 | Pending |
| BLOG-04 | Phase 4 | Pending |
| BLOG-05 | Phase 4 | Pending |
| BLOG-06 | Phase 4 | Pending |
| BLOG-07 | Phase 4 | Pending |
| BLOG-08 | Phase 4 | Pending |
| NEWS-01 | Phase 2 | Complete |
| NEWS-02 | Phase 2 | Complete |
| TOOL-01 | Phase 5 | Pending |
| TOOL-02 | Phase 5 | Pending |
| TOOL-03 | Phase 5 | Pending |
| TOOL-04 | Phase 5 | Pending |
| TOOL-05 | Phase 5 | Pending |
| TOOL-06 | Phase 5 | Pending |
| TOOL-07 | Phase 5 | Pending |
| TOOL-08 | Phase 5 | Pending |
| TOOL-09 | Phase 5 | Pending |
| TOOL-10 | Phase 5 | Pending |
| CONT-01 | Phase 6 | Pending |
| CONT-02 | Phase 6 | Pending |
| CONT-03 | Phase 6 | Pending |
| CONT-04 | Phase 6 | Pending |
| CONT-05 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 63 total
- Mapped to phases: 63
- Unmapped: 0

---
*Requirements defined: 2026-03-08*
*Last updated: 2026-03-08 after roadmap revision (added UX requirements, renumbered phases)*
