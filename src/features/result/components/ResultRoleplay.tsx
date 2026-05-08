"use client";

import { useEffect, useState } from "react";

import {

  useChatList,
} from "@/hooks/queries";

import { MessageList } from "@/components/chatroom";

import {
  ResultTab,
  Point,
  FeedbackPart,
  ResultHeader,
} from "@/features/result";
import FeedbackLoading from "../../roleplay/components/FeedbackLoading";
import Tab from "@/features/tab/Tab";
import { useConversationDetail } from "@/hooks/queries/useConversation";
import {
  useConversationFeedback,
  useConversationPostFeedback,
} from "../hooks/useConversationFeedback";
import { useTranslation } from "react-i18next";

interface RoleplayEndProps {
  conversationId: number;
}

export default function ResultRoleplay({ conversationId }: RoleplayEndProps) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"Feedback" | "Detailed Metrics">("Feedback");
  const roomId = conversationId;
  const { data: conversation } = useConversationDetail(roomId);
  const myAI = conversation?.aiPersona ?? null;
  const { data: messages = [] } = useChatList(roomId);
  const { mutate: postFeedback } = useConversationPostFeedback(roomId);
  const { data: feedback } = useConversationFeedback(roomId, false);

  useEffect(() => {
    postFeedback();
  }, []);

  useEffect(() => {
    if (feedback) {
      gtag("event", "feedback_view");
    }
  }, [feedback]);
  if (!feedback) {
    return <FeedbackLoading />;
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <ResultHeader />
      <Tab />
      <div className="flex flex-1 justify-center overflow-y-auto">
        <div>
          <div className="w-full px-4">
            <div className="mb-4 rounded-2xl bg-white p-4">
              <p className="font-pretendard mb-4 text-base font-medium leading-[130%] text-gray-900">
                {feedback.overallEvaluation ||
                  "You responded appropriately to the situation, but the tone could be more polite."}
              </p>
            </div>
            <div className="space-y-3">
              <Point
                label={t("result.scores.politeness")}
                value={feedback.politenessScore}
              />
              <Point
                label={t("result.scores.naturalness")}
                value={feedback.naturalnessScore}
              />
            </div>
          </div>

          <div className="pb-6">
            <ResultTab tab={tab} setTab={setTab} />
            {tab === "Feedback" ? (
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
