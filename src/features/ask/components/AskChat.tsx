"use client";

import { useMemo, useState } from "react";
import ChatQuickActions from "./ChatQuickActions";
import { useScrollToBottom, useVoiceChat } from "@/hooks/custom";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { CominSoonModal } from "@/components/modal";
import AskSteps from "./AskSteps";
import MessageItem from "@/components/chatroom/MessageItem";
import { getClosenessOptions } from "@/constants";
import { useChatList } from "@/hooks/queries";

import { Spinner } from "@/components/ui/spinner/spinner";
import { ChatInput, ChatLoading } from "@/components/common";
import { useConversationDetail } from "@/hooks/queries/useConversation";
import { AskTurn } from "../types/ask.type";
import { useAskStream } from "../hooks/useAskStream";
import { useAskMessageStream } from "../hooks/useAskMessageStream";
import { useTranslation } from "react-i18next";

interface AskChatProps {
  roomId?: number;
  onSwitchToScreenshot?: () => void;
}

export default function AskChat({ roomId, onSwitchToScreenshot }: AskChatProps) {
  const { t } = useTranslation();
  const CLOSENESS_OPTIONS = getClosenessOptions(t);
  const [message, setMessage] = useState("");
  const [insightopen, setInsightOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [started, setStarted] = useState(!!roomId);

  const [step, setStep] = useState<"askTarget" | "closeness" | "situation">(
    "askTarget",
  );
  const [roomAskTarget, setRoomAskTarget] = useState("");
  const [roomCloseness, setRoomCloseness] = useState("");
  const [situation, setSituation] = useState("");

  const { data: conversation } = useConversationDetail(roomId);
  const askTarget = roomId ? (conversation?.askTarget ?? "") : roomAskTarget;
  const closeness = roomId ? (conversation?.closeness ?? "") : roomCloseness;
  const { data: messages = [] } = useChatList(roomId);
  const firstAI = messages.find((m) => m.type === "AI");

  const {
    mutate: createAsk,
    isPending,
    approachTip: streamApproachTip,
    aiMessage: streamAiMessage,
    culturalInsight: streamCulturalInsight,
    conversationId,
  } = useAskStream();

  const {
    turns: streamTurns,
    sendMessage,
    isAIResponding,
  } = useAskMessageStream(roomId ?? Number(conversationId));
  const aiMessage = roomId ? (firstAI?.content ?? "") : streamAiMessage;
  const approachTip = roomId
    ? (firstAI?.askApproachTip ?? "")
    : streamApproachTip;
  const culturalInsight = roomId
    ? (firstAI?.askCulturalInsight ?? "")
    : streamCulturalInsight;
  const roomTurns: AskTurn[] = useMemo(() => {
    if (!roomId) return [];
    const afterFirst = messages.slice(messages.indexOf(firstAI!) + 1);
    const result: AskTurn[] = [];
    for (let i = 0; i < afterFirst.length; i++) {
      const msg = afterFirst[i];
      if (msg.type !== "USER") continue;
      const ai =
        afterFirst[i + 1]?.type === "AI" ? afterFirst[i + 1] : undefined;
      result.push({
        userContent: msg.content,
        approachTip: ai?.askApproachTip ?? "",
        aiMessage: ai?.content ?? "",
        culturalInsight: ai?.askCulturalInsight ?? "",
        messageId: ai?.messageId,
        translatedContent: ai?.translatedContent ?? undefined,
      });
      if (ai) i++;
    }
    return result;
  }, [roomId, messages, firstAI]);

  const turns = roomId ? [...roomTurns, ...streamTurns] : streamTurns;
  const {
    micState,
    sttText,
    handleMicClick,
    pendingAudioUrl,
    handleResetAudio,
  } = useVoiceChat(undefined, undefined, setMessage);

  const bottomRef = useScrollToBottom([aiMessage, turns]);

  const handleStepsComplete = (
    askTarget: string,
    closeness: string,
    situation: string,
  ) => {
    setStarted(true);
    gtag("event", "ask_start");
    createAsk({ askTarget, closeness, situation });
  };

  const handleAskStream = () => {
    if (!message.trim()) return;
    if (!started) {
      if (step === "askTarget") {
        setRoomAskTarget(message);
        gtag("event", "ask_first_question");
        setStep("closeness");
        setMessage("");

        return;
      }
      if (step === "situation") {
        setSituation(message);
        setMessage("");
        gtag("event", "ask_third_question");
        handleStepsComplete(askTarget, closeness, message);
        return;
      }
      return;
    }
    if (micState === "recorded" && pendingAudioUrl && message === sttText) {
      sendMessage(message, pendingAudioUrl);
      handleResetAudio();
    } else {
      if (micState === "recorded") handleResetAudio();
      sendMessage(message);
    }
    setMessage("");
  };

  const handleInsight = () => {
    setInsightOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      <CominSoonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="flex flex-1 flex-col pb-2">
        {!started && (
          <AskSteps
            step={step}
            askTarget={askTarget}
            closeness={closeness}
            onSelectCloseness={(value) => {
              setRoomCloseness(value);
              gtag("event", "ask_second_question");
              setStep("situation");
            }}
            onSwitchToScreenshot={onSwitchToScreenshot}
          />
        )}

        {/* 로딩 */}
        {isPending && !aiMessage && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Spinner size="64px" />
            <span>{t("askChat.processingAI")}</span>
          </div>
        )}

        {/* 스트리밍 결과 */}
        {aiMessage && (
          <div className="mb-1 flex flex-col gap-2">
            <span className="text-2xl font-semibold">
              {t("ask.stepQuestions.askTarget")}
            </span>
            <span className="text-gray-600">{t("ask.hints.hint1")}</span>
            {askTarget && (
              <div className="flex justify-end">
                <div className="my-5 flex flex-col gap-2 rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
                  <p className="text-sm">{askTarget}</p>
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-2xl font-semibold">
                {t("ask.subtitle")}
              </span>
              <span className="text-gray-600">{t("ask.hints.hint2")}</span>
              <div className="flex justify-end">
                <div className="my-5 rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
                  <p className="text-sm">
                    {CLOSENESS_OPTIONS.find((o) => o.value === closeness)
                      ?.label ?? closeness}
                  </p>
                </div>
              </div>
              <span className="text-2xl font-semibold">
                {t("ask.startButton")}
              </span>
              <span className="text-gray-600">{t("ask.hints.hint3")}</span>
              <div className="flex justify-end">
                <div className="my-5 flex flex-col gap-2 rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
                  <p className="text-sm">{situation}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold">{t("ask.bestWay")}</span>
              <span className="text-gray-600">{approachTip}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="mb-5 flex max-w-[75%] flex-col gap-2 rounded-b-xl rounded-tr-xl border border-gray-300 bg-white p-4">
                <p className="my-1 text-sm">{aiMessage}</p>
              </div>
              <div className="flex flex-col gap-1 border-b border-gray-400 pb-2 text-sm">
                <div className="flex gap-1 text-blue-600">
                  <Lightbulb size={14} /> {t("ask.culturalInsights")}
                </div>
                {insightopen ? (
                  <>
                    {culturalInsight}
                    <div className="flex items-center justify-center">
                      <ChevronDown className="size-3" onClick={handleInsight} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full min-w-0">
                      <p className="flex-1 truncate">{culturalInsight}</p>
                      <div className="flex items-center justify-center">
                        <ChevronUp onClick={handleInsight} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {/* 이후 스트리밍 메세지 */}
        {turns.map((turn, i) => (
          <div key={i} className="mt-5 flex flex-col gap-3">
            <MessageItem
              messages={{ content: turn.userContent }}
              isMine
              coaching={turn.coaching}
            />
            {turn.aiMessage && (
              <>
                {turn.approachTip && (
                  <p className="text-sm text-gray-600">{turn.approachTip}</p>
                )}
                <MessageItem
                  messages={{
                    content: turn.aiMessage,
                    messageId: turn.messageId,
                  }}
                  isAI
                  translatedContent={turn.translatedContent}
                />
              </>
            )}
          </div>
        ))}
        {isAIResponding && <ChatLoading />}
        <div ref={bottomRef} />
      </div>

      {/* 하단 고정 ChatInput */}
      <div className="sticky bottom-0 -mx-5 flex flex-col px-5 pb-5 backdrop-blur-md">
        {aiMessage && (
          <ChatQuickActions onOpenModal={() => setModalOpen(true)} />
        )}
        {(aiMessage || (!started && step !== "closeness")) && (
          <ChatInput
            message={message}
            setMessage={setMessage}
            onMicClick={handleMicClick}
            onSend={handleAskStream}
            disabled={isAIResponding}
            micState={micState}
            placeholder={
              step === "askTarget"
                ? t("askChat.placeholderAskTarget")
                : step === "situation"
                  ? t("askChat.placeholderSituation")
                  : t("askChat.placeholderDefault")
            }
          />
        )}
      </div>
    </div>
  );
}
