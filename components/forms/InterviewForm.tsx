"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import OptionButtons from "./OptionsButton";
import FileUpload from "./FileUpload";
import Button from "../atoms/Button";

interface InterviewFormProps {
  situationOptions: Record<string, readonly { value: string; label: string }[]>;
  relationship: string;
}

export default function InterviewForm({
  situationOptions,
  relationship,
}: InterviewFormProps) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobPosting, setJobPosting] = useState("");
  const [style, setStyle] = useState("standard");
  console.log("relationship:", relationship);
  console.log("options:", situationOptions[relationship]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("submit!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
        placeholder="Paste the job posting from the company"
      />
      <FileUpload />

      <div>
        <label className="text-sm font-semibold text-black mb-2 flex gap-2">
          Interview Style
        </label>

        <OptionButtons
          options={situationOptions[relationship]}
          selected={style}
          onSelect={setStyle}
        />
      </div>
      <div className="lg:mt-20">
        <Button label="Start Chatting" onClick={() => ""} />
      </div>
    </form>
  );
}
