# Technology Stack

**Analysis Date:** 2026-03-08

## Languages

**Primary:**
- TypeScript 5.x - All source code (`src/**/*.ts`, `src/**/*.tsx`)

**Secondary:**
- CSS - Tailwind v4 with custom theme (`src/app/globals.css`)
- SQL - Supabase schema definition (`supabase-schema.sql`)

## Runtime

**Environment:**
- Node.js 20 (specified in `.github/workflows/deploy.yml`)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework (App Router)
- React 19.2.3 - UI library
- React DOM 19.2.3 - DOM rendering

**Styling:**
- Tailwind CSS 4.x - Utility-first CSS via `@tailwindcss/postcss`
- PostCSS - Build pipeline (`postcss.config.mjs`)

**Animation:**
- Framer Motion 12.35.0 - Page animations and transitions (`src/components/FadeUp.tsx`)

**Build/Dev:**
- ESLint 9.x with `eslint-config-next` 16.1.6 - Linting (`eslint.config.mjs`)
- TypeScript 5.x - Type checking (`tsconfig.json`)

## Key Dependencies

**Critical:**
- `@supabase/supabase-js` 2.98.0 - Database client for form submissions (`src/lib/supabase.ts`)
- `next` 16.1.6 - Application framework, handles routing, SSR/SSG, and static export
- `react` / `react-dom` 19.2.3 - UI rendering

**UI Utilities:**
- `clsx` 2.1.1 - Conditional className composition (`src/lib/cn.ts`)
- `tailwind-merge` 3.5.0 - Tailwind class deduplication (`src/lib/cn.ts`)
- `lucide-react` 0.577.0 - Icon library (imported in components)

**Infrastructure:**
- `framer-motion` 12.35.0 - Scroll-triggered fade animations

## Configuration

**TypeScript:**
- Target: ES2017
- Strict mode: enabled
- Module resolution: bundler
- Path alias: `@/*` maps to `./src/*`
- Config: `tsconfig.json`

**Environment Variables:**
- `.env.local` - Present (contains Supabase credentials)
- `.env.local.example` - Template with required vars
- Required vars:
  - `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
  - `NEXT_PUBLIC_SITE_URL` - Site URL (defaults to `https://squaremind.in`)
  - `GITHUB_PAGES` - Set to `"true"` to enable static export mode

**Build Modes:**
- Standard: `next build` (SSR-capable, for Vercel or similar)
- GitHub Pages: `next build` with `GITHUB_PAGES=true` (static export to `out/`, basePath `/SquareMind-Test`, unoptimized images)

**Next.js Config (`next.config.ts`):**
- Conditional static export when `GITHUB_PAGES=true`
- basePath: `/SquareMind-Test` (GitHub Pages only)
- Images: unoptimized in static export mode

**ESLint (`eslint.config.mjs`):**
- Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

**PostCSS (`postcss.config.mjs`):**
- Single plugin: `@tailwindcss/postcss`

**Tailwind Theme (`src/app/globals.css`):**
- Custom color palette: ink, chalk, cream, sage, warm, gold, red
- Custom fonts: Instrument Serif (serif), DM Sans (sans)
- Loaded via `next/font/google` in `src/app/layout.tsx`

## Fonts

**Google Fonts (loaded via next/font):**
- DM Sans - Primary sans-serif (`--font-dm-sans`)
- Instrument Serif - Display/heading serif (`--font-instrument-serif`, normal + italic)

## Platform Requirements

**Development:**
- Node.js 20+
- npm
- Supabase project (for form submissions)

**Production (Current):**
- GitHub Pages (static export)
- URL: `https://saksham-solanki.github.io/SquareMind-Test/`
- Target production URL: `https://squaremind.in`

**Production (Planned/Alternative):**
- Vercel or any Node.js hosting (for SSR mode with API routes)

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server (SSR mode only)
npm run lint      # Run ESLint
```

---

*Stack analysis: 2026-03-08*
