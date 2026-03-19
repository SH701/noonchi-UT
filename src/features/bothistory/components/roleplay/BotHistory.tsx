"use client";

import { useState } from "react";
import HistoryHeader from "./HistoryHeader";
import { ConversationSortBy } from "@/types/conversations";
import RecentTopic from "./RecentTopics";
import HistorySort from "./HistorySort";
import HistorySection from "./HistorySection";

export default function BotHistory() {
  const [sortBy, setSortBy] =
    useState<ConversationSortBy>("LAST_ACTIVITY_DESC");
  return (
    <div className="space-y-6">
      <HistoryHeader />
      <RecentTopic />
      <HistorySort sortBy={sortBy} onSortChange={setSortBy} />
      <HistorySection sortBy={sortBy} />
    </div>
  );
}
