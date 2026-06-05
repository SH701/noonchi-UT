"use client";

import { useState } from "react";

import FileUpload from "@/components/ui/form/FileUpload";
import TextInput from "@/components/ui/form/TextInput";
import Textarea from "@/components/ui/form/Textarea";
import { InterviewFormData } from "@/types/conversations";
import { Button } from "@/components/ui/button/button";
import { useTranslation } from "react-i18next";

export interface InterviewFormProps {
  onSubmit: (data: InterviewFormData) => void;
}

export default function InterviewForm({ onSubmit }: InterviewFormProps) {
  const { t } = useTranslation();
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobPosting, setJobPosting] = useState("");

  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim() || !jobTitle.trim()) {
      return;
    }

    // onSubmit({
    //   companyName,
    //   jobTitle,
    //   jobPosting,
    //   files,
    // });
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <TextInput
        label={t("interviewForm.companyLabel")}
        required
        value={companyName}
        onChange={setCompanyName}
        placeholder={t("interviewForm.companyPlaceholder")}
      />

      <TextInput
        label={t("interviewForm.positionLabel")}
        required
        value={jobTitle}
        onChange={setJobTitle}
        placeholder={t("interviewForm.positionPlaceholder")}
      />

      <Textarea
        label={t("interviewForm.jobPostingLabel")}
        required
        value={jobPosting}
        onChange={setJobPosting}
        placeholder={t("interviewForm.jobPostingPlaceholder")}
        onClick={() => handleSubmit}
        disabled={false}
      />

      <FileUpload onFilesChange={setFiles} />

      <div className="mt-auto pb-4">
        <Button variant="primary" size="lg" type="submit">
          {t("interviewForm.startButton")}
        </Button>
      </div>
    </form>
  );
}
