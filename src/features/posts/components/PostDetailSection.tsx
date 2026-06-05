"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PostDetail from "./PostDetail";
import PostDetailSkeleton from "./PostDetailSkeleton";
import CommentItem from "./CommentItem";
import CommentItemSkeleton from "./CommentItemSkeleton";
import CommentInput from "./CommentInput";
import PostHeader from "./PostHeader";
import { useGetPostDetail, useGetComments } from "../hooks/usePosts";
import {
  useToggleLike,
  useToggleBookmark,
  useDeletePost,
  useDeleteComment,
  useUpdateComment,
  useToggleCommentLike,
} from "../hooks/usePostsMutations";
import DeleteModal from "@/components/modal/DeleteModal";

export default function PostDetailSection({ postId }: { postId: number }) {
  const router = useRouter();

  const { data: post, isLoading: postLoading } = useGetPostDetail(postId);
  const { data: commentList, isLoading: commentsLoading } = useGetComments(postId);
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: toggleBookmark } = useToggleBookmark();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: deleteComment, isPending: isDeleting, variables: deleteVars } = useDeleteComment();
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutate: toggleCommentLike } = useToggleCommentLike();

  const { data: session } = useSession();
  const currentUserId = Number(session?.user?.id);

  const [deleteTargetCommentId, setDeleteTargetCommentId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const comments = commentList?.content ?? [];

  const handleEditComment = (commentId: number, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditingContent(currentContent);
  };

  const handleEditSubmit = (commentId: number) => {
    if (!editingContent.trim()) return;
    updateComment(
      { postId, commentId, content: editingContent.trim() },
      { onSuccess: () => setEditingCommentId(null) },
    );
  };

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
            : comments.map((comment) =>
                editingCommentId === comment.commentId ? (
                  <div key={comment.commentId} className="flex gap-2 border-b border-white p-4">
                    <textarea
                      className="flex-1 resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none"
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      rows={2}
                      autoFocus
                    />
                    <div className="flex flex-col gap-1">
                      <button
                        disabled={isUpdating}
                        className="rounded-lg bg-indigo-400 px-3 py-1 text-xs text-white disabled:opacity-50"
                        onClick={() => handleEditSubmit(comment.commentId)}
                      >
                        {isUpdating ? "Saving..." : "Save"}
                      </button>
                      <button
                        disabled={isUpdating}
                        className="rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-500 disabled:opacity-50"
                        onClick={() => setEditingCommentId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={comment.commentId}
                    className={isDeleting && deleteVars?.commentId === comment.commentId ? "opacity-40 pointer-events-none" : ""}
                  >
                    <CommentItem
                      {...comment}
                      isMe={currentUserId === comment.author.userId}
                      onLike={() => toggleCommentLike({ postId, commentId: comment.commentId })}
                      onEdit={() => handleEditComment(comment.commentId, comment.content)}
                      onDelete={() => setDeleteTargetCommentId(comment.commentId)}
                    />
                  </div>
                ),
              )}
        </div>
        <CommentInput postId={postId} />
      </div>
      <DeleteModal
        isOpen={deleteTargetCommentId !== null}
        onClose={() => setDeleteTargetCommentId(null)}
        onConfirm={() =>
          deleteComment(
            { postId, commentId: deleteTargetCommentId! },
            { onSuccess: () => setDeleteTargetCommentId(null) },
          )
        }
        title="Delete Comment"
      />
    </>
  );
}
