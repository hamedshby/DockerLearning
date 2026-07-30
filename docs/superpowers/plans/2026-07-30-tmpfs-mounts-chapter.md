# tmpfs Mounts Chapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete bilingual tmpfs Mounts chapter under Part 4.

**Architecture:** The static SPA loads `chapters/ch7-2.html` through the existing `ch7-2` table-of-contents target. The implementation is one HTML fragment plus a focused PowerShell contract test.

**Tech Stack:** Static HTML5, existing CSS classes, vanilla JavaScript chapter loader, PowerShell validation.

## Global Constraints

- Preserve the current `ch7-2` navigation target.
- Pair all `data-fa` and `data-en` attributes.
- Reuse existing styles and chapter patterns.
- Include concept, syntax, options, Compose, comparison, security, lab, and five questions.

---

### Task 1: Create and run the failing chapter contract

**Files:**
- Create: `scripts/validate-tmpfs-mounts.ps1`
- Test: `scripts/validate-tmpfs-mounts.ps1`

**Interfaces:**
- Consumes: `index.html`, `chapters/ch7-2.html`
- Produces: exit code 0 only when the tmpfs chapter contract is complete

- [ ] Assert the TOC target, file existence, core commands, options, comparison, lab, quiz count, and bilingual balance.
- [ ] Run the script and confirm it fails because `chapters/ch7-2.html` is missing.

### Task 2: Build the chapter

**Files:**
- Create: `chapters/ch7-2.html`
- Test: `scripts/validate-tmpfs-mounts.ps1`

**Interfaces:**
- Consumes: existing chapter-loading and language behavior
- Produces: complete bilingual tmpfs educational content

- [ ] Add all required sections, examples, tables, lab steps, and quiz questions.
- [ ] Run the contract test until it passes.

### Task 3: Verify structure and integration

**Files:**
- Verify: `index.html`
- Verify: `chapters/ch7-2.html`

**Interfaces:**
- Consumes: the new fragment and current navigation
- Produces: balanced, loadable HTML with no whitespace errors

- [ ] Parse the HTML and confirm balanced tags and language attributes.
- [ ] Run `git diff --check`.
- [ ] Inspect the final diff and verify no unrelated files changed.

