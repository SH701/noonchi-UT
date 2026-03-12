"use client";

import { Header } from "@/components/common";
import { Button } from "@/components/ui/button/button";
import { INTEREST_OPTIONS } from "@/data";
import { useUpdateProfile } from "@/hooks/mutations";
import { toast } from "@/components/ui/toast/toast";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner/spinner";


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
    <div className="flex flex-1 flex-col">
      <Header
        leftIcon={<ChevronLeft onClick={() => router.back()} />}
        center="Topic of Interests"
      />
      <p className="pb-1 pt-5 text-xl font-semibold leading-7">
        Select Your Interest
      </p>
      <p className="pb-6 text-sm text-gray-500">
        Select at least 3 interests to help us refine your experience.
      </p>
      <div className="flex flex-1 flex-col pb-10 pt-4">
        <div className="flex flex-wrap gap-3">
          {INTEREST_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className="flex cursor-pointer items-center rounded-full border p-3 text-sm font-medium"
              style={{
                borderColor: selected.includes(opt) ? "#6366F1" : "#E5E7EB",
                background: selected.includes(opt) ? "#EEF2FF" : "#FFFFFF",
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        <Button
          size="lg"
          className="mt-auto"
          onClick={handleUpdate}
          disabled={isPending || selected.length < 3}
        >
          {isPending ? <Spinner /> : <p>Save Interests</p>}
        </Button>
      </div>
    </div>
  );
}
