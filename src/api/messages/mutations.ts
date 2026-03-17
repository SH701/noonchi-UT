import { apiFetch } from "@/api/api";
import { getSession } from "next-auth/react";
import {

  RoleplayStreamDoneData,
  ChatMsg,
} from "@/types/messages";
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
    onChunk: (chunk: string) => void,
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
    let currentEvent = "";
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (line.startsWith("event:")) {
            currentEvent = line.slice(6).trim();
          } else if (line.startsWith("data:")) {
            const raw = line.slice(5).trim();
            if (!raw) continue;
            if (currentEvent === "done") {
              try { doneData = JSON.parse(raw); } catch { /* ignore */ }
              return doneData!;
            } else {
              onChunk(raw);
            }
          }
        }
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
