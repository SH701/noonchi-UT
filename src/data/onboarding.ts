import Language from "@/features/onboard/components/Language";
import Level from "@/features/onboard/components/Level";
import Taste from "@/features/onboard/components/Taste";
import type { ComponentType } from "react";

type Slide = {
  id: number;
  content: ComponentType;
};

export const slides: Slide[] = [
  { id: 1, content: Taste },
  { id: 2, content: Level },
  { id: 3, content: Language },
];
