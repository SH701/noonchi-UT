import { apiFetch } from "@/api";
import { PostDetail, PostList } from "../types/posts.type";


export const postsClient = {
    getPosts:async():Promise<PostList>=>{
        return apiFetch<PostList>(`/api/posts`,{cache:'no-cache'})
    },
    getPostDetail:async(postId :number):Promise<PostDetail>=>{
        return apiFetch<PostDetail>(`/api/posts/${postId}`)
    }
}