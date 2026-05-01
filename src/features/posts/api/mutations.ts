import { apiFetch } from "@/api/api";
import {
  CommentRes,
  LikeRes,
  PostReq,
  PostRes,
  PostUpdateReq,
} from "../types/posts.type";

export const postsMutations = {
  createPost: async (data: PostReq): Promise<PostRes> => {
    return apiFetch<PostRes>("/api/posts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  updatePost: async (postId: number, data: PostUpdateReq): Promise<void> => {
    return apiFetch<void>(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  deletePost: async (postId: number): Promise<void> => {
    return apiFetch<void>(`/api/posts/${postId}`, {
      method: "DELETE",
    });
  },
  createLike: async (postId: number): Promise<LikeRes> => {
    return apiFetch<LikeRes>(`/api/posts/${postId}/like`, {
      method: "POST",
    });
  },
  createBookmark: async (postId: number): Promise<LikeRes> => {
    return apiFetch<LikeRes>(`/api/posts/${postId}/bookmark`, {
      method: "POST",
    });
  },
  createComment: async (
    postId: number,
    content: string,
  ): Promise<CommentRes> => {
    return apiFetch<CommentRes>(`/api/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },
  updateComment: async (
    postId: number,
    commentId: number,
    content: string,
  ): Promise<CommentRes> => {
    return apiFetch<CommentRes>(`/api/posts/${postId}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    });
  },
  deleteComment: async (postId: number, commentId: number): Promise<void> => {
    return apiFetch<void>(`/api/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    });
  },
  createCommentLike: async (
    postId: number,
    commentId: number,
  ): Promise<LikeRes> => {
    return apiFetch<LikeRes>(
      `/api/posts/${postId}/comments/${commentId}/like`,
      {
        method: "POST",
      },
    );
  },
};

