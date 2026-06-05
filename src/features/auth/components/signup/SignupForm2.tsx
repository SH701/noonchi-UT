"use client";

import TextInput from "@/components/ui/form/TextInput";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SignupForm2Props {
  name: string;
  birthdate: string;
  gender: "NONE";
}

export default function SignupForm2({
  control,
  errors,
}: {
  control: Control<SignupForm2Props>;
  errors: FieldErrors<SignupForm2Props>;
}) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              label={t("signupStep2.nameLabel")}
              placeholder={t("signupStep2.namePlaceholder")}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Controller
          name="birthdate"
          control={control}
          render={({ field }) => (
            <TextInput
              label={t("signupStep2.birthLabel")}
              placeholder={t("signupStep2.birthPlaceholder")}
              value={field.value}
              onChange={(v) => {
                let val = v.replace(/\D/g, "");
                if (val.length > 4) val = val.slice(0, 4) + "-" + val.slice(4);
                if (val.length > 7) val = val.slice(0, 7) + "-" + val.slice(7);
                if (val.length > 10) val = val.slice(0, 10);
                field.onChange(val);
              }}
            />
          )}
        />
        {errors.birthdate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.birthdate?.message}
          </p>
        )}
      </div>
    </div>
  );
}
