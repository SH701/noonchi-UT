import type { ComponentType } from "react";
import First from "@/components/onboard/first";
import Fourth from "@/components/onboard/fourth";
import Second from "@/components/onboard/second";
import Third from "@/components/onboard/third";

type Slide = {
  id: number;
  title: string;
  desc: string;
  icon: ComponentType;
  img?: string;
};

export const slides: Slide[] = [
  {
    id: 1,
    title: "Worried about sounding rude in Korean?",
    desc: "Noonchi helps you speak naturally and respectfully without second guessing.",
    icon: First,
  },
  {
    id: 2,
    title: "",
    desc: "",
    icon: Second,
  },
  {
    id: 3,
    title: "Choose your interests",
    desc: "Pick what you love to talk about!",
    icon: Third,
  },
  {
    id: 4,
    title: "Ready to start?",
    desc: "Practice honorifics naturally by chatting with K-Etiquette.",
    icon: Fourth,
  },
];
