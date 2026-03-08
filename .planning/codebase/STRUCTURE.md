# Codebase Structure

**Analysis Date:** 2026-03-08

## Directory Layout

```
website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deploy on push to main
├── .planning/
│   └── codebase/               # Architecture docs (this file)
├── out/                        # Static export build output (generated)
├── public/
│   ├── robots.txt              # SEO robots file
│   ├── sitemap.xml             # Manual sitemap (GitHub Pages URLs)
│   ├── file.svg                # Default Next.js SVGs (unused)
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Navbar, Footer, fonts, metadata)
│   │   ├── page.tsx            # Home page (/)
│   │   ├── globals.css         # Design tokens, base styles, prose styles
│   │   ├── favicon.ico
│   │   ├── about/
│   │   │   └── page.tsx        # /about
│   │   ├── case-studies/
│   │   │   └── page.tsx        # /case-studies
│   │   ├── consultation/
│   │   │   └── page.tsx        # /consultation (lead capture)
│   │   ├── faq/
│   │   │   └── page.tsx        # /faq
│   │   ├── frameworks/
│   │   │   └── page.tsx        # /frameworks
│   │   ├── insights/
│   │   │   ├── page.tsx        # /insights (blog listing)
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # /insights/:slug (blog post detail)
│   │   ├── privacy/
│   │   │   └── page.tsx        # /privacy
│   │   ├── properties/
│   │   │   └── page.tsx        # /properties (deal room + EOI form)
│   │   ├── research/
│   │   │   └── page.tsx        # /research (downloadable reports)
│   │   ├── terms/
│   │   │   └── page.tsx        # /terms
│   │   └── tools/
│   │       ├── layout.tsx      # Tools metadata wrapper (client page workaround)
│   │       └── page.tsx        # /tools (interactive calculators)
│   ├── components/
│   │   ├── ConsultForm.tsx     # Consultation page booking form
│   │   ├── DownloadGate.tsx    # Email-gated report download modal
│   │   ├── EOIForm.tsx         # Expression of Interest form (properties)
│   │   ├── FAQ.tsx             # Self-contained FAQ accordion (properties page)
│   │   ├── FAQList.tsx         # Reusable FAQ accordion (accepts items prop)
│   │   ├── FadeUp.tsx          # Scroll-triggered fade-in animation wrapper
│   │   ├── FilterPills.tsx     # Category filter pill buttons
│   │   ├── Footer.tsx          # Global footer with link columns
│   │   ├── HeroForm.tsx        # Home page hero booking form
│   │   ├── Navbar.tsx          # Fixed header with mobile hamburger
│   │   ├── StickyMobileCTA.tsx # Mobile-only sticky bottom CTA bar
│   │   ├── WhatsAppFloat.tsx   # Floating WhatsApp chat button
│   │   └── calculators/
│   │       ├── BuyVsRentCalc.tsx    # Buy vs Rent comparison calculator
│   │       ├── RentalYieldCalc.tsx  # Rental yield calculator
│   │       └── TotalCostCalc.tsx    # Total cost of ownership calculator
│   └── lib/
│       ├── cn.ts               # clsx + twMerge class utility
│       ├── posts.ts            # All blog post data (massive file, ~28K tokens)
│       └── supabase.ts         # Supabase client singleton (lazy init)
├── supabase-schema.sql         # Database schema for eoi_submissions table
├── next.config.ts              # Conditional static export for GitHub Pages
├── tsconfig.json               # TypeScript config with @/* path alias
├── postcss.config.mjs          # PostCSS with Tailwind v4
├── eslint.config.mjs           # ESLint config
└── package.json                # Dependencies and scripts
```

## Directory Purposes

**`src/app/`:**
- Purpose: All routes using Next.js App Router file-based routing
- Contains: One `page.tsx` per route, root `layout.tsx`, `globals.css`
- Key files: `layout.tsx` (shell), `page.tsx` (home), `insights/[slug]/page.tsx` (dynamic blog)

**`src/components/`:**
- Purpose: Shared React components used across pages
- Contains: Forms, navigation, animations, UI widgets
- Key files: `Navbar.tsx`, `Footer.tsx`, `FadeUp.tsx`, `HeroForm.tsx`

**`src/components/calculators/`:**
- Purpose: Interactive financial calculators for the /tools page
- Contains: Self-contained calculator components with local state
- Key files: `RentalYieldCalc.tsx`, `BuyVsRentCalc.tsx`, `TotalCostCalc.tsx`

**`src/lib/`:**
- Purpose: Utilities and data modules
- Contains: CSS helper, blog post data store, database client
- Key files: `posts.ts` (all blog content), `supabase.ts` (DB client), `cn.ts` (class merge)

**`public/`:**
- Purpose: Static assets served at root
- Contains: SVGs (mostly unused defaults), robots.txt, sitemap.xml

**`out/`:**
- Purpose: Static export build output
- Generated: Yes
- Committed: Check `.gitignore` -- likely not committed

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout wrapping all pages
- `src/app/page.tsx`: Home page
- `next.config.ts`: Build configuration

**Configuration:**
- `tsconfig.json`: TypeScript config (path alias `@/*` -> `./src/*`)
- `postcss.config.mjs`: PostCSS with Tailwind v4 plugin
- `eslint.config.mjs`: ESLint configuration
- `next.config.ts`: Conditional static export when `GITHUB_PAGES=true`

**Core Logic:**
- `src/lib/posts.ts`: Blog content data store (~28K tokens, largest file)
- `src/lib/supabase.ts`: Database client initialization
- `src/components/EOIForm.tsx`: Only component with real backend integration attempt

**Styling:**
- `src/app/globals.css`: Design tokens (colors, fonts), base styles, `.prose-squaremind` blog styles

**Database:**
- `supabase-schema.sql`: Schema for `eoi_submissions` table (run manually in Supabase SQL Editor)

**CI/CD:**
- `.github/workflows/deploy.yml`: GitHub Actions deploy to GitHub Pages

## Naming Conventions

**Files:**
- Pages: `page.tsx` (Next.js convention)
- Components: `PascalCase.tsx` (e.g., `HeroForm.tsx`, `FadeUp.tsx`, `WhatsAppFloat.tsx`)
- Utilities: `camelCase.ts` (e.g., `cn.ts`, `posts.ts`, `supabase.ts`)
- Layouts: `layout.tsx` (Next.js convention)

**Directories:**
- Route segments: `kebab-case` (e.g., `case-studies/`, `[slug]/`)
- Feature groups: `camelCase` (e.g., `calculators/`)

**Components:**
- Default exports matching filename: `export default function HeroForm()`
- Client components marked with `"use client"` directive at top of file
- Server components (pages) have no directive -- this is the default

## Where to Add New Code

**New Page:**
- Create: `src/app/{route-name}/page.tsx`
- Pattern: Export `metadata` for SEO, import `FadeUp` for animations, use `<section>` with `mx-auto max-w-[1200px] px-6 lg:px-14` container
- Add breadcrumb nav at top: `<nav aria-label="Breadcrumb">` with Home link

**New Component:**
- Create: `src/components/{PascalName}.tsx`
- If interactive (uses hooks): Add `"use client"` at top
- If static/server: No directive needed
- Import with: `import X from "@/components/X"`

**New Calculator:**
- Create: `src/components/calculators/{CalculatorName}.tsx`
- Mark as `"use client"`
- Add to `src/app/tools/page.tsx` imports and render

**New Blog Post:**
- Add object to the `posts` array in `src/lib/posts.ts`
- Must include: `slug`, `tag`, `title`, `category`, `description`, `readTime`, `views`, `publishedAt`, `primaryKeyword`, `secondaryKeywords`, `content` (HTML string)
- Automatically gets a route at `/insights/{slug}`

**New Utility:**
- Create: `src/lib/{utilName}.ts`
- Import with: `import { fn } from "@/lib/utilName"`

**New Form:**
- Create: `src/components/{FormName}.tsx`
- Pattern: `"use client"`, `useState` for `loading`/`submitted`, show success state on submit
- Follow existing form styling: `border-[1.5px] border-gray-300 rounded-[12px]` inputs

## Special Directories

**`out/`:**
- Purpose: Static HTML export of the entire site
- Generated: Yes, by `next build` with `output: "export"`
- Committed: No (should be in `.gitignore`)

**`.github/workflows/`:**
- Purpose: CI/CD pipeline definitions
- Generated: No
- Committed: Yes

**`.planning/codebase/`:**
- Purpose: Architecture documentation for development tooling
- Generated: By analysis tools
- Committed: Yes

---

*Structure analysis: 2026-03-08*
