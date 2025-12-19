"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Loading from "@/components/loading/loading";

import { performLogin } from "@/lib/service/login";
import { useUserStore, useAuthStore } from "@/store";
import { LoginAction, LoginForm, LoginHeader } from "@/components/auth";

export default function LoginPage() {
  const router = useRouter();

  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useUserStore((s) => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const { accessToken, refreshToken, user } = await performLogin(
        email,
        password
      );

      setTokens(accessToken, refreshToken);

      setUser(user);

      router.replace("/main");
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col bg-white px-4">
      <LoginHeader />

      <div className="flex-1 flex items-start justify-center mt-10">
        <div className="w-full max-w-sm space-y-6">
          <LoginForm
            email={email}
            password={password}
            error={error}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
          <LoginAction
            email={email}
            password={password}
            loading={loading}
            handleLogin={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}
