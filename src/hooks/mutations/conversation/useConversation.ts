import { apiMutations } from "@/api";
import { toast } from "@/components/ui/toast/toast";
import {
  ConversationPaged,
  InterviewFormData,
  RoleplayReq,
} from "@/types/conversations";

import { useMutation, useQueryClient } from "@tanstack/react-query";

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
