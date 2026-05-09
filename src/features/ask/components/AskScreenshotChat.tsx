"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import MessageItem from "@/components/chatroom/MessageItem";
import { ChatInput, ChatLoading } from "@/components/common";
import { Spinner } from "@/components/ui/spinner/spinner";
import { useScrollToBottom, useVoiceChat } from "@/hooks/custom";
import { useAskScreenshotStore } from "@/store/useAskScreenshotStore";
import { useAskMessageStream } from "../hooks/useAskMessageStream";

interface AskScreenshotChatProps {
  roomId: number;
}

export default function AskScreenshotChat({ roomId }: AskScreenshotChatProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [reportOpen, setReportOpen] = useState(true);
  const [insightOpen, setInsightOpen] = useState(true);

  const {
    previewUrl,
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

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="sticky top-0 z-10 -mx-5 border-b border-gray-200 bg-white/95 px-5 pb-3 pt-2 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">
            {t("askScreenshot.title")}
          </h2>
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
            {previewUrl && (
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="screenshot"
                  className="max-h-40 rounded-lg border border-gray-200 object-contain"
                />
              </div>
            )}

            {analysis?.summary && (
              <p className="text-sm text-gray-600">{analysis.summary}</p>
            )}

            {(opponentAnalysis || isStreaming) && (
              <section className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <h3 className="text-sm font-semibold">
                  {t("askScreenshot.opponentTitle")}
                </h3>
                {opponentAnalysis ? (
                  <p className="whitespace-pre-wrap text-xs text-gray-700">
                    {opponentAnalysis}
                  </p>
                ) : (
                  <Spinner size="14px" />
                )}
              </section>
            )}

            {(toneAnalysis || (isStreaming && opponentAnalysis)) && (
              <section className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <h3 className="text-sm font-semibold">
                  {t("askScreenshot.toneTitle")}
                </h3>
                {toneAnalysis ? (
                  <p className="whitespace-pre-wrap text-xs text-gray-700">
                    {toneAnalysis}
                  </p>
                ) : (
                  <Spinner size="14px" />
                )}
              </section>
            )}

            {approachTip && (
              <section className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <h3 className="text-sm font-semibold">{t("ask.bestWay")}</h3>
                <p className="text-xs text-gray-700">{approachTip}</p>
              </section>
            )}

            {(suggestions.length > 0 || aiMessage) && (
              <section className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <h3 className="text-sm font-semibold">
                  {t("askScreenshot.suggestionsTitle")}
                </h3>
                {suggestions.length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {suggestions.map((s, i) => (
                      <li
                        key={i}
                        className="flex flex-col gap-0.5 rounded-md border border-gray-100 bg-white p-2"
                      >
                        <p className="text-sm font-medium">{s.korean}</p>
                        <p className="text-xs text-gray-500">{s.translated}</p>
                        <p className="text-xs italic text-gray-400">
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

            {culturalInsight && (
              <section className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs">
                <div className="mb-1 flex items-center gap-1 text-blue-600">
                  <Lightbulb size={14} />
                  {t("ask.culturalInsights")}
                </div>
                {insightOpen ? (
                  <>
                    <p className="whitespace-pre-wrap text-gray-700">
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
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 pt-4 pb-2">
        {turns.map((turn, i) => (
          <div key={i} className="flex flex-col gap-2">
            <MessageItem messages={{ content: turn.userContent }} isMine />
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
        ))}
        {isAIResponding && <ChatLoading />}
        <div ref={bottomRef} />
      </div>

      <div className="sticky bottom-0 -mx-5 flex flex-col px-5 pb-5 backdrop-blur-md">
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
