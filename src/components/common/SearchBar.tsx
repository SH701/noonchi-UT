"use client";

import { useChatHistoryStore } from "@/store/chathistory/useChatHistorystore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBar() {
  const { keyword, setKeyword } = useChatHistoryStore();

  return (
    <div className="relative w-full">
      <input
        key="search-input"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            /* empty */
          }
        }}
        className="w-full border p-1 rounded-full pr-8 overflow-hidden placeholder:pl-1"
        placeholder="Search..."
        style={{ minWidth: 0 }}
      />
      <MagnifyingGlassIcon className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2" />
    </div>
  );
}
