---
phase: 6
slug: content-at-scale
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 6 — Validation Strategy

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | inline shell commands + next build |
| **Quick run command** | `ls content/posts/*.mdx | wc -l` |
| **Full suite command** | `npx next build` |
| **Estimated runtime** | ~60 seconds |

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Posts render correctly | CONT-01 | Visual check | Visit /insights, click random posts |
| Internal links work | CONT-04 | Navigation check | Click tool/framework links in posts |
| SEO metadata correct | CONT-03 | Head inspection | View source on post pages |

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
