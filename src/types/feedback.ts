export type ImprovementPoint = {
  point: string;
  tip: string;
};

export type Feedback = {
  feedbackId: number;
  conversationId: number;
  politenessScore: number;
  naturalnessScore: number;
  pronunciationScore: number;
  summary: string;
  goodPoints: string;
  improvementPoints: ImprovementPoint[];
  overallEvaluation: string;
};
