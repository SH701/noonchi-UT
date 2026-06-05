"use client";



import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/common/Header";

export default function CoachBackButton() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Header
      leftIcon={<ChevronLeft onClick={() => router.back()} />}
      center={t("coach.liveTitle")}
    />
  );
}
