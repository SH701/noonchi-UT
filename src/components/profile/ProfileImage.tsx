"use client";

import { Face0, Face1, Face2, Face3 } from "@/components/character";
import Image from "next/image";

const FACES = {
  face0: Face0,
  face1: Face1,
  face2: Face2,
  face3: Face3,
};

export default function ProfileImage({ src }: { src?: string }) {
  const isUrl = src?.startsWith("http") || src?.startsWith("/");

  if (isUrl) {
    return (
      <Image
        src={src!}
        alt="프로필"
        width={120}
        height={120}
        className="rounded-full object-cover"
      />
    );
  }

  const Face = src ? FACES[src as keyof typeof FACES] : null;

  if (Face) return <Face className="w-[120px] h-[120px]" />;

  return <div className="w-[120px] h-[120px] bg-gray-200 rounded-full" />;
}
