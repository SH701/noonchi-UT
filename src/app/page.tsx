import type { Metadata } from "next";
import Onboarding from "@/features/onboard/components/Onboarding";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Start learning Korean naturally with Noonchi — AI-powered conversation practice with cultural feedback.",
};

export default function Home() {
  return (
    <main className="flex h-screen w-full items-center justify-center overflow-hidden">
      <Onboarding />
    </main>
  );
}
