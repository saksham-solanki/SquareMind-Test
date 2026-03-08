# Codebase Concerns

**Analysis Date:** 2026-03-08

## Tech Debt

**Massive Hardcoded Content File (`src/lib/posts.ts` - 1,041 lines):**
- Issue: All blog post content (full HTML articles) is hardcoded as template literals in a single TypeScript file. This includes multiple 200+ line HTML strings with tables, lists, and full articles.
- Files: `src/lib/posts.ts`
- Impact: The file is already at 1,041 lines and will grow linearly with every new post. It bloats the JS bundle since all post content ships to the client. It makes content editing painful and error-prone. Adding a single article requires modifying source code and redeploying.
- Fix approach: Move content to a CMS (Supabase, Sanity, or MDX files). Use `generateStaticParams` with dynamic data fetching instead of in-memory arrays. This would also enable non-developer content editing.

**Forms That Don't Actually Submit Data:**
- Issue: `HeroForm` and `ConsultForm` simulate submission with `setTimeout` and never send data anywhere. They show a success message after a fake 1-second delay. The user believes they booked a call, but no data is captured.
- Files: `src/components/HeroForm.tsx` (lines 11-13), `src/components/ConsultForm.tsx` (lines 11-13)
- Impact: Every "Book Free Call" and consultation form submission is silently lost. This is the primary conversion mechanism for the business and it is non-functional.
- Fix approach: Connect these forms to Supabase (the client already exists in `src/lib/supabase.ts`) or create API routes. The `EOIForm` component shows the correct pattern with API + fallback.

**`DownloadGate` Component is Non-Functional:**
- Issue: The "Download Free Report" modal collects an email but does nothing with it. No API call, no email sent, no PDF delivered. Uses `setTimeout` to fake a success state.
- Files: `src/components/DownloadGate.tsx` (lines 11-16)
- Impact: Users are told "Sent! Check your inbox" but receive nothing. Damages trust and brand credibility. Email addresses are lost.
- Fix approach: Implement actual email delivery (e.g., Resend, SendGrid) or store the lead in Supabase and provide a direct download link.

**Newsletter Forms Are Non-Functional:**
- Issue: Multiple email capture forms across the site (homepage newsletter, insights page checklist, mid-article CTA) have no `onSubmit` handler or action attribute. They are plain `<form>` elements that would cause a page reload on submit.
- Files: `src/app/page.tsx` (lines 291-296), `src/app/insights/page.tsx` (lines 73-78), `src/app/insights/[slug]/page.tsx` (lines 126-131)
- Impact: No email list is being built. The "7-Point Due Diligence Checklist" CTA appears on multiple pages but delivers nothing.
- Fix approach: Create a shared newsletter subscription component that submits to Supabase or an email service provider.

**FilterPills Component Does Nothing:**
- Issue: The category filter on the insights page updates local state but does not filter the displayed posts. The `active` state is never passed back to the parent or used to filter content.
- Files: `src/components/FilterPills.tsx`, `src/app/insights/page.tsx`
- Impact: Users click category filters expecting filtered results but nothing changes. Broken UX.
- Fix approach: Lift filter state to the insights page or pass a callback. Filter the `posts` array based on selected category before rendering.

**No API Routes Exist:**
- Issue: `EOIForm` attempts to `fetch("/api/eoi")` but no API route directory (`src/app/api/`) exists in the codebase. The form silently falls through to the `catch` block and logs data to console.
- Files: `src/components/EOIForm.tsx` (lines 56-69)
- Impact: EOI form submissions are only logged to the browser console. No data persists. The Supabase schema (`supabase-schema.sql`) is defined but no code uses it.
- Fix approach: Create `src/app/api/eoi/route.ts` that inserts into the `eoi_submissions` table using the Supabase client.

**Duplicate Form Input Styles:**
- Issue: Form input/select/label CSS classes are duplicated as string constants across `HeroForm`, `ConsultForm`, `EOIForm`, and calculator components. Each has slightly different styling.
- Files: `src/components/HeroForm.tsx`, `src/components/ConsultForm.tsx`, `src/components/EOIForm.tsx`, `src/components/calculators/BuyVsRentCalc.tsx`
- Impact: Inconsistent form styling across the site. Any design change requires updating 4+ files. Easy to miss one.
- Fix approach: Create shared form field components (e.g., `src/components/ui/Input.tsx`, `Select.tsx`) with consistent styling.

## Known Bugs

**WhatsApp Link Uses Placeholder Phone Number:**
- Symptoms: WhatsApp floating button links to `919876543210` which is a placeholder/dummy number.
- Files: `src/components/WhatsAppFloat.tsx` (line 6)
- Trigger: Any user clicking the WhatsApp button on any page.
- Workaround: None. Users reach a wrong number or dead WhatsApp.

**robots.txt and sitemap.xml Point to Wrong Domain:**
- Symptoms: `robots.txt` sitemap URL and all `sitemap.xml` URLs point to `saksham-solanki.github.io/SquareMind-Test/` instead of `squaremind.in`.
- Files: `public/robots.txt` (line 4), `public/sitemap.xml` (all URLs)
- Trigger: Any search engine crawling the production site.
- Workaround: None. SEO is degraded; search engines follow links to the wrong domain.

**Content Splitting Logic is Fragile:**
- Symptoms: Blog post content is split at `</h2>` tags to insert a mid-article CTA. The split uses `.split("</h2>").slice(0, 3).join("</h2>") + "</h2>"` which can break if a post has fewer than 3 `<h2>` sections, or produce malformed HTML with the appended `</h2>`.
- Files: `src/app/insights/[slug]/page.tsx` (lines 119, 136)
- Trigger: Any post with fewer than 3 `<h2>` tags, or posts with nested HTML elements around `</h2>`.
- Workaround: All current posts have 5+ `<h2>` tags, so this hasn't broken yet.

**`out/` Directory Committed Despite `.gitignore`:**
- Symptoms: The `out/` build output directory exists in the working tree. While `.gitignore` lists `/out/`, this is a static export build artifact that shouldn't persist.
- Files: `out/` directory, `.gitignore` (line 18)
- Trigger: Running `next build` with `output: "export"` leaves build artifacts.
- Workaround: The `.gitignore` entry should prevent committing, but the directory clutters the workspace.

## Security Considerations

**XSS Risk via `dangerouslySetInnerHTML` with Hardcoded Content:**
- Risk: Blog post HTML content is rendered via `dangerouslySetInnerHTML`. Currently safe because content is hardcoded in source code, but if content source ever moves to a CMS or user input without sanitization, this becomes an XSS vector.
- Files: `src/app/insights/[slug]/page.tsx` (lines 119, 136)
- Current mitigation: Content is developer-authored in `src/lib/posts.ts`, not user-generated.
- Recommendations: When migrating to a CMS, add DOMPurify or similar HTML sanitization before rendering. Add a linting rule to flag new `dangerouslySetInnerHTML` usage.

**Supabase Anon Key Exposed Client-Side:**
- Risk: The `NEXT_PUBLIC_SUPABASE_ANON_KEY` is exposed to the browser (by design with `NEXT_PUBLIC_` prefix). If RLS policies are misconfigured, data could be read or modified by anyone.
- Files: `src/lib/supabase.ts`, `supabase-schema.sql`
- Current mitigation: RLS is enabled on `eoi_submissions` with insert-only for anon and select-only for service_role. This is correct.
- Recommendations: Audit RLS policies if new tables are added. Never use the anon key for admin operations. Consider rate limiting at the Supabase level.

**No Input Validation on Forms:**
- Risk: No phone number format validation, no email verification, no rate limiting on form submissions. Phone field accepts any text.
- Files: `src/components/HeroForm.tsx`, `src/components/ConsultForm.tsx`, `src/components/EOIForm.tsx`
- Current mitigation: HTML `type="email"` provides basic browser validation. `type="tel"` provides no format enforcement.
- Recommendations: Add phone number regex validation (Indian format). Implement rate limiting per IP/phone in the API route. Add honeypot field for bot protection.

**No CSRF Protection:**
- Risk: Form submissions (when implemented) would be vulnerable to CSRF attacks since there are no tokens or origin checks.
- Files: All form components
- Current mitigation: None (forms don't actually submit data yet).
- Recommendations: When API routes are added, validate the `Origin` header or implement CSRF tokens.

## Performance Bottlenecks

**1,041-Line `posts.ts` Shipped to Client:**
- Problem: All blog content is bundled into the client-side JavaScript. Every page load downloads all articles even if the user visits a single post.
- Files: `src/lib/posts.ts`
- Cause: Content is stored as a static array imported directly. No code splitting occurs because it is a single module.
- Improvement path: Move to MDX files or a CMS. Use dynamic imports or server-side data fetching so only the requested post's content is sent to the client.

**No Image Optimization:**
- Problem: The site has no product images, OG images, or visual content. The `public/` directory contains only default Next.js SVG icons (file.svg, globe.svg, next.svg, vercel.svg, window.svg). No favicon, no logo image, no OG image.
- Files: `public/`
- Cause: The site appears to be text-only with no brand assets.
- Improvement path: Add a favicon, OG image for social sharing (referenced in structured data as `logo.png` but file doesn't exist), and brand imagery.

**Framer Motion on Every Section:**
- Problem: The `FadeUp` animation component wraps nearly every section and element on every page, creating many intersection observers and animation instances.
- Files: `src/components/FadeUp.tsx`, used extensively across all page files
- Cause: Heavy use of scroll-triggered animations throughout.
- Improvement path: Consider CSS-only animations with `@starting-style` or `animation-timeline: view()` for simpler fade-ins. Reserve Framer Motion for complex interactions only.

## Fragile Areas

**Blog Content Rendering Pipeline:**
- Files: `src/lib/posts.ts`, `src/app/insights/[slug]/page.tsx`
- Why fragile: Content is raw HTML strings split by regex-like string operations. Adding a mid-article CTA relies on counting `</h2>` tags. Any content structure variation breaks the layout.
- Safe modification: Ensure new posts have 4+ `<h2>` sections. Do not use `</h2>` in any attribute values or code blocks within posts.
- Test coverage: Zero tests. No validation that post HTML is well-formed.

**Static Export vs Server Deployment Ambiguity:**
- Files: `next.config.ts`, `src/components/EOIForm.tsx`
- Why fragile: The config conditionally enables `output: "export"` based on `GITHUB_PAGES` env var. `EOIForm` has a try/catch to handle both server (API routes) and static (console.log fallback) modes. This dual-mode architecture means features silently degrade without warning.
- Safe modification: Decide on one deployment mode. If static export for GitHub Pages, accept that API routes won't work and implement client-side Supabase calls consistently. If server deployment, remove the static export path.
- Test coverage: None.

## Scaling Limits

**Content in Source Code:**
- Current capacity: ~6 blog posts at ~170 lines each = ~1,041 lines in `posts.ts`
- Limit: At 50 posts, this file would exceed 8,000 lines. The JS bundle would grow proportionally, degrading page load for all visitors.
- Scaling path: Migrate to MDX files (one per post) or a headless CMS. Use ISR or SSG with data fetching.

**No Database Integration Despite Schema Existing:**
- Current capacity: Zero data persistence (all forms are non-functional)
- Limit: Cannot collect leads, track users, or store any business data
- Scaling path: Implement the API routes that use `src/lib/supabase.ts` to write to the `eoi_submissions` table defined in `supabase-schema.sql`

## Dependencies at Risk

**Next.js 16.1.6 (Bleeding Edge):**
- Risk: Next.js 16 is very recent. Ecosystem compatibility (middleware, hosting platforms, community plugins) may be incomplete.
- Impact: Potential deployment issues on non-Vercel platforms. Some third-party packages may not yet support Next.js 16 / React 19.
- Migration plan: Pin the version and monitor for stability. Be prepared to downgrade to Next.js 15.x if compatibility issues arise.

**React 19.2.3:**
- Risk: React 19 introduces breaking changes in typing and behavior. Some community packages may not yet be compatible.
- Impact: May encounter issues when adding third-party UI libraries or form handling libraries.
- Migration plan: No action needed now, but verify compatibility before adding new dependencies.

## Missing Critical Features

**No Analytics or Tracking:**
- Problem: No Google Analytics, Plausible, PostHog, or any analytics integration. Zero visibility into traffic, user behavior, or conversion rates.
- Blocks: Cannot measure marketing effectiveness, identify drop-off points, or optimize conversion funnels.

**No Error Tracking:**
- Problem: No Sentry, LogRocket, or similar error monitoring. Client-side errors go unnoticed.
- Blocks: Cannot identify or fix production bugs proactively.

**No OG Image / Favicon:**
- Problem: No favicon configured. Schema.org references `logo.png` which doesn't exist in `public/`. No OG images for social sharing.
- Blocks: Poor social media appearance when links are shared. No brand recognition in browser tabs.

**No Sitemap for Blog Posts:**
- Problem: `public/sitemap.xml` is static and does not include individual blog post URLs (`/insights/[slug]`). Blog posts are invisible to search engines via sitemap.
- Blocks: SEO discoverability of content pages is reduced.

## Test Coverage Gaps

**No Tests Exist:**
- What's not tested: The entire codebase. Zero test files, no test framework configured, no test scripts in `package.json` beyond the default lint command.
- Files: Every file in `src/`
- Risk: Any code change could break functionality without detection. Calculator math (EMI, rental yield, buy-vs-rent), form validation, content rendering pipeline, and navigation are all untested.
- Priority: High. At minimum, add tests for:
  1. Calculator math in `src/components/calculators/*.tsx` (pure logic, easy to test)
  2. `getPostBySlug` and `getRelatedPosts` in `src/lib/posts.ts`
  3. Form submission flows in `EOIForm`, `HeroForm`, `ConsultForm`

---

*Concerns audit: 2026-03-08*
