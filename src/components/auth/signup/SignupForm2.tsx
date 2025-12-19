"use client";

import { TextInput } from "@/components/ui/form";
import GenderToggle from "./GenderToggle";


export default function SignupForm2({
  name,
  setName,
  birthDate,
  setBirthDate,
  gender,
  setGender,
}: {
  name: string;
  setName: (v: string) => void;

  birthDate: string;
  setBirthDate: (v: string) => void;

  gender: "MALE" | "FEMALE";
  setGender: (v: "MALE" | "FEMALE") => void;
}) {
  return (
    <div className="space-y-4">
      <TextInput
        label="Name"
        required
        placeholder="Enter your name"
        value={name}
        onChange={setName}
      />

      <TextInput
        label="Birth date"
        placeholder="YYYY-MM-DD"
        value={birthDate}
        onChange={(v) => {
          let val = v.replace(/\D/g, "");
          if (val.length > 4) val = val.slice(0, 4) + "-" + val.slice(4);
          if (val.length > 7) val = val.slice(0, 7) + "-" + val.slice(7);
          setBirthDate(val);
        }}
      />

      <GenderToggle gender={gender} setGender={setGender} />
    </div>
  );
}
