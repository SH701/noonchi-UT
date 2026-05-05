"use client";

import { Heart, MoreHorizontal } from "lucide-react";
import { DefaultIcon } from "@/assets/svgr";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { CommentRes } from "../types/posts.type";
import { getRelativeTime } from "@/lib/time-format";

type CommentItemProps = CommentRes & {
  isMe?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onLike?: () => void;
};

export default function CommentItem({
  author,
  createdAt,
  content,
  likesCount,
  isLiked,
  isMe,
  onEdit,
  onDelete,
  onLike,
}: CommentItemProps) {
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
    <div className="flex gap-3 border-b border-white p-4">
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
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            {author.nickname}
          </span>
          <span className="text-xs text-gray-400">
            · {getRelativeTime(createdAt)}
          </span>
          {isMe && (
            <div ref={menuRef} className="relative ml-auto">
              <button
                className="text-gray-400"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <MoreHorizontal size={16} />
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
        <p className="text-sm leading-relaxed text-gray-700">{content}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <button className="flex items-center gap-1" onClick={onLike}>
            <Heart
              size={12}
              fill={isLiked ? "currentColor" : "none"}
              className={isLiked ? "text-red-400" : ""}
            />
            {likesCount}
          </button>
        </div>
      </div>
    </div>
  );
}
