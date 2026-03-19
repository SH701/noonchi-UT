import { apiFetch } from "@/api/api";
import { PagedTopicRes, TopicRes } from "@/features/roleplay/types/topics";


export const topicClient = {
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
};
