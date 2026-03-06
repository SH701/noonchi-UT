"use client";

import { INTEREST_OPTIONS } from "@/data";
import { usePreferenceStore } from "@/store/usePreferenceStore";

export default function Taste() {
  const interests = usePreferenceStore((s) => s.interests);
  const setInterests = usePreferenceStore((s) => s.setInterests);

  return (
    <div className="flex h-full flex-col pt-4">
      <h1 className="mb-11 text-2xl font-semibold">
        Please select your <br /> interests
      </h1>
      <div className="flex flex-wrap gap-3">
        {INTEREST_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              const next = interests.includes(opt)
                ? interests.filter((x) => x !== opt)
                : [...interests, opt];
              setInterests(next);
            }}
            className="flex cursor-pointer items-center rounded-full border p-3 text-sm font-medium"
            style={{
              borderColor: interests.includes(opt) ? "#6366F1" : "#E5E7EB",
              background: interests.includes(opt) ? "#EEF2FF" : "",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
