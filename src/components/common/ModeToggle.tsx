"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ModeToggle() {
  const askRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isAsk = pathname.startsWith("/main/ask");

  const [activeStyles, setActiveStyles] = useState<{
    width: number;
    x: number;
  } | null>(null);

  useEffect(() => {
    const activeRef = isAsk ? askRef : roleRef;
    const container = activeRef.current?.closest("div");
    if (!activeRef.current || !container) return;
    const containerRect = container.getBoundingClientRect();
    const activeRect = activeRef.current.getBoundingClientRect();
    setActiveStyles({
      width: activeRect.width,
      x: activeRect.left - containerRect.left,
    });
  }, [isAsk]);

  const handleToggle = () => {
    router.push(isAsk ? "/main" : "/main/ask");
  };

  return (
    <div
      className="relative flex cursor-pointer items-center rounded-full bg-white/30"
      onClick={handleToggle}
    >
      {activeStyles && (
        <motion.div
          className="absolute h-6 rounded-full bg-white"
          initial={false}
          animate={activeStyles}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      )}
      <span
        ref={roleRef}
        className={`relative z-10 px-1.5 py-1 text-sm font-medium transition-colors ${
          isAsk ? "text-gray-400" : "text-gray-800"
        }`}
      >
        Role playing
      </span>
      <span
        ref={askRef}
        className={`relative z-10 px-1.5 py-1 text-sm font-medium transition-colors ${
          !isAsk ? "text-gray-400" : "text-gray-800"
        }`}
      >
        Ask
      </span>
    </div>
  );
}
