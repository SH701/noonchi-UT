"use client";

import { useState } from "react";
import ChatInput from "@/components/common/ChatInput";
import ChatLoading from "@/components/common/ChatLoading";
import { useRouter } from "next/navigation";
import PreviewModal from "@/components/modal/PreviewModal";
import { InfoIcon } from "@/assets/svgr";
import { useChatUI, useScrollToBottom } from "@/hooks/custom";
import { usePreviewMessages } from "../hooks/usePreviewMessages";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HintMessage from "@/components/chatroom/HintMessage";
import ChatNotice from "@/components/chatroom/ChatNotice";
import PreviewMessageList from "@/components/chatroom/PreviewMessageList";
import PreviewHeader from "./PreviewHeader";
import { useChatVoice } from "@/hooks/custom/useChatVoice";

export default function PreviewChat() {
  const { t } = useTranslation();
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
  const { micState, handleMicClick, handleSendAudio } = useChatVoice(setMessage);

  const handleSend = () => {
    if (!message.trim() || isSending) return;
    if (showSituation) {
      toggleSituation();
    }
    sendMessage(message ?? undefined);
    setMessage("");
    handleSendAudio();
  };

  const handleMoveAuth = () => router.push("/preview/end");

  return (
    <main className="flex min-h-dvh flex-col">
      <section className="flex-1">
        <div className="sticky top-0 z-50">
          <PreviewHeader handleMoveAuth={handleMoveAuth} />
        </div>
        {isStarting ? (
          <ChatLoading />
        ) : (
          <>
            <aside className="top-19 sticky z-10">
              <ChatNotice
                description={data?.scenario.description}
                showNotice={showNotice}
                toggleNotice={toggleNotice}
              />
            </aside>
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
      </section>

      {/* 하단 고정 영역 */}
      <footer className="sticky bottom-0 z-10 flex flex-col pb-5 backdrop-blur-md">
        {!isStarting && (
          <motion.div
            key={aiResponses.length}
            className="absolute left-5 right-5 flex items-center justify-center gap-2.5 rounded-xl bg-gray-800/50 px-5 py-2.5 text-white"
            style={{ top: "clamp(-64px, -10vw, -56px)" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 4 }}
          >
            <InfoIcon />
            {aiResponses.length <= 1 ? (
              <span className="text-sm">
                {t("preview.progress1", { current: aiResponses.length, total: 2 })}
              </span>
            ) : (
              <span className="text-sm">
                {t("preview.progress2", { current: aiResponses.length, total: 2 })}
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
      </footer>
      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
      />
    </main>
  );
}
