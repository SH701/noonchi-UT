"use client";

import { apiMutations } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useConversationEnd = (conversationId: number) => {
  const router = useRouter();
  return useMutation({
    mutationFn: () =>
      apiMutations.conversations.EndConversation(conversationId),
    onSuccess: () => {
      router.push(`/hub/roleplay/chatroom/${conversationId}/result`);
    },
  });
};
