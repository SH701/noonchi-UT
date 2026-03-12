import { create } from "zustand";

interface ChatHistoryState {
  keyword: string;
  searchKeyword: string;
  setKeyword: (value: string) => void;
  submitSearch: () => void;
}

export const useChatHistoryStore = create<ChatHistoryState>((set, get) => ({
  keyword: "",
  searchKeyword: "",
  setKeyword: (value) => set({ keyword: value }),
  submitSearch: () => set({ searchKeyword: get().keyword }),
}));
