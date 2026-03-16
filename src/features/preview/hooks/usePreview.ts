import { apiMutations } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function usePreviewStart() {
  return useMutation({
    mutationFn: apiMutations.preview.Start,
  });
}

export function usePreviewRemove() {
  return useMutation({
    mutationFn: (sessionId: string) => apiMutations.preview.Remove(sessionId),
  });
}

export function usePreviewSend(onChunk?: (chunk: string) => void) {
  return useMutation({
    mutationFn: async ({
      sessionId,
      userMessage,
      inputType = "text",
    }: {
      sessionId: string;
      userMessage: string;
      inputType?: "text" | "voice";
    }) => {
      return apiMutations.preview.Send(
        sessionId,
        userMessage,
        inputType,
        onChunk,
      );
    },
  });
}
