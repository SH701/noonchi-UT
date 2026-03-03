"use client";

import { Button } from "@/components/ui/button/button";

import { useState } from "react";
import AskChat from "./AskChat";

export default function PreAsk() {
  const [step, setStep] = useState<"chat" | "info">("chat");
  const handleStart = () => {
    setStep("info");
  };

  return (
    <>
      {step === "chat" ? (
        <div className="flex flex-1 flex-col">
          <div className="pt-6">
            <div className="flex flex-col gap-3">
              <span className="text-3xl font-medium">
                Not sure how <br /> this might sound?
              </span>
              <span className="text-gray-600">
                I`ll help you understand how it sounds <br />
                in Korean
              </span>
            </div>
          </div>
          <div className="pb-13 mx-auto mt-auto">
            <Button variant="primary" size="lg" onClick={handleStart}>
              Check how is sounds
            </Button>
          </div>
        </div>
      ) : (
        <AskChat />
      )}
    </>
  );
}
