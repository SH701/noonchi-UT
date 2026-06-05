"use client";

import TopicSlider from "./TopicSlider";
import { CategoryType } from "../types/topics.type";
import { useRouter } from "next/navigation";
import { Heart, Lock, Plus } from "lucide-react";
import Image from "next/image";
import { useTopics } from "../hooks/useTopics";
import { useAddFavorite } from "../hooks/useAddFavorite";
import { useRemoveFavorite } from "../hooks/useRemoveFavorite";
import TopicListSkeleton from "../../../components/skeleton/TopicListSkeleton";
import { useState } from "react";
import { toast } from "@/components/ui/toast/toast";
import CominSoonModal from "@/components/modal/CominSoonModal";
import { useTranslation } from "react-i18next";

export default function TopicList() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<CategoryType>("Career");
  const [showModal, setShowModal] = useState(false);
  const isLove = category === "Favorites";
  const { data: topics = [], isPending } = useTopics(
    isLove ? "" : category,
    isLove,
  );

  const router = useRouter();
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();
  const [optimisticFavorites, setOptimisticFavorites] = useState<
    Record<number, boolean>
  >({});

  const toggleFavorite = (topicId: number, isFavorite: boolean) => {
    setOptimisticFavorites((prev) => ({ ...prev, [topicId]: !isFavorite }));
    if (isFavorite) {
      toast.success(t("topicList.removedFromFavorites"));
      removeFavorite(topicId);
    } else {
      toast.favorite();
      addFavorite(topicId);
    }
  };

  const isFavorited = (topicId: number, serverValue: boolean) =>
    topicId in optimisticFavorites ? optimisticFavorites[topicId] : serverValue;

  return (
    <section>
      <nav>
        <TopicSlider
          topics={[
            { id: 1, value: "Favorites", label: t("topicCategories.Favorites") },
            { id: 2, value: "Career", label: t("topicCategories.Career") },
            { id: 3, value: "Family", label: t("topicCategories.Family") },
            { id: 4, value: "Belonging", label: t("topicCategories.Belonging") },
            { id: 5, value: "K-POP", label: t("topicCategories.K-POP") },
          ]}
          active={category}
          onSelect={(c) => setCategory(c)}
        />
      </nav>

      {isPending ? (
        <TopicListSkeleton />
      ) : isLove && topics.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-2 py-20">
          <p className="text-2xl font-medium">{t("topicList.favoritesEmpty")}</p>
          <p className="text-sm text-gray-600">
            {t("topicList.favoritesEmptyHint")}
          </p>
        </div>
      ) : (
        <ul
          id="hub-scenario-list"
          className="grid w-full grid-cols-2 items-center justify-center gap-4 md:flex md:flex-col"
        >
          {topics.map((topic, idx) => (
            <li
              key={topic.topicId}
              className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl transition-shadow hover:shadow-md md:flex md:aspect-auto md:w-full md:items-center md:gap-4 md:overflow-visible md:p-2"
              onClick={() => {
                if (category === "Career" && topic.name === "Job Interview") {
                  toast.warning(t("topicList.comingSoon"));
                  return;
                }
                gtag("event", "select_topic", {
                  category: isLove ? topic.track : category,
                  topic_name: topic.name,
                  topic_id: topic.topicId,
                });
                router.push(
                  `/hub/roleplay/create?category=${isLove ? topic.track : category}&topicId=${topic.topicId}`,
                );
              }}
            >
              {/* 이미지 래퍼: 모바일은 fill, md는 80px 썸네일 */}
              <div className="pointer-events-none absolute inset-0 md:pointer-events-auto md:relative md:inset-auto md:size-20 md:shrink-0 md:overflow-hidden md:rounded-xl">
                {category === "Career" && topic.name === "Job Interview" ? (
                  <>
                    <Image
                      src={topic.imageUrl}
                      alt={topic.name}
                      fill
                      className="object-cover blur-sm"
                      sizes="(max-width: 768px) 50vw, 80px"
                      priority={idx < 2}
                    />
                    <Lock className="size-15 absolute inset-0 z-50 mx-auto mt-8 text-white md:m-auto md:size-6" />
                  </>
                ) : (
                  <Image
                    src={topic.imageUrl}
                    alt={topic.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 80px"
                    priority={idx < 2}
                  />
                )}
              </div>

              {/* 모바일 오버레이 텍스트 */}
              <div className="bg-gray absolute inset-x-0 bottom-0 z-10 flex h-auto flex-col justify-end gap-1 rounded-b-xl px-4 py-2 text-white backdrop-blur-sm md:hidden">
                <span className="text-xs">{topic.track}</span>
                <h4 className="text-sm font-semibold">{topic.name}</h4>
              </div>

              {/* md 텍스트 */}
              <div className="hidden flex-1 flex-col gap-0.5 md:flex">
                <span className="text-xs text-gray-400">{topic.track}</span>
                <h4 className="text-sm font-semibold">{topic.name}</h4>
              </div>

              <button
                className="absolute right-3 top-3 z-10 text-white transition-opacity md:relative md:right-auto md:top-auto md:z-auto md:shrink-0 md:text-gray-400"
                onClick={(e) => {
                  e.stopPropagation();
                  if (category === "Career" && topic.name === "Job Interview")
                    return;
                  toggleFavorite(topic.topicId, topic.isFavorite);
                }}
              >
                <Heart
                  className={
                    isFavorited(topic.topicId, topic.isFavorite)
                      ? "text-white"
                      : ""
                  }
                  fill={
                    isFavorited(topic.topicId, topic.isFavorite)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </li>
          ))}
          <button
            className="z-99 border-gradient-primary fixed bottom-8 right-4 flex size-10 items-center justify-center rounded-full border bg-white"
            onClick={() => setShowModal(true)}
          >
            <Plus />
          </button>
        </ul>
      )}
      <CominSoonModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}
