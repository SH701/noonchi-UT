'use client'

import { useCoachmark } from "@/hooks/custom"

export function useChatCoachMark(ready: boolean = true){
    useCoachmark('coachmark_chat_v1',{
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
        element: "#chat-needhelp",
        popover: {
          title: "Set the scene",
          description: "Tap situation to add context, or need help when you're stuck — the more we know, the sharper the read.",
          side: "top",
          align: "end",
        },
      },
      {
        element: "#chat-pen",
        popover: {
          title: "Start fresh or check your score",
          description: "Tap the pen for a New Chat, or Get Reports to see how you're doing.",
          side: "bottom",
          align: "end",
        },
      },
    ],
    }, ready)
}