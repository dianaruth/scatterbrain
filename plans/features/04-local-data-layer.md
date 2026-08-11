# 04 — Local Data Layer (in-memory store)

**Ticket:** SB-4
**Status:** Done
**Phase:** 4
**Owner:** Diana / Claude
**Started:** 2026-08-11 · **Completed:** 2026-08-11

## Why
Every screen rendered hardcoded static arrays with no single source of truth, and SB-5
(Brain Dump) needs somewhere to write new items. Per the spec's two-phase data strategy
(`plans/scatterbrain-spec.md` §11) the app is local-first now, cloud-synced later: SB-6
(Supabase sync + auth) brings the real backing database and user accounts. Because Supabase
will become the source of truth, we deliberately kept this layer as thin and swappable as
possible rather than building a durable local database that SB-6 would largely replace.

This reframes the original ticket title ("SQLite + store"): we shipped the **store** half
now and deferred any durable local DB — no AsyncStorage, no SQLite, no auth. Data resets on
reload; that's acceptable until SB-6 wires persistence against the real backend.

## Scope
- In scope: domain models (`Reminder`, `Note`); an in-memory Zustand store seeded with the
  former static sample data; a pure selector/formatter layer mapping domain entities → the
  existing `ItemCard` presentation props and Today sections; wiring the Today screen to read
  from the store; dynamic "N things need attention" count; unit tests for the pure functions.
- Out of scope: on-device persistence (AsyncStorage/SQLite) — deferred to SB-6; auth (SB-6);
  RightPanel / Sidebar / Reminders / Notes tab screens (still static); device calendar events
  (SB-8); Brain Dump write UI (SB-5, though the store exposes the actions it will call).

## Design / Approach
- **Store** (`store/items.ts`) — plain Zustand `create<T>()`, no middleware, no persistence.
  State is `{ reminders: Reminder[]; notes: Note[] }`, seeded at module load with the former
  static sample items. Due dates are computed relative to `new Date()` at seed time (e.g.
  "2 days ago", "today at 18:00") so the demo always reads correctly regardless of when it's
  run. Exposes `addReminder`, `toggleReminder`, `removeReminder`, `addNote`, `removeNote` for
  SB-5 to build on.
- **Domain models** (`store/models.ts`) — `Reminder { id, title, dueAt, completed, createdAt }`,
  `Note { id, title, body, createdAt, updatedAt }`. `ItemType` also lives here now; `store/items.ts`
  re-exports it so `components/ItemCard.tsx`'s existing `@/store/items` import didn't need to
  change.
- **Pure formatting** (`lib/format.ts`) — `calendarDayDiff`, `formatDueMeta`, `formatDueChip`,
  `formatNoteMeta`, `formatNoteChip`. No React/JSX, so these are plain-function unit tested.
- **Pure selection** (`store/selectors.ts`) — `buildTodaySections(state, now)` groups reminders
  into Overdue (past due, not completed) and Today (due today, not completed) and notes into
  Notes, returning a 3-tuple `[overdue, today, notes]` view-model (no icons/colors — those stay
  theme-dependent in the screen). `useTodaySections(now)` and `useAttentionCount(now)` are the
  React hooks screens consume.
- **Today screen** (`app/(tabs)/index.tsx`) — replaced the inline `sections` literal with
  `useTodaySections(now)`; added a module-level `iconForType(type, typeColors)` helper since the
  pure view-model carries only `type`, not a pre-built icon node; subtitle now driven by
  `useAttentionCount(now)`. Layout branches (mobile/tablet/desktop, `toRows`) unchanged.

## Files
- `store/models.ts` — new: `Reminder`, `Note`, `ItemType`.
- `store/items.ts` — rewritten: real `{ reminders, notes }` store + actions + seed data.
- `store/index.ts` — updated: re-exports models + selectors.
- `store/selectors.ts` — new: `buildTodaySections`, `useTodaySections`, `useAttentionCount`.
- `lib/format.ts` — new: pure meta/chip/relative-time formatters.
- `app/(tabs)/index.tsx` — updated: consumes the store; `iconForType` helper; dynamic count.
- `__tests__/format.test.ts` — new: formatter unit tests.
- `__tests__/today-sections.test.ts` — new: `buildTodaySections` grouping/edge-case tests.

No new dependencies — `zustand` was already installed and stubbed as `useItemsStore`.

## Decisions
- **In-memory only, no persistence** → SB-6 (Supabase) becomes the source of truth; a durable
  local schema now would be thrown away. User directive: keep local storage as thin as possible
  until the real storage solution (SB-6) lands.
- **No auth in SB-4** → auth belongs entirely to SB-6, alongside sync.
- **Pure functions for formatting/grouping, JSX only in the screen** → unit-testable with the
  existing jest-expo setup; avoided introducing React Testing Library this ticket.
- **`buildTodaySections` returns a 3-tuple, not `TodaySection[]`** → the three sections
  (Overdue/Today/Notes) are a fixed invariant; a tuple return type lets the screen destructure
  them without `noUncheckedIndexedAccess` turning every access into `T | undefined`.
- **Reminders + Notes only; no Tag / CalendarEvent entities** → calendar is a device integration
  (SB-8); tags aren't rendered by Today. Add when a feature needs them.
- **Today screen only** → proves the data layer end-to-end while keeping surface small; other
  screens migrate in their own tickets.

## Verification
- `npm run typecheck` → zero errors (strict, `noUncheckedIndexedAccess`).
- `npm run lint` → zero warnings.
- `npm test` → smoke test + new `format` and `today-sections` unit tests pass.
- `npx expo start --web` → Today renders from the store; seeded items appear; the subtitle count
  matches state.

## Outcome
Today screen now reads from a real (in-memory) Zustand store instead of hardcoded arrays. The
store exposes CRUD actions ready for SB-5's Brain Dump to call. Persistence, sync, and auth are
explicitly deferred to SB-6.

## Changelog
- 2026-08-11 — created plan + implemented.
