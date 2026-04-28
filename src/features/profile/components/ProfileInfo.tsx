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
    <article className="flex items-center justify-between rounded-2xl border border-gray-500 p-4">
      <div className="flex gap-4">
        {img ? (
          <figure className="relative size-12 overflow-hidden rounded-full">
            <Image
              src={img}
              alt="profile-image"
              fill
              className="object-cover"
              sizes="48px"
            />
          </figure>
        ) : (
          <DefaultIcon />
        )}
        <div className="flex flex-col">
          <p className="text-xl font-semibold leading-7">
            {name || "사용자"}
          </p>
          {/* 구독 정보 */}
          <p className="text-center text-sm font-medium text-gray-400">
            Free Plan
          </p>
        </div>
      </div>
      <button onClick={handleProfile} aria-label="Edit profile">
        <ChevronRight />
      </button>
    </article>
  );
}
