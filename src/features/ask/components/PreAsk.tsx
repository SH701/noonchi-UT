"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import AskChat from "./AskChat";
import AskScreenshot from "./AskScreenshot";
import { useTranslation } from "react-i18next";

type Mode = "intro" | "manual" | "screenshot";

export default function PreAsk() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("intro");

  if (mode === "manual") return <AskChat />;
  if (mode === "screenshot")
    return <AskScreenshot onSwitchToManual={() => setMode("manual")} />;

  return (
    <div className="flex flex-1 flex-col">
      <div className="pt-6">
        <div className="flex flex-col gap-3">
          <span className="text-3xl font-medium">{t("ask.title")}</span>
          <span className="text-gray-600">{t("ask.subtitle")}</span>
        </div>
      </div>

      {/* 중앙: 스크린샷 분석 카드 */}
      <div className="flex flex-1 items-center justify-center px-4">
        <button
          type="button"
          onClick={() => setMode("screenshot")}
          className="flex w-full flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 transition hover:border-gray-400 hover:bg-gray-100"
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-sm">
            <ImageIcon className="size-8 text-gray-500" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-semibold">
              {t("askScreenshot.analyzeCard")}
            </span>
            <span className="text-center text-sm text-gray-500">
              {t("askScreenshot.analyzeCardDesc")}
            </span>
          </div>
        </button>
      </div>

      {/* 하단: 텍스트 입력 */}
      <div
        className="flex w-full justify-center pb-10"
      >
        <button
          type="button"
          onClick={() => setMode("manual")}
          className="text-sm text-gray-500 underline underline-offset-2"
        >
          {t("askScreenshot.typeManually")}
        </button>
      </div>
    </div>
  );
}
