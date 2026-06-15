"use client";

import RoleplayChat from "@/features/roleplay/components/RoleplayChat";
import AiConsentGuard from "@/components/common/AiConsentGuard";
import { use } from "react";

export default function RolePlayChatroomPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  return (
    <AiConsentGuard>
      <RoleplayChat conversationId={id} />
    </AiConsentGuard>
  );
}
