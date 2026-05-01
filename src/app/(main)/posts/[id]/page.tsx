"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  PostDetail,
  PostDetailSkeleton,
  CommentItem,
  CommentItemSkeleton,
  CommentInput,
  PostHeader,
  useGetPostDetail,
  useGetComments,
  useToggleLike,
  useToggleBookmark,
  useDeletePost,
} from "@/features/posts";

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const postId = Number(id);
  const router = useRouter();

  const { data: post, isLoading: postLoading } = useGetPostDetail(postId);
  const { data: commentList, isLoading: commentsLoading } = useGetComments(postId);
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: toggleBookmark } = useToggleBookmark();
  const { mutate: deletePost } = useDeletePost();

  const comments = commentList?.content ?? [];

  return (
    <>
      <PostHeader />
      <div className="pb-20 pt-4">
        {postLoading || !post ? (
          <PostDetailSkeleton />
        ) : (
          <PostDetail
            {...post}
            onLike={() => toggleLike(postId)}
            onBookmark={() => toggleBookmark(postId)}
            onEdit={() => router.push(`/posts/${postId}/edit`)}
            onDelete={() => deletePost(postId, { onSuccess: () => router.back() })}
          />
        )}
        <div className="my-3 -mx-5 h-2 bg-white/60" />
        <div className="flex flex-col gap-3">
          {commentsLoading
            ? Array.from({ length: 3 }).map((_, i) => <CommentItemSkeleton key={i} />)
            : comments.map((comment) => (
                <CommentItem key={comment.commentId} {...comment} />
              ))}
        </div>
        <CommentInput postId={postId} />
      </div>
    </>
  );
}
