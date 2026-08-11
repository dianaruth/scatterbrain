import { create } from 'zustand';

import type { Note, Reminder } from './models';

export type { ItemType } from './models';

let idCounter = 0;
function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

// Seed data mirrors the sample items the Today screen used to hardcode, so the app still
// looks populated with no persistence layer behind it. Due dates are computed relative to
// module-load time so the demo reads correctly ("2 days overdue", "6:00 PM") whenever it runs.
function seedReminders(now: Date): Reminder[] {
  const overdueDue = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const todayDue = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0);

  return [
    {
      id: nextId('reminder'),
      title: 'Call the dentist',
      dueAt: overdueDue.toISOString(),
      completed: false,
      createdAt: overdueDue.toISOString(),
    },
    {
      id: nextId('reminder'),
      title: 'Pick up dry cleaning',
      dueAt: todayDue.toISOString(),
      completed: false,
      createdAt: now.toISOString(),
    },
  ];
}

function seedNotes(now: Date): Note[] {
  const updatedAt = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  return [
    {
      id: nextId('note'),
      title: 'Grocery ideas',
      body: '',
      createdAt: updatedAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    },
  ];
}

type ItemsState = {
  reminders: Reminder[];
  notes: Note[];
  addReminder: (input: { title: string; dueAt?: string | null }) => void;
  toggleReminder: (id: string) => void;
  removeReminder: (id: string) => void;
  addNote: (input: { title: string; body?: string }) => void;
  removeNote: (id: string) => void;
};

const seedNow = new Date();

// In-memory only — no AsyncStorage/SQLite persistence. SB-6 (Supabase sync + auth) introduces
// the real backing store and hydration; until then this resets on reload by design.
export const useItemsStore = create<ItemsState>()((set) => ({
  reminders: seedReminders(seedNow),
  notes: seedNotes(seedNow),

  addReminder: ({ title, dueAt = null }) =>
    set((state) => ({
      reminders: [
        ...state.reminders,
        {
          id: nextId('reminder'),
          title,
          dueAt,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  toggleReminder: (id) =>
    set((state) => ({
      reminders: state.reminders.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)),
    })),

  removeReminder: (id) =>
    set((state) => ({
      reminders: state.reminders.filter((r) => r.id !== id),
    })),

  addNote: ({ title, body = '' }) =>
    set((state) => {
      const now = new Date().toISOString();
      return {
        notes: [
          ...state.notes,
          { id: nextId('note'), title, body, createdAt: now, updatedAt: now },
        ],
      };
    }),

  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    })),
}));
