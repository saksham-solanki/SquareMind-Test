---
phase: 1
slug: ad-launch-pipeline
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-08
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (needs setup — Wave 0) |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | INFRA-01 | unit | `npx vitest run tests/infra.test.ts -t "no static export"` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | INFRA-03 | unit | `npx vitest run tests/sitemap.test.ts` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 1 | INFRA-04 | unit | `npx vitest run tests/robots.test.ts` | ❌ W0 | ⬜ pending |
| 01-01-04 | 01 | 1 | INFRA-05 | integration | `npx vitest run tests/api-leads.test.ts` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | LEAD-05 | unit | `npx vitest run tests/utm.test.ts` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 1 | LEAD-06 | unit | `npx vitest run tests/utm.test.ts -t "source page"` | ❌ W0 | ⬜ pending |
| 01-02-03 | 02 | 1 | LEAD-08 | integration | `npx vitest run tests/api-leads.test.ts -t "all fields"` | ❌ W0 | ⬜ pending |
| 01-03-01 | 03 | 2 | ANAL-02 | unit | `npx vitest run tests/meta-pixel.test.ts` | ❌ W0 | ⬜ pending |
| 01-03-02 | 03 | 2 | ANAL-03 | unit | `npx vitest run tests/meta-pixel.test.ts -t "Lead event"` | ❌ W0 | ⬜ pending |
| 01-03-03 | 03 | 2 | LAND-02 | unit | `npx vitest run tests/landing-layout.test.ts` | ❌ W0 | ⬜ pending |
| 01-03-04 | 03 | 2 | LAND-05 | manual | Chrome DevTools mobile viewport | N/A | ⬜ pending |
| 01-03-05 | 03 | 2 | BOOK-03 | unit | `npx vitest run tests/calendly.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom` — install test framework
- [ ] `vitest.config.ts` — jsdom environment with React plugin
- [ ] `tests/infra.test.ts` — stubs for INFRA-01, INFRA-03, INFRA-04
- [ ] `tests/api-leads.test.ts` — stubs for INFRA-05, LEAD-08
- [ ] `tests/utm.test.ts` — stubs for LEAD-05, LEAD-06
- [ ] `tests/meta-pixel.test.ts` — stubs for ANAL-02, ANAL-03
- [ ] `tests/landing-layout.test.ts` — stubs for LAND-02
- [ ] `tests/calendly.test.ts` — stubs for BOOK-03

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Landing page renders correctly on mobile | LAND-05 | Visual/layout verification | Open /invest/tri-city in Chrome DevTools with iPhone 12 viewport (390x844), verify no overflow/cutoff |
| Meta Pixel fires events | ANAL-02, ANAL-03 | Requires real browser with Pixel Helper extension | Install Meta Pixel Helper, navigate to /invest/tri-city, verify ViewContent fires on load, submit form, verify Lead event fires |
| Calendly popup opens | BOOK-03 | Requires Calendly account URL | Click "Book Your Free Strategy Call" button, verify Calendly popup opens with correct scheduling page |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
