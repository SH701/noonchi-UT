"use client";
import { useRouter } from "next/navigation";
import Header from "../../../../components/common/Header";
import { HomeIcon } from "@/assets/svgr";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HistoryHeader() {
  const { t } = useTranslation();
  const router = useRouter();
  const handleNewChat = () => {
    router.push("/hub");
  };
  return (
    <Header
      leftIcon={<ChevronLeft onClick={() => router.back()} />}
      center={t("historyHeader.title")}
      rightIcon={<HomeIcon onClick={handleNewChat} />}
    />
  );
}
