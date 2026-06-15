"use client";

import { ReactNode } from "react";
import AiConsentModal from "@/components/modal/AiConsentModal";
import { useAiConsent } from "@/features/profile/hooks/useAiConsent";

interface Props {
  children: ReactNode;
}

export default function AiConsentGuard({ children }: Props) {
  const { data: consent, isLoading } = useAiConsent();

  if (isLoading) return null;

  if (!consent?.consented) {
    return <AiConsentModal forceOpen disableClose />;
  }

  return <>{children}</>;
}
