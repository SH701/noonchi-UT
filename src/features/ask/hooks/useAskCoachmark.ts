'use client'

import { useCoachmark } from "@/hooks/custom"

export function useAskCoachMark(ready: boolean = true){
    useCoachmark('coachmark_ask_v1',{
         showProgress: false,
    showButtons: ["next", "previous", "close"],
    nextBtnText: "Next",
    prevBtnText: "Back",
    doneBtnText: "Done",
    progressText: "",
    onPopoverRender: (popover) => {
      const closeBtn = popover.closeButton;
      if (closeBtn) closeBtn.textContent = "Skip";
    },
     steps: [
      {
        element: "#chat-really-mean",
        popover: {
          title: "Read between the lines",
          description: " Not sure what they really meant? Tap Really mean to decode the hidden message.",
          side: "bottom",
          align: "end",
        },
      },
      {
        element: "#chat-tts",
        popover: {
          title: "Hear it, read it",
          description: "Tap the speaker to listen like a native, or A to flip between Korean and your language.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#ask-start-roleplay",
        popover: {
          title: "Practice it for real",
          description: "Want to try this conversation live? Tap Start Roleplay to jump straight into a roleplay with the same setup.",
          side: "top",
          align: "start",
        },
      },
    ],
    }, ready)
}
