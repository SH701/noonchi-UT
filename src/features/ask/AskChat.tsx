"use client";

import { useEffect, useRef, useState } from "react";
import { ChatInput } from "../../components/common";

import { useAskMessageStream, useAskStream } from "@/hooks/mutations";
import { Spinner } from "../../components/ui/spinner/spinner";
import { CLOSENESS_OPTIONS, Step, STEP_QUESTIONS, STEPS } from "@/constants";
import { Button } from "@/components/ui/button/button";
import ChatQuickActions from "./ChatQuickActions";
import { useVoiceChat } from "@/hooks/custom";

export default function AskChat() {
  const [step, setStep] = useState<Step>("askTarget");
  const [message, setMessage] = useState("");
  const [askTarget, setAskTarget] = useState("");
  const [closeness, setCloseness] = useState("");
  const [situation, setSituation] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
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
  } = useVoiceChat();
  const currentStepIdx = STEPS.indexOf(step);
  useEffect(() => {
    if (micState === "recorded" && sttText) {
      console.log(sttText, micState);
      setMessage(sttText);
    }
  }, [sttText, micState]);

  const handleSendTarget = () => {
    if (!message.trim()) return;
    setAskTarget(message.trim());
    setMessage("");
    setStep("closeness");
  };

  const handleSelectCloseness = (value: string) => {
    setCloseness(value);
    setMessage("");
    setStep("situation");
  };

  const handleSendSituation = () => {
    if (!message.trim() || isPending) return;
    setSituation(message.trim());
    setMessage("");
    createAsk({
      askTarget,
      closeness,
      situation: message.trim(),
    });
  };
  const handleAskStream = () => {
    if (micState === "recorded" && pendingAudioUrl) {
      sendMessage(sttText ?? "", pendingAudioUrl);
      handleResetAudio();
    } else {
      if (!message.trim()) return;
      sendMessage(message);
    }
    setMessage("");
  };
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex flex-1 flex-col">
        {/* 타겟 */}
        <span className="text-xl font-semibold">
          {STEP_QUESTIONS.askTarget}
        </span>
        <span className="text-gray-600">
          This can be something you`re <br /> about to say or do
        </span>
        {askTarget && (
          <div className="flex justify-end">
            <div className="mt-5 flex flex-col gap-2 rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
              <p className="text-sm">{askTarget}</p>
            </div>
          </div>
        )}
        {/* 가까움 정도 */}
        {currentStepIdx >= 1 && (
          <div className="mt-5 flex flex-col">
            <span className="text-xl font-semibold">
              {STEP_QUESTIONS.closeness}
            </span>
            <span className="text-gray-600">
              This helps me understand the right tone
            </span>
            {closeness ? (
              <div className="flex justify-end">
                <div className="mt-5 rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
                  <p className="text-sm">
                    {CLOSENESS_OPTIONS.find((o) => o.value === closeness)
                      ?.label ?? closeness}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-5 flex flex-col gap-3">
                {CLOSENESS_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelectCloseness(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 상황 */}
        {currentStepIdx >= 2 && (
          <div className="mt-5 flex flex-col">
            <span className="text-xl font-semibold">
              {STEP_QUESTIONS.situation}
            </span>
            <span className="text-gray-600">
              Describe the situation or what you want to express
            </span>
            {situation && (
              <div className="flex justify-end">
                <div className="my-5 rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
                  <p className="text-sm">{situation}</p>
                </div>
              </div>
            )}
          </div>
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
          <div className="mt-5 flex flex-col gap-3">
            {approachTip && (
              <p className="text-sm text-gray-600">{approachTip}</p>
            )}
            <div className="rounded-b-xl rounded-tr-xl border border-gray-300 bg-white p-4">
              <p className="text-sm">{aiMessage}</p>
            </div>
            {culturalInsight && (
              <p className="text-sm text-gray-500">{culturalInsight}</p>
            )}
          </div>
        )}
        {/* 이후 스트리밍 메세지 */}
        {turns.map((turn, i) => (
          <div key={i} className="mt-5 flex flex-col gap-3">
            <div className="flex justify-end">
              <div className="rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
                <p className="text-sm">{turn.userContent}</p>
              </div>
            </div>
            {turn.aiMessage && (
              <>
                {turn.approachTip && (
                  <p className="text-sm text-gray-600">{turn.approachTip}</p>
                )}
                <div className="rounded-b-xl rounded-tr-xl border border-gray-300 bg-white p-4">
                  <p className="text-sm">{turn.aiMessage}</p>
                </div>
                {turn.culturalInsight && (
                  <p className="text-sm text-gray-500">
                    {turn.culturalInsight}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* 하단 고정 ChatInput */}
      <div className="sticky bottom-0 flex flex-col pb-5 backdrop-blur-md">
        {aiMessage && <ChatQuickActions />}
        {step === "askTarget" && (
          <ChatInput
            message={message}
            setMessage={setMessage}
            onSend={handleSendTarget}
            placeholder="Type your answer..."
          />
        )}
        {step === "situation" && !aiMessage && (
          <ChatInput
            message={message}
            setMessage={setMessage}
            onSend={handleSendSituation}
            disabled={isPending}
            placeholder="Type your answer..."
          />
        )}
        {aiMessage && (
          <ChatInput
            message={message}
            setMessage={setMessage}
            onMicClick={handleMicClick}
            onSend={handleAskStream}
            disabled={isAIResponding}
            micState={micState}
            placeholder="Type your answer..."
          />
        )}
      </div>
    </div>
  );
}
