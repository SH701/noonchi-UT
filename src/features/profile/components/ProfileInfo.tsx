"use client";
import { DefaultIcon } from "@/assets/svgr";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileInfoProps {
  img?: string;
  name: string;
}

export default function ProfileInfo({ img, name }: ProfileInfoProps) {
  const router = useRouter();
  const handleProfile = () => {
    router.push("/profile/info");
  };
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-500 p-4">
      <div className="flex gap-4">
        {img ? (
          <div className="relative size-12 overflow-hidden rounded-full">
            <Image
              src={img}
              alt="profile-image"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
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
        <ChevronRight onClick={handleProfile} />
      </button>
    </div>
  );
}
