import { apiClient, apiMutations } from "@/api";
import { ConversationFeedback } from "@/types/conversations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useConversationFeedback(conversationId: number, enabled = true) {
  return useQuery<ConversationFeedback>({
    queryKey: ["feedback", conversationId],
    queryFn: () =>
      apiClient.conversations.getConversationFeedback(conversationId),
    staleTime: Infinity,
    enabled,
  });
}
export function useConversationPostFeedback(conversationId: number) {
  const queryClient = useQueryClient();
  return useMutation<ConversationFeedback>({
    mutationFn: () =>
      apiMutations.conversations.PostConversationFeedack(conversationId),
    onSuccess: (data) => {
      queryClient.setQueryData(["feedback", conversationId], data);
    },
  });
}
