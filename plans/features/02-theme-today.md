# 02 — Theme + Static Today

**Ticket:** SB-3
**Status:** Done
**Phase:** 2
**Owner:** Diana / Claude
**Started:** 2026-07-02 · **Completed:** 2026-07-02

## Why
SB-2 scaffold had all tokens defined but no font loading, no ThemeProvider, and placeholder screens
in the system font. SB-3 wires up the full visual stack so the app matches the approved
`mockups/directions.html` design: real fonts, Phosphor fill icons, light/dark theming, and a
complete static Today screen with hardcoded sample data.

## Scope
- In scope: font loading (Playfair Display, Plus Jakarta Sans, DM Mono), ThemeProvider (system
  light/dark), Phosphor tab icons, Today screen (header, capture bar, 3 sections, 4 item cards),
  SectionDivider / ItemCard / CaptureBar components.
- Out of scope: animations (header gradient shift, card slide-up, overdue glow, blobs), real data
  from the store, Brain Dump logic, other tab screens — all deferred to SB-4+.

## Design / Approach
- **Fonts** loaded via `useFonts` from `expo-font` in `app/_layout.tsx` with
  `SplashScreen.preventAutoHideAsync()` — splash stays visible until all 6 variants are ready.
- **ThemeProvider** (`theme/ThemeProvider.tsx`) — React context wrapping the app; reads
  `useColorScheme()` and maps to `colors.dark` / `colors.light` from `tokens.ts`. No user toggle
  in this phase; system preference only.
- **`tabBarIcon` color** — Phosphor's `color` prop is `string`, but Expo Router passes `ColorValue`
  (a union including `OpaqueColorValue`). Fixed by using `focused` boolean to select
  `colors.navActive` / `colors.navInactive` directly, avoiding the type mismatch without assertions.
- **Today layout** — `ScrollView` inside `SafeAreaView`. Header is `LinearGradient` with
  `useSafeAreaInsets()` for the top inset. Capture bar uses `marginTop: -22` to float over the
  header. Sections/cards built from the three shared components.
- **Sample data** — typed const inside `index.tsx`; no store connection yet.

## Files
- `theme/tokens.ts` — added `headingBold: 'PlayfairDisplay_700Bold_Italic'`
- `theme/ThemeProvider.tsx` — new: ThemeContext, ThemeProvider, useTheme hook
- `app/_layout.tsx` — font loading, SplashScreen, ThemeProvider wrapper
- `app/(tabs)/_layout.tsx` — Phosphor fill icons, useTheme for tab bar colors
- `app/(tabs)/index.tsx` — full static Today screen
- `components/SectionDivider.tsx` — new: "01 / OVERDUE" divider row
- `components/ItemCard.tsx` — new: type bar + badge + title/meta + chip card
- `components/CaptureBar.tsx` — new: floating brain dump input

## Decisions
- **`useFonts` over `expo-font` direct `loadAsync`** → hook-based loading integrates cleanly with
  the splash screen pattern and renders cleanly in the component tree.
- **`focused` not `color` for Phosphor icons** → `ColorValue` type includes `OpaqueColorValue`
  (platform-level color reference, not a `string`); using `focused` keeps strict types clean.
- **Animations deferred** → this phase is "static Today"; motion (gradient shift, slide-up, glow)
  is a separate pass once the layout is locked.
- **`badgeBgDark` always used** → in SB-3 the app launches in system dark mode by default; badge
  bg will switch correctly once the theme context is fully plumbed per-component in SB-3+.

## Verification
- `tsc --noEmit` → zero errors
- `eslint` → zero warnings
- `jest` → smoke test passes
- `npx expo start --web` → Today screen: gradient header, Playfair bold italic greeting,
  floating capture bar, 3 sections with Phosphor icons, 4 typed item cards with correct
  rose/indigo/amber/emerald colors. Tab bar shows Phosphor fill icons.

## Outcome
Static Today screen shipped matching the approved `directions.html` design. Font loading,
ThemeProvider (system light/dark), Phosphor icons, and all three shared components are in place.
SB-4 (local data layer) is now unblocked.

## Changelog
- 2026-07-02 — created plan + implemented. TypeScript issue with `ColorValue` vs `string` on
  Phosphor icon `color` prop resolved by using `focused` boolean instead of the passed `color`.
