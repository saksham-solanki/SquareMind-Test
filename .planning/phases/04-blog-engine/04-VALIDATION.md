---
phase: 4
slug: blog-engine
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | inline shell commands + next build |
| **Config file** | none |
| **Quick run command** | `ls content/posts/*.mdx 2>/dev/null | head -1` |
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
| MDX renders with prose styling | BLOG-03 | Visual styling check | Visit /insights/[slug], verify typography |
| Category filters work | BLOG-01 | Interactive UI check | Click category tabs on /insights |
| Related posts display correctly | BLOG-04 | Content matching check | Visit post, verify related posts section |
| SEO metadata correct | BLOG-05 | Head tag inspection | View source, check OG/Twitter/JSON-LD |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify
- [ ] Sampling continuity maintained
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
