import { Preview, PreviewSendRes } from "../types/preview.type";
import axios from "axios";

export const previewMutations = {
  Start: async (): Promise<Preview> => {
    const { data } = await axios.post<Preview>(
      `${process.env.NEXT_PUBLIC_PREVIEW_BASE_URL}/preview/roleplay/start`,
      null,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY || "",
        },
      },
    );
    return data;
  },
  Send: async (
    sessionId: string,
    userMessage: string,
    inputType: "text" | "voice" = "text",
    onChunk?: (chunk: string) => void,
  ): Promise<PreviewSendRes> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PREVIEW_BASE_URL}/preview/roleplay/${sessionId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY || "",
        },
        body: JSON.stringify({
          user_message: userMessage,
          input_type: inputType,
        }),
      },
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    let doneData: PreviewSendRes | null = null;
    let buffer = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const json = JSON.parse(line.slice(6));
          if (json.type === "chunk") {
            onChunk?.(json.content);
          } else if (json.type === "done") {
            doneData = json.data as PreviewSendRes;
          }
        }
      }
    }
    return doneData!;
  },
  Remove: async (sessionId: string): Promise<void> => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_PREVIEW_BASE_URL}/preview/roleplay/${sessionId}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY || "",
        },
      },
    );
  },
};
