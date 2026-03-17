import { apiFetch } from "@/api/api";
import { normalizeChatMessage } from "@/lib/normalizeChatMessage";
import { ChatMsg } from "@/types/messages";

export const messagesClient = {
  getList: async (conversationId: number): Promise<ChatMsg[]> => {
    const data = await apiFetch<{ content?: ChatMsg[] } | ChatMsg[]>(
      `/api/messages?conversationId=${conversationId}&page=1&size=20`,
      { cache: "no-store" },
    );
    const list = Array.isArray(data) ? data : (data?.content ?? []);
    const mapped = list.map((m) => normalizeChatMessage(m));
    return mapped.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  },
};
