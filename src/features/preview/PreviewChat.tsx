"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  usePreviewRemove,
  usePreviewSend,
  usePreviewStart,
} from "@/hooks/mutations/";
import { ChatInput, ChatLoading, Header } from "@/components/common";
import { useRouter } from "next/navigation";
import { usePreviewHint } from "@/hooks/queries/preview/usePreviewHint";
import { PreviewModal } from "@/components/modal";
import { HamburgerIcon, InfoIcon } from "@/assets/svgr";
import { useVoiceChat } from "@/hooks/custom/useVoiceChat";
import { motion } from "framer-motion";
import { HintMessage, MessageItem } from "@/components/chatroom";
import { useChatUI } from "@/hooks/custom/useChatUI";
import ChatNotice from "@/components/chatroom/ChatNotice";

interface AiMessage {
  content: string;
  hiddenMeaning: string;
  isRevealed: boolean;
  translatedContent: string;
}

export default function PreviewChat() {
  const { data, mutate: startChat, isPending } = usePreviewStart();
  const { data: hintData } = usePreviewHint(data?.session_id);
  const [message, setMessage] = useState("");
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [aiResponses, setAiResponses] = useState<AiMessage[]>([]);
  const [firstHiddenMessage, setFirstHiddenMessage] = useState(false);
  const {
    showHintPanel,
    toggleHint,
    showSituation,
    toggleSituation,
    showNotice,
    toggleNotice,
  } = useChatUI();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const router = useRouter();

  const handleChunk = useCallback((chunk: string) => {
    setAiResponses((prev) => {
      const newResponses = [...prev];
      if (newResponses.length > 0) {
        newResponses[newResponses.length - 1].content = chunk;
      }
      return newResponses;
    });
  }, []);

  const { mutate: sendMessage, isPending: messageLoading } =
    usePreviewSend(handleChunk);
  const { mutate: removePreview } = usePreviewRemove();
  const { micState, sttText, handleMicClick, handleSendAudio } =
    useVoiceChat(3000);
  const started = useRef(false);
  const ended = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    startChat();
  }, [startChat]);

  useEffect(() => {
    if (
      data &&
      aiResponses.length > 0 &&
      data.max_turns === aiResponses.length &&
      !ended.current
    ) {
      ended.current = true;
      setTimeout(() => {
        removePreview(data.session_id);
        setShowPreviewModal(true);
      }, 8000);
    }
  }, [data, aiResponses, removePreview, setShowPreviewModal]);

  const handleSend = () => {
    if (!data?.session_id || !message.trim() || messageLoading) return;
    setMessage("");
    setUserMessages((prev) => [...prev, message]);
    setAiResponses((prev) => [
      ...prev,
      {
        content: "",
        hiddenMeaning: "",
        isRevealed: false,
        translatedContent: "",
      },
    ]);
    sendMessage(
      { sessionId: data.session_id, userMessage: message },
      {
        onSuccess: (res) => {
          setAiResponses((prev) => {
            const newResponses = [...prev];
            newResponses[newResponses.length - 1].hiddenMeaning =
              res.ai_hidden_meaning;
            newResponses[newResponses.length - 1].translatedContent =
              res.ai_message_en;
            return newResponses;
          });
        },
      },
    );
  };

  const toggleReveal = (idx: number) => {
    setAiResponses((prev) =>
      prev.map((msg, i) =>
        i === idx ? { ...msg, isRevealed: !msg.isRevealed } : msg,
      ),
    );
  };

  const handleMoveAuth = () => {
    router.push("/preview/end");
  };
  const handleHiddenMessage = () => {
    setFirstHiddenMessage((prev) => !prev);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* 스크롤 영역 */}
      <div className="flex-1">
        <div className="sticky top-0">
          <Header
            leftIcon={<HamburgerIcon />}
            center="RolePlay Preview"
            rightIcon="Skip"
            className="font-medium text-gray-600"
            onRightClick={handleMoveAuth}
          />
        </div>
        {isPending ? (
          <ChatLoading />
        ) : (
          <>
            <ChatNotice
              description={data?.scenario.description}
              showNotice={showNotice}
              toggleNotice={toggleNotice}
            />

            {/* 첫 AI 메세지 */}
            <MessageItem
              messages={{
                content: data?.ai_message ?? "",
                visualAction: data?.visual_action,
              }}
              aiName={data?.ai_name}
              isPreview={true}
              hiddenMeaning={data?.ai_hidden_meaning}
              isRevealed={firstHiddenMessage}
              onToggleReveal={handleHiddenMessage}
              showsituation={showSituation}
              translatedContent={data?.ai_message_en}
            />

            {/* 대화 히스토리 */}
            {userMessages.map((userMsg, idx) => (
              <div key={idx} className="z-9999">
                <MessageItem
                  messages={{ content: userMsg }}
                  isMine={true}
                  userName={data?.my_name}
                  isPreview={true}
                />
                {messageLoading && idx === userMessages.length - 1 ? (
                  <ChatLoading />
                ) : (
                  aiResponses[idx] && (
                    <MessageItem
                      messages={{
                        content: aiResponses[idx].content || "...",
                        visualAction: data?.visual_action,
                      }}
                      isMine={false}
                      aiName={data?.ai_name}
                      isPreview={true}
                      hiddenMeaning={aiResponses[idx].hiddenMeaning}
                      isRevealed={aiResponses[idx].isRevealed}
                      onToggleReveal={() => toggleReveal(idx)}
                      showsituation={showSituation}
                      translatedContent={aiResponses[idx].translatedContent}
                    />
                  )
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* 하단 고정 영역 */}
      <div className="relative flex flex-col gap-2 pb-5">
        {/* 남은 턴수 */}
        {!isPending && (
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
            onSelect={(h) => {
              setMessage(h);
              toggleHint();
            }}
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
