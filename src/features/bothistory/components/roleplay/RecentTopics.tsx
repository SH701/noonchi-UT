"use client";

import RecentTopicsSkeleton from "@/components/skeleton/RecentTopicsSkeleton";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecentTopics } from "../../hooks/useRecentTopics";
import { useTranslation } from "react-i18next";

export default function RecentTopic() {
  const { data: recent, isPending } = useRecentTopics();
  const router = useRouter();
  const { t } = useTranslation();
  if (isPending) return <RecentTopicsSkeleton />;

  return (
    <section>
      <h3 className="text pb-3 font-bold">
        {t("roleplaySection.recentTopics")}
      </h3>
      <ul className="flex gap-3 overflow-x-auto">
        {recent?.map((topic) => (
          <li
            key={topic.topicId}
            className="relative shrink-0"
            style={{ width: "clamp(128px, 30vw, 162px)" }}
            onClick={() =>
              router.push(
                `/hub/roleplay/create?category=${topic.track}&topicId=${topic.topicId}`,
              )
            }
          >
            <Image
              src={topic.imageUrl}
              alt={topic.name}
              width={162}
              height={162}
              className="h-auto w-full rounded-xl"
              sizes="clamp(128px, 30vw, 162px)"
              loading="eager"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-3">
              <span className="text-[11px] uppercase tracking-wider text-gray-100">
                {topic.track}
              </span>
              <h4 className="line-clamp-2 text-[13px] font-medium leading-tight text-white">
                {topic.name}
              </h4>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
