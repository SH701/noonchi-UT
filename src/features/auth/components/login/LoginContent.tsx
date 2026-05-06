"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";

import { LoginAction, LoginForm } from "@/features/auth";

import { useModalActions } from "@/store/useModalStore";
import { X } from "lucide-react";
import { usePreferenceStore } from "@/store/usePreferenceStore";

import { useSession } from "next-auth/react";
import { loginSchema } from "../../types/schema";
import { useUpdateProfile } from "@/features/profile/hooks/useProfile";
import OAtuth from "./OAuth";
import { useTranslation } from "react-i18next";
type LoginData = z.infer<typeof loginSchema>;

export default function LoginContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const { openModal, closeModal } = useModalActions();
  const { update } = useSession();
  const { koreanLevel, interests, resetPreferences } = usePreferenceStore();
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
      if (koreanLevel || interests.length > 0) {
        await updateProfile({
          koreanLevel: koreanLevel ?? undefined,
          interests,
        });
        await update();
        resetPreferences();
      }
      gtag("event", "login", { method: "email" });
      closeModal();
      router.replace("/hub");
    } catch {
      setServerErrors({ general: "Login Error!" });
      setLoading(false);
    }
  };

  const GoogleLogin = async () => {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: "/hub",
    });

    if (result?.ok && !result.error) {
      gtag("event", "login", { method: "google" });
      closeModal();
      router.replace(result.url ?? "/hub");
    }
  };

  const AppleLogin = async () => {
    const result = await signIn("apple", {
      redirect: false,
      callbackUrl: "/hub",
    });

    if (result?.ok && !result.error) {
      gtag("event", "login", { method: "apple" });
      closeModal();
      router.replace(result.url ?? "/hub");
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
          />
        </div>
      </div>
    </div>
  );
}
