"use client";

import { ChatLoading } from "@/components/common";
import { Preview } from "@/types/preview/preview.type";
import { PreviewAiMessage } from "@/hooks/mutations/preview/usePreviewMessages";
import MessageItem from "./MessageItem";

interface PreviewMessageListProps {
  data: Preview | undefined;
  userMessages: string[];
  aiResponses: PreviewAiMessage[];
  firstHiddenMessage: boolean;
  onToggleFirstHidden: () => void;
  onToggleReveal: (idx: number) => void;
  showSituation: boolean;
  isSending: boolean;
}

export default function PreviewMessageList({
  data,
  userMessages,
  aiResponses,
  firstHiddenMessage,
  onToggleFirstHidden,
  onToggleReveal,
  showSituation,
  isSending,
}: PreviewMessageListProps) {
  return (
    <>
      <MessageItem
        messages={{
          content: data?.ai_message ?? "",
          visualAction: data?.visual_action,
        }}
        aiName={data?.ai_name}
        isPreview={true}
        hiddenMeaning={data?.ai_hidden_meaning}
        isRevealed={firstHiddenMessage}
        onToggleReveal={onToggleFirstHidden}
        showsituation={showSituation}
        translatedContent={data?.ai_message_en}
      />

      {userMessages.map((userMsg, idx) => (
        <div key={idx}>
          <MessageItem
            messages={{ content: userMsg }}
            isMine={true}
            userName={data?.my_name}
            isPreview={true}
          />
          {isSending && idx === userMessages.length - 1 ? (
            <ChatLoading />
          ) : (
            aiResponses[idx] && (
              <MessageItem
                messages={{
                  content: aiResponses[idx].content || "...",
                  visualAction: data?.visual_action,
                }}
                isMine={false}
                aiName={data?.ai_name}
                isPreview={true}
                hiddenMeaning={aiResponses[idx].hiddenMeaning}
                isRevealed={aiResponses[idx].isRevealed}
                onToggleReveal={() => onToggleReveal(idx)}
                showsituation={showSituation}
                translatedContent={aiResponses[idx].translatedContent}
              />
            )
          )}
        </div>
      ))}
    </>
  );
}
