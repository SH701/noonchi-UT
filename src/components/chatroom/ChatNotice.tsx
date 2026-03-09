import { NoticeIcon } from "@/assets/svgr";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ChatNoticeProps {
  description: string |undefined;
  showNotice: boolean;
  toggleNotice: () => void;
}

export default function ChatNotice({
  description,
  showNotice,
  toggleNotice,
}: ChatNoticeProps) {
  return (
    <div className="-mx-5 mb-4 flex gap-4 border-y border-white bg-white/50 px-5 py-3 backdrop-blur-md">
      {showNotice ? (
        <div className="flex w-full items-center justify-between gap-4">
          <NoticeIcon className="shrink-0 text-gray-500" />
          <span className="text-sm font-medium text-gray-600">
            {description}
          </span>
          <ChevronUp className="shrink-0" onClick={toggleNotice} />
        </div>
      ) : (
        <div className="flex w-full min-w-0 items-center justify-between gap-4">
          <NoticeIcon className="shrink-0 text-gray-500" />
          <span className="flex-1 truncate text-sm font-medium text-gray-600">
            {description}
          </span>
          <ChevronDown onClick={toggleNotice} />
        </div>
      )}
    </div>
  );
}
