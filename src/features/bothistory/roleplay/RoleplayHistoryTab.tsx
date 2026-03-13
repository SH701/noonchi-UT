"use client";

import Image from "next/image";
import { useTopics } from "@/hooks/queries";
import { useRouter } from "next/navigation";
import { useTabStore } from "@/store/useTabStore";
import { ChevronRight } from "lucide-react";
import { RoleplayHistorySkeleton } from "@/components/skeleton";
import { useHistorySearch } from "@/hooks/custom";
import { useDeleteConversation } from "@/hooks/mutations";
import DeleteModal from "@/components/modal/DeleteModal";
import { useState } from "react";

export default function RoleplayHistoryTab() {
  const router = useRouter();
  const { closeTab } = useTabStore();
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const { conversations, isPending: isHistoryPending } =
    useHistorySearch("ROLE_PLAYING");
  const { data: topics = [], isPending: isTopicsPending } = useTopics(
    "",
    false,
  );
  const isPending = isHistoryPending || isTopicsPending;
  const { mutate: deleteChat } = useDeleteConversation();
  const handleHistoryPage = () => {
    router.push("/bothistory/roleplay");
    closeTab();
  };
  return (
    <div>
      <button
        onClick={handleHistoryPage}
        className="mb-3 flex items-center gap-1"
      >
        <span className="text-sm font-medium">Role Playing</span>
        <ChevronRight size={18} className="text-gray-400" />
      </button>
      {isPending ? (
        <RoleplayHistorySkeleton />
      ) : conversations.length === 0 ? undefined : (
        <div className="flex gap-3 overflow-x-auto">
          {conversations.map((convo) => {
            const matchedTopic = topics?.find(
              (topic) => topic.name === convo.conversationTopic,
            );
            return (
              <div
                key={convo.conversationId}
                className="relative size-32 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-lg"
                onClick={() => {
                  router.push(
                    convo.canGetReport
                      ? `/main/roleplay/chatroom/${convo.conversationId}/result`
                      : `/main/roleplay/chatroom/${convo.conversationId}`,
                  );
                  closeTab();
                }}
              >
                {matchedTopic?.imageUrl ? (
                  <Image
                    src={matchedTopic.imageUrl}
                    alt={convo.conversationTopic}
                    fill
                    className="object-cover"
                    sizes="(max-width: 430px) 100vw, 80vw"
                    loading="eager"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-600" />
                )}
                <button
                  className="absolute right-2 text-white/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmId(convo.conversationId);
                  }}
                >
                  x
                </button>
                <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-gray-300">
                    {convo.conversationTrack}
                  </span>
                  <h4 className="line-clamp-2 text-xs font-bold leading-tight">
                    {convo.conversationTopic}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <DeleteModal
        isOpen={confirmId !== null}
        onClose={() => setConfirmId(null)}
        onConfirm={() => {
          if (confirmId !== null) deleteChat(confirmId);
        }}
      />
    </div>
  );
}
