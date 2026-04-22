export default function RoleplayHistorySkeleton() {
  const skeletonCards = Array.from({ length: 4 });
  return (
    <div className="w-full">
      <div className="flex animate-pulse gap-3 overflow-x-auto">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="aspect-square shrink-0 rounded-2xl bg-gray-200"
            style={{ width: "clamp(112px, 28vw, 140px)" }}
          ></div>
        ))}
      </div>
    </div>
  );
}
