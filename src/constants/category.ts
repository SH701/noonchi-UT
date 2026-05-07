import type { TFunction } from "i18next";

export const MAX_CONTENT = 2000;

export const getCategories = (t: TFunction) => [
  { label: t("category.all"), value: "All" },
  { label: t("category.free"), value: "Free" },
  { label: t("category.question"), value: "Question" },
  { label: t("category.information"), value: "Information" },
  { label: t("category.review"), value: "Review" },
  { label: t("category.etc"), value: "Etc" },
];
