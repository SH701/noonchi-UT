"use client";

import AskChat from "@/features/ask/components/AskChat";
import { use } from "react";



export default function AskroomPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);

  return <AskChat roomId={id} />;
}
