"use client";

import LabelText from "@/components/ui/text/LabelText";
import GenderButton from "@/components/ui/button/GenderButton";

export default function GenderToggle({
  gender,
  setGender,
}: {
  gender: "MALE" | "FEMALE";
  setGender: (g: "MALE" | "FEMALE") => void;
}) {
  return (
    <div>
      <LabelText>Gender</LabelText>
      <div className="flex space-x-4">
        <GenderButton
          active={gender === "MALE"}
          onClick={() => setGender("MALE")}
        >
          Male
        </GenderButton>

        <GenderButton
          active={gender === "FEMALE"}
          onClick={() => setGender("FEMALE")}
        >
          Female
        </GenderButton>
      </div>
    </div>
  );
}
