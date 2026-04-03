import { apiMutations } from "@/api";
import { RoleplayReq } from "@/features/roleplay/types/roleplay/roleplay.type";
import { useMutation } from "@tanstack/react-query";

export const useCreateRoleplay = () => {
  return useMutation({
    mutationFn: async (data: RoleplayReq) => {
      return apiMutations.conversations.CreateRoleplay(data);
    },
  });
};
