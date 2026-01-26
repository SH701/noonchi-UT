export const INTEREST_OPTIONS = [
  "💬 Daily Conversation",
  "💼 Business",
  "✈️ Travel",
  "🎬 K-Drama",
  "🎵 K-Pop",
  "🙇‍♂️ Etiquette",
  "🔥 Internet Slang",
  "🥘 Food",
  "🍜 Ordering",
  "💄 Beauty",
  "👁️‍🗨️ Gathering",
] as const;

export const levelDescription = {
  BEGINNER:
    "I know basic polite words, but I'm not sure when or how to use honorifics.",
  INTERMEDIATE:
    "I can use -요 endings, but I’m not confident in using formal or respectful language correctly.",
  ADVANCED:
    "I understand and use honorifics naturally depending on context or relationship.",
} as const;
