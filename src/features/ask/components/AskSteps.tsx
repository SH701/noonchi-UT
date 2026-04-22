"use client";

import { CLOSENESS_OPTIONS, Step, STEP_QUESTIONS, STEPS } from "@/constants";
import { Button } from "@/components/ui/button/button";

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
  const currentStepIdx = STEPS.indexOf(step);

  return (
    <>
      <span className="text-2xl font-semibold">{STEP_QUESTIONS.askTarget}</span>
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

      {currentStepIdx >= 1 && (
        <div className="mt-5 flex flex-col">
          <span className="text-2xl font-semibold">
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
          <span className="text-2xl font-semibold">
            {STEP_QUESTIONS.situation}
          </span>
          <span className="text-gray-600">
            Describe the situation or what you want to express
          </span>
        </div>
      )}
    </>
  );
}
