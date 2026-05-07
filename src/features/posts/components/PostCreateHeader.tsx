"use client";

import { ChevronLeft, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/common/Header";

interface PostCreateHeaderProps {
  canSubmit: boolean;
  isEdit?: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

export default function PostCreateHeader({
  canSubmit,
  isEdit,
  onBack,
  onSubmit,
}: PostCreateHeaderProps) {
  const { t } = useTranslation();
  return (
    <Header
      leftIcon={<ChevronLeft size={24} />}
      onLeftClick={onBack}
      center={t(
        isEdit ? "postCreate.editHeaderTitle" : "postCreate.headerTitle",
      )}
      rightIcon={
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`transition ${canSubmit ? "text-black" : "text-gray-400"}`}
        >
          <Send />
        </button>
      }
    />
  );
}
