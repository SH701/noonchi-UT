import { useQuery } from "@tanstack/react-query";
import { postsClient } from "../api/client";

export const useGetPosts = (
  category?: string,
  sort_by: string = "RECENT",
  page: number = 1,
  size: number = 10,
) => {
  return useQuery({
    queryKey: ["posts", { category, sort_by, page, size }],
    queryFn: () => postsClient.getPosts(category, sort_by, page, size),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetPostsSearch = (
  keyword: string,
  page: number = 1,
  size: number = 10,
) => {
  return useQuery({
    queryKey: ["posts", "search", { keyword, page, size }],
    queryFn: () => postsClient.getPostsSearch(keyword, page, size),
    enabled: !!keyword,
  });
};

export const useGetPostDetail = (postId: number) => {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: () => postsClient.getPostDetail(postId),
    enabled: !!postId,
  });
};

export const useGetComments = (
  postId: number,
  page: number = 1,
  size: number = 20,
) => {
  return useQuery({
    queryKey: ["posts", postId, "comments", { page, size }],
    queryFn: () => postsClient.getComments(postId, page, size),
    enabled: !!postId,
  });
};
