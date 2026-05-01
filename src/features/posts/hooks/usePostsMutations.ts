import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsMutations } from "../api/mutations";
import { PostDetail } from "../types/posts.type";

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
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts", postId] });
      const prev = queryClient.getQueryData<PostDetail>(["posts", postId]);
      if (prev) {
        queryClient.setQueryData<PostDetail>(["posts", postId], {
          ...prev,
          isLiked: !prev.isLiked,
          likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
        });
      }
      return { prev };
    },
    onError: (_err, postId, context) => {
      if (context?.prev) {
        queryClient.setQueryData(["posts", postId], context.prev);
      }
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
      const prev = queryClient.getQueryData<PostDetail>(["posts", postId]);
      if (prev) {
        queryClient.setQueryData<PostDetail>(["posts", postId], {
          ...prev,
          isBookmarked: !prev.isBookmarked,
        });
      }
      return { prev };
    },
    onError: (_err, postId, context) => {
      if (context?.prev) {
        queryClient.setQueryData(["posts", postId], context.prev);
      }
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
