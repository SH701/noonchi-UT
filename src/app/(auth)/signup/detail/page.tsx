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
  const { accessToken } = useAuthStore();
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

    const requestBody = {
      email,
      password,
      nickname: name,
      gender,
      birthDate,
    };

    console.log("=== 요청 정보 ===");
    console.log("Access Token:", accessToken);
    console.log("Request Body:", requestBody);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("=== 응답 정보 ===");
    console.log("Status:", res.status);

    const responseText = await res.text();
    console.log("Response:", responseText);

    if (!res.ok) {
      alert(`회원가입 실패: ${res.status}\n${responseText}`);
      return;
    }

    const data = JSON.parse(responseText);

    setAccessToken(data.accessToken);
    useAuthStore.getState().setRefreshToken(data.refreshToken);
    useAuthStore.getState().setRole("ROLE_USER");

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
