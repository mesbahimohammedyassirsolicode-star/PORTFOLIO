# Portfolio Redesign — Open Design "Modern Minimal", Monochrome Variant

Date: 2026-10-10
Status: Draft for review
Stack: React 19 + Vite 8, no UI framework added

## Purpose

Redesign the portfolio's visual system to a modern-minimal, Linear-derived
direction while preserving every piece of existing behaviour: EN/FR i18n,
three-state theme switching, scroll-spy navigation, contact-form validation,
and the current section structure and content.

The point is not "make it nicer." It is to replace a generic border-and-shadow
card aesthetic with a precise token system, remove eleven dead components and
two unused dependencies, and fix four defects found during the audit.

## Design direction

Bound from Open Design's `linear-app` design system
(`docs/superpowers/specs/2025-10-10-linear-app-reference.md`), with two
deliberate deviations:

1. **No chromatic accent.** The system stays achromatic. Hierarchy is produced
   by background luminance stepping, hairline borders, weight, and spacing.
   `accent` is an alias of the primary ink colour, as it is today.
2. **Both light and dark are first-class.** Linear is dark-native. This site
   has a three-state theme switch (light / system / dark) that must keep
   working, so the token set is defined for both themes rather than treating
   dark as the base and light as an afterthought.

## Constraints

- No new runtime dependencies. React, Vite, and `lucide-react` are unchanged.
- No framework or styling-library migration (Open Design `redesign-skill`
  rule: work with the existing stack).
- All existing `t()` keys keep their meaning. New keys are additive only.
- Behaviour currently working must still work: lang toggle, theme toggle,
  scroll-spy, reveal-on-scroll, reduced-motion, form validation, honeypot,
  rate limit, copy-to-clipboard.
- No test runner exists in this project and none is introduced. Verification is
  `npm run lint`, `npm run build`, and a manual responsive/theme pass.

## Token layer

Replaces the token block at `src/styles.css:6-58`.

### Dark (native)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#08090a` | page canvas |
| `--panel` | `#0f1011` | navbar, aside, MYM card |
| `--surface` | `#191a1b` | cards, inputs |
| `--surface-hi` | `#28282c` | hover state |
| `--raised` | `rgba(255,255,255,.02)` | ghost button fill |
| `--line` | `rgba(255,255,255,.08)` | hairline border |
| `--line-subtle` | `rgba(255,255,255,.05)` | dividers |
| `--line-input` | `rgba(255,255,255,.14)` | input borders |
| `--ink` | `#f7f8f8` | headings, primary text |
| `--ink2` | `#d0d6e0` | body |
| `--muted` | `#8a8f98` | secondary/meta |
| `--faint` | `#62666d` | tertiary, disabled |
| `--ok` | `#27a644` | availability dot only |
| `--err` | `#e5484d` | validation errors |
| `--shadow` | `none` | dark uses luminance, not shadow |

### Light (same neutral family inverted)

| Token | Value |
|---|---|
| `--bg` | `#ffffff` |
| `--panel` | `#fafafa` |
| `--surface` | `#f4f4f5` |
| `--surface-hi` | `#ececee` |
| `--raised` | `rgba(0,0,0,.015)` |
| `--line` | `rgba(0,0,0,.09)` |
| `--line-subtle` | `rgba(0,0,0,.055)` |
| `--line-input` | `rgba(0,0,0,.16)` |
| `--ink` | `#0a0a0a` |
| `--ink2` | `#404040` |
| `--muted` | `#6b7280` |
| `--faint` | `#9ca3af` |
| `--shadow` | `0 1px 2px rgba(0,0,0,.04), 0 8px 24px -12px rgba(0,0,0,.10)` |

`--ok` / `--err` share the light values' equivalents (`#15803d` / `#b91c1c`)
for contrast against white.

### Motion — scroll-driven 3D reveals

The existing `.reveal` / `.reveal.in` system (`src/App.jsx:70-90`,
`src/styles.css:674-678`) currently animates a plain
`opacity + translateY(18px)` fade-up. Replace the fade with a 3D settle.

**Behaviour.** When a `.reveal` block crosses into view it starts rotated in
depth and settles flat:

```
initial:  opacity 0
          translate3d(0, 28px, -80px)
          rotateX(6deg)            /* subtle downward tilt toward viewer */
settled:  opacity 1
          translate3d(0, 0, 0)
          rotateX(0deg)
```

Duration 720ms, easing `cubic-bezier(.16, 1, .3, 1)` (the value already used
throughout this codebase for reveals). `perspective: 1200px` on the section
container establishes the depth field; `transform-style: flat` so children do
not inherit 3D context unexpectedly.

**Stagger.** Sibling `.reveal` blocks within the same section are delayed
`0ms, 70ms, 140ms` via `:nth-child`, so a card group cascades in rather than
appearing at once. Cap at three steps; beyond that the later items should not
wait, or the section feels slow to become readable.

**Capability gating.** `useAnimationBudget` already computes
`shouldLimitMotion` = `prefersReducedMotion || isTouchLike || isLowPowerDevice`
(`src/hooks/useAnimationBudget.js:40-45`), but nothing currently reads it for
reveals — `App.jsx` imports no hook. Wire it up:

- Gate on `shouldLimitMotion`. When true, `.reveal` keeps today's 2D fade-up
  and the 3D transform is never applied.
- The existing `@media (prefers-reduced-motion: reduce)` block
  (`src/styles.css:71-76`) must additionally force `transform: none` on
  `.reveal.in`, since it is applied via JS-driven class rather than only CSS.
- Gate on pointer capability as well: a 3D scroll reveal reads as lag on
  touch devices, so touch keeps the 2D path regardless of power.

**Ancestor constraint.** `transform` on an element makes `position: fixed`
descendants resolve against that transformed ancestor instead of the viewport.
Two fixed elements exist: `.skip` (`src/styles.css:151`) and `.mobile-nav`
(`src/styles.css:315`). Neither may be placed inside, or given a class on, a
`.reveal` block. Existing `.reveal` usage is on content blocks inside
`<main>` only, which keeps this safe — but do not add `.reveal` to `Navbar`,
the mobile drawer, or the footer, or the mobile menu will stop covering the
viewport.

**Not adopted.** Hover tilt, 3D scroll-linked section transitions, and 3D hero
parallax were considered and rejected. Tilt reads as gimmicky on text-dense
cards, section-level 3D conflicts with `scroll-padding-top` and anchor
scrolling, and hero parallax competes with the reveal entrance. The reveal
settle is the single coherent motion idea.

### Radius by role

| Token | Value | Use |
|---|---|---|
| `--r-badge` | `2px` | status tags, stack chips |
| `--r-control` | `6px` | buttons, inputs, toggles |
| `--r-card` | `8px` | project, stack, form cards |
| `--r-panel` | `12px` | MYM card, contact aside |
| `--r-full` | `999px` | the availability pulse dot only |

Replaces today's uniform 18/24/28px cards and all-pill controls.

### Typography

- Single family: Inter Variable. `font-feature-settings: "cv01","ss03"`.
- Weights 400 / 510 / 590 only. The current 700 headings are removed.
- `font-variant-numeric: tabular-nums` on `.stats strong`, project `.num`,
  and `.facts dd`.
- Display tracking scales with size: `-0.035em` at ≥48px, `-0.02em` at ≥32px,
  `-0.01em` below.
- Body copy capped at `65ch`. Headings get `text-wrap: balance`.
- Outfit is removed. `index.html`'s Google Fonts link becomes a single
  Inter variable request.

## Section changes

Component props contracts stay as they are. Only JSX structure and class
usage change.

### Navbar (`src/components/Navbar.jsx`)

- Bar background uses `--panel`; bottom border `--line-subtle`.
- Nav links 13px / weight 510 / `--ink2`, active `--ink` with a 1px underline.
- Language and theme segmented controls become `--r-control` rounded rects.
  The selected segment lifts to `--surface` with a hairline border.
- CV link becomes a `--r-control` ghost button.
- Remove the inline `style={{ background: 'none', border: 0 }}` on the logo
  button — it fights the class-based reset.

### Hero (`src/components/Hero.jsx`)

- Delete the phone mockup block (`.phone-wrap`, and with it the `.phone`,
  `.ph-*`, `.caption`, and `float`/`ping`-adjacent mockup CSS).
- Delete the marquee block and its `.marquee` / `.track` / `slide` CSS.
- Two-column grid at ≥960px: identity column left, stats column right.
- Availability badge becomes `--r-badge` with a `--ok` dot. Keep the pulse
  animation; it is the one motion moment that carries meaning.
- Stats become a right-aligned vertical stack with tabular figures and a
  hairline rule, instead of a 3-across row under the CTAs.
- Hero background: a single soft radial luminance wash, replacing the SVG
  asterisk pattern. No pattern tile.

### About (`src/components/About.jsx`)

- Facts list becomes a 3-across inline row on ≥700px, stacked below that.
- MYM card uses `--panel`, `--r-panel`, and an inset shadow
  (`inset 0 0 12px rgba(0,0,0,.2)` in dark) instead of a flat inverted block.
- Journey timeline keeps its structure; node dots adopt `--ink`.
- Mindset card stays full-width.

### Stack (`src/components/Stack.jsx`)

- The 6-tile grid becomes asymmetric to break the equal-thirds pattern:
  tiles 1 and 4 span two rows; the rest are single. Achieved with
  `grid-auto-rows` and explicit `grid-row: span 2` on those two.
- Tiles: `--surface`, `--r-card`, hairline border, lift to `--surface-hi` plus a
  1px `--ink` border on hover.
- Chips become `--r-badge` rectangles at `13px` / weight 510.

### Projects (`src/components/Projects.jsx`)

- Cards: `--surface`, `--r-card`, hairline border, no shadow at rest. On hover,
  border brightens to `--ink` and the image scales 1.04 over 600ms.
- Featured wide card retained.
- Filter buttons become `--r-control`. Selected state is `--ink` background
  with `--bg` text — the one place a solid fill is used, so it reads as active
  without needing a hue.
- Fix the image paths (see Defects).

### Contact (`src/components/Contact.jsx`)

- Aside on `--panel` / `--r-panel`; form card on `--surface` / `--r-card`.
- Inputs: `--r-control`, `--surface-hi` fill, `--line-input` border, 3px
  `--ink` focus ring at 20% opacity.
- EmailJS is not configured. The submit button renders `disabled` with a note
  under it explaining that email delivery is not configured, and the email
  address with its copy button is the primary contact path. The failure alert
  path stays in the code for when credentials are added, but is unreachable
  while the keys are empty.

## Defects fixed

| # | Defect | Fix |
|---|---|---|
| 1 | All 5 project images point at `assets/projects/*.webp`; files are at `public/*.webp`. Every card renders broken, silently rescued by `onError` removing the `<img>`. | Repoint to `/<filename>.webp`. |
| 2 | `/og-image.png` referenced by og/twitter meta but absent from `public/`. | Generate a 1200×630 OG image using the `sharp` dependency already in `devDependencies`, styled with the new dark palette (`#08090a` ground, `#f7f8f8` name, `#8a8f98` role line). |
| 3 | `t('lbl_filter')` used in `Projects.jsx:30`; `lbl_filter` is in neither dictionary, so it renders the raw key. | Add `lbl_filter` to both `en` and `fr`. |
| 4 | `EMAILJS` credentials are empty strings, so submit always short-circuits to the failure alert — reads as a broken site. | Honest disabled state (above). |

## Cleanup

**Deleted components** (imported by nothing, styled by no live rule):
`BentoGrid.jsx`, `Skills.jsx`, `TechTools.jsx`, `Tools.jsx`,
`SectionDivider.jsx`, `SectionTitle.jsx`, `Technologies.jsx`,
`ui/Button.jsx`, `ui/GlassCard.jsx`, `ui/SectionShell.jsx`.

`Skills.jsx` currently imports `previewSkills` from `portfolioData.js`, an
export that does not exist — a latent crash if anything ever renders it.

**Tailwind removal.** Tailwind 4 is installed and `@import "tailwindcss"` is in
`styles.css`, but no live component uses a utility class; only the dead
components did. The build emits 67 kB of CSS, the large majority of it unused.
Drop the import, drop the `@tailwindcss/vite` plugin from `vite.config.js`, and
remove `tailwindcss` + `@tailwindcss/vite` from `package.json`.

**Unused dependencies.** `@vercel/speed-insights` and `@emailjs/browser` are
installed and imported by no source file. Remove both. `lucide-react` is
imported by one dead component (`BentoGrid`); after deletion it is unused, so
remove it too — unless a replacement icon set is wanted, in which case the
inline SVGs already in `Navbar` and `Contact` cover the current icon needs.

**Hook activation.** `src/hooks/useSpotlight.js` is written and unused. Call it
once in `App.jsx`. It queries `.card-spotlight` at mount, so apply that class to
the cards that should glow: the three `.card` surfaces in About, the stack
tiles, the project cards, and the two contact surfaces. Do **not** apply it to
the Hero (which has no cards after the mockup is removed) or to the availability
badge. The hook already respects `prefers-reduced-motion`; keep that guard.
`useAnimationBudget` is already wired in `main.jsx` and stays.

## Files touched

```
index.html                    font link, og-image, theme-color
package.json                  remove 4 unused deps
vite.config.js                remove tailwind plugin
src/styles.css                full token rewrite; dead CSS removed
src/App.jsx                   wire useSpotlight + useAnimationBudget gating
src/components/Navbar.jsx     header, toggles
src/components/Hero.jsx       remove mockup + marquee, new stats layout
src/components/About.jsx      facts row, MYM panel
src/components/Stack.jsx      asymmetric grid, chips
src/components/Projects.jsx   cards, filters, image paths
src/components/Contact.jsx    surfaces, disabled state
src/data/portfolioData.js     add lbl_filter; fix image paths
public/og-image.png           new
```

Deleted: the ten files listed under Cleanup.

## Verification

1. `npm run lint` — must pass clean.
2. `npm run build` — must succeed; confirm the CSS bundle drops well below the
   current 67 kB now that Tailwind is gone.
3. Manual pass at 390px, 768px, 1440px in both light and dark:
   - no horizontal scroll at any width
   - headings do not clip or overlap
   - every interactive element has hover, `:focus-visible`, active, and
     disabled states
   - reduced-motion respected: no 3D transform applied, reveals collapse to
     plain fade, badge pulse disabled
   - 3D reveals settle fully flat — no residual `rotateX` or `translateZ` on
     any `.reveal.in` element
   - mobile drawer still covers the full viewport (regression check for the
     transformed-ancestor constraint above)
   - lang toggle translates every visible string, including the new
     `lbl_filter`
   - theme toggle persists across reload with no flash of the wrong theme
4. Confirm all five project images render.