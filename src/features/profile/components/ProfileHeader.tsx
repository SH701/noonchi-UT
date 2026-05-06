"use client";

import { Header } from "@/components/common";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProfileHeader() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Header
      leftIcon={<ChevronLeft onClick={() => router.back()} />}
      center={t("profileHeader.title")}
    />
  );
}
