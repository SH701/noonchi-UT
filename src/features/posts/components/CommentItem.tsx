"use client";

import { Heart, MoreHorizontal } from "lucide-react";
import { DefaultIcon } from "@/assets/svgr";
import Image from "next/image";

interface CommentItemProps {
  author: string;
  authorImageUrl?: string;
  createdAt: string;
  body: string;
  likeCount: number;
  isLiked: boolean;
  isMe?: boolean;
  onReply?: () => void;
}

export default function CommentItem({
  author,
  authorImageUrl,
  createdAt,
  body,
  likeCount,
  isLiked,
  isMe,
  onReply,
}: CommentItemProps) {
  return (
    <div className="flex gap-3 border-b border-white p-4">
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
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">{author}</span>
          <span className="text-xs text-gray-400">· {createdAt}</span>
          <button className="ml-auto text-gray-400">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <p className="text-sm leading-relaxed text-gray-700">{body}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <button className="flex items-center gap-1">
            <Heart
              size={12}
              fill={isLiked ? "currentColor" : "none"}
              className={isLiked ? "text-red-400" : ""}
            />
            {likeCount}
          </button>
          {!isMe && (
            <button onClick={onReply} className="text-gray-400">
              답글 달기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
