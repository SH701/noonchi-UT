import { topicClient } from "@/features/hub/api/client";
import { useQuery } from "@tanstack/react-query";

export const useRecentTopics = (page: number = 1, size: number = 20) => {
  return useQuery({
    queryKey: ["recentTopics", page, size],
    queryFn: () => topicClient.getRecentTopic(page, size),
  });
};
