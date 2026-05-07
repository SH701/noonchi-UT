"use client";

import i18n from "@/locales/i18n";
import { Header } from "@/components/common";
import { Button } from "@/components/ui/button/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/toast/toast";
import { useTranslation } from "react-i18next";
import { useUpdateProfile } from "../../hooks/useProfile";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner/spinner";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "ja", label: "日本語" },
  { code: "es", label: "Español" },
];

export default function MyLanguage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selected, setSelected] = useState(i18n.language);
  const { mutateAsync: updateLanguage, isPending: loadingLanguage } =
    useUpdateProfile();
  const { update } = useSession();

  const handleSave = async () => {
    await updateLanguage({
      language: selected.toUpperCase() as "EN" | "JA" | "RU" | "ES",
    });
    localStorage.setItem("language", selected);
    await i18n.changeLanguage(selected);
    await update();
    toast.success(i18n.t("myLanguage.savedToast"));
    router.back();
  };

  return (
    <>
      <Header
        leftIcon={<ChevronLeft onClick={() => router.back()} />}
        center={t("myLanguage.header")}
      />
      <section className="flex flex-1 flex-col pb-10 pt-4">
        <ul className="flex flex-wrap gap-3">
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => setSelected(lang.code)}
                className="flex cursor-pointer items-center rounded-full border p-3 text-sm font-medium"
                style={{
                  borderColor: selected === lang.code ? "#6366F1" : "#E5E7EB",
                  background: selected === lang.code ? "#EEF2FF" : "#FFFFFF",
                }}
                aria-pressed={selected === lang.code}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>

        <Button
          size="lg"
          className="mt-auto"
          onClick={handleSave}
          disabled={loadingLanguage}
        >
          {loadingLanguage ? <Spinner /> : t("myLanguage.saveButton")}
        </Button>
      </section>
    </>
  );
}
