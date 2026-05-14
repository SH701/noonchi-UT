export default function TopicListSkeleton() {
  const skeletonCards = Array.from({ length: 5 });

  return (
    <ul className="grid w-full animate-pulse grid-cols-2 items-center justify-center gap-4 md:flex md:flex-col">
      {skeletonCards.map((_, index) => (
        <li
          key={index}
          className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200 md:flex md:aspect-auto md:items-center md:gap-4 md:overflow-visible md:bg-transparent md:p-2"
        >
          <div className="hidden size-20 shrink-0 rounded-xl bg-gray-200 md:block" />

          <div className="hidden flex-1 flex-col gap-1.5 md:flex">
            <div className="h-3 w-16 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 rounded-b-xl px-4 py-2 md:hidden">
            <div className="h-3 w-16 rounded bg-gray-300/70" />
            <div className="h-4 w-24 rounded bg-gray-300/70" />
          </div>

          <div className="absolute right-3 top-3 z-10 size-6 rounded-full bg-gray-300 md:relative md:right-auto md:top-auto md:shrink-0 md:bg-gray-200" />
        </li>
      ))}
    </ul>
  );
}
