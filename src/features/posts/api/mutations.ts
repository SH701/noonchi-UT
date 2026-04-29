import { apiFetch } from "@/api/api";
import { PostReq, PostRes, PostUpdateReq } from "../types/posts.type";

export const postsMutations = {
  createPost: async (data: PostReq): Promise<PostRes> => {
    return apiFetch<PostRes>("/api/posts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  updatePost:async(postId:number,data:PostUpdateReq):Promise<void>=>{
    return apiFetch<void>(`/api/posts/${postId}`,{
        method:'PUT',
        body:JSON.stringify(data),
    })
  },
  deletePost:async(postId:number):Promise<void>=>{
    return apiFetch<void>(`/api/posts/${postId}`,{
        method:"DELETE",
    })
  },
  createLike:async(postId:number):Promise<void>=>{
    return apiFetch<void>(`/api/posts/${postId}/like`,{
        method:"POST"
    })
  },
  deleteLike:async(postId:number):Promise<void>=>{
    return apiFetch<void>(`/api/posts/${postId}/like`,{
        method:"DELETE"
    })
  },
  createBookmark:async(postId:number):Promise<void>=>{
    return apiFetch<void>(`/api/posts/${postId}/bookmark`,{
        method:"POST"
    })
  },
  deleteBookmark:async(postId:number):Promise<void>=>{
    return apiFetch<void>(`/api/posts/${postId}/bookmark`,{
        method:"DELETE"
    })
  }
};
