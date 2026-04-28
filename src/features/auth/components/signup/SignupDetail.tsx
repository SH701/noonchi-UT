"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button/button";
import { SignupHeader, SignupTemplate, SignupForm2 } from "@/features/auth";

import { signIn } from "next-auth/react";
import StepIndicator from "./StepIndicator";
import { useModalActions } from "@/store/useModalStore";
import { Spinner } from "@/components/ui/spinner/spinner";
import { X } from "lucide-react";
import { usePreferenceStore } from "@/store/usePreferenceStore";

import { useSession } from "next-auth/react";
import { signup2Schema } from "../../types/schema";
import { useUpdateProfile } from "@/features/profile/hooks/useProfile";
import { authMutations } from "../../api/mutations";

type Step2FormData = z.infer<typeof signup2Schema>;

interface SignupDetailProps {
  email: string;
  password: string;
  serverErrors: (error: string) => void;
  step: number;
  onBack: () => void;
}

export default function SignupDetail({
  email,
  password,
  serverErrors,
  step,
  onBack,
}: SignupDetailProps) {
  const router = useRouter();
  const { closeModal } = useModalActions();
  const { update } = useSession();
  const { koreanLevel, interests, resetPreferences } = usePreferenceStore();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Step2FormData>({
    resolver: zodResolver(signup2Schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      birthdate: "",
      gender: "NONE",
    },
  });

  const onSubmit = async (data: Step2FormData) => {
    try {
      await authMutations.Signup({
        email,
        password,
        nickname: data.name,
        birthDate: data.birthdate,
        gender: "NONE",
      });

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (koreanLevel || interests.length > 0) {
        await updateProfile({
          koreanLevel: koreanLevel ?? undefined,
          interests,
        });
        await update();
        resetPreferences();
      }
      gtag("event", "sign_up", { method: "email" });
      closeModal();
      router.push("/hub");
    } catch (err) {
      if (err instanceof Error) {
        serverErrors(err.message);
      }
    }
  };

  return (
    <div>
      <StepIndicator
        currentStep={step}
        totalStep={2}
        onStepClick={(s) => s < step && onBack()}
      />
      <SignupTemplate
        header={
          <SignupHeader
            title="Create account"
            rightIcon={<X onClick={() => closeModal()} />}
          />
        }
        footer={
          <Button
            variant="primary"
            size="lg"
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className="mb-8"
          >
            {isSubmitting ? <Spinner /> : <span>Get Started</span>}
          </Button>
        }
      >
        <SignupForm2 control={control} errors={errors} />
      </SignupTemplate>
    </div>
  );
}
