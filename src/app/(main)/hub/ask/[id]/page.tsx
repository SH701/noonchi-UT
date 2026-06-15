"use client";

import AskChat from "@/features/ask/components/AskChat";
import AskScreenshotChat from "@/features/ask/components/AskScreenshotChat";
import AiConsentGuard from "@/components/common/AiConsentGuard";
import { use } from "react";
import { useSearchParams } from "next/navigation";

export default function AskroomPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  return (
    <AiConsentGuard>
      {from === "screenshot" ? (
        <AskScreenshotChat roomId={Number(id)} />
      ) : (
        <AskChat roomId={id} />
      )}
    </AiConsentGuard>
  );
}
