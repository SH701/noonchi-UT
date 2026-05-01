"use client";

import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { DefaultIcon } from "@/assets/svgr";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { PostDetail as PostDetailType } from "../types/posts.type";
import { getRelativeTime } from "@/lib/time-format";


type PostDetailProps = PostDetailType & {
  onEdit?: () => void;
  onDelete?: () => void;
  onLike?: () => void;
  onBookmark?: () => void;
  isMe?: boolean;
};

export default function PostDetail({
  title,
  content,
  author,
  images,
  createdAt,
  likesCount,
  commentsCount,
  isLiked,
  isBookmarked,
  isMe,
  onEdit,
  onDelete,
  onLike,
  onBookmark,
}: PostDetailProps) {
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
    <div className="flex flex-col gap-4 rounded-2xl bg-white/60 p-4 shadow-sm">
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
        <div className="flex flex-1 flex-col">
          <span className="text-sm font-semibold text-gray-900">
            {author.nickname}
          </span>
          <span className="text-xs text-gray-400">{getRelativeTime(createdAt)}</span>
        </div>
        {isMe && (
          <div ref={menuRef} className="relative">
            <button
              className="transition-colors hover:text-gray-600"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <MoreHorizontal size={16} className="text-gray-400" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-6 z-10 flex flex-col overflow-hidden rounded-xl bg-white shadow-lg">
                <button
                  className="whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit?.();
                  }}
                >
                  Edit
                </button>
                <div className="h-px bg-gray-100" />
                <button
                  className="whitespace-nowrap px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                  onClick={() => {
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

      {/* 제목 + 본문 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
          {content}
        </p>
      </div>

      {/* 이미지 */}
      {images.length > 0 && (
        <div className="scrollbar-hide flex gap-2 overflow-x-auto">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative size-24 shrink-0 overflow-hidden rounded-xl"
            >
              <Image
                src={img.imageUrl}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* 하단 액션 */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 text-xs text-gray-400">
        <button className="flex items-center gap-1" onClick={onLike}>
          <Heart
            size={14}
            fill={isLiked ? "currentColor" : "none"}
            className={isLiked ? "text-red-400" : ""}
          />
          {likesCount}
        </button>
        <button className="flex items-center gap-1">
          <MessageCircle size={14} />
          {commentsCount}
        </button>
        <button className="flex items-center gap-1" onClick={onBookmark}>
          <Bookmark
            size={14}
            fill={isBookmarked ? "currentColor" : "none"}
            className={isBookmarked ? "text-blue-400" : ""}
          />
        </button>
      </div>
    </div>
  );
}
