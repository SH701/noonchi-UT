import { useQuery } from "@tanstack/react-query";
import { topicClient } from "../api/client";

export const useTopics = (category: string, favoritesOnly: boolean) => {
  return useQuery({
    queryKey: ["topics", category, favoritesOnly],
    queryFn: () => topicClient.getTopic(category, favoritesOnly),
    staleTime: 1000 * 60 * 5,
  });
};
