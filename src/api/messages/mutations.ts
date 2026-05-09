import { apiFetch } from "@/api/api";
import { getSession } from "next-auth/react";
import { RoleplayStreamDoneData, ChatMsg } from "@/types/messages";
import { AskMessageStreamDoneData } from "@/features/ask/types/ask.type";

export const messagesMutations = {
  asksend: async (
    conversationId: number,
    content?: string,
    audioUrl?: string,
  ): Promise<ChatMsg> => {
    return apiFetch<ChatMsg>(`/api/messages/ask`, {
      method: "POST",
      body: JSON.stringify({ conversationId, content, audioUrl }),
    });
  },
  RoleplaysendStream: async (
    conversationId: number,
    content: string,
    onChunk: (chunk: string, type: string) => void,
  ): Promise<RoleplayStreamDoneData> => {
    const session = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/messages/roleplay/stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.accessToken && {
            Authorization: `Bearer ${session.accessToken}`,
          }),
        },
        body: JSON.stringify({ conversationId, content }),
      },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let doneData: RoleplayStreamDoneData | null = null;
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const parsed = JSON.parse(line.slice(5).trim()) as {
            type: string;
            content?: string;
            data?: RoleplayStreamDoneData;
          };
          if (parsed.type === "chunk" || parsed.type === "situation") {
            onChunk(parsed.content ?? "", parsed.type);
          } else if (parsed.type === "done") {
            doneData = parsed.data ?? null;
            return doneData!;
          }
        }
      }
    }
    return doneData!;
  },
  Asksendstream: async (
    conversationId: number,
    content: string,
    onChunk: (
      type: "approach_tip" | "chunk" | "cultural_insight",
      content: string,
    ) => void,
    audioUrl?: string,
  ): Promise<AskMessageStreamDoneData> => {
    const session = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/messages/ask/stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.accessToken && {
            Authorization: `Bearer ${session.accessToken}`,
          }),
        },
        body: JSON.stringify({ conversationId, content, audioUrl }),
      },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let doneData: AskMessageStreamDoneData | null = null;

    const handleJson = (raw: string) => {
      let json: {
        type: string;
        content?: string;
        data?: AskMessageStreamDoneData;
      };
      try {
        json = JSON.parse(raw);
      } catch {
        return;
      }
      if (
        json.type === "approach_tip" ||
        json.type === "chunk" ||
        json.type === "cultural_insight"
      ) {
        onChunk(json.type, json.content ?? "");
      } else if (json.type === "done") {
        doneData =
          (json.data as AskMessageStreamDoneData | undefined) ??
          (json as unknown as AskMessageStreamDoneData) ??
          null;
      }
    };

    const drainBuffer = () => {
      while (true) {
        const start = buffer.indexOf("{");
        if (start < 0) {
          buffer = "";
          return;
        }
        let depth = 0;
        let end = -1;
        let inStr = false;
        let escape = false;
        for (let i = start; i < buffer.length; i++) {
          const ch = buffer[i];
          if (inStr) {
            if (escape) escape = false;
            else if (ch === "\\") escape = true;
            else if (ch === '"') inStr = false;
            continue;
          }
          if (ch === '"') inStr = true;
          else if (ch === "{") depth++;
          else if (ch === "}") {
            depth--;
            if (depth === 0) {
              end = i;
              break;
            }
          }
        }
        if (end < 0) {
          buffer = buffer.slice(start);
          return;
        }
        const objStr = buffer.slice(start, end + 1);
        buffer = buffer.slice(end + 1);
        const cleaned = objStr.replace(/^data:\s*/, "");
        handleJson(cleaned);
      }
    };

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const decoded = decoder.decode(value, { stream: true });
        buffer += decoded;
        drainBuffer();
        if (doneData) return doneData;
      }
    }
    return doneData!;
  },
  Translate: async (messageId: number): Promise<string> => {
    return apiFetch<string>(`/api/messages/${messageId}/translate`, {
      method: "PUT",
    });
  },
};
