import { useMutation } from "@tanstack/react-query";
import { userMutations } from "../api/mutations";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: ({
      koreanLevel,
      interests,
    }: {
      nickname?: string;
      birthDate?: string;
      koreanLevel?: string;
      profileImageUrl?: string;
      interests?: string[];
    }) => userMutations.UpadateProfile(koreanLevel, interests),
  });
};
