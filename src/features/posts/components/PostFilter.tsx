"use client";

import { Button } from "@/components/ui/button/button";
import { SearchIcon } from "@/assets/svgr";

export type PostSortType = "latest" | "popular";

interface PostFilterProps {
  active: PostSortType;
  onSelect: (sort: PostSortType) => void;
  search: string;
  onSearch: (value: string) => void;
}

const filters: { label: string; value: PostSortType }[] = [
  { label: "Latest", value: "latest" },
  { label: "Popular", value: "popular" },
];

export default function PostFilter({
  active,
  onSelect,
  search,
  onSearch,
}: PostFilterProps) {
  return (
    <div className="flex flex-col gap-3 pb-4">
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={active === f.value ? "primary" : "ghost"}
              size="sm"
              onClick={() => onSelect(f.value)}
              className="rounded-full"
            >
              {f.label}
            </Button>
          ))}
        </div>
        <div className="relative">
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="h-11 rounded-full border border-white bg-white/70 p-3 pr-10 text-sm backdrop-blur-sm"
            placeholder="Search posts..."
          />
          <SearchIcon
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${search !== "" ? "text-black" : "text-gray-400"}`}
          />
        </div>
      </div>
    </div>
  );
}
