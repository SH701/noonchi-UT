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