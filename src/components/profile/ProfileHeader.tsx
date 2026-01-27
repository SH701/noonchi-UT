"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileHeader() {
  const router = useRouter();
  return (
    <div className="w-full py-8 flex justify-between cursor-pointer">
      <ChevronLeft onClick={() => router.back()} />
      <span className="text-xl font-semibold">My Page</span>
      <span></span>
    </div>
  );
}
