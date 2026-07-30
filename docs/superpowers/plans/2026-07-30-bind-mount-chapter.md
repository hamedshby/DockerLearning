# Bind Mount Chapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete bilingual Bind Mount chapter under Part 4, matching the Docker Volume chapter.

**Architecture:** The existing SPA loads chapter fragments from `chapters/<target>.html`. The current TOC already maps Bind Mounts to `ch7-1`, so implementation is one self-contained HTML fragment plus a validation script.

**Tech Stack:** Static HTML5, existing CSS component classes, vanilla JavaScript chapter loader, PowerShell validation.

## Global Constraints

- Preserve the existing `ch7-1` target and chapter-loading architecture.
- Use paired `data-fa` and `data-en` attributes for bilingual content.
- Reuse existing visual classes; add no new global CSS.
- Match Docker Volume's progression from concept to examples, best practices, lab, and quiz.

---

### Task 1: Add a failing chapter contract

**Files:**
- Create: `scripts/validate-bind-mount.ps1`
- Test: `scripts/validate-bind-mount.ps1`

**Interfaces:**
- Consumes: `index.html`, `chapters/ch7-1.html`
- Produces: exit code 0 only when the Bind Mount chapter contract is satisfied

- [ ] Add assertions for the TOC target, chapter existence, bilingual attributes, core commands, comparison table, lab, and five quiz questions.
- [ ] Run `powershell -ExecutionPolicy Bypass -File scripts/validate-bind-mount.ps1`.
- [ ] Confirm failure reports the missing `chapters/ch7-1.html`.

### Task 2: Build the Bind Mount chapter

**Files:**
- Create: `chapters/ch7-1.html`
- Test: `scripts/validate-bind-mount.ps1`

**Interfaces:**
- Consumes: existing chapter CSS classes and `showChapter('ch7-1')`
- Produces: bilingual Bind Mount instructional content

- [ ] Add the concept, syntax, examples, comparison, Compose, security, lab, and quiz sections.
- [ ] Run the validation script and resolve every contract failure.
- [ ] Inspect the HTML diff for encoding errors and accidental changes outside scope.

### Task 3: Verify site integration

**Files:**
- Verify: `index.html`
- Verify: `script.js`
- Verify: `chapters/ch7-1.html`

**Interfaces:**
- Consumes: local static server
- Produces: chapter that loads from the Part 4 TOC and switches between Persian and English

- [ ] Serve the project locally.
- [ ] Open `#ch7-1`, verify content loads, and inspect console errors.
- [ ] Switch languages and verify headings and explanatory text update.
- [ ] Run the validation script once more and inspect `git diff --check`.

