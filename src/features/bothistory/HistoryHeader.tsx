"use client";
import { useRouter } from "next/navigation";
import { Header } from "../../components/common";
import { ChevronLeftIcon, HomeIcon } from "@/assets/svgr";

export default function HistoryHeader() {
  const router = useRouter();
  const handleNewChat = () => {
    router.push("/main");
  };
  return (
    <Header
      leftIcon={<ChevronLeftIcon onClick={() => router.back()} />}
      center="Role Playing"
      rightIcon={<HomeIcon onClick={handleNewChat} />}
    />
  );
}
