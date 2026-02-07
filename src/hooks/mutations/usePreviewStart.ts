import { apiMutations } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function usePreviewStart() {
  return useMutation({
    mutationFn: apiMutations.preview.start,
  });
}
