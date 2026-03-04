"use client";

import { ChevronLeftIcon } from "@/assets/svgr";
import { Header } from "../common";
import { useRouter } from "next/navigation";

export default function CoachBackButton() {
  const router = useRouter();
  return (
    <Header
      leftIcon={<ChevronLeftIcon onClick={() => router.back()} />}
      center="Live 1:1 Coaching"
    />
  );
}
