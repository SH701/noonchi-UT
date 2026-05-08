"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { HamburgerIcon, SqurepenIcon } from "@/assets/svgr";
import { useTabStore } from "@/store/useTabStore";

import { Header, ModeToggle } from "@/components/common";
import { useConversationDetail } from "@/hooks/queries/useConversation";
import Tab from "@/features/tab/Tab";
import { ExitChatting, EndChatting } from "@/components/modal";
import { useTranslation } from "react-i18next";

interface ChatroomHeaderProps {
  roomId?: number;
  onEnd?: () => void;
}

export default function ChatroomHeader({ roomId, onEnd }: ChatroomHeaderProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLDivElement>(null);
  const { openTab } = useTabStore();
  const pathname = usePathname();
  const isChat = pathname.startsWith("/hub/roleplay/chatroom");

  const { data: detailData } = useConversationDetail(roomId);

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

  const handleNewChat = () => {
    router.push("/hub");
    setOpen(false);
  };

  const handleEnd = () => {
    if (detailData?.canGetReport) {
      setShowEndModal(true);
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
        center={<ModeToggle />}
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
                    className="flex cursor-pointer gap-2 rounded-lg bg-black p-2 text-white"
                    onClick={handleNewChat}
                  >
                    <Sparkles className="size-5" />
                    {t("chatroomHeader.newChat")}
                  </button>
                  {detailData?.canGetReport ? (
                    <button
                      className="bg-gradient-secondary flex cursor-pointer gap-2 rounded-lg p-2 text-white"
                      onClick={handleEnd}
                    >
                      <MessageCircle className="size-5" />
                      {t("chatroomHeader.getReports")}
                    </button>
                  ) : (
                    <button
                      className="flex gap-2 p-2 text-gray-400"
                      onClick={handleEnd}
                    >
                      <MessageCircle className="size-5" />
                      {t("chatroomHeader.getReports")}
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
      {showEndModal && (
        <EndChatting
          isOpen={showEndModal}
          onClose={() => setShowEndModal(false)}
          onConfirm={() => {
            setShowEndModal(false);
            onEnd?.();
          }}
        />
      )}
    </>
  );
}
