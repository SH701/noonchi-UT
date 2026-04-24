"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";


import { toast } from "@/components/ui/toast/toast";
import { useTopics } from "@/hooks/queries";

import { RoleplayLoading } from "@/features/roleplay";
import SpinnerLoading from "@/components/common/SpinnerLoading";
import { useCreateRoleplay } from "../hooks/useCreateRoleplay";
import RoleplayForm from "./RoleplayForm";

interface SubmitProps {
  myRole: string;
  aiRole: string;
  situation: string;
  tone: string;
}

export default function RolePlay() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const topicId = Number(searchParams.get("topicId"));

  const { data: topics = [], isLoading } = useTopics(category, false);
  const topic = topics.find((t) => t.topicId === topicId);

  const { mutateAsync: createRoleplay, isPending } = useCreateRoleplay();

  if (isLoading || !topic) {
    return <SpinnerLoading title="Loading..." />;
  }

  if (isPending) {
    return <RoleplayLoading />;
  }

  const handleSubmit = async ({
    myRole,
    aiRole,
    situation,
    tone,
  }: SubmitProps) => {
    if (!myRole || !aiRole || !situation || !tone) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const requestData = {
        conversationTopicId: topicId,
        userRole: myRole,
        aiRole,
        closeness: tone,
        situation,
      };
      const convo = await createRoleplay(requestData);
      gtag("event", "roleplay_start", {
        category: category,
        topic_name: topic?.name,
        topic_id: topicId,
      });
      router.push(`/main/roleplay/chatroom/${convo.conversationId}`);
    } catch (e) {
      if (e instanceof Error && e.message === "timeout") {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error("Failed to create chat room");
      }
    }
  };

  return (
    <div className="relative flex w-full flex-col overflow-x-hidden">
      <div className="flex w-full justify-center">
        <div className="w-full">
          <div className="relative mx-auto aspect-square w-[89%]">
            <Image
              src={topic?.imageUrl}
              alt="topic's photo"
              fill
              className="rounded-3xl object-cover"
            />
            <div className="" />
            <div className="absolute left-4 top-4">
              <span className="rounded-3xl border border-gray-200 bg-white/50 px-3 py-2 text-sm text-gray-600">
                {topic?.track}
              </span>
            </div>
            <div className="bg-gray absolute inset-x-0 bottom-0 flex h-auto flex-col rounded-b-3xl p-4 text-white backdrop-blur-sm">
              <span className="text-3xl font-semibold">{topic?.name}</span>
              <span className="text-sm font-medium">{topic?.description}</span>
            </div>
          </div>
          <div>
            <p className="pb-5 pt-8 font-semibold">Conversation Context</p>
            <RoleplayForm onSubmit={handleSubmit} topicId={topicId} />
          </div>
        </div>
      </div>
    </div>
  );
}
