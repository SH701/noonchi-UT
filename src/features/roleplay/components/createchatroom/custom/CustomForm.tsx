"use client";

import { Textarea, TextInput } from "@/components/ui/form";
import SelectButton from "@/components/ui/form/SelectButton";
import { toast } from "@/components/ui/toast/toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CustomProps {
  onSubmit: (data: {
    myRole: string;
    aiRole: string;
    details: string;
    tone?: string;
  }) => void;
  AiRole?: string;
  myRole?: string;
}

export default function CustomForm({ onSubmit }: CustomProps) {
  const { t } = useTranslation();
  const [isMe, setIsMe] = useState("");
  const [isAI, setIsAI] = useState("");
  const [selectedTone,setSelectedTone] = useState("")
  const [details, setDeatils] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) {
      toast.error("Please fill in the details.");
      return;
    }
    onSubmit({
      myRole: isMe,
      aiRole: isAI,
      details,
    });
  };
  const [isPending,setIsPending] = useState(false) // 주제? 설정하면 바꿔야함
  // Todo: 사진 업로드 후 채팅방 생성
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label={t("customForm.myRoleLabel")}
        value={isMe}
        onChange={setIsMe}
        placeholder={t("customForm.myRolePlaceholder")}
      />
      <TextInput
        label={t("customForm.aiRoleLabel")}
        value={isAI}
        onChange={setIsAI}
        placeholder={t("customForm.aiRolePlaceholder")}
      />
      <SelectButton selectedTone={selectedTone} onSelect={setSelectedTone} />
      <Textarea
        label={t("customForm.detailLabel")}
        value={details}
        required
        onChange={setDeatils}
        disabled={isPending}
        onClick={()=>{}}
        placeholder={t("customForm.detailPlaceholder")}
      />
    </form>
  );
}
