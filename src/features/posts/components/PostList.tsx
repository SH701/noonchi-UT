"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import PostCard from "./PostCard";
import PostFilter, { PostSortType } from "./PostFilter";

const MOCK_POSTS = [
  {
    id: 1,
    title: "How I passed my job interview at Google",
    body: "I spent 3 months preparing. Here's everything I did, including the roleplay sessions that helped me the most.",
    author: "익명",
    authorImageUrl: undefined,

    createdAt: "26/03/30",
    likeCount: 0,
    commentCount: 0,
    bookmarkCount: 0,
    isLiked: false,
    isBookmarked: false,
    isFollowing: false,
    isMe: true,
  },
  {
    id: 2,
    title: "Tips for awkward small talk situations",
    body: "Small talk doesn't have to be painful. These phrases helped me break the ice at networking events.",
    author: "be01",
    authorImageUrl: undefined,

    createdAt: "26/03/27",
    likeCount: 0,
    commentCount: 2,
    bookmarkCount: 0,
    isLiked: false,
    isBookmarked: false,
    isFollowing: false,
    isMe: false,
  },
  {
    id: 3,
    title: "K-POP idol audition experience",
    body: "I finally auditioned. Here's what happened and how I prepared with roleplay practice.",
    author: "3rd",
    authorImageUrl: undefined,

    createdAt: "26/03/23",
    likeCount: 1,
    commentCount: 0,
    bookmarkCount: 0,
    isLiked: true,
    isBookmarked: false,
    isFollowing: false,
    isMe: false,
  },
];

export default function PostList() {
  const router = useRouter();
  const [sort, setSort] = useState<PostSortType>("latest");
  const [search, setSearch] = useState("");

  const filtered = MOCK_POSTS.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );
  const sorted = [...filtered].sort((a, b) =>
    sort === "popular" ? b.likeCount - a.likeCount : b.id - a.id,
  );

  return (
    <section className="relative">
      <PostFilter active={sort} onSelect={setSort} search={search} onSearch={setSearch} />
      <ul className="flex flex-col gap-3">
        {sorted.map((post) => (
          <PostCard
            key={post.id}
            {...post}
            onClick={() => router.push(`/posts/${post.id}`)}
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
