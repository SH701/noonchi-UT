import { apiMutations } from "@/api";
import { useAskScreenshotStore } from "@/store/useAskScreenshotStore";

export const useAskScreenshotStream = () => {
  const store = useAskScreenshotStore();

  const start = async (
    imageUrl: string,
    confirmedTarget?: string | null,
    confirmedCloseness?: string | null,
    onSession?: (id: number) => void,
  ) => {
    store.reset();
    store.setImageUrl(imageUrl);
    store.setIsStreaming(true);
    try {
      const result = await apiMutations.conversations.CreateAskScreenshotStream(
        imageUrl,
        (type, content) => {
          if (type === "opponent_analysis") store.appendOpponent(content);
          else if (type === "tone_analysis") store.appendTone(content);
          else if (type === "approach_tip") store.appendApproachTip(content);
          else if (type === "cultural_insight")
            store.appendCulturalInsight(content);
          else if (type === "chunk") store.appendAiMessage(content);
        },
        (analysisData) => store.setAnalysis(analysisData),
        (message) => store.setNotChatMessage(message),
        (id) => {
          store.setConversationId(id);
          onSession?.(id);
        },
        confirmedTarget,
        confirmedCloseness,
      );
      if (result) store.setDoneData(result);
      return result;
    } finally {
      store.setIsStreaming(false);
    }
  };

  return {
    start,
    reset: store.reset,
    isStreaming: store.isStreaming,
    conversationId: store.conversationId,
    analysis: store.analysis,
    opponentAnalysis: store.opponentAnalysis,
    toneAnalysis: store.toneAnalysis,
    approachTip: store.approachTip,
    culturalInsight: store.culturalInsight,
    aiMessage: store.aiMessage,
    doneData: store.doneData,
    notChatMessage: store.notChatMessage,
  };
};
