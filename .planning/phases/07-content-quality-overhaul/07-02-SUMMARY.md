---
phase: 07-content-quality-overhaul
plan: 02
subsystem: content
tags: [cli, claude-api, mdx, content-rewrite, batch-processing]

# Dependency graph
requires:
  - phase: 07-content-quality-overhaul
    provides: Link map JSON (1191 keywords), ToolCallout component, FAQPage schema injection
provides:
  - CLI rewrite script (scripts/rewrite-batch.js) with --status, --dry-run, --count, --category
  - Rewrite prompt template (scripts/rewrite-prompt.md) with 8 template variables and quality rules
affects: [07-03-batch-execution, content-quality]

# Tech tracking
tech-stack:
  added: []
  patterns: [cli-batch-processing, template-variable-substitution, claude-api-integration]

key-files:
  created:
    - scripts/rewrite-batch.js
    - scripts/rewrite-prompt.md
  modified: []

key-decisions:
  - "Word count threshold of 3000 words to detect already-rewritten posts (originals are ~500 words)"
  - "50-entry link map limit per prompt to manage token count while providing sufficient linking context"
  - "Sequential API calls with 2-second delay for rate limit compliance"

patterns-established:
  - "Rewrite CLI: node scripts/rewrite-batch.js --count N [--category 'Name'] [--dry-run] [--status]"
  - "Prompt template uses {{VARIABLE}} syntax for dynamic content injection"

requirements-completed: [CQO-02]

# Metrics
duration: 3min
completed: 2026-03-09
---

# Phase 7 Plan 02: Rewrite CLI and Prompt Template Summary

**CLI batch rewrite script with Claude API integration and master prompt template targeting 6000-8000 word articles with TL;DR blocks, 20-25 FAQs, internal linking, and external citations**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-09T18:31:23Z
- **Completed:** 2026-03-09T18:34:20Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Master rewrite prompt template (6710 chars) with 8 template variables covering TL;DR blocks, H2/H3 structure, 20-25 FAQs, Sources section, ToolCallout usage, and internal linking from link map
- CLI script (328 lines) with --status (category breakdown of all 301 posts), --dry-run (preview selection), --count and --category flags
- Category priority ordering matches CONTEXT.md: Investment Strategy first, then Tax & Legal, NRI Corner, City Guides, etc.
- Graceful error handling: missing API key message, per-post try/catch, gray-matter parse warnings

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite prompt template** - `23b9aad` (feat)
2. **Task 2: CLI rewrite batch script** - `b7cda38` (feat)

## Files Created/Modified
- `scripts/rewrite-prompt.md` - Master prompt template with structure requirements, voice guidelines, linking instructions, and 8 template variables
- `scripts/rewrite-batch.js` - CLI script that selects posts by category priority, builds prompts with filtered link maps, calls Claude API, and replaces MDX in-place

## Decisions Made
- Word count threshold of 3000 to distinguish original (~500 word) posts from rewritten ones -- provides clear separation
- Link map filtering: same-category posts + 15 cross-category + all tools/pages, capped at 50 entries to manage prompt token usage
- Sequential API calls (not parallel) with 2-second delay between calls for rate limit compliance
- readTime auto-updated based on new word count at 200 words/minute

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
ANTHROPIC_API_KEY must be set in `.env.local` before running actual rewrites. The script provides clear instructions when the key is missing.

## Next Phase Readiness
- Script ready for batch execution (Plan 03) -- just needs ANTHROPIC_API_KEY
- --status confirms all 301 posts detected across 9 categories
- --dry-run confirms correct priority ordering (Investment Strategy posts selected first)

---
*Phase: 07-content-quality-overhaul*
*Completed: 2026-03-09*
