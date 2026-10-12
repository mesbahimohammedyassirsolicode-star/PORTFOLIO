# Portfolio — Mohammed Yassir Mesbahi

Personal developer portfolio: a single-page React application presenting skills,
stack, selected projects, and contact details. Bilingual (English / French),
light and dark themes, no UI framework.

Built with React 19 and Vite. The entire visual system is hand-written CSS driven
by custom properties — no Tailwind, no component library, no CSS-in-JS.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

Requires **Node >=22.12.0 <23** (see `engines` in `package.json`).

### All scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Vitest — data-integrity and CSS-token tests |
| `npm run lint` | ESLint over the whole repo |
| `npm run security:audit` | `npm audit --omit=dev` (production deps only) |
| `npm run security:headers` | Asserts the CSP/security-header baseline |
| `npm run security:secrets` | Pre-commit secret scan on staged files |
| `npm run security:ci` | `security:audit` + `security:headers` |

---

## Stack

**Runtime dependencies — deliberately only two:**

- `react` / `react-dom` 19.2

Everything else is a devDependency. There is no styling library, icon set,
animation library, or HTTP client. Contact form delivery talks to the EmailJS
REST API with `fetch` only when credentials are supplied (see *Known gaps*).

**Tooling:** Vite 8, Vitest 5, ESLint 10, Husky, Sharp (build-time asset
generation only).

---

## Project structure

```
index.html                 Entry document; theme/language applied before first
                           paint by a blocking inline script (prevents FOUC)
src/
  main.jsx                 Mounts <AnimationBudgetProvider> and <App/>
  App.jsx                  Theme + language state, scroll-spy, reveal observer,
                           motion capability gate
  styles.css               The entire design system: tokens, reset, layout,
                           and every component style
  data/
    portfolioData.js       All content + the en/fr dictionaries + projects
    portfolioData.test.js  Data-integrity tests
  styles.test.js           CSS token-consistency tests
  components/
    Navbar.jsx             Sticky header, language/theme segmented toggles,
                           full-screen mobile drawer
    MymLogo.jsx            MYM wordmark as inline SVG
    Hero.jsx               Headline, role, CTAs, stat row
    About.jsx              Intro, fact list, MYM / Journey / Mindset cards
    Stack.jsx              Core-skill tiles, familiar chips, workflow chips
    Projects.jsx           Filterable project grid
    Contact.jsx            Info card, copy-to-clipboard, validated form
  hooks/
    useAnimationBudget.js  Reports prefers-reduced-motion / touch / low-power
    useSpotlight.js        Pointer-following glow on `.card-spotlight`
scripts/
  check-security-headers.mjs
  check-staged-secrets.mjs
public/                    Static assets, served from the site root
```

### Data-driven, not hard-coded

Every visible string lives in `src/data/portfolioData.js` under `i18n.en` and
`i18n.fr`. Components receive a `t(key)` helper and never contain English copy.
The two dictionaries are asserted to have identical key sets by a test.

---

## Design system

All visual decisions resolve to custom properties declared in `:root`
(`src/styles.css`). Dark mode is the native palette; `.dark` overrides only what
differs.

- **Achromatic palette.** No chromatic accent anywhere. `--accent` is an alias
  of the primary ink token. Chromatic values appear only as *status* colours
  (`--ok`, `--err`) and their backgrounds.
- **Dark elevation by luminance,** not drop shadow — `--shadow` is `none` in
  dark. Light mode gets a subtle shadow; dark gets a lighter surface.
- **One typeface.** Inter Variable (400 / 510 / 590), served from Google Fonts.
  Weights are restricted to those three.
- **Tokens:** surfaces (`--bg` `--panel` `--surface` `--surface-hi` `--raised`),
  lines (`--line` `--line-subtle` `--line-input`), text (`--ink` `--ink2`
  `--muted` `--faint`), radius (`--r-badge` `--r-control` `--r-card`
  `--r-panel` `--r-full`), motion (`--ease-out` `--dur-reveal`).

### Accessibility

- Every text/background pair used in the shipped rules meets **WCAG AA (4.5:1)**
  in both themes. Contrast was computed against the final token values, not
  assumed.
- Focus is never removed. The global `:focus-visible` rule draws a 2px ring;
  form fields substitute a 3px `box-shadow` ring.
- `prefers-reduced-motion` is honoured in three places: animation and transition
  are disabled, `.reveal` content is forced visible (it is otherwise revealed by
  a JS-added class, so the CSS kill-switch alone would leave content at
  `opacity: 0`), and the spotlight glow is removed entirely.
- The motion system is **capability-gated**, not user-agent gated.
  `useAnimationBudget` reports reduced-motion preference, touch/coarse pointer,
  and a low-power heuristic; the result sets `data-motion="3d" | "flat"` on
  `<html>`, and CSS selects the 3D or flat keyframes accordingly.
- Skip link to `#main`, visible labels on every field, `aria-invalid` +
  `aria-describedby` on invalid fields, and a live region announcing the
  copy-to-clipboard result.

---

## Testing

`npm test` — 11 tests across two files, in vitest's `node` environment. There is
no jsdom and no React Testing Library; no test renders JSX. Both suites guard
failure modes that lint, the build, and manual review all missed:

**`portfolioData.test.js`** — data integrity

- Every `projects[].img` resolves to a real file under `public/`, asserted
  *exactly as written* with no prefix normalisation. This exists because an
  `onError` handler silently removes broken `<img>` elements, so a bad path makes
  cards look empty rather than broken.
- Every `t()` key referenced by a component is defined in **both** `en` and `fr`.
- Every data-driven key (project problem/solution/result, nav labels, category
  labels) is defined in both languages.
- `en` and `fr` key sets are identical.

**`styles.test.js`** — CSS token consistency

- `:root` and `.dark` parse to a non-empty token surface.
- Every `var(--x)` referenced anywhere in the stylesheet is declared in `:root`.
- Every `.dark` override is also declared in `:root`.

The token test is intentionally one-directional: it catches
*referenced-but-undeclared*, not *declared-but-unreferenced*.

---

## Security

- `vercel.json` ships a strict CSP plus `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Strict-Transport-Security`,
  `Cross-Origin-Resource-Policy`, `Cross-Origin-Opener-Policy`,
  `X-DNS-Prefetch-Control`, `X-Permitted-Cross-Domain-Policies`, and
  `Permissions-Policy`. See `SECURITY_HEADERS.md` for Netlify and nginx
  equivalents.
- Dev and preview servers set the same headers via `vite.config.js`.
- Husky runs a staged-file secret scan before every commit.
- CI runs `security:audit` (production deps only) and `security:headers`.
- Production dependencies are only React and ReactDOM, so `npm audit --omit=dev`
  has almost no surface to report.

---

## Deployment

Configured for **Vercel** (`vercel.json`): `npm ci` → `npm run build` → `dist/`.
Any static host works — build and serve `dist/`. Copy the header block from
`SECURITY_HEADERS.md` if your host is not Vercel.

---

## Known gaps

Honest list of what is not finished:

1. **The contact form cannot send.** EmailJS credentials are empty
   (`EMAILJS` in `src/components/Contact.jsx`), so the submit button is
   deliberately `disabled` with a note telling visitors to email directly. The
   `fetch` path, validation, and error handling are implemented and activate as
   soon as the three IDs are filled in — the button's `disabled` attribute must
   be removed at the same time.
2. **The Open Graph image** (`public/og-image.png`) is generated locally by
   `sharp`. The `og:url` / `twitter:url` tags are absent because the real domain
   is not yet known — the placeholder TODO in `index.html` marks this.
3. **Static asset paths assume the site is served from the domain root.** They
   hardcode a leading `/` rather than `import.meta.env.BASE_URL`, so a subpath
   deployment would break the project images.
4. **`font-feature-settings: "cv01", "ss03"` is inert** against Google's Inter
   build — that build's GSUB table exposes only `calt`, `ccmp`, `dnom`, `frac`,
   `locl`, `numr`, `pnum`, `tnum`. The declaration is kept because it becomes
   correct the moment a self-hosted Inter build is used.
5. **Some UI literals are not translated:** the subject `<datalist>` options
   ("Internship offer", "Collaboration", "Other") and the footer credit line.
   Proper nouns (the name, "GitHub", "MYM") are intentionally left alone.
6. **Empty project state is unreachable.** `.empty` / `t('empty')` exist, but
   every filter category currently has at least one project.
7. **The Stack grid leaves its second row partly vacant at ≥1000px** — a
   deliberate asymmetric-editorial layout, not a bug, but worth an eyeball.

---

## Design documentation

The redesign that produced the current visual system was specified and planned
before implementation:

- Spec: `docs/superpowers/specs/2026-10-10-portfolio-redesign-linear-monochrome-design.md`
- Plan: `docs/superpowers/plans/2026-10-10-portfolio-redesign.md`
- Reference notes: `docs/superpowers/specs/2025-10-10-linear-app-reference.md`