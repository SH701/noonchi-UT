"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { CATEGORIES, MAX_CONTENT } from "@/constants/category";

interface PostCreateFormProps {
  title: string;
  content: string;
  category: string;
  imageUrls: string[];
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onRemoveImage: (url: string) => void;
}

export default function PostCreateForm({
  title,
  content,
  category,
  imageUrls,
  onTitleChange,
  onContentChange,
  onCategoryChange,
  onRemoveImage,
}: PostCreateFormProps) {
  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-white p-4 shadow-sm">
      <input
        className="border-b border-gray-400 pb-3 text-lg font-bold outline-none placeholder:font-normal placeholder:text-gray-300"
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        maxLength={100}
      />
      <textarea
        className="mt-4 flex-1 resize-none text-[15px] leading-relaxed text-gray-800 outline-none placeholder:text-gray-300"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => onContentChange(e.target.value.slice(0, MAX_CONTENT))}
        rows={12}
      />
      <div className="mb-3 flex flex-wrap gap-2">
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
      {imageUrls.length > 0 && (
        <div className="scrollbar-hide mt-3 flex gap-2 overflow-x-auto">
          {imageUrls.map((url) => (
            <div
              key={url}
              className="relative size-20 shrink-0 overflow-hidden rounded-xl"
            >
              <Image
                src={url}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
              <button
                onClick={() => onRemoveImage(url)}
                className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white"
                aria-label="Remove image"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { MAX_CONTENT };
