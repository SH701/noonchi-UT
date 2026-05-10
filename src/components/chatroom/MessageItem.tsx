"use client";

import { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { useMessageTranslate, useMessageTTS } from "@/hooks/mutations";
import { Spinner } from "../ui/spinner/spinner";
import { ChatLoading } from "../common";
import { AlpabatIcon, InfoIcon, VolumeUpIcon } from "@/assets/svgr";
import { Asterisk, Lightbulb } from "lucide-react";
import { renderWithAction } from "@/lib/renderWithAction";
import { MyAI } from "@/types/conversations";
interface MessageItemProps {
  messages: {
    content: string;
    visualAction?: string;
    isLoading?: boolean;
    messageId?: number;
    hiddenMeaning?: string;
    feedback?: { nuanceFeedback: string };
  };
  myAI?: MyAI | null;
  isMine?: boolean;
  isAI?: boolean;
  showsituation?: boolean;
  isPreview?: boolean;
  aiName?: string;
  userName?: string;
  hiddenMeaning?: string;
  isRevealed?: boolean;
  onToggleReveal?: () => void;
  translatedContent?: string;
  previewFeedback?: string;
  onInfoClick?: () => void;
  coaching?: string;
}

export default function MessageItem({
  messages,
  myAI,
  isMine,
  isAI,
  aiName,
  userName,
  hiddenMeaning,
  isRevealed,
  onToggleReveal,
  previewFeedback,
  onInfoClick,
  coaching,
  translatedContent,
}: MessageItemProps) {
  const { t } = useTranslation();
  const [translateOpen, setTranslateOpen] = useState(false);
  const [translateMsg, setTranslateMsg] = useState<string | undefined>("");
  const [meanOpen, setMeanOpen] = useState(false);
  const isMeanOpen =
    onToggleReveal !== undefined ? (isRevealed ?? false) : meanOpen;
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [coachingOpen, setCoachingOpen] = useState(false);

  const { mutate: tts, isPending: loadingTTS } = useMessageTTS();
  const { mutateAsync: translate, isPending: loadingTranslate } =
    useMessageTranslate();
  const handleFeedback = () => {
    setFeedbackOpen((prev) => !prev);
  };
  const handleTTsClick = (text: string) => {
    tts(text);
  };

  const handleTranslateClick = async (messageId: number | undefined) => {
    if (translateOpen) {
      setTranslateOpen(false);
      return;
    }
    if (translatedContent) {
      setTranslateMsg(translatedContent);
      setTranslateOpen(true);
      return;
    }
    if (!messageId) return;
    const result = await translate(messageId);
    setTranslateMsg(result);
    setTranslateOpen(true);
  };
  const handleHiddenMean = () => {
    if (onToggleReveal) {
      onToggleReveal();
    } else {
      setMeanOpen((prev) => !prev);
    }
  };

  if (messages.isLoading && !isMine) {
    return <ChatLoading />;
  }
  return (
    <>
      <div
        className={clsx(
          "mb-4 flex gap-2",
          isMine ? "justify-end" : "flex flex-col justify-start",
        )}
      >
        {isMine ||
          (isAI && (
            <div
              className="mb-1 flex cursor-pointer flex-row gap-2"
              onClick={onInfoClick}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/50">
                <span>{(aiName ?? myAI?.aiRole ?? "A")[0].toUpperCase()}</span>
              </div>
              <p className="pt-1.5 text-sm font-medium">
                {aiName ?? myAI?.name ?? "AI"}
              </p>
            </div>
          ))}

        {/* 메시지 박스 */}
        <div className="w-[75%]">
          {/* 유저 말풍선 박스 */}
          {isMine && (
            <div className="flex flex-col gap-1">
              <p className="pt text-end text-sm font-medium">
                {userName ?? myAI?.userRole}
              </p>
              <div className="flex flex-col gap-2 rounded-b-xl rounded-tl-xl bg-white p-4">
                <p className="my-1 whitespace-pre-wrap text-sm">
                  {renderWithAction(messages.content)}
                </p>
                <div className="border-t border-gray-200 pt-2.5" />
                <div className="flex justify-between gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTTsClick(messages.content)}
                      disabled={loadingTTS}
                      className="cursor-pointer"
                    >
                      {loadingTTS ? <Spinner /> : <VolumeUpIcon size={20} />}
                    </button>

                    {(messages.messageId || translatedContent) && (
                      <button
                        onClick={() => handleTranslateClick(messages.messageId)}
                        className="cursor-pointer"
                      >
                        {loadingTranslate ? (
                          <Spinner />
                        ) : (
                          <AlpabatIcon size={20} />
                        )}
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {coaching && (
                      <button
                        className="flex cursor-pointer items-center gap-1 rounded-full border border-blue-500 px-2 py-1"
                        onClick={() => setCoachingOpen((v) => !v)}
                      >
                        <Lightbulb size={14} className="text-blue-500" />
                        <span className="text-xs text-blue-500">
                          {coachingOpen
                            ? t("ask.hideCoaching")
                            : t("ask.viewCoaching")}
                        </span>
                      </button>
                    )}
                    {(previewFeedback ?? messages.feedback?.nuanceFeedback) &&
                      (feedbackOpen ? (
                        <button
                          className="flex cursor-pointer gap-1 rounded-full border border-blue-500 px-2 py-1"
                          onClick={handleFeedback}
                        >
                          <InfoIcon className="text-blue-500" />
                          <span className="text-sm text-blue-500">
                            Hide feedback
                          </span>
                        </button>
                      ) : (
                        <button
                          className="flex cursor-pointer gap-1 rounded-full border border-blue-500 px-2 py-1"
                          onClick={handleFeedback}
                        >
                          <InfoIcon className="text-blue-500" />
                          <span className="text-sm text-blue-500">
                            View feedback
                          </span>
                        </button>
                      ))}
                  </div>
                </div>

                {coachingOpen && coaching && (
                  <span className="text-sm">{coaching}</span>
                )}
                {feedbackOpen && (
                  <span>
                    {previewFeedback ?? messages.feedback?.nuanceFeedback}
                  </span>
                )}
                {translateOpen && <span>{translateMsg}</span>}
              </div>
            </div>
          )}
          {/* System 컨텐츠 */}
          {!isMine && !isAI && (
            <div className="flex w-full gap-1 pr-2 text-sm text-blue-500">
              <Asterisk className="shrink-0" />
              <p>{messages.content}</p>
            </div>
          )}
          {/* AI 말풍선 */}
          {isAI && (
            <>
              <div className="flex flex-col gap-2 rounded-b-xl rounded-tr-xl border border-gray-300 bg-white p-4">
                <p className="my-1 whitespace-pre-wrap text-sm leading-[130%]">
                  {messages.content}
                </p>
                <div className="mt-2 flex justify-between border-t border-gray-200 pt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTTsClick(messages.content)}
                      disabled={loadingTTS}
                      className="cursor-pointer"
                    >
                      {loadingTTS ? <Spinner /> : <VolumeUpIcon size={20} />}
                    </button>

                    <button
                      onClick={() => handleTranslateClick(messages.messageId)}
                      className="cursor-pointer"
                    >
                      {loadingTranslate ? (
                        <Spinner />
                      ) : (
                        <AlpabatIcon size={20} />
                      )}
                    </button>
                  </div>

                  {(hiddenMeaning ?? messages.hiddenMeaning) && (
                    <button
                      className="border-gradient-primary cursor-pointer rounded-full border px-2 py-1"
                      onClick={handleHiddenMean}
                    >
                      👀{" "}
                      <span className="text-gradient-primary text-xs font-semibold">
                        Really mean
                      </span>
                    </button>
                  )}
                </div>
                {translateOpen && <span>{translateMsg}</span>}
              </div>
            </>
          )}
        </div>
        {isMeanOpen && (
          <div className="w-full max-w-[75%] rounded-xl border border-white bg-white/50 p-4">
            <span className="text-sm text-gray-800">
              👀 {hiddenMeaning ?? messages.hiddenMeaning}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
