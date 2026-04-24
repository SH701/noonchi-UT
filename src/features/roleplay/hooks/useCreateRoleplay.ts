import { apiMutations } from "@/api";
import { RoleplayReq } from "@/features/roleplay/types/roleplay/roleplay.type";
import { useMutation } from "@tanstack/react-query";

const TIMEOUT_MS = 60000;

export const useCreateRoleplay = () => {
  return useMutation({
    mutationFn: async (data: RoleplayReq) => {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS),
      );
      return Promise.race([apiMutations.conversations.CreateRoleplay(data), timeout]);
    },
  });
};
