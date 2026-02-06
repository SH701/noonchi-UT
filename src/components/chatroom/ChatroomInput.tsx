import { Asterisk, Lightbulb } from "lucide-react";
import Image from "next/image";
import { MicrophoneIcon } from "@heroicons/react/24/solid";

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
  micState,
  message,
  showVoiceError,
  isAIResponding = false,
  sttText,

  setMessage,
  handleMicClick,
  handleResetAudio,
  handleSendAudio,
  sendMessage,
}: ChatroomInputProps) {
  return (
    <div className="border-gray-200 max-w-93.75 w-full flex justify-center items-center flex-col gap-6 absoulte bottom-0 z-50">
      <div className="flex flex-col items-center w-full max-w-83.5 h-25 min-w-0 border border-blue-300 rounded-[20px] bg-white">
        <input
          type="text"
          placeholder={
            isAIResponding ? "AI is responding..." : "Type your answer..."
          }
          className="grow min-w-0 px-2 text-gray-500 placeholder-gray-400 border-none outline-none disabled:bg-gray-50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            !isAIResponding &&
            message.trim() &&
            sendMessage(message)
          }
          disabled={isAIResponding}
        />
        <div className="flex gap-1">
          <button className="flex border rounded-full px-2 h-6.5 ">
            <Asterisk />
            <p>situation</p>
          </button>

          <button className="flex border rounded-full px-2 h-6.5 ">
            <Lightbulb className=" py-1" />
            <p>hint</p>
          </button>
          <button
            onClick={() => sendMessage(message)}
            className="shrink-0 p-3 hover:bg-gray-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isAIResponding || !message.trim()}
          >
            <Image src="/chatroom/up.png" alt="Send" width={28} height={28} />
          </button>
          <button className="border rounded-full size-8">
            <MicrophoneIcon className="size-7" />
          </button>
        </div>
      </div>
    </div>
  );
}
