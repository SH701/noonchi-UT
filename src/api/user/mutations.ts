import { apiFetch } from "@/api/api";

export const userMutations = {
  UpadateProfile: async (
    koreanLevel?: string,
    interests?: string[],
  ) => {
    return apiFetch("/api/users/me/profile", {
      method: "PUT",
      body: JSON.stringify({ koreanLevel, interests }),
    });
  },
};
