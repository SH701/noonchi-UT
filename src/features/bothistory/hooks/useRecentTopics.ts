import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useRecentTopics = (page: number = 1, size: number = 20) => {
  return useQuery({
    queryKey: ["recentTopics", page, size],
    queryFn: () => apiClient.topic.getRecentTopic(page, size),
  });
};
