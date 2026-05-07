'use client'

import { LANGUAGES } from "@/constants/language";
import { usePreferenceStore } from "@/store";
import { useTranslation } from "react-i18next";

export default function Language() {
  const selected = usePreferenceStore((s) => s.language);
  const setLanguage = usePreferenceStore((s) => s.setLanguage);
  const { t } = useTranslation();

  
  return (
    <div className="flex h-117.5 flex-col pt-4">
      <h1 className="pb-11 text-2xl font-semibold">{t("language.title")}</h1>
      <ul className="flex flex-wrap gap-3">
        {LANGUAGES.map((lang) => (
          <li key={lang.code}>
            <button
              onClick={() => setLanguage(lang.code)}
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
    </div>
  );
}
