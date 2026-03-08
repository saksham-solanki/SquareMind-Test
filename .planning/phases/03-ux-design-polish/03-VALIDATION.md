---
phase: 3
slug: ux-design-polish
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | inline shell commands + next build |
| **Config file** | none |
| **Quick run command** | `grep -q "motion" src/components/*.tsx` |
| **Full suite command** | `npx next build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run inline `<automated>` verify command
- **After every plan wave:** Run `npx next build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Page transitions animate | UX-01 | Visual behavior | Navigate between pages, verify smooth fade/slide |
| Count-up animation triggers on scroll | UX-02 | Scroll-triggered visual | Scroll to stats section, verify numbers animate up |
| Testimonial carousel auto-advances | UX-03 | Timed visual behavior | Watch carousel for 5s, verify rotation |
| Mobile nav slides in smoothly | UX-04 | Device-specific visual | Open mobile nav, verify slide animation + blur |
| Hover micro-interactions visible | UX-05 | Pointer-dependent visual | Hover buttons/cards, verify scale/glow effects |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify
- [ ] Sampling continuity maintained
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
