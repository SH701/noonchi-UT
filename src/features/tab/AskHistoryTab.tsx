"use client";

import { AskHistorySkeleton } from "../../components/skeleton";
import { SearchIcon } from "@/assets/svgr";
import { useRouter } from "next/navigation";
import { useTabStore } from "@/store/useTabStore";

import { getTime } from "@/lib/time-format";
import { useHistorySearch } from "@/hooks/custom";
import { Check } from "lucide-react";
import EmptyState from "../bothistory/components/EmptyState";
import { useTranslation } from "react-i18next";

interface AskHistoryTabProps {
  edit: boolean;
  setEdit: () => void;
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
}

export default function AskHistoryTab({
  edit,
  setEdit,
  selectedIds,
  onToggleSelect,
}: AskHistoryTabProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { closeTab } = useTabStore();
  const { conversations, isPending, isSearching, searchKeyword } =
    useHistorySearch("ASK");

  return (
    <section className="flex h-full flex-col overflow-hidden">
      <div className="mt-5 flex shrink-0 items-start justify-between">
        <span className="mb-2 text-sm font-medium">{t("askTab.title")}</span>
        <button className="cursor-pointer text-xs" onClick={setEdit}>
          {edit ? (
            <span className="text-red-500">{t("askTab.cancel")}</span>
          ) : (
            <span className="text-gray-600">{t("askTab.edit")}</span>
          )}
        </button>
      </div>

      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pr-2" style={{ marginBottom: "clamp(72px, 18vw, 92px)" }}>
        {isPending ? (
          <AskHistorySkeleton />
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1">
            {isSearching ? (
              <div className="mt-20 flex gap-2">
                <SearchIcon className="text-gray-500" />
                <span className="font-medium text-gray-500">
                  {t("askTab.noResults", { keyword: searchKeyword })}
                </span>
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        ) : (
          conversations.map((convo) => (
            <article
              key={convo.conversationId}
              className="mb-2 rounded-lg bg-white/10 p-3"
              onClick={() => {
                if (edit) {
                  onToggleSelect(convo.conversationId);
                  return;
                }
                if (convo.situation?.includes("[screenshot]")) {
                  router.push(
                    `/hub/ask/${convo.conversationId}?from=screenshot`,
                  );
                } else {
                  router.push(`/hub/ask/${convo.conversationId}`);
                }
                closeTab();
              }}
            >
              <div className="flex items-center gap-4">
                {edit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSelect(convo.conversationId);
                    }}
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${
                      selectedIds.includes(convo.conversationId)
                        ? "border-none bg-indigo-500"
                        : "border-gray-500"
                    }`}
                  >
                    {selectedIds.includes(convo.conversationId) && (
                      <Check className="size-5 text-center text-white" />
                    )}
                  </button>
                )}
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-black">
                    {convo.askTarget?.toUpperCase()}
                  </span>
                  <time className="text-xs text-gray-500">
                    {getTime(convo.createdAt)}
                  </time>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
