import { create } from "zustand";

interface UIState {
  isBottomSheetOpen: boolean;
  setBottomSheetOpen: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isBottomSheetOpen: false,
  setBottomSheetOpen: (v) => set({ isBottomSheetOpen: v }),
}));
