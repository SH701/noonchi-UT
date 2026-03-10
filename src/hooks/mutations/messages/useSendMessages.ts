import { useMemo, useState } from "react";
import { ChatMsg } from "@/types/messages";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChatQuery } from "@/hooks/queries/messages/useChatQuery";
import { apiMutations } from "@/api";

interface SendParams {
  conversationId: number;
  content?: string;
  audioUrl?: string;
}

export function useSendMessages(
  conversationId: number,
  mutationFn: (params: SendParams) => Promise<ChatMsg>,
) {
  const [optimisticMessages, setOptimisticMessages] = useState<ChatMsg[]>([]);
  const queryClient = useQueryClient();

  const { data: serverMessages = [] } = useChatQuery(conversationId);

  const { mutateAsync: sendMutation, isPending } = useMutation({
    mutationFn,
  });

  const messages = useMemo(() => {
    if (optimisticMessages.length === 0) return serverMessages;

    const optimisticIds = new Set(optimisticMessages.map((m) => m.messageId));
    const merged = [
      ...serverMessages.filter((m) => !optimisticIds.has(m.messageId)),
      ...optimisticMessages,
    ];

    return merged.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, [serverMessages, optimisticMessages]);

  const isAIResponding = useMemo(
    () => messages.some((m) => m.isLoading && m.type === "AI"),
    [messages],
  );

  const sendMessage = async (content?: string, audioUrl?: string) => {
    if (!conversationId) return;
    if (!content && !audioUrl) return;

    const tempId = -Date.now();

    const optimistic: ChatMsg = {
      messageId: tempId,
      conversationId,
      type: "USER",
      content: content ?? "[Voice Message]",
      audioUrl: audioUrl ?? null,
      createdAt: new Date().toISOString(),
      hiddenMeaning: "",
      visualAction: "",
      situationDescription: "",
    };

    const loadingBubble: ChatMsg = {
      messageId: tempId - 1,
      conversationId,
      type: "AI",
      content: "",
      audioUrl: null,
      createdAt: new Date().toISOString(),
      isLoading: true,
      hiddenMeaning: "",
      visualAction: "",
      situationDescription: "",
    };

    setOptimisticMessages([optimistic, loadingBubble]);

    try {
      await sendMutation({ conversationId, content, audioUrl });

      setOptimisticMessages([]);

      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversationDetail"],
      });
    } catch (err) {
      console.error("sendMessage error", err);
      setOptimisticMessages([]);
    }
  };

  return {
    messages,
    sendMessage,
    isAIResponding,
    isSending: isPending,
  };
}

export function useAskMessages(conversationId: number) {
  return useSendMessages(conversationId, (params) =>
    apiMutations.messages.asksend(
      params.conversationId,
      params.content,
      params.audioUrl,
    ),
  );
}
interface AskTurn {
  userContent: string;
  approachTip: string;
  aiMessage: string;
  culturalInsight: string;
}

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
      const doneData = await apiMutations.messages.asksendstream(
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
            i === turnIndex
              ? {
                  ...t,
                }
              : t,
          ),
        );
      }
    } finally {
      setIsAIResponding(false);
    }
  };

  return { turns, sendMessage, isAIResponding };
}
export function useRoleplayMessages(conversationId: number) {
  return useSendMessages(conversationId, (params) =>
    apiMutations.messages.roleplaysend(
      params.conversationId,
      params.content,
      params.audioUrl,
    ),
  );
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
      const doneData = await apiMutations.messages.roleplaysendStream(
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
                audioUrl: null,
                createdAt: new Date().toISOString(),
                hiddenMeaning: "",
                visualAction: "",
                situationDescription: "",
              };
              if (aiIdx === -1) return [...prev, systemMsg];
              return [
                ...prev.slice(0, aiIdx),
                systemMsg,
                ...prev.slice(aiIdx),
              ];
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