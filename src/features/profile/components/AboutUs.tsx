"use client";

import { Header } from "@/components/common";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutUs() {
  const router = useRouter();
  return (
    <div>
      <Header
        leftIcon={<ChevronLeft onClick={() => router.back()} />}
        center="About Us"
      />
    </div>
  );
}
