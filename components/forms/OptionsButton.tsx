interface Props {
  options: readonly { value: string; label: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function OptionButtons({ options, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2.5 items-center justify-between">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          className={`p-2.5 h-11 w-22 rounded-lg text-sm font-medium transition-colors ${
            selected === option.value
              ? "bg-blue-50 text-[#3B6BF0] border-blue-600 border"
              : " text-gray-400 hover:bg-gray-200 border border-gray-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
