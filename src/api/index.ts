export * from "./api";
export * from "./common";

import { messagesClient, messagesMutations } from "./messages";
import { conversationsClient, conversationsMutations } from "./conversations";
import { filesMutations } from "./files";
import { languageClient, languageMutations } from "./language";

export const apiClient = {
  conversations: conversationsClient,
  messages: messagesClient,
  language: languageClient,
};

export const apiMutations = {
  messages: messagesMutations,
  conversations: conversationsMutations,
  files: filesMutations,
  language: languageMutations,
};
