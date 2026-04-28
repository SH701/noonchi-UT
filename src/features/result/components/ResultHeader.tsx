"use client";
import { HamburgerIcon, HomeIcon } from "@/assets/svgr";
import { Header } from "@/components/common";
import { useTabStore } from "@/store";
import { useRouter } from "next/navigation";

export default function ResultHeader() {
  const { openTab } = useTabStore();
  const router = useRouter();
  const handleHome = () => {
    router.push("/hub");
  };
  return (
    <Header
      leftIcon={<HamburgerIcon onClick={openTab} />}
      center="Report"
      rightIcon={<HomeIcon onClick={handleHome} />}
    />
  );
}
