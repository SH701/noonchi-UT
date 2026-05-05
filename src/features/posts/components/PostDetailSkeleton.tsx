export default function PostDetailSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4 rounded-2xl bg-white/60 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="size-12 shrink-0 rounded-full bg-gray-200" />
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-24 rounded-full bg-gray-200" />
          <div className="h-3 w-16 rounded-full bg-gray-100" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-5 w-2/3 rounded-full bg-gray-200" />
        <div className="h-3 w-full rounded-full bg-gray-100" />
        <div className="h-3 w-full rounded-full bg-gray-100" />
        <div className="h-3 w-4/5 rounded-full bg-gray-100" />
        <div className="h-3 w-full rounded-full bg-gray-100" />
        <div className="h-3 w-3/4 rounded-full bg-gray-100" />
      </div>
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
        <div className="h-3 w-8 rounded-full bg-gray-100" />
        <div className="h-3 w-8 rounded-full bg-gray-100" />
        <div className="h-3 w-6 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}
