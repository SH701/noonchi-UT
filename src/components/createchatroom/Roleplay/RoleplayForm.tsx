import { useState } from "react";
import TextInput from "../../ui/form/TextInput";
import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/form";

import { useCreateContext } from "@/hooks/mutations";
import SelectButton from "@/components/ui/form/SelectButton";

interface RoleplayProps {
  onSubmit: (data: {
    myRole: string | undefined;
    aiRole: string | undefined;
    situation: string | undefined;
    tone: string;
  }) => void;
  AiRole?: string;
  myRole?: string;
  topicId: number;
}

export default function RoleplayForm({
  onSubmit,
  AiRole,
  myRole,
  topicId,
}: RoleplayProps) {
  const [details, setDetails] = useState<string | undefined>(undefined);
  const [selectedTone, setSelectedTone] = useState("casual");
 
  const [pendingMe, setPendingMe] = useState(false);
  const [pendingAI, setPendingAI] = useState(false);
  const [pendingDetail, setPendingDetail] = useState(false);
  const [displayMe, setDisplayMe] = useState<string | undefined>(
    myRole || undefined,
  );
  const [displayAI, setDisplayAI] = useState<string | undefined>(
    AiRole || undefined,
  );
  const { mutate: createContext } = useCreateContext(
    topicId,
    displayMe,
    displayAI,
    details,
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      myRole: displayMe,
      aiRole: displayAI,
      situation: details,
      tone: selectedTone,
    });
  };

  const handleMeHint = () => {
    setPendingMe(true);
    createContext(undefined, {
      onSuccess: (data) => setDisplayMe(data.myRole),
      onSettled: () => setPendingMe(false),
    });
  };
  const handleAIHint = () => {
    setPendingAI(true);
    createContext(undefined, {
      onSuccess: (data) => setDisplayAI(data.aiRole),
      onSettled: () => setPendingAI(false),
    });
  };
  const handleDetailHint = () => {
    setPendingDetail(true);
    createContext(undefined, {
      onSuccess: (data) => setDetails(data.detail),
      onSettled: () => setPendingDetail(false),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <TextInput
        label="My role"
        required
        value={displayMe || ""}
        onChange={setDisplayMe}
        placeholder="Write your role"
        disabled={pendingMe}
        onClick={handleMeHint}
      />

      <TextInput
        label="AI's role"
        required
        value={displayAI || ""}
        onChange={setDisplayAI}
        placeholder="Write ai role"
        disabled={pendingAI}
        onClick={handleAIHint}
      />

      <SelectButton selectedTone={selectedTone} onSelect={setSelectedTone} />

      <Textarea
        label="Detail"
        value={details || ""}
        required
        onChange={setDetails}
        placeholder="Include details like the reason for the interaction..."
        onClick={handleDetailHint}
        disabled={pendingDetail}
      />

      <div className="mt-auto flex pb-4">
        <Button variant="primary" size="lg" type="submit">
          Start
        </Button>
      </div>
    </form>
  );
}
