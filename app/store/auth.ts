// src/store/auth.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

interface AuthState {
  // Token
  accessToken: string | null;

  // User local settings
  koreanLevel: Level;
  selectedFace: number | null;
  profileImageUrl: string;
  interests: string[];

  // Actions
  setAccessToken: (token: string | null) => void;
  setKoreanLevel: (level: Level) => void;
  setSelectedFace: (face: number | null) => void;
  setProfileImageUrl: (url: string) => void;
  setInterests: (list: string[]) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      koreanLevel: "BEGINNER",
      selectedFace: null,
      profileImageUrl: "",
      interests: [],

      setAccessToken: (token) =>
        set(() => ({
          accessToken: token,
        })),

      setKoreanLevel: (level) =>
        set(() => ({
          koreanLevel: level,
        })),

      setSelectedFace: (face) =>
        set(() => ({
          selectedFace: face,
        })),

      setProfileImageUrl: (url) =>
        set(() => ({
          profileImageUrl: url,
        })),

      setInterests: (list) =>
        set(() => ({
          interests: list,
        })),

      logout: () =>
        set(() => ({
          accessToken: null,
          koreanLevel: "BEGINNER",
          selectedFace: null,
          profileImageUrl: "",
          interests: [],
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        koreanLevel: state.koreanLevel,
        selectedFace: state.selectedFace,
        profileImageUrl: state.profileImageUrl,
        interests: state.interests,
      }),
    }
  )
);
