'use client'

import { HamburgerIcon } from "@/assets/svgr";
import { Header } from "@/components/common";
import Tab from "@/features/tab/Tab";
import { useTabStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function PostHeader() {
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
        center={"Community"}
      />
      {!isDetail && <Tab />}
    </>
  );
}
