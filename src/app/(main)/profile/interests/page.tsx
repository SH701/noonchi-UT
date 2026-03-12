import { MyInterests } from "@/features/profile";
import { auth } from "@/lib/next-auth/auth";

export default async function Interests() {
  const session = await auth();
  return (
    <div className="flex flex-1 flex-col">
      <MyInterests interests={session?.user.interests ?? []} />
    </div>
  );
}
