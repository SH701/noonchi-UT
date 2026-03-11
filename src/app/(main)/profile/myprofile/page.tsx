import MyInfo from "@/features/profile/myinfo/MyInfo";
import { auth } from "@/lib/next-auth/auth";

export default async function MyProfile() {
  const session = await auth();

  return (
    <div>
      <MyInfo
        name={session?.user.name ?? "User"}
        birth={session?.user.birthDate ?? ""}
        email={session?.user.email ?? ""}
        KoreanLevel={session?.user.koreanLevel ?? "null"}
      />
    </div>
  );
}
