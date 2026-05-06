import type { TFunction } from "i18next";

export const getToneOptions = (t: TFunction) => [
  { value: "casual", label: t("closeness.casual"), description: t("toneDescription.casual") },
  { value: "friendly", label: t("closeness.friendly"), description: t("toneDescription.friendly") },
  { value: "professional", label: t("closeness.professional"), description: t("toneDescription.professional") },
  { value: "formal", label: t("closeness.formal"), description: t("toneDescription.formal") },
];

export type InterviewStyle = "casual" | "friendly" | "professional" | "formal";
