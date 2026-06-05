import { apiFetch } from "@/api";
import {
  CommentListRes,
  PostDetailType,
  PostListType,
  PostSearchRes,
} from "../types/posts.type";

export const postsClient = {
  getPosts: async (
    category: string | undefined,
    sort_by: string = "RECENT",
    page: number = 1,
    size: number = 10,
  ): Promise<PostListType> => {
    const params = new URLSearchParams({
      sort_by,
      page: String(page),
      size: String(size),
    });
    if (category) params.set("category", category);
    return apiFetch<PostListType>(`/api/posts?${params}`, { cache: "no-cache" });
  },
  getPostsSearch: async (
    keyword: string,
    page: number = 1,
    size: number = 10,
  ): Promise<PostSearchRes> => {
    return apiFetch<PostSearchRes>(
      `/api/posts/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`,
    );
  },
  getPostDetail: async (postId: number): Promise<PostDetailType> => {
    return apiFetch<PostDetailType>(`/api/posts/${postId}`);
  },
  getComments: async (
    postId: number,
    page: number = 1,
    size: number = 20,
  ): Promise<CommentListRes> => {
    return apiFetch<CommentListRes>(
      `/api/posts/${postId}/comments?page=${page}&size=${size}`,
    );
  },
};