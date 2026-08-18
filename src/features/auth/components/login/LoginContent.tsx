"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";

import LoginAction from "./LoginActoion";
import LoginForm from "./LoginForm";

import { useModalActions } from "@/store/useModalStore";
import { X } from "lucide-react";
import { usePreferenceStore } from "@/store/usePreferenceStore";

import { useSession } from "next-auth/react";
import { loginSchema } from "../../types/schema";
import { useUpdateProfile } from "@/features/profile/hooks/useProfile";

import OAtuth from "./OAuth";
import { useTranslation } from "react-i18next";
import { isNoonchiApp } from "@/lib/isNoonchiApp";
import { markPendingOAuth } from "@/lib/oauthAnalytics";
import { toast } from "@/components/ui/toast/toast";
type LoginData = z.infer<typeof loginSchema>;

export default function LoginContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "apple" | null>(
    null,
  );
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const { openModal, closeModal } = useModalActions();
  const { update } = useSession();
  const { koreanLevel, interests, language, resetPreferences } =
    usePreferenceStore();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    setServerErrors({});
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        setServerErrors({
          general: t("login.errorMessage"),
        });
        setLoading(false);
        return;
      }
      if (koreanLevel || interests.length > 0 || language) {
        await updateProfile({
          koreanLevel: koreanLevel ?? undefined,
          interests,
          language: language?.toUpperCase() as
            | "EN"
            | "JA"
            | "RU"
            | "ES"
            | undefined,
        });
        resetPreferences();
      }
      await update();
      gtag("event", "login", { method: "email" });
      closeModal();
      router.replace("/hub");
    } catch {
      setServerErrors({ general: "Login Error!" });
      setLoading(false);
    }
  };

  const GoogleLogin = async () => {
    if (oauthLoading) return;
    setOauthLoading("google");
    try {
      if (
        isNoonchiApp() &&
        typeof window.NoonchiNative?.loginGoogle === "function"
      ) {
        // Native handles its own sign_up/login event in AuthProvider.
        window.NoonchiNative.loginGoogle();
        return;
      }
      // Web OAuth redirects away; defer the event to the post-redirect session
      // read (ClientProvider) so we can emit sign_up vs login from isNewUser.
      markPendingOAuth("google");
      await signIn("google", { callbackUrl: "/hub" });
    } catch {
      toast.error(t("toastMessage.oauthLoginFailed"));
      setOauthLoading(null);
    }
  };

  const AppleLogin = async () => {
    if (oauthLoading) return;
    setOauthLoading("apple");
    try {
      if (
        isNoonchiApp() &&
        typeof window.NoonchiNative?.loginApple === "function"
      ) {
        window.NoonchiNative.loginApple();
        return;
      }
      markPendingOAuth("apple");
      await signIn("apple", { callbackUrl: "/hub" });
    } catch {
      toast.error(t("toastMessage.oauthLoginFailed"));
      setOauthLoading(null);
    }
  };
  return (
    <div className="flex flex-col px-6 pb-10">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full space-y-6">
          <div className="my-10 mt-14 flex justify-between">
            <span></span>
            <h2 className="text-center text-2xl font-semibold">
              {t("login.title")}
            </h2>
            <X onClick={() => closeModal()} />
          </div>
          <LoginForm control={control} errors={errors} />
          <LoginAction
            loading={loading}
            handleLogin={handleSubmit(onSubmit)}
            isValid={isValid}
          />
          {serverErrors.email && (
            <p className="text-center text-sm text-red-500">
              {serverErrors.email}
            </p>
          )}
          {serverErrors.password && (
            <p className="text-center text-sm text-red-500">
              {serverErrors.password}
            </p>
          )}
          {serverErrors.general && (
            <p className="text-center text-sm text-red-500">
              {serverErrors.general}
            </p>
          )}

          <OAtuth
            GoogleLogin={GoogleLogin}
            AppleLogin={AppleLogin}
            openModal={openModal}
            loadingProvider={oauthLoading}
          />
        </div>
      </div>
    </div>
  );
}
