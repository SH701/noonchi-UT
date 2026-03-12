"use client";

import {
  useConversations,
  useConversationSearch,
  useTopics,
} from "@/hooks/queries";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useChatHistoryStore } from "@/store/useChatHistorystore";
import { useTabStore } from "@/store/useTabStore";
import { ChevronRight } from "lucide-react";
import { RoleplayHistorySkeleton } from "@/components/skeleton";

export default function RoleplayHistoryTab() {
  const router = useRouter();
  const { searchKeyword } = useChatHistoryStore();
  const { closeTab } = useTabStore();
  const isSearching = searchKeyword.trim().length > 0;

  const { data: listData, isPending: isListPending } = useConversations(
    null,
    "LAST_ACTIVITY_DESC",
    1,
    20,
    "ROLE_PLAYING",
  );
  const { data: searchData, isPending: isSearchPending } =
    useConversationSearch(searchKeyword);
  const { data: topics = [], isPending: isTopicsPending } = useTopics(
    "",
    false,
  );

  const isPending =
    isTopicsPending || (isSearching ? isSearchPending : isListPending);
  const conversations = isSearching
    ? (searchData?.conversations ?? [])
    : (listData?.conversations ?? []);

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
                    convo.status === "DONE"
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

                <div className="bg-linear-to-t absolute inset-0 from-black/80 via-black/20 to-transparent" />

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
    </div>
  );
}
