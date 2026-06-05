"use client";

import Image from "next/image";
import { useTopics } from "@/features/hub/hooks/useTopics";
import { useRouter } from "next/navigation";
import { useTabStore } from "@/store/useTabStore";
import { ChevronRight } from "lucide-react";
import RoleplayHistorySkeleton from "@/components/skeleton/RoleplayHistorySkeleton";
import { useHistorySearch } from "@/hooks/custom";
import { useDeleteConversation } from "@/hooks/mutations";
import DeleteModal from "@/components/modal/DeleteModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function RoleplayHistoryTab() {
  const { t } = useTranslation();
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
    <section>
      <button
        onClick={handleHistoryPage}
        className="mb-3 flex items-center gap-1"
      >
        <span className="text-sm font-medium">{t("roleplayTab.title")}</span>
        <ChevronRight size={18} className="text-gray-400" />
      </button>
      {isPending ? (
        <RoleplayHistorySkeleton />
      ) : conversations.length === 0 ? undefined : (
        <ul className="flex gap-3 overflow-x-auto">
          {conversations.map((convo) => {
            const matchedTopic = topics?.find(
              (topic) => topic.name === convo.conversationTopic,
            );
            return (
              <li
                key={convo.conversationId}
                className="relative aspect-square shrink-0 cursor-pointer rounded-2xl border border-white/10 shadow-lg"
                style={{ width: "clamp(112px, 28vw, 140px)" }}
                onClick={() => {
                  router.push(
                    convo.canGetReport
                      ? `/hub/roleplay/chatroom/${convo.conversationId}/result`
                      : `/hub/roleplay/chatroom/${convo.conversationId}`,
                  );
                  closeTab();
                }}
              >
                {matchedTopic?.imageUrl ? (
                  <Image
                    src={matchedTopic.imageUrl}
                    alt={convo.conversationTopic}
                    fill
                    className="rounded-2xl object-cover"
                    sizes="(max-width: 600px) 100vw, 480px"
                    loading="eager"
                  />
                ) : (
                  <div className="h-full w-full rounded-2xl bg-black/30" />
                )}
                <button
                  className="absolute right-2 top-2 z-10 flex size-6 items-center justify-center rounded-full bg-black/50 text-sm font-bold text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmId(convo.conversationId);
                  }}
                >
                  ×
                </button>
                <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-gray-300">
                    {convo.conversationTrack}
                  </span>
                  <h4 className="line-clamp-2 text-xs font-bold leading-tight">
                    {convo.conversationTopic}
                  </h4>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <DeleteModal
        isOpen={confirmId !== null}
        onClose={() => setConfirmId(null)}
        onConfirm={() => {
          if (confirmId !== null) deleteChat(confirmId);
        }}
      />
    </section>
  );
}
