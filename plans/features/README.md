# Scatterbrain — Feature Plans Index

This folder is the **segmented, intentional history** of Scatterbrain's build. Every feature/phase
gets its own plan file so we can see exactly what was planned, decided, built, and verified — in
order. The high-level roadmap lives in the master plan
(`.claude/plans/i-put-together-a-serene-abelson.md`); the per-feature detail and history live here.

## Conventions
- **One file per feature/phase**, named `NN-feature-name.md` (zero-padded order).
- Each file follows `_TEMPLATE.md`.
- **Ticket IDs (Jira-style)**: project key `SB`, numbered sequentially by build phase —
  `SB-1`, `SB-2`, `SB-3`, … PR titles start with the ticket: `[SB-2] Short summary`.
- **Status** values: `Planned` → `In Progress` → `Done` (or `Deferred` / `Dropped`).
- Keep a **Changelog** at the bottom of each file — append dated entries as work progresses.
- When a feature is finished, set status to `Done` and fill in the "Outcome" + "Verification" sections.
  Don't delete completed plans — they are the history.

## Status

| Ticket | # | Feature | Status | Plan |
|---|---|---|---|---|
| SB-1 | 00 | UI mockups (look-and-feel gate) | Done | [00-ui-mockups.md](./00-ui-mockups.md) |
| SB-2 | 01 | Scaffold + CI/CD | Done | [01-scaffold-ci.md](./01-scaffold-ci.md) |
| SB-3 | 02 | Theme + static Today | Done | [02-theme-today.md](./02-theme-today.md) |
| SB-12 | 03 | Responsive layouts (tablet + desktop) | Planned | _tbd_ |
| SB-4 | 04 | Local data layer (SQLite + store) | Planned | _tbd_ |
| SB-5 | 04 | Brain Dump + parser + dictation | Planned | _tbd_ |
| SB-6 | 05 | Supabase sync + auth | Planned | _tbd_ |
| SB-7 | 06 | Notifications + resurfacing | Planned | _tbd_ |
| SB-8 | 07 | Calendar + Note Editor (notes/checklists) | Planned | _tbd_ |
| SB-9 | 08 | Claude enrichment (opt-in) | Planned | _tbd_ |
| SB-10 | 09 | Settings + polish | Planned | _tbd_ |
| SB-11 | — | "Bold" theme (gradient style) — expand after Keep | Backlog | _tbd_ |

> New features added later continue the sequence (SB-11, SB-12, …).

### Backlog / future
- **SB-11 — Bold theme**: vibrant gradient style (variant C from `mockups/variants.html`), light +
  dark. Deferred; v1 ships **Keep** (primary) + **Calm** (baseline). Themes are token sets behind the
  ThemeProvider, so adding Bold later needs no structural change.

> A feature file is created when we start that feature — not all upfront — so each reflects real
> decisions made at build time.
