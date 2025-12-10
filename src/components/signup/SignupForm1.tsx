"use client";

import { Checkbox, TextInput } from "../ui/form";

export default function SignupFormStep1({
  email,
  setEmail,
  pw,
  setPw,
  pw2,
  setPw2,
  agree,
  setAgree,
}: {
  email: string;
  setEmail: (v: string) => void;

  pw: string;
  setPw: (v: string) => void;

  pw2: string;
  setPw2: (v: string) => void;

  agree: boolean;
  setAgree: (v: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <TextInput
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        value={email}
        onChange={setEmail}
      />
      <TextInput
        label="Password"
        type="password"
        placeholder="••••••••"
        value={pw}
        onChange={setPw}
      />
      <TextInput
        label="Re-enter password"
        type="password"
        placeholder="••••••••"
        value={pw2}
        onChange={setPw2}
      />
      <p className="text-sm text-gray-500 leading-[140%]">
        8–16 characters, include letters & numbers
      </p>

      <label className="flex items-start space-x-3">
        <Checkbox checked={agree} onChange={setAgree} />
        <span className="text-sm text-gray-700 leading-relaxed">
          Agree with{" "}
          <a href="#" className="text-black underline">
            Terms of use
          </a>{" "}
          and{" "}
          <a href="#" className="text-black underline">
            privacy policy
          </a>
        </span>
      </label>
    </div>
  );
}
