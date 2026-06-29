"use client";


import { INTEREST_KEYS } from "@/constants";
import { usePreferenceStore } from "@/store/usePreferenceStore";
import { useTranslation } from "react-i18next";

export default function Taste() {
  const interests = usePreferenceStore((s) => s.interests);
  const setInterests = usePreferenceStore((s) => s.setInterests);
  const { t } = useTranslation();

  return (
    <div className="min-h-117.5 flex flex-col pt-4">
      <h1 className="pb-11 text-2xl font-semibold">{t("taste.title")}</h1>
      <div className="flex flex-wrap gap-3">
        {INTEREST_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => {
              const next = interests.includes(key)
                ? interests.filter((x) => x !== key)
                : [...interests, key];
              setInterests(next);
            }}
            className="flex cursor-pointer items-center rounded-full border p-3 text-sm font-medium"
            style={{
              borderColor: interests.includes(key) ? "#6366F1" : "#E5E7EB",
              background: interests.includes(key) ? "#EEF2FF" : "#FFFFFF",
            }}
          >
            {t(`interests.${key}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
