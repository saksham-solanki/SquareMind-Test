# Phase 7: Content Quality Overhaul - Context

**Gathered:** 2026-03-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Transform all 301 existing thin blog posts (~500 words each) into comprehensive, SEO-optimized long-form content (6000-8000 words). Build a CLI-based rewriting framework that processes posts in batches of 5-10 per day via the Claude API, replacing originals in-place. Posts have not been published yet — this is pre-publication quality upgrade, not live content migration.

</domain>

<decisions>
## Implementation Decisions

### Post Structure & Depth
- Target word count: 6000-8000 words per post (sweet spot — deep coverage without bloat)
- TL;DR block at the top of every post, before the first H2
- 20-25 FAQ items per post, targeting People Also Ask and long-tail keywords
- Comparison tables where the topic naturally supports them (city guides, builder analysis, investment comparisons) — not forced into every post
- One universal post template for all 301 posts: TL;DR → Intro → Main Sections (H2+H3) → Comparison Table (if relevant) → FAQs → Sources
- Heading depth: H2 for main sections, H3 for subsections — no deeper nesting
- TL;DR is the only summary block — no separate "Key Takeaways" section
- Each post includes a "Sources" / "References" section with real external citations (government portals, RBI data, NHB reports, newspaper articles) for E-E-A-T authority
- JSON-LD FAQPage schema auto-generated from each post's FAQ section for Google rich results
- No additional frontmatter fields needed — posts haven't been published yet, so no rewrite tracking required

### Content Tone & Authority
- Voice: Advisory expert — SquareMind as trusted advisor who's seen hundreds of deals. Opinionated where it matters ("We recommend...", "In our experience...")
- Naturally reference SquareMind's experience throughout posts — weave in credibility signals, link to consultation page. Not every paragraph, but enough to build trust
- Controversial topics: Balanced with a lean — present both sides but share SquareMind's assessment ("Based on our analysis, we see X as more likely")
- Market data: Use ranges and trends ("₹7,000-9,000/sqft", "prices are rising") rather than exact figures. Ages better, less maintenance burden

### Internal Linking Strategy
- Target 10-15 internal links per post (aggressive interlinking)
- Auto-generated keyword-to-URL link map from existing content (scan all 301 posts + tools pages), with manual override capability
- Context-aware anchor text — the rewrite prompt generates natural anchor text based on surrounding sentence rather than fixed anchor strings
- Tool links as inline CTA callout boxes: styled callouts like "📊 Try our EMI Calculator to see your exact monthly payments" — drives tool engagement
- 3-5 related posts section at bottom of each post (already supported by blog engine tags)

### Batch Processing Approach
- CLI script (Node.js) run manually: `node scripts/rewrite-batch.js --count 5`
- Calls Claude API directly with post content + rewrite template + link map (needs ANTHROPIC_API_KEY in .env)
- Default batch size: 5 posts per run (later tested at 10 per run)
- Category processing order: Investment Strategy (32 posts) → Tax & Legal (25 posts) → NRI Corner (25 posts) → City Guides (49 posts) → remaining categories
- Replace original MDX files in-place — same URL, same slug
- Each batch creates a git commit: "content: rewrite batch N — 5 [Category] posts"
- Accept AI output as-is regardless of word count — some topics may not need full 6000 words
- No sitemap changes — auto-generates from MDX already

### Claude's Discretion
- Exact CLI script architecture and argument parsing
- Link map generation logic and storage format
- FAQPage schema injection approach (build-time vs runtime)
- Callout box component implementation
- Error handling and retry logic for API calls
- Prompt engineering for the rewrite template

</decisions>

<specifics>
## Specific Ideas

- Posts haven't been published yet — this is a pre-publication quality upgrade, not updating live content
- The domain was bought 2 days ago — can't dump 300 posts at once, need gradual daily publishing (5-10/day)
- SEOEngine.ai standard is the quality benchmark — TL;DR blocks, 6000+ words, 20+ FAQs, internal linking, external citations, comparison tables
- Investment Strategy goes first because these posts drive consultation bookings most directly
- External citations should link to real government portals (RERA sites, income tax dept), RBI data, NHB reports, newspaper articles

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- 301 MDX posts in `content/posts/` with frontmatter (title, tag, category, description, readTime, views, publishedAt, primaryKeyword, secondaryKeywords)
- `src/app/sitemap.ts` — auto-generates sitemap from MDX content
- `src/lib/mdx.ts` — MDX utility for reading/parsing posts
- Blog engine (Phase 4) handles MDX rendering with prose styling
- Existing Article JSON-LD schema in blog post pages — needs FAQPage schema addition

### Established Patterns
- MDX posts use gray-matter for frontmatter parsing
- Blog post pages are server components with metadata exports
- Category-based filtering already works on /insights page
- Posts use @next/mdx with remark-gfm for rendering

### Integration Points
- CLI script goes in `scripts/` directory (existing scripts folder)
- Link map JSON can live in `content/` alongside posts
- ANTHROPIC_API_KEY added to .env.local
- FAQPage schema needs to be injected in the blog post page component
- Callout box needs a new MDX component or custom rendering

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-content-quality-overhaul*
*Context gathered: 2026-03-09*
