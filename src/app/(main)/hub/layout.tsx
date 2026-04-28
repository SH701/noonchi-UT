"use client";

import { RoleplayHeader } from "@/features/roleplay";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChat = pathname.startsWith("/hub/roleplay/chatroom");
  return (
    <>
      {!isChat && <RoleplayHeader />}
      <div className="flex flex-1 flex-col">{children}</div>
    </>
  );
}
