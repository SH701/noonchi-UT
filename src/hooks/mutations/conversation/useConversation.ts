import { apiMutations } from "@/api/mutations";
import { toast } from "@/components/ui/toast/toast";
import {
  AskReq,
  ConversationPaged,
  InterviewFormData,
  RoleplayReq,
} from "@/types/conversations";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useAskStream = () => {
  const [approachTip, setApproachTip] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [culturalInsight, setCulturalInsight] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);

  const mutate = async (data: AskReq) => {
    setIsPending(true);
    setApproachTip("");
    setAiMessage("");
    setCulturalInsight("");
    try {
      const result = await apiMutations.conversations.CreateAskStream(
        data,
        (type, content) => {
          if (type === "approach_tip") setApproachTip((prev) => prev + content);
          else if (type === "chunk") setAiMessage((prev) => prev + content);
          else if (type === "cultural_insight")
            setCulturalInsight((prev) => prev + content);
        },
      );
      setConversationId(result.conversation_id);
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutate,
    isPending,
    approachTip,
    aiMessage,
    culturalInsight,
    conversationId,
  };
};
export const useConversationEnd = (conversationId: number) => {
  return useMutation({
    mutationFn: () =>
      apiMutations.conversations.EndConversation(conversationId),
  });
};

export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationIds: number | number[]) => {
      const ids = Array.isArray(conversationIds)
        ? conversationIds
        : [conversationIds];
      return Promise.all(
        ids.map((id) => apiMutations.conversations.DeleteConversation(id)),
      );
    },
    onMutate: async (conversationIds: number | number[]) => {
      const ids = Array.isArray(conversationIds)
        ? conversationIds
        : [conversationIds];
      await queryClient.cancelQueries({ queryKey: ["conversations"] });
      await queryClient.cancelQueries({ queryKey: ["search"] });
      const updater = (old: ConversationPaged | undefined) => {
        if (!old) return old;
        return {
          ...old,
          content: old.content?.filter((c) => !ids.includes(c.conversationId)),
        };
      };
      queryClient.setQueriesData<ConversationPaged>(
        { queryKey: ["conversations"], exact: false },
        updater,
      );
      queryClient.setQueriesData<ConversationPaged>(
        { queryKey: ["search"], exact: false },
        updater,
      );
      return;
    },
    onError: () => {
      toast.error("Failed to delete the room. Please try again.");
    },
    onSuccess: () => {
      toast.success("Room deleted successfully.");
    },
  });
}
export const useUploadFiles = () => {
  return useMutation({
    mutationFn: apiMutations.files.UploadFiles,
  });
};

export const useCreateInterview = () => {
  return useMutation({
    mutationFn: async (data: InterviewFormData) => {
      return apiMutations.conversations.CreateInterview(data);
    },
  });
};

export const useCreateRoleplay = () => {
  return useMutation({
    mutationFn: async (data: RoleplayReq) => {
      return apiMutations.conversations.CreateRoleplay(data);
    },
  });
};
