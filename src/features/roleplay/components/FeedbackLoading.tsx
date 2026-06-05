import SpinnerLoading from "@/components/common/SpinnerLoading";
import { useTranslation } from "react-i18next";

export default function FeedbackLoading() {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50">
      <SpinnerLoading title={t("feedbackLoading.title")} />
    </div>
  );
}
