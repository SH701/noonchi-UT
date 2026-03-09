import { apiMutations } from "@/api/mutations";
import { AskReq, InterviewFormData, RoleplayReq } from "@/types/conversations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useAsk = () => {
  return useMutation({
    mutationFn: async (data: AskReq) => {
      return apiMutations.conversations.createAsk(data);
    },
  });
};

export const useAskStream = () => {
  const [approachTip, setApproachTip] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [culturalInsight, setCulturalInsight] = useState("");
  const [isPending, setIsPending] = useState(false);

  const mutate = async (data: AskReq) => {
    setIsPending(true);
    setApproachTip("");
    setAiMessage("");
    setCulturalInsight("");
    try {
      await apiMutations.conversations.createAskStream(
        data,
        (type, content) => {
          if (type === "approach_tip") setApproachTip((prev) => prev + content);
          else if (type === "chunk") setAiMessage((prev) => prev + content);
          else if (type === "cultural_insight")
            setCulturalInsight((prev) => prev + content);
        },
      );
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending, approachTip, aiMessage, culturalInsight };
};
export const useConversationEnd = (conversationId: number) => {
  return useMutation({
    mutationFn: () =>
      apiMutations.conversations.endConversation(conversationId),
  });
};

export function useDeleteConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (conversationId: number) =>
      apiMutations.conversations.deleteConversation(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
        exact: false,
        refetchType: "all",
      });
    },
  });
}

export const useUploadFiles = () => {
  return useMutation({
    mutationFn: apiMutations.files.uploadFiles,
  });
};

export const useCreateInterview = () => {
  return useMutation({
    mutationFn: async (data: InterviewFormData) => {
      return apiMutations.conversations.createInterview(data);
    },
  });
};

export const useCreateRoleplay = () => {
  return useMutation({
    mutationFn: async (data: RoleplayReq) => {
      return apiMutations.conversations.createRoleplay(data);
    },
  });
};
