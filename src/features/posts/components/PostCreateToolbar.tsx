"use client";

import { useRef } from "react";
import { ImagePlus } from "lucide-react";
import { MAX_CONTENT } from "./PostCreateForm";

interface PostCreateToolbarProps {
  contentLength: number;
  uploading: boolean;
  onFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PostCreateToolbar({
  contentLength,
  uploading,
  onFiles,
}: PostCreateToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="sticky bottom-0 flex items-center justify-between border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur-md">
      <button
        className="flex size-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-50 disabled:opacity-40"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        aria-label="Add image"
      >
        <ImagePlus size={22} />
      </button>
      <span className="text-xs text-gray-400">
        <span className={contentLength > 0 ? "text-gray-700" : ""}>
          {contentLength}
        </span>
        {" / "}
        {MAX_CONTENT}
      </span>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onFiles}
      />
    </div>
  );
}
