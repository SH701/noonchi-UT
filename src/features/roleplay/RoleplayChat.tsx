"use client";
import { useEffect, useRef, useState } from "react";
import { MessageList, HintMessage, ChatNotice } from "@/components/chatroom";

import { useConversationDetail, useRoleplayHint } from "@/hooks/queries";
import { ChatInput } from "@/components/common";
import { useRoleMessageStream, useRoleplayMessages } from "@/hooks/mutations";
import { useVoiceChat } from "@/hooks/custom/useVoiceChat";

import { useChatUI } from "@/hooks/custom/useChatUI";
import RoleplayHeader from "./ChatroomHeader";

interface RoleplayChatRoomProps {
  conversationId: number;
}

export default function RoleplayChat({
  conversationId,
}: RoleplayChatRoomProps) {
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: conversation } = useConversationDetail(conversationId);
  const { messages } = useRoleplayMessages(conversationId);
  const { streamMessages, sendStreamMessage } =
    useRoleMessageStream(conversationId);
  const { data: hintData, refetch: refetchHint } =
    useRoleplayHint(conversationId);
  const { micState, sttText, handleMicClick, handleSendAudio } = useVoiceChat(
    conversationId,
    sendStreamMessage,
  );
  const {
    showHintPanel,
    toggleHint,
    showSituation,
    toggleSituation,
    showNotice,
    toggleNotice,
  } = useChatUI();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [streamMessages]);

  const myAI = conversation?.aiPersona ?? null;

  const handleSendText = async () => {
    refetchHint();
    setMessage("");
    await sendStreamMessage(message);
  };
  if (!conversation) {
    return;
  }
  return (
    <>
      <RoleplayHeader roomId={conversationId} />
      <div className="sticky top-0 flex min-h-screen w-full flex-col">
        <div className="top-23 sticky z-10">
          <ChatNotice
            description={conversation.situation}
            showNotice={showNotice}
            toggleNotice={toggleNotice}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <MessageList
            messages={[...messages, ...streamMessages]}
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
              }}
              onClose={toggleHint}
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
