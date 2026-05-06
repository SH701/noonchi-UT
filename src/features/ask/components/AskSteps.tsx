"use client";

import { getClosenessOptions, Step, STEPS } from "@/constants";
import { Button } from "@/components/ui/button/button";
import { useTranslation } from "react-i18next";

interface AskStepsProps {
  step: Step;
  askTarget: string;
  closeness: string;
  onSelectCloseness: (value: string) => void;
}

export default function AskSteps({
  step,
  askTarget,
  closeness,
  onSelectCloseness,
}: AskStepsProps) {
  const { t } = useTranslation();
  const CLOSENESS_OPTIONS = getClosenessOptions(t);
  const currentStepIdx = STEPS.indexOf(step);

  return (
    <>
      <span className="text-2xl font-semibold">{t("ask.title")}</span>
      <span className="text-gray-600">{t("ask.hints.hint1")}</span>
      {askTarget && (
        <div className="flex justify-end">
          <div className="mt-5 flex flex-col gap-2 rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
            <p className="text-sm">{askTarget}</p>
          </div>
        </div>
      )}

      {currentStepIdx >= 1 && (
        <div className="mt-5 flex flex-col">
          <span className="text-2xl font-semibold">{t("ask.subtitle")}</span>
          <span className="text-gray-600">{t("ask.hints.hint2")}</span>
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
                  onClick={() => onSelectCloseness(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {currentStepIdx >= 2 && (
        <div className="mt-5 flex flex-col">
          <span className="text-2xl font-semibold">{t("ask.startButton")}</span>
          <span className="text-gray-600">{t("ask.hints.hint3")}</span>
        </div>
      )}
    </>
  );
}
