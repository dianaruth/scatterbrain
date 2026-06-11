# 00 — UI Mockups (look-and-feel gate)

**Ticket:** SB-1
**Status:** Done
**Phase:** 0
**Owner:** Diana / Claude
**Started:** 2026-05-30 · **Completed:** 2026-06-02

## Why
Per the agreed UI/UX workflow, the look-and-feel is decided in fast, throwaway HTML/CSS mockups
*before* any Expo code is written. This de-risks the visual direction cheaply (no app scaffolding) and
gives a token set to port directly into the real `theme/`. Gate: no Phase 1 code until the look is
approved.

## Scope
- In scope: static HTML/CSS mockups of all six screens using the spec's design tokens; a shared token
  stylesheet; iteration from user reactions + Dribbble references + variants.
- Out of scope: interactivity, real data, Expo components.

## Design / Approach
- `mockups/tokens.css` — every spec color token (light + dark via `data-theme`), typography roles,
  radii, spacing as CSS custom properties. Maps 1:1 to the future `theme/` tokens.
- `mockups/index.html` — all six screens in phone frames, side by side: Today, The Big Picture,
  Don't Forget, The Pile, Note Editor (Keep-style), Brain Dump sheet.
- Notes/checklist affordances shown: "🗒 has a note", "☑ N of M items", checklist note cards, event
  notes — reflecting the unified `items` + `checklist_items` model.

## Files
- `mockups/tokens.css` — shared design tokens + base component styles.
- `mockups/index.html` — six-screen mockup page (initial).
- `mockups/keep.html` — **the approved direction**: full Keep theme, all screens + states, Bricolage
  Grotesque + Solar icons (see Decisions).
- `mockups/lab.html` — font + icon comparison lab (Iconify-driven); reusable for future exploration.
- `mockups/variants.html`, `mockups/themes.html` — earlier exploration (variants + theme picker).

## Decisions
- HTML mockups first (vs building real Expo screens) → fastest iteration, minimal throwaway.
- Token-driven CSS → approved look ports cleanly into `theme/`; global restyles stay cheap.
- Review by the user opening the mockup HTML directly (Playwright renders via `page.goto('file://…')`
  inside `browser_run_code_unsafe`; the plain `browser_navigate` blocks `file://`. No local server.)
- **Typography (approved):** **Bricolage Grotesque** for display/headers + card/section titles;
  **Manrope** for body/meta. (Explored Fraunces, Clash Display, Space Grotesk, Sora in `lab.html`.)
- **Icons (approved):** **Solar bold-duotone**, loaded in mockups via the Iconify web component.
  (Explored Tabler → Phosphor → Solar; also Material Symbols, Lucide, Iconoir, Remix in `lab.html`.)
  Implementation note: in the Expo app, render Solar via SVG (e.g. `@iconify/react` on web / inlined
  SVGs on native) — exact lib chosen at build time; tokens/usage are icon-set-agnostic.
- **Visual language (approved):** soft top **gradient hero wash** (content layers on top for depth),
  **bold colored icon badges** per item type, real **elevation/shadows**, **gradient** primary CTA +
  avatar + FAB, pill nav with a colored active chip, deeper per-type card colors. Inspired by two
  Dribbble refs (saved `ref1.png` notebook colors, `ref2.png` clean layered depth).

## Verification
- User opens `mockups/index.html` in a browser and reviews all six screens (light; dark via
  `data-theme="dark"` on `<html>`).
- Approval of visual direction = exit criteria for this phase.

## Outcome
**Approved.** Final v1 look: **Keep** theme (light + dark) across all screens + states, with
**Bricolage Grotesque** display type + **Manrope** body, **Solar bold-duotone** icons, gradient hero
wash, colored icon badges, elevation, and gradient CTAs. Canonical render in `keep.png`; this is the
token/visual contract to port into the Expo `theme/` in later phases. Look-and-feel gate satisfied —
Phase 1 (SB-2 Scaffold + CI/CD) is unblocked.

## Changelog
- 2026-05-30 — created mockups (`tokens.css`, `index.html`) for all six screens incl. notes/checklist
  affordances; awaiting user review + any Dribbble references.
- 2026-05-31 — first review round. Rendered light + dark via Playwright. Refined per feedback:
  (1) dark-mode contrast — header/avatar now use dedicated deep-plum tokens (`--header-bg` etc.) that
  don't flip light in dark mode; surface deepened slightly. (2) icons — replaced Unicode glyph
  stand-ins with Tabler-style inline SVG sprite (`<symbol>`/`<use>`).
- 2026-05-31 — feedback: too plain, wants more color/icon options. Built `variants.html` with 4
  directions (A Spec Calm, B Type Color-Coded, C Bold Gradient, D Keep-Style Cards).
  **Decision: ship selectable themes** rather than pick one — Calm (default) / Bold / Keep, each
  light+dark. Theme = a named token set behind a ThemeProvider; choice persisted + synced. Recorded
  in master plan §4 ("selectable themes"). Built `themes.html` (theme-picker UI) + fixed icon glitch
  in `variants.html`.
  **Confirmed decisions:** theme picker = swatch + instant apply; per-item-type colors fixed per
  theme (not user-editable in v1).
- 2026-05-31 — priority refined: **start with Keep** as the primary v1 theme (light + dark). **Bold
  deferred** to a post-Keep expansion (noted; architecture already supports it as another token set).
  Calm remains the baseline/fallback token set. Keep palette: reminder=rose, event=sky, list=amber,
  note=mint. Building full Keep mockups (`keep.html`) across all 6 screens in light + dark next.
- 2026-06-02 — added the remaining secondary screens/states to `keep.html` (Keep theme, light + dark),
  reusing the existing token set + component classes (theme-picker pieces ported from `themes.html`):
  (1) **Settings** main — Appearance, Notifications (reminder nudges on / quiet hours), Brain Dump
  smart-enrichment toggle **off by default**, Account, Data (export + delete-account in the danger
  rose). (2) **Appearance / theme picker** restyled into Keep — Keep (selected) / Calm / Bold·soon
  swatch cards + Light/Dark/System segmented control. (3) **Empty states** for Today, The Pile,
  Reminders (all complete), and an empty calendar day, using spec §8 copy verbatim. (4) **Brain Dump
  guards** — "Save it before you forget?" dismiss confirmation + "Caught it." save toast (spec §7).
  Onboarding/sign-in intentionally deferred. Rendered + reviewed via Playwright (`keep.png`).
- 2026-06-02 — **look-and-feel iteration to approval.** User feedback: too basic/boxy/no personality.
  Iterated `keep.html`: (1) dropped the flat dark header for big **Bricolage Grotesque** headlines on a
  soft **gradient hero wash**; (2) added **elevation** (cards, FAB, nav, header buttons), **gradient**
  CTA/avatar/FAB, pill nav with colored active chip; (3) **bold colored icon badges** + deeper card
  colors; (4) explored fonts + icon sets in a new `lab.html` (Iconify) and **swapped icons to Solar
  bold-duotone** and the display font to **Bricolage Grotesque** (body stays Manrope). **User approved
  the visual direction.** Canonical render refreshed (`keep.png`).
