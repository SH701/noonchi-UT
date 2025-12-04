import React from "react";

interface Props {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function FormInput({
  label,
  required,
  value,
  onChange,
  placeholder,
  className,
  disabled,
}: Props) {
  return (
    <div className="mb-6">
      <label className="text-sm font-semibold text-black mb-2 flex gap-2">
        {label} {required && <p className="text-red-500">*</p>}
      </label>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-[335px] p-2.5 rounded-lg border ${
          className || "border-gray-200 bg-white"
        }  text-black placeholder-gray-400 placeholder:text-sm`}
        placeholder={placeholder}
      />
    </div>
  );
}
