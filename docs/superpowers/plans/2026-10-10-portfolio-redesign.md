# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio's visual system on an Open Design `linear-app`-derived monochrome token set, add capability-gated 3D scroll reveals, delete ten dead components and four unused dependencies, and fix five defects.

**Architecture:** The token layer in `src/styles.css` is rewritten first and every section component is restyled against it in dependency order. Behaviour lives in `App.jsx` (theme, language, scroll-spy, reveal observer) and is not restructured — only its reveal gate changes. Verification is vitest for data integrity and CSS token consistency, plus `npm run lint` and `npm run build` as the per-task gate.

**Tech Stack:** React 19.2, Vite 8.0.10, vitest 5.0.3 (new, devDependency), plain CSS custom properties. No CSS framework after cleanup.

**Spec:** `docs/superpowers/specs/2026-10-10-portfolio-redesign-linear-monochrome-design.md`

## Global Constraints

- No new **runtime** dependencies. Only one new devDependency: `vitest@^5.0.3`.
- Never add `jsdom` or `@testing-library/*`. All tests run in vitest's `node` environment.
- No CSS framework, utility class, or styling library. Tokens only, via custom properties.
- The palette is **achromatic**. No chromatic accent colour is introduced anywhere. `--accent` remains an alias of the primary ink token.
- Inter Variable is the only typeface after this work. Outfit is removed.
- Font weights are limited to **400, 510, 590**. Do not write `font-weight: 700` in new CSS; remove existing uses that are restyled.
- Dark-mode elevation is expressed by **background luminance**, not drop shadows. `--shadow` is `none` in dark.
- Every existing `t()` key keeps its meaning. New keys are additive to **both** `en` and `fr`.
- No `.reveal` class may be placed on `Navbar`, the mobile drawer, the footer, or any ancestor of a `position: fixed` element.
- Node engine floor: `>=22.12.0 <23`. Do not change `engines`.
- Modern-CSS baseline is accepted: the plan uses `color-mix()`, `text-wrap: balance`, `clamp()`, `aspect-ratio`, `:focus-visible`, `overflow: clip` and `backdrop-filter`. These are all already in use by the current stylesheet, so the browser floor is unchanged by this work. In a browser lacking `color-mix()`, the focus ring and the spotlight glow degrade to no ring / no glow — a graceful loss, not a broken layout. Do not add polyfills.
- Pre-commit runs `npm run security:secrets` and nothing else. Failing tests do **not** block a commit, so a red-test commit is permitted.
- CI (`security-gate.yml`) runs `npm run security:audit` (`npm audit --omit=dev`), `npm run security:headers`, and (after Task 1) `npm test`. Because `npm audit` is scoped to production deps, a vitest devDependency cannot fail it.

## Review Focus

The spec's silence on these is not permission for them to break. Each line below is exercised by a test inside the task that owns the relevant code.

1. **A `t()` key present in `en` but missing from `fr`.** A French visitor sees the raw English key or a blank label. Currently latent: the two dictionaries happen to have matching 112-key sets, so a single new key added to one file passes review but ships broken. Pinned by the key-parity assertion in Task 1 and Task 2.
2. **A CSS token renamed or misspelled, referenced by `var()` but never defined.** Silent failure — the element renders with no colour and no build error. Highest risk during the ~600-line token rewrite in Task 3. Pinned by the token-consistency test in Task 3.
3. **A `.reveal` element gaining a `transform`, placed above a `position: fixed` element.** The mobile drawer stops covering the viewport and the skip link is mispositioned. No build error, no test failure; only visible on a narrow viewport. Pinned by the manual check in Task 12 and structurally prevented by the Global Constraints rule.
4. **A project image path that does not resolve to a file under `public/`.** Every card renders broken, hidden by an `onError` handler that removes the `<img>` — so the site looks merely empty rather than broken, and it ships unnoticed. Pinned by the filesystem assertion in Task 1, fixed in Task 2.
5. **Reduced-motion or touch device receiving the 3D reveal.** `useAnimationBudget` already reports `shouldLimitMotion` but no code reads it; wiring the gate incorrectly regresses accessibility with no console error. Pinned by the `data-motion` attribute assertion in Task 11.

---

### Task 1: Vitest harness and failing data-integrity tests

**Files:**
- Create: `vitest.config.js`
- Create: `src/data/portfolioData.test.js`
- Modify: `package.json` (add `test` script, add `vitest` devDependency)
- Modify: `.github/workflows/security-gate.yml`

**Interfaces:**
- Consumes: `i18n`, `projects` from `src/data/portfolioData.js`.
- Produces: `npm test` runs vitest in a `node` environment over `src/**/*.test.js`. Two failing assertions that Tasks 2 makes pass: project image paths must resolve under `public/`, and every `t('key')` used in a component must exist in both `i18n.en` and `i18n.fr`.

- [ ] **Step 1: Install vitest and add the test script**

```bash
npm install -D vitest@^5.0.3
```

Add to `package.json` scripts, keeping alphabetical order alongside the existing entries:

```json
"test": "vitest run"
```

- [ ] **Step 2: Create `vitest.config.js`**

The project is `"type": "module"`, so ESM config. No jsdom — both tests read the filesystem and import a plain data module.

```js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.js"],
  },
});
```

Do not add the `react` plugin; no test renders JSX.

- [ ] **Step 3: Write the failing tests in `src/data/portfolioData.test.js`**

Both assertions are currently failing, which is the point of this task. The key scan reads component source because that is where a key gets referenced; the parity direction that actually matters (a key in `en` absent from `fr`) is asserted directly.

```js
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { i18n, projects } from "./portfolioData.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PUBLIC = path.join(ROOT, "public");

describe("project assets", () => {
  it.each(projects.map((p) => [p.id, p.img]))(
    "%s resolves to a file under public/",
    (_id, img) => {
      const rel = img.replace(/^assets\/projects\//, "");
      expect(fs.existsSync(path.join(PUBLIC, rel))).toBe(true);
    }
  );
});

describe("i18n", () => {
  const SOURCES = ["App.jsx", ...fs.readdirSync(path.join(ROOT, "src/components")).filter((f) => f.endsWith(".jsx")).map((f) => `components/${f}`)];

  it("defines every key a component references, in both languages", () => {
    const used = new Set();
    for (const rel of SOURCES) {
      const src = fs.readFileSync(path.join(ROOT, "src", rel), "utf8");
      for (const m of src.matchAll(/\bt\('([a-z0-9_]+)'\)/g)) used.add(m[1]);
    }
    const missingEn = [...used].filter((k) => !(k in i18n.en));
    const missingFr = [...used].filter((k) => !(k in i18n.fr));
    expect({ missingEn, missingFr }).toEqual({ missingEn: [], missingFr: [] });
  });

  it("keeps en and fr key sets identical", () => {
    expect(Object.keys(i18n.en).sort()).toEqual(Object.keys(i18n.fr).sort());
  });
});
```

- [ ] **Step 4: Run the tests and confirm they fail for the expected reasons**

Run: `npm test`
Expected: FAIL. Seven failures — five from `resolves to a file under public/` (every `img` is prefixed `assets/projects/`), and one from `missingFr`/`missingEn` naming `lbl_filter`. The `en`/`fr` parity test passes; that is correct, not a mistake.

- [ ] **Step 5: Add tests to CI**

In `.github/workflows/security-gate.yml`, append a step to the existing `security` job after "Enforce security headers baseline":

```yaml
      - name: Run unit tests
        run: npm test
```

- [ ] **Step 6: Verify `npm run security:audit` is unaffected**

Run: `npm run security:audit`
Expected: passes. Vitest is a devDependency and the audit is scoped with `--omit=dev`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.js src/data/portfolioData.test.js .github/workflows/security-gate.yml
git commit -m "test: add vitest harness and failing data-integrity checks"
```

---

### Task 2: Fix the data defects

**Files:**
- Modify: `src/data/portfolioData.js:170,178,186,194,202` (`img` values) and both dictionaries (add `lbl_filter`)
- Test: `src/data/portfolioData.test.js` (already green once these land)

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: every `projects[].img` is a root-relative Vite public path (`/<file>.webp`); `i18n.en.lbl_filter` and `i18n.fr.lbl_filter` both defined. Task 9 relies on the image paths being correct.

- [ ] **Step 1: Repoint the five project images**

In each of the five project objects in `src/data/portfolioData.js`, change `img` from the `assets/projects/...` form to a root-relative path. The files are already at the `public/` root, so only the prefix changes:

```js
img: '/iki-management.webp',        // was 'assets/projects/iki-management.webp'
img: '/event-management.webp',
img: '/library-project.webp',
img: '/countries-explorer.webp',
img: '/mini-shop.webp',
```

- [ ] **Step 2: Add the missing `lbl_filter` key to both dictionaries**

`src/components/Projects.jsx:30` calls `t('lbl_filter')`, which is defined in neither language, so it renders the raw key. Insert `lbl_filter` immediately after `lbl_theme` in **both** `en` and `fr`:

```js
lbl_filter: 'Project filter',   // en
lbl_filter: 'Filtre des projets', // fr
```

- [ ] **Step 3: Run the tests and confirm they pass**

Run: `npm test`
Expected: PASS, 8 passed (5 asset cases + `mobile` parametrisation counted per project, plus the 2 i18n tests).

- [ ] **Step 4: Commit**

```bash
git add src/data/portfolioData.js
git commit -m "fix: correct project image paths and add missing lbl_filter key"
```

---

### Task 3: Rewrite the token layer

**Files:**
- Modify: `src/styles.css:1-121` (tokens, reset, layout utilities, `section`, `.eyebrow`, `h2`, `.lead`)
- Create: `src/styles.test.js`

**Interfaces:**
- Consumes: nothing from Task 2.
- Produces: the complete token vocabulary that every later task consumes. **The exact names are the contract** — Tasks 4–11 reference them and must not invent new ones:
  - Surfaces: `--bg`, `--panel`, `--surface`, `--surface-hi`, `--raised`
  - Lines: `--line`, `--line-subtle`, `--line-input`
  - Text: `--ink`, `--ink2`, `--muted`, `--faint`
  - Status: `--ok`, `--err`, `--ok-bg`, `--err-bg`
  - Radius: `--r-badge`, `--r-control`, `--r-card`, `--r-panel`, `--r-full`
  - Motion: `--ease-out`, `--dur-reveal`
  - Fonts: `--font-sans` (Inter Variable), `--font-mono`
  - Other: `--shadow`, `--nav`, `--mym-line`
  - Legacy aliases, declared only so no `var()` dangles mid-plan and deleted in Task 13 Step 7: `--btn`, `--btn-txt`, `--card`, `--subtle`, `--accent-soft`, `--line-hover`, `--font-display`, `--phone`, `--pattern`

- [ ] **Step 1: Write the token-consistency test in `src/styles.test.js`**

This is a **characterisation** test: both assertions pass against the current stylesheet and must keep passing across the rewrite. Do not manufacture a failure — its value is catching a typo in the token names that the rewrite introduces.

```js
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CSS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "styles.css");
const css = fs.readFileSync(CSS, "utf8");

const tokensIn = (re) =>
  new Set([...css.matchAll(re)].flatMap((m) => [...m[1].matchAll(/(--[a-z0-9-]+)\s*:/g)].map((x) => x[1])));

const root = tokensIn(/(?:^|\n):root\s*\{([^}]*)\}/g);
const dark = tokensIn(/\.dark\s*\{([^}]*)\}/g);
const used = new Set([...css.matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]));

describe("css tokens", () => {
  it("defines every referenced var() in :root", () => {
    expect([...used].filter((v) => !root.has(v))).toEqual([]);
  });

  it("defines every .dark override in :root as well", () => {
    expect([...dark].filter((v) => !root.has(v))).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS. Both assertions hold today; this is the baseline the rewrite must not break.

- [ ] **Step 3: Replace the token block**

Rewrite `src/styles.css:6-58`. Delete both existing blocks and replace with the following. Dark is the native palette; `.dark` overrides only what differs.

```css
:root {
  color-scheme: light;
  --bg: #ffffff;
  --panel: #fafafa;
  --surface: #f4f4f5;
  --surface-hi: #ececee;
  --raised: rgba(0, 0, 0, .015);
  --line: rgba(0, 0, 0, .09);
  --line-subtle: rgba(0, 0, 0, .055);
  --line-input: rgba(0, 0, 0, .16);
  --ink: #0a0a0a;
  --ink2: #404040;
  --muted: #6b7280;
  --faint: #9ca3af;
  --accent: var(--ink);
  --ok: #15803d;
  --ok-bg: #f0fdf4;
  --err: #b91c1c;
  --err-bg: #fef2f2;
  --nav: rgba(255, 255, 255, .82);
  --mym-line: rgba(0, 0, 0, .12);
  --shadow: 0 1px 2px rgba(0, 0, 0, .04), 0 8px 24px -12px rgba(0, 0, 0, .10);
  --r-badge: 2px;
  --r-control: 6px;
  --r-card: 8px;
  --r-panel: 12px;
  --r-full: 999px;
  --ease-out: cubic-bezier(.16, 1, .3, 1);
  --dur-reveal: 720ms;
  --font-sans: 'Inter Variable', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, 'SF Mono', Menlo, monospace;

  /* Legacy aliases — map the pre-redesign token names onto the new system so
     that no `var()` dangles while Tasks 4-9 restyle components one at a time.
     Every one of these is deleted in Task 13 Step 7, once nothing references
     them. Do not give them new usages. */
  --btn: var(--ink);
  --btn-txt: var(--bg);
  --card: var(--surface);
  --subtle: var(--surface-hi);
  --accent-soft: var(--surface-hi);
  --line-hover: var(--ink);
  --font-display: var(--font-sans);
  --phone: var(--line-input);
  --pattern: .35;
}

.dark {
  color-scheme: dark;
  --bg: #08090a;
  --panel: #0f1011;
  --surface: #191a1b;
  --surface-hi: #28282c;
  --raised: rgba(255, 255, 255, .02);
  --line: rgba(255, 255, 255, .08);
  --line-subtle: rgba(255, 255, 255, .05);
  --line-input: rgba(255, 255, 255, .14);
  --ink: #f7f8f8;
  --ink2: #d0d6e0;
  --muted: #8a8f98;
  --faint: #62666d;
  --accent: var(--ink);
  --ok: #27a644;
  --ok-bg: rgba(39, 166, 68, .12);
  --err: #e5484d;
  --err-bg: rgba(229, 72, 77, .12);
  --nav: rgba(8, 9, 10, .82);
  --mym-line: rgba(255, 255, 255, .12);
  --shadow: none;
}
```

- [ ] **Step 4: Rewrite the base and type rules**

Replace the reset/type portion (`src/styles.css:60-147`) so the stack declares Inter Variable with the OpenType features, drops Outfit, and forbids weight 700:

```css
*, *::before, *::after { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
  -webkit-text-size-adjust: 100%;
}

/* Carried over verbatim from the current stylesheet. Do NOT drop this block:
   Task 12 extends it, and the scroll-behavior override is load-bearing for
   reduced-motion users. */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink2);
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.65;
  font-feature-settings: "cv01", "ss03";
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
}

h1, h2, h3, p, ul { margin: 0; }
ul { padding: 0; list-style: none; }
a { color: inherit; text-decoration: none; }
img, svg { display: block; max-width: 100%; }
button, input, textarea { font: inherit; color: inherit; }
button { cursor: pointer; background: none; border: 0; padding: 0; }

::selection { background: var(--surface-hi); }
:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; border-radius: var(--r-badge); }
::placeholder { color: var(--faint); opacity: 1; }

/* Load-bearing: Contact.jsx renders the copy-email live region with this
   class. Without it the screen-reader announcement becomes visible page text. */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.wrap { width: min(1200px, 100% - 2rem); margin-inline: auto; }
@media (min-width: 640px) { .wrap { width: min(1200px, 100% - 3rem); } }

section { padding-block: clamp(4.5rem, 9vw, 7.5rem); perspective: 1200px; }

.eyebrow {
  font-size: .75rem;
  font-weight: 510;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--muted);
}

h1, h2, h3 {
  color: var(--ink);
  font-weight: 510;
  text-wrap: balance;
}

h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -.02em;
  margin-top: .6rem;
  max-width: 18ch;
}

.lead {
  color: var(--ink2);
  font-size: clamp(1.0625rem, 1.6vw, 1.25rem);
  line-height: 1.7;
  max-width: 65ch;
}
```

The replaced region spans `src/styles.css:60-147`, which also contains the reduced-motion media query and `.sr-only`. Both are reproduced in the block above; after the edit, confirm one occurrence of `.sr-only` and one of `@media (prefers-reduced-motion: reduce)` survive, using:

```bash
grep -c "sr-only" src/styles.css; grep -c "prefers-reduced-motion" src/styles.css
```

Expected after Task 3: `1` and `1`. A `0` means a load-bearing rule was dropped — restore it before continuing.

`perspective` on `section` establishes the depth field for the Task 12 reveals.

- [ ] **Step 5: Run tests, lint and build**

Run: `npm test && npm run lint && npm run build`
Expected: tests PASS, lint clean, build succeeds. The legacy aliases declared in Step 3 keep every existing `var(--btn)`, `var(--card)`, `var(--subtle)`, `var(--accent-soft)`, `var(--line-hover)`, `var(--font-display)`, `var(--phone)` and `var(--pattern)` reference resolving while the components that still use them are restyled in Tasks 4–9. If the token test reports a referenced-but-undefined variable here, an alias is missing — add it to the alias block rather than deleting the reference.

- [ ] **Step 6: Commit**

```bash
git add src/styles.css src/styles.test.js
git commit -m "feat: rewrite design tokens to monochrome luminance system"
```

---

### Task 4: Navbar

**Files:**
- Modify: `src/components/Navbar.jsx:47-172`
- Modify: `src/styles.css` (header/nav block, currently lines 188-346)

**Interfaces:**
- Consumes: token names from Task 3.
- Produces: classes `.bar`, `.logo`, `.seg`, `.cv-link`, `.menu-btn`, `.mobile-nav`, `header.top` restyled. `scrollTo` and all callbacks keep their current signatures.

- [ ] **Step 1: Restyle the header block in `styles.css`**

Replace the `HEADER / NAV` section. Note `--nav` for the frosted bar and `--r-control` (not a pill) for the toggles:

```css
header.top {
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1px solid transparent;
  transition: background .2s, border-color .2s, backdrop-filter .2s;
}
header.top.scrolled {
  background: var(--nav);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-color: var(--line-subtle);
}

.bar { height: 4rem; display: flex; align-items: center; justify-content: space-between; gap: .75rem; }

.logo {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  border-radius: var(--r-badge);
  color: var(--ink);
  font-weight: 590;
  letter-spacing: -.02em;
  transition: opacity .2s;
}
.logo:hover { opacity: .75; }

nav.desktop { display: none; gap: .125rem; }
nav.desktop a {
  position: relative;
  padding: .5rem .75rem;
  font-size: .8125rem;
  font-weight: 510;
  letter-spacing: -.01em;
  color: var(--ink2);
  border-radius: var(--r-badge);
  transition: color .2s;
  background: none;
  border: 0;
  cursor: pointer;
}
nav.desktop a:hover { color: var(--ink); }
nav.desktop a[aria-current] { color: var(--ink); }
nav.desktop a[aria-current]::after {
  content: "";
  position: absolute;
  left: .75rem;
  right: .75rem;
  bottom: .3rem;
  height: 1px;
  background: var(--ink);
}

.ctrls { display: flex; align-items: center; gap: .5rem; }

.seg {
  display: inline-flex;
  padding: 2px;
  border: 1px solid var(--line-subtle);
  border-radius: var(--r-control);
  background: var(--raised);
}
.seg button {
  min-width: 1.75rem;
  height: 1.75rem;
  padding: 0 .5rem;
  border-radius: 4px;
  font-size: .75rem;
  font-weight: 510;
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background .2s, color .2s;
}
.seg button:hover { color: var(--ink); }
.seg button[aria-pressed="true"] {
  background: var(--surface);
  color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--line);
}
.seg svg { width: .875rem; height: .875rem; }

.cv-link {
  display: none;
  align-items: center;
  gap: .4rem;
  height: 2.125rem;
  padding: 0 .75rem;
  border: 1px solid var(--line-input);
  border-radius: var(--r-control);
  background: var(--raised);
  font-size: .8125rem;
  font-weight: 510;
  color: var(--ink);
  transition: border-color .2s, background .2s;
}
.cv-link:hover { border-color: var(--ink); background: var(--surface); }

.menu-btn {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--r-control);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ink);
  transition: background .2s;
}
.menu-btn:hover { background: var(--surface); }

.mobile-nav {
  position: fixed;
  inset: 4rem 0 0 0;
  z-index: 39;
  background: var(--bg);
  padding: 1.5rem 1rem;
  overflow-y: auto;
}
.mobile-nav a {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 56px;
  background: none;
  border: 0;
  border-bottom: 1px solid var(--line-subtle);
  color: var(--ink);
  font-weight: 510;
  font-size: 1.5rem;
  letter-spacing: -.02em;
  text-align: left;
  cursor: pointer;
}
.mobile-nav a[aria-current] { color: var(--ink); font-weight: 590; }

@media (min-width: 640px) { .cv-link { display: inline-flex; } }
@media (min-width: 900px) {
  nav.desktop { display: flex; }
  .menu-btn { display: none !important; }
  .mobile-nav { display: none !important; }
}
```

- [ ] **Step 2: Drop the inline style on the logo button**

In `src/components/Navbar.jsx:51-57` remove `style={{ background: 'none', border: 0 }}` — the class reset now handles it. The button keeps `className="logo"`, its `aria-label`, and its `onClick`.

- [ ] **Step 3: Update the logo to inherit currentColor**

`MymLogo` hardcodes `#F5C300` for the `Y`, which is a chromatic colour and now the only one on the site. Replace that fill with `currentColor` in `src/components/MymLogo.jsx` so the wordmark is achromatic like the rest of the palette. Keep the two `M`s on `currentColor` (unchanged).

- [ ] **Step 4: Verify**

Run: `npm run lint && npm run build`
Expected: clean, builds. Manually confirm: header goes transparent then frosted on scroll; active nav link underlines; both segmented toggles still switch language and theme; the mobile drawer still covers the full viewport.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.jsx src/components/MymLogo.jsx src/styles.css
git commit -m "feat: restyle navbar to monochrome control surfaces"
```

---

### Task 5: Hero

**Files:**
- Modify: `src/components/Hero.jsx` (remove mockup + marquee, restructure hero grid)
- Modify: `src/styles.css` (replace `BUTTONS`, `HERO`, `MARQUEE` blocks)

**Interfaces:**
- Consumes: token names from Task 3.
- Produces: `.hero-grid`, `.badge`, `.role`, `.cta`, `.stats`, `.btn`, `.btn-primary`, `.btn-ghost`. `.phone*`, `.ph-*`, `.caption`, `.marquee`, `.track` are deleted and must not be referenced anywhere after this task.

- [ ] **Step 1: Rewrite the Hero JSX**

In `src/components/Hero.jsx`, remove the `{/* Right: phone mockup */}` block, the `{/* Scrolling marquee */}` block and its wrapping fragment, and restructure so the section is a direct child of the returned tree. The badge dot animation is kept — it is the one motion moment carrying meaning.

```jsx
import { memo } from "react";

const TECH = ['React', 'Laravel', 'Kotlin', 'MySQL', 'JavaScript', 'Tailwind CSS', 'REST APIs', 'Git', 'n8n', 'Figma'];

function Hero({ t }) {
  return (
    <section className="hero" id="home" data-spy="">
      <div className="wrap hero-grid">
        <div>
          <p className="badge">
            <span className="dot" aria-hidden="true" />
            <span>{t('status')}</span>
          </p>
          <h1>
            Mohammed Yassir <br />
            Mesbahi<span className="dot-end">.</span>
          </h1>
          <p className="role">
            <span>{t('role')}</span> · <b>{t('founder')}</b>
          </p>
          <p className="pitch lead">{t('pitch')}</p>
          <div className="cta">
            <a className="btn btn-primary" href="#projects">{t('btn_projects')}</a>
            <a className="btn btn-ghost" href="/Mohammed-Yassir-Mesbahi-CV.pdf" download>
              {t('btn_cv')}
            </a>
          </div>
        </div>

        <ul className="stats">
          <li><strong>5</strong><span>{t('stat1')}</span></li>
          <li><strong>3</strong><span>{t('stat2')}</span></li>
          <li><strong>2024–26</strong><span>{t('stat3')}</span></li>
        </ul>
      </div>
    </section>
  );
}

export default memo(Hero);
```

`TECH` becomes unused once the marquee is gone — delete the constant too. Confirm with lint.

- [ ] **Step 2: Replace the button styles**

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  min-height: 44px;
  padding: .625rem 1.25rem;
  border-radius: var(--r-control);
  font-size: .875rem;
  font-weight: 510;
  border: 1px solid transparent;
  transition: transform .2s var(--ease-out), opacity .2s, border-color .2s, background .2s;
}
.btn-primary { background: var(--ink); color: var(--bg); }
.btn-ghost { background: var(--raised); border-color: var(--line-input); color: var(--ink); }
.btn:hover { transform: translateY(-2px); }
.btn-primary:hover { opacity: .88; }
.btn-ghost:hover { border-color: var(--ink); background: var(--surface); }
.btn:active { transform: scale(.98); }
.btn:disabled { opacity: .45; cursor: not-allowed; transform: none; }
```

- [ ] **Step 3: Replace the hero styles**

```css
.hero {
  position: relative;
  padding-top: clamp(3rem, 7vw, 5.5rem);
  padding-bottom: clamp(3rem, 6vw, 5rem);
  overflow: clip;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(120% 90% at 78% 0%, var(--surface) 0%, transparent 62%);
}

.hero-grid { display: grid; gap: 3rem; align-items: end; }

.badge {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .3125rem .5rem;
  border: 1px solid var(--line);
  border-radius: var(--r-badge);
  background: var(--raised);
  color: var(--ink2);
  font-size: .6875rem;
  font-weight: 510;
  letter-spacing: .08em;
}
.badge .dot {
  position: relative;
  width: .375rem;
  height: .375rem;
  border-radius: var(--r-full);
  background: var(--ok);
}
.badge .dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--r-full);
  background: var(--ok);
  animation: ping 2.4s ease-out infinite;
}

@keyframes ping {
  0% { transform: scale(1); opacity: .6; }
  100% { transform: scale(2.6); opacity: 0; }
}

h1 {
  font-weight: 510;
  font-size: clamp(2.75rem, 9vw, 6rem);
  line-height: .96;
  letter-spacing: -.035em;
  margin-top: 1.75rem;
  color: var(--ink);
}
h1 .dot-end { color: var(--muted); }

.role {
  margin-top: 1.25rem;
  font-size: clamp(1.125rem, 2.4vw, 1.5rem);
  font-weight: 400;
  letter-spacing: -.01em;
  color: var(--muted);
}
.role b { color: var(--ink); font-weight: 510; }

.pitch { margin-top: 1.25rem; }
.cta { display: flex; flex-wrap: wrap; gap: .625rem; margin-top: 2rem; }

.stats {
  display: grid;
  gap: 1.25rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}
.stats strong {
  display: block;
  font-size: clamp(1.5rem, 3.4vw, 2.125rem);
  font-weight: 510;
  line-height: 1;
  letter-spacing: -.02em;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.stats span { display: block; margin-top: .375rem; font-size: .8125rem; color: var(--muted); }

@media (min-width: 960px) {
  .hero-grid { grid-template-columns: 1.25fr .75fr; }
}
```

- [ ] **Step 4: Delete the dead hero CSS**

Remove every rule for `.phone`, `.phone-wrap`, `.phone::before`, `.ph-head`, `.ph-card`, `.ph-row`, `.ph-tabs`, `.caption`, `@keyframes float`, `.marquee`, `.track`, and `@keyframes slide`.

Do **not** remove the `--phone` and `--pattern` aliases from the token block here, even though this task removes their last references. Task 13 Step 7 removes all nine legacy aliases in one place; splitting that removal across two tasks invites an orphaned `var()`. Leave them.

- [ ] **Step 5: Verify**

Run: `npm run lint && npm run build && npm test`
Expected: clean, builds, tests pass. `TECH` unused must be flagged by lint — if it is not, delete it manually. Manually confirm: no phone mockup or marquee; stats render as a right-hand column at ≥960px with tabular figures; badge dot still pulses.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.jsx src/styles.css
git commit -m "feat: rebuild hero without mockup and marquee"
```

---

### Task 6: About

**Files:**
- Modify: `src/components/About.jsx` (add `card-spotlight` class to the three cards)
- Modify: `src/styles.css` (replace `ABOUT` block)

**Interfaces:**
- Consumes: token names from Task 3; `.card-spotlight` hooks the Task 12 spotlight wiring.
- Produces: `.about-intro`, `.facts`, `.about-grid`, `.card`, `.mym`, `.full-row`, `.ticks`, `.timeline`.

- [ ] **Step 1: Add the spotlight hook class**

In `src/components/About.jsx`, add `card-spotlight` alongside `card` on all three `<article>` elements (the MYM card, the Journey card, the Mindset card). Do not add it to the `.about-intro` wrapper — it is a text block, not a card.

- [ ] **Step 2: Replace the About styles**

```css
.about-intro { display: grid; gap: 2rem; }
@media (min-width: 900px) { .about-intro { grid-template-columns: 1.1fr .9fr; } }

.facts { display: grid; gap: 1rem; margin-top: 1.75rem; margin-bottom: 0; }
.facts div { display: flex; justify-content: space-between; gap: 1rem; padding-bottom: .875rem; border-bottom: 1px solid var(--line-subtle); font-size: .9375rem; }
.facts dt { color: var(--muted); }
.facts dd { margin: 0; font-weight: 510; color: var(--ink); font-variant-numeric: tabular-nums; }
@media (min-width: 700px) {
  .facts { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .facts div { flex-direction: column; gap: .25rem; padding-bottom: 0; border-bottom: 0; }
  .facts dd { text-align: left; }
}

.about-grid { display: grid; gap: 1rem; margin-top: 3rem; }
@media (min-width: 900px) { .about-grid { grid-template-columns: 1fr 1fr; } }

.card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-card);
  padding: clamp(1.25rem, 3vw, 1.75rem);
  transition: border-color .2s, background .2s;
}
.card h3 { font-size: 1.25rem; font-weight: 510; letter-spacing: -.015em; color: var(--ink); }

.mym {
  background: var(--panel);
  border-color: var(--line-subtle);
  box-shadow: inset 0 0 12px rgba(0, 0, 0, .12);
  overflow: hidden;
}
.dark .mym { box-shadow: inset 0 0 12px rgba(0, 0, 0, .35); }
.mym .tag {
  display: inline-block;
  padding: .1875rem .4375rem;
  border: 1px solid var(--line-input);
  border-radius: var(--r-badge);
  font-size: .6875rem;
  font-weight: 510;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--muted);
}
.mym h3 { font-size: clamp(1.75rem, 3.6vw, 2.5rem); letter-spacing: -.03em; margin-top: 1rem; }
.mym p { margin-top: .75rem; color: var(--ink2); max-width: 30rem; }
.mym .status { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--mym-line); font-weight: 510; font-size: .875rem; color: var(--ink); }

.full-row { grid-column: 1 / -1; }

.ticks { margin-top: 1rem; display: grid; gap: .625rem; font-size: .9375rem; color: var(--ink2); }
.ticks li { display: flex; gap: .625rem; align-items: baseline; list-style: none; }
.ticks li::before {
  content: "";
  width: .375rem;
  height: .375rem;
  border-radius: var(--r-badge);
  background: var(--ink);
  flex: none;
  transform: translateY(-.125rem);
}

.timeline { margin-top: 1.5rem; display: grid; gap: 1.375rem; border-left: 1px solid var(--line-input); padding-left: 1.25rem; }
.timeline li { position: relative; list-style: none; }
.timeline li::before {
  content: "";
  position: absolute;
  left: calc(-1.25rem - 4px);
  top: .4375rem;
  width: 7px;
  height: 7px;
  border-radius: var(--r-full);
  background: var(--ink);
}
.timeline strong { display: block; font-size: .9375rem; font-weight: 510; color: var(--ink); }
.timeline span { font-size: .875rem; color: var(--muted); }
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run build`
Expected: clean, builds. Manually confirm: facts list becomes 3-across at ≥700px; MYM card is a panel with an inset shadow rather than an inverted block; timeline dots align with the hairline rule.

- [ ] **Step 4: Commit**

```bash
git add src/components/About.jsx src/styles.css
git commit -m "feat: restyle about section with panel surfaces"
```

---

### Task 7: Stack

**Files:**
- Modify: `src/components/Stack.jsx` (add `card-spotlight` to tiles)
- Modify: `src/styles.css` (replace `STACK` block)

**Interfaces:**
- Consumes: token names from Task 3.
- Produces: `.stack-group`, `.core`, `.tile`, `.chips`. The asymmetric grid is the fix for the equal-thirds pattern.

- [ ] **Step 1: Add the spotlight class to the tiles**

In `src/components/Stack.jsx`, the tiles are produced by `core.map(...)`; change the `<li key={name} className="tile">` to `className="tile card-spotlight"`.

- [ ] **Step 2: Replace the Stack styles**

The asymmetric layout: `grid-auto-rows` sets a base row height, tiles 1 and 4 span two rows. Use `:nth-child` so no JSX change is needed beyond the class above.

```css
.stack-group { margin-top: 2.5rem; }
.stack-group h3 { font-size: .75rem; font-weight: 510; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }

.core {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(7rem, auto);
  gap: .625rem;
  margin-top: 1rem;
}
@media (min-width: 700px) { .core { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1000px) { .core { grid-template-columns: repeat(6, 1fr); } }

@media (min-width: 700px) {
  .core .tile:nth-child(1),
  .core .tile:nth-child(4) { grid-row: span 2; }
  .core .tile:nth-child(1) { grid-column: span 2; }
}

.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: .25rem;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-card);
  overflow: hidden;
  transition: border-color .2s, background .2s, transform .2s var(--ease-out);
}
.tile strong { display: block; font-size: 1.125rem; font-weight: 510; letter-spacing: -.015em; color: var(--ink); }
.tile span { display: block; font-size: .8125rem; color: var(--muted); }
@media (hover: hover) {
  .tile:hover { border-color: var(--ink); background: var(--surface-hi); transform: translateY(-2px); }
}

.chips { display: flex; flex-wrap: wrap; gap: .375rem; margin-top: 1rem; }
.chips li {
  padding: .3125rem .5rem;
  border: 1px solid var(--line);
  border-radius: var(--r-badge);
  background: var(--raised);
  font-size: .8125rem;
  font-weight: 510;
  color: var(--ink2);
  list-style: none;
}
.chips.quiet li { color: var(--muted); border-color: var(--line-subtle); }
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run build`
Expected: clean, builds. Manually confirm: the 6-tile grid is visibly irregular at ≥700px (tile 1 wide, tiles 1 and 4 tall); chips are 2px-radius rectangles rather than pills.

- [ ] **Step 4: Commit**

```bash
git add src/components/Stack.jsx src/styles.css
git commit -m "feat: break stack grid into asymmetric layout"
```

---

### Task 8: Contact surfaces

**Files:**
- Modify: `src/components/Contact.jsx` (disabled-state note on the submit)
- Modify: `index.html` (single Inter variable font link, og-image, theme-color)
- Create: `public/og-image.png`
- Modify: `src/styles.css` (replace `CONTACT` and `FOOTER` blocks)

**Interfaces:**
- Consumes: token names from Task 3; `sharp` from devDependencies.
- Produces: `.contact-grid`, `.avail`, `.mail`, `.mini`, `.social`, `.contact-form`, `.field`, `.field-err`, `.form-alert`, `.hp`, footer rules, and a new `.form-note` for the unconfigured notice.

- [ ] **Step 1: Generate the OG image**

`sharp` is already a devDependency. Generate a 1200×630 PNG with the dark palette — `#08090a` ground, `#f7f8f8` name, `#8a8f98` role line — and write it to `public/og-image.png`. A single `node --input-type=module` script invoking `sharp` with an inline SVG buffer is sufficient; no new dependency and no binary asset checked in from elsewhere.

- [ ] **Step 2: Update `index.html`**

Replace the two-family Google Fonts `<link>` (Inter + Outfit) with a single Inter variable request that includes the 400/510/590 weights:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,510;14..32,590&display=swap" />
```

Update both `theme-color` meta values to the new canvas colours — `#08090a` for dark and `#ffffff` for light.

- [ ] **Step 3: Add the honest disabled state**

In `src/components/Contact.jsx`, the submit button currently renders live and fails silently on submit. Give it the disabled state and an explanatory note. `EMAILJS` stays as-is so the failure path remains available once keys are supplied.

Change the submit button to:

```jsx
<button className="btn btn-primary" id="submit-btn" type="submit" disabled>
  <span id="submit-label">{t('send')}</span>
</button>
<p className="form-note">{t('form_unconfigured')}</p>
```

Add `form_unconfigured` to **both** dictionaries, next to `send`:

```js
form_unconfigured: 'Email delivery is not configured yet. Use the address on the left.',        // en
form_unconfigured: "L'envoi d'e-mails n'est pas encore configuré. Utilisez l'adresse à gauche.", // fr
```

- [ ] **Step 4: Replace the contact styles**

```css
.contact-grid { display: grid; gap: 1rem; margin-top: 2.5rem; }
@media (min-width: 960px) { .contact-grid { grid-template-columns: .85fr 1.15fr; align-items: start; } }

aside.card { background: var(--panel); border-color: var(--line-subtle); border-radius: var(--r-panel); }

.avail { display: inline-block; margin-top: .5rem; font-size: .875rem; font-weight: 510; color: var(--ink); }

.mail { margin-top: 1.5rem; padding: .875rem; border: 1px solid var(--line); border-radius: var(--r-control); background: var(--surface); }
.mail small { display: block; font-size: .75rem; color: var(--muted); font-weight: 510; }
.mail .mail-row { display: flex; align-items: center; justify-content: space-between; gap: .75rem; margin-top: .375rem; }
.mail code { font-family: var(--font-mono); font-size: .8125rem; font-weight: 510; color: var(--ink); overflow-wrap: anywhere; }

.mini {
  min-height: 32px;
  padding: .25rem .625rem;
  border: 1px solid var(--line-input);
  border-radius: var(--r-control);
  background: var(--raised);
  font-size: .75rem;
  font-weight: 510;
  color: var(--ink);
  flex: none;
  transition: border-color .2s, background .2s;
}
.mini:hover { border-color: var(--ink); background: var(--surface-hi); }

.social { display: flex; gap: .5rem; flex-wrap: wrap; margin-top: 1.25rem; }
.social a {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: .5rem .875rem;
  border: 1px solid var(--line-input);
  border-radius: var(--r-control);
  background: var(--raised);
  font-size: .8125rem;
  font-weight: 510;
  transition: border-color .2s, background .2s;
}
.social a:hover { border-color: var(--ink); background: var(--surface-hi); }

.contact-note { margin-top: 1.25rem; font-size: .8125rem; color: var(--muted); }

.contact-form { display: grid; gap: 1rem; }
.two { display: grid; gap: 1rem; }
@media (min-width: 560px) { .two { grid-template-columns: 1fr 1fr; } }

.field label { display: block; font-size: .8125rem; font-weight: 510; color: var(--ink2); margin-bottom: .375rem; }
.field input, .field textarea {
  width: 100%;
  padding: .6875rem .875rem;
  border: 1px solid var(--line-input);
  border-radius: var(--r-control);
  background: var(--surface-hi);
  font-size: .9375rem;
  transition: border-color .2s, box-shadow .2s;
}
.field textarea { resize: vertical; min-height: 8.5rem; }
.field input:focus, .field textarea:focus {
  outline: none;
  border-color: var(--ink);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ink) 20%, transparent);
}
.field [aria-invalid="true"] { border-color: var(--err); }

.field-err { display: none; align-items: center; gap: .375rem; margin-top: .375rem; font-size: .75rem; font-weight: 510; color: var(--err); }
.field-err::before { content: "\2715"; }
.field [aria-invalid="true"] ~ .field-err { display: flex; }

.form-alert { display: none; align-items: flex-start; gap: .5rem; padding: .75rem .875rem; border-radius: var(--r-control); font-size: .875rem; border: 1px solid currentColor; }
.form-alert.show { display: flex; }
.form-alert.ok { background: var(--ok-bg); color: var(--ok); }
.form-alert.bad { background: var(--err-bg); color: var(--err); }
.form-alert svg { width: 1rem; height: 1rem; flex: none; margin-top: .1875rem; }

.form-note { font-size: .75rem; color: var(--muted); }

.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }

footer { border-top: 1px solid var(--line-subtle); padding-block: 2rem; font-size: .8125rem; color: var(--muted); }
footer .wrap { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; }
footer a:hover { color: var(--ink); }
```

- [ ] **Step 5: Verify**

Run: `npm run lint && npm run build && npm test`
Expected: clean, builds, tests pass — the new `form_unconfigured` key exists in both dictionaries, which the Task 1 i18n test enforces. Manually confirm: submit is visibly disabled with the note beneath it; the copy-email button still works; validation error messages still appear on bad input.

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.jsx src/styles.css index.html public/og-image.png
git commit -m "feat: restyle contact, disable unconfigured form, add og image"
```

---

### Task 9: Projects

**Files:**
- Modify: `src/components/Projects.jsx` (add `card-spotlight` to the article)
- Modify: `src/styles.css` (replace `PROJECTS` block)

**Interfaces:**
- Consumes: token names from Task 3; correct image paths from Task 2.
- Produces: `.proj-head`, `.filters`, `.count`, `.projects`, `.project`, `.visual`, `.num`, `.pbody`, `.ptop`, `.cat`, `.prs`, `.proj-stack`, `.plinks`, `.empty`.

- [ ] **Step 1: Add the spotlight class**

In `src/components/Projects.jsx`, change the article's className from `` `project reveal${idx === 0 ? ' featured' : ''}` `` to `` `project reveal card-spotlight${idx === 0 ? ' featured' : ''}` ``.

- [ ] **Step 2: Replace the Projects styles**

```css
.proj-head { display: grid; gap: 1.5rem; }
@media (min-width: 900px) { .proj-head { grid-template-columns: 1fr auto; align-items: end; } }

.filters { display: flex; flex-wrap: wrap; gap: .375rem; }
.filters button {
  min-height: 40px;
  padding: .5rem .875rem;
  border: 1px solid var(--line-input);
  border-radius: var(--r-control);
  background: var(--raised);
  font-size: .8125rem;
  font-weight: 510;
  color: var(--ink2);
  transition: background .2s, color .2s, border-color .2s;
}
.filters button:hover { color: var(--ink); border-color: var(--ink); }
.filters button[aria-pressed="true"] { background: var(--ink); border-color: var(--ink); color: var(--bg); }
.count { font-size: .8125rem; color: var(--muted); margin-top: .625rem; }

.projects { display: grid; gap: 1rem; margin-top: 2.5rem; }
.project {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-card);
  overflow: hidden;
  transition: border-color .2s, transform .25s var(--ease-out);
}

.visual {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--surface-hi);
  border-bottom: 1px solid var(--line-subtle);
}
.visual img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .6s var(--ease-out); }
.visual .num {
  position: absolute;
  left: 1rem;
  bottom: .5rem;
  font-weight: 510;
  font-size: clamp(2.5rem, 7vw, 4rem);
  line-height: 1;
  letter-spacing: -.04em;
  color: var(--faint);
  font-variant-numeric: tabular-nums;
}
.visual img + .num { color: #f7f8f8; text-shadow: 0 2px 16px rgba(0, 0, 0, .55); }

.pbody { padding: 1.25rem; display: flex; flex-direction: column; gap: .875rem; flex: 1; }
.ptop { display: flex; justify-content: space-between; align-items: start; gap: 1rem; }
.project h3 { font-size: clamp(1.25rem, 2.2vw, 1.5rem); font-weight: 510; letter-spacing: -.02em; line-height: 1.2; color: var(--ink); }
.cat {
  flex: none;
  padding: .1875rem .4375rem;
  border: 1px solid var(--line);
  border-radius: var(--r-badge);
  background: var(--raised);
  color: var(--muted);
  font-size: .6875rem;
  font-weight: 510;
  letter-spacing: .04em;
}

.prs { display: grid; gap: .5rem; font-size: .875rem; color: var(--muted); }
.prs b { color: var(--ink2); font-weight: 510; }

.proj-stack { display: flex; flex-wrap: wrap; gap: .375rem; margin-top: auto; }
.proj-stack li {
  padding: .125rem .4375rem;
  border: 1px solid var(--line);
  border-radius: var(--r-badge);
  background: var(--raised);
  font-size: .6875rem;
  font-weight: 510;
  color: var(--muted);
  list-style: none;
}

.plinks { display: flex; gap: .5rem; flex-wrap: wrap; }
.plinks a {
  display: inline-flex;
  align-items: center;
  gap: .375rem;
  min-height: 40px;
  padding: .5rem .875rem;
  border: 1px solid var(--line-input);
  border-radius: var(--r-control);
  background: var(--raised);
  font-size: .8125rem;
  font-weight: 510;
  color: var(--ink);
  transition: border-color .2s, background .2s;
}
.plinks a:hover { border-color: var(--ink); background: var(--surface-hi); }

.empty { margin-top: 2.5rem; padding: 2.5rem; text-align: center; border: 1px dashed var(--line-input); border-radius: var(--r-card); color: var(--muted); }

@media (min-width: 700px) {
  .projects { grid-template-columns: 1fr 1fr; }
  .project.featured { grid-column: 1 / -1; flex-direction: row; }
  .project.featured .visual { flex: 1.1; aspect-ratio: auto; min-height: 20rem; border-bottom: 0; border-right: 1px solid var(--line-subtle); }
  .project.featured .pbody { flex: 1; padding: 1.75rem; justify-content: center; }
}

@media (hover: hover) {
  .project:hover { border-color: var(--ink); transform: translateY(-3px); }
  .project:hover .visual img { transform: scale(1.04); }
}
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run build && npm test`
Expected: clean, builds, tests pass. **Manually confirm all five project screenshots render** — this is the defect from Task 2 and the visual proof it is fixed. Also confirm filters still switch and the count line updates.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.jsx src/styles.css
git commit -m "feat: restyle project cards to surface surfaces"
```

---

### Task 10: Delete dead components and unused dependencies

**Files:**
- Delete: `src/components/BentoGrid.jsx`, `Skills.jsx`, `Technologies.jsx`, `TechTools.jsx`, `Tools.jsx`, `SectionDivider.jsx`, `SectionTitle.jsx`, `src/components/ui/Button.jsx`, `ui/GlassCard.jsx`, `ui/SectionShell.jsx`
- Modify: `package.json` (remove `lucide-react`, `@emailjs/browser`, `@vercel/speed-insights`)

**Interfaces:**
- Consumes: the fully restyled codebase from Tasks 4–9.
- Produces: a `src/components` tree containing only live components; `src/components/ui/` removed entirely.

- [ ] **Step 1: Confirm nothing live imports these before deleting**

Run each of these and expect no matches outside the files being deleted:

```bash
grep -rn "BentoGrid\|TechTools\|SectionDivider\|SectionTitle\|Technologies\|GlassCard\|SectionShell\|ui/Button" src
```

`Skills.jsx` and `Tools.jsx` will match only their own definitions. If anything live imports one of them, stop and reassess — do not delete.

- [ ] **Step 2: Delete the files**

```bash
git rm src/components/BentoGrid.jsx src/components/Skills.jsx src/components/Technologies.jsx src/components/TechTools.jsx src/components/Tools.jsx src/components/SectionDivider.jsx src/components/SectionTitle.jsx src/components/ui/Button.jsx src/components/ui/GlassCard.jsx src/components/ui/SectionShell.jsx
```

`src/components/ui/` becomes empty and git removes it with the last file.

- [ ] **Step 3: Remove the unused dependencies**

```bash
npm uninstall lucide-react @emailjs/browser @vercel/speed-insights
```

These are imported by no surviving file: `lucide-react` was imported only by `Skills.jsx` and `Technologies.jsx`; the other two were imported by nothing at all.

- [ ] **Step 4: Verify**

Run: `npm run lint && npm run build && npm test && npm run security:audit`
Expected: all four pass. `security:audit` passing confirms removing `@emailjs/browser` and `@vercel/speed-insights` does not surface a production-dependency advisory.

- [ ] **Step 5: Commit**

```bash
git commit -m "refactor: remove dead components and unused dependencies"
```

---

### Task 11: Remove Tailwind

**Files:**
- Modify: `src/styles.css:1` (drop `@import "tailwindcss";`)
- Modify: `vite.config.js` (drop the `tailwindcss` plugin import and its use)
- Modify: `package.json` (remove `tailwindcss`, `@tailwindcss/vite`)

**Interfaces:**
- Consumes: Tasks 4–10. Safe only once no surviving component uses a utility class.
- Produces: a build whose CSS bundle contains no Tailwind output.

- [ ] **Step 1: Verify no surviving component uses a Tailwind utility**

```bash
grep -rn "className=\"[^\"]*\(flex\|grid-cols\|text-xs\|text-sm\|bg-\[\|font-display\|rounded-2xl\|md:\|sm:\|lg:\)" src
```

Expected: no matches. Any hit means a live component still depends on Tailwind — restyle that element against the token system first and re-run before continuing.

- [ ] **Step 2: Remove the Tailwind pieces**

Delete line 1 of `src/styles.css`:

```css
@import "tailwindcss";
```

In `vite.config.js`, remove `import tailwindcss from "@tailwindcss/vite";` and change `plugins: [react(), tailwindcss()]` to `plugins: [react()]`.

```bash
npm uninstall tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Record the bundle size before and after**

Run `npm run build` and compare the CSS output against the 67.45 kB baseline recorded at the start of this work. Expect a large reduction — roughly 10–15 kB, since the vast majority of the baseline was unused Tailwind. A near-zero reduction means the import was not actually removed.

- [ ] **Step 4: Verify**

Run: `npm run lint && npm run build && npm test && npm run security:headers`
Expected: all pass. Also remove the now-dead `framer-motion` entry from the `manualChunks` function in `vite.config.js` — that dependency was never installed, so the branch is unreachable.

- [ ] **Step 5: Commit**

```bash
git add src/styles.css vite.config.js package.json package-lock.json
git commit -m "refactor: drop unused tailwind"
```

---

### Task 12: Capability-gated 3D scroll reveals

**Files:**
- Modify: `src/App.jsx` (consume `useAnimationBudget`, set `data-motion`, call `useSpotlight`)
- Modify: `src/styles.css` (replace the `REVEAL ANIMATION` block; extend the reduced-motion block)

**Interfaces:**
- Consumes: `--dur-reveal` and `--ease-out` from Task 3; `.card-spotlight` classes added in Tasks 6, 7, 9.
- Produces: `data-motion="3d" | "flat"` on `<html>`; `useSpotlight()` active; the 3D settle on `.reveal.in`.

- [ ] **Step 1: Wire the motion gate in `App.jsx`**

Add the import and the hook call. `useAnimationBudget` already returns `{ prefersReducedMotion, shouldLimitMotion }` from `src/hooks/useAnimationBudget.js:40-45`; nothing currently reads it.

```jsx
import useAnimationBudget from "./hooks/useAnimationBudget";
import useSpotlight from "./hooks/useSpotlight";
```

Inside `App`, after the existing `applyTheme` effect, add:

```jsx
const { shouldLimitMotion } = useAnimationBudget();
useSpotlight();

useEffect(() => {
  document.documentElement.dataset.motion = shouldLimitMotion ? "flat" : "3d";
}, [shouldLimitMotion]);
```

`useSpotlight` reads `.card-spotlight` at mount, so it must be called unconditionally at the top level of `App`, never inside a conditional.

- [ ] **Step 2: Replace the reveal styles**

```css
.reveal { opacity: 0; }
.reveal.in {
  animation: reveal-in var(--dur-reveal) var(--ease-out) backwards;
  opacity: 1;
}

@keyframes reveal-in {
  from { opacity: 0; transform: translate3d(0, 28px, -80px) rotateX(6deg); }
  to   { opacity: 1; transform: translate3d(0, 0, 0) rotateX(0deg); }
}

/* Flat fallback: touch, low-power, and anything that opts out of 3D. */
[data-motion="flat"] .reveal.in {
  animation-name: reveal-in-flat;
}
@keyframes reveal-in-flat {
  from { opacity: 0; transform: translate3d(0, 18px, 0); }
  to   { opacity: 1; transform: none; }
}

/* Stagger siblings, capped at three steps so nothing waits too long.
   Selectors use the real container classes from the section components:
   .core (Stack tiles), .about-grid (About cards), .projects (project cards). */
[data-motion="3d"] .stack-group:nth-of-type(3),
[data-motion="3d"] .core .tile:nth-child(2),
[data-motion="3d"] .about-grid > .reveal:nth-child(2),
[data-motion="3d"] .projects .project:nth-child(2) { animation-delay: 70ms; }

[data-motion="3d"] .stack-group:nth-of-type(4),
[data-motion="3d"] .core .tile:nth-child(3),
[data-motion="3d"] .about-grid > .reveal:nth-child(3),
[data-motion="3d"] .projects .project:nth-child(3) { animation-delay: 140ms; }
```

Each selector must match at least one element in the rendered page. A selector matching nothing is a silent no-op, so verify in DevTools before committing:

- `.stack-group:nth-of-type(3)` and `:nth-of-type(4)` - in `Stack.jsx` the three `.stack-group` divs are the 2nd, 3rd and 4th `div` children of `.wrap` (the 1st is the eyebrow/`h2` block), so `(3)` and `(4)` are the familiar and workflow groups. Do not use `(2)`: that is the core-tile group, whose tiles are already staggered individually, so delaying the whole group as well would double its delay.
- `.core .tile:nth-child(2)` / `(3)` - the second and third stack tiles.
- `.about-grid > .reveal:nth-child(2)` / `(3)` - the Journey and Mindset cards; the MYM card is `:nth-child(1)` and stays undelayed.
- `.projects .project:nth-child(2)` / `(3)` - the second and third project cards.

If a section's markup does not match, correct the selector rather than deleting it - a stagger that never fires is exactly the kind of thing that reads as "the animations feel off" with no error to trace.

- [ ] **Step 3: Extend the reduced-motion block**

The reduced-motion block written in Task 3 sets `animation: none !important`, which would leave `.reveal` at `opacity: 0` forever, because the reveal is driven by a JS-added `.in` class rather than only by CSS. Extend that block with an explicit forcing rule so reduced-motion users see content immediately:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .reveal { opacity: 1 !important; transform: none !important; }
}
```

- [ ] **Step 4: Add the spotlight glow**

`useSpotlight` (`src/hooks/useSpotlight.js:26-29`) writes `transform: translate3d(x, y, 0)` onto the glow, where `x`/`y` are the pointer position **relative to the card's top-left**. So the glow must be a small fixed-size disc anchored at the card's origin, not a full-size overlay — otherwise the cursor offset translates the whole overlay out of view. The negative margins centre the disc on the transform origin so it lands under the pointer.

Add the styles:

```css
.spotlight-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 260px;
  height: 260px;
  margin: -130px 0 0 -130px;
  border-radius: var(--r-full);
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--ink) 8%, transparent),
    transparent 70%
  );
  transition: opacity .25s;
}
.card-spotlight { overflow: hidden; }
.card-spotlight:hover .spotlight-glow { opacity: 1; }
```

`.card` is already `position: relative` from Task 6; `.tile` and `.project` need it too, since the disc is absolutely positioned against them. Add `position: relative` to `.tile` in Task 7 and confirm `.project` has it.

Add `<span className="spotlight-glow" aria-hidden="true" />` as the **first child** of each `.card-spotlight` element — the three `.card`s in About, the six `.tile`s in Stack, and the five `.project` articles. Do not add it to the Hero or the availability badge.

All three containers already carry `position: relative` and `overflow: hidden` from Tasks 6, 7 and 9 — do not re-add them here. If any is missing, the disc will position against the wrong ancestor and appear in the wrong place; fix it in that section's rule rather than working around it here.

- [ ] **Step 5: Verify, including the fixed-position regression**

Run: `npm run lint && npm run build && npm test`
Expected: clean, builds, tests pass.

Then confirm by hand, because none of these are covered by an automated test:

- At 1440px in dark theme, scrolling down: sections settle into place with a visible 3D tilt, staggered in groups of up to three.
- Toggle the OS to reduced motion and reload: **all content is visible immediately**, no block is stuck at `opacity: 0`.
- Open the mobile drawer at 390px: it still covers the full viewport. This is the transformed-ancestor regression — if any `.reveal` gained a transform above the fixed drawer, the drawer will be clipped to the wrong containing block.
- Keyboard-tab to the skip link: it appears at the top-left, not offset by a transformed ancestor.
- DevTools, set `html[data-motion]` to `flat`: reveals collapse to the plain fade.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx src/styles.css src/components/About.jsx src/components/Stack.jsx src/components/Projects.jsx
git commit -m "feat: add capability-gated 3D scroll reveals and card spotlight"
```

---

### Task 13: Full verification pass

**Files:** none modified. This task exists because the spec's verification list is wider than any single task's gate.

**Interfaces:**
- Consumes: every prior task.
- Produces: a verified branch. If this task changes a file, that file's change belongs to the task that introduced the defect.

- [ ] **Step 1: Run the automated gate**

```bash
npm test && npm run lint && npm run build && npm run security:audit && npm run security:headers
```

Expected: all pass.

- [ ] **Step 2: Run the responsive pass**

At 390px, 768px, and 1440px, in both light and dark:

- No horizontal scrollbar at any width.
- Headings do not clip, overlap, or orphan a single word on the last line.
- Long content — the email address, the `2024–26` stat, the Turkish-free French strings — does not overflow its container.
- The Stack asymmetric grid does not produce an awkward hole at any of the three widths.

- [ ] **Step 3: Run the state pass**

Every interactive element — nav links, both segmented toggles, CV link, hamburger, both hero buttons, every filter, every project link, every input, textarea, the copy button, the GitHub link, the disabled submit, and the back-to-top link — must have all four of: hover, `:focus-visible`, active, and disabled where applicable. Confirm the disabled submit cannot be activated by keyboard.

- [ ] **Step 4: Run the behaviour pass**

- Language toggle translates every visible string, including `lbl_filter` on the filter group's accessible name and `form_unconfigured` on the contact note.
- Theme toggle persists across reload with no flash of the wrong theme.
- Scroll-spy highlights the correct nav item through the whole page.
- Contact validation still rejects short names, malformed emails, empty subjects and short messages, and still clears the error on input.
- Copy-to-clipboard still works and still announces via the live region.

- [ ] **Step 6: Confirm the deleted surface is really gone**

```bash
grep -rn "phone\|marquee\|glass\|gradient-border" src
```

Expected: no output. Any surviving `phone`/`marquee`/`glass` reference means dead CSS or dead JSX was left behind. (`card-spotlight` is expected and is not part of this check.)

- [ ] **Step 7: Remove the legacy token aliases**

Tasks 4–9 replaced every usage of the pre-redesign token names. Delete the alias block added in Task 3 Step 3 — `--btn`, `--btn-txt`, `--card`, `--subtle`, `--accent-soft`, `--line-hover`, `--font-display`, `--phone`, `--pattern` — from the `:root` block in `src/styles.css`.

Confirm nothing still references them first:

```bash
grep -c "var(--btn)\|var(--btn-txt)\|var(--card)\|var(--subtle)\|var(--accent-soft)\|var(--line-hover)\|var(--font-display)\|var(--phone)\|var(--pattern)" src/styles.css
```

Expected: `0`. Any non-zero count means a rule from a section task was missed — find and convert it to the new token, then re-check. Deleting an alias that is still referenced reintroduces the undefined-variable bug the token test exists to catch.

- [ ] **Step 8: Re-run the full gate after removing the aliases**

```bash
npm test && npm run lint && npm run build
```

Expected: the token test still passes, proving no `var()` was orphaned by the deletion.

- [ ] **Step 9: Commit**

```bash
git add src/styles.css
git commit -m "refactor: drop legacy token aliases"
```

- [ ] **Step 10: Report**

Summarise the verification results, including anything that could not be checked and why. Do not report completion for any item not actually exercised.