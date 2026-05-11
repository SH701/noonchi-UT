import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FeedbackMap = Record<string, string>;

interface RoleplayFeedbackState {
  byConversation: Record<number, FeedbackMap>;
  setFeedback: (conversationId: number, userContent: string, feedback: string) => void;
  getMap: (conversationId: number) => FeedbackMap;
  clear: (conversationId: number) => void;
}

export const useRoleplayFeedbackStore = create<RoleplayFeedbackState>()(
  persist(
    (set, get) => ({
      byConversation: {},
      setFeedback: (conversationId, userContent, feedback) =>
        set((s) => ({
          byConversation: {
            ...s.byConversation,
            [conversationId]: {
              ...(s.byConversation[conversationId] ?? {}),
              [userContent]: feedback,
            },
          },
        })),
      getMap: (conversationId) =>
        get().byConversation[conversationId] ?? {},
      clear: (conversationId) =>
        set((s) => {
          const next = { ...s.byConversation };
          delete next[conversationId];
          return { byConversation: next };
        }),
    }),
    {
      name: "roleplay-feedback-store",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? sessionStorage
          : (undefined as unknown as Storage),
      ),
    },
  ),
);