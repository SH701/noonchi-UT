export default function ChatLoading() {
  return (
    <div className="mb-4 flex flex-col justify-start gap-2">
      <div className="mb-1 flex flex-row items-center gap-2">
        <div className="size-8 shrink-0 animate-pulse rounded-full bg-gray-300" />
        <div className="h-5 w-16 animate-pulse rounded-full bg-gray-300" />
      </div>

      <div className="max-w-[75%]">
        <div className="flex flex-col gap-3 rounded-b-xl rounded-tr-xl border border-gray-300 bg-white p-4">
          <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-200" />
          <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-200" />
          <div className="mt-2 flex items-center gap-2 border-t border-gray-200 pt-2">
            <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
            <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
