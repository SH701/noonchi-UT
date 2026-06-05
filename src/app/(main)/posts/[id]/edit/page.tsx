import PostEditSection from "@/features/posts/components/PostEditSection";
import { use } from "react";

export default function PostEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <PostEditSection postId={Number(id)} />;
}
