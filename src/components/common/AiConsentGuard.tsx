"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import AiConsentModal from "@/components/modal/AiConsentModal";
import GuestAiConsentModal from "@/components/modal/GuestAiConsentModal";
import { useAiConsent } from "@/features/profile/hooks/useAiConsent";
import { useGuestAiConsent } from "@/hooks/custom";

interface Props {
  children: ReactNode;
}

export default function AiConsentGuard({ children }: Props) {
  const { status } = useSession();

  if (status === "loading") return null;

  if (status === "authenticated") {
    return <AuthedConsentGate>{children}</AuthedConsentGate>;
  }

  return <GuestConsentGate>{children}</GuestConsentGate>;
}

function AuthedConsentGate({ children }: Props) {
  const { data: consent, isLoading } = useAiConsent();

  if (isLoading) return null;

  if (!consent?.consented) {
    return <AiConsentModal forceOpen disableClose />;
  }

  return <>{children}</>;
}

function GuestConsentGate({ children }: Props) {
  const { consented, agree } = useGuestAiConsent();

  if (consented === null) return null;

  if (!consented) {
    return <GuestAiConsentModal onAgree={agree} />;
  }

  return <>{children}</>;
}
