# External Integrations

**Analysis Date:** 2026-03-08

## APIs & External Services

**Supabase (Database + Backend):**
- Used for: Storing EOI (Expression of Interest) form submissions from the properties page
- SDK/Client: `@supabase/supabase-js` 2.98.0
- Client initialization: `src/lib/supabase.ts` (lazy singleton via `getSupabase()`)
- Auth: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- The client returns `null` gracefully if env vars are missing (supports static export fallback)

**WhatsApp (Messaging):**
- Used for: Direct customer communication via floating button
- Implementation: Simple `wa.me` link with pre-filled message
- Component: `src/components/WhatsAppFloat.tsx`
- Phone number: hardcoded as `919876543210` (placeholder)
- No API integration -- just a deep link

## Data Storage

**Database:**
- Supabase (PostgreSQL)
- Schema: `supabase-schema.sql`
- Single table: `eoi_submissions`
  - Fields: `id` (UUID), `name`, `phone`, `email`, `budget_range`, `preferred_city`, `property_type`, `source_page`, `submitted_at`, `created_at`
  - Indexes: `idx_eoi_phone_submitted` (rate limiting), `idx_eoi_email`
  - RLS: Public inserts allowed, reads restricted to `service_role`
- Connection: via `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Client: `@supabase/supabase-js` (`src/lib/supabase.ts`)

**File Storage:**
- Local filesystem only (static assets in `public/`)
- No cloud file storage integration

**Caching:**
- None

## Authentication & Identity

**Auth Provider:**
- None for end users
- Supabase RLS uses `service_role` for admin read access to submissions
- No user authentication flow exists

## Form Submissions

**EOI Form (`src/components/EOIForm.tsx`):**
- Attempts POST to `/api/eoi` (API route -- not yet implemented, no `src/app/api/` directory exists)
- Falls back to `console.log` on failure (static export mode)
- Collects: name, phone, email, budget_range, preferred_city, property_type
- Source page hardcoded to `/properties`

**Hero Form (`src/components/HeroForm.tsx`):**
- No backend integration -- form submits with a simulated 1s delay
- Collects: name, email, phone, budget
- Data is NOT sent anywhere (stub implementation)

**Consult Form (`src/components/ConsultForm.tsx`):**
- No backend integration -- form submits with a simulated 1s delay
- Collects: name, email, phone, location, budget, message
- Data is NOT sent anywhere (stub implementation)

**Download Gate (`src/components/DownloadGate.tsx`):**
- No backend integration -- simulated 1s delay, no actual email delivery
- Collects: email for report download
- Data is NOT sent anywhere (stub implementation)

**Newsletter Form (inline in `src/app/page.tsx`):**
- No backend integration -- HTML form with no `onSubmit` handler
- Collects: email
- Data is NOT sent anywhere (no handler)

## Content Management

**Blog/Insights:**
- Hardcoded content in `src/lib/posts.ts` (large file with inline HTML content)
- No CMS integration -- all posts are static TypeScript data
- Dynamic route: `src/app/insights/[slug]/page.tsx`
- Post interface: `slug`, `tag`, `title`, `category`, `description`, `readTime`, `views`, `publishedAt`, `primaryKeyword`, `secondaryKeywords`, `content` (HTML string)

## SEO & Structured Data

**JSON-LD:**
- Organization schema injected in `src/app/layout.tsx`
- Contact email: `hello@squaremind.in`

**Sitemap:**
- Static XML at `public/sitemap.xml`
- Currently points to GitHub Pages URL (`saksham-solanki.github.io/SquareMind-Test/`)

**Robots.txt:**
- Static file at `public/robots.txt`
- Currently points to GitHub Pages sitemap URL

**Open Graph / Twitter Cards:**
- Configured in `src/app/layout.tsx` metadata export
- Per-page metadata in individual `page.tsx` files (e.g., `src/app/page.tsx`)

## Monitoring & Observability

**Error Tracking:**
- None

**Analytics:**
- None detected (no Google Analytics, Plausible, PostHog, etc.)

**Logs:**
- `console.warn` in Supabase client for missing env vars
- `console.log` for EOI form fallback submissions

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (current, static export)
- Workflow: `.github/workflows/deploy.yml`
- Trigger: push to `main` branch
- Build: Node.js 20, `npm ci && npm run build` with `GITHUB_PAGES=true`
- Artifact: `out/` directory deployed via `actions/deploy-pages@v4`

**CI Pipeline:**
- GitHub Actions (deploy only, no separate test/lint CI step)

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous API key

**Optional env vars:**
- `NEXT_PUBLIC_SITE_URL` - Canonical site URL (defaults to `https://squaremind.in`)
- `GITHUB_PAGES` - Set to `"true"` to enable static export build

**Secrets location:**
- `.env.local` (gitignored, local development)
- GitHub Actions environment (for CI/CD, though Supabase vars not currently configured in workflow)

**Example file:**
- `.env.local.example` - Template showing required variables

## Webhooks & Callbacks

**Incoming:**
- None (no `/api/` routes exist)

**Outgoing:**
- None

## Integration Gaps

**Forms without backends:**
- `src/components/HeroForm.tsx` - No data persistence
- `src/components/ConsultForm.tsx` - No data persistence
- `src/components/DownloadGate.tsx` - No email delivery, no data persistence
- Newsletter form in `src/app/page.tsx` - No handler at all

**Missing API route:**
- `src/components/EOIForm.tsx` calls `/api/eoi` but no `src/app/api/eoi/route.ts` exists
- Falls back to console.log in static export mode

**Placeholder data:**
- WhatsApp number `919876543210` in `src/components/WhatsAppFloat.tsx` appears to be placeholder
- Sitemap and robots.txt point to GitHub Pages test URL, not production `squaremind.in`

---

*Integration audit: 2026-03-08*
