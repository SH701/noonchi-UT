"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { apiMutations } from "@/api";
import { useCreatePost } from "@/features/posts";
import SpinnerLoading from "@/components/common/SpinnerLoading";
import PostCreateHeader from "./PostCreateHeader";
import PostCreateForm from "./PostCreateForm";
import PostCreateToolbar from "./PostCreateToolbar";

export default function PostCreateSection() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { mutate: createPost } = useCreatePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("All");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    if (!content.trim() || submitting || uploading) return;
    setSubmitting(true);
    createPost(
      { title, content, category, imageUrls },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({ queryKey: ["posts"] });
          router.back();
        },
        onError: () => setSubmitting(false),
      },
    );
  };

  const canSubmit = content.trim().length > 0 && !submitting && !uploading;

  if (submitting)
    return <SpinnerLoading title={t("postCreate.postingTitle")} />;

  return (
    <div className="flex min-h-dvh flex-col">
      <PostCreateHeader
        canSubmit={canSubmit}
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
        imageCount={imageUrls.length}
        onFiles={handleFiles}
      />
    </div>
  );
}
