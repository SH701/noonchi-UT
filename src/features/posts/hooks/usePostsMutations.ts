'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsMutations } from "../api/mutations";
import { PostDetailType, PostListType } from "../types/posts.type";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: postsMutations.createPost,
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
    onSuccess: (_data, postId) => {
      queryClient.setQueriesData<PostListType>(
        { queryKey: ["posts"] },
        (old) => {
          if (!old) return old;
          return { ...old, content: old.content.filter((p) => p.postId !== postId) };
        },
      );
    },
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postsMutations.createLike,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts", postId] });
      const prevDetail = queryClient.getQueryData<PostDetailType>(["posts", postId]);
      if (prevDetail) {
        queryClient.setQueryData<PostDetailType>(["posts", postId], {
          ...prevDetail,
          isLiked: !prevDetail.isLiked,
          likesCount: prevDetail.isLiked ? prevDetail.likesCount - 1 : prevDetail.likesCount + 1,
        });
      }
      queryClient.setQueriesData<PostListType>(
        { queryKey: ["posts"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            content: old.content.map((p) =>
              p.postId === postId
                ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 }
                : p,
            ),
          };
        },
      );
      return { prevDetail };
    },
    onError: (_err, postId, context) => {
      if (context?.prevDetail) {
        queryClient.setQueryData(["posts", postId], context.prevDetail);
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onSettled: (_data, _err, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
  });
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postsMutations.createBookmark,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts", postId] });
      const prevDetail = queryClient.getQueryData<PostDetailType>(["posts", postId]);
      if (prevDetail) {
        queryClient.setQueryData<PostDetailType>(["posts", postId], {
          ...prevDetail,
          isBookmarked: !prevDetail.isBookmarked,
        });
      }
      queryClient.setQueriesData<PostListType>(
        { queryKey: ["posts"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            content: old.content.map((p) =>
              p.postId === postId ? { ...p, isBookmarked: !p.isBookmarked } : p,
            ),
          };
        },
      );
      return { prevDetail };
    },
    onError: (_err, postId, context) => {
      if (context?.prevDetail) {
        queryClient.setQueryData(["posts", postId], context.prevDetail);
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onSettled: (_data, _err, postId) => {
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
