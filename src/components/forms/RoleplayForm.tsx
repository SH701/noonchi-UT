import { useState } from "react";
import FormInput from "../atoms/form/FormInput";
import ActionButton from "../atoms/button/ActionButton";

export default function RoleplayForm({
  onSubmit,
}: {
  onSubmit: (data: { company: string; position: string }) => void;
}) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!company.trim() || !position.trim()) {
      alert("회사명과 직무를 입력해주세요.");
      return;
    }

    onSubmit({ company, position });
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
        label="Position"
        required
        value={position}
        onChange={setPosition}
        placeholder="Enter the job title"
      />

      <div className=" fixed bottom-8 flex items-center justify-center">
        <ActionButton type="submit">Start Chatting</ActionButton>
      </div>
    </form>
  );
}
