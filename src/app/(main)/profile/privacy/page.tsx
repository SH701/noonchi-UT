import type { Metadata } from "next";
import { PrivacyPolicy } from "@/features/profile";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Noonchi's privacy policy and how we handle your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PrivacyPolicy />
    </main>
  );
}
