"use client";

import { useRouter } from "next/navigation";
import { topicsByCategory } from "@/data/topics";
import { useState } from "react";
import TopicButton from "@/components/ui/button/TopicButton";

export default function TopicAll() {
  const router = useRouter();
  const [category, setCategory] =
    useState<keyof typeof topicsByCategory>("Popular");

  const topics = topicsByCategory[category];

  return (
    <div className="px-5 min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <p className="text-xl text-gray-800 font-semibold pb-3 text-start">
        Topic
      </p>
      /
      <div className="flex gap-1 mb-5 w-full">
        <TopicButton
          label="Popular"
          active={category === "Popular"}
          onClick={() => setCategory("Popular")}
        />
        <TopicButton
          label="Greeting"
          active={category === "Greeting"}
          onClick={() => setCategory("Greeting")}
        />
        <TopicButton
          label="K POP"
          active={category === "KPOP"}
          onClick={() => setCategory("KPOP")}
        />
      </div>
      <div className="w-full">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center gap-5 p-3 bg-white hover:shadow-md 
              transition-shadow cursor-pointer border border-gray-200 
              mb-2 rounded-lg"
            onClick={() => router.push("/main/create/roleplay")}
          >
            <div className="text-blue-600 font-semibold text-base">
              {topic.id}
            </div>

            <div className="shrink-0">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-2xl">
                {topic.icon}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-base font-semibold text-gray-900 mb-1 leading-6">
                {topic.title}
              </h4>
              <p className="text-xs text-gray-600 leading-4">
                {topic.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
