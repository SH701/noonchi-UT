"use client";

import Modal from "./Modal";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";

interface Props {
  onAgree: () => void;
}


export default function GuestAiConsentModal({ onAgree }: Props) {
  const { t } = useTranslation();
  const router = useRouter();

  const description = t("aiConsent.description");
  const [beforeLink, afterLink] = description.split(/\[.*?\]/);

  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      title={t("aiConsent.title")}
      className="max-w-125 flex w-[85%] flex-col gap-4 rounded-xl bg-white px-6 py-8"
    >
      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
        {beforeLink}
        <Link href="/profile/privacy" className="text-blue-600 underline">
          {t("aiConsent.privacyLink")}
        </Link>
        {afterLink}
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <Button
          variant="primary"
          size="lg"
          onClick={onAgree}
          className="gap-2"
        >
          {t("aiConsent.agree")}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => router.back()}
          className="border-gray-300 text-gray-700"
        >
          {t("aiConsent.goBack")}
        </Button>
      </div>
    </Modal>
  );
}
