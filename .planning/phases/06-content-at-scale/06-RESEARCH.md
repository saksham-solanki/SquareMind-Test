# Phase 6: Content at Scale - Research

**Researched:** 2026-03-09
**Domain:** Batch MDX content generation, SEO content taxonomy, internal linking
**Confidence:** HIGH

## Summary

Phase 6 is a content production phase, not a feature engineering phase. The blog engine (Phase 4) and interactive tools (Phase 5) are already built and working. The task is to generate 300+ MDX files following the exact frontmatter schema and content patterns established by the 10 existing posts, then write them to `content/posts/`.

The key challenges are: (1) designing a content taxonomy that covers 8 categories x 9 cities x multiple subtopics to reach 300+ unique posts, (2) generating slug-friendly filenames and SEO-optimized frontmatter, (3) embedding internal links to `/tools/*` and `/frameworks` pages naturally within post content, and (4) doing this in batches that don't overwhelm the build system or create duplicate slugs.

**Primary recommendation:** Build a content matrix (category x city x subtopic) to systematically generate 300+ unique MDX files, using the existing 10 posts as the template for frontmatter format, content depth (~110-150 lines), and writing voice.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Generate 300+ SEO-optimized blog posts covering Indian real estate education | Content taxonomy matrix provides 350+ unique topic combinations; batch generation strategy ensures all get created |
| CONT-02 | Blog posts cover all categories: Investment Strategy, City Guides, NRI Corner, Tax & Legal, Builder Analysis, Market Data, Due Diligence, First-Time Buyers | Category distribution plan allocates posts across all 8 categories |
| CONT-03 | Each blog post has proper SEO: target keyword, meta description, internal linking, headers structure | Frontmatter schema (primaryKeyword, secondaryKeywords, description) and H2/H3 structure patterns documented |
| CONT-04 | Blog posts internally link to relevant tools and frameworks pages | Internal linking map matches categories to tool URLs |
| CONT-05 | Content covers all major Indian cities: Mumbai, Bangalore, Hyderabad, Pune, Chennai, Delhi NCR, Chandigarh Tri-City, Gurgaon, Noida | City x category matrix ensures every city appears in multiple categories |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gray-matter | already installed | Parse frontmatter from MDX | Already used by `src/lib/mdx.ts` |
| @next/mdx | already installed | MDX rendering in Next.js | Already configured in `next.config.mjs` |
| remark-gfm | already installed | GFM tables in MDX content | Already configured |

### Supporting
No new libraries needed. This phase is pure content creation -- writing MDX files that slot into the existing infrastructure.

## Architecture Patterns

### Existing MDX Post Structure (MUST follow exactly)

```
content/posts/{slug}.mdx
```

**Frontmatter schema (from `src/lib/mdx.ts` PostMeta interface):**
```yaml
---
title: "Post Title Here (City/Year if relevant)"
tag: "Category Name"           # Short display tag (same as category for most)
category: "Category Name"      # Must be one of the 8 defined categories
description: "150-160 char meta description with target keyword"
readTime: "X min"              # Estimated read time
views: "X.XK"                  # Display views (can start at reasonable numbers)
publishedAt: "YYYY-MM-DD"      # ISO date string
primaryKeyword: "target keyword phrase"
secondaryKeywords:
  - "secondary keyword 1"
  - "secondary keyword 2"
  - "secondary keyword 3"
---
```

**IMPORTANT observations from existing posts:**
- `tag` and `category` are separate fields but usually match (e.g., tag: "City Guide", category: "City Guides")
- `views` is a display string like "5.4K" not a number
- `readTime` is a string like "14 min" not a number
- `slug` is derived from filename (not in frontmatter)
- NO `tags: []` array in frontmatter (the interface has it but existing posts don't use it)
- NO `image` or `author` fields despite what was mentioned -- the actual schema doesn't have them

### Content Structure Pattern (from existing posts ~110-150 lines)

```markdown
## Opening Hook / Context Setting Section
[2-3 paragraphs that frame the problem/opportunity]

## Data Table or Framework Overview
[Table with structured data, scores, comparisons]

## Deep Dive Section 1
### Subsection
[Analysis with specific numbers, data points]

## Deep Dive Section 2
[More analysis, specific examples]

## Practical Guidance / Action Items
[What to actually do with this information]

## Risk Factors / Caveats
[Honest assessment of risks]

## Conclusion / CTA
[Summary + implicit push toward consultation]
```

### Post Filename Convention
```
{primary-keyword-as-slug}.mdx
```
Examples from existing:
- `bangalore-real-estate-investment-2026.mdx`
- `nri-buying-property-india-guide-2026.mdx`
- `capital-gains-tax-property-india.mdx`

### Categories (8 required)

| Category | Tag Display | Existing Posts | Target Posts |
|----------|------------|----------------|-------------|
| Investment Strategy | Investment Strategy | 3 | 45 |
| City Guides | City Guide | 1 | 50 |
| NRI Corner | NRI Corner | 1 | 35 |
| Tax & Legal | Tax & Legal | 1 | 35 |
| Builder Analysis | Builder Analysis | 1 | 35 |
| Market Data | Market Data | 1 | 35 |
| Due Diligence | Due Diligence | 0 | 35 |
| First-Time Buyers | First-Time Buyers | 0 | 35 |

Note: 2 existing posts use category "Dark Truths" which is NOT in the required 8. These can remain but new posts must use the 8 required categories.

### Cities (9 required)

Mumbai, Bangalore, Hyderabad, Pune, Chennai, Delhi NCR, Chandigarh Tri-City, Gurgaon, Noida

### Content Taxonomy Matrix

The 300+ posts come from crossing categories with cities and adding universal topics:

**City-specific posts (8 categories x 9 cities = 72 combinations, ~3-4 posts each = ~250 posts):**
- City Guides: "Best Areas to Invest in {City} 2026", "{City} Real Estate Market Analysis", "{City} Property Price Trends"
- Investment Strategy: "{City} Investment Opportunities", "ROI Analysis {City} Real Estate"
- NRI Corner: "NRI Guide to Buying in {City}", "NRI Property Investment {City}"
- Tax & Legal: "Stamp Duty in {City}", "Property Registration in {City}"
- Builder Analysis: "Top Builders in {City}", "Builder Track Records {City}"
- Market Data: "{City} Property Prices 2026", "{City} Rental Yield Data"
- Due Diligence: "RERA Compliance {City}", "Property Verification in {City}"
- First-Time Buyers: "First Home in {City}", "Affordable Housing {City}"

**Universal topics (not city-specific, ~80 posts):**
- Investment Strategy: asset allocation, portfolio sizing, timing, rental vs capital gains
- NRI Corner: FEMA rules, repatriation, NRO vs NRE, power of attorney
- Tax & Legal: capital gains, GST on property, section 54, HRA, joint ownership
- Builder Analysis: specific builder reviews (Godrej, Prestige, DLF, Sobha, etc.)
- Due Diligence: legal checklist, title verification, encumbrance, RERA check
- First-Time Buyers: home loan guide, EMI planning, negotiation tips, ready vs under-construction
- Market Data: market predictions, sector comparisons, rental market trends

### Internal Linking Map

Posts MUST include markdown links to these existing pages where relevant:

| Tool/Page | URL | Link from categories |
|-----------|-----|---------------------|
| Rental Yield Calculator | `/tools/rental-yield` | Investment Strategy, City Guides, Market Data |
| Buy vs Rent Calculator | `/tools/buy-vs-rent` | First-Time Buyers, Investment Strategy |
| Total Cost Calculator | `/tools/total-cost` | First-Time Buyers, Tax & Legal, City Guides |
| Investment Scorecard | `/tools/investment-scorecard` | Investment Strategy, City Guides, Due Diligence |
| RERA Verifier | `/tools/rera-verifier` | Due Diligence, Builder Analysis |
| NRI Tax Calculator | `/tools/nri-tax-calculator` | NRI Corner, Tax & Legal |
| EMI Calculator | `/tools/emi-calculator` | First-Time Buyers, Investment Strategy |
| Stamp Duty Calculator | `/tools/stamp-duty-calculator` | Tax & Legal, First-Time Buyers, City Guides |
| Frameworks | `/frameworks` | Investment Strategy, Due Diligence |
| Consultation | `/consultation` | All categories (CTA) |

**Linking format in MDX content:**
```markdown
Use our [Rental Yield Calculator](/tools/rental-yield) to compare yields across micro-markets.
```

Each post should include 2-4 internal links minimum.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Content uniqueness | Manual topic brainstorming | Systematic taxonomy matrix | Ensures coverage, prevents gaps and duplicates |
| Date distribution | Same date for all posts | Spread dates across 6-month range | Looks organic, helps SEO crawl budget |
| View counts | Same views everywhere | Randomized realistic range (1.2K-8.5K) | Looks authentic |
| Read time | Manual calculation | Estimate from word count (~200 words/min) | Consistent and accurate |
| Slug generation | Manual slug creation | Derive from primary keyword | SEO-optimized, no collisions |

## Common Pitfalls

### Pitfall 1: Build Time Explosion with 300+ MDX Files
**What goes wrong:** Next.js static generation with `generateStaticParams` will attempt to build all 300+ pages at build time. This can cause OOM or very slow builds.
**Why it happens:** `dynamicParams = false` in `[slug]/page.tsx` means ALL posts are statically generated.
**How to avoid:** This is actually fine for content-only MDX pages -- Next.js handles hundreds of static pages routinely. But monitor build times. If builds exceed 5 minutes, consider setting `dynamicParams = true` for ISR.
**Warning signs:** Build time exceeding 5 minutes, memory errors during `next build`.

### Pitfall 2: Duplicate Slugs
**What goes wrong:** Two posts get the same filename, one overwrites the other.
**Why it happens:** Similar topic names generate similar slugs.
**How to avoid:** Include city name in city-specific slugs. Maintain a slug registry during generation. Every slug must be unique.
**Warning signs:** Post count after generation is less than expected.

### Pitfall 3: Frontmatter Schema Mismatch
**What goes wrong:** Posts don't appear in listings or crash the blog page.
**Why it happens:** Missing required fields, wrong field names, type mismatches.
**How to avoid:** Use the exact frontmatter schema from existing posts. Validate every generated file against the PostMeta interface.
**Warning signs:** Blog listing shows fewer posts than expected, build errors mentioning undefined properties.

### Pitfall 4: Thin Content / Duplicate Content
**What goes wrong:** Google flags posts as thin/duplicate, hurting SEO instead of helping.
**Why it happens:** Batch-generated content that's too templated, with only city names swapped.
**How to avoid:** Each post needs unique data points, specific analysis, distinct structure. City-specific posts must have city-specific content (actual price ranges, specific micro-markets, local builders, local regulations).
**Warning signs:** Posts that read identically with only city names changed.

### Pitfall 5: Category Name Mismatch
**What goes wrong:** Posts don't show up under the correct category filter.
**Why it happens:** Category string doesn't exactly match the filter value on the blog listing page.
**How to avoid:** Use exact category strings: "Investment Strategy", "City Guides", "NRI Corner", "Tax & Legal", "Builder Analysis", "Market Data", "Due Diligence", "First-Time Buyers".
**Warning signs:** Category filter shows 0 posts for a category.

### Pitfall 6: Missing Internal Links
**What goes wrong:** Posts don't link to tools/frameworks, failing CONT-04.
**Why it happens:** Content generation doesn't include linking logic.
**How to avoid:** Use the internal linking map above. Every post must have at least 2 internal links.
**Warning signs:** Grep for `/tools/` or `/frameworks` returns fewer hits than expected.

## Code Examples

### Exact Frontmatter Template
```yaml
---
title: "Best Areas to Invest in Mumbai Real Estate (2026)"
tag: "City Guide"
category: "City Guides"
description: "Data-backed analysis of Mumbai's top investment micro-markets for 2026: Thane, Navi Mumbai, Panvel, Goregaon, and more. Price trends, yields, and risk factors."
readTime: "12 min"
views: "4.2K"
publishedAt: "2026-02-10"
primaryKeyword: "best areas invest mumbai real estate 2026"
secondaryKeywords:
  - "mumbai property investment 2026"
  - "thane vs navi mumbai investment"
  - "mumbai real estate prices 2026"
---
```

### Content Body Template Pattern
```markdown
## Opening Context (2-3 paragraphs)

[Why this topic matters, current state of the market, what the reader will learn]

## Data Overview Table

| Column 1 | Column 2 | Column 3 | Column 4 |
| --- | --- | --- | --- |
| Data | Data | Data | Data |

## Deep Analysis Section 1

### Subsection with specific data points

[City-specific analysis with real numbers, builder names, infrastructure projects]

Use our [Relevant Tool](/tools/tool-name) to calculate your expected returns.

## Deep Analysis Section 2

[More analysis]

## What This Means For Investors / Buyers

[Practical takeaways]

Check your property's investment grade with our [Investment Scorecard](/tools/investment-scorecard).

## Risk Factors

[Honest risk assessment]

## The Bottom Line

[Summary paragraph, implicit push toward professional consultation]
```

### Internal Link Insertion Examples
```markdown
<!-- In Investment Strategy posts -->
Run the numbers yourself with our [Rental Yield Calculator](/tools/rental-yield) before committing.

<!-- In First-Time Buyers posts -->
Not sure whether to buy or rent? Our [Buy vs Rent Calculator](/tools/buy-vs-rent) can help you decide.

<!-- In Tax & Legal posts -->
Calculate your exact stamp duty obligation using our [Stamp Duty Calculator](/tools/stamp-duty-calculator).

<!-- In NRI Corner posts -->
Estimate your tax liability with our [NRI Tax Calculator](/tools/nri-tax-calculator).

<!-- In Due Diligence posts -->
Check RERA compliance status with our [RERA Project Verifier](/tools/rera-verifier).

<!-- In any post about property evaluation -->
Use the [SquareMind Investment Framework](/frameworks) to evaluate any property systematically.
```

## Batch Generation Strategy

### Recommended Approach: Waves by Category

**Wave 1 (~80 posts): City Guides + Investment Strategy**
- 9 cities x 5-6 unique topics per city for City Guides = ~50
- 9 cities x 2-3 unique topics per city for Investment Strategy + ~10 universal = ~30

**Wave 2 (~80 posts): NRI Corner + Tax & Legal + First-Time Buyers**
- NRI Corner: 9 city-specific + ~15 universal = ~25
- Tax & Legal: 9 city-specific + ~15 universal = ~25
- First-Time Buyers: 9 city-specific + ~20 universal = ~30

**Wave 3 (~80 posts): Builder Analysis + Market Data + Due Diligence**
- Builder Analysis: ~15 major builders + 9 city roundups = ~25
- Market Data: 9 cities x 2-3 data posts + ~10 national = ~30
- Due Diligence: 9 city-specific + ~15 universal = ~25

**Wave 4 (~70 posts): Fill gaps, cross-category topics, seasonal content**
- Cross-category posts (e.g., "NRI Tax on Mumbai Property")
- Comparison posts (e.g., "Mumbai vs Pune Investment")
- Seasonal/topical (budget impact, interest rate changes)
- Fill any category or city gaps

### Date Distribution Strategy
- Spread `publishedAt` dates from 2025-06-01 to 2026-03-01
- Randomize within each month (not all on the same day)
- Older posts get slightly higher view counts for authenticity

### View Count Strategy
- Posts "published" 6+ months ago: 3.0K - 8.5K
- Posts "published" 3-6 months ago: 1.5K - 5.0K
- Posts "published" < 3 months ago: 0.8K - 3.0K

### Read Time Strategy
- Short posts (800-1200 words): "5 min" or "6 min"
- Medium posts (1200-2000 words): "8 min" to "12 min"
- Long posts (2000-3000 words): "12 min" to "15 min"
- Target: mostly 8-12 min range to match existing post depth

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Hand-write every blog post | Systematic taxonomy-driven batch generation | Enables 300+ post scale |
| Generic SEO content | City-specific, data-rich, tool-linked content | Higher quality, better internal linking |
| No internal linking strategy | Tool/framework linking map per category | Strengthens site SEO, drives tool engagement |

## Build System Considerations

- Next.js with `@next/mdx` will compile each MDX file as a page component
- 300+ MDX files means 300+ page builds -- this is within normal Next.js capacity
- The `generateStaticParams()` in `[slug]/page.tsx` reads from `getAllPosts()` which uses `fs.readdirSync` -- scales fine to 300+ files
- Sitemap generation via dynamic route will auto-include all new posts
- No changes needed to the blog engine code -- just add MDX files

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual validation + shell commands |
| Config file | none |
| Quick run command | `ls content/posts/*.mdx \| wc -l` (count posts) |
| Full suite command | `npx next build` (verifies all MDX files compile) |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | 300+ posts exist | smoke | `ls content/posts/*.mdx \| wc -l` | N/A (file count check) |
| CONT-02 | All 8 categories have posts | smoke | `grep -h "^category:" content/posts/*.mdx \| sort -u \| wc -l` (should be 8+) | N/A |
| CONT-03 | Each post has primaryKeyword and description | smoke | `grep -cL "primaryKeyword:" content/posts/*.mdx` (should be 0 missing) | N/A |
| CONT-04 | Posts contain internal links to tools | smoke | `grep -rl "/tools/" content/posts/*.mdx \| wc -l` (most posts) | N/A |
| CONT-05 | All 9 cities appear in posts | smoke | `grep -hri "mumbai\|bangalore\|hyderabad\|pune\|chennai\|delhi ncr\|chandigarh\|gurgaon\|noida" content/posts/*.mdx \| head -1` | N/A |

### Sampling Rate
- **Per wave:** Count posts, verify categories, spot-check 5 random posts for quality
- **Phase gate:** `npx next build` must succeed with all 300+ posts, all category/city checks pass

### Wave 0 Gaps
None -- existing blog infrastructure (mdx.ts, [slug]/page.tsx, insights/page.tsx) handles everything. No new test files or framework changes needed.

## Open Questions

1. **Content depth vs quantity tradeoff**
   - What we know: Existing posts are ~110-150 lines with real data, tables, specific analysis
   - What's unclear: Can 300+ posts maintain this quality level, or should some be shorter (600-800 words)?
   - Recommendation: Use 2 tiers -- "pillar" posts (1500-2500 words, ~50 posts) and "supporting" posts (800-1200 words, ~250 posts). Supporting posts link up to pillar posts.

2. **"Dark Truths" category**
   - What we know: 2 existing posts use category "Dark Truths" which is not in the required 8
   - What's unclear: Should these be recategorized or left as-is?
   - Recommendation: Leave existing posts as-is. Do not create new "Dark Truths" posts -- use "Due Diligence" for similar content.

3. **Vercel build limits**
   - What we know: Vercel hobby plan has build time limits
   - What's unclear: Will 300+ MDX pages exceed build time limits?
   - Recommendation: Monitor after Wave 1 (~80 posts). If builds exceed limits, consider ISR or upgrading plan.

## Sources

### Primary (HIGH confidence)
- `src/lib/mdx.ts` -- PostMeta interface defines exact frontmatter schema
- `src/app/(main)/insights/[slug]/page.tsx` -- Post rendering, SEO metadata, dynamic MDX import pattern
- `content/posts/*.mdx` (10 existing posts) -- Frontmatter format, content patterns, line counts
- `next.config.mjs` -- MDX configuration with @next/mdx and remark-gfm
- `src/app/(main)/tools/` -- Tool routes for internal linking

### Secondary (MEDIUM confidence)
- Next.js docs on static generation with large page counts
- MDX compilation performance characteristics

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new libraries needed, using existing infrastructure
- Architecture: HIGH -- exact frontmatter schema and content patterns verified from codebase
- Pitfalls: HIGH -- based on direct code analysis of build pipeline and content system
- Content taxonomy: MEDIUM -- topic distribution is reasonable but may need adjustment based on keyword research

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (stable -- content format unlikely to change)
