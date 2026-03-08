"use client";

import { HomeIcon, SearchIcon } from "@/assets/svgr";
import { useChatHistoryStore } from "@/store/useChatHistorystore";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const { keyword, setKeyword } = useChatHistoryStore();
  const router = useRouter();
  const handleNewChat = () => {
    router.push("/main");
  };
  return (
    <div className="flex gap-4">
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
          className="h-12 w-full overflow-hidden rounded-full border border-white bg-white/70 p-3 pl-10"
          placeholder="Search for chats"
          style={{ minWidth: 0 }}
        />
        <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />
      </div>
      <div className="min-w-0">
        <HomeIcon className="mt-3 shrink-0" onClick={handleNewChat} />
      </div>
    </div>
  );
}
