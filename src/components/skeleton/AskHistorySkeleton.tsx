export default function AskHistorySkeleton() {
  const skeletonItems = Array.from({ length: 6 });
  return (
    <div className="flex animate-pulse flex-col gap-2">
      {skeletonItems.map((_, index) => (
        <div key={index} className="rounded-lg bg-white/10 p-3">
          <div className="flex flex-col gap-1.5">
            <div className="h-3.5 w-16 rounded bg-gray-300" />
            <div className="h-3 w-10 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
