"use client";

import { usePathname } from "next/navigation";
import { Spinner } from "../spinner/spinner";
import { WandIcon } from "@/assets/svgr";


interface TextInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onClick?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function TextInput({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  required,
  className = "",
  disabled,
  onClick,
}: TextInputProps) {
  const pathname = usePathname();
  return (
    <div className="relative flex w-full flex-col space-y-2">
      {label && (
        <label className="flex gap-1 text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        className={`outline-none" w-full rounded-xl border border-gray-400 bg-white py-2.5 pl-2.5 pr-10 text-base text-gray-800 placeholder-gray-400 transition-colors placeholder:text-base focus:shadow-[0_0_8px_0_rgba(133,162,255,0.50)] focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 ${className} `}
      />
      {pathname.startsWith("/main/roleplay/create") &&
        (disabled ? (
          <Spinner className="absolute right-3 top-10" />
        ) : (
          <button
            className="absolute right-3 top-10 cursor-pointer"
            onClick={onClick}
            type="button"
          >
            <WandIcon />
          </button>
        ))}
    </div>
  );
}
