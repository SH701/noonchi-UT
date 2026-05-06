import { getToneOptions } from "@/constants";
import { useTranslation } from "react-i18next";

interface SelectButtonProps {
  selectedTone: string;
  onSelect: (value: string) => void;
}

export default function SelectButton({
  selectedTone,
  onSelect,
}: SelectButtonProps) {
  const { t } = useTranslation();
  const TONE_OPTIONS = getToneOptions(t);
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-gray-700">
        {t("selectButton.label")}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {TONE_OPTIONS.map((tone) => (
          <button
            key={tone.value}
            type="button"
            onClick={() => onSelect(tone.value)}
            className={`cursor-pointer rounded-lg px-4 py-3 text-left transition-all ${selectedTone === tone.value ? "border bg-white" : "bg-white/50"} `}
          >
            <div className="text-sm font-semibold">{tone.label}</div>
            <div className="text-xs text-gray-500">{tone.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
