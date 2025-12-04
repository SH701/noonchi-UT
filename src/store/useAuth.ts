import { Interest, Level, Role, User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";




export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  me: User | null;

  koreanLevel: Level;
  selectedFace: number | null;
  profileImageUrl: string;
  interests: Interest[];
  role: Role;

  setMe: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setKoreanLevel: (level: Level) => void;
  setSelectedFace: (face: number | null) => void;
  setProfileImageUrl: (url: string) => void;
  setInterests: (list: Interest[]) => void;
  setRole: (role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      me: null,
      role: "ROLE_GUEST",
      koreanLevel: "BEGINNER",
      selectedFace: null,
      profileImageUrl: "",
      interests: [],

      setMe: (user) => set({ me: user }),

      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setKoreanLevel: (level) => set({ koreanLevel: level }),
      setSelectedFace: (face) => set({ selectedFace: face }),
      setProfileImageUrl: (url) => set({ profileImageUrl: url }),
      setInterests: (list) => set({ interests: list }),
      setRole: (role) => set({ role }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          me: null,
          koreanLevel: "BEGINNER",
          role: "ROLE_GUEST",
          selectedFace: null,
          profileImageUrl: "",
          interests: [],
        }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        me: state.me,
        role: state.role,
        koreanLevel: state.koreanLevel,
        selectedFace: state.selectedFace,
        profileImageUrl: state.profileImageUrl,
        interests: state.interests,
      }),
    }
  )
);
