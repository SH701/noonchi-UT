import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ScreenshotAnalysis, ScreenshotStreamDoneData } from "@/features/ask/types/ask.type";

interface AskScreenshotState {
  conversationId: number | null;
  imageUrl: string | null;
  previewUrl: string | null;
  analysis: ScreenshotAnalysis | null;
  opponentAnalysis: string;
  toneAnalysis: string;
  approachTip: string;
  culturalInsight: string;
  aiMessage: string;
  doneData: ScreenshotStreamDoneData | null;
  notChatMessage: string | null;
  isStreaming: boolean;

  setConversationId: (id: number | null) => void;
  setImageUrl: (url: string | null) => void;
  setPreviewUrl: (url: string | null) => void;
  setAnalysis: (a: ScreenshotAnalysis | null) => void;
  appendOpponent: (chunk: string) => void;
  appendTone: (chunk: string) => void;
  appendApproachTip: (chunk: string) => void;
  appendCulturalInsight: (chunk: string) => void;
  appendAiMessage: (chunk: string) => void;
  setDoneData: (d: ScreenshotStreamDoneData | null) => void;
  setNotChatMessage: (m: string | null) => void;
  setIsStreaming: (b: boolean) => void;
  reset: () => void;
}

const initial = {
  conversationId: null,
  imageUrl: null,
  previewUrl: null,
  analysis: null,
  opponentAnalysis: "",
  toneAnalysis: "",
  approachTip: "",
  culturalInsight: "",
  aiMessage: "",
  doneData: null,
  notChatMessage: null,
  isStreaming: false,
};

export const useAskScreenshotStore = create<AskScreenshotState>()(
  persist(
    (set) => ({
      ...initial,
      setConversationId: (id) => set({ conversationId: id }),
      setImageUrl: (url) => set({ imageUrl: url }),
      setPreviewUrl: (url) => set({ previewUrl: url }),
      setAnalysis: (a) => set({ analysis: a }),
      appendOpponent: (chunk) =>
        set((s) => ({ opponentAnalysis: s.opponentAnalysis + chunk })),
      appendTone: (chunk) =>
        set((s) => ({ toneAnalysis: s.toneAnalysis + chunk })),
      appendApproachTip: (chunk) =>
        set((s) => ({ approachTip: s.approachTip + chunk })),
      appendCulturalInsight: (chunk) =>
        set((s) => ({ culturalInsight: s.culturalInsight + chunk })),
      appendAiMessage: (chunk) =>
        set((s) => ({ aiMessage: s.aiMessage + chunk })),
      setDoneData: (d) => set({ doneData: d }),
      setNotChatMessage: (m) => set({ notChatMessage: m }),
      setIsStreaming: (b) => set({ isStreaming: b }),
      reset: () => set(initial),
    }),
    {
      name: "ask-screenshot-store",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? sessionStorage : (undefined as unknown as Storage),
      ),
      partialize: (state) => ({
        conversationId: state.conversationId,
        imageUrl: state.imageUrl,
        previewUrl: state.previewUrl,
        analysis: state.analysis,
        opponentAnalysis: state.opponentAnalysis,
        toneAnalysis: state.toneAnalysis,
        approachTip: state.approachTip,
        culturalInsight: state.culturalInsight,
        aiMessage: state.aiMessage,
        doneData: state.doneData,
      }),
    },
  ),
);
