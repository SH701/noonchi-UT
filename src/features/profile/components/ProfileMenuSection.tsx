"use client";

import { useState } from "react";
import { AlpabatIcon, ControlIcon, SettingIcon } from "@/assets/svgr";
import ProfileMenuList from "./ProfileMenuList";
import { CominSoonModal } from "@/components/modal";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function ProfileMenuSection() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  return (
    <>
      <section aria-label="Personal settings">
        <ProfileMenuList
          title={t("profile.personalSection")}
          items={[
            {
              label: t("profile.menu.interests"),
              onClick: () => router.push("/profile/interests"),
              icon: <ControlIcon />,
            },
            {
              label: t("profile.menu.language"),
              onClick: () => router.push("/profile/language"),
              icon: <AlpabatIcon />,
            },
            {
              label: t("profile.menu.subscription"),
              onClick: () => setShowModal(true),
              icon: <SettingIcon />,
            },
          ]}
        />
      </section>
      <section aria-label="Legal">
        <ProfileMenuList
          title={t("profile.legalSection")}
          items={[
            {
              label: t("profile.menu.terms"),
              onClick: () => router.push("/profile/terms"),
            },
            {
              label: t("profile.menu.privacy"),
              onClick: () => router.push("/profile/privacy"),
            },
            {
              label: t("profile.menu.help"),
              onClick: () => setShowModal(true),
            },
            { label: "About us", onClick: () => router.push("/profile/about") },
          ]}
        />
      </section>
      <CominSoonModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
