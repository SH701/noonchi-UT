"use client";

import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { DefaultIcon } from "@/assets/svgr";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { PostSearchItem } from "../types/posts.type";
import { getRelativeTime } from "@/lib/time-format";
import { useSession } from "next-auth/react";
import { getCategories } from "@/constants";
import { useTranslation } from "react-i18next";

type PostCardProps = PostSearchItem & {
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onLike?: () => void;
  onBookmark?: () => void;
};

export default function PostCard({
  title,
  content,
  category,
  author,
  createdAt,
  likesCount,
  commentsCount,
  isLiked,
  isBookmarked,
  images,
  onClick,
  onEdit,
  onDelete,
  onLike,
  onBookmark,
}: PostCardProps) {
  const { t } = useTranslation();
  const CATEGORIES = getCategories(t);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const { data: session } = useSession();
  const currentUserId = Number(session?.user?.id);
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
      className={`relative flex cursor-pointer flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md ${menuOpen ? "z-10" : "z-0"}`}
      onClick={onClick}
    >
      {/* 작성자 */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`size-8 shrink-0 rounded-full ${author.profileImageUrl ? "overflow-hidden" : ""}`}
          >
            {author.profileImageUrl ? (
              <Image
                src={author.profileImageUrl}
                alt={author.nickname}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            ) : (
              <DefaultIcon className="size-8" />
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="flex-1 text-sm font-medium text-gray-800">
              {author.nickname}
            </span>
            <span className="text-[11px] text-gray-500">
              {getRelativeTime(createdAt)}
            </span>
          </div>
        </div>
        {category && (
          <span className="w-fit whitespace-nowrap rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-blue-500">
            {CATEGORIES.find((c) => c.value === category)?.label ?? category}
          </span>
        )}
      </div>

      {/* 본문 */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
          {content}
        </p>
        {images.length > 0 && (
          <div
            className="relative overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${imgIndex * 100}%)` }}
            >
              {images.map((img, i) => (
                <div key={img.id} className="relative h-48 w-full shrink-0">
                  <Image
                    src={img.imageUrl}
                    alt={`post_image_${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1 text-white disabled:opacity-30"
                  onClick={() => setImgIndex((v) => v - 1)}
                  disabled={imgIndex === 0}
                >
                  ‹
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1 text-white disabled:opacity-30"
                  onClick={() => setImgIndex((v) => v + 1)}
                  disabled={imgIndex === images.length - 1}
                >
                  ›
                </button>
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`size-1.5 rounded-full transition-colors ${i === imgIndex ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 하단 액션 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <button
            className="flex items-center justify-center gap-0.5 transition-colors hover:text-red-400"
            onClick={(e) => {
              e.stopPropagation();
              onLike?.();
            }}
          >
            <Heart
              size={14}
              fill={isLiked ? "currentColor" : "none"}
              className={isLiked ? "text-red-400" : ""}
            />
            {likesCount}
          </button>
          <button className="flex items-center justify-center gap-0.5 transition-colors hover:text-blue-400">
            <MessageCircle size={14} />
            {commentsCount}
          </button>
          <button
            className="flex items-center gap-1 transition-colors hover:text-blue-400"
            onClick={(e) => {
              e.stopPropagation();
              onBookmark?.();
            }}
          >
            <Bookmark
              size={14}
              fill={isBookmarked ? "currentColor" : "none"}
              className={isBookmarked ? "text-blue-400" : ""}
            />
          </button>
        </div>
        {(onEdit || onDelete) && currentUserId === author.userId && (
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
              <div className="absolute right-0 top-6 z-50 flex flex-col overflow-hidden rounded-xl bg-white shadow-lg">
                <button
                  className="whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    onEdit?.();
                  }}
                >
                  {t("postCard.edit")}
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
                  {t("postCard.delete")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
