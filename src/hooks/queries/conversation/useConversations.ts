import { useQuery } from "@tanstack/react-query";
import {
  Conversation,
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
