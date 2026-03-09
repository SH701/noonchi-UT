"use client";

export default function FeedbackLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 ">
      <div className="relative flex items-center justify-center">
        {/* 원형 프로그레스 */}
        <svg
          className="absolute animate-spin"
          width="165"
          height="165"
          viewBox="0 0 260 260"
          style={{ animationDuration: "2s" }}
        >
          <circle
            cx="130"
            cy="130"
            r="120"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="565"
            strokeDashoffset="141"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c6fea" />
              <stop offset="100%" stopColor="#d966c8" />
            </linearGradient>
          </defs>
        </svg>

        {/* 원형 배경 */}
        <div className="flex items-center justify-center rounded-full size-40 bg-[#dde0f5] text-6xl">
          👀
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xl font-bold text-gray-800">Loading your report setup</p>
        <p className="text-sm text-gray-400">
          It won&apos;t take long!
          <br />
          Please wait a moment.
        </p>
      </div>
    </div>
  );
}
