import { apiMutations } from "@/api";
import { useMutation } from "@tanstack/react-query";



export function useMessageTTS() {
  return useMutation({
    mutationFn: (text: string) => apiMutations.language.tts(text),
    onSuccess: (url) => {
      new Audio(url).play();
    },
  });
}
