"use client";

import { useRouter } from "next/navigation";

import { ProfileImage, ProfileMenuList, StatsCard } from "@/components/profile";
import { apiMutations } from "@/api/mutations";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/toast/toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session?.user.role === "ROLE_GUEST") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Sign Up Required</h2>
        <p className="text-gray-600 mb-6 text-center">
          Please complete sign up to use your profile
        </p>
        <button
          onClick={() => router.push("/signup")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Sign Up
        </button>
      </div>
    );
  }

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
    <div className="min-h-screen flex flex-col">
      <h1 className="text-gray-900 text-xl font-semibold font-pretendard">
        Profile
      </h1>

      <div className="flex-1 flex flex-col items-center w-93.75 ">
        <div className="flex flex-col items-center pt-6">
          <ProfileImage src={session?.user.profileImageUrl} />

          <button
            onClick={() => router.push("/profile/edit")}
            className="text-xl font-semibold mt-4"
          >
            {session?.user.nickname}
          </button>
        </div>

        <div className=" pt-6 ">
          <StatsCard
            sentenceCount={session?.user.sentenceCount}
            koreanLevel={session?.user.koreanLevel || "1"}
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
