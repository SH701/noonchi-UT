"use client";

import { useEffect, useRef } from "react";
import { usePreviewStart } from "@/hooks/mutations/usePreviewStart";
import { Header } from "../common";
import { Earth, Menu, RotateCcw, SquarePen, Volume2 } from "lucide-react";
import Image from "next/image";
import { useModalActions } from "@/store/modal/useModalStore";
import PreviewEnd from "./PreviewEnd";

export default function PreviewChat() {
  const { data, mutate, isPending } = usePreviewStart();
  const started = useRef(false);
  const { openModal } = useModalActions();
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    mutate();
  }, [mutate]);

  

  return (
    <div className="min-h-screen  px-5">
      <Header leftIcon={<Menu />} center="RolePlay" rightIcon={<SquarePen />} />
      {isPending ? (
        <PreviewEnd />
      ) : (
        <div>
          {/* AI 메세지 */}
          <div className="flex gap-2 mb-1">
            <div className="size-8 rounded-full shrink-0  bg-gray-300" />
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-600">
                {data?.scenario.ai_role}
              </span>
              {/* AI 메세지 박스 */}
              <div className="flex flex-col gap-2 rounded-tr-xl rounded-b-xl p-4 border border-gray-300 bg-white mb-8">
                <p className="text-sm whitespace-pre-wrap my-1">
                  {data?.ai_message}
                </p>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Volume2 />
                    <Earth />
                  </div>
                  <button className="border-gradient-primary rounded-full px-2 py-1 ">
                    👀{" "}
                    <span className="text-gradient-primary text-xs font-semibold">
                      Really mean
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* 내 메세지 */}
          <div className="flex justify-end">
            <div className="flex flex-col gap-2 rounded-tl-xl rounded-b-xl p-4 border border-gray-300 bg-white w-61 ">
              <p className="text-sm  whitespace-pre-wrap my-1">네 좋습니다</p>
              <div className="pt-2.5 border-t border-gray-200 flex justify-between">
                <button className="flex rounded-full border border-blue-500 px-2 py-1 gap-1">
                  <Image
                    src="/chatroom/warning.png"
                    alt="feedback"
                    width={20}
                    height={20}
                  />
                  <span className="text-blue-500 text-sm">View feedback</span>
                </button>
                <RotateCcw size={20} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
