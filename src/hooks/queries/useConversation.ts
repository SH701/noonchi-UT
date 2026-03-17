import {
  useQuery,
  keepPreviousData,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  Conversation,
  ConversationSortBy,
  FilterState,
} from "@/types/conversations";
import { apiClient } from "@/api";

export const useConversations = (
  filter: FilterState = null,
  sortBy: ConversationSortBy = "LAST_ACTIVITY_DESC",
  page: number = 1,
  size: number = 20,
  conversationType?: "ROLE_PLAYING" | "ASK",
) => {
  return useQuery({
    queryKey: [
      "conversations",
      "history",
      filter,
      sortBy,
      page,
      size,
      conversationType,
    ],
    queryFn: () =>
      apiClient.conversations.getConversations(
        filter,
        sortBy,
        page,
        size,
        conversationType,
      ),
    select: (data) => ({
      conversations: (data?.content ?? []).filter(
        (c): c is Conversation => !!c,
      ),
      totalPages: data.totalPages,
    }),
    placeholderData: keepPreviousData,
  });
};

export const useConversationSearch = (keyword: string) => {
  return useQuery({
    queryKey: ["search", keyword],
    queryFn: () => apiClient.conversations.getConversationSearch(keyword),
    enabled: keyword.trim().length > 0,
    select: (data) => ({
      conversations: (data?.content ?? []).filter(
        (c): c is Conversation =>
          !!c?.aiPersona.aiRole ||
          !!c?.aiPersona.userRole ||
          !!c?.conversationTopic,
      ),
    }),
  });
};

export function useConversationDetail(
  conversationId?: number,
  options?: Partial<UseQueryOptions<Conversation>>,
) {
  return useQuery<Conversation>({
    queryKey: ["conversationDetail", conversationId],
    queryFn: () => apiClient.conversations.getDetail(conversationId!),
    ...options,
    enabled:
      options?.enabled !== false && !!conversationId && conversationId !== 0,
  });
}


