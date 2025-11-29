export type ChatMsg = {
  messageId: number;
  conversationId: number;
  type: "USER" | "AI";
  content: string;
  translatedContent?: string;
  audioUrl?: string | null;
  createdAt: string;
  politenessScore?: number;
  naturalnessScore?: number;
  pronunciationScore?: number;
  feedback?: string;
  isLoading?: boolean;
};
