import PreAsk from "@/features/ask/components/PreAsk";
import AiConsentGuard from "@/components/common/AiConsentGuard";

export default function AskPage() {
  return (
    <AiConsentGuard>
      <PreAsk />
    </AiConsentGuard>
  );
}
