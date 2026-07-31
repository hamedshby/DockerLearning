# Data Backup and Restore Chapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete bilingual Data Backup and Restore chapter under Part 4.

**Architecture:** The static SPA loads `chapters/ch7-3.html` through the existing `ch7-3` table-of-contents target. The implementation is one HTML fragment plus a focused PowerShell contract test.

**Tech Stack:** Static HTML5, existing CSS classes, vanilla JavaScript chapter loader, PowerShell validation.

## Global Constraints

- Preserve the current `ch7-3` navigation target.
- Pair all `data-fa` and `data-en` attributes.
- Reuse existing styles and chapter patterns.
- Include consistency, Volume and Bind Mount workflows, SQL Server, verification, retention, security, a lab, and five questions.
- Do not modify unrelated existing work in `index.html` or `.vscode`.

---

### Task 1: Create and run the failing chapter contract

**Files:**
- Create: `scripts/validate-data-backup-restore.ps1`
- Test: `scripts/validate-data-backup-restore.ps1`

**Interfaces:**
- Consumes: `index.html`, `chapters/ch7-3.html`
- Produces: exit code 0 only when the chapter contract is complete

- [ ] Write assertions for the TOC target, file existence, core commands and concepts, structural sections, five-question quiz, bilingual balance, and key tag balance.
- [ ] Run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-data-backup-restore.ps1` and confirm it fails with `Missing chapters/ch7-3.html.`

### Task 2: Build the bilingual chapter

**Files:**
- Create: `chapters/ch7-3.html`
- Test: `scripts/validate-data-backup-restore.ps1`

**Interfaces:**
- Consumes: existing chapter-loading and language behavior
- Produces: a complete bilingual backup and restore lesson

- [ ] Add the definition, consistency model, named Volume backup and restore commands, Bind Mount guidance, SQL Server logical backup, verification, retention, security, lab, and quiz.
- [ ] Run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-data-backup-restore.ps1` and confirm it exits 0.

### Task 3: Verify integration and repository hygiene

**Files:**
- Verify: `index.html`
- Verify: `chapters/ch7-3.html`
- Verify: `scripts/validate-data-backup-restore.ps1`

**Interfaces:**
- Consumes: the new fragment and current navigation
- Produces: balanced, loadable HTML without unrelated modifications

- [ ] Run all three storage validators and confirm they exit 0.
- [ ] Run `git diff --check` and confirm it exits 0.
- [ ] Inspect `git status --short` and the focused diff to separate new work from pre-existing changes.

