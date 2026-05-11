import { MessageSquareText } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EmptyItem() {
  const { t } = useTranslation();
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-linear-to-br from-blue-50 to-indigo-100 shadow-sm">
        <MessageSquareText className="size-10 text-blue-400" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-base font-semibold text-gray-800">
          {t("postList.empty")}
        </span>
        <span className="text-sm text-gray-500">
          {t("postList.emptyDescription")}
        </span>
      </div>
    </div>
  );
}
