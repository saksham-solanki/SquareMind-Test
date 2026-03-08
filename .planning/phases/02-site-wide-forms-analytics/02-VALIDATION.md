---
phase: 2
slug: site-wide-forms-analytics
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (if installed) / inline shell commands |
| **Config file** | none — uses inline automated verify |
| **Quick run command** | `grep -q "form_type" src/app/api/leads/route.ts` |
| **Full suite command** | `npx next build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run inline `<automated>` verify command
- **After every plan wave:** Run `npx next build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | LEAD-01,02,03,04 | integration | `grep -q "form_type" src/app/api/leads/route.ts` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | LEAD-07 | integration | `test -f src/lib/resend.ts` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 2 | BOOK-01,02,04 | integration | `grep -rq "CalendlyButton" src/components/` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 2 | ANAL-01,04,05,06 | integration | `grep -q "hotjar" src/app/layout.tsx` | ❌ W0 | ⬜ pending |
| 02-03-01 | 03 | 3 | NEWS-01,02 | integration | `test -f src/components/NewsletterForm.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements (extends Phase 1 patterns)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Resend email delivery | LEAD-07 | Requires DNS verification + live API key | Submit form, check team inbox within 60s |
| Hotjar session recording | ANAL-05 | Requires Hotjar account + site ID | Visit pages, check Hotjar dashboard for recordings |
| Calendly popup opens | BOOK-01 | Requires live Calendly URL | Click "Book a Call" buttons across site |
| GA4 custom events | ANAL-04 | Requires GA4 property | Submit form, check GA4 Realtime report |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
