import { useConversations, useTopics } from "@/hooks/queries";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRightIcon } from "@/assets/svgr";
import RoleplayHistorySkeleton from "./RoleplayHistorySkeleton";
import { useChatHistoryStore } from "@/store/useChatHistorystore";
import { Plus } from "lucide-react";

export default function RoleplayHistoryTab() {
  const router = useRouter();
  const { keyword } = useChatHistoryStore();
  const { data, isPending: isConversationsPending } = useConversations();
  const conversations = data?.conversations ?? [];
  const { data: topics = [], isPending: isTopicsPending } = useTopics(
    "",
    false,
  );
  const isPending = isConversationsPending || isTopicsPending;

  const handleHistoryPage = () => {
    router.push("/bothistory/roleplay");
  };
  return (
    <div>
      <button
        onClick={handleHistoryPage}
        className="mb-3 flex items-center gap-1"
      >
        <span className="text-sm font-medium">Role Playing</span>
        <ChevronRightIcon size={18} className="text-gray-400" />
      </button>
      {isPending ? (
        <RoleplayHistorySkeleton />
      ) : conversations.length === 0 ? (
        <div className="flex size-32 flex-col items-center justify-center gap-2 rounded-lg border border-white bg-white/30">
          <Plus />
          <span className="text-sm font-medium">Start a roleplay</span>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto">
          {conversations
            .filter((convo) => convo.conversationType === "ROLE_PLAYING")
            .filter((convo) =>
              keyword
                ? convo.conversationTopic
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
                : true,
            )
            .map((convo) => {
              const matchedTopic = topics?.find(
                (topic) => topic.name === convo.conversationTopic,
              );

              return (
                <div
                  key={convo.conversationId}
                  className="relative size-32 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg"
                >
                  {matchedTopic?.imageUrl ? (
                    <Image
                      src={matchedTopic.imageUrl}
                      alt={convo.conversationTopic}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-600" />
                  )}

                  <div className="bg-linear-to-t absolute inset-0 from-black/80 via-black/20 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-gray-300">
                      {convo.conversationTrack}
                    </span>
                    <h4 className="line-clamp-2 text-xs font-bold leading-tight">
                      {convo.conversationTopic}
                    </h4>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
