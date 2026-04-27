"use client";
import { useRouter } from "next/navigation";
import { Header } from "../../../../components/common";
import { HomeIcon } from "@/assets/svgr";
import { ChevronLeft } from "lucide-react";

export default function HistoryHeader() {
  const router = useRouter();
  const handleNewChat = () => {
    router.push("/hub");
  };
  return (
    <Header
      leftIcon={<ChevronLeft onClick={() => router.back()} />}
      center="Role Playing"
      rightIcon={<HomeIcon onClick={handleNewChat} />}
    />
  );
}
