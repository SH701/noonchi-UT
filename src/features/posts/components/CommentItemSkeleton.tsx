export default function CommentItemSkeleton() {
  return (
    <div className="flex animate-pulse gap-3 border-b border-white p-4">
      <div className="size-10 shrink-0 rounded-full bg-gray-200" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-20 rounded-full bg-gray-200" />
          <div className="h-3 w-12 rounded-full bg-gray-100" />
        </div>
        <div className="h-3 w-full rounded-full bg-gray-100" />
        <div className="h-3 w-4/5 rounded-full bg-gray-100" />
        <div className="h-3 w-8 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}
