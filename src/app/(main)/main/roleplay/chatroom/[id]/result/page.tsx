"use client";

import { use } from "react";

import { RoleplayEnd } from "@/features/roleplay";

export default function Result({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);

  return <RoleplayEnd conversationId={id} />;
}
