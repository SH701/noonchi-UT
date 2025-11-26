export default function GenderButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-3 rounded-xl border ${
        active
          ? "bg-blue-50 text-blue-600 border-blue-600"
          : "bg-white text-gray-700 border-gray-200"
      }`}
    >
      {children}
    </button>
  );
}
