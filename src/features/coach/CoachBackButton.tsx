"use client";


import { Header } from "../../components/common";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function CoachBackButton() {
  const router = useRouter();
  return (
    <Header
      leftIcon={<ChevronLeft onClick={() => router.back()} />}
      center="Live 1:1 Coaching"
    />
  );
}
