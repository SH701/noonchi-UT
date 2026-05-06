import Level from "@/features/onboard/Level";
import Taste from "@/features/onboard/Taste";
import type { ComponentType } from "react";

type Slide = {
  id: number;
  content: ComponentType;
};

export const slides: Slide[] = [
  { id: 1, content: Taste },
  { id: 2, content: Level },
];
