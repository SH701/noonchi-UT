"use client";

import { ChevronRightIcon, NoteIcon } from "@/assets/svgr";
import HistorySectiontSkeleton from "@/components/skeleton/HistorySectiontSkeleton";
import { useInfiniteConversations } from "@/hooks/queries";
import { ConversationSortBy } from "@/types/conversations";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface HistorySectionProps {
  sortBy: ConversationSortBy;
}

export default function HistorySection({ sortBy }: HistorySectionProps) {
  const router = useRouter();
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteConversations(undefined, sortBy);
  const conversations = (data?.conversations ?? []).filter(
    (convo) => convo.conversationType === "ROLE_PLAYING",
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleReport = (conversationId: number) => {
    router.push(`/main/roleplay/chatroom/${conversationId}/result`);
  };
  const handleChatroom = (conversationId: number) => {
    router.push(`/main/roleplay/chatroom/${conversationId}`);
  };

  if (isPending) return <HistorySectiontSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      {conversations.map((convo) => (
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
      <div ref={bottomRef} className="h-1" />
      {isFetchingNextPage && <HistorySectiontSkeleton />}
    </div>
  );
}
