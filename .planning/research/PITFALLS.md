# Domain Pitfalls

**Domain:** Proptech advisory lead-gen website (Next.js brownfield revamp)
**Researched:** 2026-03-08

## Critical Pitfalls

Mistakes that cause rewrites, lost leads, or wasted ad spend.

### Pitfall 1: Launching Meta Ads Before Conversion Tracking Works
**What goes wrong:** You spend money on ads but can't measure which ads generate leads. You're flying blind.
**Why it happens:** Urgency to launch ads this week tempts you to skip pixel setup and UTM tracking.
**Consequences:** Wasted ad budget. Can't optimize campaigns. Can't calculate cost-per-lead. Meta's algorithm can't optimize for conversions without pixel data.
**Prevention:** Meta Pixel + conversion events MUST be working on the landing page before the first ad goes live. Test with Meta Pixel Helper browser extension. Fire `Lead` event on form submission, `Schedule` event on Calendly booking.
**Detection:** Check Meta Events Manager -- if no events are firing, stop ads immediately.

### Pitfall 2: Exposing Supabase Service Role Key on Client
**What goes wrong:** Service role key in client-side code gives anyone full database access (bypasses RLS).
**Why it happens:** Copy-pasting server-side code into client components. Using `NEXT_PUBLIC_` prefix on the service role key env var.
**Consequences:** Anyone can read/write/delete all data in your Supabase database.
**Prevention:** Service role key ONLY in API routes (server-side). Never prefix with `NEXT_PUBLIC_`. Client components use anon key or call API routes.
**Detection:** Search codebase for `SUPABASE_SERVICE_ROLE_KEY` -- it should only appear in `app/api/` files and `.env.local`.

### Pitfall 3: Static Export Breaking API Routes
**What goes wrong:** Keeping `output: "export"` in next.config.ts means API routes don't work. Forms silently fail.
**Why it happens:** Forgetting to remove the GitHub Pages static export config after migrating to Vercel.
**Consequences:** All form submissions fail. No lead capture. Zero conversions from the site.
**Prevention:** Remove the entire `GITHUB_PAGES` conditional block from `next.config.ts` as the first step of Vercel migration. Test API routes in preview deployment before going live.
**Detection:** Try submitting a form on the deployed site. Check browser Network tab for 404 on `/api/leads`.

### Pitfall 4: Blog Migration Data Loss
**What goes wrong:** Converting 1041-line posts.ts to individual MDX files incorrectly -- missing posts, broken slugs, wrong categories.
**Why it happens:** Manual conversion is error-prone. Post metadata format differences between the current TypeScript structure and MDX frontmatter.
**Consequences:** Broken blog URLs (404s), lost SEO equity on indexed pages, missing content.
**Prevention:** Write a migration script that programmatically converts posts.ts entries to MDX files. Validate all slugs match existing URLs. Create redirects for any URL changes. Count posts before and after migration.
**Detection:** Compare post count. Visit every existing blog URL after migration. Check Google Search Console for 404 spikes.

## Moderate Pitfalls

### Pitfall 5: Analytics Scripts Destroying Page Speed
**What goes wrong:** GA4 + Meta Pixel + Hotjar + Calendly scripts add 200-400KB and delay page interactive time.
**Prevention:** Use `afterInteractive` strategy for GA4 and Meta Pixel. Use `lazyOnload` for Hotjar (it's not time-critical). Lazy-load Calendly with `dynamic(() => import(...), { ssr: false })`. Gate all behind env vars so dev stays fast.

### Pitfall 6: Velite Breaking Next.js Build
**What goes wrong:** Velite is at v0.3.x (pre-1.0). Breaking changes happen. Next.js 16 compatibility may have edge cases.
**Prevention:** Pin Velite version in package.json (no `^`). Test build after every Velite config change. Keep a fallback plan: if Velite doesn't work with Next.js 16, use `@next/mdx` with manual frontmatter parsing as a simpler (but less feature-rich) alternative.

### Pitfall 7: UTM Parameters Lost on Navigation
**What goes wrong:** User lands from Meta ad with UTM params, clicks around the site, then fills a form on a different page. UTM params are gone because they were only in the landing URL.
**Prevention:** Capture UTM params into sessionStorage on first page load (root layout client component). Read from sessionStorage when submitting forms. This is a common pattern but easy to forget.

### Pitfall 8: Calendly Free Tier Limitations
**What goes wrong:** Calendly free plan only allows 1 event type and 1 calendar connection. If you need multiple event types (e.g., 30-min intro + 60-min deep dive), you hit a paywall.
**Prevention:** Start with a single "30-minute Strategy Call" event type. Don't create multiple event types until volume justifies Calendly Standard ($10/month). The single event type is sufficient for launch.

### Pitfall 9: Resend Domain Verification Blocking Emails
**What goes wrong:** Resend requires DNS verification of your sending domain (squaremind.in). Without it, emails go to spam or don't send at all.
**Prevention:** Add Resend's DNS records (SPF, DKIM, DMARC) to squaremind.in DNS immediately when setting up Resend. Verify before writing any email-sending code. DNS propagation can take 24-48 hours.

### Pitfall 10: Vercel DNS Migration Downtime
**What goes wrong:** Switching squaremind.in from current hosting to Vercel causes temporary downtime or SSL certificate issues.
**Prevention:** Add Vercel as the hosting provider first, verify the deployment works on preview URL. Then update DNS. Vercel auto-provisions SSL. Keep old hosting active until DNS propagation is confirmed (24-48 hours).

## Minor Pitfalls

### Pitfall 11: WhatsApp Float Covering Content on Mobile
**What goes wrong:** Floating WhatsApp button overlaps form submit buttons or CTAs on small screens.
**Prevention:** Position WhatsApp float with enough bottom margin to clear form CTAs. Consider hiding it on pages with inline forms (consultation page, landing pages).

### Pitfall 12: Blog SEO Without Internal Linking
**What goes wrong:** 300 blog posts exist but none link to each other or to service pages. Google can't build topic authority.
**Prevention:** Every blog post should link to 2-3 related posts and at least one service/calculator page. Build this into the MDX authoring workflow. Add a "Related Posts" component fed by Velite metadata.

### Pitfall 13: Form Submission Without Feedback
**What goes wrong:** User clicks submit, nothing visible happens. They click again. Duplicate leads.
**Prevention:** Disable submit button during API call. Show loading state. Show success message. Prevent double-submission with simple flag.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Vercel deployment | Static export config not removed | Remove entire GITHUB_PAGES conditional from next.config.ts |
| Landing page + Meta ads | Pixel not firing conversions | Test with Meta Pixel Helper extension before spending |
| Form pipeline | Service role key leaked to client | Only use in app/api/ files, never NEXT_PUBLIC_ prefix |
| Calendly integration | SSR hydration mismatch | Use dynamic import with ssr: false |
| Blog migration | Broken URLs, lost posts | Migration script + validation + redirect map |
| Email notifications | Emails going to spam | Verify domain DNS (SPF, DKIM, DMARC) with Resend first |
| Analytics setup | Page speed regression | afterInteractive/lazyOnload strategies, measure with Lighthouse |

## Sources

- Common Next.js deployment migration issues
- Supabase security best practices
- Meta Pixel implementation guides
- Vercel DNS documentation patterns
