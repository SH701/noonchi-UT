import { apiFetch } from "@/api/api";
import { HintMessages } from "@/types/messages";

export const languageClient = {
  getHelp: async (conversationId: number): Promise<HintMessages> => {
    return apiFetch<HintMessages>(
      `/api/language/help?conversationId=${conversationId}`,
    );
  },
};
