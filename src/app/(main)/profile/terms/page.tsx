import type { Metadata } from "next";
import { TermsOfUse } from "@/features/profile";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Noonchi.",
  robots: { index: true, follow: true },
};

export default function TermsOfUsePage() {
  return (
    <main className="flex flex-1 flex-col">
      <TermsOfUse />
    </main>
  );
}
