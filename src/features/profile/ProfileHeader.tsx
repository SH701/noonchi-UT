"use client";

import { Header } from "@/components/common";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function ProfileHeader() {
  const router = useRouter();
  return (
    <Header
      leftIcon={<ChevronLeft onClick={() => router.back()} />}
      center="My Page"
    />
  );
}
