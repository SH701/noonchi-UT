"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiMutations } from "@/api";
import { useGetPostDetail } from "@/features/posts/hooks/usePosts";
import { useUpdatePost } from "@/features/posts/hooks/usePostsMutations";
import PostCreateHeader from "./PostCreateHeader";
import PostCreateForm from "./PostCreateForm";
import PostCreateToolbar from "./PostCreateToolbar";

export default function PostEditSection({ postId }: { postId: number }) {
  const router = useRouter();

  const { data: post } = useGetPostDetail(postId);
  const { mutate: updatePost, isPending } = useUpdatePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Free");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!post) return;
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category ?? "Free");
    setImageUrls(post.images.map((img) => img.imageUrl));
  }, [post]);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded = await apiMutations.files.UploadFiles(Array.from(files));
      setImageUrls((prev) => [...prev, ...uploaded.map((f) => f.fileUrl)]);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = () => {
    if (!content.trim() || isPending || uploading) return;
    updatePost(
      { postId, data: { title, content, category, imageUrls } },
      { onSuccess: () => router.back() },
    );
  };

  const canSubmit = content.trim().length > 0 && !isPending && !uploading;

  return (
    <div className="flex min-h-dvh flex-col">
      <PostCreateHeader
        canSubmit={canSubmit}
        isPending={isPending}
        onBack={() => router.back()}
        onSubmit={handleSubmit}
      />
      <main className="flex flex-1 flex-col pb-4">
        <PostCreateForm
          title={title}
          content={content}
          category={category}
          imageUrls={imageUrls}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onCategoryChange={setCategory}
          onRemoveImage={(url) =>
            setImageUrls((prev) => prev.filter((u) => u !== url))
          }
        />
      </main>
      <PostCreateToolbar
        contentLength={content.length}
        uploading={uploading}
        onFiles={handleFiles}
      />
    </div>
  );
}
