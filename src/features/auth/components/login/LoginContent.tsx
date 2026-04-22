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
type LoginData = z.infer<typeof loginSchema>;

export default function LoginContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const { closeModal } = useModalActions();
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
          general: "Email or password incorrect!",
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
      router.replace("/main");
    } catch {
      setServerErrors({ general: "Login Error!" });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-6 pb-10">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full space-y-6">
          <div className="my-10 mt-14 flex justify-between">
            <p></p>
            <p className="text-center text-2xl font-semibold">Welcome back</p>
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
        </div>
      </div>
    </div>
  );
}
