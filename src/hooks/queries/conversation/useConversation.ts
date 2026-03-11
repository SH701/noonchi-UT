import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
  UseQueryOptions,
} from "@tanstack/react-query";
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
  size: number = 20,
) => {
  return useQuery({
    queryKey: ["conversations", "history", filter, sortBy, page, size],
    queryFn: () =>
      apiClient.conversations.getConversations(filter, sortBy, page, size),
    select: (data) => ({
      conversations: (data?.content ?? []).filter(
        (c): c is Conversation => !!c?.aiPersona,
      ),
      totalPages: data.totalPages,
    }),
    placeholderData: keepPreviousData,
  });
};

export const useInfiniteConversations = (
  filter: FilterState = null,
  sortBy: ConversationSortBy = "LAST_ACTIVITY_DESC",
  size: number = 20,
) => {
  return useInfiniteQuery({
    queryKey: ["conversations", "infinite", filter, sortBy, size],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.conversations.getConversations(
        filter,
        sortBy,
        pageParam as number,
        size,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.pageNumber + 2,
    select: (data) => {
      const seen = new Set<number>();
      const conversations = data.pages
        .flatMap((page) => page.content)
        .filter((c): c is Conversation => !!c?.aiPersona)
        .filter((c) => {
          if (seen.has(c.conversationId)) return false;
          seen.add(c.conversationId);
          return true;
        });
      return { pages: data.pages, conversations };
    },
  });
};

export const useConversationSearch = (
  keyword: string,
  conversationType?: "ROLE_PLAYING" | "ASK",
) => {
  return useQuery({
    queryKey: ["conversations", "search", keyword, conversationType],
    queryFn: () => apiClient.conversations.getConversationSearch(keyword),
    enabled: keyword.trim().length > 0,
    select: (data) => ({
      conversations: (data?.content ?? [])
        .filter((c): c is Conversation => !!c?.aiPersona)
        .filter(
          (c) => !conversationType || c.conversationType === conversationType,
        ),
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
