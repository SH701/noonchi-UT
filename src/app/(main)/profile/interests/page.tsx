import { MyInterests } from "@/features/profile";
import { auth } from "@/lib/next-auth/auth";

export default async function Interests() {
  const session = await auth();
  return <MyInterests interests={session?.user.interests ?? []} />;
}
