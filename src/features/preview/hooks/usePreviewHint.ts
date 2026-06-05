import { previewClient } from "../api/client";
import { useQuery } from "@tanstack/react-query";

export const usePreviewHint = (sessionId?: string) => {
  return useQuery({
    queryKey: ["previewHint", sessionId],
    queryFn: async () => {
      return previewClient.getHint(sessionId!);
    },
    enabled: !!sessionId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
