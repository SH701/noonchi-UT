"use client";

import { useEffect, useState } from "react";
import { ChatInput, ChatLoading } from "@/components/common";
import { useRouter } from "next/navigation";
import { PreviewModal } from "@/components/modal";
import { InfoIcon } from "@/assets/svgr";
import {
  useVoiceChat,
  useChatUI,
  usePreviewMessages,
  useScrollToBottom,
} from "@/hooks/custom";
import { motion } from "framer-motion";
import {
  HintMessage,
  ChatNotice,
  PreviewMessageList,
} from "@/components/chatroom";
import PreviewHeader from "./PreviewHeader";

export default function PreviewChat() {
  const {
    data,
    hintData,
    isStarting,
    isSending,
    isHintFetching,
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
  const bottomRef = useScrollToBottom([aiResponses]);
  const {
    micState,
    sttText,
    handleMicClick,
    pendingAudioUrl,
    handleSendAudio,
  } = useVoiceChat();

  useEffect(() => {
    if (micState === "recorded" && sttText) {
      setMessage(sttText);
    }
  }, [sttText, micState]);

  const handleSend = () => {
    if (!message.trim() || isSending) return;
    if (showSituation) {
      toggleSituation();
    }
    sendMessage(message, pendingAudioUrl ?? undefined);
    setMessage("");
    handleSendAudio();
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
            <div className="top-23 sticky">
              <ChatNotice
                description={data?.scenario.description}
                showNotice={showNotice}
                toggleNotice={toggleNotice}
              />
            </div>
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
        <div ref={bottomRef} />
      </div>

      {/* 하단 고정 영역 */}
      <div className="sticky bottom-0 z-10 flex flex-col pb-5 backdrop-blur-md">
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
              <span className="text-sm">
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
          message={message}
          setMessage={setMessage}
          onSend={handleSend}
          onHintClick={toggleHint}
          onSituationClick={toggleSituation}
          onMicClick={handleMicClick}
          showHint={true}
          showSituation={true}
          isHintActive={showHintPanel}
          isSituationActive={showSituation}
          micState={micState}
          isHintLoading={isHintFetching}
        />
      </div>
      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
      />
    </div>
  );
}
