import type { Metadata } from "next";
import Onboarding from "@/features/onboard/components/Onboarding";

export const metadata: Metadata = {
  title: "Learn Korean Honorifics and Natural Conversation with AI",
  description:
    "Learn Korean honorifics, speech levels, and cultural nuance through AI roleplay. Built for foreigners living in Korea who want to sound natural — not just grammatically correct.",
};

export default function Home() {
  return (
    <main className="flex h-screen w-full items-center justify-center overflow-hidden">
      <section className="sr-only">
        <h1>Learn Korean Honorifics and Natural Conversation with AI</h1>
        <p>
          Noonchi is a Korean AI tutor app for foreigners living in Korea.
          Practice real-life Korean conversations with AI roleplay and get
          instant feedback on honorifics (반말, 해요체, 합쇼체), tone, and
          cultural nuance — so you can sound natural, not just grammatically
          correct.
        </p>

        <h2>How to practice real-life Korean conversations</h2>
        <p>
          Pick a scenario — talking to your boss, meeting your partner&apos;s
          parents, ordering at a cafe, dealing with a landlord — and roleplay
          it with an AI partner. Noonchi corrects your speech level, suggests
          more natural phrasing, and explains what would feel awkward to a
          native Korean speaker.
        </p>

        <h2>Korean honorifics explained: 반말, 해요체, 합쇼체</h2>
        <p>
          Korean speech levels change based on who you&apos;re talking to.
          Learn when to use 반말 (casual with friends), 해요체 (polite
          everyday), and 합쇼체 (formal with bosses or strangers) — and how
          mixing them sounds rude or awkward in real life.
        </p>

        <h2>Korean AI tutor for foreigners living in Korea</h2>
        <p>
          Designed for expats, international students, foreign workers, and
          anyone navigating Korean office culture, family relationships, or
          daily-life conversations. Explanations are in your language; practice
          is in Korean.
        </p>

        <h2>What Noonchi offers</h2>
        <ul>
          <li>AI roleplay with real-life Korean scenarios</li>
          <li>Honorifics and speech-level coaching (반말 / 해요체 / 합쇼체)</li>
          <li>Cultural and tone feedback from a native-speaker perspective</li>
          <li>Voice input with real-time Korean speech-to-text</li>
          <li>Korean-to-English translation and hidden-meaning decoding</li>
          <li>Conversation reports with politeness and naturalness scores</li>
          <li>Available in English, Russian, Spanish, Chinese, and Japanese</li>
        </ul>

        <h2>Why learn Korean with AI?</h2>
        <p>
          Textbooks teach grammar, but real Korean is about social context.
          Noonchi uses AI to simulate conversations you&apos;ll actually have
          — and tells you when your Korean sounds too casual, too formal, or
          just off. It&apos;s like having a Korean friend who patiently
          explains every cultural cue.
        </p>
      </section>

      <Onboarding />
    </main>
  );
}