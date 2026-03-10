import { Spinner } from "../spinner/spinner";
import { WandIcon } from "@/assets/svgr";
interface TextareaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  onClick: () => void;
  disabled: boolean;
}

export default function Textarea({
  label,
  value,
  onChange,
  placeholder,
  required,
  className,
  onClick,
  disabled,
}: TextareaProps) {
  return (
    <div className="relative flex w-full flex-col space-y-2">
      {label && (
        <label className="flex gap-1 text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        required={required}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`h-30 w-full rounded-xl border border-gray-400 bg-white py-2.5 pl-2.5 pr-10 text-gray-800 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 ${className} `}
      />
      {disabled ? (
        <Spinner className="absolute right-3 top-10" />
      ) : (
        <button
          className="absolute right-3 top-10 cursor-pointer"
          onClick={onClick}
          type="button"
        >
          <WandIcon />
        </button>
      )}
    </div>
  );
}
