"use client";

import { ChevronDownIcon } from "@/assets/svgr";
import { ConversationSortBy } from "@/types/conversations";
import { useState } from "react";

interface HistorySortProps {
  sortBy: ConversationSortBy;
  onSortChange: (sortBy: ConversationSortBy) => void;
}

export default function HistorySort({
  sortBy,
  onSortChange,
}: HistorySortProps) {
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  return (
    <div className="relative mb-2 flex items-center justify-between">
      <span className="text-sm">All</span>
      <button
        onClick={() => setOpenSortDropdown((prev) => !prev)}
        className="flex cursor-pointer items-center gap-1 rounded text-xs"
      >
        {sortBy === "CREATED_AT_DESC" ? "Oldest activity" : "Latest activity"}
        <ChevronDownIcon
          className={`size-3 shrink-0 transform pt-0.5 transition-transform ${
            openSortDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {openSortDropdown && (
        <div className="w-25 absolute right-6 top-full z-10 mt-0.5 rounded-md border border-gray-200 bg-white shadow-sm">
          <button
            onClick={() => {
              onSortChange("LAST_ACTIVITY_DESC");
              setOpenSortDropdown(false);
            }}
            className={`w-full px-1 py-2 text-center text-xs hover:bg-gray-100 ${
              sortBy === "LAST_ACTIVITY_DESC"
                ? "bg-gray-50 font-medium text-blue-600"
                : ""
            }`}
          >
            Latest activity
          </button>
          <button
            onClick={() => {
              onSortChange("CREATED_AT_DESC");
              setOpenSortDropdown(false);
            }}
            className={`w-full px-1 py-2 text-center text-xs hover:bg-gray-100 ${
              sortBy === "CREATED_AT_DESC"
                ? "bg-gray-50 font-medium text-blue-600"
                : ""
            }`}
          >
            Oldest activity
          </button>
        </div>
      )}
    </div>
  );
}
