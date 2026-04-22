export default function RecentTopicsSkeleton() {
  return (
    <div>
      <div className="flex gap-3 overflow-x-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square w-[clamp(128px,30vw,162px)] shrink-0 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}