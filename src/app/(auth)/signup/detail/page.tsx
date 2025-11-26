"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ActionButton from "@/components/ui/button/ActionButton";
import Loading from "@/app/after/loading";
import { useAuthStore } from "@/store/auth";
import SignupFormStep2 from "@/components/signup/SignupForm2";
import SignupTemplate from "@/components/signup/SignupTemplate";
import SignupHeader from "@/components/signup/SignupHeader";

export default function SignupStep2() {
  const router = useRouter();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(sessionStorage.getItem("signupEmail") || "");
    setPassword(sessionStorage.getItem("signupPassword") || "");
  }, []);

  const canSubmit = name.trim() !== "" && birthDate !== "";

  const handleSignup = async () => {
    if (!canSubmit) return;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        nickname: name,
        gender,
        birthDate,
      }),
    });

    const data = await res.json();
    setAccessToken(data.accessToken);
    useAuthStore.getState().setRefreshToken(data.refreshToken);

    setLoading(true);
    setTimeout(() => router.push("/after"), 1500);
  };

  if (loading) return <Loading />;

  return (
    <SignupTemplate
      header={<SignupHeader title="Create account" />}
      footer={
        <ActionButton disabled={!canSubmit} onClick={handleSignup}>
          Next
        </ActionButton>
      }
    >
      <SignupFormStep2
        name={name}
        setName={setName}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        gender={gender}
        setGender={setGender}
      />
    </SignupTemplate>
  );
}
