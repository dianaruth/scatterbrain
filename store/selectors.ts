import { useMemo } from 'react';

import {
  calendarDayDiff,
  formatDueChip,
  formatDueMeta,
  formatNoteChip,
  formatNoteMeta,
} from '@/lib/format';

import { useItemsStore } from './items';
import type { ItemType, Note, Reminder } from './models';

export type TodayItem = {
  id: string;
  type: ItemType;
  title: string;
  typeLabel: string;
  meta: string;
  chip: string;
};

export type TodaySection = {
  num: string;
  label: string;
  items: TodayItem[];
};

type ItemsSnapshot = {
  reminders: Reminder[];
  notes: Note[];
};

/**
 * Pure builder: domain state -> the Today screen's view-model. No icons/colors here — those
 * are theme-dependent and stay in the screen component. Only reminders due today or overdue
 * (and not completed) surface; future-due reminders aren't shown on Today.
 */
export function buildTodaySections(
  state: ItemsSnapshot,
  now: Date,
): [overdue: TodaySection, today: TodaySection, notes: TodaySection] {
  const overdueItems: TodayItem[] = [];
  const todayItems: TodayItem[] = [];

  for (const reminder of state.reminders) {
    if (reminder.completed || reminder.dueAt === null) continue;
    const dayDiff = calendarDayDiff(new Date(reminder.dueAt), now);
    const item: TodayItem = {
      id: reminder.id,
      type: dayDiff < 0 ? 'overdue' : 'reminder',
      title: reminder.title,
      typeLabel: 'Reminder',
      meta: formatDueMeta(reminder.dueAt, now),
      chip: formatDueChip(reminder.dueAt, now),
    };
    if (dayDiff < 0) overdueItems.push(item);
    else if (dayDiff === 0) todayItems.push(item);
  }

  const noteItems: TodayItem[] = state.notes.map((note) => ({
    id: note.id,
    type: 'note',
    title: note.title,
    typeLabel: 'Note',
    meta: formatNoteMeta(note.updatedAt, now),
    chip: formatNoteChip(),
  }));

  return [
    { num: '01', label: 'Overdue', items: overdueItems },
    { num: '02', label: 'Today', items: todayItems },
    { num: '03', label: 'Notes', items: noteItems },
  ];
}

/** Today screen sections, live from the store. `now` is a stable Date the caller controls. */
export function useTodaySections(
  now: Date,
): [overdue: TodaySection, today: TodaySection, notes: TodaySection] {
  const reminders = useItemsStore((s) => s.reminders);
  const notes = useItemsStore((s) => s.notes);
  const nowMs = now.getTime();

  return useMemo(
    () => buildTodaySections({ reminders, notes }, new Date(nowMs)),
    [reminders, notes, nowMs],
  );
}

/** Count of overdue + due-today reminders, for the header's "N things need attention". */
export function useAttentionCount(now: Date): number {
  const [overdue, today] = useTodaySections(now);
  return overdue.items.length + today.items.length;
}
