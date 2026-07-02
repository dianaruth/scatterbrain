import { create } from 'zustand';

export type ItemType = 'overdue' | 'calendar' | 'reminder' | 'note';

export type Item = {
  id: string;
  type: ItemType;
  title: string;
  createdAt: string;
};

type ItemsState = {
  items: Item[];
};

export const useItemsStore = create<ItemsState>()(() => ({
  items: [],
}));
