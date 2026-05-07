"use client";

import { ResultPage } from "@/features/result";
import { use } from "react";


export default function RoleplayResultPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);

  return <ResultPage conversationId={id} />;
}
