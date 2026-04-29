export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  authorImageUrl: string;
  createdAt: string;
  thumbnailUrl: string;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isMe: boolean;
}

export interface PostDetail {
  id: number;
  title: string;
  body: string;
  author: string;
  authorImageUrl: string;
  createdAt: string;
  imageUrls: string[];
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isMe: boolean;
}

export interface PostList {
  posts: Post[];
  totalCount: number;
  page: number;
  size: number;
}

export interface PostReq {
  title: string;
  body: string;
  imageUrls: string[];
}

export interface PostRes {
  id: number;
}
export interface PostUpdateReq{
  title: string;
  body: string;
  imageUrls: string[]
  deleteImageUrls:string[]
}