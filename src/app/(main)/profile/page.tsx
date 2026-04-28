import {
  ProfileInfo,
  ProfileMenuSection,
  ProfileHeader,
  ProfileActions,
} from "@/features/profile";
import { auth } from "@/lib/next-auth/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <main className="flex flex-1 flex-col">
      <ProfileHeader />
      <section className="flex flex-1 flex-col space-y-5">
        <ProfileInfo
          img={session?.user.profileImageUrl}
          name={session?.user.name ?? "User"}
        />
        <ProfileMenuSection />
        <ProfileActions />
      </section>
    </main>
  );
}
