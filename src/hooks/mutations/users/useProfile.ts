import { apiMutations } from "@/api";
import { toast } from "@/components/ui/toast/toast";
import { useMutation } from "@tanstack/react-query";

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
    }) => apiMutations.user.UpadateProfile(koreanLevel, interests),
    onSuccess: () => {
      toast.success("Profile updated successfully.");
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });
};
