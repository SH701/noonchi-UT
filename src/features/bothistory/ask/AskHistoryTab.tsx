"use client";

import { AskHistorySkeleton } from "../../../components/skeleton";
import { SearchIcon } from "@/assets/svgr";
import { useRouter } from "next/navigation";
import { useTabStore } from "@/store/useTabStore";
import EmptyState from "../EmptyState";
import { getTime } from "@/lib/time-format";
import { useHistorySearch } from "@/hooks/custom";
import { useState } from "react";
import { useDeleteConversation } from "@/hooks/mutations";
import DeleteModal from "@/components/modal/DeleteModal";

export default function AskHistoryTab() {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const { closeTab } = useTabStore();
  const { conversations, isPending, isSearching, searchKeyword } =
    useHistorySearch("ASK");
  const { mutate: deleteChat } = useDeleteConversation();
  const handleEdit = () => {
    setEdit((prev) => !prev);
  };
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <DeleteModal
        isOpen={confirmId !== null}
        onClose={() => setConfirmId(null)}
        onConfirm={() => {
          if (confirmId !== null) deleteChat(confirmId);
        }}
      />
      <div className="mt-5 flex shrink-0 items-start justify-between">
        <span className="mb-2 text-sm font-medium">Ask</span>
        <button
          className="cursor-pointer text-xs text-gray-600"
          onClick={handleEdit}
        >
          Edit
        </button>
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
              <EmptyState />
            )}
          </div>
        ) : (
          conversations.map((convo) => (
            <div
              key={convo.conversationId}
              className="mb-2 rounded-lg bg-white/10 p-3"
              onClick={() => {
                router.push(`/main/ask/${convo.conversationId}`);
                closeTab();
              }}
            >
              <div className="flex flex-col">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-black">
                    {convo.askTarget.toUpperCase()}
                  </span>
                  {edit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmId(convo.conversationId);
                      }}
                    >
                      ❌
                    </button>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {getTime(convo.createdAt)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}