"use client";

import { useState } from "react";
import { usePreviewMessages } from "@/hooks/mutations";
import { ChatInput, ChatLoading } from "@/components/common";
import { useRouter } from "next/navigation";
import { PreviewModal } from "@/components/modal";
import { InfoIcon } from "@/assets/svgr";
import { useVoiceChat, useChatUI } from "@/hooks/custom";
import { motion } from "framer-motion";
import { HintMessage, ChatNotice, PreviewMessageList } from "@/components/chatroom";
import PreviewHeader from "./PreviewHeader";

export default function PreviewChat() {
  const {
    data,
    hintData,
    isStarting,
    isSending,
    userMessages,
    aiResponses,
    firstHiddenMessage,
    showPreviewModal,
    setShowPreviewModal,
    sendMessage,
    toggleReveal,
    toggleFirstHidden,
  } = usePreviewMessages();

  const [message, setMessage] = useState("");
  const router = useRouter();
  const {
    showHintPanel,
    toggleHint,
    showSituation,
    toggleSituation,
    showNotice,
    toggleNotice,
  } = useChatUI();

  const { micState, sttText, handleMicClick, handleSendAudio } =
    useVoiceChat(3000);

  const handleSend = () => {
    if (!message.trim() || isSending) return;
    sendMessage(message);
    setMessage("");
  };

  const handleMoveAuth = () => router.push("/preview/end");

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="sticky top-0">
          <PreviewHeader handleMoveAuth={handleMoveAuth} />
        </div>
        {isStarting ? (
          <ChatLoading />
        ) : (
          <>
            <ChatNotice
              description={data?.scenario.description}
              showNotice={showNotice}
              toggleNotice={toggleNotice}
            />
            <PreviewMessageList
              data={data}
              userMessages={userMessages}
              aiResponses={aiResponses}
              firstHiddenMessage={firstHiddenMessage}
              onToggleFirstHidden={toggleFirstHidden}
              onToggleReveal={toggleReveal}
              showSituation={showSituation}
              isSending={isSending}
            />
          </>
        )}
      </div>

      <div className="relative flex flex-col gap-2 pb-5">
        {!isStarting && (
          <motion.div
            key={aiResponses.length}
            className="absolute -top-12 left-5 right-5 flex items-center justify-center gap-2.5 rounded-xl bg-gray-800/50 px-5 py-2.5 text-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 4 }}
          >
            <InfoIcon />
            {aiResponses.length <= 1 ? (
              <span className="text-sm">
                They`re waiting for your reply! ({aiResponses.length}/2)
              </span>
            ) : (
              <span>
                One shot left! Finish strong! ({aiResponses.length}/2)
              </span>
            )}
          </motion.div>
        )}
        {showHintPanel && hintData && (
          <HintMessage
            hintData={hintData}
            onSelect={(h) => setMessage(h)}
            onClose={toggleHint}
          />
        )}
        <ChatInput
          message={micState === "recorded" ? sttText : message}
          setMessage={setMessage}
          onSend={micState === "recorded" ? handleSendAudio : handleSend}
          onHintClick={toggleHint}
          onSituationClick={toggleSituation}
          onMicClick={handleMicClick}
          showHint={true}
          showSituation={true}
          isHintActive={showHintPanel}
          isSituationActive={showSituation}
          micState={micState}
        />
      </div>
      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
      />
    </div>
  );
}
