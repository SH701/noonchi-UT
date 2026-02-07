"use client";

import { ChatInput } from "../common";

interface ChatroomInputProps {
  micState: "idle" | "recording" | "recorded";
  message: string;
  pendingAudioUrl: string | null;
  showVoiceError: boolean;
  isAIResponding?: boolean;
  sttText: string;

  setMessage: (v: string) => void;
  handleMicClick: () => void;
  handleResetAudio: () => void;
  handleSendAudio: () => void;
  sendMessage: (content: string) => void;
}

export default function ChatroomInput({
  message,
  isAIResponding = false,
  setMessage,
  handleMicClick,
  sendMessage,
}: ChatroomInputProps) {
  return (
    <ChatInput
      message={message}
      setMessage={setMessage}
      onSend={() => sendMessage(message)}
      onMicClick={handleMicClick}
      disabled={isAIResponding}
      placeholder={
        isAIResponding ? "AI is responding..." : "Type your answer..."
      }
    />
  );
}
