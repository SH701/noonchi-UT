"use client";

import { useRef, useEffect, useState } from "react";
import { renderWithAction } from "@/lib/renderWithAction";
import { MicIcon, SendIcon } from "@/assets/svgr";
import { Asterisk, Lightbulb } from "lucide-react";
import { MicState } from "@/hooks/custom/useVoiceChat";
import { Spinner } from "../ui/spinner/spinner";
import { useTranslation } from "react-i18next";

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
  isHintLoading?: boolean;
}

export default function ChatInput({
  message,
  setMessage,
  onSend,
  onMicClick,
  onHintClick,
  onSituationClick,
  disabled = false,
  placeholder,
  showSituation = false,
  showHint = false,
  isHintActive = false,
  isSituationActive = false,
  micState = "idle",
  isHintLoading = false,
}: ChatInputProps) {
  const { t } = useTranslation();
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
        <div className="relative mb-3 w-full">
          <div
            aria-hidden
            className="max-h-30 wrap-break-word pointer-events-none w-full min-w-0 overflow-y-auto whitespace-pre-wrap text-base text-gray-800"
          >
            {renderWithAction(message)}
            {/* 높이 유지용 */}
            <span className="invisible">&nbsp;</span>
          </div>
          <textarea
            ref={textRef}
            rows={1}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder ?? t("chatInput.placeholder")}
            className="max-h-30 absolute inset-0 w-full min-w-0 resize-none overflow-y-auto border-none bg-transparent text-base text-transparent placeholder-gray-400 caret-gray-800 outline-none disabled:bg-transparent"
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
        </div>
        <div className="flex w-full items-end justify-between gap-1">
          <div className="flex gap-1">
            {showSituation && (
              <button
                className={`h-6.5 flex cursor-pointer rounded-full border px-1 ${isSituationActive ? "border-indigo-500 text-indigo-500" : ""}`}
                onClick={onSituationClick}
              >
                <Asterisk
                  className={` ${isSituationActive ? "text-indigo-500" : ""}`}
                />
                <p>{t("chatInput.situation")}</p>
              </button>
            )}
            {showHint && (
              <button
                onClick={onHintClick}
                className={`h-6.5 flex cursor-pointer rounded-full border px-2 ${isHintActive ? "border-indigo-500 text-indigo-500" : ""}`}
                disabled={isHintLoading}
              >
                {isHintLoading ? <Spinner/>: <> <Lightbulb
                  className={`py-0.5 ${isHintActive ? "text-indigo-500" : ""}`}
                />
                <p>{t("chatInput.needHelp")}</p> </>}
               
              </button>
            )}
          </div>
          <div>
            {micState === "recording" ? (
              <button
                onClick={onMicClick}
                className="flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-white p-1"
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
                className="flex shrink-0 cursor-pointer items-center justify-center rounded-full p-1 transition-colors"
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
                className="flex shrink-0 cursor-pointer items-center justify-center rounded-full border p-1"
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
