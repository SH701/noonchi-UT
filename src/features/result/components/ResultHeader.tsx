"use client";
import { HamburgerIcon, HomeIcon } from "@/assets/svgr";
import Header from "@/components/common/Header";
import { useTabStore } from "@/store";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function ResultHeader() {
  const { t } = useTranslation();
  const { openTab } = useTabStore();
  const router = useRouter();
  const handleHome = () => {
    router.push("/hub");
  };
  return (
    <Header
      leftIcon={<HamburgerIcon onClick={openTab} />}
      center={t("result.header")}
      rightIcon={<HomeIcon onClick={handleHome} />}
    />
  );
}
