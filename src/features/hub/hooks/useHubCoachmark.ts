'use client'

import { useCoachmark } from "@/hooks/custom";
import { useAiConsent } from "@/features/profile/hooks/useAiConsent";
import { useTranslation } from "react-i18next";

export function useHubCoachMark() {
  const { t } = useTranslation();
  const { data: consent } = useAiConsent();
  useCoachmark("coachmark_hub_v1", {
    showProgress: false,
    showButtons: ["next", "previous", "close"],
    nextBtnText: t("coachmark.buttons.next"),
    prevBtnText: t("coachmark.buttons.prev"),
    doneBtnText: t("coachmark.buttons.done"),
    progressText: "",
    onPopoverRender: (popover) => {
      const closeBtn = popover.closeButton;
      if (closeBtn) closeBtn.textContent = t("coachmark.buttons.skip");
    },
    steps: [
      {
        element: "#hub-mode-toggle",
        popover: {
          title: t("coachmark.hub.modeToggle.title"),
          description: t("coachmark.hub.modeToggle.description"),
        },
      },
      {
        element: "#hub-menu",
        popover: {
          title: t("coachmark.hub.menu.title"),
          description: t("coachmark.hub.menu.description"),
        },
      },
      {
        element: "#hub-community",
        popover: {
          title: t("coachmark.hub.community.title"),
          description: t("coachmark.hub.community.description"),
        },
      },
      {
        element: "#hub-scenario-list",
        popover: {
          title: t("coachmark.hub.scenarioList.title"),
          description: t("coachmark.hub.scenarioList.description"),
        },
      },
    ],
  }, consent?.consented === true);
}
