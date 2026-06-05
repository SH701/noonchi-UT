'use client'

import { HamburgerIcon } from "@/assets/svgr";
import Header from "@/components/common/Header";
import Tab from "@/features/tab/components/Tab";
import { useTabStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PostHeader() {
  const { t } = useTranslation();
  const { toggleTab } = useTabStore();
  const router = useRouter();
  const pathname = usePathname();
  const isDetail = pathname !== "/posts";

  return (
    <>
      <Header
        leftIcon={
          isDetail ? (
            <ChevronLeft size={24} onClick={() => router.back()} />
          ) : (
            <HamburgerIcon onClick={toggleTab} />
          )
        }
        center={t("postHeader.title")}
      />
      {!isDetail && <Tab />}
    </>
  );
}
