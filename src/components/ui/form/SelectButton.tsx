import { TONE_OPTIONS } from "@/constants";

interface SelectButtonProps {
  selectedTone: string;
  onSelect: (value: string) => void;
}

export default function SelectButton({
  selectedTone,
  onSelect,
}: SelectButtonProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-gray-700">
        Level of closeness
      </p>
      <div className="grid grid-cols-2 gap-3">
        {TONE_OPTIONS.map((tone) => (
          <button
            key={tone.value}
            type="button"
            onClick={() => onSelect(tone.value)}
            className={`cursor-pointer rounded-lg px-4 py-3 text-left transition-all ${selectedTone === tone.value ? "bg-white" : "bg-white/50"} `}
          >
            <div className="text-sm font-semibold">{tone.label}</div>
            <div className="text-xs text-gray-500">{tone.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
