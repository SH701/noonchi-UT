"use client";

import HistorySectiontSkeleton from "@/components/skeleton/HistorySectiontSkeleton";
import { useConversations } from "@/hooks/queries/useConversation";

import { getRelativeTime } from "@/lib/time-format";
import { ConversationSortBy } from "@/types/conversations";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

interface HistorySectionProps {
  sortBy: ConversationSortBy;
  onSortChange: (sortBy: ConversationSortBy) => void;
}

type TabKey = "recent" | "oldest" | "active";

export default function HistorySection({
  sortBy,
  onSortChange,
}: HistorySectionProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>(
    sortBy === "CREATED_AT_DESC" ? "oldest" : "recent",
  );

  const PAGE_SIZE = 3;
  const { data, isFetching } = useConversations(
    null,
    "LAST_ACTIVITY_DESC",
    1,
    100,
    "ROLE_PLAYING",
  );
  const allConversations = data?.conversations ?? [];
  const sortedConversations =
    activeTab === "oldest"
      ? [...allConversations].reverse()
      : activeTab === "active"
        ? allConversations.filter((c) => c.status === "ACTIVE")
        : allConversations;
  const totalPages = Math.max(
    1,
    Math.ceil(sortedConversations.length / PAGE_SIZE),
  );
  const conversations = sortedConversations.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setPage(1);
    if (tab === "oldest") onSortChange("CREATED_AT_DESC");
    else onSortChange("LAST_ACTIVITY_DESC");
  };

  const handleReport = (conversationId: number) => {
    router.push(`/hub/roleplay/chatroom/${conversationId}/result`);
  };
  const handleChatroom = (conversationId: number) => {
    router.push(`/hub/roleplay/chatroom/${conversationId}`);
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "recent", label: t("botHistory.tabs.recent") },
    { key: "oldest", label: t("botHistory.tabs.oldest") },
    { key: "active", label: t("botHistory.tabs.active") },
  ];

  const localeMap: Record<string, "en" | "ja" | "ru" | "es"> = {
    en: "en",
    ja: "ja",
    ru: "ru",
    es: "es",
  };
  const locale = localeMap[i18n.language?.split("-")[0] ?? "en"] ?? "en";

  return (
    <section className="mt-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={clsx(
                "rounded-full px-4 py-1.5 text-sm font-medium transition",
                activeTab === tab.key
                  ? "bg-gradient-secondary text-white"
                  : "text-gray-900",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-900">
          {t("botHistory.count", { count: allConversations.length })}
        </span>
      </div>

      {isFetching ? (
        <HistorySectiontSkeleton />
      ) : (
        <div className="flex flex-col gap-3">
          {conversations.map((convo) => {
            const isActive = convo.status === "ACTIVE";
            return (
              <article
                key={convo.conversationId}
                className="rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="flex gap-3">
                  <div className="relative shrink-0">
                    <div className="bg-linear-to-br bg-gradient-secondary flex size-12 items-center justify-center rounded-full text-base font-semibold text-white">
                      {convo.aiPersona.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <span className="truncate text-sm font-bold text-gray-900">
                        {convo.aiPersona.aiRole}
                      </span>
                      <time className="shrink-0 text-xs text-gray-400">
                        {getRelativeTime(
                          convo.lastActivityAt ?? convo.createdAt,
                          locale,
                        )}
                      </time>
                    </div>
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {convo.aiPersona.description?.toLowerCase() ?? ""}
                    </p>
                    <p className="line-clamp-2 text-xs text-gray-600">
                      {convo.situation}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <span
                    className={clsx(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                      isActive
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-violet-50 text-violet-600",
                    )}
                  >
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                    )}
                    {isActive
                      ? t("botHistory.status.active")
                      : t("botHistory.status.endedReport")}
                  </span>

                  {isActive ? (
                    <button
                      onClick={() => handleChatroom(convo.conversationId)}
                      className="bg-linear-to-br bg-gradient-secondary flex size-6 items-center justify-center rounded-xl text-white shadow-sm"
                      aria-label="Continue chat"
                    >
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReport(convo.conversationId)}
                      className="flex size-6 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-700 shadow-sm"
                      aria-label="View report"
                    >
                      <FileText size={18} />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 pb-2">
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
        </nav>
      )}
    </section>
  );
}
