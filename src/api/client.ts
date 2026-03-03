import { apiFetch } from "./api";
import { User } from "@/types/user/user.type";

import { normalizeChatMessage } from "@/lib/normalizeChatMessage";
import { ChatMsg, Feedback } from "@/types/messages";
import {
  ConversationDetail,
  ConversationFeedback,
  ConversationPaged,
  ConversationSortBy,
  FilterState,
} from "@/types/conversations";
import { filterMap } from "@/constants";
import { TopicRes, PagedTopicRes } from "@/types/topics";
import { PreviewHint } from "@/types/preview/preview.type";
import axios from "axios";

export const apiClient = {
  users: {
    getMe: async (): Promise<User> => {
      return apiFetch<User>("/api/users/me");
    },
  },
  topic: {
    getTopic: async (
      category: string,
      favoritesOnly: boolean,
    ): Promise<TopicRes[]> => {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      params.set("favoritesOnly", String(favoritesOnly));
      return apiFetch<TopicRes[]>(`/api/topics?${params.toString()}`);
    },
    getRecentTopic: async (
      page: number = 1,
      size: number = 10,
    ): Promise<TopicRes[]> => {
      const res = await apiFetch<PagedTopicRes>(
        `/api/topics/recent?page=${page}&size=${size}`,
      );
      return res.content;
    },
  },
  conversations: {
    getConversations: async (
      filter: FilterState,
      sortBy: ConversationSortBy = "LAST_ACTIVITY_DESC",
      page: number = 1,
    ): Promise<ConversationPaged> => {
      const status = filter ? filterMap[filter] : null;
      const queryString = new URLSearchParams({
        sortBy,
        page: String(page),
        size: "6",
        ...(status && { status }),
      }).toString();
      return apiFetch<ConversationPaged>(`/api/conversations?${queryString}`, {
        cache: "no-cache",
      });
    },
    getDetail: async (conversationId: number): Promise<ConversationDetail> => {
      return apiFetch<ConversationDetail>(
        `/api/conversations/${conversationId}`,
        {
          cache: "no-store",
        },
      );
    },
    getConversationFeedback: async (
      conversationId: number,
    ): Promise<ConversationFeedback> => {
      return apiFetch<ConversationFeedback>(
        `/api/conversations/${conversationId}/feedback`,
        {
          cache: "no-cache",
        },
      );
    },
  },

  messages: {
    getList: async (conversationId: number): Promise<ChatMsg[]> => {
      const data = await apiFetch<{ content?: ChatMsg[] } | ChatMsg[]>(
        `/api/messages?conversationId=${conversationId}&page=1&size=20`,
        { cache: "no-store" },
      );
      const list = Array.isArray(data) ? data : (data?.content ?? []);
      const mapped = list.map((m) => normalizeChatMessage(m));
      return mapped.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    },
    getFeedback: async (messageId: number): Promise<Feedback> => {
      return apiFetch<Feedback>(`/api/messages/${messageId}/feedback`);
    },
  },
  preview: {
    getHint: async (sessionId: string): Promise<PreviewHint> => {
      const res = await axios.get<PreviewHint>(
        `${process.env.NEXT_PUBLIC_PREVIEW_BASE_URL}/preview/roleplay/${sessionId}/hints`,
        {
          headers: {
            "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
          },
        },
      );
      return res.data;
    },
  },
  language: {
    getHelp: async (conversationId: number): Promise<PreviewHint> => {
      return apiFetch<PreviewHint>(
        `/api/language/help?conversationId=${conversationId}`,
      );
    },
  },
};
