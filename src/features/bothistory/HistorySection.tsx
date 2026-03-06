"use client";

import { ChevronRightIcon, NoteIcon } from "@/assets/svgr";
import { useConversations } from "@/hooks/queries";
import { ConversationSortBy } from "@/types/conversations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HistorySectiontSkeleton from "./HistorySectiontSkeleton";

interface HistorySectionProps {
  sortBy: ConversationSortBy;
}

export default function HistorySection({ sortBy }: HistorySectionProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isPending } = useConversations(undefined, sortBy, page);
  const conversations = data?.conversations ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleReport = (conversationId: number) => {
    router.push(`/main/roleplay/chatroom/${conversationId}/result`);
  };
  const handleChatroom = (conversationId: number) => {
    router.push(`/main/roleplay/chatroom/${conversationId}`);
  };
  if (isPending) return <HistorySectiontSkeleton />;
  return (
    <div className="flex flex-col gap-4">
      {conversations
        .filter((convo) => convo.conversationType === "ROLE_PLAYING")
        .map((convo) => (
          <div key={convo.conversationId} className="flex gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-300">
              <span>{convo.aiPersona.name[0].toUpperCase()}</span>
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
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
              <span className="truncate text-xs text-gray-600">
                {convo.situation}
              </span>
            </div>
          </div>
        ))}

      <div className="flex items-center justify-center gap-1 pt-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`h-7.5 flex w-5 items-center justify-center rounded-md px-3 py-1 font-medium ${
              p === page ? "bg-gray-300" : "text-gray-500"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
