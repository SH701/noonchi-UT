"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
    >
      <ChevronLeftIcon className="w-6 h-6" />
    </button>
  );
}
