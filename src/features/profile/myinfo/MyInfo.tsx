"use client";


import { Header } from "@/components/common";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface MyInfoProps {
  name: string;
  birth: string;
  email: string;
}

export default function MyInfo({ name, birth, email }: MyInfoProps) {
  const router = useRouter();
  return (
    <div>
      <Header
        leftIcon={<ChevronLeft onClick={() => router.back()} />}
        center="My Profile"
      />
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 text-sm">
        <div className="flex justify-between">
          <span>Name</span>
          <span>{name}</span>
        </div>

        <div className="flex justify-between">
          <span>Birth</span>
          <span>{birth}</span>
        </div>
        <div className="flex justify-between">
          <span>Email</span>
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
}
