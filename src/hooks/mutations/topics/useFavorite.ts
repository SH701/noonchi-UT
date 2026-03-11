import { apiMutations } from "@/api";
import { toast } from "@/components/ui/toast/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (topicId: number) => apiMutations.topic.Addfavorite(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      toast.favorite();
    },
    onError: () => {
      toast.error("Failed to save to Liked !", "Please try again");
    },
  });
};
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (topicId: number) => apiMutations.topic.Removefavorite(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      toast.success("Removed from favorites!");
    },
  });
};
