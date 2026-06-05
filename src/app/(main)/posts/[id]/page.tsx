import PostDetailSection from "@/features/posts/components/PostDetailSection";
import { use } from "react";

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <PostDetailSection postId={Number(id)} />;
}
