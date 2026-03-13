"use client";
import { useState } from "react";
import { ChatInput, ChatLoading } from "../../components/common";
import { useAskMessages } from "@/hooks/mutations";
import { CLOSENESS_OPTIONS, STEP_QUESTIONS } from "@/constants";
import MessageItem from "@/components/chatroom/MessageItem";
import ChatQuickActions from "./ChatQuickActions";
import { CominSoonModal } from "@/components/modal";
import { useConversationDetail } from "@/hooks/queries";
import { useVoiceChat } from "@/hooks/custom";

interface AskChatRoomProps {
  conversationId: number;
}

export default function AskChatRoom({ conversationId }: AskChatRoomProps) {
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { data: conversation } = useConversationDetail(conversationId);
  const askTarget = conversation?.askTarget ?? "";
  const closeness = conversation?.closeness ?? "";
  const situation = conversation?.situation ?? "";

  const { messages, sendMessage, isAIResponding } =
    useAskMessages(conversationId);

  const {
    micState,
    sttText,
    handleMicClick,
    pendingAudioUrl,
    handleResetAudio,
  } = useVoiceChat(undefined, undefined, setMessage);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    if (micState === "recorded" && pendingAudioUrl && message === sttText) {
      await sendMessage(message, pendingAudioUrl);
      handleResetAudio();
    } else {
      if (micState === "recorded") handleResetAudio();
      await sendMessage(message);
    }
    setMessage("");
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      <CominSoonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="flex flex-1 flex-col pb-2">
        {/* 컨텍스트 표시 */}
        <span className="text-xl font-semibold">
          {STEP_QUESTIONS.askTarget}
        </span>
        <span className="text-gray-600">
          This can be something you`re <br /> about to say or do
        </span>
        {askTarget && (
          <div className="flex justify-end">
            <div className="w-61 mt-5 flex flex-col gap-2 rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
              <p className="text-sm">{askTarget}</p>
            </div>
          </div>
        )}
        <div className="mt-5 flex flex-col">
          <span className="text-xl font-semibold">
            {STEP_QUESTIONS.closeness}
          </span>
          <span className="text-gray-600">
            This helps me understand the right tone
          </span>
          <div className="flex justify-end">
            <div className="mt-5 rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
              <p className="text-sm">
                {CLOSENESS_OPTIONS.find((o) => o.value === closeness)?.label ??
                  closeness}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col">
          <span className="text-xl font-semibold">
            {STEP_QUESTIONS.situation}
          </span>
          <span className="text-gray-600">
            Describe the situation or what you want to express
          </span>
          {situation && (
            <div className="my-5 flex justify-end">
              <div className="rounded-b-xl rounded-tl-xl border border-gray-300 bg-white p-4">
                <p className="text-sm">{situation}</p>
              </div>
            </div>
          )}
        </div>

        {/* 메시지 목록 */}
        {messages.map((m) => (
          <MessageItem
            key={m.messageId}
            messages={m}
            isMine={m.type === "USER"}
            isAI={m.type === "AI"}
          />
        ))}
        {isAIResponding && <ChatLoading />}
      </div>

      {/* 하단 고정 ChatInput */}
      <div className="sticky bottom-0 flex flex-col pb-5 backdrop-blur-md">
        <ChatQuickActions onOpenModal={() => setModalOpen(true)} />
        <ChatInput
          message={message}
          setMessage={setMessage}
          onMicClick={handleMicClick}
          onSend={handleSendMessage}
          disabled={isAIResponding}
          micState={micState}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
}
