"use client";
import { useEffect, useRef, useState } from "react";
import { MessageList, HintMessage } from "@/components/chatroom";

import { useConversationDetail, useRoleplayHint } from "@/hooks/queries";
import { ChatInput } from "@/components/common";
import { useRoleplayMessages } from "@/hooks/mutations";
import { useVoiceChat } from "@/hooks/useVoiceChat";
import { NoticeIcon } from "@/assets/svgr";
import { ChatroomHeader } from "@/features/roleplay";

interface RoleplayChatRoomProps {
  conversationId: number;
}

export default function RoleplayChatRoom({
  conversationId,
}: RoleplayChatRoomProps) {
  const [showHintPanel, setShowHintPanel] = useState(false);
  const [message, setMessage] = useState("");
  const [situationOpen, setSituationOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: conversation } = useConversationDetail(conversationId);
  const { messages, sendMessage } = useRoleplayMessages(conversationId);
  const { data: hintData } = useRoleplayHint(conversationId);
  const { micState, sttText, handleMicClick, handleSendAudio } = useVoiceChat(
    conversationId,
    sendMessage,
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const myAI = conversation?.aiPersona ?? null;

  const handleSendText = async () => {
    setMessage("");
    await sendMessage(message);
  };
  return (
    <>
      <ChatroomHeader
        roomId={conversationId}
        title={conversation?.conversationTopic ?? ""}
      />
      <div className="flex min-h-screen w-full flex-col">
        <div className="-mx-5 mb-4 flex gap-4 border-y border-white bg-white/50 px-5 py-3">
          <NoticeIcon className="shrink-0 text-gray-600" />
          <span className="text-sm font-medium text-gray-600">
            {conversation?.situation}
          </span>
        </div>
        <div className="flex flex-1 flex-col">
          <MessageList
            messages={messages}
            myAI={myAI}
            showsituation={situationOpen}
          />
          <div ref={bottomRef} />
        </div>

        <div className="sticky bottom-0 flex flex-col pb-5 backdrop-blur-md">
          {showHintPanel && hintData && (
            <HintMessage
              hintData={hintData}
              onSelect={(h) => {
                setMessage(h);
                setTimeout(() => {
                  setShowHintPanel(false);
                }, 2000);
              }}
            />
          )}
          <ChatInput
            message={micState === "recorded" ? sttText : message}
            setMessage={setMessage}
            showHint={true}
            onHintClick={() => setShowHintPanel((prev) => !prev)}
            onSituationClick={() => setSituationOpen((prev) => !prev)}
            showSituation={true}
            onSend={micState === "recorded" ? handleSendAudio : handleSendText}
            onMicClick={handleMicClick}
            isHintActive={showHintPanel}
            isSituationActive={situationOpen}
            micState={micState}
          />
        </div>
      </div>
    </>
  );
}
