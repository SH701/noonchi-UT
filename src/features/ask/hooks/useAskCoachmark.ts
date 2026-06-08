'use client'

import { useCoachmark } from "@/hooks/custom"
import { useTranslation } from "react-i18next"

export function useAskCoachMark(ready: boolean = true){
    const { t } = useTranslation();
    useCoachmark('coachmark_ask_v1',{
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
        element: "#chat-really-mean",
        popover: {
          title: t("coachmark.ask.reallyMean.title"),
          description: t("coachmark.ask.reallyMean.description"),
          side: "bottom",
          align: "end",
        },
      },
      {
        element: "#chat-tts",
        popover: {
          title: t("coachmark.ask.tts.title"),
          description: t("coachmark.ask.tts.description"),
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#ask-start-roleplay",
        popover: {
          title: t("coachmark.ask.startRoleplay.title"),
          description: t("coachmark.ask.startRoleplay.description"),
          side: "top",
          align: "start",
        },
      },
    ],
    }, ready)
}
