import { apiMutations } from "@/api/mutations";

import { useMutation } from "@tanstack/react-query";

export function useMessageTranslate() {
  return useMutation({
    mutationFn: (messageId: number) =>
      apiMutations.messages.Translate(Number(messageId)),
  });
}
