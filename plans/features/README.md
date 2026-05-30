# Scatterbrain — Feature Plans Index

This folder is the **segmented, intentional history** of Scatterbrain's build. Every feature/phase
gets its own plan file so we can see exactly what was planned, decided, built, and verified — in
order. The high-level roadmap lives in the master plan
(`.claude/plans/i-put-together-a-serene-abelson.md`); the per-feature detail and history live here.

## Conventions
- **One file per feature/phase**, named `NN-feature-name.md` (zero-padded order).
- Each file follows `_TEMPLATE.md`.
- **Status** values: `Planned` → `In Progress` → `Done` (or `Deferred` / `Dropped`).
- Keep a **Changelog** at the bottom of each file — append dated entries as work progresses.
- When a feature is finished, set status to `Done` and fill in the "Outcome" + "Verification" sections.
  Don't delete completed plans — they are the history.

## Status

| # | Feature | Status | Plan |
|---|---|---|---|
| 00 | UI mockups (look-and-feel gate) | In Progress | [00-ui-mockups.md](./00-ui-mockups.md) |
| 01 | Scaffold + CI/CD | Planned | _tbd_ |
| 02 | Theme + static Today | Planned | _tbd_ |
| 03 | Local data layer (SQLite + store) | Planned | _tbd_ |
| 04 | Brain Dump + parser + dictation | Planned | _tbd_ |
| 05 | Supabase sync + auth | Planned | _tbd_ |
| 06 | Notifications + resurfacing | Planned | _tbd_ |
| 07 | Calendar + Note Editor (notes/checklists) | Planned | _tbd_ |
| 08 | Claude enrichment (opt-in) | Planned | _tbd_ |
| 09 | Settings + polish | Planned | _tbd_ |

> A feature file is created when we start that feature — not all upfront — so each reflects real
> decisions made at build time.
