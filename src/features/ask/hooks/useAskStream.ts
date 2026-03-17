import { apiMutations } from "@/api";
import { useState } from "react";
import { AskReq } from "@/types/conversations";

export const useAskStream = () => {
  const [approachTip, setApproachTip] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [culturalInsight, setCulturalInsight] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);

  const mutate = async (data: AskReq) => {
    setIsPending(true);
    setApproachTip("");
    setAiMessage("");
    setCulturalInsight("");
    try {
      const result = await apiMutations.conversations.CreateAskStream(
        data,
        (type, content) => {
          if (type === "approach_tip") setApproachTip((prev) => prev + content);
          else if (type === "chunk") setAiMessage((prev) => prev + content);
          else if (type === "cultural_insight")
            setCulturalInsight((prev) => prev + content);
        },
      );
      setConversationId(result.conversation_id);
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutate,
    isPending,
    approachTip,
    aiMessage,
    culturalInsight,
    conversationId,
  };
};
