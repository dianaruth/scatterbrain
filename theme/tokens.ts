// Design tokens ported from mockups/directions.html — the approved visual contract.

// ─── Typography ──────────────────────────────────────────────────────────────

export const fonts = {
  heading: 'PlayfairDisplay_400Regular_Italic',
  headingBold: 'PlayfairDisplay_700Bold_Italic',
  bodyRegular: 'PlusJakartaSans_400Regular',
  bodyMedium: 'PlusJakartaSans_500Medium',
  bodySemiBold: 'PlusJakartaSans_600SemiBold',
  mono: 'DMMono_400Regular',
} as const;

export const fontSizes = {
  display: 32,
  screenTitle: 22,
  sectionLabel: 10,
  itemTitle: 14,
  body: 14,
  meta: 12,
  tagChip: 11,
  navLabel: 9,
} as const;

export const lineHeights = {
  body: 1.7,
  tight: 1.2,
} as const;

// ─── Radii ───────────────────────────────────────────────────────────────────

export const radii = {
  card: 6,
  nav: 18,
  chip: 3,
  badge: 5,
  captureBar: 8,
  avatar: 6,
  button: 8,
  checkbox: 4,
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

// ─── Per-type accent colors (same in both modes) ─────────────────────────────

export const typeColors = {
  overdue: {
    accent: '#F87171',
    badgeBgDark: 'rgba(248,113,113,0.14)',
    badgeBgLight: 'rgba(248,113,113,0.12)',
  },
  calendar: {
    accent: '#818CF8',
    badgeBgDark: 'rgba(129,140,248,0.14)',
    badgeBgLight: 'rgba(129,140,248,0.12)',
  },
  reminder: {
    accent: '#FBBF24',
    badgeBgDark: 'rgba(251,191,36,0.13)',
    badgeBgLight: 'rgba(251,191,36,0.12)',
  },
  note: {
    accent: '#34D399',
    badgeBgDark: 'rgba(52,211,153,0.13)',
    badgeBgLight: 'rgba(52,211,153,0.12)',
  },
} as const;

// ─── Color palettes ──────────────────────────────────────────────────────────

export const colors = {
  dark: {
    bg: '#0D0A1A',
    headerGradient: ['#1C0A38', '#2E1468', '#0E1050'] as const,
    greeting: '#F0EAFF',
    subText: 'rgba(180,160,220,0.5)',
    captureBarBg: '#161028',
    captureBarBorder: '#261E44',
    captureBarPlaceholder: '#3A2E5A',
    cardBg: '#141030',
    cardBorder: '#221A3E',
    cardTitle: '#E8E0FF',
    cardMeta: '#3A3060',
    sectionLine: '#221A3E',
    sectionOverdueAccent: 'rgba(248,113,113,0.5)',
    sectionTodayAccent: 'rgba(180,160,220,0.4)',
    sectionEmptyAccent: 'rgba(52,211,153,0.4)',
    nav: '#141030',
    navBorder: '#221A3E',
    navActive: '#A090F0',
    navInactive: 'rgba(180,160,220,0.4)',
    avatarGradient: ['#7C3AED', '#A78BFA'] as const,
    inputIcon: '#3A2E5A',
    textPrimary: '#F0EAFF',
    textSecondary: 'rgba(180,160,220,0.7)',
    textMuted: 'rgba(180,160,220,0.45)',
    destructive: '#F87171',
    destructiveBorder: 'rgba(248,113,113,0.4)',
  },
  light: {
    bg: '#F8E3EE',
    bgGradient: ['#F8E3EE', '#EDE5F8', '#E3F3EC'] as const,
    headerGradient: ['#EDD0E6', '#D8C8F8', '#E8E0F8'] as const,
    greeting: '#18103A',
    subText: 'rgba(60,40,100,0.5)',
    captureBarBg: '#FFFFFF',
    captureBarBorder: '#E0D5F0',
    captureBarPlaceholder: '#A898C8',
    cardBg: '#FFFFFF',
    cardBorder: '#EAE5F5',
    cardTitle: '#18103A',
    cardMeta: '#8870B0',
    sectionLine: '#E2DAF2',
    sectionOverdueAccent: 'rgba(210,70,70,0.55)',
    sectionTodayAccent: 'rgba(90,100,200,0.45)',
    sectionEmptyAccent: 'rgba(20,160,110,0.5)',
    nav: 'rgba(255,255,255,0.88)',
    navBorder: '#E4DDF5',
    navActive: '#5040A0',
    navInactive: '#C0B0D8',
    avatarGradient: ['#7C3AED', '#A78BFA'] as const,
    inputIcon: '#A898C8',
    textPrimary: '#18103A',
    textSecondary: '#5A4878',
    textMuted: '#8870B0',
    destructive: '#993C1D',
    destructiveBorder: '#F0997B',
  },
} as const;

export type ColorScheme = keyof typeof colors;
