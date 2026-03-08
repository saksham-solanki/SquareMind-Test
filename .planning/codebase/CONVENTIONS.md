# Coding Conventions

**Analysis Date:** 2026-03-08

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `src/components/FadeUp.tsx`, `src/components/ConsultForm.tsx`)
- Library modules: camelCase (e.g., `src/lib/cn.ts`, `src/lib/supabase.ts`, `src/lib/posts.ts`)
- Pages: always `page.tsx` inside route directories (Next.js App Router convention)
- Layouts: always `layout.tsx` inside route directories

**Functions:**
- Components: PascalCase default exports (`export default function Navbar()`)
- Helper functions within component files: camelCase (`function handleSubmit()`, `function fmt()`)
- Sub-components within files: PascalCase (`function FormField()`, `function Field()`, `function Row()`)
- Library functions: camelCase (`getSupabase()`, `getPostBySlug()`, `getRelatedPosts()`)

**Variables:**
- camelCase for all variables (`mobileOpen`, `scrolled`, `netBuyCost`)
- Constants/static data arrays: camelCase (`navLinks`, `contrastLeft`, `footerCols`, `budgetOptions`)
- Supabase singleton: underscore-prefixed private (`_supabase`)

**Types:**
- Interfaces: PascalCase (`Post`, `Props`)
- Inline type annotations preferred over separate interfaces for component props (e.g., `{ children: ReactNode; delay?: number; className?: string }`)

## Code Style

**Formatting:**
- No Prettier config file detected. Relies on ESLint for formatting guidance.
- Double quotes for strings throughout (`"use client"`, `"text-ink"`)
- Semicolons at end of statements
- 2-space indentation (inferred from all source files)
- Trailing commas in arrays and object literals

**Linting:**
- ESLint v9 with flat config at `eslint.config.mjs`
- Extends: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- No custom rules added beyond Next.js defaults
- Run with: `npm run lint`

**TypeScript:**
- Strict mode enabled in `tsconfig.json`
- Target: ES2017
- Module resolution: bundler
- Path alias: `@/*` maps to `./src/*`

## Import Organization

**Order:**
1. Type imports from frameworks (`import type { Metadata } from "next"`)
2. Framework/library imports (`import Link from "next/link"`, `import { useState } from "react"`)
3. Internal imports via `@/` alias (`import FadeUp from "@/components/FadeUp"`)
4. CSS imports last (`import "./globals.css"`)

**Path Aliases:**
- Use `@/` for all internal imports. Never use relative paths like `../components/`.
- Examples: `@/components/Navbar`, `@/lib/cn`, `@/lib/posts`

**Pattern:**
- Type-only imports use `import type { ... }` syntax
- Named exports for library functions, default exports for components

## Component Patterns

**Client vs Server Components:**
- Client components marked with `"use client"` directive at top of file
- All interactive components (forms, animations, state-dependent UI) are client components
- Page components (`page.tsx`) are server components by default
- Server components export `metadata` and `generateMetadata` for SEO

**Client components:** `FadeUp.tsx`, `Navbar.tsx`, `ConsultForm.tsx`, `HeroForm.tsx`, `FilterPills.tsx`, `FAQList.tsx`, `WhatsAppFloat.tsx`, `StickyMobileCTA.tsx`, `DownloadGate.tsx`, `EOIForm.tsx`, all calculators
**Server components:** All `page.tsx` files, `Footer.tsx`

**Component Structure:**
1. `"use client"` directive (if needed)
2. Imports
3. Static data constants (arrays of objects for rendering)
4. Default export function component
5. Private sub-components at bottom of file (not exported)

**Props Typing:**
- Inline destructured props with type annotations:
  ```typescript
  export default function FadeUp({
    children,
    delay = 0,
    className = "",
  }: {
    children: ReactNode;
    delay?: number;
    className?: string;
  }) {
  ```
- For complex types, use a separate interface (`interface Props { params: Promise<{ slug: string }> }`)

**Sub-components:**
- Co-located in the same file, not exported
- Used for repeated UI patterns within a component:
  - `FormField` in `ConsultForm.tsx`
  - `Field` and `Row` in `BuyVsRentCalc.tsx`

## Styling Conventions

**Framework:** Tailwind CSS v4 via `@tailwindcss/postcss`

**Custom Design Tokens** (defined in `src/app/globals.css`):
- Colors: `ink` (#0D0D0D), `chalk` (#FAFAF7), `cream` (#F5F0E8), `sage` (#2A6F5A), `sage-deep`, `sage-light`, `sage-muted`, `warm`, `red`, `gold`
- Custom grays: `gray-100` through `gray-600`
- Fonts: `--font-serif` (Instrument Serif), `--font-sans` (DM Sans)

**Class Naming:**
- Use custom color tokens over default Tailwind colors (`text-ink` not `text-black`, `bg-cream` not `bg-amber-50`)
- Use `cn()` from `@/lib/cn` for conditional class merging (clsx + tailwind-merge)
- Inline responsive: `max-lg:py-8` pattern used alongside desktop-first values
- Font sizes as fixed pixels: `text-[15px]`, `text-[13px]`, `text-[clamp(36px,4.5vw,64px)]`
- Tracking: consistently use `tracking-[-0.01em]` for body text, `tracking-[0.08em]` for uppercase labels, `tracking-[-0.03em]` for headings

**Layout:**
- Max width container: `mx-auto max-w-[1200px] px-6 lg:px-14`
- Section spacing: `py-[120px] max-lg:py-20`
- Card border radius: `rounded-[20px]` for cards, `rounded-[28px]` for larger containers, `rounded-full` for buttons/inputs

**Animation:**
- Hover transforms: `hover:-translate-y-1 transition-transform duration-400`
- Button hovers: `hover:scale-[1.03] transition-all duration-300`
- FadeUp component wraps sections for scroll-triggered animations

**Button Patterns:**
- Primary: `bg-ink text-white px-9 py-4 rounded-full text-[16px] font-semibold`
- Primary hover: `hover:bg-sage hover:scale-[1.03] transition-all duration-300`
- Secondary/outline: `border-[1.5px] border-gray-300 hover:border-ink hover:bg-ink hover:text-white`
- Disabled: `disabled:opacity-70`

**Input Patterns:**
- Standard: `w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink transition-all`
- Focus ring: `focus:shadow-[0_0_0_3px_rgba(10,10,10,0.06)]`

## Section Label Pattern

Every major page section follows this structure:
```tsx
<span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">
  Section Label
</span>
<h2 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
  Section Heading
</h2>
<p className="text-[18px] text-gray-500 max-w-[560px] mt-4 leading-[1.65] tracking-[-0.01em]">
  Section description text.
</p>
```

## Breadcrumb Pattern

Pages with breadcrumbs follow this exact pattern:
```tsx
<div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
  <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
    <Link href="/" className="hover:text-sage transition-colors">Home</Link>
    <span className="mx-2">/</span><span>Page Name</span>
  </nav>
</div>
```

## Error Handling

**Patterns:**
- Supabase client: graceful null return with `console.warn` when env vars missing (`src/lib/supabase.ts`)
- Form submissions: try/catch with user-visible error state (`src/components/EOIForm.tsx`)
- API fallback: try API route first, catch and fallback to client-side logging for static exports (`src/components/EOIForm.tsx`)
- Dynamic pages: `notFound()` from `next/navigation` when content not found (`src/app/insights/[slug]/page.tsx`)
- No global error boundary detected

## Logging

**Framework:** `console` (native browser/Node.js)

**Patterns:**
- `console.warn` for missing configuration (`[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL...`)
- `console.log` for fallback form submissions (`[EOI Submission]`)
- No structured logging library

## SEO Patterns

**Every page exports `metadata`** (or `generateMetadata` for dynamic pages):
- `title`, `description`, `openGraph` fields
- `alternates.canonical` for canonical URLs
- `keywords` on blog posts

**JSON-LD structured data:**
- Organization schema in root layout (`src/app/layout.tsx`)
- Article schema on blog posts (`src/app/insights/[slug]/page.tsx`)

## Comments

**When to Comment:**
- Section dividers in JSX: `{/* HERO */}`, `{/* STATS BAR */}`, `{/* Mobile menu */}`
- Inline explanations for non-obvious logic: `// Static export fallback`
- No JSDoc/TSDoc used anywhere

## Module Design

**Exports:**
- Components: single default export per file
- Library modules: named exports (`export function cn()`, `export function getSupabase()`)
- Data + types: mixed named exports (`export interface Post`, `export const posts`)

**Barrel Files:**
- Not used. All imports reference specific files directly.

---

*Convention analysis: 2026-03-08*
