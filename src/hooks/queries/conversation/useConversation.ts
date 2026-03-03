import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  Conversation,
  ConversationDetail,
  ConversationFeedback,
  ConversationSortBy,
  FilterState,
} from "@/types/conversations";
import { apiClient } from "@/api/client";

export const useConversations = (
  filter: FilterState = null,
  sortBy: ConversationSortBy = "LAST_ACTIVITY_DESC",
  page: number = 1,
) => {
  return useQuery({
    queryKey: ["conversations", "history", filter, sortBy, page],
    queryFn: () => apiClient.conversations.getConversations(filter, sortBy, page),
    select: (data) => ({
      conversations: (data?.content ?? []).filter((c): c is Conversation => !!c?.aiPersona),
      totalPages: data.totalPages,
    }),
  });
};

export function useConversationDetail(
  conversationId?: number,
  options?: Partial<UseQueryOptions<ConversationDetail>>,
) {
  return useQuery<ConversationDetail>({
    queryKey: ["conversationDetail", conversationId],
    queryFn: () => apiClient.conversations.getDetail(conversationId!),
    ...options,
    enabled:
      options?.enabled !== false && !!conversationId && conversationId !== 0,
  });
}

export function useConversationFeedback(conversationId: number) {
  return useQuery<ConversationFeedback>({
    queryKey: ["feedback", conversationId],
    queryFn: () =>
      apiClient.conversations.getConversationFeedback(conversationId),
  });
}
