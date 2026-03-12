import { EmptyAskIcon } from "@/assets/svgr";

export default function EmptyState() {
  return (
    <div className="mt-20 flex gap-2">
      <EmptyAskIcon className="text-gray-500" />
      <span className="font-medium text-gray-500">No conversations yet</span>
    </div>
  );
}
