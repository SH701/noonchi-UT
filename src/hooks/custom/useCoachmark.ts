"use client";

import { useEffect } from "react";
import { driver, type Config } from "driver.js";
import { ONE_DAY_MS } from "@/constants";

export function useCoachmark(key: string, config: Config, ready: boolean = true) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!ready) return;
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

    let d: ReturnType<typeof driver> | null = null;
    let rafId = 0;
    let pollId: ReturnType<typeof setTimeout> | null = null;
    let attempts = 0;

    const firstSelector =
      typeof config.steps?.[0]?.element === "string"
        ? (config.steps[0].element as string)
        : null;

    const launch = () => {
      d = driver({
        ...config,
        onDestroyed: (element, step, options) => {
          localStorage.setItem(key, "1");
          config.onDestroyed?.(element, step, options);
        },
      });
      d.drive();
    };

    const start = () => {
      const tryLaunch = () => {
        if (firstSelector && !document.querySelector(firstSelector)) {
          if (attempts++ < 50) {
            pollId = setTimeout(tryLaunch, 100);
            return;
          }
        }
        rafId = requestAnimationFrame(() => {
          rafId = requestAnimationFrame(launch);
        });
      };
      tryLaunch();
    };

    if (bannerWillShow) {
      const handler = () => start();
      window.addEventListener("install-banner-dismissed", handler, {
        once: true,
      });
      return () => {
        window.removeEventListener("install-banner-dismissed", handler);
        if (pollId) clearTimeout(pollId);
        if (rafId) cancelAnimationFrame(rafId);
        d?.destroy();
      };
    }

    start();
    return () => {
      if (pollId) clearTimeout(pollId);
      if (rafId) cancelAnimationFrame(rafId);
      d?.destroy();
    };
  }, [key, ready]);
}
