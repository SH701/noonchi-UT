import type { TFunction } from "i18next";

export type Step = "askTarget" | "closeness" | "situation" | "chat";

export const STEPS: Step[] = ["askTarget", "closeness", "situation", "chat"];

export const getClosenessOptions = (t: TFunction) => [
  { label: t("closeness.casual"), value: "casual" },
  { label: t("closeness.friendly"), value: "friendly" },
  { label: t("closeness.professional"), value: "professional" },
  { label: t("closeness.formal"), value: "formal" },
] as const;

export const getStepQuestions = (t: TFunction): Record<string, string> => ({
  askTarget: t("stepQuestions.askTarget"),
  closeness: t("stepQuestions.closeness"),
  situation: t("stepQuestions.situation"),
});
