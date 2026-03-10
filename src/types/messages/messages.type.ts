export interface ChatMsg {
  messageId: number;
  conversationId: number;
  type: "USER" | "AI" | "SYSTEM";
  content: string;
  translatedContent?: string | null;
  audioUrl?: string | null;
  politenessScore?: number | null;
  naturalnessScore?: number | null;
  pronunciationScore?: number | null;
  reactionEmoji?: string | null;
  reactionDescription?: string | null;
  reactionReason?: string | null;
  recommendation?: string | null;
  feedback?: Feedback;
  isLoading?: boolean;
  createdAt: string;
  hiddenMeaning: string;
  visualAction?: string;
  situationDescription: string;
  askApproachTip?: string;
  askCulturalInsight?: string;
  streamFeedback?: string;
}

export interface Feedback {
  feedbackId: number;
  messageId: number;
  politenessScore: number;
  naturalnessScore: number;
  pronunciationScore: number;
  appropriateExpression: string;
  contentsFeedback: string;
  nuanceFeedback: string;
}

export interface RoleplayStreamDoneData {
  conversation_id: number;
  ai_message: string;
  ai_message_en: string;
  ai_hidden_meaning: string;
  visual_action: string;
  user_visual_action: string;
  situation_description: string | null;
  feedback: {
    feedback_text: string;
    is_appropriate: boolean;
    suggested_alternatives: string[];
  };
  turn_count: number;
  can_get_report: boolean;
  is_conversation_ending: boolean;
}

export interface AskStreamDoneData {
  conversation_id: number;
  coaching: string;
  ai_message: string;
  ai_message_en: string;
  approach_tip: string;
  cultural_insight: string;
}

export interface AskMessageStreamDoneData {
  status: string;
  ai_message_id: number;
}
export interface HintMessages {
  suggestions: string[];
  explanations: string[];
  translations: string[];
  wrongIndex: number;
}