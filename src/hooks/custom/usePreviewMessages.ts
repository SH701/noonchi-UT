import { useCallback, useEffect, useRef, useState } from "react";
import { usePreviewRemove, usePreviewSend, usePreviewStart } from "../mutations/preview/usePreview";
import { usePreviewHint } from "@/hooks/queries";
import { PreviewAiMessage, PreviewUserMessage } from "@/types/preview";


export function usePreviewMessages() {
  const { data, mutate: startChat, isPending: isStarting } = usePreviewStart();
  const [userMessages, setUserMessages] = useState<PreviewUserMessage[]>([]);
  const [aiResponses, setAiResponses] = useState<PreviewAiMessage[]>([]);
  const [firstHiddenMessage, setFirstHiddenMessage] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const started = useRef(false);
  const ended = useRef(false);

  const {
    data: hintData,
    refetch: refetchHint,
    isFetching: isHintFetching,
  } = usePreviewHint(data?.session_id);

  const handleChunk = useCallback((chunk: string) => {
    setAiResponses((prev) => {
      const next = [...prev];
      if (next.length > 0) {
        next[next.length - 1] = { ...next[next.length - 1], content: chunk };
      }
      return next;
    });
  }, []);

  const { mutate: sendMutation, isPending: isSending } =
    usePreviewSend(handleChunk);
  const { mutate: removePreview } = usePreviewRemove();

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    startChat();
  }, [startChat]);

  useEffect(() => {
    if (
      data &&
      aiResponses.length > 0 &&
      data.max_turns === aiResponses.length &&
      !ended.current
    ) {
      ended.current = true;
      setTimeout(() => {
        removePreview(data.session_id);
        setShowPreviewModal(true);
      }, 8000);
    }
  }, [data, aiResponses, removePreview]);

  const sendMessage = (message: string, audioUrl?: string) => {
    if (!data?.session_id || !message.trim() || isSending) return;
    setUserMessages((prev) => [...prev, { content: message, feedback: "" }]);
    setAiResponses((prev) => [
      ...prev,
      {
        content: "",
        hiddenMeaning: "",
        isRevealed: false,
        translatedContent: "",
        situationDescription: "",
      },
    ]);
    sendMutation(
      {
        sessionId: data.session_id,
        userMessage: message,
        inputType: audioUrl ? "voice" : "text",
      },
      {
        onSuccess: (res) => {
          setAiResponses((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              ...next[next.length - 1],
              hiddenMeaning: res.ai_hidden_meaning,
              translatedContent: res.ai_message_en,
              situationDescription: res.situation_description ?? "",
            };
            return next;
          });
          setUserMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              ...next[next.length - 1],
              feedback: res.feedback.feedback_text,
            };
            return next;
          });
          refetchHint();
        },
        onError: () => {
          setShowPreviewModal(true);
        },
      },
    );
  };

  const toggleReveal = (idx: number) => {
    setAiResponses((prev) =>
      prev.map((msg, i) =>
        i === idx ? { ...msg, isRevealed: !msg.isRevealed } : msg,
      ),
    );
  };

  const toggleFirstHidden = () => setFirstHiddenMessage((prev) => !prev);

  return {
    data,
    hintData,
    isStarting,
    isSending,
    isHintFetching,
    userMessages,
    aiResponses,
    firstHiddenMessage,
    showPreviewModal,
    setShowPreviewModal,
    sendMessage,
    toggleReveal,
    toggleFirstHidden,
  };
}
