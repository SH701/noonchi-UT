"use client";

import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { DefaultIcon } from "@/assets/svgr";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface PostDetailProps {
  title: string;
  body: string;
  author: string;
  authorImageUrl?: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isMe?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PostDetail({
  title,
  body,
  author,
  authorImageUrl,
  createdAt,
  likeCount,
  commentCount,
  bookmarkCount,
  isLiked,
  isBookmarked,
  isMe,
  onEdit,
  onDelete,
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
    <div className="flex cursor-pointer flex-col gap-4 rounded-2xl bg-white/60 p-4 shadow-sm">
      {/* 작성자 */}
      <div className="flex items-center gap-3">
        <div className="size-12 shrink-0 overflow-hidden rounded-full">
          {authorImageUrl ? (
            <Image
              src={authorImageUrl}
              alt={author}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          ) : (
            <DefaultIcon className="size-12" />
          )}
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-sm font-semibold text-gray-900">{author}</span>
          
        </div>
        {isMe && (
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
                  수정
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
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 제목 + 본문 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        <p className="text-sm leading-relaxed text-gray-600">{body}</p>
      </div>

      {/* 하단 액션 */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 text-xs text-gray-400">
        <button className="flex items-center gap-1">
          <Heart
            size={14}
            fill={isLiked ? "currentColor" : "none"}
            className={isLiked ? "text-red-400" : ""}
          />
          {likeCount}
        </button>
        <button className="flex items-center gap-1">
          <MessageCircle size={14} />
          {commentCount}
        </button>
        <button className="flex items-center gap-1">
          <Bookmark
            size={14}
            fill={isBookmarked ? "currentColor" : "none"}
            className={isBookmarked ? "text-blue-400" : ""}
          />
          {bookmarkCount}
        </button>
        <span className="ml-auto">{createdAt}</span>
      </div>
      
    </div>
  );
}
