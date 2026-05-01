"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import PostCard from "./PostCard";
import PostFilter, { PostSortType } from "./PostFilter";
import { useGetPosts } from "../hooks/usePosts";

export default function PostList() {
  const router = useRouter();
  const [sort, setSort] = useState<PostSortType>("latest");
  const [search, setSearch] = useState("");
  const { data: postList } = useGetPosts();

  const posts = postList?.content ?? [];
  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );
  const sorted = [...filtered].sort((a, b) =>
    sort === "popular" ? b.likesCount - a.likesCount : b.postId - a.postId,
  );

  return (
    <section className="relative">
      <PostFilter
        active={sort}
        onSelect={setSort}
        search={search}
        onSearch={setSearch}
      />
      <ul className="flex flex-col gap-3">
        {sorted.map((post) => (
          <PostCard
            key={post.postId}
            {...post}
            onClick={() => router.push(`/posts/${post.postId}`)}
          />
        ))}
      </ul>
      <button
        className="border-gradient-primary fixed bottom-8 right-4 flex size-10 items-center justify-center rounded-full border bg-white"
        onClick={() => router.push("/posts/create")}
      >
        <Plus />
      </button>
    </section>
  );
}
