"use client";

import { useEffect } from "react";
import { driver, type Config } from "driver.js";
import "driver.js/dist/driver.css";
import { ONE_DAY_MS } from "@/constants";

export function useCoachmark(key: string, config: Config) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(key)) return;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isStandalone = (window.navigator as any).standalone === true;
    const bannerDismissedAt = localStorage.getItem(
      "install_modal_dismissed_at",
    );
    const bannerWillShow =
      isIOS &&
      !isStandalone &&
      (!bannerDismissedAt ||
        Date.now() - Number(bannerDismissedAt) >= ONE_DAY_MS);

    if (bannerWillShow) return; // 배너 닫고 다음 진입에 코치마크 뜸
    const d = driver({
      ...config,
      onDestroyed: (element, step, options) => {
        localStorage.setItem(key, "1");
        config.onDestroyed?.(element, step, options);
      },
    });

    d.drive();

    return () => {
      d.destroy();
    };
  }, [key]);
}
