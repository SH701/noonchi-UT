"use client";

import { useState } from "react";
import { ChatInput, ChatLoading } from "../../components/common";

import { useAskMessageStream, useAskStream } from "@/hooks/mutations";
import { Spinner } from "../../components/ui/spinner/spinner";
import ChatQuickActions from "./ChatQuickActions";
import { useScrollToBottom, useVoiceChat } from "@/hooks/custom";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { CominSoonModal } from "@/components/modal";
import AskSteps from "./AskSteps";
import MessageItem from "@/components/chatroom/MessageItem";

export default function AskChat() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [started, setStarted] = useState(false);

  const [step, setStep] = useState<"askTarget" | "closeness" | "situation">(
    "askTarget",
  );
  const [askTarget, setAskTarget] = useState("");
  const [closeness, setCloseness] = useState("");
  const [, setSituation] = useState("");

  const {
    mutate: createAsk,
    isPending,
    approachTip,
    aiMessage,
    culturalInsight,
    conversationId,
  } = useAskStream();

  const { turns, sendMessage, isAIResponding } = useAskMessageStream(
    Number(conversationId),
  );
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
    createAsk({ askTarget, closeness, situation });
  };

  const handleAskStream = () => {
    if (!message.trim()) return;

    if (!started) {
      if (step === "askTarget") {
        setAskTarget(message);
        setStep("closeness");
        setMessage("");
        return;
      }
      if (step === "situation") {
        setSituation(message);
        setMessage("");
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
    setOpen((prev) => !prev);
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
              setCloseness(value);
              setStep("situation");
            }}
          />
        )}

        {/* 로딩 */}
        {isPending && !aiMessage && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Spinner size="64px" />
            <span>Processing AI...</span>
          </div>
        )}

        {/* 스트리밍 결과 */}
        {aiMessage && (
          <div className="mb-1 flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-semibold">
                Here is the best way to say it
              </span>
              <span className="text-gray-600">{approachTip}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="max-w-61 mb-5 flex flex-col gap-2 rounded-b-xl rounded-tr-xl border border-gray-300 bg-white p-4">
                <p className="my-1 text-sm">{aiMessage}</p>
              </div>
              <div className="flex flex-col gap-1 border-b border-gray-400 pb-2 text-sm">
                <div className="flex gap-1 text-blue-600">
                  <Lightbulb size={14} /> Cultural Insights
                </div>
                {open ? (
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
            <MessageItem messages={{ content: turn.userContent }} isMine />
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
                {turn.culturalInsight && (
                  <p className="text-sm text-gray-500">
                    {turn.culturalInsight}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
        {isAIResponding && <ChatLoading />}
        <div ref={bottomRef} />
      </div>

      {/* 하단 고정 ChatInput */}
      <div className="sticky bottom-0 flex flex-col pb-5 backdrop-blur-md">
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
                ? "Who are you talking to?"
                : step === "situation"
                  ? "Describe the situation..."
                  : "Type your answer..."
            }
          />
        )}
      </div>
    </div>
  );
}
