"use client";

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
        (type, chunk) => {
          if (type === "chunk") setIsAIResponding(false);
          setTurns((prev) =>
            prev.map((t, i) => {
              if (i !== turnIndex) return t;
              if (type === "chunk") return { ...t, aiMessage: t.aiMessage + chunk };
              if (type === "approach_tip")
                return { ...t, approachTip: t.approachTip + chunk };
              if (type === "cultural_insight")
                return { ...t, culturalInsight: t.culturalInsight + chunk };
              return t;
            }),
          );
        },
        audioUrl,
      );
      if (doneData) {
        setTurns((prev) =>
          prev.map((t, i) => {
            if (i !== turnIndex) return t;
            return {
              ...t,
              messageId: doneData.ai_message_id,
              aiMessage: doneData.ai_message ?? t.aiMessage,
              approachTip: doneData.approach_tip ?? t.approachTip,
              culturalInsight: doneData.cultural_insight ?? t.culturalInsight,
              coaching: doneData.coaching ?? t.coaching,
              translatedContent:
                doneData.ai_message_translated ?? t.translatedContent,
            };
          }),
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
