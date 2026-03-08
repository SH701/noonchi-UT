import {
  ProfileInfo,
  ProfileMenuSection,
  ProfileHeader,
  Logout,
} from "@/features/profile";
import { auth } from "@/lib/next-auth/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="max-w-93.75 flex flex-col">
      <ProfileHeader />
      <div className="space-y-5">
        <ProfileInfo
          img={session?.user.profileImageUrl}
          name={session?.user.name ?? "User"}
        />
        <ProfileMenuSection />
        <Logout />
      </div>
    </div>
  );
}
