import { StarIcon, TalkIcon, UpIcon } from "@/assets/svgr";
import Part from "./Part";
import { useTranslation } from "react-i18next";

interface FeedbackPartProps {
  summary: string;
  goodPoints: string;
  improvementPoints: { point: string; tip: string }[];
}

export default function FeedbackPart({
  summary,
  goodPoints,
  improvementPoints,
}: FeedbackPartProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 pb-2 ">
      <Part title={t("result.feedback.summary")} desc={summary} icon={<TalkIcon />} />
      <Part title={t("result.feedback.wellDone")} desc={goodPoints} icon={<UpIcon />} />
      <Part
        title={t("result.feedback.improve")}
        desc={improvementPoints?.[0]?.point}
        icon={<StarIcon />}
        desc2={improvementPoints?.[0]?.tip}
      />
    </div>
  );
}
