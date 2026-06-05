import { apiFetch } from "@/api/api";
import { getSession } from "next-auth/react";
import {
  InterviewFormData,
  ConversationRes,
  ConversationFeedback,
} from "@/types/conversations";
import { RoleplayReq } from "@/features/roleplay/types/roleplay.type";
import {
  AskReq,
  AskStreamDoneData,
  ScreenshotStreamDoneData,
  ScreenshotStreamEventType,
  ScreenshotAnalysis,
} from "@/features/ask/types/ask.type";


export const conversationsMutations = {
  CreateInterview: async (
    data: InterviewFormData,
  ): Promise<ConversationRes> => {
    return apiFetch<ConversationRes>("/api/conversations/interview", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  CreateRoleplay: async (data: RoleplayReq): Promise<ConversationRes> => {
    return apiFetch<ConversationRes>("/api/conversations/role-playing", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  CreateAskStream: async (
    data: AskReq,
    onChunk: (
      type: "approach_tip" | "chunk" | "cultural_insight",
      content: string,
    ) => void,
  ): Promise<AskStreamDoneData> => {
    const session = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/conversations/ask/stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.accessToken && {
            Authorization: `Bearer ${session.accessToken}`,
          }),
        },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let doneData: AskStreamDoneData | null = null;
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const raw = line.slice(5).trim();
          if (!raw) continue;
          let json: {
            type: string;
            content?: string;
            data?: AskStreamDoneData;
          };
          try {
            json = JSON.parse(raw);
          } catch {
            continue;
          }
          if (
            json.type === "approach_tip" ||
            json.type === "chunk" ||
            json.type === "cultural_insight"
          ) {
            onChunk(json.type, json.content ?? "");
          } else if (json.type === "done") {
            doneData = json.data ?? null;
            return doneData!;
          }
        }
      }
    }
    return doneData!;
  },
  CreateAskScreenshotStream: async (
    imageUrl: string,
    onChunk: (type: ScreenshotStreamEventType, content: string) => void,
    onAnalysis: (analysis: ScreenshotAnalysis) => void,
    onErrorNotChat: (message: string) => void,
    onSession: (conversationId: number) => void,
    onDone?: (data: ScreenshotStreamDoneData) => void,
    confirmedTarget?: string | null,
    confirmedCloseness?: string | null,
  ): Promise<ScreenshotStreamDoneData> => {
    const session = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/conversations/ask/screenshot/stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.accessToken && {
            Authorization: `Bearer ${session.accessToken}`,
          }),
        },
        body: JSON.stringify({
          imageUrl,
          confirmedTarget: confirmedTarget ?? null,
          confirmedCloseness: confirmedCloseness ?? null,
        }),
      },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let doneData: ScreenshotStreamDoneData | null = null;
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const raw = line.slice(5).trim();
          if (!raw) continue;
          let json: {
            type: string;
            content?: string;
            data?: unknown;
            message?: string;
          };
          try {
            json = JSON.parse(raw);
          } catch {
            continue;
          }
          if (json.type === "session") {
            const conversationId =
              (json.data as { conversation_id: number } | undefined)?.conversation_id ??
              (json as unknown as { conversation_id: number }).conversation_id;
            onSession(conversationId);
          } else if (json.type === "analysis" && json.data) {
            onAnalysis(json.data as ScreenshotAnalysis);
          } else if (json.type === "error_not_chat") {
            onErrorNotChat(json.message ?? "");
            return doneData!;
          } else if (
            json.type === "opponent_analysis" ||
            json.type === "tone_analysis" ||
            json.type === "approach_tip" ||
            json.type === "cultural_insight" ||
            json.type === "chunk"
          ) {
            onChunk(json.type, json.content ?? "");
          } else if (json.type === "done") {
            doneData = (json.data as ScreenshotStreamDoneData) ?? null;
            if (doneData) onDone?.(doneData);
            return doneData!;
          }
        }
      }
    }
    return doneData!;
  },
  DeleteConversation: async (conversationId: number): Promise<void> => {
    return apiFetch<void>(`/api/conversations/${conversationId}`, {
      method: "DELETE",
    });
  },
  EndConversation: async (conversationId: number): Promise<void> => {
    return apiFetch<void>(`/api/conversations/${conversationId}/end`, {
      method: "PUT",
    });
  },
  PostConversationFeedack: async (
    conversationId: number,
  ): Promise<ConversationFeedback> => {
    return apiFetch<ConversationFeedback>(
      `/api/conversations/${conversationId}/feedback`,
      {
        method: "POST",
      },
    );
  },
};
