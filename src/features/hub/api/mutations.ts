import { apiFetch } from "@/api/api";

export const topicMutations = {
  Addfavorite: async (topicId: number): Promise<void> => {
    return apiFetch<void>(`/api/topics/${topicId}/favorite`, {
      method: "POST",
    });
  },
  Removefavorite: async (topicId: number): Promise<void> => {
    return apiFetch<void>(`/api/topics/${topicId}/favorite`, {
      method: "DELETE",
    });
  },
};
