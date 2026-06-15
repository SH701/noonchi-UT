import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userClient, AiConsent } from "../api/client";
import { userMutations } from "../api/mutations";

export const AI_CONSENT_POLICY_VERSION = "1.0";

export const useAiConsent = () => {
  return useQuery<AiConsent>({
    queryKey: ["ai-consent"],
    queryFn: () => userClient.getAiConsent(),
    staleTime: 1000 * 60 * 60,
  });
};

export const useUpdateAiConsent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (policyVersion: string = AI_CONSENT_POLICY_VERSION) =>
      userMutations.AiConsent(policyVersion),
    onSuccess: (data) => {
      queryClient.setQueryData(["ai-consent"], data);
    },
  });
};