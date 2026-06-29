"use client";

import { useState } from "react";
import MessageList from "@/components/chatroom/MessageList";
import HintMessage from "@/components/chatroom/HintMessage";
import ChatNotice from "@/components/chatroom/ChatNotice";
import RoleInfo from "@/components/chatroom/RoleInfo";
import ChatroomInfo from "@/components/chatroom/ChatroomInfo";

import {
  useChatList,

} from "@/hooks/queries";

import ChatInput from "@/components/common/ChatInput";

import { useScrollToBottom } from "@/hooks/custom";
import { useChatUI } from "@/hooks/custom/useChatUI";
import RoleplayHeader from "./ChatroomHeader";
import { motion } from "framer-motion";

import { SqurepenIcon } from "@/assets/svgr";
import FeedbackLoading from "./FeedbackLoading";
import { useTranslation } from "react-i18next";
import { useConversationDetail } from "@/hooks/queries/useConversation";
import { useChatVoice } from "@/hooks/custom/useChatVoice";
import RoleplayLoading from "./RoleplayLoading";
import { useRoleplayFeedbackStore } from "@/store/useRoleplayFeedbackStore";
import { useRoleplayHint } from "../hooks/useRoleplayHint";
import { useRoleMessageStream } from "../hooks/useRoleMessageStream";
import { useConversationEnd } from "../hooks/useConversationEnd";
import { useChatCoachMark } from "../hooks/useChatCoachmark";

interface RoleplayChatRoomProps {
  conversationId: number;
}

export default function RoleplayChat({
  conversationId,
}: RoleplayChatRoomProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { data: conversation, refetch: conversationDeatil } =
    useConversationDetail(conversationId);
  const { data: messages = [], refetch: refetchMessages } =
    useChatList(conversationId);
  const {
    streamMessages,
    sendStreamMessage,
    isAIResponding,
    clearStreamMessages,
  } = useRoleMessageStream(conversationId);
  const {
    data: hintData,
    refetch: refetchHint,
    isFetching: isHintFetching,
  } = useRoleplayHint(conversationId);
  const { micState, handleMicClick, handleSendAudio } = useChatVoice(setMessage);
  useChatCoachMark(!!conversation && messages.length > 0);

  const {
    showHintPanel,
    toggleHint,
    showSituation,
    toggleSituation,
    showNotice,
    toggleNotice,
  } = useChatUI();

  const bottomRef = useScrollToBottom([streamMessages]);

  const [feedbackMap, setFeedbackMap] = useState<Record<string, string>>({});
  const [isEnding, setIsEnding] = useState(false);
  const { mutate: conversationEnd } = useConversationEnd(conversationId);

  const myAI = conversation?.aiPersona ?? null;

  const handleEnd = () => {
    gtag("event", "roleplay_complete", {
      topic: conversation?.aiPersona.description,
      situation: conversation?.situation,
    });
    setIsEnding(true);
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
    const result = await sendStreamMessage(textToSend);
    if (result) {
      setFeedbackMap((prev) => ({
        ...prev,
        [result.userContent]: result.feedbackText,
      }));
      useRoleplayFeedbackStore
        .getState()
        .setFeedback(conversationId, result.userContent, result.feedbackText);
    }
    await refetchMessages();
    clearStreamMessages();
    refetchHint();
  };

  const handleInfo = () => {
    setOpen((prev) => !prev);
  };

  if (!conversation) {
    return <RoleplayLoading />;
  }

  return (
    <>
      {isEnding ? (
        <FeedbackLoading />
      ) : (
        <>
          <RoleplayHeader roomId={conversationId} onEnd={handleEnd} />
          <main className="sticky top-0 flex min-h-dvh w-full flex-col">
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
                feedbackMap={feedbackMap}
              />
              <div ref={bottomRef} />
            </section>

            <footer className="pb-safe-sm sticky bottom-0 flex flex-col backdrop-blur-md">
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
                  style={{ top: "clamp(-64px, -10vw, -56px)" }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 4 }}
                >
                  <span>{t("roleplayChat.reportUnlocked")}</span>
                  <SqurepenIcon />
                  <span>{t("roleplayChat.toView")}</span>
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
