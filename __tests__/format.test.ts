import {
  calendarDayDiff,
  formatDueChip,
  formatDueMeta,
  formatNoteChip,
  formatNoteMeta,
} from '@/lib/format';

const now = new Date(2026, 7, 11, 9, 0, 0); // Aug 11, 2026, 9:00 AM

describe('calendarDayDiff', () => {
  it('is 0 for the same calendar day regardless of time', () => {
    const other = new Date(2026, 7, 11, 23, 59, 0);
    expect(calendarDayDiff(other, now)).toBe(0);
  });

  it('is negative for a date in the past', () => {
    const other = new Date(2026, 7, 9, 0, 0, 0);
    expect(calendarDayDiff(other, now)).toBe(-2);
  });

  it('is positive for a date in the future', () => {
    const other = new Date(2026, 7, 13, 0, 0, 0);
    expect(calendarDayDiff(other, now)).toBe(2);
  });
});

describe('formatDueMeta', () => {
  it('returns empty string for no due date', () => {
    expect(formatDueMeta(null, now)).toBe('');
  });

  it('formats an overdue date as "N days overdue"', () => {
    const due = new Date(2026, 7, 9, 12, 0, 0).toISOString();
    expect(formatDueMeta(due, now)).toBe('2 days overdue');
  });

  it('uses singular "day" for exactly one day overdue', () => {
    const due = new Date(2026, 7, 10, 12, 0, 0).toISOString();
    expect(formatDueMeta(due, now)).toBe('1 day overdue');
  });

  it('formats a same-day due date as a 12-hour time', () => {
    const due = new Date(2026, 7, 11, 18, 0, 0).toISOString();
    expect(formatDueMeta(due, now)).toBe('6:00 PM');
  });

  it('formats tomorrow as "Tomorrow"', () => {
    const due = new Date(2026, 7, 12, 9, 0, 0).toISOString();
    expect(formatDueMeta(due, now)).toBe('Tomorrow');
  });
});

describe('formatDueChip', () => {
  it('returns empty string for no due date', () => {
    expect(formatDueChip(null, now)).toBe('');
  });

  it('returns "LATE" for any overdue date', () => {
    const due = new Date(2026, 7, 9, 12, 0, 0).toISOString();
    expect(formatDueChip(due, now)).toBe('LATE');
  });

  it('formats a same-day due date as 24-hour time', () => {
    const due = new Date(2026, 7, 11, 18, 0, 0).toISOString();
    expect(formatDueChip(due, now)).toBe('18:00');
  });
});

describe('formatNoteMeta', () => {
  it('formats today as "edited today"', () => {
    expect(formatNoteMeta(now.toISOString(), now)).toBe('edited today');
  });

  it('formats yesterday as "edited yesterday"', () => {
    const updated = new Date(2026, 7, 10, 9, 0, 0).toISOString();
    expect(formatNoteMeta(updated, now)).toBe('edited yesterday');
  });

  it('formats further past dates as "edited N days ago"', () => {
    const updated = new Date(2026, 7, 5, 9, 0, 0).toISOString();
    expect(formatNoteMeta(updated, now)).toBe('edited 6 days ago');
  });
});

describe('formatNoteChip', () => {
  it('is always "NOTE"', () => {
    expect(formatNoteChip()).toBe('NOTE');
  });
});
