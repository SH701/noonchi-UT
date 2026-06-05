'use client'

import { useCoachmark } from "@/hooks/custom";

export function useHubCoachMark() {
  useCoachmark("coachmark_hub_v1", {
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
        element: "#hub-mode-toggle",
        popover: { title: "Two modes, one tap", description: "Switch to Role-play to practice live, or Ask to decode the nuance in your screenshots." },
      },
      {
        element: "#hub-menu",
        popover: { title: "It's all in here", description: "Your chat history and 1:1 sessions with real culture coaches live behind this menu." },
      },
      {
        element: "#hub-community",
        popover: { title: "Meet your people", description: "Jump into the global lounge — swap tips, ask anything, connect worldwide." },
      },
      {
        element: "#hub-scenario-list",
        popover: { title: "Press play on real life", description: "Tap any card to drop into a real Korean scenario, from business to daily life." },
      },
    ],
  });
}
