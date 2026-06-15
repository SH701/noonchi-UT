import { apiFetch } from "@/api";

export type AiConsent = {
  consented: boolean;
  policyVersion: string;
  consentedAt: string;
};

export const userClient = {
  getAiConsent: async (): Promise<AiConsent> => {
    return apiFetch<AiConsent>("/api/users/me/ai-consent");
  },
};