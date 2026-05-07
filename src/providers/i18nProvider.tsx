"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/locales/i18n";
import { getSession } from "next-auth/react";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const init = async () => {
      const session = await getSession();

      const lang =
        localStorage.getItem("language") ??
        session?.user.language?.toLowerCase() ??
        "en";
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      setMounted(true);
    };
    init();
  }, []);

  if (!mounted) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
