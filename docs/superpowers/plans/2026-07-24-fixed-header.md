# Fixed Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the book header fixed at the top of the viewport without covering page content.

**Architecture:** Update only the existing layout rules in `style.css`. Remove the header from normal flow with fixed positioning, compensate on `body` with top padding, and increase the shared header-height variable at the mobile breakpoint.

**Tech Stack:** CSS

## Global Constraints

- The header must remain at `top: 0` during vertical scrolling.
- Page content must not be hidden behind the header.
- RTL, LTR, desktop sidebar, mobile layout, and print behavior must remain supported.
- No JavaScript may be added for header sizing.

---

### Task 1: Fix the header to the viewport

**Files:**
- Modify: `style.css`
- Verify: `index.html`

**Interfaces:**
- Consumes: the existing `--header-height` CSS variable.
- Produces: a fixed `.main-header` and matching document offset.

- [ ] **Step 1: Run the failing CSS assertions**

```powershell
$css = Get-Content -Raw -Encoding UTF8 '.\style.css'
if ($css -notmatch '\.main-header\s*\{[\s\S]*?position:\s*fixed') { throw 'Header is not fixed' }
if ($css -notmatch 'body\s*\{[\s\S]*?padding-top:\s*var\(--header-height\)') { throw 'Body offset is missing' }
```

Expected: FAIL with `Header is not fixed`.

- [ ] **Step 2: Apply the minimal desktop fix**

In the `html, body` rule, add:

```css
padding-top: 0;
```

Then add a separate rule:

```css
body {
    padding-top: var(--header-height);
}
```

Update `.main-header`:

```css
position: fixed;
top: 0;
inset-inline: 0;
width: 100%;
z-index: 1000;
```

- [ ] **Step 3: Add the mobile height compensation**

Inside `@media (max-width: 768px)`, add:

```css
:root {
    --header-height: 145px;
}
```

- [ ] **Step 4: Preserve print layout**

Inside `@media print`, add:

```css
body {
    padding-top: 0;
}
```

- [ ] **Step 5: Run complete static verification**

```powershell
$css = Get-Content -Raw -Encoding UTF8 '.\style.css'
$checks = @(
    @{ Name = 'fixed header'; Pattern = '\.main-header\s*\{[\s\S]*?position:\s*fixed' },
    @{ Name = 'full viewport width'; Pattern = 'inset-inline:\s*0' },
    @{ Name = 'body offset'; Pattern = 'body\s*\{[\s\S]*?padding-top:\s*var\(--header-height\)' },
    @{ Name = 'desktop height'; Pattern = '--header-height:\s*110px' },
    @{ Name = 'mobile height'; Pattern = '@media \(max-width:\s*768px\)[\s\S]*?--header-height:\s*145px' },
    @{ Name = 'print reset'; Pattern = '@media print[\s\S]*?body\s*\{[\s\S]*?padding-top:\s*0' },
    @{ Name = 'sidebar offset'; Pattern = '\.sidebar\s*\{[\s\S]*?top:\s*var\(--header-height\)' }
)
foreach ($check in $checks) {
    if ($css -notmatch $check.Pattern) { throw "Missing: $($check.Name)" }
}
```

Expected: exits successfully without output.

- [ ] **Step 6: Verify responsive behavior in a browser**

At desktop and mobile widths, scroll the page and confirm:

- The header remains at the viewport top.
- The first content row is not covered.
- The desktop sidebar begins below the header.
- Mobile text does not overlap the content.
- Print preview excludes the header and has no empty top offset.

- [ ] **Step 7: Commit when Git is available**

```powershell
git add style.css docs/superpowers/specs/2026-07-24-fixed-header-design.md docs/superpowers/plans/2026-07-24-fixed-header.md
git commit -m "fix: keep book header visible while scrolling"
```
