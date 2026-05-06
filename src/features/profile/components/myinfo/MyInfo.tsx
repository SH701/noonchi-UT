"use client";


import { Header } from "@/components/common";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface MyInfoProps {
  name: string;
  birth: string;
  email: string;
  KoreanLevel: string;
}

export default function MyInfo({
  name,
  birth,
  email,
  KoreanLevel,
}: MyInfoProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Header
        leftIcon={<ChevronLeft onClick={() => router.back()} />}
        center={t("myInfo.header")}
      />
      <dl className="flex flex-col gap-4 rounded-2xl bg-white p-4 text-sm">
        <div className="flex justify-between">
          <dt>{t("myInfo.name")}</dt>
          <dd>{name}</dd>
        </div>

        <div className="flex justify-between">
          <dt>{t("myInfo.birth")}</dt>
          <dd>{birth}</dd>
        </div>
        <div className="flex justify-between">
          <dt>{t("myInfo.email")}</dt>
          <dd>{email}</dd>
        </div>
        <div className="flex justify-between">
          <dt>{t("myInfo.koreanLevel")}</dt>
          <dd>{KoreanLevel}</dd>
        </div>
      </dl>
    </>
  );
}
