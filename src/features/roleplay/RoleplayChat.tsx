"use client";
import { useEffect, useRef, useState } from "react";
import { MessageList, HintMessage } from "@/components/chatroom";

import { useConversationDetail, useRoleplayHint } from "@/hooks/queries";
import { ChatInput } from "@/components/common";
import { useRoleplayMessages } from "@/hooks/mutations";
import { useVoiceChat } from "@/hooks/custom/useVoiceChat";
import { NoticeIcon, QuoteIcon } from "@/assets/svgr";
import { ChatroomHeader } from "@/features/roleplay";
import { useChatUI } from "@/hooks/custom/useChatUI";
import { ChevronDown, ChevronUp } from "lucide-react";

interface RoleplayChatRoomProps {
  conversationId: number;
}

export default function RoleplayChat({
  conversationId,
}: RoleplayChatRoomProps) {
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: conversation } = useConversationDetail(conversationId);
  const { messages, sendMessage } = useRoleplayMessages(conversationId);
  const { data: hintData } = useRoleplayHint(conversationId);
  const { micState, sttText, handleMicClick, handleSendAudio } = useVoiceChat(
    conversationId,
    sendMessage,
  );
  const { showHintPanel, toggleHint, showSituation, toggleSituation, showNotice, toggleNotice } =
    useChatUI();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const myAI = conversation?.aiPersona ?? null;

  const handleSendText = async () => {
    setMessage("");
    await sendMessage(message);
  };
  if(!conversation){
    return ;
  }
  return (
    <>
      <ChatroomHeader
        roomId={conversationId}
        title={conversation.conversationTopic ?? "RoleplayChat"}
      />
      <div className="flex min-h-screen w-full flex-col">
       <div className="-mx-5 mb-4 flex gap-4 border-y border-white bg-white/50 px-5 py-3">
              {showNotice ? (
                <div className="flex w-full justify-between">
                  <NoticeIcon className="shrink-0 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">
                    {conversation.situation}
                  </span>
                  <ChevronUp className="shrink-0" onClick={toggleNotice} />
                </div>
              ) : (
                <div className="flex w-full items-center justify-between">
                  <QuoteIcon />
                  <ChevronDown onClick={toggleNotice} />
                </div>
              )}
            </div>
        <div className="flex flex-1 flex-col">
          <MessageList
            messages={messages}
            myAI={myAI}
            showsituation={showSituation}
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
                  toggleHint();
                }, 3000);
              }}
            />
          )}
          <ChatInput
            message={micState === "recorded" ? sttText : message}
            setMessage={setMessage}
            showHint={true}
            onHintClick={toggleHint}
            onSituationClick={toggleSituation}
            showSituation={true}
            onSend={micState === "recorded" ? handleSendAudio : handleSendText}
            onMicClick={handleMicClick}
            isHintActive={showHintPanel}
            isSituationActive={showSituation}
            micState={micState}
          />
        </div>
      </div>
    </>
  );
}
