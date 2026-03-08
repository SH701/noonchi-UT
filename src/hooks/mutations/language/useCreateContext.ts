import { apiMutations } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateContext = (scenarioId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiMutations.language.createcontext(scenarioId),
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export function useMessageTTS() {
  return useMutation({
    mutationFn: (text: string) => apiMutations.language.tts(text),
  });
}