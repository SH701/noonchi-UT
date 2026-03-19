import { apiMutations } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useConversationEnd = (conversationId: number) => {
  return useMutation({
    mutationFn: () =>
      apiMutations.conversations.EndConversation(conversationId),
  });
};
