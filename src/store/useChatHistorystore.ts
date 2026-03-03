import { create } from "zustand";

interface ChatHistoryState {
  keyword: string;
  isSearchOpen: boolean;

  setKeyword: (value: string) => void;
  toggleSearch: () => void;
  reset: () => void;
}

export const useChatHistoryStore = create<ChatHistoryState>((set) => ({
  keyword: "",
  isSearchOpen: false,
  setKeyword: (value) => set({ keyword: value }),
  toggleSearch: () =>
    set((state) => ({
      isSearchOpen: !state.isSearchOpen,
    })),
  reset: () =>
    set({
      keyword: "",
      isSearchOpen: false,
    }),
}));
