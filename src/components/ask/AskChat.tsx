"use client";

import { Button } from "@/components/ui/button/button";
import { useRouter } from "next/navigation";

export default function AskChat() {
  const router = useRouter();
  const handleStart = () => {
    router.push("/main/ask");
  };
  return (
    <div className="flex flex-col flex-1">
      <div className="pt-6">
        <div className="flex flex-col gap-3">
          <span className="text-3xl font-medium">
            Not sure how <br /> this might sound?
          </span>
          <span className="text-gray-600">
            I`ll help you understand how it sounds <br />
            in Korean
          </span>
        </div>
      </div>
      <div className="mt-auto pb-13">
        <Button variant="primary" size="lg" onClick={handleStart}>
          Check how is sounds
        </Button>
      </div>
    </div>
  );
}
