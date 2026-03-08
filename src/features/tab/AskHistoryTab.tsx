import { useConversations } from "@/hooks/queries";
import AskHistorySkeleton from "./AskHistorySkeleton";
import { useChatHistoryStore } from "@/store/useChatHistorystore";
import { EmptyAskIcon } from "@/assets/svgr";
import { Button } from "@/components/ui/button/button";
import { useRouter } from "next/navigation";

export default function AskHistoryTab() {
  const { data: result, isPending } = useConversations();
  const conversations = result?.conversations ?? [];
  const { keyword } = useChatHistoryStore();
  const router = useRouter();
  const handleAsk = () => {
    router.push("/main/ask");
  };
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="mt-5 flex shrink-0 justify-between">
        <span className="mb-2 text-sm font-medium">Ask</span>
        <span className="cursor-pointer text-xs text-gray-600">Edit</span>
      </div>

      <div className="custom-scrollbar mb-23 min-h-0 flex-1 overflow-y-auto pr-2">
        {isPending ? (
          <AskHistorySkeleton />
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1">
            <EmptyAskIcon />
            <span className="mb-3 font-medium text-gray-500">
              No conversations yet
            </span>
            <Button onClick={handleAsk}>Check a sentence</Button>
          </div>
        ) : (
          conversations
            .filter((convo) => convo.conversationType === "ASK")
            .filter((convo) =>
              keyword
                ? convo.askTarget.toLowerCase().includes(keyword.toLowerCase())
                : true,
            )
            .map((convo) => (
              <div
                key={convo.conversationId}
                className="mb-2 rounded-lg bg-white/10 p-3"
                onClick={() => {
                  const query = new URLSearchParams({
                    askTarget: convo.askTarget,
                    closeness: convo.closeness,
                    situation: convo.situation,
                  }).toString();
                  router.push(`/main/ask/${convo.conversationId}?${query}`);
                }}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-black">
                    {convo.askTarget.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(convo.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
