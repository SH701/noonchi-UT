"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiMutations } from "@/api";
import { useGetPostDetail } from "@/features/posts/hooks/usePosts";
import { useUpdatePost } from "@/features/posts/hooks/usePostsMutations";
import PostCreateHeader from "@/features/posts/components/PostCreateHeader";
import PostCreateForm from "@/features/posts/components/PostCreateForm";
import PostCreateToolbar from "@/features/posts/components/PostCreateToolbar";

export default function PostEditPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const { data: post } = useGetPostDetail(postId);
  const { mutate: updatePost, isPending } = useUpdatePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!post) return;
    setTitle(post.title);
    setContent(post.content);
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
      { postId, data: { title, content, imageUrls } },
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
      <main className="flex flex-1 flex-col p-4">
        <PostCreateForm
          title={title}
          content={content}
          imageUrls={imageUrls}
          onTitleChange={setTitle}
          onContentChange={setContent}
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
