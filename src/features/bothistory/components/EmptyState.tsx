import { EmptyAskIcon } from "@/assets/svgr";
import { useTranslation } from "react-i18next";

export default function EmptyState() {
  const { t } = useTranslation();
  return (
    <div className="mt-20 flex gap-2">
      <EmptyAskIcon className="text-gray-500" />
      <span className="font-medium text-gray-500">{t("botHistory.empty")}</span>
    </div>
  );
}
