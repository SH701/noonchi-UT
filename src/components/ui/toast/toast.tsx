"use client";

import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Ban, Check, Info } from "lucide-react";


type ToastType = "success" | "error" | "warning";

const ICON_MAP: Record<ToastType, ReactNode> = {
  success: <Check className="size-8" />,
  error: <Ban className="size-8" />,
  warning: <Info className="size-8" />,
};
const STYLE_MAP: Record<ToastType, string> = {
  success: "bg-emerald-500",
  error: "bg-red-500",
  warning: "bg-white",
};
const renderToast = (message: string, type: ToastType, duration = 2000) => {
  sonnerToast.custom(
    (id) => (
      <div
        onClick={() => sonnerToast.dismiss(id)}
        className={cn(
          `${type === "warning" ? "text-black" : "text-white"} flex items-center gap-2 rounded-xl bg-black/60 px-4 py-3 font-sans text-sm leading-5`,
          STYLE_MAP[type],
        )}
      >
        {ICON_MAP[type]}
        <span className="truncate">{message}</span>
      </div>
    ),
    { duration },
  );
};

export const toast = {
  success: (message: string, duration?: number) =>
    renderToast(message, "success", duration),
  warning: (message: string, duration?: number) =>
    renderToast(message, "warning", duration),
  error: (message: string, duration?: number) =>
    renderToast(message, "error", duration),

  favorite: (duration = 1000) => {
    const el = document.createElement("div");
    el.style.cssText =
      "position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:9999;pointer-events:none;";
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="#ffffff" style="animation:favoriteAnim ${duration}ms ease-out forwards;"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    if (!document.getElementById("favorite-keyframes")) {
      const style = document.createElement("style");
      style.id = "favorite-keyframes";
      style.textContent = `@keyframes favoriteAnim{0%{opacity:0;transform:scale(0.5)}30%{opacity:1;transform:scale(1.2)}70%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1)}}`;
      document.head.appendChild(style);
    }
    document.body.appendChild(el);
    setTimeout(() => el.remove(), duration);
  },
};

export const Toaster = () => {
  return (
    <SonnerToaster
      position="bottom-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "w-full flex justify-center",
        },
      }}
      offset={40}
      gap={8}
      visibleToasts={5}
    />
  );
};
