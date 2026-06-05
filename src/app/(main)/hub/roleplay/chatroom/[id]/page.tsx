"use client";

import RoleplayChat from "@/features/roleplay/components/RoleplayChat";
import { use } from "react";

export default function RolePlayChatroomPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  return <RoleplayChat conversationId={id} />;
}
