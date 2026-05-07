"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/locales/i18n";
import { useSession } from "next-auth/react";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    const sessionLang = session?.user?.language?.toLowerCase();
    const lang = localStorage.getItem("language") ?? sessionLang ?? "en";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    if (!mounted) setMounted(true);
  }, [status, session?.user]);

  if (!mounted) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
