import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TopicRes } from "../types/topics.type";
import { topicMutations } from "../api/mutations";
import { toast } from "@/components/ui/toast/toast";

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (topicId: number) => topicMutations.Addfavorite(topicId),
    onMutate: async (topicId: number) => {
      await queryClient.cancelQueries({ queryKey: ["topics"] });
      const snapshot = queryClient.getQueriesData<TopicRes[]>({
        queryKey: ["topics"],
      });
      queryClient.setQueriesData<TopicRes[]>({ queryKey: ["topics"] }, (old) =>
        old?.map((t) =>
          t.topicId === topicId ? { ...t, isFavorite: true } : t,
        ),
      );
      return { snapshot };
    },
    onError: (_err, _topicId, context) => {
      context?.snapshot.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      toast.error("Failed to save to Liked !", "Please try again");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
};