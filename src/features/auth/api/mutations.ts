import { apiFetch } from "@/api/api";
import { AuthRes, SignupReq } from "@/features/auth/types/auth.type";

export const authMutations = {
  Signup: async (payload: SignupReq): Promise<AuthRes> => {
    const response = await apiFetch<AuthRes>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return response;
  },

  Logout: async (): Promise<void> => {
    return apiFetch<void>("/api/auth/logout", {
      method: "POST",
    });
  },
  Google: async (idToken: string): Promise<AuthRes> => {
    const response = await apiFetch<AuthRes>("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ idToken }),
    });
    return response;
  },
};
