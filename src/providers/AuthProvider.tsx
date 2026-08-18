"use client";

import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isNoonchiApp } from "@/lib/isNoonchiApp";
import { useModalActions } from "@/store/useModalStore";

interface Props {
  children: React.ReactNode;
}

function NativeAuthBridge() {
  const router = useRouter();
  const { update } = useSession();
  const { closeModal } = useModalActions();

  useEffect(() => {
    if (!isNoonchiApp()) return;

    const handleAuth = async (payload: {
      provider: "google" | "apple";
      accessToken: string;
      refreshToken: string;
      isNewUser?: boolean;
    }) => {
      try {
        const result = await signIn("native", {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          redirect: false,
        });
        if (result?.error) {
          console.error("[native signIn] error:", result.error);
          return;
        }
        await update();
        // A brand-new account counts as sign_up, a returning user as login.
        // The native bridge (app) carries isNewUser in the payload since the
        // native provider verifies via /api/users/me (no isNewUser on session).
        const isNewUser = payload.isNewUser === true;
        gtag("event", isNewUser ? "sign_up" : "login", {
          method: payload.provider,
        });
        closeModal();
        router.replace("/hub");
      } catch (e) {
        console.error("[native signIn] exception:", e);
      }
    };

    const handleError = (payload: {
      provider: "google" | "apple";
      code: "cancelled" | "network" | "server" | "unknown";
      message: string;
    }) => {
      if (payload.code === "cancelled") return;
      console.error(`[${payload.provider} native login] ${payload.code}: ${payload.message}`);
    };

    const handleAuthEvent = (e: Event) => {
      handleAuth((e as CustomEvent).detail);
    };
    const handleErrorEvent = (e: Event) => {
      handleError((e as CustomEvent).detail);
    };

    window.onNoonchiAuth = handleAuth;
    window.onNoonchiAuthError = handleError;
    window.addEventListener("noonchiAuth", handleAuthEvent);
    window.addEventListener("noonchiAuthError", handleErrorEvent);

    return () => {
      delete window.onNoonchiAuth;
      delete window.onNoonchiAuthError;
      window.removeEventListener("noonchiAuth", handleAuthEvent);
      window.removeEventListener("noonchiAuthError", handleErrorEvent);
    };
  }, [router, update, closeModal]);

  return null;
}

export default function AuthProvider({ children }: Props) {
  return (
    <SessionProvider>
      <NativeAuthBridge />
      {children}
    </SessionProvider>
  );
}
