"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/spinner/spinner";
import { apiMutations } from "@/api";
import { useAskScreenshotStore } from "@/store/useAskScreenshotStore";
import { useAskScreenshotStream } from "../hooks/useAskScreenshotStream";

interface AskScreenshotProps {
  onSwitchToManual?: () => void;
}

export default function AskScreenshot({ onSwitchToManual }: AskScreenshotProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setPreviewUrlInStore = useAskScreenshotStore((s) => s.setPreviewUrl);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const { start, notChatMessage, reset } = useAskScreenshotStream();

  const handlePickFile = () => fileInputRef.current?.click();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    reset();
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setPreviewUrlInStore(localPreview);
    setIsUploading(true);
    try {
      const uploadedUrl = await apiMutations.files.UploadScreenshot(file);
      setImageUrl(uploadedUrl);
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartAnalysis = async () => {
    if (!imageUrl) return;
    setIsStarting(true);
    void start(imageUrl, null, null, (id) => {
      router.push(`/hub/ask/${id}?from=screenshot`);
    });
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setImageUrl(null);
    setIsStarting(false);
    reset();
  };

  if (notChatMessage) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-gray-700">{notChatMessage}</p>
        <div className="flex gap-2">
          <Button variant="secondary" size="md" onClick={handleClear}>
            {t("askScreenshot.tryAnother")}
          </Button>
          {onSwitchToManual && (
            <Button variant="primary" size="md" onClick={onSwitchToManual}>
              {t("askScreenshot.typeManually")}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-4 pb-6">
      {!previewUrl && (
        <div className="flex flex-1 flex-col gap-4 px-4 pt-6">
          <button
            type="button"
            onClick={handlePickFile}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 py-12 transition hover:border-gray-400"
          >
            <Upload className="size-8 text-gray-500" />
            <span className="font-medium text-gray-700">
              {t("askScreenshot.uploadButton")}
            </span>
          </button>
          <p className="text-center text-xs text-gray-400">
            {t("askScreenshot.uploadGuide")}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {onSwitchToManual && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onSwitchToManual}
                className="text-sm text-gray-500 underline underline-offset-2"
              >
                {t("askScreenshot.typeManually")}
              </button>
            </div>
          )}
        </div>
      )}

      {previewUrl && (
        <div className="flex flex-col gap-3 px-4 pt-4">
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="screenshot"
              className="max-h-72 rounded-lg border border-gray-200 object-contain"
            />
          </div>
          {!isStarting && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-gray-400 underline underline-offset-2"
              >
                {t("askScreenshot.changeImage")}
              </button>
            </div>
          )}

          {isUploading && (
            <div className="flex flex-col items-center justify-center gap-2 py-4">
              <Spinner size="40px" />
              <span className="text-sm text-gray-600">
                {t("askScreenshot.uploading")}
              </span>
            </div>
          )}

          {imageUrl && !isStarting && !isUploading && (
            <Button variant="primary" size="lg" onClick={handleStartAnalysis}>
              {t("askScreenshot.analyzeCard")}
            </Button>
          )}

          {isStarting && (
            <div className="flex flex-col items-center justify-center gap-2 py-4">
              <Spinner size="40px" />
              <span className="text-sm text-gray-600">
                {t("askScreenshot.analyzing")}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
