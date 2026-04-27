import { apiFetch } from "@/api/api";
import { getSession } from "next-auth/react";
import { InterviewFormData, ConversationRes } from "@/types/conversations";
import { RoleplayReq } from "@/features/roleplay/types/roleplay/roleplay.type";
import { AskReq, AskStreamDoneData } from "@/features/ask/types/ask.type";

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
};
