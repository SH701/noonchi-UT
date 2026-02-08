"use client";

import { useState } from "react";
import { ChatInput } from "../common";
import { Button } from "@/components/ui/button/button";
import { useAsk } from "@/hooks/mutations/useAsk";

type Step = "askTarget" | "closeness" | "situation";

const CLOSENESS_OPTIONS = [
  { label: "Casual", value: "casual" },
  { label: "Friendly", value: "friendly" },
  { label: "Professional", value: "professional" },
  { label: "Formal", value: "formal" },
] as const;

export default function AskInfo() {
  const [step, setStep] = useState<Step>("askTarget");
  const [message, setMessage] = useState("");
  const [askTarget, setAskTarget] = useState("");
  const [closeness, setCloseness] = useState("");
  const { mutate: createAsk } = useAsk();

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
    if (!message.trim()) return;
    createAsk({
      askTarget,
      closeness,
      situation: message.trim(),
    });
  };

  return (
    <div className="flex flex-col flex-1">
      {step === "askTarget" && (
        <>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">Who is this for?</span>
            <span className="text-gray-600">
              This can be something you`re <br /> about to say or do
            </span>
          </div>
          <ChatInput
            message={message}
            setMessage={setMessage}
            onSend={handleSendTarget}
            placeholder="e.g. My boss, my friend..."
          />
        </>
      )}

      {step === "closeness" && (
        <>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold">
              How close are you with them?
            </span>
            <span className="text-gray-600">
              This helps me understand the right tone
            </span>
          </div>
          <div className="flex flex-col gap-3 mt-6">
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
        </>
      )}

      {step === "situation" && (
        <>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              What do you want to say?
            </span>
            <span className="text-gray-600">
              Describe the situation or what you want to express
            </span>
          </div>
          <ChatInput
            message={message}
            setMessage={setMessage}
            onSend={handleSendSituation}
            placeholder="Type your answer..."
          />
        </>
      )}
    </div>
  );
}
