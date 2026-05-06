"use client";

import { Button } from "@/components/ui/button/button";
import { useState } from "react";
import AskChat from "./AskChat";
import { useTranslation } from "react-i18next";

export default function PreAsk() {
  const { t } = useTranslation();
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
                {t("ask.title")}
              </span>
              <span className="text-gray-600">
                {t("ask.subtitle")}
              </span>
            </div>
          </div>
          <div className="mt-auto w-full px-4" style={{ paddingBottom: "clamp(40px, 10vw, 52px)" }}>
            <Button variant="primary" size="lg" onClick={handleStart}>
              {t("ask.startButton")}
            </Button>
          </div>
        </div>
      ) : (
        <AskChat />
      )}
    </>
  );
}
