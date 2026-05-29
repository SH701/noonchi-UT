import type { Metadata } from "next";
import PreviewEnd from "@/features/preview/components/PreviewEnd";

export const metadata: Metadata = {
  title: "Preview Complete",
  description:
    "You've completed the Noonchi preview — sign up to keep practicing Korean with AI.",
  robots: { index: true, follow: true },
};

export default function PreviewEndPage() {
  return <PreviewEnd />;
}
