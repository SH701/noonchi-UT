import { apiFetch } from "./api";

import { getSession } from "next-auth/react";
import {
  InterviewFormData,
  UploadedFile,
  RoleplayReq,
  ConversationRes,
  AskReq,
  PresignedUrlRes,
} from "@/types/conversations";
import {
  AskStreamDoneData,
  AskMessageStreamDoneData,
  RoleplayStreamDoneData,
  ChatMsg,
} from "@/types/messages";
import { Preview, PreviewSendRes } from "@/types/preview/preview.type";
import axios from "axios";
import { TopicScenario } from "@/types/topics";
import { AuthRes, LoginReq, SignupReq } from "@/types/auth";

export const apiMutations = {
  auth: {
    Login: async (payload: LoginReq): Promise<AuthRes> => {
      return apiFetch<AuthRes>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ payload }),
      });
    },
    Signup: async (payload: SignupReq): Promise<AuthRes> => {
      const response = await apiFetch<AuthRes>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      return response;
    },

    Logout: async (): Promise<void> => {
      return apiFetch<void>("/api/auth/logout", {
        method: "POST",
      });
    },
  },

  messages: {
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
      let isDoneEvent = false;
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line === "event:done") {
              isDoneEvent = true;
              continue;
            }
            if (!line.startsWith("data:")) continue;
            const raw = line.slice(5).trim();
            if (!raw) continue;
            if (isDoneEvent) {
              try {
                doneData = JSON.parse(raw);
              } catch {
                // ignore
              }
              return doneData!;
            }
            onChunk(raw);
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
  },

  conversations: {
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
    EndConversation: async (conversationId: number): Promise<number> => {
      return apiFetch<number>(`/api/conversations/${conversationId}/end`, {
        method: "PUT",
      });
    },
  },

  files: {
    UploadFiles: async (files: File[]): Promise<UploadedFile[]> => {
      return Promise.all(
        files.map(async (file) => {
          const presignedData = await apiFetch<PresignedUrlRes>(
            "/api/files/presigned-url",
            {
              method: "POST",
              body: JSON.stringify({
                fileExtension: file.name.split(".").pop(),
                fileType: file.type,
              }),
            },
          );

          await fetch(presignedData.url, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file,
          });

          return {
            fileUrl: presignedData.url.split("?")[0],
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
          };
        }),
      );
    },
    UploadAudio: async (blob: Blob): Promise<string> => {
      const blobType = blob.type || "audio/webm";
      const fileExtension = blobType.includes("webm") ? "webm" : "wav";
      const res = await fetch("/api/files/presigned-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileExtension: fileExtension,
          fileType: blobType,
        }),
      });
      const { url: presignedUrl } = await res.json();
      await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": blobType },
        body: blob,
      });

      return presignedUrl.split("?")[0];
    },
  },
  preview: {
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
      let fullText = "";
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
              fullText += json.content;
              onChunk?.(fullText);
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
  },
  topic: {
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
  },
  language: {
    Createcontext: async (
      scenarioId: number,
      myRole?: string,
      aiRole?: string,
      detail?: string,
    ): Promise<TopicScenario> => {
      return apiFetch<TopicScenario>(`/api/language/scenario-context`, {
        method: "POST",
        body: JSON.stringify({ scenarioId, myRole, aiRole, detail }),
      });
    },
    stt: async (audioUrl: string): Promise<string> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/language/stt`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audioUrl }),
        },
      );
      return res.text();
    },
    tts: async (text: string): Promise<string> => {
      return apiFetch<string>(`/api/language/tts`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });
    },
  },
};
