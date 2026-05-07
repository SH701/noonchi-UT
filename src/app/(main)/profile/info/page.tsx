import MyInfo from "@/features/profile/components/myinfo/MyInfo";
import { auth } from "@/lib/next-auth/auth";

export default async function MyProfileInfoPage() {
  const session = await auth();

  return (
    <MyInfo
      name={session?.user.name ?? "User"}
      birth={session?.user.birthDate ?? ""}
      email={session?.user.email ?? ""}
      KoreanLevel={session?.user.koreanLevel ?? "null"}
    />
  );
}
