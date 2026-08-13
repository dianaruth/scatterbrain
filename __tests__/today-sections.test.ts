import type { Note, Reminder } from '@/store/models';
import { buildTodaySections } from '@/store/selectors';

const now = new Date(2026, 7, 11, 9, 0, 0); // Aug 11, 2026, 9:00 AM

function makeReminder(overrides: Partial<Reminder>): Reminder {
  return {
    id: 'r1',
    title: 'Test reminder',
    dueAt: null,
    completed: false,
    createdAt: now.toISOString(),
    ...overrides,
  };
}

function makeNote(overrides: Partial<Note>): Note {
  return {
    id: 'n1',
    title: 'Test note',
    body: '',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    ...overrides,
  };
}

describe('buildTodaySections', () => {
  it('always returns Overdue, Today, and Notes sections in order', () => {
    const [overdue, today, notes] = buildTodaySections({ reminders: [], notes: [] }, now);
    expect([overdue.label, today.label, notes.label]).toEqual(['Overdue', 'Today', 'Notes']);
    expect([overdue.num, today.num, notes.num]).toEqual(['01', '02', '03']);
  });

  it('buckets a past-due reminder into Overdue with type "overdue"', () => {
    const r = makeReminder({ dueAt: new Date(2026, 7, 9).toISOString() });
    const [overdue, today] = buildTodaySections({ reminders: [r], notes: [] }, now);
    expect(overdue.items).toHaveLength(1);
    expect(overdue.items[0]?.type).toBe('overdue');
    expect(today.items).toHaveLength(0);
  });

  it('buckets a reminder due today into Today with type "reminder"', () => {
    const r = makeReminder({ dueAt: new Date(2026, 7, 11, 18, 0).toISOString() });
    const [overdue, today] = buildTodaySections({ reminders: [r], notes: [] }, now);
    expect(today.items).toHaveLength(1);
    expect(today.items[0]?.type).toBe('reminder');
    expect(overdue.items).toHaveLength(0);
  });

  it('excludes a future-due reminder from Today entirely', () => {
    const r = makeReminder({ dueAt: new Date(2026, 7, 15).toISOString() });
    const [overdue, today] = buildTodaySections({ reminders: [r], notes: [] }, now);
    expect(overdue.items).toHaveLength(0);
    expect(today.items).toHaveLength(0);
  });

  it('excludes completed reminders even if overdue', () => {
    const r = makeReminder({ dueAt: new Date(2026, 7, 9).toISOString(), completed: true });
    const [overdue] = buildTodaySections({ reminders: [r], notes: [] }, now);
    expect(overdue.items).toHaveLength(0);
  });

  it('excludes reminders with no due date', () => {
    const r = makeReminder({ dueAt: null });
    const [overdue, today] = buildTodaySections({ reminders: [r], notes: [] }, now);
    expect(overdue.items).toHaveLength(0);
    expect(today.items).toHaveLength(0);
  });

  it('includes all notes in the Notes section', () => {
    const n = makeNote({});
    const [, , notes] = buildTodaySections({ reminders: [], notes: [n] }, now);
    expect(notes.items).toHaveLength(1);
    expect(notes.items[0]?.type).toBe('note');
    expect(notes.items[0]?.chip).toBe('NOTE');
  });
});
