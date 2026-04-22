"use client";

import RecentTopicsSkeleton from "@/components/skeleton/RecentTopicsSkeleton";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecentTopics } from "../../hooks/useRecentTopics";

export default function RecentTopic() {
  const { data: recent, isPending } = useRecentTopics();
  const router = useRouter();
  if (isPending) return <RecentTopicsSkeleton />;

  return (
    <div>
      <p className="pb-3 text-sm font-medium">Recent Role Playing</p>

      <div className="flex gap-3 overflow-x-auto">
        {recent?.map((topic) => (
          <div
            key={topic.topicId}
            className="relative shrink-0"
            style={{ width: "clamp(128px, 30vw, 162px)" }}
            onClick={() =>
              router.push(
                `/main/roleplay/create?category=${topic.category}&topicId=${topic.topicId}`,
              )
            }
          >
            <Image
              src={topic.imageUrl}
              alt="topic image"
              width={162}
              height={162}
              className="h-auto w-full rounded-xl"
              loading="eager"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-3">
              <span className="text-xs uppercase tracking-wider text-gray-100">
                {topic.category}
              </span>
              <h4 className="line-clamp-2 text-sm font-medium leading-tight text-white">
                {topic.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
