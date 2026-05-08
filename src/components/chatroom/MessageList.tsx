"use client";



import { MyAI } from "@/types/conversations";
import MessageItem from "./MessageItem";
import { ChatMsg } from "@/types/messages";

interface MessageListProps {
  messages: ChatMsg[];
  myAI: MyAI | null;
  showsituation?: boolean;
  onInfoClick?: () => void;
  feedbackMap?: Record<string, string>;
}

export default function MessageList({
  messages,
  myAI,
  showsituation,
  onInfoClick,
  feedbackMap,
}: MessageListProps) {
  return (
    <>
      {messages.map((m) => {
        const isMine = m.type === "USER";
        const isAI = m.type === "AI";
        const feedback = m.streamFeedback ?? (isMine ? feedbackMap?.[m.content] : undefined);
        return (
          <MessageItem
            key={m.messageId}
            messages={m}
            myAI={myAI}
            isMine={isMine}
            isAI={isAI}
            showsituation={showsituation}
            translatedContent={m.translatedContent ?? undefined}
            previewFeedback={feedback}
            onInfoClick={isAI ? onInfoClick : undefined}
          />
        );
      })}
    </>
  );
}
