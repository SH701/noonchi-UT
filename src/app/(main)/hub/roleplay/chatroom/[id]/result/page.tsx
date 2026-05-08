"use client";

import { ResultRoleplay } from "@/features/result";
import { use } from "react";

export default function RoleplayResultPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);

  return <ResultRoleplay conversationId={id} />;
}
