import { apiFetch } from "@/api/api";
import {
  Conversation,
  ConversationFeedback,
  ConversationPaged,
  ConversationSortBy,
  FilterState,
} from "@/types/conversations";
import { filterMap } from "@/constants";

export const conversationsClient = {
  getConversations: async (
    filter: FilterState,
    sortBy: ConversationSortBy = "LAST_ACTIVITY_DESC",
    page: number = 1,
    size: number = 20,
    conversationType = "",
  ): Promise<ConversationPaged> => {
    const status = filter ? filterMap[filter] : null;
    const queryString = new URLSearchParams({
      sortBy,
      page: String(page),
      size: String(size),
      conversationType: conversationType,
      ...(status && { status }),
    }).toString();
    return apiFetch<ConversationPaged>(`/api/conversations?${queryString}`, {
      cache: "no-cache",
    });
  },
  getDetail: async (conversationId: number): Promise<Conversation> => {
    return apiFetch<Conversation>(`/api/conversations/${conversationId}`, {
      cache: "no-store",
    });
  },
  getConversationFeedback: async (
    conversationId: number,
  ): Promise<ConversationFeedback> => {
    return apiFetch<ConversationFeedback>(
      `/api/conversations/${conversationId}/feedback`,
      { cache: "no-cache" },
    );
  },
  getConversationSearch: async (
    keyword: string,
  ): Promise<ConversationPaged> => {
    return apiFetch<ConversationPaged>(
      `/api/conversations/search?keyword=${encodeURIComponent(keyword)}`,
      { cache: "no-cache" },
    );
  },
};
