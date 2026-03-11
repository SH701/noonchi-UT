import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferenceState {
  koreanLevel: string | null;
  interests: string[];
  setKoreanLevel: (level: string) => void;
  setInterests: (list: string[]) => void;
  resetPreferences: () => void;
}

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      koreanLevel: null,
      interests: [],
      setKoreanLevel: (level) => set({ koreanLevel: level }),
      setInterests: (list) => set({ interests: list }),
      resetPreferences: () => set({ koreanLevel: null, interests: [] }),
    }),
    { name: "preference" },
  ),
);
