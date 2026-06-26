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
- **Typography (approved 2026-06-25 · supersedes prior):** **Playfair Display** italic weight 400 for
  headings/greeting; **Plus Jakarta Sans** 400/500/600 for body/meta/nav; **DM Mono** for section
  counters and time chips. (Prior: Bricolage Grotesque + Manrope — rejected as AI-forward /
  lacking personality. Also explored and rejected: Fraunces, Cormorant Garamond, Bodoni Moda, Big
  Shoulders Display, Lexend, Outfit, Syne, Figtree, Newsreader, Crimson Pro.)
- **Icons (approved 2026-06-25 · supersedes prior):** **Phosphor fill** (`ph:*-fill`) via Iconify
  web component. (Prior: Solar bold-duotone — swapped out. Also explored: Tabler, Bubbly Soft.)
- **Visual language (approved 2026-06-25):** dark editorial midnight-slate palette (#08101C base) +
  warm lavender-white light palette (#F0EDF8 base). Animated gradient header + floating capture
  card overlap. **Sharp corners**: phone frame 28px, cards 6px, icon badges 5px, capture 8px,
  nav 18px (soft rect), avatar 6px, chips 3px. **Bold colored icon badges** per item type
  (rose/indigo/amber/emerald). Animated background blobs. Bottom nav with iOS-native feel.
- **Responsive breakpoints (approved):** Mobile 390px (single col + bottom nav) · Tablet 768px
  (2-col card grid + bottom nav) · Desktop 1220px (sidebar 210px + 2-col feed + right panel 250px).
- **Light + dark modes (both approved):** dark = deep midnight slate; light = warm lavender white.
  Canonical renders: `section4-light.png` (light mode) · `composite-dark-light.png` (both modes
  side by side, all three breakpoints).

## Verification
- User opens `mockups/index.html` in a browser and reviews all six screens (light; dark via
  `data-theme="dark"` on `<html>`).
- Approval of visual direction = exit criteria for this phase.

## Outcome
**Approved (final direction 2026-06-25).** Visual language: **Playfair Display** italic heading +
**Plus Jakarta Sans** body + **DM Mono** mono + **Phosphor fill** icons. Dark editorial midnight-
slate palette with warm lavender-white light mode. Sharp corners, animated blobs, floating capture
card, per-type color badges (rose/indigo/amber/emerald). Responsive across mobile/tablet/desktop.
Both light and dark modes fully designed and approved. Canonical renders in `composite-dark-light.png`
(all 6 views) and `directions.html` (living mockup). This is the token/visual contract to port into
the Expo `theme/` in later phases. Look-and-feel gate satisfied — Phase 1 (SB-2 Scaffold + CI/CD)
is unblocked.

> Prior approved direction (Bricolage Grotesque + Manrope + Solar bold-duotone, 2026-06-02) was
> superseded after further iteration. The keep.html/keep.png files remain for reference but are no
> longer the canonical direction.

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
- 2026-06-25 — **direction re-approved with new visual identity.** Extended exploration in
  `directions.html`: iterated through 6+ heading/body font combos; user rejected all "AI-forward"
  options. Settled on Playfair Display italic + Plus Jakarta Sans + DM Mono. Swapped Solar icons
  for Phosphor fill. Sharpened all corner radii. Added full responsive coverage (mobile/tablet/
  desktop) in both dark and light modes. Final composite render in `composite-dark-light.png`.
  This supersedes the 2026-06-02 Bricolage Grotesque direction.
- 2026-06-02 — **look-and-feel iteration to approval.** User feedback: too basic/boxy/no personality.
  Iterated `keep.html`: (1) dropped the flat dark header for big **Bricolage Grotesque** headlines on a
  soft **gradient hero wash**; (2) added **elevation** (cards, FAB, nav, header buttons), **gradient**
  CTA/avatar/FAB, pill nav with colored active chip; (3) **bold colored icon badges** + deeper card
  colors; (4) explored fonts + icon sets in a new `lab.html` (Iconify) and **swapped icons to Solar
  bold-duotone** and the display font to **Bricolage Grotesque** (body stays Manrope). **User approved
  the visual direction.** Canonical render refreshed (`keep.png`).
