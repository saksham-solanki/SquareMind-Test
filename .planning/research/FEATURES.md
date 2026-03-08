# Feature Landscape

**Domain:** Proptech advisory lead-gen website (Indian real estate)
**Researched:** 2026-03-08

## Table Stakes

Features users expect. Missing = product feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Working contact/consultation forms | Visitors can't reach you without them. Current forms are stubs. | Low | API route + Supabase write. Already have UI. |
| Blog/insights with real content | SEO traffic is the primary growth channel. 1041-line hardcoded file doesn't scale. | Medium | Velite + MDX migration. Need schema, templates, migration script. |
| Mobile-responsive everything | 70%+ of Indian internet traffic is mobile. Already responsive but verify new additions. | Low | Already handled by Tailwind. Just test new components. |
| Booking/scheduling CTA | "Book a free call" is the core conversion action. Without it, site has no conversion mechanism. | Low | Calendly popup on all CTAs. |
| Basic analytics | Can't optimize what you don't measure. | Low | GA4 + Meta Pixel are copy-paste integrations. |
| Fast page loads | Indian mobile networks are slower. Heavy pages = bounce. | Low | Already good with Next.js. Don't regress with heavy scripts. |
| SEO fundamentals | Sitemap, robots.txt, meta tags, structured data. Some already exist but broken (wrong domain). | Low | Fix sitemap/robots domain. Already have JSON-LD. |
| HTTPS + custom domain | Trust signal. Currently on GitHub Pages test URL. | Low | Vercel handles this automatically. |

## Differentiators

Features that set SquareMind apart from typical Indian real estate sites.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Interactive calculators (existing) | Rental yield, buy vs rent, total cost -- builds trust through data transparency | Already built | Maintain and promote via blog content |
| Proprietary frameworks (existing) | "McKinsey for real estate" positioning -- frameworks page shows methodology | Already built | Reference in blog posts for internal linking |
| UTM + source tracking on all forms | Know exactly which ad/post/page generated each lead. Critical for Meta ads ROI measurement. | Medium | sessionStorage UTM capture + form metadata |
| Lead notification system | Instant email/WhatsApp when someone submits a form. Speed-to-response wins deals. | Medium | Resend transactional email from API route |
| Landing pages for Meta ads | Focused, distraction-free pages with single CTA. Higher conversion than sending ads to homepage. | Medium | Route group with stripped-down layout |
| Heatmaps/session recording | See exactly where visitors click, scroll, drop off. Optimize conversion path. | Low | Hotjar free tier (35 sessions/day) |
| Research reports with download gates | Email capture in exchange for market research PDFs. | Low | Already have UI. Connect form to Supabase. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| User accounts / login | No need. Adds complexity, security surface, GDPR concerns. Site is public lead-gen. | Keep anonymous. Collect contact info via forms only. |
| Property listings marketplace | SquareMind is advisory, not a listing portal. Competing with MagicBricks/99acres is a losing game. | Keep Properties page as waitlist/EOI. Run builder campaigns via Meta ads. |
| Live chat widget | WhatsApp is the communication channel in India. Chat widgets feel impersonal and require staffing. | WhatsApp floating button (already have it). |
| Full marketing automation | Drip campaigns, lead scoring, CRM -- premature at 0-10 leads/day. | Simple email notification + Supabase table. Add automation when volume justifies it. |
| Multi-language support | English-first is fine for the target audience (real estate investors in India). Hindi/Punjabi adds massive content burden. | Defer indefinitely unless data shows demand. |
| Blog comments | Low-quality signal, spam magnet, moderation burden. No SEO benefit. | Social proof via testimonials. Engagement via WhatsApp/LinkedIn. |
| A/B testing framework | Premature optimization. Get traffic first, then test. | Manual variant testing via separate landing pages. |

## Feature Dependencies

```
Vercel deployment -> API routes -> Form-to-Supabase pipeline -> Lead notifications
Vercel deployment -> API routes -> Newsletter signup
Velite + MDX setup -> Blog migration -> SEO content workflow
Calendly account creation -> react-calendly integration -> Booking CTAs
GA4 setup -> Meta Pixel setup -> Conversion tracking -> Landing page measurement
UTM tracking util -> Form source tracking -> Lead attribution
```

## MVP Recommendation (Phase Ordering)

**Immediate (this week -- ads are launching):**
1. Vercel deployment (unblocks everything)
2. Meta ads landing page (Tri-City 2026)
3. Form-to-Supabase pipeline with source tracking
4. Calendly integration on landing page + consultation page
5. Meta Pixel on landing page (conversion tracking for ads)

**Next (week 2-3):**
6. GA4 across site
7. Hotjar on key pages
8. Lead notification emails (Resend)
9. Fix sitemap.xml / robots.txt domain

**Then (week 3-4):**
10. Velite + MDX blog engine setup
11. Migrate hardcoded posts to MDX files
12. Newsletter signup form + Supabase storage

**Defer:**
- Full newsletter sending system (collect emails now, send later)
- Marketing automation
- Advanced analytics dashboards

## Sources

- PROJECT.md requirements analysis
- Indian proptech market patterns (Ditto Insurance model reference in PROJECT.md)
