"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTabStore } from "@/store/tab/useTabStore";
import Tab from "../tab/Tab";
import Header from "../../components/common/Header";
import { HamburgerIcon } from "@/assets/svgr";

export default function RoleplayHeader() {
  const { toggleTab } = useTabStore();

  const askRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isAsk = pathname.startsWith("/main/ask");

  const [activeStyles, setActiveStyles] = useState<{ width: number; x: number } | null>(null);

  useEffect(() => {
    const activeRef = isAsk ? askRef : roleRef;
    if (!activeRef.current) return;
    setActiveStyles({
      width: activeRef.current.offsetWidth,
      x: activeRef.current.offsetLeft - 4,
    });
  }, [isAsk]);

  const handleToggle = () => {
    router.push(isAsk ? "/main" : "/main/ask");
  };

  return (
    <>
      <Header
        leftIcon={<HamburgerIcon onClick={toggleTab} />}
        center={
          <div
            className="relative flex items-center bg-white/30 rounded-full cursor-pointer"
            onClick={handleToggle}
          >
            {activeStyles && (
              <motion.div
                className="absolute bg-white rounded-full h-6"
                initial={false}
                animate={activeStyles}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
            )}
            <span
              ref={roleRef}
              className={`relative z-10 px-3 py-1 text-sm font-medium transition-colors ${
                isAsk ? "text-gray-400" : "text-gray-800"
              }`}
            >
              Role playing
            </span>
            <span
              ref={askRef}
              className={`relative z-10 px-3 py-1 text-sm font-medium transition-colors ${
                !isAsk ? "text-gray-400" : "text-gray-800"
              }`}
            >
              Ask
            </span>
          </div>
        }
      />
      <Tab />
    </>
  );
}
