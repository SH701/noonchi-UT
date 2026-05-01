export default function PostCardSkeleton() {
  return (
    <li className="flex animate-pulse flex-col gap-4 rounded-2xl bg-white/60 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="size-12 shrink-0 rounded-full bg-gray-200" />
        <div className="h-4 w-24 rounded-full bg-gray-200" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded-full bg-gray-200" />
        <div className="h-3 w-full rounded-full bg-gray-100" />
        <div className="h-3 w-5/6 rounded-full bg-gray-100" />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-3 w-8 rounded-full bg-gray-100" />
        <div className="h-3 w-8 rounded-full bg-gray-100" />
        <div className="ml-auto h-3 w-12 rounded-full bg-gray-100" />
      </div>
    </li>
  );
}
