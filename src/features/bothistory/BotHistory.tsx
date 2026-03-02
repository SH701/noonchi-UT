"use client";

import { useState } from "react";
import HistoryHeader from "./HistoryHeader";
import HistorySection from "./HistorySection";
import HistorySort, { ConversationSortBy } from "./HistorySort";
import RecentTopic from "./RecentTopics";

export default function BotHistory() {
  const [sortBy, setSortBy] = useState<ConversationSortBy>("LAST_ACTIVITY_DESC");
  return (
    <div className="space-y-6">
      <HistoryHeader />
      <RecentTopic />
      <HistorySort sortBy={sortBy} onSortChange={setSortBy} />
      <HistorySection sortBy={sortBy} />
    </div>
  );
}
