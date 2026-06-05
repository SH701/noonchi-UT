"use client";

import TextInput from "@/components/ui/form/TextInput";
import { Controller, FieldErrors, Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm({
  control,
  errors,
}: {
  control: Control<LoginData>;
  errors: FieldErrors<LoginData>;
}) {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              label={t("login.emailLabel")}
              type="email"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={t("login.emailPlaceholder")}
            />
          )}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextInput
              label={t("login.passwordLabel")}
              type="password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="••••••••"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
    </>
  );
}
