import { apiMutations } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateContext = (
  scenarioId: number,
  myRole?: string,
  aiRole?: string,
  detail?: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiMutations.language.createcontext(scenarioId, myRole, aiRole, detail),
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export function useMessageTTS() {
  return useMutation({
    mutationFn: (text: string) => apiMutations.language.tts(text),
    onSuccess: (url) => {
      new Audio(url).play();
    },
  });
}
