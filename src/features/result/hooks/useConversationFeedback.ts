import { apiClient } from "@/api";
import { ConversationFeedback } from "@/types/conversations";
import { useQuery } from "@tanstack/react-query";

export function useConversationFeedback(conversationId: number) {
  return useQuery<ConversationFeedback>({
    queryKey: ["feedback", conversationId],
    queryFn: () =>
      apiClient.conversations.getConversationFeedback(conversationId),
    staleTime: Infinity,
  });
}