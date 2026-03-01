"use client";

import { RoleplayChatRoom } from "@/features/roleplay";
import { use } from "react";

export default function RolePlayChatroomPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  return <RoleplayChatRoom conversationId={id} />;
}
