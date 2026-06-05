"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button/button";
import SignupForm1 from "./SignupForm1";
import SignupHeader from "./SignupHeader";
import SignupTemplate from "./SignupTemplate";
import SignupDetail from "./SignupDetail";
import LoginContent from "../login/LoginContent";

import StepIndicator from "./StepIndicator";
import { useModalActions } from "@/store/useModalStore";
import { X } from "lucide-react";
import { signupSchema } from "../../types/schema";
import { useTranslation } from "react-i18next";

type Step1FormData = z.infer<typeof signupSchema>;

export default function SignupContent() {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2>(1);
  const [signupData, setSignupData] = useState({ email: "", password: "" });
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const { openModal, setOnDimClose, closeModal } = useModalActions();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step1FormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
      agree: false,
    },
  });

  const onSubmit = (data: Step1FormData) => {
    setSignupData({ email: data.email, password: data.password });
    setStep(2);
  };

  const handleError = (error: string) => {
    setServerErrors({ email: error });
    setStep(1);
  };

  useEffect(() => {
    if (step === 2) {
      setOnDimClose(() => setStep(1));
    } else {
      setOnDimClose(null);
    }
  }, [step]);

  if (step === 2) {
    return (
      <SignupDetail
        email={signupData.email}
        password={signupData.password}
        serverErrors={handleError}
        step={step}
        onBack={() => setStep(1)}
      />
    );
  }

  return (
    <div>
      <StepIndicator currentStep={step} totalStep={2} />
      <SignupTemplate
        header={
          <SignupHeader
            title={t("signupStep1.title")}
            rightIcon={<X onClick={() => closeModal()} />}
          />
        }
        footer={
          <Button
            variant="primary"
            size="lg"
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
          >
            {t("signupStep1.nextButton")}
          </Button>
        }
      >
        <SignupForm1 control={control} errors={errors} />
        {serverErrors.email && (
          <p className="text-center text-sm text-red-500">
            {serverErrors.email}
          </p>
        )}
      </SignupTemplate>
      <div className="pb-10 pt-6 text-center text-sm text-gray-500">
        {t("signupStep1.loginPrompt")}{" "}
        <button
          className="font-medium text-blue-500 hover:underline"
          onClick={() => openModal(<LoginContent />)}
        >
          {t("signupStep1.loginLink")}
        </button>
      </div>
    </div>
  );
}
