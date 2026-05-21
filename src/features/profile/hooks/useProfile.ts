import { useMutation } from "@tanstack/react-query";
import { userMutations } from "../api/mutations";
import { authMutations } from "@/features/auth/api/mutations";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: ({
      koreanLevel,
      interests,
      language,
    }: {
      nickname?: string;
      birthDate?: string;
      koreanLevel?: string;
      profileImageUrl?: string;
      interests?: string[];
      language?: "EN" | "JA" | "RU" | "ES" | "ZH" | null;
    }) => userMutations.UpadateProfile(koreanLevel, interests, language),
  });
};
export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: () => authMutations.DeleteAccount(),
  });
};