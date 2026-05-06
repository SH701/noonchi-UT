"use client";

import { Header } from "@/components/common";
import { Button } from "@/components/ui/button/button";
import { INTEREST_KEYS } from "@/data";

import { toast } from "@/components/ui/toast/toast";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner/spinner";
import { useUpdateProfile } from "../../hooks/useProfile";

interface MyinterestsProps {
  interests: string[];
}
export default function MyInterests({ interests }: MyinterestsProps) {
  const router = useRouter();
  const { update } = useSession();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const [selected, setSelected] = useState<string[]>(interests);

  const toggle = (opt: string) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt],
    );
  };

  const handleUpdate = async () => {
    try {
      await updateProfile({ interests: selected });
      await update({});
      router.refresh();
      toast.success("Profile updated successfully.");
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <>
      <Header
        leftIcon={<ChevronLeft onClick={() => router.back()} />}
        center="Topic of Interests"
      />
      <h2 className="pb-1 pt-5 text-xl font-semibold leading-7">
        Select Your Interest
      </h2>
      <p className="pb-6 text-sm text-gray-500">
        Select at least 3 interests to help us refine your experience.
      </p>
      <section className="flex flex-1 flex-col pb-10 pt-4">
        <ul className="flex flex-wrap gap-3">
          {INTEREST_KEYS.map((opt) => (
            <li key={opt}>
              <button
                onClick={() => toggle(opt)}
                className="flex cursor-pointer items-center rounded-full border p-3 text-sm font-medium"
                style={{
                  borderColor: selected.includes(opt) ? "#6366F1" : "#E5E7EB",
                  background: selected.includes(opt) ? "#EEF2FF" : "#FFFFFF",
                }}
                aria-pressed={selected.includes(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>

        <Button
          size="lg"
          className="mt-auto"
          onClick={handleUpdate}
          disabled={isPending || selected.length < 3}
        >
          {isPending ? <Spinner /> : <span>Save Interests</span>}
        </Button>
      </section>
    </>
  );
}
