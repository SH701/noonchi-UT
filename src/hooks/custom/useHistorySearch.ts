import { useConversations, useConversationSearch } from "@/hooks/queries";
import { useChatHistoryStore } from "@/store/useChatHistorystore";


export function useHistorySearch(conversationType: "ROLE_PLAYING" | "ASK" | undefined) {
  const { searchKeyword } = useChatHistoryStore();
  const isSearching = searchKeyword.trim().length > 0;

  const { data: listData, isPending: isListPending } = useConversations(
    null,
    "LAST_ACTIVITY_DESC",
    1,
    20,
    conversationType,
  );
  const { data: searchData, isPending: isSearchPending } =
    useConversationSearch(searchKeyword);

  const isPending = isSearching ? isSearchPending : isListPending;
  const conversations = isSearching
    ? (searchData?.conversations ?? [])
    : (listData?.conversations ?? []);

  return { conversations, isPending, isSearching, searchKeyword };
}
