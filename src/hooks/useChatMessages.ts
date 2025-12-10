import { useEffect, useMemo, useState } from "react";
import { ChatMsg } from "@/types/chatmessage";
import { useMessageFeedback } from "./mutations/useMessageFeedback";
import { useSendMessage } from "./mutations/useSendMessage";
import { useChatQuery } from "./queries/useChatQuery";

export function useChatMessages(conversationId?: number) {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [initialized, setInitialized] = useState(false);

  const { data: initialMessages = [], isLoading: isMessagesLoading } =
    useChatQuery(conversationId ? String(conversationId) : undefined);

  const { mutateAsync: sendMutation, isPending } = useSendMessage();
  const { mutate: createFeedback } = useMessageFeedback(conversationId ?? 0);

  useEffect(() => {
    if (!initialized && initialMessages.length > 0) {
      setMessages(initialMessages);
      setInitialized(true);
    }
  }, [initialized, initialMessages]);

  const isAIResponding = useMemo(
    () => messages.some((m) => m.isLoading && m.type === "AI"),
    [messages]
  );

  const sendMessage = async (content?: string, audioUrl?: string) => {
    if (!conversationId) return;
    if (!content && !audioUrl) return;

    const tempId = "temp-" + Date.now();

    const optimistic: ChatMsg = {
      messageId: tempId,
      conversationId,
      type: "USER",
      content: content ?? "[Voice Message]",
      audioUrl: audioUrl ?? null,
      createdAt: new Date().toISOString(),
    };

    const loadingBubble: ChatMsg = {
      messageId: "ai-loading",
      conversationId,
      type: "AI",
      content: "",
      audioUrl: null,
      createdAt: new Date().toISOString(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, optimistic, loadingBubble]);
   
    try {
      const res = await sendMutation({ conversationId, content, audioUrl });
      const responseMessages = res.messages;

      const serverUserMsg = responseMessages.find((m) => m.type === "USER");
      const aiMsg = responseMessages.find((m) => m.type === "AI");

      setMessages((prev) => {
        const filtered = prev.filter(
          (msg) => msg.messageId !== tempId && msg.messageId !== "ai-loading"
        );
        return [...filtered, serverUserMsg!, aiMsg!];
      });
    } catch (err) {
      console.error("sendMessage error", err);
      setMessages((prev) => prev.filter((msg) => msg.messageId !== tempId));
    }
  };

  const [feedbackOpenId, setFeedbackOpenId] = useState<string | null>(null);

  const handleFeedbacks = (messageId: string) => {
    if (feedbackOpenId === messageId) {
      setFeedbackOpenId(null);
      return;
    }

    const targetMessage = messages.find((m) => m.messageId === messageId);
    if (targetMessage?.feedback) {
      setFeedbackOpenId(messageId);
      return;
    }

    createFeedback(messageId, {
      onSuccess: (feedback) => {
        setMessages((prev) =>
          prev.map((m) => (m.messageId === messageId ? { ...m, feedback } : m))
        );
        setFeedbackOpenId(messageId);
      },
    });
  };

  return {
    messages,
    isMessagesLoading,
    sendMessage,
    isAIResponding,
    feedbackOpenId,
    handleFeedbacks,
    isSending: isPending,
  };
}
