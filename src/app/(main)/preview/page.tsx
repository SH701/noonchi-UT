import type { Metadata } from "next";
import PreviewChat from "@/features/preview/components/PreviewChat";

export const metadata: Metadata = {
  title: "Try Korean Conversation",
  description:
    "Try a free Korean conversation preview with Noonchi — no signup required.",
  robots: { index: true, follow: true },
};

export default function PreviewPage() {
  return <PreviewChat />;
}
