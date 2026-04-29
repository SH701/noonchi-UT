import {
  PostDetail,
  CommentItem,
  CommentInput,
  PostHeader,
} from "@/features/posts";

const MOCK_COMMENTS = [
  {
    id: 1,
    author: "익명",
    authorImageUrl: undefined,
    createdAt: "26/03/30",
    body: "노래 추천 받습니다",
    likeCount: 0,
    isLiked: false,
    isMe: false,
  },
  {
    id: 2,
    author: "비트버디",
    authorImageUrl: undefined,
    createdAt: "4일 전",
    body: "Bill stax - 반짝반짝 Freestyle 🎵",
    likeCount: 0,
    isLiked: false,
    isMe: false,
  },
];

export default function PostDetailPage() {
  return (
    <>
      <PostHeader />
      <div className="pb-20 pt-4">
        <PostDetail
          title="How I passed my job interview at Google"
          body="I spent 3 months preparing. Here's everything I did, including the roleplay sessions that helped me the most."
          author="익명"
          authorImageUrl={undefined}
          createdAt= "26/03/30"
          likeCount={0}
          commentCount={1}
          bookmarkCount={0}
          isLiked={false}
          isBookmarked={false}
        />
        <div className="h-2 my-3 -mx-5 bg-white/60 "/>
        <div className="flex flex-col gap-3">
          {MOCK_COMMENTS.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </div>
        <CommentInput />
      </div>
    </>
  );
}
