"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button/button";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <main className="bg-gradient-primary flex min-h-dvh w-full flex-col items-center justify-center px-5">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <h1 className="text-gradient-primary text-[120px] font-bold leading-none tracking-tight">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-semibold text-gray-800">
          {t("notFound.title")}
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {t("notFound.descriptionLine1")}
          <br />
          {t("notFound.descriptionLine2")}
        </p>

        <div className="mt-10 flex w-full flex-col gap-3">
          <Link href="/hub" className="w-full">
            <Button variant="primary" size="lg">
              {t("notFound.homeButton")}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
