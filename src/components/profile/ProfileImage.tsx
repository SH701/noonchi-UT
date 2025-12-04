"use client";

import {
  Character0,
  Character1,
  Character2,
  Character3,
} from "@/components/character";
import { User } from "lucide-react";
import Image from "next/image";

const FACES = {
  face0: Character0,
  face1: Character1,
  face2: Character2,
  face3: Character3,
};

export default function ProfileImage({ src }: { src?: string }) {
  const isUrl = src?.startsWith("http") || src?.startsWith("/");
  if (!src) {
    return <User className="w-[60px] h-[60px] bg-gray-300 rounded-full p-3" />;
  }
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
