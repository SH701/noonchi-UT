import LoginRequired from "@/features/profile/components/LoginRequired";
import MyInterests from "@/features/profile/components/myinterests/MyInterests";
import { auth } from "@/lib/next-auth/auth";

export default async function MyInterestsPage() {
  const session = await auth();
  if (!session?.user.id) {
    return <LoginRequired />;
  }
  return (
    <main className="flex flex-1 flex-col">
      <MyInterests interests={session.user.interests ?? []} />
    </main>
  );
}
