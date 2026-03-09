"use client";

import { RoleplayHead } from "@/features/roleplay";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChat = pathname.startsWith("/main/roleplay/chatroom");
  return (
    <>
      {!isChat && <RoleplayHead />}
      <div className="flex flex-1 flex-col">{children}</div>
    </>
  );
}
