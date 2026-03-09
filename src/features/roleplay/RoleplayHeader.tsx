"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "../../components/common/Header";
import { useConversationEnd } from "@/hooks/mutations";
import { useConversationDetail } from "@/hooks/queries";
import { ExitChatting } from "../../components/modal";
import { HamburgerIcon, SqurepenIcon } from "@/assets/svgr";
import { useTabStore } from "@/store/useTabStore";
import Tab from "../tab/Tab";
import { motion } from "framer-motion";

interface ChatroomHeaderProps {
  roomId?: number;
}

export default function RoleplayHeader({ roomId }: ChatroomHeaderProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLDivElement>(null);

  const { openTab } = useTabStore();
  const askRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const isAsk = pathname.startsWith("/main/ask");
  const isChat = pathname.startsWith("/main/roleplay/chatroom");

  const { data: detailData } = useConversationDetail(roomId);
  const { mutate: conversationEnd } = useConversationEnd(roomId!);
  const [activeStyles, setActiveStyles] = useState<{
    width: number;
    x: number;
  } | null>(null);
  // 다른곳 클릭시 open 없애기
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        dropdownRef.current?.contains(target) ||
        toggleBtnRef.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  // 가운데 주소 기준으로 배경 채우기
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
  const handleNewChat = () => {
    router.push("/main");
    setOpen(false);
  };

  const handleEnd = () => {
    if (detailData?.canGetReport) {
      conversationEnd();
      router.push(`/main/roleplay/chatroom/${roomId}/result`);
    } else {
      setShowExitModal(true);
    }
    setOpen(false);
  };

  const handleTab = () => {
    openTab();
  };
  return (
    <>
      <Header
        leftIcon={<HamburgerIcon onClick={handleTab} />}
        center={
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
        }
        rightIcon={
          isChat ? (
            <div ref={toggleBtnRef} className="relative">
              {detailData?.canGetReport && (
                <div className="z-9999 absolute left-4 size-2 rounded-full bg-red-500" />
              )}
              <SqurepenIcon onClick={() => setOpen((prev) => !prev)} />
              {open && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-8 z-50 flex w-36 flex-col gap-1 rounded-xl bg-white p-3 text-sm"
                >
                  <button
                    className="flex gap-2 rounded-lg bg-black p-2 text-white"
                    onClick={handleNewChat}
                  >
                    <Sparkles className="size-5" />
                    New Chat
                  </button>
                  {detailData?.canGetReport ? (
                    <button
                      className="bg-gradient-secondary flex gap-2 rounded-lg p-2 text-white"
                      onClick={handleEnd}
                    >
                      <MessageCircle className="size-5" />
                      Get Reports
                    </button>
                  ) : (
                    <button
                      className="flex gap-2 p-2 text-gray-400"
                      onClick={handleEnd}
                    >
                      <MessageCircle className="size-5" />
                      Get Reports
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : undefined
        }
      />
      <Tab />
      {showExitModal && (
        <ExitChatting
          onClose={() => setShowExitModal(false)}
          isOpen={showExitModal}
        />
      )}
    </>
  );
}
