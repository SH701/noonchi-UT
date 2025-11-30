import { useAuthStore } from "@/store/auth";

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().accessToken;

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });
}
