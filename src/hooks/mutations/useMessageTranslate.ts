import { apiMutations } from "@/api";

import { useMutation } from "@tanstack/react-query";

export function useMessageTranslate() {
  return useMutation({
    mutationFn: (messageId: number) =>
      apiMutations.messages.Translate(Number(messageId)),
  });
}
