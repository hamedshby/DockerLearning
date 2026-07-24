# Estedad Font Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Persian UI font with a locally bundled variable Estedad font that works without network access.

**Architecture:** Store one variable WOFF2 asset under `assets/fonts` and expose it through a local `@font-face` declaration in `style.css`. Keep the existing English and monospace stacks unchanged and retain system fallbacks for resilience.

**Tech Stack:** HTML5, CSS, WOFF2

## Global Constraints

- The site must load Estedad without any network request.
- The variable font must cover weights 100 through 900.
- English and code-block font declarations must remain unchanged.
- Existing RTL/LTR behavior must remain unchanged.

---

### Task 1: Bundle and activate Estedad

**Files:**
- Create: `assets/fonts/Estedad[wght].woff2`
- Modify: `style.css`
- Verify: `index.html`

**Interfaces:**
- Consumes: `--font-fa` from the existing CSS variable system.
- Produces: a local font family named `Estedad` available for weights 100–900.

- [ ] **Step 1: Capture the failing static checks**

Run:

```powershell
Test-Path '.\assets\fonts\Estedad[wght].woff2'
Select-String -Path '.\style.css' -Pattern '@font-face'
```

Expected: the font path is `False` and no `@font-face` match is returned.

- [ ] **Step 2: Add the local font asset**

Download the official variable WOFF2 release of Estedad and save it exactly as:

```text
assets/fonts/Estedad[wght].woff2
```

Confirm that the saved file begins with the WOFF2 signature `wOF2`.

- [ ] **Step 3: Register the local font**

Add this declaration at the beginning of `style.css`:

```css
@font-face {
    font-family: 'Estedad';
    src: url('assets/fonts/Estedad[wght].woff2') format('woff2');
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
}
```

Change only the Persian font variable to:

```css
--font-fa: 'Estedad', 'Tahoma', sans-serif;
```

- [ ] **Step 4: Run static verification**

Run:

```powershell
$css = Get-Content -Raw -Encoding UTF8 '.\style.css'
$font = [System.IO.File]::ReadAllBytes((Resolve-Path '.\assets\fonts\Estedad[wght].woff2'))
if ([Text.Encoding]::ASCII.GetString($font[0..3]) -ne 'wOF2') { throw 'Invalid WOFF2 signature' }
if ($css -notmatch "@font-face") { throw 'Missing @font-face' }
if ($css -notmatch "font-weight:\s*100 900") { throw 'Missing variable weight range' }
if ($css -match "https?://|@import") { throw 'Network-dependent CSS detected' }
```

Expected: the command exits successfully without output.

- [ ] **Step 5: Verify browser behavior offline**

Serve the project locally, open `index.html`, disable network access in the browser, and confirm:

- Computed `font-family` for Persian body text begins with `Estedad`.
- Header weight 700 and normal text weight 400 render successfully.
- English and code blocks retain their existing font stacks.
- The browser Network panel contains no font request to an HTTP or HTTPS URL.

- [ ] **Step 6: Commit when a Git repository is available**

```powershell
git add style.css assets/fonts/Estedad[wght].woff2 docs/superpowers/specs/2026-07-24-estedad-font-design.md docs/superpowers/plans/2026-07-24-estedad-font.md
git commit -m "style: bundle Estedad font for offline use"
```

Expected: one commit containing the font asset, CSS change, design, and implementation plan.
