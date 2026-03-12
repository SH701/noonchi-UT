export interface MyAI {
  personaId: number;
  userId: number;
  name: string;
  gender: "MALE" | "FEMALE" | "NONE";
  age: number;
  aiRole: string;
  userRole: string;
  description: string;
  profileImageUrl: string;
  voice: string;
}
export interface ConversationRes {
  conversationId: number;
}

export interface Conversation {
  conversationId: number;
  userId: number;
  aiPersona: MyAI;
  conversationType: "ASK" | "ROLE_PLAYING";
  conversationTrack: string;
  conversationTopic: string;
  status: "ACTIVE" | "ENDED";
  situation: string;
  chatModelId: string;
  createdAt: string;
  endedAt: string;
  lastActivityAt: string;
  interviewCompanyName: string;
  interviewJobTitle: string;
  interviewJobPosting: string;
  interviewStyle: "FRIENDLY" | "STRICT" | string;
  taskCurrentName: string;
  taskAllCompleted: boolean;
  closeness: string;
  askTarget: string;
  canGetReport: boolean;
}

export interface ConversationFeedback {
  feedbackId: number;
  conversationId: number;
  politenessScore: number;
  naturalnessScore: number;
  pronunciationScore: number;
  summary: string;
  goodPoints: string;
  improvementPoints: ImprovementPoint[];
  overallEvaluation: string;
}
export interface ConversationPaged {
  content: Conversation[];
  first: boolean;
  last: boolean;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
}
export type FilterState = "done" | "in-progress" | null;
export type ConversationSortBy = "CREATED_AT_DESC" | "LAST_ACTIVITY_DESC";
export interface ImprovementPoint {
  point: string;
  tip: string;
}
