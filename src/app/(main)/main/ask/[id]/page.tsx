"use client";

import { use } from "react";

import AskChat from "@/features/ask/AskChat";

export default function Askroom({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);

  return <AskChat roomId={id} />;
}
