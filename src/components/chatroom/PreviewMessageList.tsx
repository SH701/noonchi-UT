"use client";

import { ChatLoading } from "@/components/common";
import {
  Preview,
  PreviewAiMessage,
  PreviewUserMessage,
} from "@/types/preview/preview.type";

import MessageItem from "./MessageItem";
import RoleInfo from "./RoleInfo";

interface PreviewMessageListProps {
  data: Preview | undefined;
  userMessages: PreviewUserMessage[];
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
      <RoleInfo
        aiRole={data?.scenario.ai_role || ""}
        userRole={data?.my_name || ""}
      />
      {/* 첫 AI 메세지 */}
      <MessageItem
        messages={{
          content: data?.ai_message ?? "",
          visualAction: data?.visual_action,
        }}
        isAI={true}
        aiName={data?.ai_name}
        isPreview={true}
        hiddenMeaning={data?.ai_hidden_meaning}
        isRevealed={firstHiddenMessage}
        onToggleReveal={onToggleFirstHidden}
        showsituation={showSituation}
        translatedContent={data?.ai_message_en}
      />
      {/* 대화 목록 */}
      {userMessages.map((userMsg, idx) => (
        <div key={idx}>
          <MessageItem
            messages={{ content: userMsg.content }}
            isMine={true}
            userName={data?.my_name}
            isPreview={true}
            previewFeedback={userMsg.feedback}
          />
          {isSending && idx === userMessages.length - 1 ? (
            <ChatLoading />
          ) : (
            // AI 답변
            aiResponses[idx] && (
              <>
                {aiResponses[idx].situationDescription && (
                  <MessageItem
                    messages={{
                      content: aiResponses[idx].situationDescription,
                    }}
                  />
                )}
                <MessageItem
                  messages={{
                    content: aiResponses[idx].content || "...",
                    visualAction: data?.visual_action,
                  }}
                  isMine={false}
                  aiName={data?.ai_name}
                  isAI={true}
                  isPreview={true}
                  hiddenMeaning={aiResponses[idx].hiddenMeaning}
                  isRevealed={aiResponses[idx].isRevealed}
                  onToggleReveal={() => onToggleReveal(idx)}
                  showsituation={showSituation}
                  translatedContent={aiResponses[idx].translatedContent}
                />
              </>
            )
          )}
        </div>
      ))}
    </>
  );
}
