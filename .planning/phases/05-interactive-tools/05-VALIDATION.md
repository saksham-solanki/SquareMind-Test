---
phase: 5
slug: interactive-tools
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | inline shell commands + next build |
| **Config file** | none |
| **Quick run command** | `ls src/app/\(main\)/tools/*/page.tsx 2>/dev/null | wc -l` |
| **Full suite command** | `npx next build` |
| **Estimated runtime** | ~30 seconds |

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Calculator produces correct results | TOOL-01,02,03 | Mathematical accuracy | Enter known values, verify output |
| Mobile layout works | TOOL-10 | Device-specific visual | Test on mobile viewport |
| Each tool has own URL | TOOL-09 | Route navigation | Visit /tools/rental-yield etc. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify
- [ ] Sampling continuity maintained
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
