"use client";

import { RoleplayHeader } from "@/features/roleplay";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePreferenceStore } from "@/store/usePreferenceStore";
import { useUpdateProfile } from "@/features/profile/hooks/useProfile";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChat = pathname.startsWith("/hub/roleplay/chatroom");
  const { update, status } = useSession();
  const { koreanLevel, interests, language, resetPreferences } = usePreferenceStore();
  const { mutateAsync: updateProfile } = useUpdateProfile();

  useEffect(() => {
    if (status !== "authenticated") return;
    if (!koreanLevel && interests.length === 0 && !language) return;
    const sync = async () => {
      await updateProfile({
        koreanLevel: koreanLevel ?? undefined,
        interests,
        language: language?.toUpperCase() as "EN" | "JA" | "RU" | "ES" | undefined,
      });
      await update();
      resetPreferences();
    };
    sync();
  }, [status]);

  return (
    <>
      {!isChat && <RoleplayHeader />}
      <div className="flex flex-1 flex-col">{children}</div>
    </>
  );
}
