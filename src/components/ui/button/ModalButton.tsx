interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function ModalButton({
  label,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
    w-[236px] h-12
    bg-blue-600 hover:bg-blue-700
    text-blue-50 font-semibold
    rounded-lg leading-5 transition-all
    flex items-center justify-center
    cursor-pointer
  "
    >
      {label}
    </button>
  );
}
