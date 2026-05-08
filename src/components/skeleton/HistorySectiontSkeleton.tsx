export default function HistorySectiontSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex gap-3">
            <div className="size-12 shrink-0 animate-pulse rounded-full bg-gray-200" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex justify-between">
                <div className="h-3.5 w-2/5 animate-pulse rounded-full bg-gray-200" />
                <div className="h-3 w-12 animate-pulse rounded-full bg-gray-200" />
              </div>
              <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-200" />
              <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="size-6 animate-pulse rounded-xl bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}