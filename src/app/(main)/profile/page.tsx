import ProfileInfo from "@/features/profile/components/ProfileInfo";
import ProfileMenuSection from "@/features/profile/components/ProfileMenuSection";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileActions from "@/features/profile/components/ProfileActions";
import { auth } from "@/lib/next-auth/auth";

export default async function ProfilePage() {
  const session = await auth();
  const isLoggedIn = !!session?.accessToken;
  return (
    <main className="flex flex-1 flex-col">
      <ProfileHeader />
      <section className="flex flex-1 flex-col space-y-5">
        <ProfileInfo
          img={session?.user.profileImageUrl}
          name={session?.user.name ?? "User"}
        />
        <ProfileMenuSection />
        <ProfileActions isLoggedIn={isLoggedIn} />
      </section>
    </main>
  );
}
