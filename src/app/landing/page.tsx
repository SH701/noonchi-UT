import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Korean with AI",
  description:
    "Practice real-life Korean conversations with AI roleplay. Master honorifics, tone, and cultural nuance.",
};

export default function LandingPage() {
  return (
    <iframe
      src="https://noonchiapp.vercel.app/"
      className="h-dvh w-full border-0"
    ></iframe>
  );
}
