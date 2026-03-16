import { apiFetch } from "@/api/api";
import { TopicScenario } from "@/types/topics";

export const languageMutations = {
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
};
