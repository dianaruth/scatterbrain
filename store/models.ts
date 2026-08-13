// Domain models for SB-4's local data layer. In-memory only — see store/items.ts.
// Persistence (AsyncStorage/SQLite) and sync are deferred to SB-6 (Supabase + auth).

export type ItemType = 'overdue' | 'calendar' | 'reminder' | 'note';

export type Reminder = {
  id: string;
  title: string;
  /** ISO 8601 timestamp, or null for a reminder with no due date. */
  dueAt: string | null;
  completed: boolean;
  /** ISO 8601 timestamp. */
  createdAt: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  /** ISO 8601 timestamp. */
  createdAt: string;
  /** ISO 8601 timestamp. */
  updatedAt: string;
};
