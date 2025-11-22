"use client";

import TabBar from "@/components/etc/tab-bar";
import { usePathname } from "next/navigation";

export const dynamic = "force-dynamic";

export default function MainsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hide = ["/main/custom", "/main/role", "/main/honorific"];
  const hideTabbar = hide.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  return (
    <div className="w-full min-h-screen  flex flex-col">
      <div className="w-full max-w-[375px] mx-auto min-h-screen">
        {children}
      </div>
      {!hideTabbar && (
        <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
          <div className="w-full max-w-[375px]">
            <TabBar />
          </div>
        </div>
      )}
    </div>
  );
}
