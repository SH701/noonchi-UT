import { ChevronRightIcon, DefaultIcon } from "@/assets/svgr";
import Image from "next/image";

interface ProfileInfoProps {
  img?: string;
  name: string;
}

export default function ProfileInfo({ img, name }: ProfileInfoProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-500 p-4">
      <div className="flex gap-4">
        {img ? (
          <Image src={img} alt="profile-image" width={105} height={68} />
        ) : (
          <DefaultIcon />
        )}
        <div className="flex flex-col">
          <span className="text-xl font-semibold leading-7">
            {name || "사용자"}
          </span>
          {/* 구독 정보 */}
          <span className="text-center text-sm font-medium text-gray-400">
            Free Plan
          </span>
        </div>
      </div>
      <button>
        <ChevronRightIcon />
      </button>
    </div>
  );
}
