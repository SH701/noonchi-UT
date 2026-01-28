import { useState } from "react";
import TextInput from "../../ui/form/TextInput";
import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/form";
import { toast } from "@/components/ui/toast/toast";
import { TONE_OPTIONS } from "@/constants/tone";

interface RoleplayProps {
  onSubmit: (data: {
    myRole: string;
    aiRole: string;
    details: string;
    tone?: string;
  }) => void;
  AiRole?: string;
  myRole?: string;
  mode: "topic" | "custom";
}

export default function RoleplayForm({
  onSubmit,
  AiRole,
  myRole,
  mode,
}: RoleplayProps) {
  const [isAI] = useState(AiRole || "");
  const [isMe] = useState(myRole || "");
  const [details, setDetails] = useState("");
  const [selectedTone, setSelectedTone] = useState("casual");

  const [displayMe, setDisplayMe] = useState("");
  const [displayAI, setDisplayAI] = useState("");

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
      tone: selectedTone,
    });
  };

  const inputStyle =
    mode === "topic" ? "bg-indigo-50 border-blue-600 text-blue-600" : "";

  const handleHintMe = () => {
    setDisplayMe(isMe);
  };

  const handleHintAi = () => {
    setDisplayAI(isAI);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <TextInput
        label="My role"
        value={displayMe}
        onChange={setDisplayMe}
        className={inputStyle}
        placeholder="Write your role"
        disabled={mode === "topic"}
        onClick={handleHintMe}
      />

      <TextInput
        label="AI's role"
        value={displayAI}
        onChange={setDisplayAI}
        className={inputStyle}
        placeholder="Write ai role"
        disabled={mode === "topic"}
        onClick={handleHintAi}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Level of closeness</label>
        <div className="grid grid-cols-2 gap-2">
          {TONE_OPTIONS.map((tone) => (
            <button
              key={tone.value}
              type="button"
              onClick={() => setSelectedTone(tone.value)}
              className={`
                py-3 px-4 rounded-lg border transition-all text-left
                ${
                  selectedTone === tone.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div className="font-semibold text-sm">{tone.label}</div>
              <div className="text-xs text-gray-500">{tone.description}</div>
            </button>
          ))}
        </div>
      </div>

      <Textarea
        required
        value={details}
        onChange={setDetails}
        placeholder="Include details like the reason for the interaction..."
      />

      <div className="flex mt-auto pb-4">
        <Button variant="primary" size="lg" type="submit">
          Start
        </Button>
      </div>
    </form>
  );
}
