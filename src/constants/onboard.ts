export const INTEREST_KEYS = [
  "dailyConversation",
  "business",
  "travel",
  "kDrama",
  "kPop",
  "etiquette",
  "internetSlang",
  "food",
  "ordering",
  "beauty",
  "gathering",
] as const;

export type InterestKey = (typeof INTEREST_KEYS)[number];

export const LEVEL_KEYS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export type LevelKey = (typeof LEVEL_KEYS)[number];
