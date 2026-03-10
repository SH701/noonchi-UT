import { create } from "zustand";

interface ChatHistoryState {
  keyword: string;
  searchKeyword: string;
  isSearchOpen: boolean;

  setKeyword: (value: string) => void;
  submitSearch: () => void;
  toggleSearch: () => void;
  reset: () => void;
}

export const useChatHistoryStore = create<ChatHistoryState>((set, get) => ({
  keyword: "",
  searchKeyword: "",
  isSearchOpen: false,
  setKeyword: (value) => set({ keyword: value }),
  submitSearch: () => set({ searchKeyword: get().keyword }),
  toggleSearch: () =>
    set((state) => ({
      isSearchOpen: !state.isSearchOpen,
    })),
  reset: () =>
    set({
      keyword: "",
      searchKeyword: "",
      isSearchOpen: false,
    }),
}));
