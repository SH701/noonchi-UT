export interface AskReq {
  askTarget: string;
  closeness: string;
  situation: string;
}
export interface AskTurn {
  userContent: string;
  approachTip: string;
  aiMessage: string;
  culturalInsight: string;
  messageId?: number;
  translatedContent?: string;
}
export interface AskStreamDoneData {
  conversation_id: number;
  coaching: string;
  ai_message: string;
  ai_message_translated: string;
  approach_tip: string;
  cultural_insight: string;
}

export interface AskMessageStreamDoneData {
  status: string;
  ai_message_id: number;
}

export interface ScreenshotAnalysis {
  target: string;
  closeness: string;
  summary: string;
}

export interface ScreenshotSuggestion {
  korean: string;
  translated: string;
  explanation: string;
}

export interface ScreenshotContextForRoleplay {
  scenario: string;
  opponent_persona: string;
  last_message: string;
  relationship: string;
  closeness: string;
}

export interface ScreenshotStreamDoneData {
  analysis: ScreenshotAnalysis;
  opponent_analysis: string;
  tone_analysis: string;
  approach_tip: string;
  cultural_insight: string;
  suggestions: ScreenshotSuggestion[];
  context_for_roleplay: ScreenshotContextForRoleplay;
  ai_message_translated: string;
}

export type ScreenshotStreamEventType =
  | "opponent_analysis"
  | "tone_analysis"
  | "approach_tip"
  | "cultural_insight"
  | "chunk";