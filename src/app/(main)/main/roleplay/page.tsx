"use client";

import { useState } from "react";

import { CategoryType } from "@/types/topics/topics.type";
import { TopicList } from "@/components/roleplay";
import { Button } from "@/components/ui/button/button";
import { useChargeCredit } from "@/hooks/mutations/useCredit";

export default function Roleplay() {
  const [category, setCategory] = useState<CategoryType>("Career");
  const { mutate: chargeCredit, isPending } = useChargeCredit();

  return (
    <>
      <div>
        <div className="flex flex-col gap-3 pb-10">
          <span className="text-3xl font-medium">
            Do you want to sound more natural in Korean?
          </span>
          <span className="text-gray-500">
            Let`s practice role-playing with me.
          </span>
        </div>
        <TopicList category={category} setCategory={setCategory} />
        <Button
          variant="primary"
          size="lg"
          disabled={isPending}
          onClick={() => chargeCredit(500)}
        >
          {isPending ? "Charging..." : "Charge 500 Credits"}
        </Button>
      </div>
    </>
  );
}
