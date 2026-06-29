import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Noonchi",
  description:
    "Learn how Noonchi helps you master real-life Korean conversations with AI roleplay, honorifics, and cultural nuance.",
};

export default function ServicePage() {
  return (
    <iframe
      src="https://hanbyul737.github.io/GPTs"
      className="h-dvh w-full border-0"
    ></iframe>
  );
}
