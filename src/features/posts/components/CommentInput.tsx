"use client";

import { SendIcon } from "@/assets/svgr";
import { useRef, useEffect, useState } from "react";

export default function CommentInput() {
  const [value, setValue] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="max-w-150 fixed bottom-0 left-1/2 w-full -translate-x-1/2 px-4 pb-4">
      <div className="flex w-full rounded-[20px] bg-white px-4 py-3 shadow-[0_-3px_8px_0_rgba(80,41,138,0.08)]">
        <div className="relative mb-2 w-full">
          <div
            aria-hidden
            className="max-h-30 pointer-events-none w-full min-w-0 overflow-y-auto whitespace-pre-wrap text-gray-800"
          >
            {value}
            <span className="invisible">&nbsp;</span>
          </div>
          <textarea
            ref={textRef}
            rows={1}
            placeholder="댓글을 입력해주세요."
            className="max-h-30 absolute inset-0 w-full min-w-0 resize-none overflow-y-auto border-none bg-transparent text-gray-800 caret-gray-800 outline-none placeholder:text-gray-400"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing &&
                value.trim()
              ) {
                e.preventDefault();
              }
            }}
          />
        </div>

        <button
          disabled={value.trim() === ""}
           className="flex shrink-0 cursor-pointer items-center justify-center rounded-full p-1 transition-colors"
          style={
            value.trim()
              ? {
                  background:
                    "linear-gradient(180deg, #86C3E8 0%, #8397FF 100%)",
                }
              : { background: "#ffffff", border: "1px solid #D1D5DB" }
          }
        >
          <SendIcon className={value.trim() ? "text-white" : "text-gray-300"} />
        </button>
      </div>
    </div>
  );
}
