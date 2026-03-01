"use client";

import { useRef, useEffect } from "react";
import { useState } from "react";
import { ChatInput, ChatLoading } from "../../components/common";
import {
  useMessageTranslate,
  useMessageTTS,
  useAskMessages,
} from "@/hooks/mutations";
import { BulbIcon, LanguageIcon, VolumeUpIcon } from "@/assets/svgr";
import { ChevronDownIcon, ChevronUp } from "lucide-react";
import { CLOSENESS_OPTIONS, STEP_QUESTIONS } from "@/constants";

interface AskChatRoomProps {
  conversationId: number;
  askTarget: string;
  closeness: string;
  situation: string;
}

export default function AskChatRoom({ conversationId, askTarget, closeness, situation }: AskChatRoomProps) {
  const [message, setMessage] = useState("");
  const { messages, sendMessage, isAIResponding } =
    useAskMessages(conversationId);
  const { mutate: TTS } = useMessageTTS();
  const { mutate: translate } = useMessageTranslate();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);
  const [translateMsg, setTranslateMsg] = useState(false);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const firstAIIndex = messages.findIndex((m) => m.type === "AI");
  const firstAI = firstAIIndex !== -1 ? messages[firstAIIndex] : undefined;
  const followUpMessages = firstAIIndex !== -1 ? messages.slice(firstAIIndex + 1) : [];
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    await sendMessage(message.trim());
    setMessage("");
  };

  const handleTTS = () => {
    if (!firstAI?.messageId) return;
    TTS(firstAI.messageId);
  };

  const handleTranslate = () => {
    if (!firstAI?.messageId) return;
    translate(firstAI.messageId);
    setTranslateMsg((prev) => !prev);
  };
  const handleInsight = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex flex-1 flex-col">
        {/* 이전 대화 */}
        <span className="text-xl font-semibold">{STEP_QUESTIONS.askTarget}</span>
        <span className="text-gray-600">
          This can be something you`re <br /> about to say or do
        </span>
        {askTarget && (
          <div className="mt-2 flex justify-end">
            <div className="w-61 flex flex-col gap-2 rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
              <p className="text-sm">{askTarget}</p>
            </div>
          </div>
        )}
        <div className="mb-6 flex flex-col gap-2">
          <span className="text-xl font-semibold">{STEP_QUESTIONS.closeness}</span>
          <span className="text-gray-600">This helps me understand the right tone</span>
          <div className="mt-2 flex justify-end">
            <div className="rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
              <p className="text-sm">
                {CLOSENESS_OPTIONS.find((o) => o.value === closeness)?.label ?? closeness}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-6 flex flex-col">
          <span className="text-xl font-semibold">{STEP_QUESTIONS.situation}</span>
          <span className="text-gray-600">Describe the situation or what you want to express</span>
          {situation && (
            <div className="mt-2 flex justify-end">
              <div className="rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
                <p className="text-sm">{situation}</p>
              </div>
            </div>
          )}
        </div>

        {/* 첫 AI 응답 */}
        {firstAI?.content && (
          <div className="mb-1 flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-semibold">
                Here is the best way to say it
              </span>
              <span className="text-gray-600">{firstAI.askApproachTip}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="max-w-61 mb-5 flex flex-col gap-2 rounded-b-xl rounded-tr-xl border border-gray-300 bg-white p-4">
                <p className="my-1 text-sm">{firstAI.content}</p>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <div className="flex gap-2">
                    <VolumeUpIcon onClick={handleTTS} />
                    <LanguageIcon onClick={handleTranslate} />
                  </div>
                </div>
                {translateMsg && firstAI.translatedContent}
              </div>
              <div className="flex flex-col gap-1 border-b border-gray-400 pb-2 text-sm">
                <div className="flex gap-1 text-blue-600">
                  <BulbIcon size={14} /> Cultural Insights
                </div>
                {open ? (
                  <>
                    {firstAI.askCulturalInsight}
                    <div className="flex items-center justify-center">
                      <ChevronDownIcon onClick={handleInsight} />
                    </div>
                  </>
                ) : (
                  <>
                    {firstAI.askCulturalInsight?.slice(0, 40)}...
                    <div className="flex items-center justify-center">
                      <ChevronUp onClick={handleInsight} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 이후 대화 메시지 */}
        {followUpMessages.map((m) => (
          <div
            key={m.messageId}
            className={`flex ${m.type === "USER" ? "justify-end" : "justify-start"} mb-4 mt-2`}
          >
            <div
              className={`max-w-61 border border-gray-300 bg-white p-4 ${
                m.type === "USER"
                  ? "rounded-b-xl rounded-tl-xl"
                  : "rounded-b-xl rounded-tr-xl"
              }`}
            >
              <p className="text-sm">{m.content}</p>
              {m.type === "AI" && (
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <div className="flex gap-2">
                    <VolumeUpIcon onClick={handleTTS} />
                    <LanguageIcon onClick={handleTranslate} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isAIResponding && <ChatLoading />}
        <div ref={bottomRef} />
      </div>

      {/* 하단 고정 ChatInput */}
      <div className="sticky bottom-0 flex flex-col pb-5 backdrop-blur-md">
        <ChatInput
          message={message}
          setMessage={setMessage}
          onSend={handleSendMessage}
          disabled={isAIResponding}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
}
