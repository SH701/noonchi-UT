export default function RecentTopicsSkeleton() {
  return (
    <div>
      <div className="mb-3 h-4 w-32 animate-pulse rounded bg-gray-200" />
      <div className="flex gap-3 overflow-x-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="size-[162px] shrink-0 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}