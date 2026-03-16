import { apiFetch } from "@/api/api";
import { UploadedFile, PresignedUrlRes } from "@/types/conversations";

export const filesMutations = {
  UploadFiles: async (files: File[]): Promise<UploadedFile[]> => {
    return Promise.all(
      files.map(async (file) => {
        const presignedData = await apiFetch<PresignedUrlRes>(
          "/api/files/presigned-url",
          {
            method: "POST",
            body: JSON.stringify({
              fileExtension: file.name.split(".").pop(),
              fileType: file.type,
            }),
          },
        );

        await fetch(presignedData.url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        return {
          fileUrl: presignedData.url.split("?")[0],
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        };
      }),
    );
  },
  UploadAudio: async (blob: Blob): Promise<string> => {
    const blobType = blob.type || "audio/webm";
    const fileExtension = blobType.includes("webm") ? "webm" : "wav";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/files/presigned-url`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileExtension: fileExtension,
          fileType: blobType,
        }),
      },
    );
    const { url: presignedUrl } = await res.json();
    await fetch(presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": blobType },
      body: blob,
    });

    return presignedUrl.split("?")[0];
  },
};
