"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button/button";
import { WEBZINE_ADS } from "@/constants";

export default function PostWebzine() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % WEBZINE_ADS.length);
        setVisible(true);
      }, 300);
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const ad = WEBZINE_ADS[current];

  const handleCta = () => {
    if (ad.url) window.open(ad.url, "_blank");
  };

  return (
    <div
      className="my-4 overflow-hidden rounded-2xl bg-blue-50 p-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex flex-col gap-2 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span className="text-sm font-semibold text-indigo-400">
          {t(`${ad.i18nKey}.tag`)}
        </span>
        <span className="font-bold">{t(`${ad.i18nKey}.title`)}</span>
        <Button
          size="sm"
          onClick={handleCta}
          className="bg-gradient-secondary w-30 rounded-full px-4 py-2 text-white"
        >
          {t(`${ad.i18nKey}.cta`)}
        </Button>
      </div>
    </div>
  );
}
