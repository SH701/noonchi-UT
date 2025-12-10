"use client";

import { useState } from "react";

import Image from "next/image";

import { Button } from "../button";

import { FileUpload, FormInput } from "../form";

export interface InterviewFormProps {
  interviewStyles: readonly { value: string; label: string }[];
  onSubmit: (data: {
    company: string;
    position: string;
    jobPosting: string;
    style: string;
    files: File[];
  }) => void;
}

export default function InterviewForm({
  interviewStyles,
  onSubmit,
}: InterviewFormProps) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobPosting, setJobPosting] = useState("");
  const [style, setStyle] = useState("standard");
  const [files, setFiles] = useState<File[]>([]);
  const [hidden, setHidden] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!company.trim() || !position.trim()) {
      alert("회사명과 지원 직무를 입력해주세요.");
      return;
    }

    onSubmit({
      company,
      position,
      jobPosting,
      style,
      files,
    });
  };

  return (
    <form className="flex flex-col space-y-4">
      <FormInput
        label="Company"
        required
        value={company}
        onChange={setCompany}
        placeholder="Enter the company name"
      />

      <FormInput
        label="Position Applied For"
        required
        value={position}
        onChange={setPosition}
        placeholder="Enter the job title"
      />

      <FormInput
        label="Job Posting"
        value={jobPosting}
        onChange={setJobPosting}
        placeholder="Paste the job posting from the company (optional)"
      />

      <FileUpload onFilesChange={setFiles} />

      <div>
        <label className="text-sm font-semibold text-black mb-2 flex gap-2">
          Interview Style
        </label>
        <div className="flex gap-3 mt-2  justify-center">
          {interviewStyles.map((opt) => (
            <Button
              key={opt.value}
              variant={style === opt.value ? "selected" : "outline"}
              size="sm"
              className="w-[90px] h-11"
              onClick={() => setStyle(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center flex-col fixed bottom-8">
        {!hidden && (
          <div className="">
            <button
              onClick={() => setHidden(true)}
              className="flex gap-2.5 px-4 py-2.5 bg-blue-100 rounded-lg"
            >
              <Image
                src="/credits/interviewcredit.png"
                alt="크레딧 소모"
                width={16}
                height={16}
              />
              <p className="text-blue-600 text-xs">
                It costs 60 credits to run this chat
              </p>
            </button>
          </div>
        )}
        <div className="mt-2">
          <Button variant="primary" size="lg" onSubmit={handleSubmit}>
            Start Chatting
          </Button>
        </div>
      </div>
    </form>
  );
}
