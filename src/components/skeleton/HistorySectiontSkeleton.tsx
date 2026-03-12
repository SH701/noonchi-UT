export default function HistorySectiontSkeleton() {
  
    return (
      <div className="flex flex-col items-center justify-between gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded bg-gray-200"
          />
        ))}
      </div>
    );
}