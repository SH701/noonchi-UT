"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Compass,
  Lightbulb,
  MessageCircle,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import MessageItem from "@/components/chatroom/MessageItem";
import { ChatInput, ChatLoading } from "@/components/common";
import { Spinner } from "@/components/ui/spinner/spinner";
import { useScrollToBottom, useVoiceChat } from "@/hooks/custom";
import { useAskScreenshotStore } from "@/store/useAskScreenshotStore";
import { useAskMessageStream } from "../hooks/useAskMessageStream";
import { Button } from "@/components/ui/button/button";
import { useCreateRoleplay } from "@/features/roleplay/hooks/useCreateRoleplay";
import { useRouter } from "next/navigation";
import { RoleplayLoading } from "@/features/roleplay";

interface AskScreenshotChatProps {
  roomId: number;
}

export default function AskScreenshotChat({ roomId }: AskScreenshotChatProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [reportOpen, setReportOpen] = useState(true);
  const [insightOpen, setInsightOpen] = useState(true);

  const router = useRouter();
  const { mutateAsync: createRoleplay, isPending: isCreatingRoleplay } =
    useCreateRoleplay();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleRolePlay = async () => {
    try {
      const convo = await createRoleplay({
        fromAskConversationId: roomId,
      });
      setIsNavigating(true);
      router.push(`/hub/roleplay/chatroom/${convo.conversationId}`);
    } catch {
      // ignore
    }
  };
  const {
    analysis,
    opponentAnalysis,
    toneAnalysis,
    approachTip,
    culturalInsight,
    aiMessage,
    doneData,
    isStreaming,
  } = useAskScreenshotStore();

  const { turns, sendMessage, isAIResponding } = useAskMessageStream(roomId);

  const {
    micState,
    sttText,
    handleMicClick,
    pendingAudioUrl,
    handleResetAudio,
  } = useVoiceChat(undefined, undefined, setMessage);

  const bottomRef = useScrollToBottom([turns, isAIResponding]);

  const handleSend = () => {
    if (!message.trim()) return;
    if (micState === "recorded" && pendingAudioUrl && message === sttText) {
      sendMessage(message, pendingAudioUrl);
      handleResetAudio();
    } else {
      if (micState === "recorded") handleResetAudio();
      sendMessage(message);
    }
    setMessage("");
  };

  const suggestions = doneData?.suggestions ?? [];

  if (isCreatingRoleplay || isNavigating) {
    return <RoleplayLoading />;
  }

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="-mx-5 border-b border-gray-200 px-5 pb-3 pt-2 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">{t("askScreenshot.title")}</h2>
          <button
            type="button"
            onClick={() => setReportOpen((v) => !v)}
            className="text-gray-500"
          >
            {reportOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {reportOpen && (
          <div className="mt-3 flex flex-col gap-3">
            {analysis?.summary && (
              <p className="text-sm text-gray-600">{analysis.summary}</p>
            )}

            {(opponentAnalysis || isStreaming) && (
              <section className="bg-linear-to-br flex flex-col gap-2 rounded-xl border border-purple-200 from-purple-50 to-fuchsia-50 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-purple-500 text-white">
                    <User size={14} />
                  </span>
                  <h3 className="text-sm font-bold text-purple-900">
                    {t("askScreenshot.opponentTitle")}
                  </h3>
                </div>
                {opponentAnalysis ? (
                  <p className="whitespace-pre-wrap pl-8 text-xs text-gray-700">
                    {opponentAnalysis}
                  </p>
                ) : (
                  <div className="pl-8">
                    <Spinner size="14px" />
                  </div>
                )}
              </section>
            )}

            {(toneAnalysis || (isStreaming && opponentAnalysis)) && (
              <section className="bg-linear-to-br flex flex-col gap-2 rounded-xl border border-pink-200 from-pink-50 to-rose-50 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-pink-500 text-white">
                    <MessageCircle size={14} />
                  </span>
                  <h3 className="text-sm font-bold text-pink-900">
                    {t("askScreenshot.toneTitle")}
                  </h3>
                </div>
                {toneAnalysis ? (
                  <p className="whitespace-pre-wrap pl-8 text-xs text-gray-700">
                    {toneAnalysis}
                  </p>
                ) : (
                  <div className="pl-8">
                    <Spinner size="14px" />
                  </div>
                )}
              </section>
            )}

            {approachTip && (
              <section className="bg-linear-to-br flex flex-col gap-2 rounded-xl border border-emerald-200 from-emerald-50 to-teal-50 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Compass size={14} />
                  </span>
                  <h3 className="text-sm font-bold text-emerald-900">
                    {t("ask.bestWay")}
                  </h3>
                </div>
                <p className="pl-8 text-xs text-gray-700">{approachTip}</p>
              </section>
            )}

            {(suggestions.length > 0 || aiMessage) && (
              <section className="bg-linear-to-br flex flex-col gap-3 rounded-xl border border-blue-200 from-blue-50 to-indigo-50 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    💡
                  </span>
                  <h3 className="text-sm font-bold text-blue-900">
                    {t("askScreenshot.suggestionsTitle")}
                  </h3>
                </div>
                {suggestions.length > 0 ? (
                  <ul className="flex flex-col gap-2.5">
                    {suggestions.map((s, i) => (
                      <li
                        key={i}
                        className="relative flex flex-col gap-1.5 rounded-lg border border-blue-100 bg-white p-3 shadow-sm transition hover:border-blue-300 hover:shadow"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
                            {i + 1}
                          </span>
                          <p className="flex-1 text-sm font-semibold text-gray-900">
                            {s.korean}
                          </p>
                        </div>
                        <p className="pl-7 text-xs text-gray-600">
                          {s.translated}
                        </p>
                        <p className="pl-7 text-xs italic text-blue-600/80">
                          {s.explanation}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="whitespace-pre-wrap text-xs text-gray-700">
                    {aiMessage}
                  </p>
                )}
              </section>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 pb-2 pt-4">
        {culturalInsight && (
          <section className="flex flex-col gap-1 rounded-lg border-b border-gray-400 p-3 pb-2 text-sm">
            <div className="mb-1 flex items-center gap-1 text-blue-600">
              <Lightbulb size={14} />
              {t("ask.culturalInsights")}
            </div>
            {insightOpen ? (
              <>
                <p className="whitespace-pre-wrap text-gray-900">
                  {culturalInsight}
                </p>
                <div className="flex items-center justify-center">
                  <ChevronUp
                    className="size-3"
                    onClick={() => setInsightOpen(false)}
                  />
                </div>
              </>
            ) : (
              <>
                <p className="truncate text-gray-700">{culturalInsight}</p>
                <div className="flex items-center justify-center">
                  <ChevronDown
                    className="size-3"
                    onClick={() => setInsightOpen(true)}
                  />
                </div>
              </>
            )}
          </section>
        )}
        {turns.map((turn, i) => {
          return (
            <div key={i} className="mt-5 flex flex-col gap-3">
              <MessageItem
                messages={{ content: turn.userContent }}
                isMine
                coaching={turn.coaching}
              />
              {turn.aiMessage && (
                <MessageItem
                  messages={{
                    content: turn.aiMessage,
                    messageId: turn.messageId,
                  }}
                  isAI
                  translatedContent={turn.translatedContent}
                />
              )}
            </div>
          );
        })}
        {isAIResponding && <ChatLoading />}
        <div ref={bottomRef} />
      </div>

      <div className="sticky bottom-0 -mx-5 flex flex-col px-5 pb-5 backdrop-blur-md">
        <Button
          variant="ghost"
          className="mb-3 text-base"
          onClick={handleRolePlay}
        >
          Start Role-play
        </Button>
        <ChatInput
          message={message}
          setMessage={setMessage}
          onMicClick={handleMicClick}
          onSend={handleSend}
          disabled={isAIResponding || isStreaming}
          micState={micState}
          placeholder={t("askChat.placeholderDefault")}
        />
      </div>
    </div>
  );
}
