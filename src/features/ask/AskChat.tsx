"use client";

import { useState } from "react";
import { ChatInput } from "../../components/common";

import { useAsk } from "@/hooks/mutations";
import { Spinner } from "../../components/ui/spinner/spinner";
import { CLOSENESS_OPTIONS, Step, STEP_QUESTIONS, STEPS } from "@/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";

export default function AskChat() {
  const [step, setStep] = useState<Step>("askTarget");
  const [message, setMessage] = useState("");
  const [askTarget, setAskTarget] = useState("");
  const [closeness, setCloseness] = useState("");
  const [situation, setSituation] = useState("");
  const { mutate: createAsk, isPending } = useAsk();
  const router = useRouter();

  const currentStepIdx = STEPS.indexOf(step);

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
    createAsk(
      {
        askTarget,
        closeness,
        situation: message.trim(),
      },
      {
        onSuccess: (data) => {
          const query = new URLSearchParams({
            askTarget,
            closeness,
            situation: message.trim(),
          }).toString();
          router.push(`/main/ask/${data.conversationId}?${query}`);
        },
      },
    );
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
          <div className="mt-2 flex justify-end">
            <div className="w-61 flex flex-col gap-2 rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
              <p className="text-sm">{askTarget}</p>
            </div>
          </div>
        )}
        {/* 가까움 정도 */}
        {currentStepIdx >= 1 && (
          <div className="mb-6 flex flex-col gap-2">
            <span className="text-xl font-semibold">
              {STEP_QUESTIONS.closeness}
            </span>
            <span className="text-gray-600">
              This helps me understand the right tone
            </span>
            {closeness ? (
              <div className="mt-2 flex justify-end">
                <div className="rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
                  <p className="text-sm">
                    {CLOSENESS_OPTIONS.find((o) => o.value === closeness)
                      ?.label ?? closeness}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
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
          <div className="mb-6 flex flex-col">
            <span className="text-xl font-semibold">
              {STEP_QUESTIONS.situation}
            </span>
            <span className="text-gray-600">
              Describe the situation or what you want to express
            </span>
            {situation && (
              <div className="mt-2 flex justify-end">
                <div className="rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
                  <p className="text-sm">{situation}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 로딩 */}
        {isPending && (
          <div className="flex flex-col gap-2 pt-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <Spinner size="64px" />
              <span>Processing AI...</span>
            </div>
          </div>
        )}
      </div>

      {/* 하단 고정 ChatInput */}
      <div className="sticky bottom-0 flex flex-col pb-5 backdrop-blur-md">
        {step === "askTarget" && (
          <ChatInput
            message={message}
            setMessage={setMessage}
            onSend={handleSendTarget}
            placeholder="Type your answer..."
          />
        )}
        {step === "situation" && (
          <ChatInput
            message={message}
            setMessage={setMessage}
            onSend={handleSendSituation}
            disabled={isPending}
            placeholder="Type your answer..."
          />
        )}
      </div>
    </div>
  );
}
