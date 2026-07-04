# 03 — Responsive Layouts (Tablet + Desktop)

**Ticket:** SB-12
**Status:** Done
**Phase:** 3
**Owner:** Diana / Claude
**Started:** 2026-07-04 · **Completed:** 2026-07-04

## Why
SB-3 shipped the Today screen as a mobile-only layout. The approved `mockups/directions.html`
specifies two additional breakpoints: 768px (tablet: 2-col card grid) and 1220px (desktop: sidebar
+ 2-col section columns + right panel). SB-12 wires those up without touching the mobile experience.

## Scope
- In scope: `useBreakpoint` hook, `AppShell` / `Sidebar` / `RightPanel` layout components,
  responsive Today screen (header padding, card grid, desktop section columns), tab bar hidden on
  desktop, static "Coming up" and "Recent note" content in right panel.
- Out of scope: live data in sidebar/right panel (SB-4+), Settings nav item routing (SB-10),
  responsive layouts for Calendar / Reminders / Notes tab screens (follow-on work), animations.

## Design / Approach
- **`useBreakpoint()`** — thin wrapper around `useWindowDimensions()` returning
  `'mobile' | 'tablet' | 'desktop'`. Updates live on window resize.
- **`AppShell`** — renders a 3-column `flex row` on desktop (Sidebar 210px + content flex:1 +
  RightPanel 250px). Pass-through fragment on mobile/tablet so mobile sees zero overhead.
- **Sidebar navigation** — `usePathname()` for active detection; `useRouter().push()` for
  navigation. Settings item rendered but non-interactive (`opacity: 0.45`) until SB-10.
- **Tab bar** — `tabBarStyle.display: 'none'` on desktop; sidebar nav replaces it.
- **Today screen cards** — tablet: `toRows()` helper chunks items into flex pairs (overdue stays
  full-width); desktop: two explicit `View` columns (Overdue+Today left, Notes right).
- **CaptureBar** — added `marginHorizontal` and `marginTop` props (defaults match old behavior)
  so the Today screen can pass breakpoint-appropriate values.

## Files
- `hooks/useBreakpoint.ts` — new: width → Breakpoint mapping
- `components/layout/AppShell.tsx` — new: desktop 3-column shell
- `components/layout/Sidebar.tsx` — new: 210px left nav with logo, nav items, user section
- `components/layout/RightPanel.tsx` — new: 250px right panel with upcoming + recent note
- `components/CaptureBar.tsx` — added `marginHorizontal`/`marginTop` props
- `app/_layout.tsx` — wrapped Stack in AppShell
- `app/(tabs)/_layout.tsx` — conditional tab bar display
- `app/(tabs)/index.tsx` — responsive header, tablet 2-col grid, desktop section columns

## Decisions
- **`AppShell` at root layout level** — placing it above the Stack/Tabs means the sidebar and
  right panel persist across tab navigation without remounting.
- **`display: 'none'` vs navigator swap** — hiding the tab bar is simpler and avoids re-architecting
  the expo-router navigator tree. The sidebar provides equivalent nav affordance on desktop.
- **Desktop uses explicit section columns** — the mockup puts Overdue+Today in left and Notes in
  right, which is a semantic split, not a per-card grid. Two `View` columns is the right model.
- **Static right panel content** — mirrors the static Today card data; connects to store in SB-4.

## Verification
- `tsc --noEmit` → zero errors
- `eslint` → zero warnings
- `jest` → smoke test passes
- Playwright resize at 390px (mobile), 768px (tablet), 1220px (desktop) → all three layouts render

## Outcome
Today screen adapts at 768px and 1220px matching `directions.html` exactly. Sidebar and right
panel appear on desktop; tab bar hides. Mobile experience unchanged.

## Changelog
- 2026-07-04 — created plan + implemented.
