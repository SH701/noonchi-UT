"use client";

import { use } from "react";
import AskChatRoom from "@/features/ask/AskChatRoom";

export default function Askroom({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams: Promise<{ askTarget?: string; closeness?: string; situation?: string }>;
}) {
  const { id: rawId } = use(params);
  const id = Number(rawId);
  const { askTarget = "", closeness = "", situation = "" } = use(searchParams);
  return <AskChatRoom conversationId={id} askTarget={askTarget} closeness={closeness} situation={situation} />;
}
