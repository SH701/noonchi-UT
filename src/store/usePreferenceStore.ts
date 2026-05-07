import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferenceState {
  koreanLevel: string | null;
  interests: string[];
  language: string | null;
  setKoreanLevel: (level: string) => void;
  setInterests: (list: string[]) => void;
  setLanguage: (lang: string) => void;
  resetPreferences: () => void;
}

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      koreanLevel: null,
      interests: [],
      language: null,
      setKoreanLevel: (level) => set({ koreanLevel: level }),
      setInterests: (list) => set({ interests: list }),
      setLanguage: (lang) => set({ language: lang }),
      resetPreferences: () =>
        set({ koreanLevel: null, interests: [], language: null }),
    }),
    { name: "preference" },
  ),
);
