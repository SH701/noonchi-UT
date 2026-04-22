export default function RoleplayHistorySkeleton() {
  const skeletonCards = Array.from({ length: 4 });
  return (
    <div className="w-full">
      <div className="flex animate-pulse gap-3 overflow-x-auto">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="aspect-square w-[clamp(128px,30vw,162px)] shrink-0 rounded-2xl bg-gray-200"
          ></div>
        ))}
      </div>
    </div>
  );
}
