import { useState } from "react";
import TextInput from "../../../../../components/ui/form/TextInput";
import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/form";
import SelectButton from "@/components/ui/form/SelectButton";
import { useCreateContext } from "../../../hooks/useCreateContext";
import { useTranslation } from "react-i18next";

interface RoleplayProps {
  onSubmit: (data: {
    myRole: string;
    aiRole: string;
    situation: string;
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
  const { t } = useTranslation();
  const [details, setDetails] = useState<string | undefined>(undefined);
  const [selectedTone, setSelectedTone] = useState("");
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
      myRole: displayMe || "",
      aiRole: displayAI || "",
      situation: details || "",
      tone: selectedTone,
    });
  };

  const handleMeHint = () => {
    setDisplayMe("");
    setPendingMe(true);
    createContext(undefined, {
      onSuccess: (data) => setDisplayMe(data.myRole),
      onSettled: () => setPendingMe(false),
    });
  };
  const handleAIHint = () => {
    setDisplayAI("");
    setPendingAI(true);
    createContext(undefined, {
      onSuccess: (data) => setDisplayAI(data.aiRole),
      onSettled: () => setPendingAI(false),
    });
  };
  const handleDetailHint = () => {
    setDetails("");
    setPendingDetail(true);
    createContext(undefined, {
      onSuccess: (data) => setDetails(data.detail),
      onSettled: () => setPendingDetail(false),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <TextInput
        label={t("roleplayForm.myRoleLabel")}
        value={displayMe || ""}
        onChange={setDisplayMe}
        placeholder={t("roleplayForm.myRolePlaceholder")}
        disabled={pendingMe}
        onClick={handleMeHint}
      />

      <TextInput
        label={t("roleplayForm.aiRoleLabel")}
        value={displayAI || ""}
        onChange={setDisplayAI}
        placeholder={t("roleplayForm.aiRolePlaceholder")}
        disabled={pendingAI}
        onClick={handleAIHint}
      />

      <SelectButton selectedTone={selectedTone} onSelect={setSelectedTone} />

      <Textarea
        label={t("roleplayForm.detailLabel")}
        value={details || ""}
        onChange={setDetails}
        placeholder={t("roleplayForm.detailPlaceholder")}
        onClick={handleDetailHint}
        disabled={pendingDetail}
      />

      <div className="mx-auto mt-auto flex w-full pb-4">
        <Button variant="primary" size="lg" type="submit">
          {t("roleplayForm.startButton")}
        </Button>
      </div>
    </form>
  );
}
