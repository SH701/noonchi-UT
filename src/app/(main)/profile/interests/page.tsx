import MyInterests from "@/features/profile/components/myinterests/MyInterests";
import { auth } from "@/lib/next-auth/auth";

export default async function MyInterestsPage() {
  const session = await auth();
  return (
    <main className="flex flex-1 flex-col">
      <MyInterests interests={session?.user.interests ?? []} />
    </main>
  );
}
