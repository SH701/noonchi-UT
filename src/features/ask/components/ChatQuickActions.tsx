"use client";

import { Button } from "@/components/ui/button/button";
import { useRouter } from "next/navigation";

interface ChatQuickActionsProps {
  onOpenModal: () => void;
}

export default function ChatQuickActions({ onOpenModal }: ChatQuickActionsProps) {
  const router = useRouter();
  const handleRoleplay = () => {
    router.push("/hub");
  };
  return (
    <nav className="mb-4 flex gap-2 overflow-x-auto">
      <Button
        variant="ghost"
        className="w-30 shrink-0 p-3 text-[#1F2937]"
        onClick={handleRoleplay}
      >
        Start Role-play
      </Button>
      <Button
        variant="ghost"
        className="w-30 shrink-0 p-3 text-[#1F2937]"
        onClick={onOpenModal}
      >
        Make it softer
      </Button>
      <Button
        variant="ghost"
        className="w-30 shrink-0 p-3 text-[#1F2937]"
        onClick={onOpenModal}
      >
        More formal
      </Button>
      <Button
        variant="ghost"
        className="w-30 shrink-0 p-3 text-[#1F2937]"
        onClick={onOpenModal}
      >
        Add an apology
      </Button>
    </nav>
  );
}
