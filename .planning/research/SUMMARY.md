# Research Summary: SquareMind Website Revamp (Milestone 2)

**Domain:** Proptech advisory lead-gen website (Indian real estate)
**Researched:** 2026-03-08
**Overall confidence:** MEDIUM-HIGH

## Executive Summary

SquareMind's revamp adds seven capabilities to an existing Next.js 16 + Supabase + Tailwind site: a scalable blog engine, analytics stack, form pipeline, Calendly booking, Vercel deployment, email/newsletter, and Meta ads landing pages. The good news is that the existing stack is modern and well-chosen -- no framework migrations needed. Every new capability can be added incrementally with minimal new dependencies.

The most urgent constraint is that Meta ads are launching this week, which means the Vercel deployment, landing page, form pipeline, and Meta Pixel must ship first. The blog engine migration (converting 1041 lines of hardcoded posts to MDX) is important but not urgent -- it can run in parallel after the ads infrastructure is live.

The recommended approach adds only four new npm packages (velite, @next/third-parties, react-calendly, resend) plus one email template library (@react-email/components). Everything else is built with what's already in the stack. This keeps the dependency surface small and the site fast.

The biggest technical risk is Velite (v0.3.x, pre-1.0) potentially having compatibility issues with Next.js 16. The fallback is straightforward: use @next/mdx with manual frontmatter parsing. The biggest operational risk is launching Meta ads before conversion tracking is verified -- this directly wastes money.

## Key Findings

**Stack:** Add velite (blog), @next/third-parties (GA4), react-calendly, and resend (email). No framework changes. Four new packages total.

**Architecture:** Move from static export to Vercel SSR. All form writes through API routes (not client-side Supabase). Analytics gated behind env vars. Landing pages in a separate route group.

**Critical pitfall:** Launching Meta ads before Meta Pixel conversion events are verified. Test with Pixel Helper before spending a single rupee.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Vercel Deployment + Landing Page** - Most urgent. Unblocks API routes, forms, and ads.
   - Addresses: Vercel migration, landing page for Meta ads, form pipeline, Calendly on landing page, Meta Pixel
   - Avoids: Static export breaking API routes (Pitfall 3), launching ads without tracking (Pitfall 1)

2. **Site-Wide Forms + Analytics** - Wire up remaining forms and analytics across the full site.
   - Addresses: All forms saving to Supabase, GA4 site-wide, Hotjar, UTM tracking, lead notifications via Resend
   - Avoids: Service role key exposure (Pitfall 2), UTM loss on navigation (Pitfall 7), analytics hurting page speed (Pitfall 5)

3. **Blog Engine Migration** - Replace hardcoded posts.ts with Velite + MDX.
   - Addresses: Scalable blog for 300+ posts, SEO content workflow, sitemap/robots fix
   - Avoids: Data loss during migration (Pitfall 4), broken URLs (Pitfall 4)

4. **Newsletter + Content Growth** - Email collection and content publishing workflow.
   - Addresses: Newsletter signup, subscriber storage, Resend integration for newsletters
   - Avoids: Building newsletter sending system too early (Anti-Pattern 4)

**Phase ordering rationale:**
- Phase 1 is time-critical (ads this week) and unblocks everything else (API routes)
- Phase 2 requires API routes from Phase 1
- Phase 3 is important but not urgent -- current blog works, just doesn't scale
- Phase 4 depends on having content worth emailing about (Phase 3)

**Research flags for phases:**
- Phase 1: Standard patterns, low research risk. Focus on execution speed.
- Phase 2: Standard patterns. Resend domain verification needs early DNS action.
- Phase 3: Velite is pre-1.0 -- may need deeper research if Next.js 16 compatibility issues arise. Have @next/mdx fallback ready.
- Phase 4: Likely needs no additional research. Simple email collection.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM-HIGH | All packages verified on npm with recent versions. Velite is pre-1.0 (slight risk). Everything else is battle-tested. |
| Features | HIGH | Feature landscape is well-defined by PROJECT.md. Table stakes are clear. |
| Architecture | HIGH | Standard Next.js patterns. API routes + Supabase is a well-documented approach. |
| Pitfalls | MEDIUM-HIGH | Common issues documented from community experience. Indian-specific concerns (mobile network speed, WhatsApp preference) noted. |

## Gaps to Address

- **Velite + Next.js 16 compatibility:** Not yet verified in production. Velite docs reference Next.js 14. Test early in Phase 3.
- **Resend free tier sufficiency:** 3,000 emails/month is fine now but may need monitoring as lead volume grows.
- **Supabase RLS policies:** Current RLS setup not fully audited. Needs review when moving to API routes with service role key.
- **Meta Pixel event mapping:** Exact custom events to fire (Lead, Schedule, ViewContent) need to be mapped to Meta Ads Manager conversion definitions.
- **Blog content strategy:** How to write 300 SEO-optimized posts is a content strategy question, not a tech question. Research covered the engine, not the editorial workflow.
