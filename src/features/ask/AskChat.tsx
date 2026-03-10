"use client";

import { useEffect, useRef, useState } from "react";
import { ChatInput, ChatLoading } from "../../components/common";

import { useAskMessageStream, useAskStream } from "@/hooks/mutations";
import { Spinner } from "../../components/ui/spinner/spinner";
import { CLOSENESS_OPTIONS, Step, STEP_QUESTIONS, STEPS } from "@/constants";
import { Button } from "@/components/ui/button/button";
import ChatQuickActions from "./ChatQuickActions";
import { useVoiceChat } from "@/hooks/custom";
import { BulbIcon, ChevronDownIcon } from "@/assets/svgr";
import { ChevronUp } from "lucide-react";
import { CominSoonModal } from "@/components/modal";

export default function AskChat() {
  const [step, setStep] = useState<Step>("askTarget");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [askTarget, setAskTarget] = useState("");
  const [closeness, setCloseness] = useState("");
  const [situation, setSituation] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

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
      setMessage(sttText);
    }
  }, [sttText, micState]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessage, turns]);
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
  const handleInsight = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="flex w-full flex-1 flex-col">
      <CominSoonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="flex flex-1 flex-col pb-2">
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
                  <BulbIcon size={14} /> Cultural Insights
                </div>
                {open ? (
                  <>
                    {culturalInsight}
                    <div className="flex items-center justify-center">
                      <ChevronDownIcon onClick={handleInsight} />
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
                <div className="w-61 rounded-b-xl rounded-tr-xl border border-gray-300 bg-white p-4">
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
        {isAIResponding && <ChatLoading />}
        <div ref={bottomRef} />
      </div>

      {/* 하단 고정 ChatInput */}
      <div className="sticky bottom-0 flex flex-col pb-5 backdrop-blur-md">
        {aiMessage && (
          <ChatQuickActions onOpenModal={() => setModalOpen(true)} />
        )}
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
