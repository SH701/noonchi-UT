"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button/button";

export default function LoginRequired() {
  const { t } = useTranslation();
  return (
    <main className="bg-gradient-primary flex min-h-dvh w-full flex-col items-center justify-center px-5">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          {t("loginRequired.title")}
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {t("loginRequired.description")}
        </p>

        <div className="mt-10 flex w-full flex-col gap-3">
          <Link href="/" className="w-full">
            <Button variant="primary" size="lg">
              {t("loginRequired.loginButton")}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
