"use client";

import { ChevronLeft } from "lucide-react";

interface PostCreateHeaderProps {
  canSubmit: boolean;
  isPending: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

export default function PostCreateHeader({
  canSubmit,
  isPending,
  onBack,
  onSubmit,
}: PostCreateHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between backdrop-blur-md">
      <button
        onClick={onBack}
        className="-ml-2 flex size-9 items-center justify-center"
        aria-label="Go back"
      >
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-base font-semibold text-gray-900">New Post</h1>
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition ${
          canSubmit
            ? "bg-gradient-primary text-white shadow-sm"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {isPending ? "Posting..." : "Post"}
      </button>
    </header>
  );
}
