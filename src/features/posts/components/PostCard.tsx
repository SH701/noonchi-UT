"use client";

import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { DefaultIcon } from "@/assets/svgr";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { PostSearchItem } from "../types/posts.type";
import { getRelativeTime } from "@/lib/time-format";

type PostCardProps = PostSearchItem & {
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function PostCard({
  title,
  content,
  author,
  createdAt,
  likesCount,
  commentsCount,
  isLiked,
  isBookmarked,
  onClick,
  onEdit,
  onDelete,
}: PostCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li
      className="flex cursor-pointer flex-col gap-4 rounded-2xl bg-white/60 p-4 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      {/* 작성자 */}
      <div className="flex items-center gap-3">
        <div className="size-12 shrink-0 overflow-hidden rounded-full">
          {author.profileImageUrl ? (
            <Image
              src={author.profileImageUrl}
              alt={author.nickname}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          ) : (
            <DefaultIcon className="size-12" />
          )}
        </div>
        <span className="flex-1 text-sm font-medium text-gray-800">
          {author.nickname}
        </span>
        {(onEdit || onDelete) && (
          <div ref={menuRef} className="relative">
            <button
              className="transition-colors hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
            >
              <MoreHorizontal size={16} className="text-gray-400" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-6 z-10 flex flex-col overflow-hidden rounded-xl bg-white shadow-lg">
                <button
                  className="whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    onEdit?.();
                  }}
                >
                  Edit
                </button>
                <div className="w-px bg-gray-100" />
                <button
                  className="whitespace-nowrap px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    onDelete?.();
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 본문 */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
          {content}
        </p>
      </div>

      {/* 하단 액션 */}
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <button
          className="flex items-center gap-1 transition-colors hover:text-red-400"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart
            size={14}
            fill={isLiked ? "currentColor" : "none"}
            className={isLiked ? "text-red-400" : ""}
          />
          {likesCount}
        </button>
        <button className="flex items-center gap-1 transition-colors hover:text-blue-400">
          <MessageCircle size={14} />
          {commentsCount}
        </button>
        <button
          className="flex items-center gap-1 transition-colors hover:text-blue-400"
          onClick={(e) => e.stopPropagation()}
        >
          <Bookmark
            size={14}
            fill={isBookmarked ? "currentColor" : "none"}
            className={isBookmarked ? "text-blue-400" : ""}
          />
        </button>
        <span className="ml-auto">{getRelativeTime(createdAt)}</span>
      </div>
    </li>
  );
}
