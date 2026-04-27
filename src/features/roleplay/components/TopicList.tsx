"use client";

import { TopicSlider } from "@/features/roleplay";
import { CategoryType } from "@/features/roleplay/types/topics";
import { useRouter } from "next/navigation";
import { Heart, Lock, Plus } from "lucide-react";
import Image from "next/image";
import { useAddFavorite, useRemoveFavorite } from "@/features/roleplay/hooks";
import { useTopics } from "@/hooks/queries";
import { TopicListSkeleton } from "../../../components/skeleton";
import { useState } from "react";
import { toast } from "@/components/ui/toast/toast";
import { CominSoonModal } from "@/components/modal";

export default function TopicList() {
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

  const toggleFavorite = (topicId: number, isFavorite: boolean) => {
    if (isFavorite) {
      removeFavorite(topicId);
    } else {
      addFavorite(topicId);
    }
  };

  return (
    <div>
      <TopicSlider
        topics={[
          { id: 1, label: "Favorites" },
          { id: 2, label: "Career" },
          { id: 3, label: "Family" },
          { id: 4, label: "Belonging" },
          { id: 5, label: "K-POP" },
        ]}
        active={category}
        onSelect={(c) => setCategory(c)}
      />

      {isPending ? (
        <TopicListSkeleton />
      ) : isLove && topics.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-2 py-20">
          <span className="text-2xl font-medium">Your Favorites are empty</span>
          <span className="text-sm text-gray-600">
            Tap the heart on roles you like
          </span>
        </div>
      ) : (
        <div className="grid w-full grid-cols-2 items-center justify-center gap-4">
          {topics.map((topic) => (
            <div
              key={topic.topicId}
              className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl transition-shadow hover:shadow-md"
              onClick={() => {
                if (category === "Career" && topic.name === "Job Interview") {
                  toast.warning("This content will be available soon");
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
              {category === "Career" && topic.name === "Job Interview" ? (
                <>
                  <Image
                    src={topic.imageUrl}
                    alt={topic.name}
                    fill
                    className="object-cover blur-sm"
                    loading="eager"
                    sizes="(max-width: 600px) 50vw, 300px"
                  />
                  <Lock className="size-15 absolute inset-0 z-50 mx-auto mt-8 text-white md:m-auto" />
                </>
              ) : (
                <Image
                  src={topic.imageUrl}
                  alt={topic.name}
                  fill
                  className="object-cover"
                  loading="eager"
                  sizes="(max-width: 600px) 50vw, 300px"
                />
              )}

              <div className="bg-gray absolute inset-x-0 bottom-0 flex h-auto flex-col justify-end gap-1 rounded-b-xl px-4 py-2 text-white backdrop-blur-sm">
                <span className="text-xs">{topic.track}</span>
                <h4 className="text-sm font-semibold">{topic.name}</h4>
              </div>
              <button
                className="absolute right-3 top-3 text-white transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  if (category === "Career" && topic.name === "Job Interview")
                    return;
                  toggleFavorite(topic.topicId, topic.isFavorite);
                }}
              >
                <Heart fill={topic.isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          ))}
          <button
            className="z-99 border-gradient-primary fixed bottom-8 right-4 flex size-10 items-center justify-center rounded-full border bg-white"
            onClick={() => setShowModal(true)}
          >
            <Plus />
          </button>
        </div>
      )}
      <CominSoonModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
