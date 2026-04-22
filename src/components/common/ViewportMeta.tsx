"use client";

import { useEffect } from "react";

export default function ViewportMeta() {
  useEffect(() => {
    const meta = document.querySelector("meta[name='viewport']");
    if (!meta) return;

    if (window.innerWidth >= 600) {
      meta.setAttribute("content", "width=375, initial-scale=1.6");
    } else {
      meta.setAttribute("content", "width=375, initial-scale=1");
    }
  }, []);

  return null;
}
