"use client";

import { useRef, useEffect, useState } from "react";
import { MicIcon, SendIcon } from "@/assets/svgr";
import { Asterisk, Lightbulb } from "lucide-react";
import { MicState } from "@/hooks/custom/useVoiceChat";

interface ChatInputProps {
  message: string;
  setMessage: (v: string) => void;
  onSend: () => void;
  onMicClick?: () => void;
  onHintClick?: () => void;
  onSituationClick?: () => void;
  disabled?: boolean;
  placeholder?: string;
  showSituation?: boolean;
  showHint?: boolean;
  isHintActive?: boolean;
  isSituationActive?: boolean;
  micState?: MicState;
}

export default function ChatInput({
  message,
  setMessage,
  onSend,
  onMicClick,
  onHintClick,
  onSituationClick,
  disabled = false,
  placeholder = "Type your answer...",
  showSituation = false,
  showHint = false,
  isHintActive = false,
  isSituationActive = false,
  micState = "idle",
}: ChatInputProps) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    if (isSituationActive && textRef.current) {
      setMessage("**");
      textRef.current.focus();
      setTimeout(() => {
        textRef.current?.setSelectionRange(1, 1);
      }, 0);
    } else {
      setMessage("");
    }
  }, [isSituationActive]);

  return (
    <div className="w-full">
      <div className="flex w-full min-w-0 flex-col items-center rounded-[20px] bg-white px-4 py-3 shadow-[0_-3px_8px_0_rgba(80,41,138,0.08)]">
        <textarea
          ref={textRef}
          rows={1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="max-h-30 mb-3 w-full min-w-0 grow resize-none overflow-y-auto border-none text-gray-800 placeholder-gray-400 outline-none disabled:bg-gray-50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing &&
              !disabled &&
              message.trim()
            ) {
              e.preventDefault();
              onSend();
            }
          }}
          disabled={disabled}
        />
        <div className="flex w-full items-end justify-between gap-1">
          <div className="flex gap-1">
            {showSituation && (
              <button
                className={`h-6.5 flex rounded-full border px-1 ${isSituationActive ? "border-indigo-500 text-indigo-500" : ""}`}
                onClick={onSituationClick}
              >
                <Asterisk
                  className={`py-1 ${isSituationActive ? "text-indigo-500" : ""}`}
                />
                <p>situation</p>
              </button>
            )}
            {showHint && (
              <button
                onClick={onHintClick}
                className={`h-6.5 flex rounded-full border px-2 ${isHintActive ? "border-indigo-500 text-indigo-500" : ""}`}
              >
                <Lightbulb
                  className={`py-1 ${isHintActive ? "text-indigo-500" : ""}`}
                />
                <p>needhelp</p>
              </button>
            )}
          </div>
          <div>
            {micState === "recording" ? (
              <button
                onClick={onMicClick}
                className="flex shrink-0 items-center justify-center rounded-full border border-white p-1"
                style={{
                  background:
                    "linear-gradient(180deg, #B499FF 0%, #98AEFF 100%)",
                  boxShadow: "0 0 12px 0 #8434FF",
                }}
              >
                <MicIcon className="size-6 animate-pulse text-white" />
              </button>
            ) : isFocused ||
              micState === "recorded" ||
              isHintActive ||
              message.trim() ? (
              <button
                type="button"
                onClick={onSend}
                className="flex shrink-0 items-center justify-center rounded-full p-1 transition-colors"
                disabled={disabled || !message.trim()}
                style={
                  message.trim()
                    ? {
                        background:
                          "linear-gradient(180deg, #86C3E8 0%, #8397FF 100%)",
                      }
                    : { background: "#ffffff", border: "1px solid #D1D5DB" }
                }
              >
                <SendIcon
                  className={message.trim() ? "text-white" : "text-gray-300"}
                />
              </button>
            ) : (
              <button
                onClick={onMicClick}
                className="flex shrink-0 items-center justify-center rounded-full border p-1"
              >
                <MicIcon className="size-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
