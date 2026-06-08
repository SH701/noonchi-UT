'use client'

import { useCoachmark } from "@/hooks/custom"
import { useTranslation } from "react-i18next"

export function useChatCoachMark(ready: boolean = true){
    const { t } = useTranslation();
    useCoachmark('coachmark_chat_v1',{
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
          title: t("coachmark.chat.reallyMean.title"),
          description: t("coachmark.chat.reallyMean.description"),
          side: "bottom",
          align: "end",
        },
      },
      {
        element: "#chat-tts",
        popover: {
          title: t("coachmark.chat.tts.title"),
          description: t("coachmark.chat.tts.description"),
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#chat-needhelp",
        popover: {
          title: t("coachmark.chat.needHelp.title"),
          description: t("coachmark.chat.needHelp.description"),
          side: "top",
          align: "end",
        },
      },
      {
        element: "#chat-pen",
        popover: {
          title: t("coachmark.chat.pen.title"),
          description: t("coachmark.chat.pen.description"),
          side: "bottom",
          align: "end",
        },
      },
    ],
    }, ready)
}
