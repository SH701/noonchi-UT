"use client";

import { MyAI } from "@/types/etc";

import MessageItem from "./MessageItem";
import { ChatMsg } from "@/types/messages";

interface MessageListProps {
  messages: ChatMsg[];
  myAI: MyAI | null;
  showsituation?: boolean;
  onInfoClick?: () => void;
}

export default function MessageList({
  messages,
  myAI,
  showsituation,
  onInfoClick,
}: MessageListProps) {
  return (
    <>
      {messages.map((m) => {
        const isMine = m.type === "USER";
        const isAI = m.type === "AI";
        const isPending = m.messageId < 0;
        return (
          <MessageItem
            key={m.messageId}
            messages={m}
            myAI={myAI}
            isMine={isMine}
            isAI={isAI}
            isPending={isPending}
            showsituation={showsituation}
            translatedContent={m.translatedContent ?? undefined}
            previewFeedback={m.streamFeedback}
            onInfoClick={isAI ? onInfoClick : undefined}
          />
        );
      })}
    </>
  );
}
