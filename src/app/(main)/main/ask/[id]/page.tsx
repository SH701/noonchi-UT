"use client";

import { use } from "react";
import AskChatRoom from "@/features/ask/AskChatRoom";

export default function Askroom({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);

  return <AskChatRoom conversationId={id} />;
}
