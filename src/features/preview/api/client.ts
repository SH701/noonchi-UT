import axios from "axios";
import { HintMessages } from "@/types/messages";

export const previewClient = {
  getHint: async (sessionId: string): Promise<HintMessages> => {
    const res = await axios.get<HintMessages>(
      `${process.env.NEXT_PUBLIC_PREVIEW_BASE_URL}/preview/roleplay/${sessionId}/help`,
      {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
        },
      },
    );
    return res.data;
  },
};
