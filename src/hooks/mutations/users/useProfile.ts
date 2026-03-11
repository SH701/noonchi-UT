import { apiMutations } from "@/api"
import { useMutation } from "@tanstack/react-query"

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: ({
      koreanLevel,
      interests,
    }: {
      nickname?: string
      birthDate?: string
      koreanLevel?: string
      profileImageUrl?: string
      interests?: string[]
    }) => apiMutations.user.UpadateProfile( koreanLevel, interests),
  })
}