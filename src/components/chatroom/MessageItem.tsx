"use client";

import { useState } from "react";
import clsx from "clsx";
import { MyAI } from "@/types/etc";

import {
  useMessageFeedback,
  useMessageTTS,
  useMessageTranslate,
} from "@/hooks/mutations";
import { Spinner } from "../ui/spinner/spinner";
import { ChatLoading } from "../common";
import {
  InfoIcon,
  LanguageIcon,
  RefreshIcon,
  VolumeUpIcon,
} from "@/assets/svgr";
import { Asterisk } from "lucide-react";
import { renderWithAction } from "@/lib/renderWithAction";
interface MessageItemProps {
  messages: {
    content: string;
    visualAction?: string;
    isLoading?: boolean;
    messageId?: number;
    hiddenMeaning?: string;
  };
  myAI?: MyAI | null;
  isMine?: boolean;
  isAI?: boolean;
  isFirstAIMessage?: boolean;
  isPending?: boolean;
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
}

export default function MessageItem({
  messages,
  myAI,
  isMine,
  isAI,
  isPending,
  aiName,
  userName,
  hiddenMeaning,
  isRevealed,
  onToggleReveal,
  translatedContent,
  previewFeedback,
  onInfoClick,
}: MessageItemProps) {
  const [translateOpen, setTranslateOpen] = useState(false);
  const [meanOpen, setMeanOpen] = useState(false);
  const isMeanOpen =
    onToggleReveal !== undefined ? (isRevealed ?? false) : meanOpen;
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const { data: translateText, mutate: translate } = useMessageTranslate();
  const { mutate: tts, isPending: loadingTTS } = useMessageTTS();
  const { data: feedbackData, isPending: loaidngFeedback } = useMessageFeedback(
    feedbackOpen && !isPending ? messages.messageId : undefined,
  );

  const handleFeedback = () => {
    setFeedbackOpen((prev) => !prev);
  };
  const handleTTsClick = (text: string) => {
    tts(text);
  };

  const handleTranslateClick = (messageId: number | undefined) => {
    if (!messageId && !translatedContent) return;
    if (!translateOpen && messageId) {
      translate(messageId);
    }
    setTranslateOpen((prev) => !prev);
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
            <div className="mb-1 flex flex-row gap-2 cursor-pointer" onClick={onInfoClick}>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/50">
                <span>{(aiName ?? myAI?.aiRole ?? "A")[0].toUpperCase()}</span>
              </div>
              <p className="pt-1.5 text-sm font-medium">
                {aiName ?? myAI?.name ?? "AI"}
              </p>
            </div>
          ))}

        {/* 메시지 박스 */}
        <div className={clsx(!isMine && !isAI ? "w-full" : "w-61")}>
          {/* 유저 말풍선 박스 */}
          {isMine && (
            <div className="flex flex-col gap-1">
              <p className="pt text-end text-sm font-medium">
                {userName ?? myAI?.userRole}
              </p>
              <div className="rounded-b-xl rounded-tl-xl bg-white p-4">
                <p className="whitespace-pre-wrap pb-2 pt-1 text-sm">
                  {renderWithAction(messages.content)}
                </p>
                {messages.visualAction && (
                  <div className="flex min-w-0 pb-2 text-sm text-gray-500">
                    <div className="pt-[2.5px]">
                      <Asterisk className="size-3.5 shrink-0" />{" "}
                    </div>
                    {messages.visualAction}
                    <div className="pt-[2.5px]">
                      <Asterisk className="size-3.5 shrink-0" />{" "}
                    </div>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2.5" />
                {feedbackOpen ? (
                  <div>
                    <span>
                      {previewFeedback ?? feedbackData?.nuanceFeedback}
                    </span>
                    <button
                      className="mt-2.5 flex gap-1 rounded-full border border-blue-500 px-2 py-1"
                      onClick={handleFeedback}
                      disabled={loaidngFeedback}
                    >
                      {loaidngFeedback ? (
                        <Spinner />
                      ) : (
                        <div className="flex gap-1">
                          <InfoIcon className="text-blue-500" />
                          <span className="text-sm text-blue-500">
                            Hide feedback
                          </span>
                        </div>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <button
                      className="flex gap-1 rounded-full border border-blue-500 px-2 py-1"
                      onClick={handleFeedback}
                    >
                      <InfoIcon className="text-blue-500" />
                      <span className="text-sm text-blue-500">
                        View feedback
                      </span>
                    </button>
                    <RefreshIcon size={20} />
                  </div>
                )}
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
                    >
                      {loadingTTS ? <Spinner /> : <VolumeUpIcon size={20} />}
                    </button>

                    <button
                      onClick={() => handleTranslateClick(messages.messageId)}
                    >
                      <LanguageIcon />
                    </button>
                  </div>

                  <button
                    className="border-gradient-primary rounded-full border px-2 py-1"
                    onClick={handleHiddenMean}
                  >
                    👀{" "}
                    <span className="text-gradient-primary text-xs font-semibold">
                      Really mean
                    </span>
                  </button>
                </div>
                {translateOpen && (
                  <span>{translatedContent ?? translateText}</span>
                )}
              </div>
            </>
          )}
        </div>
        {isMeanOpen && (
          <div className="w-61 rounded-xl border border-white bg-white/50 p-4">
            <span className="text-sm text-gray-800">
              👀 {hiddenMeaning ?? messages.hiddenMeaning}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
