"use client";

import { Button } from "@/components/ui/button/button";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface ChatQuickActionsProps {
  onOpenModal: () => void;
}

export default function ChatQuickActions({ onOpenModal }: ChatQuickActionsProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const handleRoleplay = () => {
    router.push("/hub");
  };
  return (
    <nav className="mb-4 flex gap-2 overflow-x-auto">
      <Button
        id="ask-start-roleplay"
        variant="ghost"
        className="w-30 shrink-0 p-3 text-[#1F2937]"
        onClick={handleRoleplay}
      >
        {t("ask.quickActions.startRoleplay")}
      </Button>
      <Button
        variant="ghost"
        className="w-30 shrink-0 p-3 text-[#1F2937]"
        onClick={onOpenModal}
      >
        {t("ask.quickActions.softer")}
      </Button>
      <Button
        variant="ghost"
        className="w-30 shrink-0 p-3 text-[#1F2937]"
        onClick={onOpenModal}
      >
        {t("ask.quickActions.formal")}
      </Button>
      <Button
        variant="ghost"
        className="w-30 shrink-0 p-3 text-[#1F2937]"
        onClick={onOpenModal}
      >
        {t("ask.quickActions.apology")}
      </Button>
    </nav>
  );
}
