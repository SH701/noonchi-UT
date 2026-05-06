import { LEVEL_KEYS } from "@/data";
import { usePreferenceStore } from "@/store/usePreferenceStore";
import { useTranslation } from "react-i18next";

export default function Level() {
  const koreanLevel = usePreferenceStore((s) => s.koreanLevel);
  const setKoreanLevel = usePreferenceStore((s) => s.setKoreanLevel);
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col pt-4">
      <div className="flex flex-1 flex-col">
        <h1 className="mb-2 text-2xl font-semibold">
          {t("level.title")}
        </h1>
        <p className="mb-4.5 text-gray-400">
          {t("level.description")}
        </p>

        <div className="space-y-2">
          {LEVEL_KEYS.map((lvl) => (
            <div
              key={lvl}
              onClick={() => setKoreanLevel(lvl)}
              className="h-25 flex w-full cursor-pointer items-center gap-4 rounded-2xl border bg-white px-4 py-5 transition-all"
              style={{
                borderColor: koreanLevel === lvl ? "#6366F1" : "#E5E7EB",
                background: koreanLevel === lvl ? "#EEF2FF" : "",
              }}
            >
              <div className="flex flex-col text-left">
                <span className="text-lg font-semibold">
                  {lvl.charAt(0) + lvl.slice(1).toLowerCase()}
                </span>
                <span className="text-sm leading-snug text-gray-500">
                  {t(`levelDescription.${lvl}`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
