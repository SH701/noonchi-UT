"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SignupHeader from "@/components/signup/SignupHeader";
import SignupTemplate from "@/components/signup/SignupTemplate";
import SignupFormStep1 from "@/components/signup/SignupForm1";
import { Button } from "@/components/ui/button";

export default function SignupStep1() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [agree, setAgree] = useState(false);

  const canNext = email.includes("@") && pw.length >= 8 && pw === pw2 && agree;

  const goNext = () => {
    if (!canNext) return;
    sessionStorage.setItem("signupEmail", email);
    sessionStorage.setItem("signupPassword", pw);
    router.push("/signup/detail");
  };

  return (
    <SignupTemplate
      header={<SignupHeader title="Create account" />}
      footer={
        <Button
          variant="primary"
          size="lg"
          disabled={!canNext}
          onClick={goNext}
        >
          Next
        </Button>
      }
    >
      <SignupFormStep1
        email={email}
        setEmail={setEmail}
        pw={pw}
        setPw={setPw}
        pw2={pw2}
        setPw2={setPw2}
        agree={agree}
        setAgree={setAgree}
      />
    </SignupTemplate>
  );
}
