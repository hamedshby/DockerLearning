# Docker Networking Chapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete bilingual Docker Networking chapter under Part 5.

**Architecture:** The static SPA loads `chapters/ch6.html` through the existing `ch6` table-of-contents target. The implementation is one HTML fragment plus a focused PowerShell contract test.

**Tech Stack:** Static HTML5, existing CSS classes, vanilla JavaScript chapter loader, PowerShell validation.

## Global Constraints

- Preserve the current `ch6` navigation target.
- Pair all `data-fa` and `data-en` attributes.
- Reuse existing styles and chapter patterns.
- Include network concepts, drivers, user-defined Bridge, DNS, published ports, multi-network attachment, security, troubleshooting, a lab, and five questions.
- Do not modify global navigation, JavaScript, or CSS unless validation exposes an integration defect.

---

### Task 1: Create and run the failing chapter contract

**Files:**
- Create: `scripts/validate-docker-networking.ps1`
- Test: `scripts/validate-docker-networking.ps1`

**Interfaces:**
- Consumes: `index.html`, `chapters/ch6.html`
- Produces: exit code 0 only when the networking chapter contract is complete

- [ ] Write assertions for the TOC target, file existence, drivers, commands, DNS, port publishing, security, troubleshooting, structural sections, five-question quiz, bilingual balance, and key tag balance.
- [ ] Run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-docker-networking.ps1` and confirm it fails with `Missing chapters/ch6.html.`

### Task 2: Build the bilingual chapter

**Files:**
- Create: `chapters/ch6.html`
- Test: `scripts/validate-docker-networking.ps1`

**Interfaces:**
- Consumes: existing chapter-loading and language behavior
- Produces: a complete bilingual Docker Networking lesson

- [ ] Add the network model, driver comparison, Bridge guidance, lifecycle commands, DNS, port publishing, multiple-network behavior, security, troubleshooting, lab, and quiz.
- [ ] Run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-docker-networking.ps1` and confirm it exits 0.

### Task 3: Verify integration and repository hygiene

**Files:**
- Verify: `index.html`
- Verify: `chapters/ch6.html`
- Verify: `scripts/validate-docker-networking.ps1`

**Interfaces:**
- Consumes: the new fragment and current navigation
- Produces: balanced, loadable HTML without unrelated modifications

- [ ] Run every validator in `scripts/validate-*.ps1` and confirm each exits 0.
- [ ] Run `git diff --check` and confirm it exits 0.
- [ ] Inspect `git status --short` and the focused diff to confirm only the planned files were added.

