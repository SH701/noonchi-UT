"use client";

import { useState } from "react";
import Modal from "./Modal";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  useAiConsent,
  useUpdateAiConsent,
} from "@/features/profile/hooks/useAiConsent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner/spinner";
import { Button } from "@/components/ui/button/button";

interface Props {
  forceOpen?: boolean;
  disableClose?: boolean;
}

export default function AiConsentModal({ forceOpen, disableClose }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const { status } = useSession();
  const { data: consent, isLoading } = useAiConsent();
  const { mutate: agree, isPending } = useUpdateAiConsent();
  const [dismissed, setDismissed] = useState(false);

  if (status !== "authenticated") return null;
  if (isLoading) return null;
  if (consent?.consented) return null;
  if (dismissed && !forceOpen) return null;

  const description = t("aiConsent.description");
  const [beforeLink, afterLink] = description.split(/\[.*?\]/);

  const handleDecline = () => {
    setDismissed(true);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Modal
      isOpen={true}
      onClose={disableClose ? () => {} : handleDecline}
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
          onClick={() => agree()}
          disabled={isPending}
          className="gap-2"
        >
          {isPending ? (
            <Spinner size="20px" color="#ffffff" />
          ) : (
            <span>{t("aiConsent.agree")}</span>
          )}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={disableClose ? handleGoBack : handleDecline}
          disabled={isPending}
          className="border-gray-300 text-gray-700"
        >
          {t(disableClose ? "aiConsent.goBack" : "aiConsent.decline")}
        </Button>
      </div>
    </Modal>
  );
}
