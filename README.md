# Scatterbrain

A personal reminders + notes + calendar app for people who are scatterbrained. One home view, one-tap capture, calm design.

Combines three things most people use separately — a calendar, a reminders list, and a notes pad — into a single unified app. The core idea: scatterbrained people don't fail because they lack tools, they fail because switching between tools creates friction.

## Running locally

**Prerequisites:** Node 20+, npm, [Expo Go](https://expo.dev/go) on your phone (optional).

```bash
npm install
```

**Browser (web):**
```bash
npx expo start --web
```
Opens at `http://localhost:8081`.

**Phone (iOS or Android):**
```bash
npx expo start
```
Scan the QR code with Expo Go. Phone must be on the same WiFi as your computer.

## Quality gates

```bash
npm run typecheck   # tsc --noEmit (strict)
npm run lint        # eslint, zero warnings allowed
npm test            # jest
```

CI runs all three on every push to `main` and on every PR.

## Project structure

```
app/          Expo Router screens (file-based routing)
  (tabs)/     Four tab screens: Today, The Big Picture, Don't Forget, The Pile
components/   Shared UI components
theme/        Design tokens (colors, typography, radii, spacing)
store/        Zustand state stores
lib/          Utilities
mockups/      HTML/CSS mockups from the look-and-feel phase (SB-1)
plans/        Feature plans and product spec
```

## Tech

- **React Native + Expo SDK 57** (new architecture)
- **Expo Router** — file-based navigation
- **TypeScript** — strict mode, no implicit any
- **Zustand** — state management
- **ESLint 9 + Prettier** — enforced in CI
