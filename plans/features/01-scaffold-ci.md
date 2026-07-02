# 01 — Scaffold + CI/CD

**Ticket:** SB-2
**Status:** Done
**Phase:** 1
**Owner:** Diana / Claude
**Started:** 2026-06-30 · **Completed:** 2026-06-30

## Why
SB-1 (look-and-feel gate) is done — the visual direction is locked in `mockups/directions.html`.
SB-2 creates the runnable Expo application skeleton with strict TypeScript, Expo Router,
Zustand, design token constants, and GitHub Actions CI to enforce quality gates from day one.
Per the agreed workflow: no feature code until the scaffold, tooling, and CI are in place.

## Scope
- In scope: Expo project files (package.json, tsconfig, app.json, babel config), Expo Router
  file-based routing with 4 placeholder tab screens, typed design token constants, Zustand
  store stub, ESLint (flat config) + Prettier, Jest smoke test, GitHub Actions CI (typecheck /
  lint / test), updated .gitignore.
- Out of scope: real screen content, font loading, ThemeProvider, actual navigation UI polish,
  native builds (EAS), E2E tests — all deferred to SB-3+.

## Design / Approach
- **Expo SDK 57** (latest stable as of 2026-06-30) with `newArchEnabled: true`.
- **Expo Router** file-based routing under `app/`: root `_layout.tsx` + `(tabs)/` group with
  four screens (index, calendar, reminders, notes). Each screen is a placeholder that renders
  the screen name.
- **TypeScript strict** — `strict: true`, `noImplicitAny`, `strictNullChecks`,
  `noUncheckedIndexedAccess`, path alias `@/*` → `/*`.
- **Zustand v5** — minimal `useItemsStore` with empty state; establishes the store pattern
  for SB-4 (local data layer).
- **`theme/tokens.ts`** — all approved design tokens ported from `mockups/directions.html`
  (dark + light palettes, per-type accent colors, typography names, radii, spacing). No
  ThemeProvider yet — that ships in SB-3.
- **ESLint 10** flat config (`eslint.config.js`) with `@typescript-eslint` v8, react-hooks,
  Prettier integration. No `any`, no unused vars, hooks rules enforced.
- **GitHub Actions CI** — three parallel jobs (typecheck / lint / test) on Node 20, triggered
  on push to `main` and PRs targeting `main`.

## Files
- `package.json` — app manifest, scripts (`start`, `typecheck`, `lint`, `test`), all deps
- `tsconfig.json` — strict mode + path aliases (extends `expo/tsconfig.base`)
- `app.json` — Expo config: `scheme`, `typedRoutes`, `newArchEnabled`
- `babel.config.js` — `babel-preset-expo` (unchanged from template)
- `app/_layout.tsx` — root Stack layout, StatusBar
- `app/(tabs)/_layout.tsx` — Tabs navigator (4 tabs, placeholder icons, dark nav tokens)
- `app/(tabs)/index.tsx` — Today placeholder
- `app/(tabs)/calendar.tsx` — The Big Picture placeholder
- `app/(tabs)/reminders.tsx` — Don't Forget placeholder
- `app/(tabs)/notes.tsx` — The Pile placeholder
- `theme/tokens.ts` — typed token constants (colors, fonts, radii, spacing, typeColors)
- `store/items.ts` — `useItemsStore` (Zustand v5, empty state)
- `store/index.ts` — re-exports
- `eslint.config.js` — ESLint 10 flat config
- `.prettierrc` — Prettier config (single quotes, trailing commas, 100 char)
- `jest.config.js` — jest-expo preset, path alias mapping
- `__tests__/smoke.test.ts` — smoke test (asserts `true`)
- `.gitignore` — Expo/Node/native build ignores added
- `.github/workflows/ci.yml` — CI: typecheck + lint + test in parallel on Node 20

## Decisions
- **Expo SDK 57 (not 52/54/55)** → latest stable; new architecture enabled by default.
- **Expo Router over React Navigation** → spec §11 specifies Expo Router; file-based routing
  aligns with future web (Next.js) mental model.
- **Zustand v5 over Context** → less boilerplate for the item-centric data model in SB-4+;
  no Provider wrapping needed.
- **ESLint 10 flat config** → `.eslintrc.js` format was removed in ESLint 10; flat config is
  the current standard. Used `eslint.config.js` with CJS require (no ESM to keep compatible
  with jest.config.js / babel.config.js which are also CJS).
- **TypeScript 5.9** over TypeScript 6 → TypeScript 6 is the npm `latest` but
  `@typescript-eslint` v8 was released before TS 6 GA; pinning to TS 5.9 avoids edge cases.
- **`noUncheckedIndexedAccess: true`** → catches off-by-one array access bugs early; stricter
  than `strict: true` alone.
- **Placeholder tab icons (Unicode chars)** → Phosphor icons require font/icon setup (SB-3);
  Unicode avoids a dependency and keeps SB-2 minimal.
- **`ios/` and `android/` in .gitignore** → Expo managed workflow; native dirs are generated
  by `expo prebuild` / EAS and should not be committed.

## Verification
1. `npm install` completes without errors.
2. `npm run typecheck` → zero errors.
3. `npm run lint` → zero warnings/errors.
4. `npm test` → smoke test passes.
5. `npx expo start --web` → dev server starts; 4-tab shell renders in browser.
6. Push to `main` → GitHub Actions CI: all three jobs (typecheck / lint / test) pass green.

## Outcome
Scaffold shipped. Expo SDK 57 app running with Expo Router, strict TypeScript, Zustand stub,
full token constants, ESLint 10 + Prettier, Jest smoke test, and CI. SB-3 (Theme + static
Today) is now unblocked.

## Changelog
- 2026-06-30 — created plan + implemented scaffold. `create-expo-app` refused to run in a
  non-empty directory (existing mockups/, plans/ etc.) even with `--yes`; all files created
  manually with correct SDK 57 versions verified via `npm view`.
