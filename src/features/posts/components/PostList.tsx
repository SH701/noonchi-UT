"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import PostFilter, { PostSortType } from "./PostFilter";
import { useGetPosts } from "../hooks/usePosts";
import { useDeletePost, useToggleLike, useToggleBookmark } from "../hooks/usePostsMutations";
import DeleteModal from "@/components/modal/DeleteModal";
import PostWebzine from "./PostWebzine";
import EmptyItem from "./EmptyItem";

export default function PostList() {
  const router = useRouter();

  const [sort, setSort] = useState<PostSortType>("latest");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const { data: postList, isLoading } = useGetPosts(
    category === "All" ? undefined : category,
  );
  const { mutate: deletePost } = useDeletePost();
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: toggleBookmark } = useToggleBookmark();

  const handleDelete = () => {
    if (deleteTargetId === null) return;
    setDeleteTargetId(null);
    deletePost(deleteTargetId);
  };

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
    <section className="relative -mx-5 bg-blue-100/30 px-5">
      <PostWebzine />
      <PostFilter
        active={sort}
        onSelect={setSort}
        search={search}
        onSearch={setSearch}
        category={category}
        onCategoryChange={(v) =>
          setCategory(v === "All" ? "All" : (prev) => (prev === v ? "All" : v))
        }
      />
      <ul className="flex flex-col gap-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <PostCardSkeleton key={i} />)
        ) : sorted.length === 0 ? (
          <EmptyItem />
        ) : (
          sorted.map((post) => (
            <PostCard
              key={post.postId}
              {...post}
              onClick={() => router.push(`/posts/${post.postId}`)}
              onEdit={() => router.push(`/posts/${post.postId}/edit`)}
              onDelete={() => setDeleteTargetId(post.postId)}
              onLike={() => toggleLike(post.postId)}
              onBookmark={() => toggleBookmark(post.postId)}
            />
          ))
        )}
      </ul>
      <button
        className="border-gradient-primary fixed right-4 flex size-10 items-center justify-center rounded-full border bg-white"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 2rem)" }}
        onClick={() => router.push("/posts/create")}
      >
        <Plus />
      </button>
      <DeleteModal
        isOpen={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        title="Delete Post"
      />
    </section>
  );
}
