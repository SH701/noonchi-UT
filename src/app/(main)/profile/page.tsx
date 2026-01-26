"use client";

import { useRouter } from "next/navigation";

import {
  ProfileInfo,
  ProfileMenuList,
  StatsCard,
  ProfileHeader,
} from "@/components/profile";
import { apiMutations } from "@/api/mutations";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/toast/toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await apiMutations.auth.logout();
      router.push("/preview");
      toast.success("You are logged out");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex flex-col max-w-93.75 ">
      <ProfileHeader />
      <div className="space-y-6">
        <ProfileInfo
          img={session?.user.profileImageUrl}
          name={session?.user.name ?? "User"}
        />
        <div className=" pt-6 ">
          <StatsCard
            totalPractices={0}
            avgScore={0}
            bestScore={0}
            currentStreak={"1 day"}
            KoreanLevel={3}
          />
        </div>

        <div className=" pt-6">
          <ProfileMenuList />
        </div>

        <div className=" pt-6 pb-6 ">
          <button
            onClick={handleLogout}
            className=" py-4 text-gray-600 text-base underline"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
