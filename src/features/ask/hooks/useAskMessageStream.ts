import { useState } from "react";

import { apiMutations } from "@/api";
import { AskTurn } from "../types/ask.type";

export function useAskMessageStream(conversationId: number) {
  const [turns, setTurns] = useState<AskTurn[]>([]);
  const [isAIResponding, setIsAIResponding] = useState(false);

  const sendMessage = async (content: string, audioUrl?: string) => {
    if (!conversationId || (!content && !audioUrl)) return;

    const turnIndex = turns.length;
    setTurns((prev) => [
      ...prev,
      {
        userContent: content,
        approachTip: "",
        aiMessage: "",
        culturalInsight: "",
      },
    ]);
    setIsAIResponding(true);

    try {
      const doneData = await apiMutations.messages.Asksendstream(
        conversationId,
        content,
        (chunk) => {
          setTurns((prev) =>
            prev.map((t, i) =>
              i === turnIndex ? { ...t, aiMessage: t.aiMessage + chunk } : t,
            ),
          );
        },
        audioUrl,
      );
      if (doneData) {
        setTurns((prev) =>
          prev.map((t, i) =>
            i === turnIndex ? { ...t, messageId: doneData.ai_message_id } : t,
          ),
        );
      }
    } finally {
      setIsAIResponding(false);
    }
  };

  const updateTranslation = (messageId: number, translatedContent: string) => {
    setTurns((prev) =>
      prev.map((t) =>
        t.messageId === messageId ? { ...t, translatedContent } : t,
      ),
    );
  };

  return { turns, sendMessage, isAIResponding, updateTranslation };
}
