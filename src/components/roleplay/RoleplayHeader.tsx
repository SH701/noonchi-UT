"use client";

import { Menu, MessageCircle, Sparkles, SquarePen } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTabStore } from "@/store/tab/useTabStore";
import Tab from "../tab/Tab";
import Header from "../common/Header";

export default function RoleplayHeader() {
  const { isOpen, toggleTab, closeTab } = useTabStore();
  const [open, setOpen] = useState(false);
  const askRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [, forceUpdate] = useState(0);
  const isRoleplay = pathname.startsWith("/main/roleplay");

  useEffect(() => {
    requestAnimationFrame(() => {
      forceUpdate((n) => n + 1);
    });
  }, [pathname]);

  useEffect(() => {
    const sideClick = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeTab();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", sideClick);
    }
    return () => {
      document.removeEventListener("keydown", sideClick);
    };
  }, [isOpen, closeTab]);

  const getActiveStyles = () => {
    const activeRef = isRoleplay ? roleRef : askRef;
    if (!activeRef.current) return { width: 40, x: 0 };
    return {
      width: activeRef.current.offsetWidth,
      x: activeRef.current.offsetLeft - 4,
    };
  };

  const handleToggle = () => {
    if (!isRoleplay) {
      router.push("/main/roleplay");
    } else {
      router.push("/main/ask");
    }
  };
  const handleExit = () => {
    setOpen(!open);
  };
  const handleEnd = () => {
    console.log("End");
  };
  const ToggleSwitch = (
    <div
      className="relative flex items-center bg-white/30 rounded-full cursor-pointer"
      onClick={handleToggle}
    >
      <motion.div
        className="absolute bg-white rounded-full h-6"
        initial={false}
        animate={getActiveStyles()}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ left: 4 }}
      />
      <span
        ref={askRef}
        className={`relative z-10 px-3 py-1 text-sm font-medium transition-colors ${
          !isRoleplay ? "text-gray-800" : "text-gray-400"
        }`}
      >
        Ask
      </span>
      <span
        ref={roleRef}
        className={`relative z-10 px-3 py-1 text-sm font-medium transition-colors ${
          isRoleplay ? "text-gray-800" : "text-gray-400"
        }`}
      >
        Role playing
      </span>
    </div>
  );

  return (
    <>
      <Header
        leftIcon={<Menu onClick={toggleTab} />}
        center={ToggleSwitch}
        rightIcon={isRoleplay ? <SquarePen onClick={handleExit} /> : undefined}
      />
      <Tab />
      {open && (
        <div className="p-3 rounded-xl bg-white flex flex-col gap-1 absolute right-5 top-16 z-50">
          <button className="p-2 flex gap-2">
            <Sparkles />
            New Chat
          </button>
          <button className="p-2 flex gap-2" onClick={handleEnd}>
            <MessageCircle />
            Get Reports
          </button>
        </div>
      )}
    </>
  );
}
