import { apiFetch } from "@/api/api";
import { AiConsent } from "./client";

export const userMutations = {
  UpadateProfile: async (
    koreanLevel?: string,
    interests?: string[],
    language?: "EN" | "JA" | "RU" | "ES" | "ZH" | null,
  ) => {
    return apiFetch("/api/users/me/profile", {
      method: "PUT",
      body: JSON.stringify({
        koreanLevel,
        interests,
        language,
      }),
    });
  },
  AiConsent: async (policyVersion: string): Promise<AiConsent> => {
    return apiFetch<AiConsent>("/api/users/me/ai-consent", {
      method: "POST",
      body: JSON.stringify({ policyVersion }),
    });
  },
};
