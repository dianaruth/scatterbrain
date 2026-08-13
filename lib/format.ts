// Pure formatting helpers for turning domain timestamps into the display strings the
// Today screen's cards expect (`meta` and `chip`). Kept free of React/JSX so they're
// plain-function unit-testable.

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Calendar-day difference between `a` and `b` (a - b), ignoring time of day. */
export function calendarDayDiff(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((startOfDay(a).getTime() - startOfDay(b).getTime()) / msPerDay);
}

function formatTime12h(d: Date): string {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function formatTime24h(d: Date): string {
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

function formatShortDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
}

/**
 * Human meta string for a reminder's due date, e.g. "2 days overdue", "6:00 PM", "Tomorrow".
 * Returns '' when there is no due date.
 */
export function formatDueMeta(dueAt: string | null, now: Date): string {
  if (dueAt === null) return '';
  const due = new Date(dueAt);
  const dayDiff = calendarDayDiff(due, now);

  if (dayDiff < 0) {
    const n = Math.abs(dayDiff);
    return `${n} day${n === 1 ? '' : 's'} overdue`;
  }
  if (dayDiff === 0) return formatTime12h(due);
  if (dayDiff === 1) return 'Tomorrow';
  return formatShortDate(due);
}

/**
 * Short chip string for a reminder's due date, e.g. "LATE", "18:00", "AUG 15".
 * Returns '' when there is no due date.
 */
export function formatDueChip(dueAt: string | null, now: Date): string {
  if (dueAt === null) return '';
  const due = new Date(dueAt);
  const dayDiff = calendarDayDiff(due, now);

  if (dayDiff < 0) return 'LATE';
  if (dayDiff === 0) return formatTime24h(due);
  return formatShortDate(due);
}

/** Human meta string for a note's last-edited time, e.g. "edited yesterday". */
export function formatNoteMeta(updatedAt: string, now: Date): string {
  const updated = new Date(updatedAt);
  const dayDiff = calendarDayDiff(updated, now);

  if (dayDiff === 0) return 'edited today';
  if (dayDiff === -1) return 'edited yesterday';
  if (dayDiff < -1) return `edited ${Math.abs(dayDiff)} days ago`;
  return 'edited today';
}

/** Chip string for a note card. Constant, but exposed as a function for symmetry/testability. */
export function formatNoteChip(): string {
  return 'NOTE';
}
