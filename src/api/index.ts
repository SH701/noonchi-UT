export * from "./api";
export * from "./common";

import { authMutations } from "./auth";
import { messagesClient, messagesMutations } from "./messages";
import { conversationsClient, conversationsMutations } from "./conversations";
import { filesMutations } from "./files";
import { previewClient, previewMutations } from "./preview";
import { topicClient, topicMutations } from "./topic";
import { languageClient, languageMutations } from "./language";
import { userMutations } from "./user";

export const apiClient = {
  topic: topicClient,
  conversations: conversationsClient,
  messages: messagesClient,
  preview: previewClient,
  language: languageClient,
};

export const apiMutations = {
  auth: authMutations,
  messages: messagesMutations,
  conversations: conversationsMutations,
  files: filesMutations,
  preview: previewMutations,
  topic: topicMutations,
  language: languageMutations,
  user: userMutations,
};
