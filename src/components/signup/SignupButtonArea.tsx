"use client";

import { ActionButton } from "../ui/button";

export default function SignupButtonArea({
  disabled,
  onClick,
  label = "Next",
}: {
  disabled?: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <div className="fixed bottom-24 w-full flex justify-center items-center">
      <ActionButton disabled={disabled} onClick={onClick}>
        {label}
      </ActionButton>
    </div>
  );
}
