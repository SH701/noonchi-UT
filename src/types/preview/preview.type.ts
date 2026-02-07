export interface Preview {
  session_id: string;
  scenario: {
    id: string;
    title: string;
    category: string;
    description: string;
    ai_role: string;
  };
  ai_message: string;
  ai_hidden_meaning: string;
  visual_action: string;
  user_visual_action: string;
  situation_description: string | null;
  situation_context: string;
  max_turns: number;
}
