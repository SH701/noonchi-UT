import { AlpabatIcon } from "@/assets/svgr";
import { HintMessages } from "@/types/messages";

import { Check, Lightbulb, X } from "lucide-react";

import { useState } from "react";

interface HintProps {
  hintData: HintMessages;
  onSelect: (hint: string) => void;
}

export default function HintMessage({ hintData, onSelect }: HintProps) {
  const [openTranslate, setOpenTranslate] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (suggestion: string, idx: number) => {
    setSelectedIdx(idx);
    onSelect(suggestion);
  };

  return (
    <div className="-mb-6 flex flex-col items-center justify-center gap-2 rounded-t-[20px] border border-white bg-white px-3 pb-7 pt-3 shadow-sm">
      <div className="flex gap-2 text-sm font-medium text-gray-400">
        {selectedIdx === null ? (
          <>
            <Lightbulb className="size-4" />
            <span>Please choose the correct one</span>
          </>
        ) : selectedIdx === hintData.wrong_index ? (
          <div className="flex items-center gap-0.5 text-red-500">
            <X className="size-5.5" />
            <span>Sounds off</span>
          </div>
        ) : (
          <div className="flex items-center gap-0.5">
            <Check className="size-5.5 text-blue-400" />
            <span className="text-text-accent">Sounds Natural</span>
          </div>
        )}
      </div>
      {hintData.suggestions.map((suggestion: string, idx: number) => (
        <div
          key={idx}
          className={`flex w-full cursor-pointer flex-col gap-1 rounded-xl px-3.5 py-3 ${
            selectedIdx === idx
              ? idx === hintData.wrong_index
                ? "border border-red-500"
                : "border-gradient-primary"
              : "border border-gray-300 bg-white/50"
          }`}
          onClick={() => handleSelect(suggestion, idx)}
        >
          <div className="flex justify-between">
            <p className="text-sm text-gray-700">{suggestion}</p>
            <AlpabatIcon
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setOpenTranslate((prev) => (prev === idx ? null : idx));
              }}
              className="text-gray-400"
            />
          </div>
          {openTranslate === idx && (
            <p className="text-sm text-gray-500">
              {hintData.translations[idx]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
