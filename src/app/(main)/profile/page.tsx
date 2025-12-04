"use client";

import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { useAuthStore } from "@/store/useAuth";
import {
  ProfileHeader,
  ProfileImage,
  ProfileMenuList,
  StatsCard,
} from "@/components/profile";

export default function ProfilePage() {
  const router = useRouter();
  const { data: profile, isLoading } = useUserProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (profile?.role === "ROLE_GUEST") {
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

  const handleLogout = () => {
    const cookies = [
      "__clerk_db_jwt",
      "__client_uat",
      "__session",
      "accessToken",
      "refreshToken",
    ];
    cookies.forEach(
      (name) =>
        (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`)
    );
    useAuthStore.getState().logout();
    localStorage.removeItem("auth-store");
    localStorage.removeItem("device_id");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ProfileHeader />

      <div className="flex-1 flex flex-col items-center w-[375px] mx-auto">
        <div className="flex flex-col items-center pt-6">
          <ProfileImage src={profile?.profileImageUrl} />

          <button
            onClick={() => router.push("/profile/edit")}
            className="text-xl font-semibold mt-4"
          >
            {profile?.nickname}
          </button>
        </div>

        <div className="px-4 pt-6 w-full">
          <StatsCard
            sentenceCount={profile?.sentenceCount}
            koreanLevel={profile?.koreanLevel || "1"}
          />
        </div>

        <div className="px-4 pt-6 w-full">
          <ProfileMenuList />
        </div>

        <div className="px-4 pt-6 pb-6 w-full">
          <button
            onClick={handleLogout}
            className="w-full py-4 text-gray-600 text-base underline"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
