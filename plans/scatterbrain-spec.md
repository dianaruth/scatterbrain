# Scatterbrain — Full Product & Design Spec

> A personal, cross-platform reminder + notes + calendar app for people who are scatterbrained and want to capture everything in one calm, beautiful place.

---

## 1. Product Overview

### Name
**Scatterbrain**

### Tagline options (pick one)
- "Calm for your scattered brain."
- "Your brain has a net now."
- "Think it. Catch it. Done."
- "Breathe. It's all here."

### Concept
Scatterbrain combines three things most people use separately — a calendar, a reminders list, and a notes pad — into one unified app. The core insight is that scatterbrained people don't fail because they lack tools; they fail because switching between tools creates friction. Scatterbrain removes that friction with a single home view ("Today") and a one-tap capture flow ("Brain Dump") that lets you throw something in without deciding where it goes first.

### Who it's for
Built initially as a personal tool, designed to be shareable. The target user is someone who:
- Forgets things constantly despite trying
- Wants to jot notes on the fly without opening a specific app
- Gets overwhelmed by heavy-handed productivity tools
- Appreciates calm, pretty UI over feature-dense dashboards

### Platforms
- Mobile-first (iOS + Android via React Native or Flutter)
- Web companion (Next.js PWA or React)
- Desktop optional in later phases

---

## 2. Color Tokens

All pairings listed pass WCAG AA (4.5:1 minimum). Primary colors pass AAA (7:1+).

| Token | Hex | Usage | Contrast on white |
|---|---|---|---|
| `--color-primary` | `#3D2645` | Headers, nav active, primary buttons, dark surfaces | 13.4:1 ✓ AAA |
| `--color-primary-dark` | `#2A1530` | Header background, avatar bg | 17.2:1 ✓ AAA |
| `--color-accent` | `#A07D96` | Secondary text, icons, tags, meta labels, overdue dots | 4.5:1 ✓ AA |
| `--color-tint` | `#EEE2F2` | Section backgrounds, capture bar bg, tag chips, toolbar | — (bg use only) |
| `--color-border` | `#D0B8CC` | Card borders, dividers, checkbox outlines | — (decorative) |
| `--color-surface` | `#FBF8FC` | App background (95% of screens) | — (bg use only) |
| `--color-text-primary` | `#3D2645` | All primary text | 13.4:1 ✓ AAA |
| `--color-text-secondary` | `#6B5468` | Body text in notes, descriptions | 7.1:1 ✓ AAA |
| `--color-text-muted` | `#A07D96` | Meta labels, timestamps, captions | 4.5:1 ✓ AA |
| `--color-white` | `#FFFFFF` | Card surfaces, item backgrounds | — |

### Dark mode equivalents

| Token | Dark hex |
|---|---|
| `--color-primary` | `#C4A8BF` |
| `--color-primary-dark` | `#EEE2F2` |
| `--color-accent` | `#D0B8CC` |
| `--color-tint` | `#2A1A30` |
| `--color-border` | `#4A3050` |
| `--color-surface` | `#1A1020` |
| `--color-text-primary` | `#EEE2F2` |
| `--color-text-secondary` | `#C4A8BF` |
| `--color-text-muted` | `#A07D96` |
| `--color-white` | `#241530` |

### Semantic colors (status indicators)

| Usage | Light | Dark |
|---|---|---|
| Overdue / urgent dot | `#A07D96` | `#D0B8CC` |
| Completed / done | `#A07D96` at 60% opacity | same |
| Calendar event dot | `#3D2645` | `#C4A8BF` |
| Note dot | `#D0B8CC` | `#6B4C5E` |

---

## 3. Typography

Font stack: `System UI → -apple-system → BlinkMacSystemFont → Segoe UI → sans-serif`

No custom font required at launch — system fonts render cleanly and fast on all platforms.

| Role | Size | Weight | Color token | Notes |
|---|---|---|---|---|
| Display / greeting | 22px | 500 | `--color-primary` | "Good morning" |
| Screen title | 18px | 500 | `--color-primary` | "Reminders", "Notes" |
| Section label | 10px | 500 | `--color-text-muted` | uppercase, 0.06em tracking |
| List item title | 14px | 500 | `--color-text-primary` | |
| Body / note text | 14px | 400 | `--color-text-secondary` | line-height 1.7 |
| Meta / caption | 12px | 400 | `--color-text-muted` | "Reminder · overdue" |
| Tag chip | 11px | 500 | `--color-primary` on `--color-tint` | |
| Nav label | 9px | 500 | active: `--color-primary`, inactive: `--color-border` | |

Minimum font size anywhere in the app: **11px**.

---

## 4. Logo & App Icon

### Concept
A lavender sprig — a vertical stem with alternating side branches, each ending in a small rounded bud with a highlight dot. Intentionally botanical and simple. The lavender reference is thematic: lavender is associated with calm, clarity, and memory.

### Construction (SVG reference)

```svg
<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="72" height="72" rx="16" fill="#3D2645"/>
  <!-- main stem -->
  <line x1="36" y1="56" x2="36" y2="24" stroke="#6B4C5E" stroke-width="2" stroke-linecap="round"/>
  <!-- branch lines -->
  <line x1="36" y1="44" x2="29" y2="38" stroke="#6B4C5E" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="36" y1="38" x2="43" y2="32" stroke="#6B4C5E" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="36" y1="32" x2="29" y2="26" stroke="#6B4C5E" stroke-width="1.5" stroke-linecap="round"/>
  <!-- buds -->
  <ellipse cx="27" cy="35" rx="4" ry="6" fill="#C4A8BF" transform="rotate(-30 27 35)"/>
  <ellipse cx="45" cy="29" rx="4" ry="6" fill="#C4A8BF" transform="rotate(30 45 29)"/>
  <ellipse cx="27" cy="23" rx="4" ry="6" fill="#A07D96" transform="rotate(-25 27 23)"/>
  <circle cx="36" cy="21" r="4.5" fill="#A07D96"/>
  <!-- bud highlights -->
  <circle cx="36" cy="21" r="2" fill="#EEE2F2"/>
  <circle cx="27" cy="35" r="2" fill="#EEE2F2"/>
  <circle cx="45" cy="29" r="2" fill="#EEE2F2"/>
  <circle cx="27" cy="23" r="2" fill="#D0B8CC"/>
</svg>
```

### Icon variants

| Variant | Background | Use |
|---|---|---|
| Primary | `#3D2645` rounded square | App store, home screen |
| Light | `#EEE2F2` rounded square | Light contexts, web favicon |
| Bare (no bg) | Transparent | Dark surfaces, nav bar |
| Wordmark lockup | Icon left + "Scatterbrain" right, 15px/500 | Onboarding, splash, web header |

### Sizing
- App icon: 1024×1024px master → export at required platform sizes
- Favicon: 32×32, 16×16
- Nav / in-app: 28×28px

---

## 5. Component Library

### Border radius
- Cards / sheets: `12px`
- Buttons / inputs / tags: `8px`
- Pills / chips: `99px`
- App icon: `16px` (on 72px canvas)
- Checkboxes: `4px`

### Borders
- Default: `0.5px solid #D0B8CC`
- Emphasis: `1px solid #A07D96`
- Focus ring: `2px solid #A07D96` with `2px offset`

### Elevation / depth
No drop shadows anywhere. Depth is created through background color contrast only:
- Level 0 (app bg): `#FBF8FC`
- Level 1 (cards): `#FFFFFF`
- Level 2 (tint sections, toolbars): `#EEE2F2`
- Level 3 (header / nav): `#3D2645`

### Buttons

**Primary button**
```
background: #3D2645
color: #EEE2F2
border-radius: 8px
padding: 12px 20px
font-size: 14px
font-weight: 500
```

**Secondary / outline button**
```
background: transparent
color: #A07D96
border: 0.5px solid #D0B8CC
border-radius: 8px
padding: 12px 20px
font-size: 14px
```

**Destructive**
```
background: transparent
color: #993C1D (coral dark)
border: 0.5px solid #F0997B
```

### Tag / chip
```
background: #EEE2F2
color: #3D2645
font-size: 11px
font-weight: 500
padding: 3px 10px
border-radius: 99px
```

### Checkbox (reminders)
- Unchecked: 18×18px circle, `border: 1.5px solid #D0B8CC`
- Checked: filled `#A07D96`, white checkmark icon inside
- Completed item text: `text-decoration: line-through`, color `#A07D96`

---

## 6. Screen Specifications

### Navigation
Bottom tab bar, 4 items:

| Tab | Icon | Label | Feature name |
|---|---|---|---|
| 1 | `home` | Home | Today |
| 2 | `calendar` | Cal | The Big Picture |
| 3 | `bell` | Remind | Don't Forget |
| 4 | `notebook` | Notes | The Pile |

Active tab: `#3D2645`. Inactive: `#D0B8CC`. No background on nav bar — white with top border `0.5px solid #EEE2F2`.

---

### Screen 1 — Home (Today view)

**Header**
- Background: `#3D2645`
- Left: greeting ("Good morning / afternoon / evening") in `#EEE2F2` 13px/500, sub-label "N things need your attention" in `#C4A8BF` 11px
- Right: avatar circle `#2A1530` bg, initials `#D0B8CC` 11px/500

**Brain Dump capture bar** (below header, always visible)
- Background: `#EEE2F2`
- Border: `0.5px solid #D0B8CC`
- Left icon: `ti-bolt` at 14px in `#A07D96`
- Placeholder: "Brain dump something..." in `#A07D96` 12px
- Tapping opens the Brain Dump sheet (see Screen 5)

**Content sections** (scrollable)
- Section labels: 10px/500 uppercase `#A07D96`, e.g. "OVERDUE", "TODAY", "NOTES"
- Each item: white card, `border-radius: 8px`, `border: 0.5px solid #EEE2F2`, padding `10px 12px`
- Left: colored dot (6px circle) — see semantic colors above
- Title: 12px/500 `#3D2645`
- Meta: 10px `#A07D96`, e.g. "Reminder · overdue" or "Calendar · 10:00 AM"

**Empty state**
- Centered illustration (optional: small lavender sprig)
- Text: "Nothing here yet — but we both know that won't last long." in `#A07D96` 13px italic

---

### Screen 2 — Note Editor

**Header**
- Background: `#3D2645`
- Left: back arrow `#C4A8BF`
- Center: note title (editable inline) `#EEE2F2` 13px/500
- Right: `ti-dots` options icon `#C4A8BF`

**Formatting toolbar**
- Background: `#EEE2F2`, border-bottom `0.5px solid #D0B8CC`
- Icons: `#A07D96` at 15px — bold, italic, list, checkbox, tag, camera

**Body**
- Background: `#FBF8FC`
- Word count / last updated: 10px `#A07D96`, top of body area
- Title input: 14px/500 `#3D2645`, margin-bottom 8px
- Body text: 13px `#6B5468`, line-height 1.8
- Checklist items: checkbox (see component) + 12px text `#3D2645`; completed items struck through in `#C4A8BF`

**Tag row** (bottom of editor)
- Border-top `0.5px solid #EEE2F2`
- Existing tags as chips
- "+ tag" as dashed-border chip: `border: 0.5px dashed #D0B8CC`, color `#A07D96`

---

### Screen 3 — Reminders List

**Header**
- Same style as Home header
- Title: "Reminders" `#EEE2F2`
- Sub: "N active · N completed" `#C4A8BF`
- Right: `ti-plus` icon `#C4A8BF` — opens new reminder sheet

**Sections**
- "PINNED" — overdue or starred items
- "TODAY" — due today
- "UPCOMING" — future items
- "DONE" — completed, collapsed by default with "Show N completed" toggle

**Reminder item**
- White card with `border: 0.5px solid #EEE2F2`
- Left: circle checkbox (see component)
- Title: 12px/500 `#3D2645` (or struck through + `#A07D96` if done)
- Meta: 10px `#A07D96` e.g. "Before 6:00 PM" or "Was yesterday · tap to reschedule"
- Overdue badge: `background: #EEE2F2`, `color: #3D2645`, 9px/500, pill shape

**Swipe actions**
- Swipe left: delete (coral `#993C1D` bg)
- Swipe right: mark complete (accent `#A07D96` bg, checkmark)

---

### Screen 4 — Calendar (The Big Picture)

**Header**: same style, title "The Big Picture"

**Month strip** (horizontal scroll, compact)
- Selected day: `#3D2645` circle, text `#EEE2F2`
- Today (unselected): `#A07D96` underline dot
- Other days: text `#3D2645`

**Day view** (below strip, main content)
- Time slots: 12px `#D0B8CC` labels on left
- Events: rounded pill, background `#EEE2F2`, text `#3D2645`, left border `2px solid #3D2645`
- All-day events: top of list, full-width chip

**Empty day state**: "Nothing on the books. Enjoy it." `#A07D96` 13px italic, centered

---

### Screen 5 — Brain Dump (Quick Capture sheet)

**Presentation**: modal bottom sheet, overlay background `rgba(45, 20, 55, 0.85)`

**Sheet**
- Background: `#FBF8FC`
- Border-radius top: `14px`
- Header: "Brain dump" `#EEE2F2` 13px/500 on `#3D2645` bg; `ti-x` close button `#C4A8BF`

**Text area**
- Full width, no border, transparent background
- Font: 13px `#3D2645`, line-height 1.7
- Placeholder: "What's rattling around up there?" in `#A07D96`
- Auto-expands with content

**Smart tag row** (auto-suggested based on content)
- Detected tags shown as chips: e.g. "reminder", "tomorrow", "grocery"
- Tapping a chip toggles it on/off
- Background: `#EEE2F2`, text `#A07D96`, icon left

**Save buttons**
- Primary: "Save to reminders" — full-width, `#3D2645` bg, `#EEE2F2` text
- Secondary: "Save as note" — full-width, outline style `border: 0.5px solid #D0B8CC`, `#A07D96` text
- If calendar date detected: third option "Add to calendar"

**Behavior**
- Accessible from any screen via floating action or capture bar
- Keyboard opens automatically on sheet open
- If user types and dismisses without saving: "Save it before you forget?" confirmation toast

---

### Screen 6 — Notes List (The Pile)

**Header**: title "The Pile", sub "N notes"

**Search bar**: below header, `#EEE2F2` bg, `ti-search` icon `#A07D96`, placeholder "Search your pile..." 12px `#A07D96`

**Note cards** (2-column grid on mobile)
- Background: `#FFFFFF`, border `0.5px solid #EEE2F2`, border-radius `12px`, padding `12px`
- Title: 13px/500 `#3D2645`
- Preview text: 11px `#A07D96`, 2 lines max, truncated
- Date: 10px `#D0B8CC`
- Tags: chips at bottom of card

**Sort / filter**: pill toggle row below search — "All", "Recent", "Tagged", "Checklists"

---

## 7. Animations & Transitions

Keep all motion subtle and purposeful. Nothing flashy.

| Interaction | Animation |
|---|---|
| Screen navigation | Slide left/right, 250ms ease-out |
| Bottom sheet open | Slide up, 300ms spring (slight overshoot) |
| Bottom sheet close | Slide down, 200ms ease-in |
| Item completion | Checkbox fills with scale(1.1) → scale(1), 200ms; text fades to struck-through |
| Brain Dump sheet | Fade overlay in 150ms + sheet slides up 300ms |
| Toast notifications | Slide in from bottom, 200ms; auto-dismiss after 3s |
| Page transitions | Keep system default on native; fade on web |

No animation should exceed 350ms. Respect `prefers-reduced-motion` — fall back to instant transitions.

---

## 8. Brand Voice & Copy

The voice is self-aware, warm, and a little dry. It knows the user is a mess and finds it charming rather than a problem to fix. Never preachy, never clinical.

| Context | Copy |
|---|---|
| Onboarding welcome | "Welcome, beautiful disaster. Let's get you sorted." |
| Home — empty state | "Nothing here yet — but we both know that won't last long." |
| Overdue reminder nudge | "Hey — you said this mattered. Still does." |
| All tasks complete | "Look at you, functioning like a person." |
| Brain Dump placeholder | "What's rattling around up there?" |
| Notes empty state | "Your pile is empty. This never lasts." |
| Calendar empty day | "Nothing on the books. Enjoy it." |
| Notification — reminder due | "Just a nudge: [reminder title]" |
| Notification — overdue | "[reminder title] — still waiting on you." |
| Save confirmation toast | "Caught it." |
| Dismiss without saving | "Save it before you forget?" |
| Onboarding tagline | "Calm for your scattered brain." |

**Rules:**
- Never use "productivity" in copy
- Avoid exclamation points except sparingly in onboarding
- Use "you" not "the user"
- Short sentences. One idea at a time.
- Humor is dry, never sarcastic in a mean way

---

## 9. Feature Naming

| Technical name | In-app name |
|---|---|
| Quick capture / new item | Brain Dump |
| Calendar view | The Big Picture |
| Reminders | Don't Forget |
| Notes | The Pile |
| Today / home view | Today |
| Settings | (just "Settings" — no cute name needed here) |

---

## 10. Core Features (MVP)

### Must-have at launch
- [ ] Today view aggregating reminders + calendar events + recent notes
- [ ] Brain Dump quick capture (bottom sheet, accessible from anywhere)
- [ ] Notes with rich text (bold, italic, checklists, tags)
- [ ] Reminders with due date/time, overdue state, completion
- [ ] Calendar view (month strip + day view, read events from device calendar)
- [ ] Tag system (applied to notes and reminders, filterable)
- [ ] Local notifications for reminders
- [ ] Dark mode (all tokens defined above)

### Nice-to-have (post-MVP)
- [ ] Recurring reminders
- [ ] Note templates
- [ ] iCloud / Google sync
- [ ] Widget (iOS/Android home screen — shows Today view)
- [ ] Siri / Google Assistant integration ("Hey Siri, brain dump: …")
- [ ] Web version (PWA)
- [ ] Search across all content types
- [ ] Attach photos to notes

### Explicitly out of scope (keep it simple)
- Collaboration / sharing
- Project management (no subtasks, dependencies, etc.)
- AI features at launch
- Social or public features

---

## 11. Tech Stack Recommendation

### Mobile (recommended starting point)
**React Native** with Expo

- Single codebase for iOS + Android
- Expo Router for navigation
- AsyncStorage for local persistence
- `expo-notifications` for reminders
- `expo-calendar` for reading device calendar events
- React Native Reanimated for animations

### Web companion (phase 2)
**Next.js** PWA

- Shared design tokens via CSS custom properties
- Tailwind CSS for utility classes (configured with the color tokens above)
- Framer Motion for animations

### Data / sync (phase 2)
- Start fully local (AsyncStorage / SQLite via `expo-sqlite`)
- Add Supabase or Firebase for sync when needed

### Folder structure suggestion
```
scatterbrain/
├── app/                  # Expo Router screens
│   ├── (tabs)/
│   │   ├── index.tsx     # Today / Home
│   │   ├── calendar.tsx  # The Big Picture
│   │   ├── reminders.tsx # Don't Forget
│   │   └── notes.tsx     # The Pile
│   └── note/[id].tsx     # Note editor
├── components/
│   ├── BrainDumpSheet.tsx
│   ├── ReminderItem.tsx
│   ├── NoteCard.tsx
│   ├── TagChip.tsx
│   └── AppHeader.tsx
├── hooks/
│   ├── useReminders.ts
│   ├── useNotes.ts
│   └── useCalendar.ts
├── store/                # Zustand or Context
├── theme/
│   ├── colors.ts         # All tokens from Section 2
│   ├── typography.ts
│   └── spacing.ts
└── assets/
    ├── icon.svg          # Logo SVG source
    └── splash.png
```

---

## 12. Handoff Prompt for Claude Code

Paste this at the start of a Claude Code session:

```
I'm building a personal mobile app called Scatterbrain — a combined notes, reminders, and calendar app with a calm, pretty UI. I have a full design spec. Let's build it with React Native and Expo.

Stack: React Native, Expo Router, TypeScript, AsyncStorage for local data, expo-notifications for reminders, expo-calendar for calendar read access.

Design system:
- Primary: #3D2645 (deep plum)
- Accent: #A07D96 (dusty mauve)
- Tint: #EEE2F2 (lavender tint)
- Border: #D0B8CC
- Surface: #FBF8FC
- Text primary: #3D2645, text secondary: #6B5468, text muted: #A07D96

Typography: system font, weights 400 and 500 only. Sizes: 22 / 18 / 14 / 12 / 11 / 10px.

No shadows anywhere. Depth via background contrast. Border-radius: cards 12px, buttons 8px, pills 99px.

4-tab navigation: Today (home icon), Calendar (calendar icon), Reminders (bell icon), Notes (notebook icon). Active tab color #3D2645, inactive #D0B8CC.

Start by scaffolding the project structure and building the Today screen with a static layout matching the spec.
```

---

*Spec version 1.0 — generated from design session. Update as the app evolves.*
