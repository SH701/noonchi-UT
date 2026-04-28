"use client";

import { useEffect, useState } from "react";
import {
  MessageList,
  HintMessage,
  ChatNotice,
  RoleInfo,
  ChatroomInfo,
} from "@/components/chatroom";

import {
  useChatList,

} from "@/hooks/queries";
import { useRoleplayHint } from "@/features/roleplay/hooks";
import { ChatInput, SpinnerLoading } from "@/components/common";
import {
  useConversationEnd,
  useRoleMessageStream,
} from "@/features/roleplay/hooks";
import { useScrollToBottom } from "@/hooks/custom";
import { useChatUI } from "@/hooks/custom/useChatUI";
import RoleplayHeader from "./ChatroomHeader";
import { motion } from "framer-motion";

import { SqurepenIcon } from "@/assets/svgr";
import FeedbackLoading from "./FeedbackLoading";
import { useConversationDetail } from "@/hooks/queries/useConversation";
import { useWebVoice } from "@/hooks/custom/useWebVoice";

interface RoleplayChatRoomProps {
  conversationId: number;
}

export default function RoleplayChat({
  conversationId,
}: RoleplayChatRoomProps) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { data: conversation, refetch: conversationDeatil } =
    useConversationDetail(conversationId);
  const { data: messages = [] } = useChatList(conversationId);
  const { streamMessages, sendStreamMessage, isAIResponding } =
    useRoleMessageStream(conversationId);
  const {
    data: hintData,
    refetch: refetchHint,
    isFetching: isHintFetching,
  } = useRoleplayHint(conversationId);
  const { micState, sttText, handleMicClick, handleSendAudio } = useWebVoice();

  useEffect(() => {
    if (micState === "recording" || micState === "recorded") {
      setMessage(sttText);
    }
  }, [sttText, micState]);

  const {
    showHintPanel,
    toggleHint,
    showSituation,
    toggleSituation,
    showNotice,
    toggleNotice,
  } = useChatUI();

  const bottomRef = useScrollToBottom([streamMessages]);

  const { mutate: conversationEnd, isPending: isEnding } =
    useConversationEnd(conversationId);

  const myAI = conversation?.aiPersona ?? null;

  const handleEnd = () => {
    gtag("event", "roleplay_complete", {
      topic: conversation?.aiPersona.description,
      situation: conversation?.situation,
    });
    conversationEnd();
  };

  const handleSendText = async () => {
    if (!message.trim()) return;
    const textToSend = message;

    if (micState === "recorded") handleSendAudio();
    setMessage("");
    if (showSituation) {
      toggleSituation();
    }
    conversationDeatil();
    await sendStreamMessage(textToSend);
    refetchHint();
  };

  const handleInfo = () => {
    setOpen((prev) => !prev);
  };

  if (!conversation) {
    return <SpinnerLoading title="Loading chat..." />;
  }

  return (
    <>
      {isEnding ? (
        <FeedbackLoading />
      ) : (
        <>
          <RoleplayHeader roomId={conversationId} onEnd={handleEnd} />
          <main className="sticky top-0 flex min-h-screen w-full flex-col">
            <aside className="top-19 sticky z-10">
              <ChatNotice
                description={conversation.situation}
                showNotice={showNotice}
                toggleNotice={toggleNotice}
              />
            </aside>
            <section className="flex flex-1 flex-col">
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
            </section>

            <footer className="sticky bottom-0 flex flex-col pb-5 backdrop-blur-md">
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
                  className="absolute left-5 right-5 flex items-center justify-center gap-2.5 rounded-xl bg-gray-800/50 px-5 py-2.5 text-sm text-white"
                  style={{ top: "clamp(-48px, -10vw, -40px)" }}
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
                isHintLoading={isHintFetching}
                disabled={isAIResponding}
              />
            </footer>
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
          </main>
        </>
      )}
    </>
  );
}
