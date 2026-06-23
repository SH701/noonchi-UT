import MyInfo from "@/features/profile/components/myinfo/MyInfo";
import LoginRequired from "@/features/profile/components/LoginRequired";
import { auth } from "@/lib/next-auth/auth";

export default async function MyProfileInfoPage() {
  const session = await auth();

  if (!session?.user.id) {
    return <LoginRequired />;
  }

  return (
    <MyInfo
      name={session.user.name ?? "User"}
      birth={session.user.birthDate ?? ""}
      email={session.user.email ?? ""}
      KoreanLevel={session.user.koreanLevel ?? "null"}
    />
  );
}
