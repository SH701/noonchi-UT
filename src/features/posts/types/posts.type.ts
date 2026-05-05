export interface PostImage {
  id: number;
  imageUrl: string;
  displayOrder: number;
}

export interface PostAuthor {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

export interface PostDetail {
  postId: number;
  title: string;
  content: string;
  category?: string;
  viewCount: number;
  likesCount: number;
  commentsCount: number;
  author: PostAuthor;
  images: PostImage[];
  createdAt: string;
  updatedAt?: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface PostList {
  content: PostSearchItem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface PostReq {
  title: string;
  content: string;
  category?: string;
  imageUrls?: string[];
}

export interface PostRes {
  id: number;
}

export interface PostUpdateReq {
  title?: string;
  content?: string;
  category?: string;
  imageUrls?: string[];
}

export interface LikeRes {
  toggled: boolean;
  count: number;
}

export interface PostSearchItem {
  postId: number;
  title: string;
  content: string;
  category: string;
  viewCount: number;
  likesCount: number;
  commentsCount: number;
  author: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
  };
  createdAt: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface CommentAuthor {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

export interface CommentRes {
  commentId: number;
  postId: number;
  content: string;
  likesCount: number;
  author: CommentAuthor;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
}

export interface CommentListRes {
  content: CommentRes[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface PostSearchRes {
  content: PostSearchItem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}