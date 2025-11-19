"use client";

import Logo from "@/components/etc/logo";
import Image from "next/image";
import Slider from "@/components/main/slider";
import { useAuth } from "@/lib/UserContext";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

type Profile = {
  id: number;
  email: string;
  nickname: string;
  gender: string;
  birthDate: string;
  role: string;
  provider: string;
  koreanLevel: string;
  profileImageUrl: string;
  interests: string[];
};

export default function Main() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      setError("로그인이 필요합니다");
      return;
    }
    fetch("/api/users/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || `Error ${res.status}`);
        setProfile(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [accessToken]);

  return (
    <div
      className="min-h-screen bg-blue-50 flex flex-col w-full overflow-x-hidden overflow-y-auto"
      style={{ paddingBottom: "calc(153px + env(safe-area-inset-bottom))" }}
    >
      {/* 메인 콘텐츠 */}
      <div className="flex flex-col w-full">
        {/* 환영 섹션 - 전체 너비 */}
        <div className="w-full px-7 py-6 text-white">
          <Image
            src="/etc/mainLogo.png"
            width={112}
            height={24}
            alt="메인 로고"
          />
          <div className="flex justify-between items-start pt-2">
            <div className="flex flex-col gap-2 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
