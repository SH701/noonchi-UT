"use client";

import { ChevronRightIcon, NoteIcon } from "@/assets/svgr";
import { useConversations } from "@/hooks/queries";
import { useRouter } from "next/navigation";

export default function HistorySection() {
  const router = useRouter();
  const { data: conversations } = useConversations();
  const handleReport = (conversationId: number) => {
    router.push(`/main/roleplay/chatroom/${conversationId}/result`);
  };
  const handleChatroom = (conversationId: number)=>{
    router.push(`/main/roleplay/chatroom/${conversationId}`);
  }
  return (
    <div>
      {conversations
        ?.filter((convo) => convo.conversationType === "ROLE_PLAYING")
        .map((convo) => (
          <div key={convo.conversationId} className="flex gap-2 space-y-6">
            <div className="flex items-center justify-center bg-gray-300 w-10 h-10 rounded-full shrink-0">
              <span>{convo.aiPersona.name[0].toUpperCase()}</span>
            </div>
            <div className="flex flex-col gap-0.5 w-full">
              <div className="flex justify-between">
                <span className="font-semibold">{convo.conversationTopic}</span>
                {convo.canGetReport ? (
                  <button onClick={() => handleReport(convo.conversationId)}>
                    <NoteIcon />
                  </button>
                ) : (
                  <button onClick={() => handleChatroom(convo.conversationId)}>
                    <ChevronRightIcon />
                  </button>
                )}
              </div>
              <span className="text-xs truncate text-gray-600">
                {convo.situation}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
