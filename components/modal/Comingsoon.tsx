interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoon({ isOpen, onClose }: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-[343px]">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          This feature is coming soon
        </h3>
        <p className="text-base text-gray-700 mb-6 text-center">
          Sorry for the inconvenience. <br />
          We`re preparing a better experience for you
        </p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
