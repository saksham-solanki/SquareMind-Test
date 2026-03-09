# Phase 5: Interactive Tools - Research

**Researched:** 2026-03-09
**Domain:** Indian real estate calculator tools (Next.js 16 client components)
**Confidence:** HIGH

## Summary

Phase 5 requires fixing 3 existing calculators and building 5 new tools, then restructuring the tools section so each tool has its own SEO-friendly URL. The existing codebase has a `/tools` page at `src/app/(main)/tools/page.tsx` with 3 inline calculator components (`RentalYieldCalc`, `BuyVsRentCalc`, `TotalCostCalc`) already functional but needing data updates and UX improvements. The "More tools" section currently shows 3 coming-soon cards (Investment Scorecard, RERA Verifier, NRI Tax Calculator) but EMI Calculator and Stamp Duty Calculator are not even listed yet.

The primary challenge is domain data accuracy -- stamp duty rates vary by state and gender across 28 states and 8 UTs, RERA portals exist for ~22 states, NRI taxation involves DTAA treaties with 7 target countries, and the investment scoring methodology needs a clear, defensible rubric. No external libraries are needed; all tools are pure client-side React state with arithmetic calculations.

**Primary recommendation:** Refactor to individual route pages under `src/app/(main)/tools/[slug]/page.tsx` or static routes, extract shared UI components (CalcField, ResultRow, VerdictBox), build a data layer for stamp duty rates and RERA portals, then implement each new tool as a self-contained client component.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TOOL-01 | Fix Rental Yield Calculator -- verify calculations, improve UX, add Indian city benchmarks | Existing component at `src/components/calculators/RentalYieldCalc.tsx` works but uses hardcoded 30% tax, no city benchmarks. Need average rental yields by major city for comparison. |
| TOOL-02 | Fix Buy vs Rent Calculator -- verify assumptions, improve inputs | Existing at `BuyVsRentCalc.tsx`. Hardcodes 5% rent inflation, 12% equity returns, 7% registration. Assumptions are reasonable but should be user-adjustable. |
| TOOL-03 | Fix Total Cost Calculator -- verify stamp duty rates by state, update for 2026 | Existing at `TotalCostCalc.tsx`. Only has 6 states (Karnataka, Maharashtra, Delhi, Tamil Nadu, Telangana, Other). Needs all 28 states + 8 UTs with male/female rates. Registration fee capped at Rs.30000 is too simplistic -- varies by state. |
| TOOL-04 | Build Investment Scorecard (A/B/C/D grade) | No existing component. Need scoring rubric across: rental yield, location tier, builder reputation, infrastructure proximity, price vs circle rate, RERA status. |
| TOOL-05 | Build RERA Project Verifier | No existing component. Cannot do live RERA API lookups (each state has different portal). Build as a directory linking to state portals with guidance on what to check. |
| TOOL-06 | Build NRI Tax Calculator | No existing component. Need tax slabs for India + DTAA treaty rates for 7 countries. TDS on rental income (31.2% default, reduced under DTAA), capital gains (LTCG 12.5% after 2 years). |
| TOOL-07 | Build EMI Calculator | No existing component. Standard EMI formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1). Add amortization schedule table. |
| TOOL-08 | Build Stamp Duty Calculator | No existing component. Needs comprehensive state-wise data with gender-based rates. Can share data layer with TOOL-03 Total Cost Calculator. |
| TOOL-09 | Each tool has own URL (/tools/rental-yield, etc.) | Currently all tools on single `/tools` page. Need to create individual route pages. |
| TOOL-10 | Tools listing page with descriptions and links | Currently exists but renders calculators inline. Needs refactor to show tool cards with links to individual pages. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router with route groups | Already in project |
| React | 19.2.3 | Client components with useState for calculator state | Already in project |
| Tailwind CSS | 4 | Styling matching existing design system | Already in project |
| Framer Motion | 12.35.0 | FadeUp animations on tool sections | Already in project |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.577.0 | Icons for tool cards and UI elements | Already installed, use for tool listing icons |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static data files | API routes + database | Overkill -- stamp duty rates change annually at most, static TypeScript data files are sufficient |
| Chart.js / Recharts | Plain HTML tables | Amortization schedule works fine as a table; no charting library needed for v1 |

**Installation:**
```bash
# No new dependencies needed -- everything is already installed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/(main)/tools/
│   ├── layout.tsx              # Shared tools layout with metadata
│   ├── page.tsx                # Tools listing page (TOOL-10)
│   ├── rental-yield/
│   │   └── page.tsx            # Individual tool page wrapper
│   ├── buy-vs-rent/
│   │   └── page.tsx
│   ├── total-cost/
│   │   └── page.tsx
│   ├── investment-scorecard/
│   │   └── page.tsx
│   ├── rera-verifier/
│   │   └── page.tsx
│   ├── nri-tax-calculator/
│   │   └── page.tsx
│   ├── emi-calculator/
│   │   └── page.tsx
│   └── stamp-duty-calculator/
│       └── page.tsx
├── components/calculators/
│   ├── shared/
│   │   ├── CalcField.tsx       # Reusable input field (extract from existing)
│   │   ├── ResultRow.tsx       # Reusable result row (extract from existing)
│   │   ├── VerdictBox.tsx      # Verdict/recommendation box
│   │   └── ToolPageWrapper.tsx # Shared layout: breadcrumb + title + CTA
│   ├── RentalYieldCalc.tsx     # Updated existing
│   ├── BuyVsRentCalc.tsx       # Updated existing
│   ├── TotalCostCalc.tsx       # Updated existing
│   ├── InvestmentScorecard.tsx  # New
│   ├── RERAVerifier.tsx        # New
│   ├── NRITaxCalc.tsx          # New
│   ├── EMICalculator.tsx       # New
│   └── StampDutyCalc.tsx       # New
├── data/
│   ├── stamp-duty-rates.ts     # State-wise stamp duty + registration data
│   ├── rera-portals.ts         # State-wise RERA portal URLs
│   ├── nri-tax-data.ts         # DTAA rates by country, Indian tax slabs
│   ├── city-benchmarks.ts      # Average rental yields, price/sqft by city
│   └── tool-registry.ts       # Tool metadata for listing page
```

### Pattern 1: Static Route Pages with Client Components
**What:** Each tool gets a static route page (Server Component) that exports metadata for SEO, then renders the client calculator component.
**When to use:** Every tool page.
**Example:**
```typescript
// src/app/(main)/tools/emi-calculator/page.tsx
import type { Metadata } from "next";
import EMICalculator from "@/components/calculators/EMICalculator";
import ToolPageWrapper from "@/components/calculators/shared/ToolPageWrapper";

export const metadata: Metadata = {
  title: "EMI Calculator -- Home Loan EMI Calculator India | SquareMind",
  description: "Calculate your monthly home loan EMI, total interest, and view full amortization schedule. Free EMI calculator for Indian home buyers.",
  openGraph: { title: "EMI Calculator | SquareMind", url: "/tools/emi-calculator" },
};

export default function EMICalculatorPage() {
  return (
    <ToolPageWrapper
      title="EMI Calculator"
      description="Calculate your monthly home loan EMI and view the full amortization schedule."
    >
      <EMICalculator />
    </ToolPageWrapper>
  );
}
```

### Pattern 2: Data Layer as TypeScript Constants
**What:** Indian real estate reference data stored as typed TypeScript objects -- not fetched from APIs.
**When to use:** Stamp duty rates, RERA portal URLs, NRI tax data, city benchmarks.
**Example:**
```typescript
// src/data/stamp-duty-rates.ts
export interface StampDutyRate {
  state: string;
  code: string;
  male: number;      // percentage
  female: number;    // percentage
  registration: number; // percentage (typically 1%)
  regCap?: number;   // max registration fee in INR
  notes?: string;
}

export const STAMP_DUTY_RATES: StampDutyRate[] = [
  { state: "Andhra Pradesh", code: "AP", male: 5, female: 3, registration: 1 },
  { state: "Karnataka", code: "KA", male: 5, female: 3, registration: 1 },
  { state: "Maharashtra", code: "MH", male: 6, female: 5, registration: 1, regCap: 30000, notes: "Mumbai 6%, Pune/Thane/Nagpur 7%" },
  // ... all 28 states + 8 UTs
];
```

### Pattern 3: Tool Registry for Listing Page
**What:** Single source of truth for all tools metadata, used by both the listing page and navigation.
**Example:**
```typescript
// src/data/tool-registry.ts
export interface ToolMeta {
  slug: string;
  title: string;
  description: string;
  icon: string;      // emoji or lucide icon name
  status: "live" | "coming-soon";
  category: "calculator" | "verifier" | "analyzer";
}

export const TOOLS: ToolMeta[] = [
  { slug: "rental-yield", title: "Rental Yield Calculator", description: "Calculate the REAL rental yield...", icon: "TrendingUp", status: "live", category: "calculator" },
  // ...
];
```

### Anti-Patterns to Avoid
- **Putting all calculators on one page:** Kills SEO value. Each tool needs its own URL with unique metadata.
- **Dynamic routes with [slug]:** For 8 tools, static routes are simpler and give better TypeScript support. Dynamic routing adds unnecessary complexity.
- **Fetching data from APIs:** Stamp duty rates and RERA portals change infrequently. Static TypeScript data files are faster, type-safe, and need no API infrastructure.
- **Complex form libraries (react-hook-form, formik):** These calculators are simple useState + arithmetic. Form libraries add bundle size for zero benefit here.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| EMI calculation formula | Custom approximation | Standard formula: `P * r * (1+r)^n / ((1+r)^n - 1)` | Well-established financial formula, must be exact |
| Currency formatting | Custom number formatting | `Intl.NumberFormat('en-IN')` or the existing `fmt()` function | Already have `fmt()` helper using `toLocaleString('en-IN')`, keep it consistent |
| Amortization schedule | Manual loop | Standard amortization loop (opening balance, interest, principal, closing) | Standard pattern, but do implement as a loop -- no library needed |
| RERA verification | Scraping state portals | Link to official RERA portals with instructions | Each state has different portal structure; scraping would be fragile and legally questionable |

**Key insight:** These tools are pure arithmetic + reference data. No external calculation libraries are needed. The complexity is in data accuracy (stamp duty rates, tax slabs), not computation.

## Common Pitfalls

### Pitfall 1: Stale Stamp Duty Data
**What goes wrong:** Stamp duty rates shown don't match current state government rates, destroying user trust.
**Why it happens:** Rates change through state budget announcements; many sources online are outdated.
**How to avoid:** Include a "Last updated: March 2026" notice on data-heavy tools. Add a `lastVerified` date field to the data layer. Source from official state government gazettes where possible.
**Warning signs:** User complaints about wrong numbers.

### Pitfall 2: Oversimplified Tax Calculations
**What goes wrong:** NRI tax calculator gives incorrect results because it doesn't account for surcharge, cess, or DTAA nuances.
**Why it happens:** Indian tax law has multiple layers (base tax + 4% cess + surcharge above Rs.50L).
**How to avoid:** Add disclaimers: "This is an estimate. Consult a CA for exact numbers." Include cess (4% health & education) in all calculations. Show the breakdown clearly.
**Warning signs:** Net tax shown doesn't match what a CA would calculate.

### Pitfall 3: Mobile UX on Number Inputs
**What goes wrong:** Number inputs with `type="number"` show tiny spinner arrows, hard to use on mobile. Users can't easily input large amounts like Rs.1,00,00,000.
**Why it happens:** Default number input UX is poor for large currency values.
**How to avoid:** Use `inputMode="numeric"` with `type="text"` for currency fields, add manual formatting. Or keep `type="number"` but add range sliders for common values. The existing calculators already use `type="number"` which works but could be improved.
**Warning signs:** High bounce rate on mobile tool pages.

### Pitfall 4: RERA Verifier Scope Creep
**What goes wrong:** Attempting to build a live RERA checker that queries state portals.
**Why it happens:** Users expect a "paste RERA number, get status" tool.
**How to avoid:** Build it as an educational tool + directory. Show: what RERA registration means, what to check, link to the correct state portal for verification. Each state portal has a different structure and no public API.
**Warning signs:** Requirements mentioning "API integration" with RERA portals.

### Pitfall 5: SEO Metadata Collision
**What goes wrong:** All tool pages share the same title/description from the parent layout.
**Why it happens:** `layout.tsx` metadata vs `page.tsx` metadata hierarchy confusion.
**How to avoid:** Each tool's `page.tsx` must export its own `metadata` object. Next.js merges metadata top-down, with page-level overriding layout-level. The current `tools/layout.tsx` already exports metadata -- individual pages will override it correctly.
**Warning signs:** All tool pages showing the same title in search results.

## Code Examples

### EMI Calculation (Standard Formula)
```typescript
// Standard EMI formula
function calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
  if (annualRate === 0) return principal / tenureMonths;
  const r = annualRate / 100 / 12; // monthly rate
  const n = tenureMonths;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return emi;
}

// Amortization schedule generation
function generateAmortization(principal: number, annualRate: number, tenureMonths: number) {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  const r = annualRate / 100 / 12;
  const schedule = [];
  let balance = principal;
  let totalInterest = 0;

  for (let month = 1; month <= tenureMonths; month++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance -= principalPaid;
    totalInterest += interest;
    schedule.push({ month, emi, interest, principalPaid, balance: Math.max(0, balance) });
  }

  return { emi, totalInterest, totalPayment: emi * tenureMonths, schedule };
}
```

### Investment Scorecard Rubric
```typescript
// Scoring methodology for investment grade
interface PropertyInput {
  rentalYield: number;       // percentage
  cityTier: 1 | 2 | 3;
  builderReputation: "established" | "mid" | "new";
  reraRegistered: boolean;
  nearMetro: boolean;        // within 2km of metro/major transit
  priceVsCircleRate: number; // ratio (1.0 = at circle rate, 1.2 = 20% above)
  propertyAge: number;       // years
  occupancyCertificate: boolean;
}

function scoreProperty(input: PropertyInput): { grade: "A" | "B" | "C" | "D"; score: number; breakdown: Record<string, number> } {
  let score = 0;
  const breakdown: Record<string, number> = {};

  // Rental Yield (max 25 points)
  breakdown.rentalYield = input.rentalYield >= 4 ? 25 : input.rentalYield >= 3 ? 20 : input.rentalYield >= 2 ? 12 : 5;
  score += breakdown.rentalYield;

  // Location (max 20 points)
  breakdown.location = input.cityTier === 1 ? 20 : input.cityTier === 2 ? 15 : 8;
  score += breakdown.location;

  // Builder (max 15 points)
  breakdown.builder = input.builderReputation === "established" ? 15 : input.builderReputation === "mid" ? 10 : 5;
  score += breakdown.builder;

  // RERA (max 15 points)
  breakdown.rera = input.reraRegistered ? 15 : 0;
  score += breakdown.rera;

  // Infrastructure (max 10 points)
  breakdown.infrastructure = input.nearMetro ? 10 : 3;
  score += breakdown.infrastructure;

  // Price fairness (max 10 points)
  breakdown.priceFairness = input.priceVsCircleRate <= 1.1 ? 10 : input.priceVsCircleRate <= 1.3 ? 6 : 2;
  score += breakdown.priceFairness;

  // Documentation (max 5 points)
  breakdown.documentation = input.occupancyCertificate ? 5 : 0;
  score += breakdown.documentation;

  const grade = score >= 75 ? "A" : score >= 55 ? "B" : score >= 35 ? "C" : "D";
  return { grade, score, breakdown };
}
```

### NRI Tax Calculation Structure
```typescript
// Key tax data points for NRI calculator
interface CountryTaxProfile {
  country: string;
  code: string;
  hasDTAA: boolean;
  tdsOnRental: number;          // TDS rate under DTAA (default 31.2%)
  capitalGainsRelief: boolean;  // whether DTAA provides CG relief
  notes: string;
}

const NRI_TAX_PROFILES: CountryTaxProfile[] = [
  { country: "United States", code: "US", hasDTAA: true, tdsOnRental: 15, capitalGainsRelief: true, notes: "Foreign tax credit available. File Form 67 in India." },
  { country: "United Kingdom", code: "UK", hasDTAA: true, tdsOnRental: 15, capitalGainsRelief: true, notes: "Property income taxable in both countries; claim credit." },
  { country: "Canada", code: "CA", hasDTAA: true, tdsOnRental: 15, capitalGainsRelief: true, notes: "Treaty allows credit method. Report worldwide income." },
  { country: "UAE", code: "AE", hasDTAA: true, tdsOnRental: 12.5, capitalGainsRelief: true, notes: "No income tax in UAE. India taxes at normal rates." },
  { country: "Singapore", code: "SG", hasDTAA: true, tdsOnRental: 15, capitalGainsRelief: true, notes: "Singapore taxes worldwide income; claim credit for Indian tax." },
  { country: "Australia", code: "AU", hasDTAA: true, tdsOnRental: 15, capitalGainsRelief: true, notes: "Australian CGT applies; claim credit for Indian tax paid." },
  { country: "India (Resident)", code: "IN", hasDTAA: false, tdsOnRental: 0, capitalGainsRelief: false, notes: "Standard income tax slabs apply." },
];

// Indian capital gains tax for NRIs (FY 2025-26)
// LTCG (property held > 2 years): 12.5% without indexation
// STCG (property held <= 2 years): Added to income, taxed at slab rates
// TDS on sale: 12.5% for LTCG, 30% for STCG
// Health & Education Cess: 4% on all tax
```

## Indian Real Estate Data Reference

### Stamp Duty Rates by State (2025-2026)

Key rates for major investment cities:

| State | Male | Female | Registration | Notes |
|-------|------|--------|--------------|-------|
| Maharashtra | 6-7% | 5-6% | 1% (cap Rs.30,000) | Mumbai 6%, Pune/Thane 7% |
| Karnataka | 5% | 3% | 1% | Bangalore uniform 5% |
| Delhi | 6% | 4% | 1% | NCR uniform |
| Haryana | 6% | 4% | 1% | Gurugram same |
| Tamil Nadu | 8% | 7% | 1% | Chennai 8% |
| Telangana | 5% | 3% | 1% | Hyderabad 5% |
| Uttar Pradesh | 7% | 4% | 1% | Noida/Ghaziabad 7% |
| Punjab | 6% | 3% | 1% | Chandigarh (UT): 6%/4% |
| Rajasthan | 5% | 3% | 1% | Jaipur same |
| Gujarat | 5% | 3% | 1% | Ahmedabad same |
| West Bengal | 6% | 4% | 1% | Kolkata 6% |
| Kerala | 8% | 6% | 1% | Kochi same |
| Madhya Pradesh | 7.5% | 5.5% | 1% | Bhopal/Indore same |

Full data should cover all 28 states + 8 UTs.

### RERA State Portal URLs

Key portals for major states:

| State | Portal URL |
|-------|-----------|
| Maharashtra | maharera.maharashtra.gov.in |
| Karnataka | rera.karnataka.gov.in |
| Delhi | rera.delhi.gov.in |
| Haryana | haryanarera.gov.in |
| Tamil Nadu | rera.tn.gov.in |
| Telangana | rera.telangana.gov.in |
| Uttar Pradesh | up-rera.in |
| Gujarat | gujrera.gujarat.gov.in |
| Rajasthan | rera.rajasthan.gov.in |
| Punjab | rera.punjab.gov.in |
| Kerala | rera.kerala.gov.in |
| Madhya Pradesh | rera.mp.gov.in |
| Andhra Pradesh | rera.ap.gov.in |
| Bihar | rera.bihar.gov.in |
| Odisha | rera.odisha.gov.in |
| West Bengal | wbhira.gov.in |

### Average Rental Yields by City (2025-2026 estimates)

| City | Avg Gross Yield | Typical Range |
|------|----------------|---------------|
| Bangalore | 3.0-3.5% | 2.5-4.5% |
| Mumbai | 2.0-2.5% | 1.5-3.5% |
| Pune | 3.0-3.5% | 2.5-4.0% |
| Hyderabad | 3.5-4.0% | 3.0-5.0% |
| Chennai | 3.0-3.5% | 2.5-4.0% |
| Delhi NCR | 2.5-3.0% | 2.0-4.0% |
| Chandigarh Tri-City | 2.5-3.0% | 2.0-3.5% |
| Ahmedabad | 3.0-3.5% | 2.5-4.0% |

### NRI Tax Quick Reference (FY 2025-26)

- **Rental income TDS:** 31.2% (default) or reduced rate under DTAA
- **LTCG (>2 years):** 12.5% flat (no indexation benefit from July 2024 budget)
- **STCG (<=2 years):** Income tax slab rates (30%+ for most NRIs)
- **TDS on property sale:** 12.5% (LTCG) or 30% (STCG)
- **Health & Education Cess:** 4% on all tax amounts
- **Surcharge:** 10% for income Rs.50L-1Cr, 15% for Rs.1-2Cr, 25% for Rs.2-5Cr

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single `/tools` page with all calculators inline | Individual tool pages at `/tools/[name]` for SEO | Current best practice | Each tool gets indexed separately, better long-tail SEO |
| Hardcoded stamp duty (5-7%) | State-wise + gender-based rates | Ongoing -- states update via budget | Accuracy matters for trust |
| LTCG with indexation | LTCG at 12.5% flat, no indexation | July 2024 Union Budget | Major change -- existing tools may have old formula |
| TDS 20% on NRI property sale | TDS 12.5% LTCG, 30% STCG | July 2024 Union Budget | NRI tax calculator must use new rates |

## Open Questions

1. **City rental yield benchmarks accuracy**
   - What we know: General ranges from market reports (2-4% gross yield)
   - What's unclear: Exact current averages vary by micro-market
   - Recommendation: Use ranges with a disclaimer "based on market averages, individual properties may vary"

2. **Investment Scorecard weighting**
   - What we know: CRISIL/CARE use 7-star rating for developers, not individual properties
   - What's unclear: No industry standard for individual property scoring
   - Recommendation: Build a custom rubric (provided in code examples above) with clear weight disclosure. Present as "SquareMind's Investment Scorecard" not an industry standard.

3. **RERA Verifier depth**
   - What we know: Each state portal has different UI, no unified API
   - What's unclear: Whether we can iframe or deep-link to search results
   - Recommendation: Build as educational tool + state portal directory. Do NOT attempt to scrape/embed state portals.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected -- project has no test setup |
| Config file | none -- see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TOOL-01 | Rental yield calculation produces correct results | unit | N/A | No |
| TOOL-02 | Buy vs rent comparison produces correct results | unit | N/A | No |
| TOOL-03 | Total cost with correct stamp duty by state | unit | N/A | No |
| TOOL-04 | Investment scorecard grades properties correctly | unit | N/A | No |
| TOOL-05 | RERA verifier links to correct state portals | manual-only | N/A | No |
| TOOL-06 | NRI tax calculations with DTAA rates | unit | N/A | No |
| TOOL-07 | EMI formula returns correct monthly payment | unit | N/A | No |
| TOOL-08 | Stamp duty shows correct state-wise rates | unit | N/A | No |
| TOOL-09 | Each tool accessible at its own URL | smoke | N/A | No |
| TOOL-10 | Tools listing page shows all tools with links | smoke | N/A | No |

### Sampling Rate
- **Per task commit:** Manual browser verification (no test framework)
- **Per wave merge:** Manual browser verification across tools
- **Phase gate:** All tools render, calculations produce expected outputs for known inputs

### Wave 0 Gaps
- [ ] No test framework installed -- project has zero test infrastructure
- [ ] Calculations are pure functions that COULD be unit tested, but setting up vitest/jest is outside Phase 5 scope
- [ ] Recommendation: Verify calculations manually using known-good reference values (e.g., EMI for Rs.50L at 8.5% for 20 years = Rs.43,391/month)

## Sources

### Primary (HIGH confidence)
- Existing codebase: `src/components/calculators/*.tsx` -- analyzed all 3 existing calculator components
- Existing codebase: `src/app/(main)/tools/page.tsx` -- current tools page structure
- [State-wise Stamp Duty Rates 2025-26](https://www.realtyapplications.in/blog/state-wise-stamp-duty-and-registration-fees-in-india-2025-26) -- comprehensive rates table
- [State-wise RERA portal list](https://rentoobuy.in/useful-list-of-state-wise-rera-websites-in-india/) -- portal URLs by state

### Secondary (MEDIUM confidence)
- [NRI Taxation AY 2025-26](https://www.camfkhan.com/nri-taxation-in-india-ay-2025-26-what-every-nri-must-know) -- tax slabs and DTAA overview
- [DTAA Guide for NRIs](https://getbelong.com/blog/dtaa/) -- treaty rates by country
- [Capital Gains Tax for NRIs 2025](https://forindiandiaspora.com/capital-gains-tax-on-indian-property-for-nris-a-complete-guide-2025/) -- LTCG/STCG rules post July 2024 budget
- [Real Estate Rating System India](https://www.squareyards.com/blog/real-estate-rating-system-in-india) -- CRISIL/CARE rating methodology overview

### Tertiary (LOW confidence)
- City-wise rental yield averages -- aggregated from multiple market report estimates, not official data
- DTAA TDS rates by specific country -- general ranges verified, exact treaty article rates should be confirmed with a CA

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new libraries, pure React + existing stack
- Architecture: HIGH -- standard Next.js App Router patterns, proven in Phases 1-4
- Domain data (stamp duty, tax): MEDIUM -- sourced from multiple sites, cross-verified, but rates change
- Pitfalls: HIGH -- based on analysis of existing code issues and common patterns
- Investment Scorecard methodology: MEDIUM -- custom rubric, no industry standard for individual properties

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (30 days -- stamp duty rates stable within fiscal year)
