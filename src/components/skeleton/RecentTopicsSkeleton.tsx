export default function RecentTopicsSkeleton() {
  return (
    <div>
      <div className="flex gap-3 overflow-x-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="size-40.5 shrink-0 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}