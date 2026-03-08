# Testing Patterns

**Analysis Date:** 2026-03-08

## Test Framework

**Runner:**
- No test framework is installed or configured.
- No test runner config files detected (no `jest.config.*`, `vitest.config.*`, `playwright.config.*`, `cypress.config.*`).
- No test-related dependencies in `package.json`.

**Run Commands:**
```bash
npm run lint         # Only quality check available (ESLint)
```

No `test` script exists in `package.json`.

## Test File Organization

**Location:**
- No test files exist anywhere in the codebase.
- No `*.test.*`, `*.spec.*`, or `__tests__/` directories found.

## Test Coverage

**Current Coverage:** 0% - No tests exist.

**Requirements:** None enforced. No coverage thresholds configured.

## What Should Be Tested (Recommendations)

**Priority 1 - Calculator Logic:**
- `src/components/calculators/BuyVsRentCalc.tsx` - EMI calculation, net cost comparison, buy-vs-rent verdict logic
- `src/components/calculators/RentalYieldCalc.tsx` - Yield calculation logic
- `src/components/calculators/TotalCostCalc.tsx` - Total cost breakdown logic
- These contain pure math functions (`fmt()`, EMI formulas) that are extractable and unit-testable.

**Priority 2 - Data Layer:**
- `src/lib/posts.ts` - `getPostBySlug()`, `getRelatedPosts()` functions
- `src/lib/supabase.ts` - `getSupabase()` null handling when env vars missing
- `src/lib/cn.ts` - `cn()` class merging utility

**Priority 3 - Form Components:**
- `src/components/EOIForm.tsx` - Form submission, API fallback, error states
- `src/components/ConsultForm.tsx` - Submit flow, loading/submitted states
- `src/components/HeroForm.tsx` - Submit flow, state transitions
- `src/components/DownloadGate.tsx` - Modal open/close, form submission

**Priority 4 - Interactive Components:**
- `src/components/FAQList.tsx` - Accordion open/close behavior
- `src/components/FilterPills.tsx` - Active state toggling
- `src/components/Navbar.tsx` - Mobile menu toggle, scroll behavior
- `src/components/StickyMobileCTA.tsx` - Scroll visibility threshold

## Recommended Setup

**For this Next.js 16 + React 19 project, use:**

```bash
# Install test framework
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom
```

**Suggested `vitest.config.ts`:**
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
```

**Suggested file structure:**
```
src/
├── test/
│   └── setup.ts           # @testing-library/jest-dom setup
├── lib/
│   ├── cn.ts
│   └── cn.test.ts          # Co-located unit tests
├── components/
│   ├── FAQList.tsx
│   └── FAQList.test.tsx    # Co-located component tests
└── components/calculators/
    ├── BuyVsRentCalc.tsx
    └── BuyVsRentCalc.test.tsx
```

**Suggested `package.json` scripts:**
```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

## Extractable Logic for Testing

Calculator components contain pure computation mixed into React components. To make testing easier, extract calculation logic into separate functions:

**Example from `src/components/calculators/BuyVsRentCalc.tsx`:**
```typescript
// Currently inline in component - should be extracted to a utility:
const emi = monthlyRate > 0
  ? (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  : loanAmt / months;
```

**Example from `src/lib/posts.ts`:**
```typescript
// Already testable as exported functions:
export function getPostBySlug(slug: string): Post | undefined;
export function getRelatedPosts(slug: string, category: string): Post[];
```

## E2E Testing

**Framework:** Not used.

**Recommendation:** If E2E testing is needed, Playwright would be suitable for testing:
- Full form submission flows
- Navigation and mobile menu behavior
- Calculator end-to-end workflows
- Blog post rendering from `src/lib/posts.ts` data

---

*Testing analysis: 2026-03-08*
