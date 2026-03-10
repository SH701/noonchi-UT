export default function HistorySectiontSkeleton() {
  
    return (
      <div className="mt-6 flex flex-col items-center justify-between gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-20 w-full animate-pulse rounded bg-gray-200"
          />
        ))}
      </div>
    );
}