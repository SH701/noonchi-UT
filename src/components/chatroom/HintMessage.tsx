import { AlpabatIcon } from "@/assets/svgr";
import { PreviewHint } from "@/types/preview/preview.type";
import { Check, Lightbulb, X } from "lucide-react";
import { useState } from "react";

interface HintProps {
  hintData: PreviewHint;
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
    <div className="flex flex-col items-center justify-center gap-2 bg-white border px-3 pt-3 pb-7 shadow-sm rounded-t-[20px] border-white -mb-6">
      <div className="flex gap-2 text-sm text-gray-400 font-medium">
        {selectedIdx === null ? (
          <>
            <Lightbulb className="size-4" />
            <span>Please choose the correct one</span>
          </>
        ) : selectedIdx === hintData.wrongIndex ? (
          <div className="text-red-500 flex gap-0.5 items-center">
            <X className="size-5.5 " />
            <span>Sounds off</span>
          </div>
        ) : (
          <div className="flex gap-0.5 items-center">
            <Check className="size-5.5 text-blue-400" />
            <span className="text-text-accent">Sounds Natural</span>
          </div>
        )}
      </div>
      {hintData.suggestions.map((suggestion, idx) => (
        <div
          key={idx}
          className={`rounded-xl px-3.5 py-3 w-full flex flex-col gap-1 cursor-pointer ${
            selectedIdx === idx
              ? idx === hintData.wrongIndex
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
