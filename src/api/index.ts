export * from "./api";
export * from "./common";

import { messagesClient, messagesMutations } from "./messages";
import { conversationsClient, conversationsMutations } from "./conversations";
import { filesMutations } from "./files";
import { topicClient, topicMutations } from "./topic";
import { languageClient, languageMutations } from "./language";

export const apiClient = {
  topic: topicClient,
  conversations: conversationsClient,
  messages: messagesClient,
  language: languageClient,
};

export const apiMutations = {
  messages: messagesMutations,
  conversations: conversationsMutations,
  files: filesMutations,
  topic: topicMutations,
  language: languageMutations,
};
