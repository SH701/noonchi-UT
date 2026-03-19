import { apiMutations } from "@/api";
import { RoleplayReq } from "@/types/conversations";
import { useMutation } from "@tanstack/react-query";

export const useCreateRoleplay = () => {
  return useMutation({
    mutationFn: async (data: RoleplayReq) => {
      return apiMutations.conversations.CreateRoleplay(data);
    },
  });
};
