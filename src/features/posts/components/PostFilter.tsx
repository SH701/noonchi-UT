"use client";


import { SearchIcon } from "@/assets/svgr";
import { getCategories } from "@/constants";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

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
  const CATEGORIES = useMemo(() => getCategories(t), [t]);
  const containerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const filters: { label: string; value: PostSortType }[] = [
    { label: t("postList.filterLatest"), value: "latest" },
    { label: t("postList.filterPopular"), value: "popular" },
  ];
  const activeLabel = filters.find((f) => f.value === active)?.label ?? "";

  useEffect(() => {
    if (!containerRef.current || !categoriesRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const trackWidth = categoriesRef.current.scrollWidth;

    const maxDrag = containerWidth - trackWidth;

    setConstraints({
      left: maxDrag < 0 ? maxDrag : 0,
      right: 0,
    });
  }, [CATEGORIES]);
  return (
    <div className="flex flex-col gap-3 pb-4" ref={containerRef}>
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-2"
          ref={categoriesRef}
          drag="x"
          dragConstraints={constraints}
          transition={{ type: "spring", bounce: 0.2 }}
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => onCategoryChange(c.value)}
              className={`whitespace-nowrap rounded-full bg-slate-50 px-3 py-1 text-xs font-medium transition ${
                category === c.value ? "text-blue-500" : ""
              }`}
            >
              {c.label}
            </button>
          ))}
        </motion.div>
      </div>
      <div className="flex w-full justify-between gap-2">
        <div className="relative" ref={sortRef}>
          <button
            type="button"
            onClick={() => setSortOpen((v) => !v)}
            className="bg-gradient-secondary flex h-8 items-center gap-1 rounded-full px-4 text-sm font-medium text-white"
          >
            {activeLabel}
            <ChevronDown
              className={`size-3 transition-transform ${sortOpen ? "rotate-180" : ""}`}
            />
          </button>
          {sortOpen && (
            <ul className="absolute left-0 top-10 z-10 min-w-full overflow-hidden rounded-2xl bg-white shadow-lg">
              {filters.map((f) => (
                <li key={f.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(f.value);
                      setSortOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition hover:bg-gray-50 ${active === f.value ? "text-grad-text-1 font-semibold" : "text-gray-700"}`}
                  >
                    {f.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="max-w-50 h-8 rounded-full border border-white bg-white/70 p-3 pr-10 text-sm backdrop-blur-sm"
            placeholder={t("postList.searchPlaceholder")}
          />
          <SearchIcon
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${search !== "" ? "text-black" : "text-gray-400"}`}
          />
        </div>
      </div>
    </div>
  );
}
