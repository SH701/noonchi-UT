import { previewMutations } from "../api/mutations";
import { useMutation } from "@tanstack/react-query";

export function usePreviewStart() {
  return useMutation({
    mutationFn: previewMutations.Start,
  });
}

export function usePreviewRemove() {
  return useMutation({
    mutationFn: (sessionId: string) => previewMutations.Remove(sessionId),
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
      return previewMutations.Send(
        sessionId,
        userMessage,
        inputType,
        onChunk,
      );
    },
  });
}
