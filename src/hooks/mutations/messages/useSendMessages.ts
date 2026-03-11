import { useState } from "react";
import { AskTurn, ChatMsg } from "@/types/messages";

import { apiMutations } from "@/api";

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

export function useRoleMessageStream(conversationId: number) {
  const [streamMessages, setStreamMessages] = useState<ChatMsg[]>([]);
  const [isAIResponding, setIsAIResponding] = useState(false);

  const sendStreamMessage = async (content?: string, audioUrl?: string) => {
    if (!conversationId || (!content && !audioUrl)) return;

    const tempUserId = -Date.now();
    const userMsg: ChatMsg = {
      messageId: tempUserId,
      conversationId,
      type: "USER",
      content: content ?? "[Voice Message]",
      audioUrl: audioUrl ?? null,
      createdAt: new Date().toISOString(),
      hiddenMeaning: "",
      visualAction: "",
      situationDescription: "",
    };

    setStreamMessages((prev) => [...prev, userMsg]);
    setIsAIResponding(true);

    const tempAiId = -Date.now() - 1;
    setStreamMessages((prev) => [
      ...prev,
      {
        messageId: tempAiId,
        conversationId,
        type: "AI",
        content: "",
        audioUrl: null,
        createdAt: new Date().toISOString(),
        hiddenMeaning: "",
        visualAction: "",
        situationDescription: "",
        isLoading: true,
      },
    ]);

    try {
      const doneData = await apiMutations.messages.RoleplaysendStream(
        conversationId,
        content ?? "",
        (chunk, type) => {
          if (type === "situation") {
            setStreamMessages((prev) => {
              const aiIdx = prev.findIndex((m) => m.messageId === tempAiId);
              const systemMsg = {
                messageId: -Date.now() - 2,
                conversationId,
                type: "SYSTEM" as const,
                content: chunk,
                createdAt: new Date().toISOString(),
                hiddenMeaning: "",
                visualAction: "",
                situationDescription: "",
              };
              if (aiIdx === -1) return [...prev, systemMsg];
              return [...prev.slice(0, aiIdx), systemMsg, ...prev.slice(aiIdx)];
            });
          } else {
            setStreamMessages((prev) =>
              prev.map((m) =>
                m.messageId === tempAiId
                  ? { ...m, content: m.content + chunk, isLoading: false }
                  : m,
              ),
            );
          }
        },
      );
      if (doneData) {
        setStreamMessages((prev) =>
          prev.map((m) => {
            if (m.messageId === tempAiId) {
              return {
                ...m,
                hiddenMeaning: doneData.ai_hidden_meaning,
                translatedContent: doneData.ai_message_en,
                visualAction: doneData.visual_action,
              };
            }
            if (m.messageId === tempUserId) {
              return { ...m, streamFeedback: doneData.feedback.feedback_text };
            }
            return m;
          }),
        );
      }
    } finally {
      setIsAIResponding(false);
    }
  };

  return { streamMessages, sendStreamMessage, isAIResponding };
}
