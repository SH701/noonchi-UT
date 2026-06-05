"use client";

import SpinnerLoading from "@/components/common/SpinnerLoading";
import { useTranslation } from "react-i18next";

export default function RoleplayLoading() {
  const { t } = useTranslation();
  return <SpinnerLoading title={t("roleplayLoading.title")} />;
}
