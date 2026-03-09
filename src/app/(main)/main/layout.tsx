"use client";

import { ChatroomHeader } from "@/features/roleplay";
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
      {!isChat && <ChatroomHeader />}
      <div className="flex flex-col flex-1">{children}</div>
    </>
  );
}
