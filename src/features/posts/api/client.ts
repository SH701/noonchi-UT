import { apiFetch } from "@/api";
import {
  CommentListRes,
  PostDetail,
  PostList,
  PostSearchRes,
} from "../types/posts.type";

export const postsClient = {
  getPosts: async (
    category?: string,
    sort_by: string = "RECENT",
    page: number = 1,
    size: number = 10,
  ): Promise<PostList> => {
    const params = new URLSearchParams({
      sort_by,
      page: String(page),
      size: String(size),
    });
    if (category) params.set("category", category);
    return apiFetch<PostList>(`/api/posts?${params}`, { cache: "no-cache" });
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
  getPostDetail: async (postId: number): Promise<PostDetail> => {
    return apiFetch<PostDetail>(`/api/posts/${postId}`);
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