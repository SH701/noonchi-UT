"use client";
import { useEffect, useRef, useState } from "react";
import {
  MessageList,
  HintMessage,
  ChatNotice,
  RoleInfo,
  ChatroomInfo,
} from "@/components/chatroom";

import { useConversationDetail, useRoleplayHint } from "@/hooks/queries";
import { ChatInput } from "@/components/common";
import { useRoleMessageStream, useRoleplayMessages } from "@/hooks/mutations";
import { useVoiceChat } from "@/hooks/custom/useVoiceChat";

import { useChatUI } from "@/hooks/custom/useChatUI";
import RoleplayHeader from "./ChatroomHeader";
import { motion } from "framer-motion";

import { SqurepenIcon } from "@/assets/svgr";

interface RoleplayChatRoomProps {
  conversationId: number;
}

export default function RoleplayChat({
  conversationId,
}: RoleplayChatRoomProps) {
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { data: conversation, refetch: conversationDeatil } =
    useConversationDetail(conversationId);
  const { messages } = useRoleplayMessages(conversationId);
  const { streamMessages, sendStreamMessage } =
    useRoleMessageStream(conversationId);
  const { data: hintData, refetch: refetchHint } =
    useRoleplayHint(conversationId);
  const {
    micState,
    sttText,
    pendingAudioUrl,
    handleMicClick,
    handleResetAudio,
  } = useVoiceChat(conversationId, sendStreamMessage);
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

  useEffect(() => {
    if (micState === "recorded" && sttText) {
      setMessage(sttText);
    }
  }, [sttText, micState]);

  const myAI = conversation?.aiPersona ?? null;

  const handleSendText = async () => {
    if (!message.trim()) return;
    refetchHint();
    const textToSend = message;
    const audioToSend =
      micState === "recorded" && pendingAudioUrl && message === sttText
        ? pendingAudioUrl
        : undefined;
    if (micState === "recorded") handleResetAudio();
    setMessage("");
    conversationDeatil();
    await sendStreamMessage(textToSend, audioToSend);
  };

  const handleInfo = () => {
    setOpen((prev) => !prev);
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
          <RoleInfo
            aiRole={conversation.aiPersona.aiRole}
            userRole={conversation.aiPersona.userRole}
          />
          <MessageList
            messages={[...messages, ...streamMessages]}
            myAI={myAI}
            showsituation={showSituation}
            onInfoClick={handleInfo}
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
          {conversation.canGetReport && (
            <motion.div
              className="absolute -top-12 left-5 right-5 flex items-center justify-center gap-2.5 rounded-xl bg-gray-800/50 px-5 py-2.5 text-sm text-white"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 4 }}
            >
              <span>Report unlocked! Tap</span>
              <SqurepenIcon />
              <span>to view</span>
            </motion.div>
          )}
          <ChatInput
            message={message}
            setMessage={setMessage}
            showHint={true}
            onHintClick={toggleHint}
            onSituationClick={toggleSituation}
            showSituation={true}
            onSend={handleSendText}
            onMicClick={handleMicClick}
            isHintActive={showHintPanel}
            isSituationActive={showSituation}
            micState={micState}
          />
        </div>
        {open && (
          <ChatroomInfo
            isOpen={open}
            onClose={() => setOpen(false)}
            topic={conversation.aiPersona.description}
            aiRole={conversation.aiPersona.aiRole}
            userRole={conversation.aiPersona.userRole}
            detail={conversation.situation}
          />
        )}
      </div>
    </>
  );
}
