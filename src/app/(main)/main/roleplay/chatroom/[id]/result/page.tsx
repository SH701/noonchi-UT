"use client";

import { ResultPage } from "@/features/result";
import { use } from "react";


export default function Result({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);

  return <ResultPage conversationId={id} />;
}
