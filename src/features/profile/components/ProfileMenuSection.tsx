"use client";

import { useState } from "react";
import { AlpabatIcon, ControlIcon, SettingIcon } from "@/assets/svgr";
import ProfileMenuList from "./ProfileMenuList";
import { CominSoonModal } from "@/components/modal";
import { useRouter } from "next/navigation";

export default function ProfileMenuSection() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  return (
    <>
      <section aria-label="Personal settings">
        <ProfileMenuList
          title="Personal settings"
          items={[
            {
              label: "Topics of Interest",
              onClick: () => router.push("/profile/interests"),
              icon: <ControlIcon />,
            },
            {
              label: "Language",
              onClick: () => setShowModal(true),
              icon: <AlpabatIcon />,
            },
            {
              label: "Manage Subscription",
              onClick: () => setShowModal(true),
              icon: <SettingIcon />,
            },
          ]}
        />
      </section>
      <section aria-label="Legal">
        <ProfileMenuList
          title="Legal"
          items={[
            {
              label: "Terms of Use",
              onClick: () => router.push("/profile/terms"),
            },
            {
              label: "Privacy policy",
              onClick: () => router.push("/profile/privacy"),
            },
            { label: "Help & Support", onClick: () => setShowModal(true) },
          ]}
        />
      </section>
      <CominSoonModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
