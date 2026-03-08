# SquareMind — India's Independent Real Estate Advisory

## What This Is

SquareMind is an independent real estate investment advisory platform targeting India. The website serves as a trust-building, education-first lead generation engine that drives visitors to book free 30-minute strategy calls (via Calendly). The founding team operates from Chandigarh Tri-City (Chandigarh, Mohali, Panchkula) and monetizes through builder commissions — not buyer fees. The site positions SquareMind as "zero commission to buyers" — an honest, data-backed alternative to the broker-dominated Indian real estate market.

## Core Value

**Visitors trust SquareMind enough to book a free strategy call within 5 minutes of landing on the site.** Everything — content, design, forms, credibility signals — exists to make that happen.

## Requirements

### Validated

<!-- Existing capabilities from current codebase -->

- ✓ Homepage with hero, value proposition, stats, testimonials, and CTAs — existing
- ✓ About page with origin story and values — existing
- ✓ Consultation page with features and form — existing
- ✓ Tools page with 3 interactive calculators (Rental Yield, Buy vs Rent, Total Cost) — existing
- ✓ Frameworks page showing proprietary methodologies — existing
- ✓ Case Studies page with anonymized investor stories — existing
- ✓ FAQ page with accordion — existing
- ✓ Insights/blog listing with category filters — existing
- ✓ Dynamic blog post pages with SEO metadata and related posts — existing
- ✓ Research reports page with download gates — existing
- ✓ Properties page with EOI waitlist form — existing
- ✓ Responsive design with mobile CTA and WhatsApp float — existing
- ✓ Design system: Instrument Serif + DM Sans, Sage/Ink/Cream palette — existing
- ✓ JSON-LD structured data on key pages — existing
- ✓ Supabase database with EOI submissions table — existing

### Active

<!-- What we're building in this revamp -->

- [ ] All forms (Hero, Consultation, Contact) save to Supabase with source tracking
- [ ] Calendly integration for "Book a Call" CTAs across the site
- [ ] Google Analytics 4 integration with event tracking
- [ ] Meta Pixel integration for ad conversion tracking
- [ ] Hotjar heatmap/session recording integration
- [ ] Form submission source tracking (which page/UTM generated each lead)
- [ ] SEO blog engine: CMS or MDX-based content system replacing hardcoded posts.ts
- [ ] SEO-optimized blog workflow: keyword research → content brief → draft → audit → publish
- [ ] Tri-City Meta ads landing page (area guide style — "Investing in Tri-City 2026")
- [ ] Fix sitemap.xml and robots.txt to point to squaremind.in (currently wrong domain)
- [ ] Deploy to Vercel (move away from GitHub Pages static export to enable API routes)
- [ ] Newsletter signup form connected to email service (collect subscribers)
- [ ] WhatsApp float uses real business number (currently placeholder)
- [ ] Lead notification system (email/WhatsApp alert when someone fills a form)

### Out of Scope

- Builder project listing pages — SquareMind is an advisory, not a listing site. Builder-specific campaigns run via Meta ads, not the website.
- User accounts / login system — no need for authentication; site is public-facing lead gen
- Payment processing — all monetization happens offline after consultation
- Mobile app — web-first, no app planned
- Properties marketplace — Properties page stays as waitlist/coming-soon for now
- Multi-language support — English only for now
- Real-time chat — WhatsApp handles direct communication

## Context

**Team:**
- Saksham (founder) — handles tech, marketing, content, and growth
- Co-founder — handles consultations, builder relationships, deal closing, offline sales

**Current State:**
- Website is live on GitHub Pages as static export — forms are mostly non-functional stubs
- Only the EOI form (properties page) attempts Supabase writes
- Blog content is hardcoded in a 1,041-line TypeScript file — not scalable for 300+ posts
- No analytics, no tracking pixels, no heatmaps installed
- No Calendly account set up yet (needs to be created)
- Supabase project exists and is configured (.env.local has credentials)

**Go-to-Market:**
- Content marketing targets all of India (SEO, LinkedIn, social media)
- Paid ads (Meta) target Tri-City specifically (Chandigarh, Mohali, Panchkula)
- Current builder partner: Homeland (launching multiple projects in Tri-City)
- Immediate goal: close 5-6 buyers from Tri-City through Meta ads
- Ads need to launch THIS WEEK — landing page is urgent

**Positioning:**
- "Zero commission to buyers" — builders pay SquareMind, not buyers
- Anti-broker, data-backed, trustworthy
- "McKinsey for real estate" editorial tone
- Blueprint: Ditto Insurance (joinditto.in) model applied to real estate

## Constraints

- **Deployment**: Must move to Vercel for API routes (current static export breaks forms)
- **Urgency**: Meta ads launching this week — Tri-City landing page is highest priority
- **Content**: Blog engine needs to support 300+ posts with SEO optimization
- **Budget**: Bootstrap stage — use free tiers (Supabase free, Vercel free, Calendly free)
- **Tech Stack**: Keep Next.js + TypeScript + Tailwind + Supabase (no rewrites)
- **Design**: Maintain existing design system (Instrument Serif, DM Sans, Sage/Ink/Cream palette)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep "zero commission" messaging | Commission is from builders, not buyers — messaging is accurate from buyer's perspective | — Pending |
| No builder projects on website | Site stays clean as advisory firm; builder-specific campaigns run via Meta ads separately | — Pending |
| Vercel for hosting | Need API routes for form submissions and future features; GitHub Pages too limiting | — Pending |
| Calendly for booking | Free tier, widely trusted, handles scheduling complexity | — Pending |
| MDX or headless CMS for blog | Hardcoded posts.ts doesn't scale to 300+ articles | — Pending |
| Supabase for all form data | Already configured, free tier sufficient, RLS for security | — Pending |

---
*Last updated: 2026-03-08 after initialization*
