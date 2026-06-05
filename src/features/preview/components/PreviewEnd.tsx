"use client";

import { useModalActions } from "@/store/useModalStore";
import Image from "next/image";
import { Button } from "../../../components/ui/button/button";
import LoginContent from "../../auth/components/login/LoginContent";
import SignupContent from "../../auth/components/signup/SignupContent";
import { useTranslation } from "react-i18next";

export default function PreviewEnd() {
  const { t } = useTranslation();
  const { openModal } = useModalActions();
  const loginOpen = () => {
    openModal(<LoginContent />);
  };
  const signupOpen = () => {
    openModal(<SignupContent />);
  };
  return (
    <div className="bg-gradient-primary flex min-h-dvh flex-col items-center justify-center">
      <div className="mt-auto flex flex-col items-center">
        <Image
          src="/etc/logo.png"
          alt="preview-end"
          width={217}
          height={50}
          priority
          style={{ width: "clamp(217px, 40vw, 320px)", height: "auto" }}
        />
        <p className="py-4 text-center text-2xl font-medium text-gray-800">
          {t("previewEnd.title")}
        </p>
        <div className="flex flex-col items-center justify-center text-center text-sm font-medium text-gray-600">
          <span>{t("previewEnd.description1")}</span>
          <span>{t("previewEnd.description2")}</span>
        </div>
      </div>
      <div
        className="mt-auto flex w-full flex-col gap-4 px-4"
        style={{ paddingBottom: "clamp(40px, 10vw, 52px)" }}
      >
        <Button size="lg" onClick={signupOpen}>
          {t("previewEnd.signupButton")}
        </Button>
        <Button variant="secondary" size="lg" onClick={loginOpen}>
          {t("previewEnd.loginButton")}
        </Button>
      </div>
    </div>
  );
}
