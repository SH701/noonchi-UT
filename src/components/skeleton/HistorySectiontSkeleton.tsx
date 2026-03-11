export default function HistorySectiontSkeleton() {
  
    return (
      <div className="flex flex-col items-center justify-between gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-10.5 w-full animate-pulse rounded bg-gray-200"
          />
        ))}
      </div>
    );
}