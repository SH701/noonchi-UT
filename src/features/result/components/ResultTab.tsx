import { useTranslation } from "react-i18next";

interface ResultTabProps {
  tab: "Feedback" | "Detailed Metrics";
  setTab: (value: "Feedback" | "Detailed Metrics") => void;
}
export default function ResultTab({ tab, setTab }: ResultTabProps) {
  const { t } = useTranslation();
  return (
    <div className="mb-4.5 py-3.5">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setTab("Feedback")}
          className={`flex-1 border-b-2 py-1.5 text-center text-sm font-semibold transition-all duration-200 ${
            tab === "Feedback"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("result.tabs.transcript")}
        </button>

        <button
          onClick={() => setTab("Detailed Metrics")}
          className={`flex-1 border-b-2 py-1.5 text-center text-sm font-medium transition-all duration-200 ${
            tab === "Detailed Metrics"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("result.tabs.mistakes")}
        </button>
      </div>
    </div>
  );
}
