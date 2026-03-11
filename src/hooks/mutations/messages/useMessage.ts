import { apiClient } from "@/api/client";
import { apiMutations } from "@/api/mutations";

import { useMutation, useQuery } from "@tanstack/react-query";

export function useMessageFeedback(messageId?: number) {
  return useQuery({
    queryKey: ["feedback", messageId],
    queryFn: () => apiClient.messages.getFeedback(messageId!),
    enabled: !!messageId,
  });
}

export function useMessageTranslate() {
  return useMutation({
    mutationFn: (messageId: number) =>
      apiMutations.messages.Translate(Number(messageId)),
  });
}
