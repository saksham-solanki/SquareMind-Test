# Phase 4: Blog Engine - Research

**Researched:** 2026-03-09
**Domain:** MDX content system with Next.js 16 App Router
**Confidence:** HIGH

## Summary

Phase 4 replaces a hardcoded `posts.ts` file (1041 lines, 10 blog posts with inline HTML content) with an MDX-based content system. The existing blog lives at `/insights` (listing) and `/insights/[slug]` (individual posts), uses `prose-squaremind` CSS styling, `FilterPills` for category filtering (client-side, currently non-functional -- it changes state but doesn't filter the post list), and generates JSON-LD Article schema for SEO.

The recommended approach is `@next/mdx` with `gray-matter` for frontmatter parsing and `fs`/`glob` for content directory scanning. This is the officially supported Next.js MDX solution, works with Turbopack (Next.js 16 default), and matches the Vercel portfolio starter kit pattern. Velite is explicitly NOT recommended because its VeliteWebpackPlugin does not function correctly with Turbopack, confirming the risk noted in STATE.md.

**Primary recommendation:** Use `@next/mdx` + `gray-matter` + `fs` utility module pattern. MDX files live in `content/posts/`, frontmatter provides metadata via exported constants, and a `src/lib/mdx.ts` utility reads the content directory at build time.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| BLOG-01 | Replace hardcoded posts.ts with MDX-based content system | @next/mdx setup with gray-matter, content/posts/ directory, src/lib/mdx.ts utility |
| BLOG-02 | Blog posts have frontmatter: title, slug, description, category, tags, publishedAt, readTime, keywords | Frontmatter schema defined below; gray-matter parses YAML frontmatter from MDX files |
| BLOG-03 | Blog listing page with category filters works with new engine | Update FilterPills to actually filter posts; pass posts + active category via client component |
| BLOG-04 | Individual blog post pages render MDX with proper styling (prose-squaremind) | mdx-components.tsx wraps content in prose-squaremind div; existing CSS styles carry over |
| BLOG-05 | Related posts feature works with new engine | getRelatedPosts function reads from MDX utility instead of posts array |
| BLOG-06 | Blog post SEO metadata (OpenGraph, Twitter, JSON-LD Article schema) | generateMetadata reads frontmatter; JSON-LD Article schema already exists, adapt to MDX data |
| BLOG-07 | Existing blog content migrated from posts.ts to MDX files without URL changes | 10 posts to migrate; slugs become filenames; HTML content converts to MDX |
| BLOG-08 | Sitemap auto-generates from MDX content | Update existing sitemap.ts to import getBlogPosts() and generate entries |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @next/mdx | latest (matches next@16.1.6) | MDX compilation in Next.js | Official Next.js MDX plugin, works with Turbopack |
| @mdx-js/loader | latest | Webpack/Turbopack MDX loader | Required by @next/mdx |
| @mdx-js/react | latest | React MDX provider | Required by @next/mdx |
| @types/mdx | latest | TypeScript types for MDX | Required for TS projects |
| gray-matter | ^4.0.3 | YAML frontmatter parsing | De facto standard, used by Vercel's own templates |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| remark-gfm | latest | GitHub Flavored Markdown (tables, strikethrough) | Posts already use HTML tables; GFM enables markdown tables |
| glob (Node built-in) | N/A | File system glob for content directory | Reading MDX files from content/posts/ |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @next/mdx + gray-matter | Velite | Velite is pre-1.0, VeliteWebpackPlugin broken with Turbopack (Next.js 16 default). NOT recommended. |
| @next/mdx + gray-matter | next-mdx-remote | Adds unnecessary complexity for local files. next-mdx-remote is for CMS/remote content. |
| @next/mdx + gray-matter | Contentlayer | Contentlayer is unmaintained/abandoned. Do not use. |
| gray-matter (YAML frontmatter) | MDX export const metadata | Export pattern works but is less standard for blog content; gray-matter is more ergonomic |

**Installation:**
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx gray-matter remark-gfm
```

## Architecture Patterns

### Recommended Project Structure
```
content/
  posts/
    builders-delivery-timelines-india.mdx
    real-estate-vs-mutual-funds-gold-india.mdx
    nri-buying-property-india-guide-2026.mdx
    ... (10 total migrated posts)
src/
  lib/
    mdx.ts              # Content utility (replaces posts.ts)
    posts.ts             # DELETE after migration
  app/
    (main)/
      insights/
        page.tsx         # Updated to use mdx.ts
        [slug]/
          page.tsx       # Updated to use dynamic MDX import
mdx-components.tsx       # Required root-level file for @next/mdx
next.config.ts           # Updated to next.config.mjs with createMDX
```

### Pattern 1: Content Utility Module (src/lib/mdx.ts)
**What:** A server-side utility that reads MDX files from the content directory, parses frontmatter with gray-matter, and returns typed post data.
**When to use:** Any page that needs blog post data (listing, sitemap, related posts).
**Example:**
```typescript
// Source: Vercel portfolio starter kit pattern + Next.js docs
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  title: string;
  slug: string;
  description: string;
  category: string;
  tag: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  views: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
}

export interface Post {
  meta: PostMeta;
  slug: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx'));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return {
      meta: data as PostMeta,
      slug,
      content,
    };
  });
  // Sort by date descending
  return posts.sort((a, b) =>
    new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  return { meta: data as PostMeta, slug, content };
}

export function getRelatedPosts(currentSlug: string, category: string, count = 3): Post[] {
  return getAllPosts()
    .filter(p => p.slug !== currentSlug && p.meta.category === category)
    .slice(0, count);
}
```

### Pattern 2: Dynamic MDX Page Rendering
**What:** Blog post page uses dynamic import to load MDX as a React component.
**When to use:** The `[slug]/page.tsx` route.
**Example:**
```typescript
// Source: Next.js official docs - dynamic imports pattern
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { default: MDXContent } = await import(`@/../../content/posts/${slug}.mdx`);

  return (
    <article className="prose-squaremind">
      <MDXContent />
    </article>
  );
}

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export const dynamicParams = false;
```

### Pattern 3: MDX Frontmatter Schema
**What:** Standardized YAML frontmatter in each MDX file.
**When to use:** Every blog post MDX file.
**Example:**
```yaml
---
title: "We Checked 50 Builders' Delivery Timelines. Only 12 Delivered On Time."
tag: "Dark Truth"
category: "Dark Truths"
description: "We analysed RERA filings for 50 major Indian builders..."
readTime: "8 min"
views: "12.4K"
publishedAt: "2026-03-01"
primaryKeyword: "builder delivery delay india"
secondaryKeywords:
  - "builder delay india rera"
  - "pre launch property risk india"
  - "real estate builder track record india"
---

## The Number That Should Stop Every Investor Cold

Before you sign a pre-launch agreement...
```

### Pattern 4: mdx-components.tsx (Root Level)
**What:** Required file that maps MDX elements to React components/styles.
**When to use:** Required by @next/mdx to function. Place at project root (or src/ root).
**Example:**
```typescript
// Source: Next.js official docs
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(): MDXComponents {
  return {
    // MDX elements will inherit prose-squaremind styles from parent wrapper
    // Add custom component overrides here if needed
    table: (props) => (
      <div className="overflow-x-auto">
        <table {...props} />
      </div>
    ),
  };
}
```

### Pattern 5: next.config.mjs with Turbopack-compatible remark plugins
**What:** Configure @next/mdx with remark-gfm using string-based plugin references (required for Turbopack).
**Example:**
```javascript
// Source: Next.js official docs - Turbopack plugin usage
import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

**IMPORTANT:** The existing `next.config.ts` must be renamed to `next.config.mjs` because @next/mdx's createMDX uses ESM default export wrapping pattern that needs `.mjs`.

### Anti-Patterns to Avoid
- **Using Velite with Next.js 16:** VeliteWebpackPlugin does not work with Turbopack. Turbopack is the default in Next.js 16.
- **Using next-mdx-remote for local files:** Over-engineering. @next/mdx with dynamic imports handles local MDX files natively.
- **Storing content in src/app directory:** Content files belong in a top-level `content/` directory, separate from app routes. Keep content and code separate.
- **Using dangerouslySetInnerHTML for MDX content:** The current blog uses this for HTML strings. MDX renders as React components -- no innerHTML needed.
- **Forgetting generateStaticParams:** Without it, blog pages won't be statically generated at build time, hurting performance and SEO.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frontmatter parsing | Custom YAML parser | gray-matter | Edge cases with multiline values, arrays, nested objects |
| MDX compilation | Custom markdown-to-react pipeline | @next/mdx | Handles JSX-in-markdown, import resolution, Turbopack compat |
| GFM tables/lists | Custom table parser | remark-gfm | Strikethrough, autolinks, task lists, tables all handled |
| File system content listing | Custom glob logic | Node fs.readdirSync + filter | Simple, no external dependency needed for this |
| Static site generation params | Manual route list | generateStaticParams | Next.js native, auto-generates routes from content |

**Key insight:** The existing blog's biggest complexity is inline HTML content stored as template literals in TypeScript. MDX eliminates this entirely -- content is authored in markdown/JSX files and compiled to React components by the build system.

## Common Pitfalls

### Pitfall 1: next.config.ts vs next.config.mjs
**What goes wrong:** @next/mdx's `createMDX()` returns a function that wraps the config using `export default withMDX(nextConfig)`. This ESM pattern requires `.mjs` extension.
**Why it happens:** The project currently uses `next.config.ts` (which is empty). The TS config format may not work correctly with createMDX's wrapping pattern.
**How to avoid:** Rename `next.config.ts` to `next.config.mjs` and convert to JS syntax. The config is currently empty so this is trivial.
**Warning signs:** Build failures mentioning "createMDX is not a function" or export issues.

### Pitfall 2: FilterPills doesn't actually filter
**What goes wrong:** The current `FilterPills` component changes its internal state but doesn't communicate the selected category to the parent page. Posts always show all items.
**Why it happens:** FilterPills is a client component that stores `active` state, but the insights page renders all posts unconditionally. There's no filtering logic.
**How to avoid:** Refactor the insights page into a client component (or extract a BlogPostGrid client component) that receives both the posts data and the active category, then filters posts client-side.
**Warning signs:** Category pills change visually but post list doesn't change.

### Pitfall 3: MDX dynamic import path must be exact
**What goes wrong:** `await import(\`@/../../content/posts/${slug}.mdx\`)` may fail if the path alias doesn't resolve correctly.
**Why it happens:** Next.js dynamic imports with template literals need careful path construction. The `@/` alias maps to `./src/*` which means going up from src to content requires `../../`.
**How to avoid:** Use a path relative to the project root or adjust tsconfig paths. Test with one post first.
**Warning signs:** "Module not found" errors at build time.

### Pitfall 4: HTML content migration to MDX
**What goes wrong:** The existing 10 posts contain raw HTML (h2, h3, p, ul, ol, li, table, thead, tbody, tr, th, td, strong, a tags). Pasting raw HTML into MDX files may cause compilation errors.
**Why it happens:** MDX uses JSX parsing rules. Self-closing tags, attribute names (class vs className), and certain HTML patterns can conflict.
**How to avoid:** Convert HTML to standard markdown where possible (headings, lists, bold, links). For tables, use GFM markdown tables via remark-gfm. For remaining HTML, ensure JSX compatibility (className instead of class, etc.).
**Warning signs:** MDX compilation errors mentioning unexpected tokens or unclosed tags.

### Pitfall 5: Missing mdx-components.tsx
**What goes wrong:** Build fails with cryptic error about MDX components.
**Why it happens:** @next/mdx with App Router requires `mdx-components.tsx` at the project root (or src root). It will not work without it.
**How to avoid:** Create the file as the first step of MDX setup.
**Warning signs:** "mdx-components.tsx is required" error messages.

### Pitfall 6: Turbopack and remark plugins
**What goes wrong:** Remark/rehype plugins specified as imported functions fail with Turbopack.
**Why it happens:** Turbopack cannot pass JavaScript functions to its Rust-based compilation. Plugins must be specified as strings.
**How to avoid:** Use string-based plugin references: `remarkPlugins: ['remark-gfm']` not `remarkPlugins: [remarkGfm]`.
**Warning signs:** "Cannot serialize" or plugin-related errors in dev/build.

## Code Examples

### MDX File Structure (migrated post)
```mdx
---
title: "We Checked 50 Builders' Delivery Timelines. Only 12 Delivered On Time."
tag: "Dark Truth"
category: "Dark Truths"
description: "We analysed RERA filings for 50 major Indian builders. 76% missed their promised possession dates. Here's the data -- and how to protect yourself."
readTime: "8 min"
views: "12.4K"
publishedAt: "2026-03-01"
primaryKeyword: "builder delivery delay india"
secondaryKeywords:
  - "builder delay india rera"
  - "pre launch property risk india"
  - "real estate builder track record india"
---

## The Number That Should Stop Every Investor Cold

Before you sign a pre-launch agreement and hand over 10-20% of your life savings...

## How We Ran This Analysis

We pulled publicly available RERA registration data...

| Delivery Category | Builder Count | % of Total | Avg Delay |
|---|---|---|---|
| On Time (within 6 months) | 12 | 24% | -- |
| Delayed (6-24 months) | 23 | 46% | 14.2 months |
```

### Updated Sitemap Integration
```typescript
// Source: Existing sitemap.ts pattern + MDX utility
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://squaremind.in";
  const now = new Date();

  const blogPosts = getAllPosts().map(post => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.meta.publishedAt),
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: now, priority: 1.0 },
    { url: `${baseUrl}/consultation`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/invest/tri-city`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/research`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/tools`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/frameworks`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/properties`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: now, priority: 0.8 },
    ...blogPosts,
    { url: `${baseUrl}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, priority: 0.3 },
  ];
}
```

### Blog Listing with Working Filters
```typescript
// Client component that handles filtering
"use client";
import { useState } from "react";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import type { PostMeta } from "@/lib/mdx";

const categories = ["All", "Investment Strategy", "Dark Truths", "NRI Corner", "City Guides", "Tax & Legal", "Builder Analysis", "Market Data"];

interface BlogGridProps {
  posts: { slug: string; meta: PostMeta }[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? posts : posts.filter(p => p.meta.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2.5 mt-9">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActive(cat)}
            className={/* existing FilterPills styles */}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {filtered.map((post, i) => (
          <FadeUp key={post.slug} delay={i * 0.05}>
            <Link href={`/insights/${post.slug}`} className="block h-full">
              {/* existing card markup */}
            </Link>
          </FadeUp>
        ))}
      </div>
    </>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Contentlayer | @next/mdx + gray-matter or Velite | 2024 (Contentlayer abandoned) | Contentlayer is dead; use @next/mdx for local content |
| next-mdx-remote for all MDX | @next/mdx dynamic imports | Next.js 13+ App Router | next-mdx-remote still useful for CMS content; @next/mdx handles local files natively |
| Webpack MDX loader only | @next/mdx with Turbopack support | Next.js 15+ | Plugins must be specified as strings for Turbopack compatibility |
| dangerouslySetInnerHTML for blog content | MDX React components | N/A | Type-safe, composable, no XSS risk |

**Deprecated/outdated:**
- Contentlayer: Abandoned, no longer maintained. Do not use.
- Velite VeliteWebpackPlugin: Does not work with Turbopack (Next.js 16 default). Use @next/mdx instead.

## Open Questions

1. **next.config.ts to .mjs migration**
   - What we know: @next/mdx docs show `.mjs` format with ESM imports
   - What's unclear: Whether `next.config.ts` works with `createMDX` wrapping (Next.js 16 may support TS configs natively for this)
   - Recommendation: Try `.mjs` first since that's what the official docs show. If `.ts` works during testing, keep it.

2. **MDX dynamic import path resolution**
   - What we know: Content lives outside `src/`, imports need to reach `content/posts/`
   - What's unclear: Whether `@/../../content/posts/${slug}.mdx` resolves correctly or if a tsconfig path alias like `@content` is needed
   - Recommendation: Add a `@content` path alias in tsconfig.json mapping to `./content/*` for clean imports.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently installed |
| Config file | none -- see Wave 0 |
| Quick run command | `npx next build` (build validates MDX compilation + static generation) |
| Full suite command | `npx next build && node -e "const s=require('./scripts/validate-blog.js'); s()"` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| BLOG-01 | MDX files load instead of posts.ts | smoke | `npx next build` (fails if MDX broken) | N/A |
| BLOG-02 | Frontmatter has required fields | unit | Validate script checks each MDX file | Wave 0 |
| BLOG-03 | Category filtering works | manual-only | Visual check in browser | N/A |
| BLOG-04 | MDX renders with prose-squaremind | manual-only | Visual check in browser | N/A |
| BLOG-05 | Related posts display | smoke | `npx next build` (static gen validates) | N/A |
| BLOG-06 | SEO metadata correct | smoke | `npx next build` + inspect page source | N/A |
| BLOG-07 | Existing URLs work | smoke | `npx next build` (generateStaticParams covers all slugs) | N/A |
| BLOG-08 | Sitemap includes blog posts | unit | Validate script checks sitemap output | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx next build`
- **Per wave merge:** `npx next build` + manual visual check of /insights and one blog post
- **Phase gate:** Full build green + all 10 post URLs accessible + sitemap contains post entries

### Wave 0 Gaps
- [ ] `scripts/validate-blog.js` -- validates all MDX files have required frontmatter fields, all slugs match expected list
- [ ] No test framework installed -- `next build` serves as the primary validation (MDX compilation errors cause build failure)

## Sources

### Primary (HIGH confidence)
- [Next.js Official MDX Guide](https://nextjs.org/docs/app/guides/mdx) - Complete @next/mdx setup, Turbopack plugin usage, frontmatter patterns, dynamic imports (updated 2026-02-27)
- [Next.js mdx-components.tsx convention](https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components) - Required file for @next/mdx with App Router

### Secondary (MEDIUM confidence)
- [Velite Next.js Integration](https://velite.js.org/guide/with-nextjs) - Confirmed Turbopack incompatibility with VeliteWebpackPlugin
- [Vercel Portfolio Starter Kit](https://vercel.com/templates/next.js/portfolio-starter-kit) - Reference architecture for MDX blog with gray-matter

### Tertiary (LOW confidence)
- None -- all findings verified with official sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Next.js docs confirm @next/mdx + gray-matter pattern for Next.js 16
- Architecture: HIGH - Pattern matches Vercel's own portfolio starter kit and official MDX guide
- Pitfalls: HIGH - Turbopack string plugin requirement documented in official docs; Velite incompatibility confirmed by Velite's own docs
- Migration: MEDIUM - HTML-to-MDX conversion for 10 posts is straightforward but needs testing for JSX edge cases

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (stable -- @next/mdx is a core Next.js feature)
