interface SpinnerLoadingProps {
  title: string;
}

export default function SpinnerLoading({ title }: SpinnerLoadingProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="relative flex items-center justify-center">
        <svg
          className="absolute animate-spin"
          viewBox="0 0 260 260"
          style={{ width: "clamp(132px, 36vw, 165px)", height: "clamp(132px, 36vw, 165px)", animationDuration: "2s" }}
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

        <div className="flex items-center justify-center rounded-full bg-[#dde0f5]" style={{ width: "clamp(128px, 35vw, 160px)", height: "clamp(128px, 35vw, 160px)", fontSize: "clamp(48px, 10vw, 60px)" }}>
          👀
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xl font-bold text-gray-800">{title}</p>
        <p className="text-sm text-gray-400">
          It won&apos;t take long!
          <br />
          Please wait a moment.
        </p>
      </div>
    </div>
  );
}
