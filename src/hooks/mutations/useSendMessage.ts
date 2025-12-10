import { apiFetch } from "@/lib/api/api";
import { ChatMsg } from "@/types/chatmessage";
import { useMutation } from "@tanstack/react-query";
import { normalizeChatMessage } from "../../utils/normalizeChatMessage";

interface SendMessageResponse {
  taskResult: {
    isTaskCompleted: boolean;
    isTaskAllCompleted: boolean;
    resultTaskLevel: number;
    resultTaskName: string;
  };
  messages: ChatMsg[];
}

export function useSendMessage() {
  return useMutation({
    mutationFn: async ({
      content,
      audioUrl,
      conversationId,
    }: {
      conversationId?: number;
      content?: string;
      audioUrl?: string;
    }) => {
      const data = await apiFetch<SendMessageResponse>("/api/messages", {
        method: "POST",
        body: JSON.stringify({ conversationId, content, audioUrl }),
      });

      const normalized = data.messages.map((m) => normalizeChatMessage(m));

      return {
        taskResult: data.taskResult,
        messages: normalized,
      };
    },
  });
}
