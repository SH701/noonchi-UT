interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-27 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold  rounded-lg leading-5 transition-all cursor-pointer"
    >
      {label}
    </button>
  );
}
