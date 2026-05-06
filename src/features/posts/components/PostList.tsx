"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import PostFilter, { PostSortType } from "./PostFilter";
import { useGetPosts } from "../hooks/usePosts";
import { useDeletePost } from "../hooks/usePostsMutations";
import DeleteModal from "@/components/modal/DeleteModal";

export default function PostList() {
  const router = useRouter();
  const [sort, setSort] = useState<PostSortType>("latest");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const { data: postList, isLoading } = useGetPosts(category || undefined);
  const { mutate: deletePost } = useDeletePost();

  const posts = postList?.content ?? [];
  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );
  const sorted = [...filtered].sort((a, b) =>
    sort === "popular"
      ? b.likesCount - a.likesCount
      : b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <section className="relative">
      <PostFilter
        active={sort}
        onSelect={setSort}
        search={search}
        onSearch={setSearch}
        category={category}
        onCategoryChange={(v) => setCategory((prev) => (prev === v ? "" : v))}
      />
      <ul className="flex flex-col gap-3">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <PostCardSkeleton key={i} />)
          : sorted.map((post) => (
              <PostCard
                key={post.postId}
                {...post}
                onClick={() => router.push(`/posts/${post.postId}`)}
                onEdit={() => router.push(`/posts/${post.postId}/edit`)}
                onDelete={() => setDeleteTargetId(post.postId)}
              />
            ))}
      </ul>
      <button
        className="border-gradient-primary fixed bottom-8 right-4 flex size-10 items-center justify-center rounded-full border bg-white"
        onClick={() => router.push("/posts/create")}
      >
        <Plus />
      </button>
      <DeleteModal
        isOpen={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => deletePost(deleteTargetId!)}
        title="Delete Post"
      />
    </section>
  );
}
