"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
export default function Page() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-screen min-h-screen bg-blue-600">
      <span className="text-[28px] text-white font-semibold">Welcome!</span>
      <span className="text-blue-100  font-medium leading-4">
        Loading your Noonchi Coach{dots}
      </span>
      <Image src="/etc/mainLogo.png" alt="메인 로고" width={200} height={120} />
    </div>
  );
}
