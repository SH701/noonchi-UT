"use client";

import { Button } from "@/components/ui/button/button";
import { SearchIcon } from "@/assets/svgr";
import { getCategories } from "@/constants";
import { useTranslation } from "react-i18next";

export type PostSortType = "latest" | "popular";

interface PostFilterProps {
  active: PostSortType;
  onSelect: (sort: PostSortType) => void;
  search: string;
  onSearch: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}

export default function PostFilter({
  active,
  onSelect,
  search,
  onSearch,
  category,
  onCategoryChange,
}: PostFilterProps) {
  const { t } = useTranslation();
  const CATEGORIES = getCategories(t);
  const filters: { label: string; value: PostSortType }[] = [
    { label: t("postList.filterLatest"), value: "latest" },
    { label: t("postList.filterPopular"), value: "popular" },
  ];
  return (
    <div className="flex flex-col gap-3 pb-4">
      <div className="flex w-full justify-between gap-2">
        <div className="flex gap-1">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={active === f.value ? "primary" : "ghost"}
              size="sm"
              onClick={() => onSelect(f.value)}
              className="h-10 w-16 rounded-full"
            >
              {f.label}
            </Button>
          ))}
        </div>

        <div className="relative">
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="max-w-50 h-10 rounded-full border border-white bg-white/70 p-3 pr-10 text-sm backdrop-blur-sm"
            placeholder={t("postList.searchPlaceholder")}
          />
          <SearchIcon
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${search !== "" ? "text-black" : "text-gray-400"}`}
          />
        </div>
      </div>
      <div className="flex gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => onCategoryChange(c.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              category === c.value
                ? "bg-indigo-400 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
