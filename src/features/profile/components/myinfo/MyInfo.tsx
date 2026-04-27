"use client";


import { Header } from "@/components/common";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface MyInfoProps {
  name: string;
  birth: string;
  email: string;
  KoreanLevel: string;
}

export default function MyInfo({
  name,
  birth,
  email,
  KoreanLevel,
}: MyInfoProps) {
  const router = useRouter();
  return (
    <>
      <Header
        leftIcon={<ChevronLeft onClick={() => router.back()} />}
        center="My Profile"
      />
      <dl className="flex flex-col gap-4 rounded-2xl bg-white p-4 text-sm">
        <div className="flex justify-between">
          <dt>Name</dt>
          <dd>{name}</dd>
        </div>

        <div className="flex justify-between">
          <dt>Birth</dt>
          <dd>{birth}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Email</dt>
          <dd>{email}</dd>
        </div>
        <div className="flex justify-between">
          <dt>KoreanLevel</dt>
          <dd>{KoreanLevel}</dd>
        </div>
      </dl>
    </>
  );
}
