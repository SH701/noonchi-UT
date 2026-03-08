import { AlpabatIcon, ControlIcon, SettingIcon } from "@/assets/svgr";
import {
  ProfileInfo,
  ProfileMenuList,
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
        <div>
          <ProfileMenuList
            title="Personal settings"
            items={[
              {
                label: "Topics of Interest",
                href: "/profile/interest",
                icon: <ControlIcon />,
              },
              {
                label: "Language",
                href: "/profile/language",
                icon: <AlpabatIcon />,
              },
              {
                label: "Manage Subscription",
                href: "/profile/subscription",
                icon: <SettingIcon />,
              },
            ]}
          />
        </div>
        <div>
          <ProfileMenuList
            title="Legal"
            items={[
              { label: "Terms of Use", href: "/profile" },
              { label: "Privacy policy", href: "/profile" },
              { label: "Help & Support", href: "/profile" },
            ]}
          />
        </div>

        <Logout />
      </div>
    </div>
  );
}
