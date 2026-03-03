import { create } from "zustand";

interface TabState {
  isOpen: boolean;
  openTab: () => void;
  closeTab: () => void;
  toggleTab: () => void;
}

export const useTabStore = create<TabState>((set) => ({
  isOpen: false,
  openTab: () => set({ isOpen: true }),
  closeTab: () => set({ isOpen: false }),
  toggleTab: () => set((state) => ({ isOpen: !state.isOpen })),
}));
