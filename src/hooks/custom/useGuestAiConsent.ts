"use client";

import { useCallback, useEffect, useState } from "react";
import { AI_CONSENT_POLICY_VERSION } from "@/features/profile/hooks/useAiConsent";

const STORAGE_KEY = "guest-ai-consent";


export function useGuestAiConsent() {

  const [consented, setConsented] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setConsented(stored === AI_CONSENT_POLICY_VERSION);
    } catch {
      setConsented(false);
    }
  }, []);

  const agree = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, AI_CONSENT_POLICY_VERSION);
    } catch {
      // localStorage 사용 불가 시에도 현재 세션에선 진행되도록 상태만 갱신
    }
    setConsented(true);
  }, []);

  return { consented, agree };
}
