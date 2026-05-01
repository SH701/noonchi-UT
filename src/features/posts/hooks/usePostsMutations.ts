import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsMutations } from "../api/mutations";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postsMutations.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, data }: Parameters<typeof postsMutations.updatePost> extends [infer A, infer B] ? { postId: A; data: B } : never) =>
      postsMutations.updatePost(postId, data),
    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postsMutations.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postsMutations.createLike,
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
  });
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postsMutations.createBookmark,
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, content }: { postId: number; content: string }) =>
      postsMutations.createComment(postId, content),
    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId, "comments"] });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, commentId, content }: { postId: number; commentId: number; content: string }) =>
      postsMutations.updateComment(postId, commentId, content),
    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId, "comments"] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, commentId }: { postId: number; commentId: number }) =>
      postsMutations.deleteComment(postId, commentId),
    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId, "comments"] });
    },
  });
};

export const useToggleCommentLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, commentId }: { postId: number; commentId: number }) =>
      postsMutations.createCommentLike(postId, commentId),
    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId, "comments"] });
    },
  });
};
