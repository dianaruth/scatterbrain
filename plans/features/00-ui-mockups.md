# 00 — UI Mockups (look-and-feel gate)

**Status:** In Progress
**Phase:** 0
**Owner:** Diana / Claude
**Started:** 2026-05-30 · **Completed:** —

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
- `mockups/index.html` — six-screen mockup page.

## Decisions
- HTML mockups first (vs building real Expo screens) → fastest iteration, minimal throwaway.
- Token-driven CSS → approved look ports cleanly into `theme/`; global restyles stay cheap.
- Review by the user opening `mockups/index.html` directly (file:// blocked for Playwright; no local
  server run per user preference).

## Verification
- User opens `mockups/index.html` in a browser and reviews all six screens (light; dark via
  `data-theme="dark"` on `<html>`).
- Approval of visual direction = exit criteria for this phase.

## Outcome
_(pending approval / iteration)_

## Changelog
- 2026-05-30 — created mockups (`tokens.css`, `index.html`) for all six screens incl. notes/checklist
  affordances; awaiting user review + any Dribbble references.
