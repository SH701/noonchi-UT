export default function RoleplayHistorySkeleton() {
  const skeletonCards = Array.from({ length: 6});
  return (
    <div className="w-full">
      <div className="flex animate-pulse gap-3 overflow-x-auto">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="size-32 shrink-0 rounded-2xl bg-gray-200"
          ></div>
        ))}
      </div>
    </div>
  );
}
