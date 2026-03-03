import { apiMutations } from "@/api/mutations";
import { AskReq, InterviewFormData, RoleplayReq } from "@/types/conversations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAsk = () => {
  return useMutation({
    mutationFn: async (data: AskReq) => {
      return apiMutations.conversations.createAsk(data);
    },
  });
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
