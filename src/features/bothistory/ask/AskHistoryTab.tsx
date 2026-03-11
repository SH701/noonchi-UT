"use client";

import { useConversations, useConversationSearch } from "@/hooks/queries";
import { AskHistorySkeleton } from "../../../components/skeleton";
import { useChatHistoryStore } from "@/store/useChatHistorystore";
import { EmptyAskIcon, SearchIcon } from "@/assets/svgr";
import { useRouter } from "next/navigation";
import { useTabStore } from "@/store/useTabStore";

export default function AskHistoryTab() {
  const { searchKeyword } = useChatHistoryStore();
  const router = useRouter();
  const { closeTab } = useTabStore();
  const isSearching = searchKeyword.trim().length > 0;

  const { data: listData, isPending: isListPending } = useConversations();
  const { data: searchData, isPending: isSearchPending } =
    useConversationSearch(searchKeyword, "ASK");

  const isPending = isSearching ? isSearchPending : isListPending;
  const conversations = isSearching
    ? (searchData?.conversations ?? [])
    : (listData?.conversations ?? []).filter(
        (c) => c.conversationType === "ASK",
      );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="mt-5 flex shrink-0 justify-between">
        <span className="mb-2 text-sm font-medium">Ask</span>
        <span className="cursor-pointer text-xs text-gray-600">Edit</span>
      </div>

      <div className="custom-scrollbar mb-23 min-h-0 flex-1 overflow-y-auto pr-2">
        {isPending ? (
          <AskHistorySkeleton />
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1">
            {isSearching ? (
              <div className="mt-20 flex gap-2">
                <SearchIcon className="text-gray-500" />
                <span className="font-medium text-gray-500">
                  No results for &quot;{searchKeyword}&quot;
                </span>
              </div>
            ) : (
              <div className="mt-20 flex gap-2">
                <EmptyAskIcon className="text-gray-500" />
                <span className="font-medium text-gray-500">
                  No conversations yet
                </span>
              </div>
            )}
          </div>
        ) : (
          conversations.map((convo) => (
            <div
              key={convo.conversationId}
              className="mb-2 rounded-lg bg-white/10 p-3"
              onClick={() => {
                const query = new URLSearchParams({
                  askTarget: convo.askTarget,
                  closeness: convo.closeness,
                  situation: convo.situation,
                }).toString();
                router.push(`/main/ask/${convo.conversationId}?${query}`);
                closeTab();
              }}
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black">
                  {convo.askTarget.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(convo.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
