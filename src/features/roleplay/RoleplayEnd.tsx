"use client";

import { useState } from "react";

import {
  useConversationFeedback,
  useConversationDetail,
  useChatQuery,
} from "@/hooks/queries";

import { MessageList } from "@/components/chatroom";

import { ResultTab, Point } from "@/features/result";

import FeedbackPart from "@/features/result/FeedbackPart";
import ChatroomHeader from "@/features/roleplay/ChatroomHeader";
interface RoleplayEndProps {
  conversationId: number;
}

export default function RoleplayEnd({ conversationId }: RoleplayEndProps) {
  const [tab, setTab] = useState<"transcript" | "mistakes">("transcript");
  const roomId = conversationId;
  const { data: conversation } = useConversationDetail(roomId);
  const myAI = conversation?.aiPersona ?? null;
  const { data: messages = [] } = useChatQuery(roomId);
  const { data: feedback } = useConversationFeedback(roomId);
  if (!feedback) {
    return <p className="p-6">No feedback available</p>;
  }
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <ChatroomHeader
        roomId={roomId}
        title={conversation?.conversationTopic ?? ""}
      />
      <div className="flex flex-1 justify-center overflow-y-auto">
        <div>
          <div className="max-w-125 w-full">
            <div className="mb-4 rounded-2xl bg-white p-4">
              <p className="font-pretendard mb-4 text-base font-medium leading-[130%] text-gray-900">
                {feedback.overallEvaluation ||
                  "You responded appropriately to the situation, but the tone could be more polite."}
              </p>
            </div>
            <div className="space-y-3">
              <Point label="Politeness" value={feedback.politenessScore} />
              <Point label="Naturalness" value={feedback.naturalnessScore} />
            </div>
          </div>

          <div className="pb-6">
            <ResultTab tab={tab} setTab={setTab} />
            {tab === "transcript" ? (
              <MessageList messages={messages} myAI={myAI} />
            ) : (
              <FeedbackPart
                summary={feedback.summary}
                goodPoints={feedback.goodPoints}
                improvementPoints={feedback.improvementPoints}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
