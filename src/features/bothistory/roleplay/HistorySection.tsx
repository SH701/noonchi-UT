"use client";

import { NoteIcon } from "@/assets/svgr";
import HistorySectiontSkeleton from "@/components/skeleton/HistorySectiontSkeleton";
import { useConversations } from "@/hooks/queries";
import { ConversationSortBy } from "@/types/conversations";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HistorySectionProps {
  sortBy: ConversationSortBy;
}

export default function HistorySection({ sortBy }: HistorySectionProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useConversations(
    null,
    sortBy,
    page,
    5,
    "ROLE_PLAYING",
  );
  const conversations = data?.conversations ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleReport = (conversationId: number) => {
    router.push(`/main/roleplay/chatroom/${conversationId}/result`);
  };
  const handleChatroom = (conversationId: number) => {
    router.push(`/main/roleplay/chatroom/${conversationId}`);
  };

  return (
    <div className="mt-4 flex flex-col gap-6">
      {isFetching ? (
        <HistorySectiontSkeleton />
      ) : (
        conversations.map((convo) => (
          <div key={convo.conversationId} className="flex w-full gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-300">
              <span>{convo.aiPersona.name[0].toUpperCase()}</span>
            </div>
            <div className="flex w-full min-w-0 flex-col">
              <div className="flex justify-between">
                <span className="font-semibold">{convo.aiPersona.aiRole}</span>
                <span className="text-xs text-gray-500">
                  {new Date(convo.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="flex-1 truncate pt-1 text-xs text-gray-600">
                  {convo.aiPersona.description.toLowerCase()}
                </p>{" "}
                {convo.canGetReport ? (
                  <button
                    className="shrink-0"
                    onClick={() => handleReport(convo.conversationId)}
                  >
                    <NoteIcon />
                  </button>
                ) : (
                  <button
                    className="shrink-0"
                    onClick={() => handleChatroom(convo.conversationId)}
                  >
                    <ChevronRight />
                  </button>
                )}{" "}
              </div>
            </div>
          </div>
        ))
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-7 w-7 rounded-full text-sm ${
                p === page ? "bg-gray-800 text-white" : "text-gray-500"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
